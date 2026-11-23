# KAI // 3D LAB — 動漫風格 3D 個人作品集網站 (Neo-Manga Cyberpunk Portfolio)

結合 **Neo-Manga Cyberpunk（日系賽博漫畫二次元 UI）** 與 **Three.js / React Three Fiber 即時 3D WebGL 渲染** 的個人作品集網站。依據 `docs/PRD.md` 規格書與 `references/stitch/` 設計稿打造。

---

## 1. 專案特色與模組架構

- **視覺設計系統 (`Neo-Manga Cyberpunk`)**：
  - 採用深色賽博底色 (`#12121d` / `#0d0d17`) 搭配動漫霓虹粉 (`#ff4a8e` / `#ff2a85`)、電子青藍 (`#00eefc` / `#00f0ff`) 與高光檸檬黃 (`#dec800` / `#fde400`)。
  - 粗黑框外描邊 (`border-2 border-black`) 與無模糊硬陰影 (`shadow-[4px_4px_0_#000000]`)、漫畫網點 (`Halftone Dots`) 及日文機體標記 (`// 作品番号・システム稼働中`)。
- **四大核心模組**：
  1. **`01. HERO / 主視覺` (`HeroSection.jsx` + `HeroScene.jsx`)**：
     - 左側動漫角色卡片代號、可點擊切換台詞之漫畫對話框、「進入作品展示」與「召喚履歷 (Modal)」CTA。
     - 右側即時 3D WebGL 賽博機械核心 (`MeshToonMaterial` 三點光源卡通著色 + 逆向法線外描邊 `BackSide Outline` + 雙環軌道與四組浮游砲 + 游標視差旋轉與點擊脈衝爆發特效)。
  2. **`02. WORKS / 精選作品` (`WorksSection.jsx` + `ModelViewer.jsx`)**：
     - 支援分類篩選（全部 ALL、角色模型 CHAR、場景道具 ENV & PROPS、硬表面/機械 MECHA）。
     - 漫畫擬聲詞懸停特效 (`ドカン!!`、`ゴゴゴ...`、`バチバチ!!`)。
     - 即時 3D 檢視器：支援 **PBR 最終渲染 (Final)**、**線框模式 (Wireframe)**、**法線/白模 (Matcap)** 切換，視角旋轉/縮放控制、多邊形面數 (Vertices/Faces/Draw Calls) 遙測面板，並支援切換即時 WebGL 3D 網格或開啟全螢幕檢視彈窗。
     - 案例研究深度解析 (`CASE STUDY // 01`)：內建 **2D 原畫 Concept Art vs 3D Cel-Shaded Render 對比拉桿 (Before/After Slider)** 與三欄式技術亮點解析。
  3. **`03. STATUS / 角色數值` (`AboutSection.jsx`)**：
     - 漫畫對話框經歷自述、**2D CEL / 3D MESH 頭像翻轉切換**、HP/MP 狀態計量條與稱號徽章。
     - **能力數值六角雷達圖 (Hexagon SVG Radar Chart)** 與 6 項核心指標進度條。
     - **3x4 遊戲背包裝備欄 (Tool Inventory Grid)**：滑鼠移入或點擊道具格即時更新下方裝備屬性面板 (`Tooltip`)。
  4. **`04. QUEST / 委託任務` (`ContactSection.jsx`)**：
     - 公會任務委託表單：支援冒險者稱呼、即時通訊信箱格式驗證 (`SIGNAL VALID [LOCKED]` / `FREQUENCY DISTORTED`)、4 種任務類型與 3 階預算選擇。
     - 送出後彈出 `QUEST ACCEPTED! // 任務已成功送達` 確認視窗並自動產生 `#QST-XXXXXX` 任務編號。
     - 社群傳送門（ArtStation、Sketchfab、GitHub、X/Twitter、LinkedIn）與系統存檔點快速歸航頂部功能。

---

## 2. 系統目錄結構

```text
├── public/
│   └── _redirects                      # Render Static Site SPA 路由重寫規則
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CanvasContainer.jsx     # 全局 R3F Canvas、三點卡通光源與自适应 DPR
│   │   │   ├── HeroScene.jsx           # 首頁 3D 賽博核心、雙環、浮游砲與點擊脈衝
│   │   │   └── ModelViewer.jsx         # 作品 3D 檢視器 (PBR / Wireframe / Matcap 切換)
│   │   ├── common/
│   │   │   ├── AnimeButton.jsx         # 漫畫描邊特效按鈕元件
│   │   │   ├── Footer.jsx              # 頁尾版權與 TOP 快速歸航
│   │   │   ├── Header.jsx              # 頂部固定導覽列與合成器 BGM 切換
│   │   │   ├── LoadingScreen.jsx       # 動漫進度條載入畫面 (Suspense Skeleton)
│   │   │   └── Modal.jsx               # 漫畫框彈窗元件
│   │   └── sections/
│   │       ├── HeroSection.jsx         # 模組一：主視覺與自我介紹
│   │       ├── WorksSection.jsx        # 模組二：精選作品、3D 檢視器與案例研究
│   │       ├── AboutSection.jsx        # 模組三：角色能力數值、雷達圖與道具背包
│   │       └── ContactSection.jsx      # 模組四：公會任務委託表單與社群傳送門
│   ├── data/
│   │   ├── projects.js                 # 3D 作品清單、面數規格與案例研究資料
│   │   └── skills.js                   # 角色狀態、六角雷達數值與 12 格道具背包資料
│   ├── hooks/
│   │   └── useModelLoader.js           # 模型載入進度與 DPR 降級控制 Hook
│   ├── App.jsx                         # 主應用整合與滾動區塊偵測
│   ├── main.jsx                        # React 入口掛載
│   └── index.css                       # Tailwind CSS 與網點/漫畫邊框客製樣式
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 3. 本機啟動與建置方式

### 安裝相依套件
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```
預設開啟於：`http://localhost:5173/`

### 執行生產環境編譯
```bash
npm run build
```

---

## 4. Render 靜態網站部署設定

| 項目 | 設定值 |
| :--- | :--- |
| **Service Type** | Static Site |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Rewrite Rule** | `/*` -> `/index.html` (已內建於 `public/_redirects`) |
