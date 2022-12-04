<p align="center">
  <img width="180" src="https://user-images.githubusercontent.com/79037530/205483666-4e3e8883-bc86-4b12-8f78-0ea5206f7f8d.svg" alt="logo">
</p>
<p align="center">
  <i>:taiwan:</i>
  &nbsp;<i>:partying_face:</i>
  &nbsp;<a href="https://go-taiwan.vercel.app/"><strong><i>Try it out »</i></strong></a>
  &nbsp;<i>:shaved_ice:</i>
  &nbsp;<i>:beach_umbrella:</i>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Ver-1.1.0-blue" alt="version" />
  <img src="https://img.shields.io/badge/PRs-Welcome!-ff69b4" alt="pull requests welcome" />
</p>

## 介紹

Go Taiwan 擁有全臺灣的旅遊資訊，你可以在上面找到全臺各縣市的景點、美食與住宿等資訊。

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
├── assets # 圖片、Icon、字型檔
├── components # 公用元件
├── feats # 功能
├── index.css
├── layouts # 導覽列、footer 等全局元件
├── lib # 套件整合
├── main.tsx
├── pages # 頁面元件
├── services # API
├── store # Redux
└── utils # 公用模組
├── constants # 常數、dictionary
├── helpers # 工具函式
├── hooks # hooks
└── models # 型別定義
```

## 資料來源

本網站使用的資料源自[交通部](https://tdx.transportdata.tw/)提供的觀光資訊 API，感謝交通部彙整全臺觀光資訊開放使用。
