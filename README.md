# Popre

**PO**pulation Trends by **PRE**fecture

RESAS-APIを用いた都道府県別人口推移の情報を表示するWebアプリケーション。

![Animation](https://user-images.githubusercontent.com/53995265/236679668-a526b5f9-b981-4d79-b8bd-38050ddb2ede.gif)

## 特徴

人口推移を見たい都道府県を選択するための都道府県一覧がある。また、見ることができる人口推移の種類には、総人口、年少人口、生産年齢人口、老年人口がある。

## 使い方

ローカルにリポジトリをcloneさせる。

`git clone https://github.com/takusea/popre.git`

webappディレクトリ直下へ移動する。

`cd popre`

以下の環境変数を設定する。

|  名前  |  説明  | 例 |
| ---- | ---- | ----|
|  RESAS_API_KEY  |  RESAS-APIのAPIキー  | XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX |
|  NEXT_PUBLIC_BASE_URL  |  Next.jsのAPI RoutesのベースURL  | http://localhost:3000/api |

開発サーバーを起動する。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

[http://localhost:3000](http://localhost:3000)を開く。

## 主要な使用技術

### 言語

- TypeScript

### デプロイサーバー

- Vercel

### API

- RESAS-API

### Webアプリケーションフレームワーク

- React
- Next.js

### データ通信

- Axios

### テスト・動作確認

- Jest
- React Testing Library
- Storybook

### コード整形

- Prettier
- ESLint
- Stylelint
