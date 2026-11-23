import React, { useState } from 'react';
import Modal from '../common/Modal';
import { socialPortals } from '../../data/skills';

const questTypes = [
  {
    value: 'character',
    title: '商業 3D 角色模型',
    subtitle: 'Character Modeling / Cel-Shading',
  },
  {
    value: 'mecha',
    title: '機甲 / 硬表面專案',
    subtitle: 'Hard-Surface Mecha Engineering',
  },
  {
    value: 'realtime',
    title: '遊戲引擎即時資產',
    subtitle: 'UE5 / Unity Realtime Optimization',
  },
  {
    value: 'shader',
    title: '技術顧問 / 客製著色器',
    subtitle: 'Custom HLSL / Toon Shader Pipeline',
  },
];

const budgetRanks = [
  {
    value: 'rank-c',
    rank: 'RANK C',
    tier: 'TIER 1',
    amount: '$1,000 - $3,000',
    desc: '單一模型 / 靜態展示規',
    activeBadge: 'bg-tertiary text-on-tertiary',
    activeTier: 'text-primary',
  },
  {
    value: 'rank-b',
    rank: 'RANK B',
    tier: 'RECOMMENDED',
    amount: '$3,000 - $7,000',
    desc: '骨骼綁定 + 著色器配置',
    activeBadge: 'bg-secondary-container text-on-secondary-container',
    activeTier: 'text-secondary',
  },
  {
    value: 'rank-s',
    rank: 'RANK S',
    tier: 'LEGENDARY',
    amount: '$7,000+',
    desc: '完整即時美術生產管線',
    activeBadge: 'bg-primary-container text-on-primary',
    activeTier: 'text-primary',
  },
];

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questType, setQuestType] = useState('character');
  const [budgetRank, setBudgetRank] = useState('rank-b');
  const [brief, setBrief] = useState('');
  const [formError, setFormError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [packetRefId, setPacketRefId] = useState('#QST-9981-TX');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const getEmailStatus = () => {
    if (!email) {
      return {
        text: 'AWAITING COMM',
        className: 'text-on-surface-variant text-[10px]',
        iconClass: 'text-outline',
      };
    }
    if (isEmailValid) {
      return {
        text: 'SIGNAL VALID [LOCKED]',
        className: 'text-secondary text-[10px]',
        iconClass: 'text-secondary',
      };
    }
    return {
      text: 'FREQUENCY DISTORTED',
      className: 'text-primary text-[10px]',
      iconClass: 'text-primary',
    };
  };

  const emailStatus = getEmailStatus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('請填寫冒險者稱呼 (HANDLE REQUIRED)');
      return;
    }
    if (!isEmailValid) {
      setFormError('通訊信箱格式異常 (INVALID EMAIL FREQUENCY)');
      return;
    }
    if (!brief.trim()) {
      setFormError('請填寫委託詳細情報說明 (QUEST BRIEF REQUIRED)');
      return;
    }

    setFormError('');
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0');
    setPacketRefId(`#QST-${randomHex}`);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setName('');
    setEmail('');
    setQuestType('character');
    setBudgetRank('rank-b');
    setBrief('');
  };

  return (
    <div id="quest" className="flex flex-col w-full">
      <div className="w-full px-gutter py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          {/* Quest Board Header Banner */}
          <section className="relative w-full bg-surface-container-low border-2 border-black p-space-lg md:p-space-xl shadow-manga-lg">
            <div className="absolute -top-3 left-6 bg-tertiary text-on-tertiary border-2 border-black px-space-sm py-0.5 font-label-sm text-label-sm uppercase tracking-widest shadow-manga-sm">
              // NOTICE_BOARD_ID: QB-2025-ALPHA
            </div>
            <div className="absolute -bottom-3 right-6 bg-secondary-container text-on-secondary-container border-2 border-black px-space-sm py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-manga-sm">
              RECEPTION_DESK: ONLINE [24H GUILD MONITOR]
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-3 h-3 bg-primary-container border border-black" />
                  <span className="font-label-md text-label-md text-primary tracking-widest uppercase">
                    GUILD QUEST BOARD // 任務發布板
                  </span>
                </div>
                <h2 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface tracking-tight uppercase">
                  POST A QUEST <span className="text-tertiary tracking-normal">// 任務委託</span>
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs">
                  「有新的機甲原創、二次元角色或即時 3D 專案需要支援？填寫任務委託單，公會主理人將在 24 小時內解析回覆契約！」
                </p>
              </div>

              <div className="w-full lg:w-72 bg-surface-container-lowest border-2 border-black p-space-md shadow-manga flex flex-col gap-space-xs">
                <div className="flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
                  <span>GUILD TELEMETRY</span>
                  <span className="text-tertiary animate-pulse">● SLOTS OPEN</span>
                </div>
                <div className="flex justify-between items-center text-on-surface">
                  <span className="font-label-md text-label-md">ACCEPTANCE RATE</span>
                  <span className="font-headline-sm text-headline-sm text-secondary">98.4%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high overflow-hidden border border-black">
                  <div className="h-full bg-secondary-container w-[92%]" />
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-outline-variant mt-1">
                  <span>ESTIMATED TAT: ~3-5 DAYS</span>
                  <span>SLOT #04/05</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Grid: Quest Form + Social Portals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Quest Form (lg:col-span-8) */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <div className="bg-surface-container border-2 border-black p-space-lg md:p-space-xl shadow-manga-lg relative">
                <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-high border-b-2 border-black -mx-space-lg md:-mx-space-xl -mt-space-lg md:-mt-space-xl px-space-lg md:px-space-xl py-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      assignment_turned_in
                    </span>
                    <span className="font-label-md text-label-md text-on-surface tracking-wider uppercase">
                      NEW MISSION LOG PROTOCOL // 委託契約書
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary">VERSION: CEL_V4.2</span>
                </div>

                <form className="flex flex-col gap-space-lg" onSubmit={handleSubmit} noValidate>
                  {formError && (
                    <div className="bg-error-container text-on-error-container border-2 border-black p-space-sm font-label-sm text-label-sm">
                      ⚠ {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-sm text-label-sm text-secondary-fixed flex items-center justify-between uppercase"
                        htmlFor="adv-name"
                      >
                        <span>INPUT:// 冒險者稱呼 (HANDLE)</span>
                        <span className="text-on-surface-variant text-[10px]">REQUIRED</span>
                      </label>
                      <div className="relative">
                        <input
                          id="adv-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="例: CAPTAIN_ASUKA / 專案總監"
                          required
                          className="w-full bg-surface-container-lowest border-2 border-black px-space-md py-space-sm font-label-md text-label-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-secondary-container focus:shadow-[3px_3px_0px_#00eefc] transition-all"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-3 text-outline text-[18px]">
                          badge
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-sm text-label-sm text-secondary-fixed flex items-center justify-between uppercase"
                        htmlFor="adv-email"
                      >
                        <span>INPUT:// 通訊聯絡信箱 (COMM FREQ)</span>
                        <span className={emailStatus.className}>{emailStatus.text}</span>
                      </label>
                      <div className="relative">
                        <input
                          id="adv-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="adventurer@guild.network"
                          required
                          className="w-full bg-surface-container-lowest border-2 border-black px-space-md py-space-sm font-label-md text-label-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-secondary-container focus:shadow-[3px_3px_0px_#00eefc] transition-all"
                        />
                        <span
                          className={`material-symbols-outlined absolute right-3 top-3 text-[18px] ${emailStatus.iconClass}`}
                        >
                          alternate_email
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quest Classification */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary-fixed uppercase">
                        SELECT:// 任務類型選擇 (QUEST CLASSIFICATION)
                      </span>
                      <span className="font-label-sm text-label-sm text-outline-variant">
                        [CHOOSE PRIMARY TARGET]
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      {questTypes.map((qt) => {
                        const checked = questType === qt.value;
                        return (
                          <label
                            key={qt.value}
                            onClick={() => setQuestType(qt.value)}
                            className={`relative flex items-center p-space-md border-2 ${
                              checked
                                ? 'bg-surface-container-high border-primary-container shadow-manga-sm'
                                : 'bg-surface-container-low border-black hover:bg-surface-container-high'
                            } cursor-pointer transition-all group`}
                          >
                            <input
                              type="radio"
                              name="quest-type"
                              value={qt.value}
                              checked={checked}
                              onChange={() => setQuestType(qt.value)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 mr-space-sm border border-black flex items-center justify-center ${
                                checked ? 'bg-primary-container' : 'bg-surface-container-lowest'
                              }`}
                            >
                              <div className="w-1.5 h-1.5 bg-surface-container-lowest" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface group-hover:text-primary">
                                {qt.title}
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                {qt.subtitle}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Rank */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary-fixed uppercase">
                        PARAMETER:// 預算階級 (REWARD BUDGET)
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary">
                        ESCROW SECURE
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                      {budgetRanks.map((b) => {
                        const checked = budgetRank === b.value;
                        return (
                          <label
                            key={b.value}
                            onClick={() => setBudgetRank(b.value)}
                            className={`relative flex flex-col p-space-md border-2 ${
                              checked
                                ? 'bg-surface-container-high border-secondary-container shadow-manga-sm'
                                : 'bg-surface-container-low border-black hover:bg-surface-container-high'
                            } cursor-pointer transition-all`}
                          >
                            <input
                              type="radio"
                              name="budget-rank"
                              value={b.value}
                              checked={checked}
                              onChange={() => setBudgetRank(b.value)}
                              className="sr-only"
                            />
                            <div className="flex items-center justify-between">
                              <span
                                className={`px-space-xs py-0.5 font-label-sm text-label-sm border border-black ${
                                  checked
                                    ? b.activeBadge
                                    : 'bg-surface-container-highest text-on-surface'
                                }`}
                              >
                                {b.rank}
                              </span>
                              <span
                                className={`font-label-sm text-label-sm ${
                                  checked ? b.activeTier : 'text-outline-variant'
                                }`}
                              >
                                {b.tier}
                              </span>
                            </div>
                            <span className="font-headline-sm text-headline-sm text-on-surface mt-2">
                              {b.amount}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {b.desc}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brief Textarea */}
                  <div className="flex flex-col gap-space-xs">
                    <label
                      className="font-label-sm text-label-sm text-secondary-fixed flex items-center justify-between uppercase"
                      htmlFor="adv-brief"
                    >
                      <span>SPECIFICATION:// 委託詳細情報說明 (QUEST BRIEF &amp; DEADLINE)</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        MAX 2,000 CHARACTERS
                      </span>
                    </label>
                    <textarea
                      id="adv-brief"
                      rows={5}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder={`請描述：\n1. 專案視覺風格與參考（日系賽璐珞、美式硬表面或 Low-Poly）\n2. 最終產出需求（.FBX, .Blend, Unreal Project, GLTF）\n3. 預計完成截稿日期與預算補充細節...`}
                      required
                      className="w-full bg-surface-container-lowest border-2 border-black p-space-md font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-secondary-container focus:shadow-[3px_3px_0px_#00eefc] transition-all"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        lock_clock
                      </span>
                      <span>ENCRYPTED GUILD PROTOCOL AES-256</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-space-xl py-space-md bg-primary-container text-on-primary border-2 border-black font-headline-sm text-headline-sm tracking-wider uppercase transition-all hover:bg-primary hover:text-on-primary-container hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_#000000] active:translate-x-0 active:translate-y-0 flex items-center justify-center gap-space-sm"
                    >
                      <span>發送任務委託 (SUBMIT QUEST)</span>
                      <span className="material-symbols-outlined text-[24px]">military_tech</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Social Portals & FAQ (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              <div className="bg-surface-container border-2 border-black p-space-lg shadow-manga-lg flex flex-col gap-space-md">
                <div className="flex items-center justify-between border-b-2 pb-space-sm border-black">
                  <span className="font-label-md text-label-md text-tertiary uppercase tracking-widest">
                    // SOCIAL PORTALS
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary-fixed">
                    社群傳送門
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  直接存取各維度公開資料庫，即時檢閱作品原始碼、3D 模型即時預覽與工作日常截圖。
                </p>

                <div className="flex flex-col gap-space-sm">
                  {socialPortals.map((portal) => (
                    <a
                      key={portal.name}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-space-md bg-surface-container-low border-2 border-black hover:bg-surface-container-high transition-all shadow-manga-sm"
                    >
                      <div className="flex items-center gap-space-md">
                        <div
                          className={`w-10 h-10 bg-surface-container-lowest border border-black flex items-center justify-center transition-colors ${portal.iconClass}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {portal.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`font-headline-sm text-headline-sm text-on-surface ${portal.titleHover}`}
                          >
                            {portal.name}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {portal.desc}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low border-2 border-black p-space-lg shadow-manga flex flex-col gap-space-sm relative overflow-hidden">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">emergency</span>
                  <span className="font-label-md text-label-md uppercase tracking-wider">
                    GUILD FAQ &amp; TERMS
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs text-body-sm font-body-sm text-on-surface-variant mt-1">
                  <div className="bg-surface-container-lowest border border-black p-space-sm">
                    <span className="text-on-surface font-label-sm text-label-sm block mb-1">
                      Q1. 包含商業授權嗎？
                    </span>
                    <span>
                      所有 Rank B 及以上專案皆享有全球永久遊戲 / 動畫完整商用授權與分潤豁免。
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest border border-black p-space-sm">
                    <span className="text-on-surface font-label-sm text-label-sm block mb-1">
                      Q2. 支援哪些主流引擎？
                    </span>
                    <span>
                      主力支援 Blender、Unreal Engine 5 (Nanite/Lumen 兼容) 與 Unity URP/HDRP。
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Point Banner */}
          <div className="w-full bg-surface-container-lowest border-2 border-black p-space-md md:p-space-lg shadow-manga-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 bg-surface-container-high border-2 border-black flex items-center justify-center text-secondary animate-bounce">
                <span className="material-symbols-outlined text-[28px]">save</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-secondary-container rounded-full" />
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    SAVE POINT DETECTED // 系統存檔點已確認
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  所有瀏覽軌跡與任務草稿已保存在本地緩存區。
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full sm:w-auto px-space-lg py-space-sm bg-tertiary text-on-tertiary border-2 border-black font-label-md text-label-md uppercase tracking-widest transition-all hover:bg-tertiary-fixed active:scale-95 shadow-manga-sm flex items-center justify-center gap-2"
            >
              <span>QUICK RETURN ↑ 快速歸航頂部</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quest Accepted Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="MISSION BROADCAST SUCCESS"
        headerIcon="check_circle"
        headerBg="bg-primary-container text-on-primary"
      >
        <div className="flex flex-col items-center text-center gap-space-sm my-space-sm">
          <div className="w-16 h-16 bg-surface-container border-2 border-black flex items-center justify-center text-tertiary shadow-manga-sm">
            <span className="material-symbols-outlined text-[36px]">mark_email_read</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">
            QUEST ACCEPTED! // 任務已成功送達
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            公會接待處已收到您的委託情報。信件已封包並傳送至主理人終端，預計於 24 小時內回覆排程！
          </p>
        </div>

        <div className="bg-surface-container border-2 border-black p-space-sm flex flex-col gap-1 font-label-sm text-label-sm text-outline">
          <div className="flex justify-between">
            <span>PACKET REF:</span>
            <span className="text-secondary">{packetRefId}</span>
          </div>
          <div className="flex justify-between">
            <span>ADVENTURER:</span>
            <span className="text-on-surface">{name || 'CAPTAIN_ASUKA'}</span>
          </div>
          <div className="flex justify-between">
            <span>TARGET DISPATCH:</span>
            <span className="text-tertiary">KAI // 3D ARTISAN CORE</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS:</span>
            <span className="text-primary-fixed">QUEUED IN BUFFER</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCloseModal}
          className="w-full py-space-sm bg-secondary-container text-on-secondary-container border-2 border-black font-label-md text-label-md uppercase tracking-widest hover:bg-secondary transition-all shadow-manga-sm"
        >
          ACKNOWLEDGEMENT / 確認歸隊
        </button>
      </Modal>
    </div>
  );
}
