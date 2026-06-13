# KCL Hack 2026 フロントエンド初回講座 設計メモ

## 目的

KCL Hack 2026 の初回フロントエンド講座では、初心者が「Webアプリは小さな部品とデータの組み合わせで作れる」と理解し、ハッカソン中に自分で画面を足せる状態を目指します。

## 到達目標

講座後に参加者ができること:

- TypeScript の `type` でデータの形を読める、必要なら増やせる
- 配列、オブジェクト、`map` / `filter` を使って一覧表示を自分で書ける
- React コンポーネントを props で再利用できる
- `useState` で検索欄や選択状態を管理できる
- `useEffect` の役割を、検索結果更新や `localStorage` 保存の文脈で説明できる
- Next.js App Router の `app/`, `page.tsx`, `layout.tsx`, `[id]` の意味がわかる
- `Link` を使って一覧と詳細ページをつなげられる
- バックエンドなしでもハッカソン用のプロトタイプを作り始められる

## 作るもの

教材の中心は `Lecture0-NextJs/web` の `KCL Shop` です。配布する `web` は最初から完成している状態ではなく、講座順に TODO が仕込まれたスターターです。

- 商品一覧
- 商品詳細
- 検索
- カテゴリ絞り込み
- お気に入り
- カート風 UI

実際の決済、ログイン、DB、API、Supabase、Prisma は扱いません。初回講座ではフロントエンドの部品、状態、ページ遷移を学びます。

## 構成

| 資料 | 用途 |
| --- | --- |
| `materials/2026/00-goals-and-plan.md` | 教材の狙いと全体設計 |
| `materials/2026/01-participant-handson.md` | 参加者が手元で進める手順 |
| `materials/2026/98-challenge-answers.md` | チャレンジ課題の解答例と説明メモ |
| `materials/2026/03-challenges.md` | 早く終わった人向けの追加課題 |
| `materials/2026/99-instructor-guide.md` | メンター / 講師向けの進行、時間配分、詰まりどころ |
| `materials/2026/slides/kcl-frontend-2026.html` | 当日投影用の HTML スライド |
| `web` | TODO コメント入りの Next.js スターター |

## ハンズオンの軸

今年版では、次の 3 つを参加者自身に書かせます。

- `products.map((product) => ...)` で一覧を並べる
- `useState(...)` で検索文字列とカテゴリを覚える
- `useEffect(...)` で検索結果を更新する
