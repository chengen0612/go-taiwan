
<div align="center">
<img src="https://user-images.githubusercontent.com/79037530/197681649-1002b71a-dfef-403a-9ce5-985ad827ccc3.png" alt="banner">
  <h3>Go Taiwan :taiwan: :partying_face: :beach_umbrella:</h3>
  <p>Go Taiwan 擁有全臺灣的旅遊資訊，你可以在上面找到全臺各縣市的景點、美食與住宿等資訊。
  <p>網站提供單次性的收藏功能，使用者可以點選愛心符號收藏內容，並在稍後至我的最愛查看收藏清單。</p>
  <br/>
  <a href="https://chengen0612.github.io/go-taiwan/"><strong><i>Try it out »</i></strong></a>
</div>

<br/>

## 使用技術

網站是以 TypeScript 打造的 React 應用程式，主要前端技術如下：

- React v18
- React Router v6
- Redux Toolkit
- material-ui v5

## 專案架構
```md
src
├── App.tsx
├── assets                  # 圖片、Icon、字型檔
├── components              # 公用元件
├── feats                   # 功能
├── index.css
├── layouts                 # 導覽列、footer 等全局元件
├── lib                     # 套件整合
├── main.tsx
├── pages                   # 頁面元件
├── services                # API
├── store                   # Redux
└── utils                   # 公用模組
    ├── constants           # 常數、dictionary
    ├── helpers             # 函數
    ├── hooks               # hooks
    └── models              # 型別定義
```

## 資料來源
本網站使用的資料源自[交通部](https://tdx.transportdata.tw/)提供的觀光資訊 API，感謝交通部彙整全臺觀光資訊開放使用。
