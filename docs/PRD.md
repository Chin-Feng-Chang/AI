**動漫風格 3D 個人作品集網站開發規格書 (SRS)**

**1\. 專案概述與技術架構**

本專案旨在打造一個結合**動漫日系賽博/二次元 UI 風格**與 **3D WebGL 即時渲染**的個人作品集網站，展現 3D 建模、材質貼圖與動態互動成果，並支援部署於 Render 平台。

**核心技術選型**

- **前端框架**：React 18+ (推薦搭配 Vite 建立，以確保建置效能與 Render 靜態託管相容性)
- **3D 渲染核心**：Three.js、@react-three/fiber (R3F)、@react-three/drei
- **樣式與主題**：Tailwind CSS + Tailwind 賽博/漫畫自訂延伸類別（配合像素/日文字體與霓虹漸層）
- **動畫庫**：Framer Motion (用於 UI 轉場、對話框淡入、切頁動態)
- **3D 資源規格**：.glb / .gltf 格式，搭配 Draco 壓縮技術，單一展示模型控制在 5MB–15MB 以內以確保載入流暢
- **託管部署**：Render (Static Site)

**2\. 視覺風格與 UI/UX 規範 (Anime / Cel-Shaded Theme)**

- **色彩計畫**：
  - **主背景**：深色賽博底色 (#0f172a, #0a0a14) 或日系暗色調紙張質感
  - **強調色**：動漫霓虹粉 (#ff2a85)、電子青藍 (#00f0ff)、高光檸檬黃 (#ffe600)
  - **介面邊框**：動漫對話框風格、粗黑框外描邊（border-2 border-black / box-shadow: 4px 4px 0px #000 漫畫描邊感）
- **視覺元素**：
  - 網點（Halftone Dots）、放射速度線、日文裝飾標籤（例：// 作品番号 01、SYSTEM READY）
  - 3D 模型著色器（Shader）：支援卡通著色（Toon / Cel Shading），模型帶有外描邊（Outline Pass）效果
- **效能與降級機制 (Graceful Degradation)**：
  - 首頁與各專案均具備 Suspense 搭配動漫進度條骨架屏（Skeleton Loader）
  - 行動裝置或低階 GPU 自動降階渲染倍率（DPR: Math.min(window.devicePixelRatio, 1.5)）

**3\. 頁面模組與功能規格**

**模組一：獨特自我介紹（Hero Section / 主視覺區）**

- **核心定位**：吸睛的二次元入口與全動態 3D 自我意象展示。
- **畫面佈局**：
  - **左側/前景 (UI)**：
    - 動漫角色卡片風格的標題與代號展示（含 Typewriter 打字機效果或切換名言）。
    - 狀態標籤（例如：STATUS: AVAILABLE FOR WORK / EXP LEVEL: 99）。
    - 互動 Call-to-Action 按鈕：「進入作品展示」、「召喚履歷」。
  - **右側/背景 (3D Canvas)**：
    - **主展示物件**：可自由拖曳視角（OrbitControls，鎖定特定角度範圍）的 3D 代表物（如自製原創角色公仔、懸浮機械核心或低多邊形賽博房間）。
    - **滑鼠連動機制**：模型根據游標移動產生視差微旋轉（Parallax tilt）。
    - **環境光照**：三點光源配卡通漸層材質，支援點擊模型觸發專屬待機動畫（Idle/Action Animation）。

**模組二：精選作品 / 案例研究（Featured Works / Case Studies）**

- **核心定位**：3D 核心實力展示，包含即時渲染預覽與深度製作歷程拆解。
- **功能規格**：
  1. **作品篩選標籤 (Tags)**：
     - 全部 (All)、角色模型 (Character)、場景道具 (Environment & Props)、硬表面/機械 (Hard Surface)。
  2. **作品呈現形式**：
     - **列表檢視**：動漫卡牌風網格排版，滑鼠懸停時卡片彈跳並浮現漫畫擬聲詞特效。
     - **即時 3D 檢視器（Modal / Drawer 彈窗）**：
       - 點擊開啟 3D 即時預覽窗口，提供使用者進行旋轉、縮放與平移檢視。
       - **檢視模式切換**：PBR 最終渲染 (Final)、線框模式 (Wireframe)、法線/白模 (Matcap/Normal)。
       - 模型貼圖規格與多邊形面數（Polycount: Verts/Faces）數據面板。
  3. **案例研究解析 (Case Study Detail)**：
     - 概念發想圖（Concept Art）與 3D 成品的對比拉桿（Before/After Slider）。
     - 製作工具標籤（Blender, ZBrush, Substance 3D Painter, Unreal Engine）。
     - 專案亮點與製作技術難點說明。

**模組三：關於我與專業技能（About Me & Skills）**

- **核心定位**：將個人背景與技術棧包裝為動漫角色「能力數值面板（Status Board）」。
- **功能規格**：
  1. **個人簡歷與視覺形象**：
     - 漫畫對話框形式的經歷介紹（經歷背景、創作理念）。
     - 頭像支援 2D 動漫插畫與 3D 萌化頭像的翻轉切換。
  2. **能力數值雷達圖 (Hexagon Radar Chart)**：
     - 指標：高模雕刻（High-Poly Sculpting）、拓撲佈線（Topology）、UV 與材質貼圖（Texturing & UV）、骨架綁定與動畫（Rigging & Anim）、即時引擎整合（Game Engine Integration）。
  3. **工具庫裝備欄 (Inventory Grid)**：
     - 軟體技能以遊戲背包道具格（Inventory Slot）呈現，滑鼠移入時彈出專屬「裝備屬性（Tooltip）」（如：_Blender: Lv.Max - 掌握度 95%_）。

**模組四：聯絡方式（Contact）**

- **核心定位**：遊戲存檔/發送任務委託風格的互動表單。
- **功能規格**：
  1. **任務委託表單 (Quest Board Form)**：
     - 欄位：稱呼 (Name)、電子郵件 (Email)、專案類型 (Project Type: 商業模型/委託/合作)、專案預算與說明 (Details)。
     - 表單驗證：支援前端即時空值與 Email 格式防錯。
     - 串接方案：整合 Formspree 或 EmailJS，點擊送出跳出像素風格「QUEST ACCEPTED / 發送成功」通知框。
  2. **社群與作品平台傳送門**：
     - ArtStation、Sketchfab、GitHub、X (Twitter)、LinkedIn 之動漫風圖標按鈕，具備懸停光暈回饋。
  3. **頁尾 (Footer)**：
     - 像素風格版權宣告、回到頂部快捷鍵。

**4\. 系統目錄結構規劃**

Plaintext

```
portfolio-website/
├── public/
│   ├── models/            # 最佳化後之 3D 模型 (.glb / draco)
│   │   ├── hero-avatar.glb
│   │   └── project-01.glb
│   └── textures/          # Matcap 貼圖、環境貼圖 (HDR/EXR)
├── src/
│   ├── assets/            # 動漫風 UI 向量圖、字型、音效 (選配)
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CanvasContainer.jsx  # 全局 Canvas 與環境光設定
│   │   │   ├── ModelViewer.jsx      # 作品詳情專用 3D 檢視器 (含 Wireframe 切換)
│   │   │   └── HeroScene.jsx        # 首頁 Hero 3D 物件與動態
│   │   ├── common/
│   │   │   ├── AnimeButton.jsx      # 漫畫描邊特效按鈕
│   │   │   ├── Modal.jsx            # 漫畫框彈窗
│   │   │   └── LoadingScreen.jsx    # 動漫進度條載入畫面
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── WorksSection.jsx
│   │       ├── AboutSection.jsx
│   │       └── ContactSection.jsx
│   ├── data/
│   │   ├── projects.js              # 3D 作品資料、多邊形數、模型路徑清單
│   │   └── skills.js                # 技能與能力值數據
│   ├── hooks/
│   │   └── useModelLoader.js        # 監聽模型載入進度之自訂 Hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                    # Tailwind 設定與客製漫畫濾鏡
├── package.json
└── vite.config.js
```

**5\. Render 託管部署規範**

在 Render 上部署此 React 專案，應設定為 **Static Site** 模式：

| **項目**                     | **設定值**                                                  | **說明**                               |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------- |
| **Service Type**             | **Static Site**                                             | 靜態網站服務，提供免費 CDN 與 SSL 憑證 |
| **Build Command**            | npm install && npm run build                                | 執行相依套件安裝與 Vite 前端編譯       |
| **Publish Directory**        | dist                                                        | Vite 預設的靜態輸出資料夾              |
| **Rewrite / Redirect Rules** | Source: /\*<br><br>Dest: /index.html<br><br>Action: Rewrite | 避免單頁路由 (SPA) 重新整理出現 404    |

**部署特別注意事項**

- **大檔管理**：3D 模型檔建議透過 gltf-pipeline 或 draco 進行無損/低損壓縮，避免 Git 儲存庫過大造成 Render 建置逾時；若單一模型大於 25MB，建議託管於外部雲端空間（如 Cloudflare R2 / AWS S3）並以 CDN 網址載入。
- **快取設定**：針對 public/models/\*.glb 靜態資源確認具備快取標頭，加速使用者重複瀏覽時的模型加載體驗。