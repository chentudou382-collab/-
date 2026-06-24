import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, Award, Sparkles, BookOpen, Ban, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { StrategyDimension } from '../types';

export default function StrategyPanel() {
  const [activeTab, setActiveTab] = useState<'shuzhi' | 'global' | 'business'>('shuzhi');

  const strategyData: Record<'shuzhi' | 'global' | 'business', StrategyDimension> = {
    shuzhi: {
      id: 'shuzhi',
      title: '你自己的视角 · 璇子（婉婉老师）',
      subtitle: '单兵AI轻启动 · 负重40W者的终极抗风险操盘手',
      icon: 'Shield',
      description: '结合你作为单亲妈妈与40w负债的真实情况，决策首要权重是“极限止损、零库存高周转、效率百倍增、绝对控险”。这并不是退却，而是利用你熟练掌握的高阶AI流、Python自动化及高认知思维模型，实施降维打击。',
      coreConcept: '「不要去拼体量，去拼无摩擦阻力」 —— 用自动化消融精力消耗，把有限时间专注于私域客情关系和高溢价包装。',
      keyPoints: [
        {
          title: '零库存·无货源分佣 (Dropshipping)',
          desc: '绝不压1分钱货。利用1688与拼多多的一件代发（隐私打包），充当纯流量代理。这样即便因为限号等不可抗力，你的财务损耗也趋近于零。',
          model: '止损思维 / 反脆弱'
        },
        {
          title: 'AI全自推图文与文案矩阵',
          desc: '成人用品闲鱼对封号极其严。你需要批量注册辅助号抗风险（老闲鱼号1个，身边亲友号3-5个为矩阵）。利用AI根据低敏感白名单重写图文，规避机审，释放精力。',
          model: '网络效应 / 二阶思维'
        },
        {
          title: '高情商客服托管 · 攻克“咨询羞耻”',
          desc: '买家对两性话题含蓄而羞涩。你利用AI客服充当“专业、温暖、去羞耻化”的情感疗愈闺蜜，提供无压力购买咨询，迅速促成秒单，这是大卖家千篇一律机器人客服绝对做不到的。',
          model: '信息不对称 / 情感杠杆'
        }
      ]
    },
    global: {
      id: 'global',
      title: '全局视角 · 成人用品产业链',
      subtitle: '两性悦己商机大生态 · 从工厂到私域的闭环重塑',
      icon: 'Globe',
      description: '放眼中国性健康与悦己消费大局，成人用品依然处于蓬勃的高端渗透期。过去粗鄙、低俗、隐藏在暗处的胡同夫妻店，正在被“生活美学、亲密关系调试、女性觉醒、情调潮玩”所代替。',
      coreConcept: '「借闲鱼之水，养私域之鱼」 —— 将闲鱼作为免费、高漏斗的获客入口，通过隐私卡和售后手册，将精准女性客户沉淀到私域。',
      keyPoints: [
        {
          title: '上游：源头供应链整合 (义乌/东莞)',
          desc: '源头出厂价往往只有零售价的15%-25%。利用拼多多/1688作为中转池，后期销量稳定后，可定向勾兑具有“女性人体工学、美学认证”的厂家，拿到底价支持。',
          model: '价值链重构 / 反向代理'
        },
        {
          title: '中游：闲鱼矩阵流量群控',
          desc: '普通玩家在闲鱼靠手动发2个单。而职业全局玩法是利用 ShadowBot/影刀 将“自动选品-AI优化敏感词-定时发布-未读消息自动回传到 Ollama/Gemini 自动决策回复”整合进一条自动化流水线，一人可管20个店。',
          model: '临界点效应 / 规模经济'
        },
        {
          title: '下游：私域高复购疗愈社群',
          desc: '前端是一次性玩具，后端是超高复购的情趣消耗品（消毒液、香氛精油、安全套、润滑剂）以及女性心灵成长、亲密关系社群课。客户一旦对你产生去信任的亲密依赖，终身价值（LTV）可放大10倍以上。',
          model: 'LTV 客户终身价值模型'
        }
      ]
    },
    business: {
      id: 'business',
      title: '商业视角 · 痛点与溢价包装',
      subtitle: '重新解构悦己市场 · 逃离低价泥潭的升维游戏',
      icon: 'Award',
      description: '为什么很多成人用品店赚不到钱？因为大多数人还停留在粗暴卖“器具物理功能”的阶段，不仅文案擦边下俗易招封号，而且陷入价格白刃战。我们需要转换视角：这不是生理器具，这是女性“夜晚的身心灵理疗仪”。',
      coreConcept: '「出售无压力的愉悦，消解深夜的隐忧」 —— 帮中国女性体面地获取愉悦，提供零曝光、零尴尬、极速安全的高端体验。',
      keyPoints: [
        {
          title: '去羞耻感营销 (De-shaming)',
          desc: '将露骨的功能词汇，高雅地转译为“深夜安神、身体能量理愈、闺蜜悄悄话”等概念。包装物不印任何成人字样，连面单甚至客服话术都充满正向、健康、生活美学的温和引导。',
          model: '定位理论 / 反共识博弈'
        },
        {
          title: '隐私发隔离 (Privacy Barrier)',
          desc: '中国买家的终极痛点是“怕被人知道”。通过双层保密黑色拉伸膜、虚构中性发件人（如“XX百货”/“XX工艺品”）、快递面单品名不显示、虚构寄件电话，建立牢不可破的信任长城。',
          model: '降噪过滤器 / 极限安全'
        },
        {
          title: '高客单附加值套利',
          desc: '不再只卖裸机。通过搭赠“暖宫贴、酒精消毒杀菌包”、以及你用AI自动生产的《女性能量悦己与亲密关系升级AI电子指南》（低成本虚拟赠品），让普通的产品变成一个极有仪式感的“悦己礼盒”，溢价空间提成300%。',
          model: '增量套利 / 1+N搭售模型'
        }
      ]
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'shuzhi': return <Shield className="w-5 h-5 text-rose-400" id="icon-shuzhi" />;
      case 'global': return <Globe className="w-5 h-5 text-amber-400" id="icon-global" />;
      case 'business': return <Award className="w-5 h-5 text-emerald-400" id="icon-business" />;
      default: return <Sparkles className="w-5 h-5 text-rose-400" id="icon-default" />;
    }
  };

  const currentData = strategyData[activeTab];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl" id="strategy-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-800 pb-5 mb-6" id="strategy-header">
        <div>
          <h2 className="text-xl font-medium text-stone-100 flex items-center gap-2 font-sans" id="strategy-title">
            <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
            桃心秘境 · 商业多维大棋盘
          </h2>
          <p className="text-xs text-stone-400 mt-1" id="strategy-desc">用婉婉老师特有的 10 模块 + 26 思维模型，全方位推演你与行业的契合局势</p>
        </div>
        
        {/* 三个维度的优雅切换Tab */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 mt-4 md:mt-0" id="strategy-tabs">
          <button
            onClick={() => setActiveTab('shuzhi')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'shuzhi'
                ? 'bg-rose-950/40 text-rose-300 border border-rose-900/50 shadow-inner'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            id="tab-shuzhi"
          >
            <Shield className="w-3.5 h-3.5" />
            璇子个人视角
          </button>
          
          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'global'
                ? 'bg-amber-950/40 text-amber-300 border border-amber-900/50 shadow-inner'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            id="tab-global"
          >
            <Globe className="w-3.5 h-3.5" />
            全局生态视角
          </button>
          
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'business'
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 shadow-inner'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            id="tab-business"
          >
            <Award className="w-3.5 h-3.5" />
            商业解构视角
          </button>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
        id="strategy-content-wrapper"
      >
        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800/80 leading-relaxed" id="category-intro-box">
          <div className="flex items-center gap-2 mb-3" id="intro-title-wrapper">
            {getIcon(activeTab)}
            <h3 className="text-sm font-semibold text-stone-200" id="intro-title">{currentData.title}</h3>
          </div>
          <p className="text-xs text-stone-400 italic mb-4 font-mono text-rose-300/80" id="intro-sub">{currentData.subtitle}</p>
          <p className="text-xs text-stone-300 leading-relaxed text-justify" id="intro-desc">{currentData.description}</p>
          
          <div className="mt-4 p-3 bg-rose-950/10 border-l-2 border-rose-600 rounded-r-lg" id="core-concept-box">
            <span className="text-[10px] uppercase tracking-wider text-rose-400 font-bold block mb-1">核心操盘灵魂:</span>
            <p className="text-xs text-stone-200 font-medium">{currentData.coreConcept}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            打通痛点 · 落地操盘抓手:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="strategy-points-grid">
            {currentData.keyPoints.map((point, index) => (
              <div
                key={index}
                className="bg-stone-950/60 hover:bg-stone-950 border border-stone-800 hover:border-stone-700/80 p-4 rounded-xl transition-all flex flex-col justify-between group"
                id={`point-card-${index}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-300 group-hover:text-rose-400 transition-colors">{point.title}</span>
                    <span className="text-[9px] px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-400 font-mono">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
                    {point.desc}
                  </p>
                </div>
                {point.model && (
                  <div className="mt-4 pt-2 border-t border-stone-900 flex items-center justify-between" id={`point-footer-${index}`}>
                    <span className="text-[9px] font-mono text-stone-500 uppercase">底层思维模型</span>
                    <span className="text-[10px] text-rose-400/90 font-mono font-medium rounded px-1.5 py-0.5 bg-rose-950/20 border border-rose-950">
                      {point.model}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
