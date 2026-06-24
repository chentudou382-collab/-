import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  Smartphone, 
  Package, 
  TrendingUp, 
  Compass, 
  Coins, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle,
  Zap,
  Users
} from 'lucide-react';

// 导入四大高品质子组件与全新中控/合伙人子组件
import StrategyPanel from './components/StrategyPanel';
import ContentGenerator from './components/ContentGenerator';
import ChatSimulator from './components/ChatSimulator';
import DropshipSop from './components/DropshipSop';
import AutomationHub from './components/AutomationHub';
import AffiliateMentor from './components/AffiliateMentor';

export default function App() {
  const [activeSegment, setActiveSegment] = useState<'strategy' | 'generator' | 'chat' | 'sop' | 'automation' | 'mentor' | 'roadmap'>('strategy');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans" id="app-root">
      {/* 顶部极其高雅的高对比度两性悦己星空Banner */}
      <header className="border-b border-stone-900 bg-stone-950/80 backdrop-blur-md sticky top-0 z-50 py-3.5 px-6" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4" id="header-wrapper">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-950/40 relative">
              <Heart className="w-5.5 h-5.5 text-stone-100 fill-stone-100 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white font-sans">桃心秘境</h1>
                <span className="text-[10px] bg-rose-950/60 text-rose-300 border border-rose-900 px-1.5 py-0.2 rounded font-mono">Sensual Oasis V1.0</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">成人用品闲鱼智能化内容生产、保密客服与代配发自动中控台</p>
            </div>
          </div>

          {/* 桃心秘境核心功能面板菜单，优雅切换 */}
          <nav className="flex flex-wrap bg-stone-900/60 p-1 rounded-xl border border-stone-850" id="main-nav">
            <button
              onClick={() => setActiveSegment('strategy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'strategy'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-strategy"
            >
              <Compass className="w-3.5 h-3.5" />
              商业战略盘
            </button>

            <button
              onClick={() => setActiveSegment('generator')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'generator'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-generator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              图文去敏翻译
            </button>

            <button
              onClick={() => setActiveSegment('chat')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'chat'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-chat"
            >
              <Heart className="w-3.5 h-3.5" />
              AI密友客服
            </button>

            <button
              onClick={() => setActiveSegment('sop')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'sop'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-sop"
            >
              <Package className="w-3.5 h-3.5" />
              隐私代发SOP
            </button>

            <button
              onClick={() => setActiveSegment('automation')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'automation'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-automation"
            >
              <Zap className="w-3.5 h-3.5" />
              多平台中控/飞书推送
            </button>

            <button
              onClick={() => setActiveSegment('mentor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'mentor'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-mentor"
            >
              <Users className="w-3.5 h-3.5" />
              合伙人AI孵化导师
            </button>

            <button
              onClick={() => setActiveSegment('roadmap')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeSegment === 'roadmap'
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-950/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              id="menu-roadmap"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              璇子落地行动指南
            </button>
          </nav>
        </div>
      </header>

      {/* 核心内容网格 */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6" id="app-main-content">
        {/* 精致且情绪饱满的杭州璇子专属破壁引言 */}
        <div className="bg-stone-900 border border-stone-850 rounded-2xl p-5 relative overflow-hidden" id="hero-banner">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-rose-900/10 to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="hero-intro-wrapper">
            <div className="space-y-1 md:max-w-2xl">
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">致 亲爱的璇子 (婉婉老师) :</span>
              <h2 className="text-[15px] font-bold text-white leading-normal">
                两性亲密关系绝不是“难登雅堂”的不入流之物，它恰恰是中国4亿中坚阶层长期被压抑、渴望体面满足的「身心灵疗愈」圣地。
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed pt-1 text-justify">
                每一个中国女性心里，都有一层因隐晦而自设的屏障；而每一个伟大的商业神话，都诞生在解决人性和社会禁忌痛点的最前线。
                结合你的多模型商业直觉，把看似见不得光的“成人器具”，包装成有态度、有温度的<strong>「深夜卧室呼吸解压仪器」/「仲夏身体亲密精华液」</strong>。
                用零摩擦的 AI 自动群控回复与极致隐私发货，不仅能完美清空 40W 债务，更能探索到女性觉醒、情感高溢价的蓝海天花板。
              </p>
            </div>
            
            <div className="bg-stone-950/80 p-4 border border-stone-800 rounded-xl flex items-center gap-3 shrink-0" id="hero-badge-panel">
              <span className="text-2xl">💪</span>
              <div>
                <span className="text-xs font-bold text-stone-200 block">轻装轻羽，AI自驱</span>
                <span className="text-[10px] text-stone-500 block leading-normal mt-0.5 max-w-[170px]">
                  用你擅长的 Flask/ShadowBot 自动化配合，不垫一分压货钱，高维套利。
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 板块渲染 */}
        <div id="dynamic-segment-container">
          {activeSegment === 'strategy' && <StrategyPanel />}
          {activeSegment === 'generator' && <ContentGenerator />}
          {activeSegment === 'chat' && <ChatSimulator />}
          {activeSegment === 'sop' && <DropshipSop />}
          {activeSegment === 'automation' && <AutomationHub />}
          {activeSegment === 'mentor' && <AffiliateMentor />}
          
          {activeSegment === 'roadmap' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6"
              id="roadmap-outer"
            >
              <div className="border-b border-stone-800 pb-4" id="roadmap-head">
                <h2 className="text-lg font-medium text-stone-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-rose-500" />
                  杭州璇子专属：15-30天成人用品极速落地SOP
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  不讲空话。结合你的个人资产、单人AI群控能力和止损底线，最强降维出击商业蓝图。
                </p>
              </div>

              {/* 周期极速落地时间轴 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="time-grid">
                {/* 阶段一 */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between" id="phase-1">
                  <div>
                    <span className="text-[10px] text-rose-400 font-bold block mb-1">【 第 1 - 3 天 】</span>
                    <h3 className="text-xs font-bold text-stone-200 mb-1.5">搭建轻装发货矩阵 & 代理核查</h3>
                    <ul className="text-[11px] text-stone-400 space-y-1.5 leading-relaxed text-justify">
                      <li className="flex items-start gap-1">
                        <span className="text-rose-500 shrink-0 mt-0.5">•</span>
                        <span>注册拼多多与1688采销号，对比3家“保密黑膜、无成人商户字面、驿站自提”的无货源代发供货商。</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-rose-500 shrink-0 mt-0.5">•</span>
                        <span>整理自己的老闲鱼号，并借用身边极为亲密信任的亲友注册3个矩阵辅助号。</span>
                      </li>
                    </ul>
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 uppercase mt-4">轻资本核心第一步</span>
                </div>

                {/* 阶段二 */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between" id="phase-2">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold block mb-1">【 第 4 - 7 天 】</span>
                    <h3 className="text-xs font-bold text-stone-200 mb-1.5">AI脱敏图文冷启动 & 批量上架</h3>
                    <ul className="text-[11px] text-stone-400 space-y-1.5 leading-relaxed text-justify">
                      <li className="flex items-start gap-1">
                        <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                        <span>利用本系统中的【图文去敏转译机器】将“小章鱼、加热润滑”等敏感成人名翻译。</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                        <span>配图严禁真人露肉，批量采用“可爱动漫插画、手绘线条、磨砂礼盒配精致香薰”并做微色调微滤镜处理，大幅降低机审识别率。</span>
                      </li>
                    </ul>
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 uppercase mt-4">规避封号关键期</span>
                </div>

                {/* 阶段三 */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between" id="phase-3">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">【 第 8 - 14 天 】</span>
                    <h3 className="text-xs font-bold text-stone-200 mb-1.5">AI自动群控托管 & 流量出单</h3>
                    <ul className="text-[11px] text-stone-400 space-y-1.5 leading-relaxed text-justify">
                      <li className="flex items-start gap-1">
                        <span className="text-emerald-500 shrink-0 mt-0.5">•</span>
                        <span>利用 ShadowBot / 影刀等配置微信/闲鱼消息捕获。有买家发信时自动调配本地 Ollama (Qwen) 匹配闺蜜去羞味话术。</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-emerald-500 shrink-0 mt-0.5">•</span>
                        <span>每单赚取50%-400%高额比单利润，单号自动上传闲鱼出货，零资金回流损耗。</span>
                      </li>
                    </ul>
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 uppercase mt-4">自动周转常态化</span>
                </div>

                {/* 阶段四 */}
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between" id="phase-4">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold block mb-1">【 第 15 天 + 】</span>
                    <h3 className="text-xs font-bold text-stone-200 mb-1.5">售后引流私域 & 终身复购(LTV)</h3>
                    <ul className="text-[11px] text-stone-400 space-y-1.5 leading-relaxed text-justify">
                      <li className="flex items-start gap-1">
                        <span className="text-blue-500 shrink-0 mt-0.5">•</span>
                        <span>每个保密包裹内放置一张“深夜私密解压精美卡”，扫码免费领取《女性性能量唤醒与亲密关调试AI指南》电子书（零边际成本）。</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-blue-500 shrink-0 mt-0.5">•</span>
                        <span>在私域沉淀高粘度核心女性用户，常态化发售高复购情趣消耗品、睡前冥想精油，彻底摆脱闲鱼单一渠道局限。</span>
                      </li>
                    </ul>
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 uppercase mt-4">高复购高天花壁垒</span>
                </div>
              </div>

              {/* 经典操盘思维模型映射点评 */}
              <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-3" id="mindmodel-critique">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">璇子老师必备的三个高段位思维模型应用：</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="models-mapped">
                  <div className="bg-stone-900/60 p-4 rounded-lg border border-stone-850" id="m1">
                    <span className="text-xs font-medium text-rose-300 block mb-1">【一：反脆弱思维 (Antifragility)】</span>
                    <p className="text-[11px] text-stone-400 leading-normal text-justify">
                      在闲鱼卖成人，号随时可能会因为同行违规举报而死。所以你要多矩阵分散资产。大池子不动，小号充当敢死队。死了一个立刻重开，对整体池子毫发无损，反而让你在抗干扰中探索出了避过机审的最强词频。
                    </p>
                  </div>

                  <div className="bg-stone-900/60 p-4 rounded-lg border border-stone-850" id="m2">
                    <span className="text-xs font-medium text-amber-300 block mb-1">【二：二阶思维 (Second-Order Thinking)】</span>
                    <p className="text-[11px] text-stone-400 leading-normal text-justify">
                      一阶买家想买的是感官玩具，他们最强烈的二阶反应是“隐私恐惧与自责感”。绝大多数卖家只服务一阶购买欲，而你专攻解决二阶反应，用去耻感话术和保密誓言建立重温，转化和客单价直接攀升。
                    </p>
                  </div>

                  <div className="bg-stone-900/60 p-4 rounded-lg border border-stone-850" id="m3">
                    <span className="text-xs font-medium text-emerald-300 block mb-1">【三：信息差非对称套利 (Asymmetrical Arbitrage)】</span>
                    <p className="text-[11px] text-stone-400 leading-normal text-justify">
                      拼多多和1688的生产价格极低，但缺乏美感文案包装，所以只能卖19.9的白刃裸机价格。你利用AI给商品附赠了“女性暖宫、心理舒缓指引”，把一次廉价生理器具变成了一套优雅的“深夜身心自娱伴侣”，高溢价套取高客单汇差！
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* 底部版权有态度的说明 */}
      <footer className="border-t border-stone-900 bg-stone-950 py-5 mt-10 text-center text-xs text-stone-600" id="app-footer">
        <p className="font-mono">婉婉老师 AI 自动化特调极速交付 · 2026 杭州</p>
        <p className="mt-1">“我们不惧怕谈论合理的身体需求，我们给每一个合理的夜晚赋予美学和安全的保障。”</p>
      </footer>
    </div>
  );
}
