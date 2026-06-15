# SC Salmon Injection — LP

**"白さ"ではなく、光を纏う肌へ。**

PDRNコーティングスピキュール配合の塗るマイクロニードル美容液「SC サーモン インジェクション」のランディングページです。

---

## ファイル構成

```
SC_Salmon_LP/
├── index.html    # メインLP
├── preview.html  # プレビュー用
├── style.css     # スタイルシート
├── script.js     # JavaScript
└── README.md
```

## ローカルで確認する

```bash
cd SC_Salmon_LP
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080/` を開く。

## 主な実装

- マガジン風エディトリアルレイアウト
- 横方向スクロールギャラリー（成分カード）
- アシンメトリーベントグリッド（ベネフィット）
- ポラロイド風カード（お客様の声）
- 有機的ブロブアニメーション装飾
- 手書き風アクセント（SVG data URI）
- 垂直分割2カラム価格比較（カウントアップアニメーション）
- IntersectionObserver によるスクロール連動アニメーション

## 技術スタック

- HTML / CSS / Vanilla JS
- Google Fonts（Cormorant Garamond, Noto Sans JP, Shippori Mincho, Caveat）
- 外部ライブラリなし
