import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = path.resolve(process.cwd(), "..");
const materialDir = path.join(rootDir, "materials", "2026");

const requiredMarkdownFiles = [
  "00-goals-and-plan.md",
  "01-participant-handson.md",
  "02-challenges.md",
  "03-challenge-answers.md",
  "99-instructor-guide.md",
];

const markdownFilesToScan = [
  ...requiredMarkdownFiles,
  path.join("..", "..", "README.md"),
];

const requiredSlideFiles = [
  { minSlides: 10, relativePath: path.join("slides", "kcl-frontend-intro.pptx") },
  {
    minSlides: 10,
    relativePath: path.join("slides", "kcl-frontend-2026-handson-ans.pptx"),
  },
];

const staleReferences = [
  "03-challenges.md",
  "98-challenge-answers.md",
  path.join("slides", "kcl-frontend-2026.html"),
];

const failures = [];

async function readRequiredFile(relativePath) {
  const filePath = path.join(materialDir, relativePath);

  try {
    return await readFile(filePath, "utf8");
  } catch {
    failures.push(`Missing or unreadable: ${relativePath}`);
    return "";
  }
}

function listZipEntries(buffer) {
  const minOffset = Math.max(0, buffer.length - 0xffff - 22);
  let endOfCentralDirectoryOffset = -1;

  for (let offset = buffer.length - 22; offset >= minOffset; offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) {
      endOfCentralDirectoryOffset = offset;
      break;
    }
  }

  if (endOfCentralDirectoryOffset === -1) {
    throw new Error("Missing ZIP end of central directory");
  }

  const entryCount = buffer.readUInt16LE(endOfCentralDirectoryOffset + 10);
  let offset = buffer.readUInt32LE(endOfCentralDirectoryOffset + 16);
  const entries = [];

  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error("Invalid ZIP central directory entry");
    }

    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraFieldLength = buffer.readUInt16LE(offset + 30);
    const fileCommentLength = buffer.readUInt16LE(offset + 32);
    const fileNameStart = offset + 46;
    const fileNameEnd = fileNameStart + fileNameLength;

    entries.push(buffer.toString("utf8", fileNameStart, fileNameEnd));
    offset = fileNameEnd + extraFieldLength + fileCommentLength;
  }

  return entries;
}

function countPptxSlides(buffer) {
  const entries = listZipEntries(buffer);
  return entries.filter((entry) => /^ppt\/slides\/slide\d+\.xml$/.test(entry)).length;
}

for (const relativePath of requiredMarkdownFiles) {
  await readRequiredFile(relativePath);
}

for (const relativePath of markdownFilesToScan) {
  const content =
    relativePath.startsWith("..")
      ? await readFile(path.join(materialDir, relativePath), "utf8")
      : await readRequiredFile(relativePath);

  for (const reference of staleReferences) {
    if (content.includes(reference)) {
      failures.push(`${relativePath} contains stale reference: ${reference}`);
    }
  }
}

for (const { minSlides, relativePath } of requiredSlideFiles) {
  const buffer = await readFile(path.join(materialDir, relativePath));

  if (buffer.toString("utf8", 0, 2) !== "PK") {
    failures.push(`${relativePath} is not a valid PPTX/ZIP file`);
    continue;
  }

  try {
    const slideCount = countPptxSlides(buffer);

    if (slideCount < minSlides) {
      failures.push(
        `${relativePath} should contain at least ${minSlides} slides, found ${slideCount}`,
      );
    }
  } catch (error) {
    failures.push(`${relativePath} could not be inspected: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("Material verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Material verification passed.");
