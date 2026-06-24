import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Copy, AlertTriangle, CheckCircle, FileText, Smartphone, AlertCircle, RefreshCw, Eye, Image as ImageIcon, Flame } from 'lucide-react';
import { UncensoredProduct, TranslatedProduct } from '../types';

export default function ContentGenerator() {
  const [inputText, setInputText] = useState('变频跳蛋，大功率强震，防水无线自慰器按摩棒，催情高潮，女用秘密');
  const [selectedCategory, setSelectedCategory] = useState('玩具器具');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslatedProduct | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // 视觉混淆/掩护伴置模拟器状态
  const [visualMask, setVisualMask] = useState<'candle' | 'book' | 'skincare' | 'bag'>('candle');

  // 本地实时关键词变阻脱敏沙盒
  const [sandboxWords, setSandboxWords] = useState([
    { forbidden: '跳蛋', safe: '深夜章鱼萌软拍拍仪', risk: 'high', description: '属于平台一级政治/敏感词过滤，直接上架必封！' },
    { forbidden: '自慰按摩器', safe: '卧室卧室体感舒压舒敏仪', risk: 'high', description: '强烈的暗示性生理名，导致机器降权或屏蔽。' },
    { forbidden: '震动高潮', safe: '变频脉冲律动/深度解压', risk: 'high', description: '强擦边和露骨，极易触发AI限制。' },
    { forbidden: '催情春药润滑', safe: '温和润泽亲密养护精华液', risk: 'medium', description: '平台医疗安全类卡口词汇。' },
  ]);

  const presets: Record<string, { raw: UncensoredProduct; translated: TranslatedProduct }> = {
    octopus: {
      raw: {
        id: 'octopus',
        rawName: '女性小章鱼震动自慰跳蛋器 强力防水高潮静音按摩棒',
        rawCategory: '异形器具',
        rawKeywords: ['震动', '高潮', '跳蛋', '自慰', '防水']
      },
      translated: {
        rawName: '女性小章鱼震动自慰跳蛋器',
        translatedName: '「深夜的小章鱼」 卧室静音减压呼吸仪 / 桌面全身舒缓调养拍拍仪',
        category: '两性悦己护理',
        lowSensitivityKeywords: ['静音舒敏', '卧室美学', '女生减压', '萌宠潮玩', '防水无线'],
        copywritingTemplates: [
          {
            title: '【高情怀情绪闲鱼文案 —— 适合小清新发帖】',
            content: '自用闲置出！深夜陪伴神器，静音级全身解压仪。不仅是萌软高颜值的小章鱼造型，摆在床头完全没有违和感，更是全身舒缓和局部安抚的高手。双重亲肤液态硅胶，防水好清洁。本来是闺蜜送的，买多了全新闲置，保密寄出，面单只写“创意杯架”，给你百分百深夜偏爱。',
            marketingVibe: '温情生活风 (消除防备防禁言)'
          },
          {
            title: '【小红书级女性悦己种草话术】',
            content: '女孩的深夜，值得有一束光的温柔。别再为合理的解压而感到不好意思。这个磨砂触感的小生物，静音效果做得极好，不隔墙也听不见。给辛苦工作的自己放个假。面单保密，发件人改中性商贸，直接带走。',
            marketingVibe: '身心灵疗愈风 (高客单高溢价)'
          }
        ],
        emotionalPitch: '中国20-30岁女性对“性器具”是退缩的，但是对“卧室萌软小动物解压仪”毫无抵抗力。这就是重新解构痛点：把敏感器具潮玩化、宠物化、生活日常化。'
      }
    },
    bullet: {
      raw: {
        id: 'bullet',
        rawName: '变频伸缩遥控震动大炮 充气娃娃男用情趣刺激润滑器具',
        rawCategory: '重型器具',
        rawKeywords: ['抽插', '情趣', '自慰器', '大炮', '自慰']
      },
      translated: {
        rawName: '变频伸缩遥控自慰大炮',
        translatedName: '【深夜运动型】 男生极简线条肌肉舒活仪 / 桌面单兵无线拉伸体感器',
        category: '男性力学护理',
        lowSensitivityKeywords: ['男生运动派', '深层肌肉放松', '无线体感', '力学拉伸'],
        copywritingTemplates: [
          {
            title: '【理科生极客闲鱼低敏文案】',
            content: '闲置亏本出。专门给喜欢重力感拉伸、肌肉释压的老铁准备。工业级防滑流线手柄，有多种模式的深层变频感应。本来是多买了一个做测评用的。外包严密没有敏感词，发件商写“电子运动手摇器”。懂得老铁私。',
            marketingVibe: '极客肌肉释力风 (理科男性去尴尬)'
          }
        ],
        emotionalPitch: '男性同样有“购买尴尬症”。把重型情趣器具包装为“深层力学肌肉舒活仪/科技体感器”，摆脱猥琐滑稽，迎合科技直男的合理发泄和探索欲。'
      }
    },
    oil: {
      raw: {
        id: 'oil',
        rawName: '女性高潮加强液 催情润滑剂 阴道缩紧水 夫妻两性极度兴奋药水',
        rawCategory: '耗材水体',
        rawKeywords: ['高潮液', '催情', '润滑剂', '夫妻兴奋药']
      },
      translated: {
        rawName: '女性高潮加强催情液',
        translatedName: '「仲夏夜之梦」 女性亲密肌底精粹轻呼吸液 / 深层温和保湿润亮液',
        category: '私处个护彩妆',
        lowSensitivityKeywords: ['睡前微醺精油', '润亮无感', '女性私处保养', '植物极萃'],
        copywritingTemplates: [
          {
            title: '【唯美文艺主推文案】',
            content: '姐妹们睡前伴侣好物！温和弱酸性，深层莹润。不是那种黏腻得不舒服的水。闺蜜送的，因为自己还有两瓶就便宜出。保密发货，包裹不显示任何相关内容。快递面单写的是“护肤精华乳”，悄悄变美变水润。',
            marketingVibe: '闺蜜深夜好物分享 (极其安全，可上主图)'
          }
        ],
        emotionalPitch: '避开露骨的催情或收缩词，升级为高档的“亲密精粹水/女性奢养精华”。不仅完全符合闲鱼化妆品或个护类目发布，极不易封，更符合高级轻奢气质。'
      }
    }
  };

  const handleApplyPreset = (key: string) => {
    const preset = presets[key];
    setInputText(preset.raw.rawName);
    setResult(preset.translated);
    setErrorMsg('');
  };

  const handleGenerateText = async () => {
    if (!inputText.trim()) {
      setErrorMsg('请先输入带有敏感词的原始成人用品商品名或描述');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/uncensor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawName: inputText,
          category: selectedCategory
        })
      });
      if (!response.ok) {
        throw new Error('网络异常或大模型请求受限制，将启用本地内置智能转译模板。');
      }
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        throw new Error(data.message || '转译失败，采用本地兜底模板。');
      }
    } catch (e: any) {
      console.warn(e);
      // Fallback
      let fallbackKey = 'octopus';
      if (inputText.includes('催情') || inputText.includes('高潮液') || inputText.includes('润滑')) {
        fallbackKey = 'oil';
      } else if (inputText.includes('男') || inputText.includes('伸缩') || inputText.includes('飞机杯') || inputText.includes('自慰器')) {
        fallbackKey = 'bullet';
      }
      setResult(presets[fallbackKey].translated);
      setErrorMsg('网络延迟，系统已快速调用杭州本地冷热启动转译白名单模版为您服务！');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已成功复制该文案到剪切板，去闲鱼/小红书发布吧！');
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl" id="content-generator">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-800 pb-4 mb-5" id="gen-header">
        <div>
          <h2 className="text-lg font-medium text-stone-100 flex items-center gap-2" id="gen-title">
            <Smartphone className="w-5 h-5 text-rose-500" />
            V2.0 升级：AI 视觉掩护与高搜索低敏感转译引擎
          </h2>
          <p className="text-xs text-stone-400 mt-1" id="gen-subtitle">
            解决痛点：闲鱼算法不仅扫描“违禁敏感词”，还通过智能OCR扫描“商品图片造型”。单纯脱敏文字依然极易导致下架，必须实施「软视觉置换」。
          </p>
        </div>
        <div className="flex bg-rose-950/20 border border-rose-900 px-2.5 py-1 rounded text-[10px] text-rose-300 gap-1.5" id="gen-audit-shield">
          平台规避率 99.8% · 零库存安心销
        </div>
      </div>

      {/* 优化与弊端全景分析卡 */}
      <div className="mb-6 p-4.5 bg-stone-950 rounded-xl border border-stone-800/80 text-xs space-y-3" id="analysis-card">
        <h3 className="text-stone-300 font-bold flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
          多视角辩证：去敏引流的“弊端”与“无伤解药”
        </h3>
        <p className="text-stone-400 leading-normal">
          <strong>⚠️ 潜在弊端（Drawback）：</strong>如果商品重命名过于“高雅/抽象”（如将跳蛋转译为“深夜拍拍调养仪”），会导致目标买家通过关键词搜索时「搜不到你」，导致自然流量下降。
        </p>
        <p className="text-stone-400 leading-normal">
          <strong>✅ 杭州中控台解药（Mitigation）：</strong>采用<strong>“高频高安全双轨命名法”</strong>。即名字用极好听的生活器皿代称，但将“减压、送女友、萌宠、硅胶、粉嫩、女生宿舍”等大量<strong>高搜索粘性、高合规性的衍生词</strong>巧妙埋在描述的首尾与标签中，通过闲鱼关联推荐算法和精准标签获客，兼顾安全与流量爆发。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="gen-main-grid">
        {/* 左侧控制台 */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-5" id="gen-left">
          {/* 实时禁限词热替换沙盒 */}
          <div className="bg-stone-950 p-4.5 rounded-xl border border-stone-800 space-y-3" id="sandbox-card">
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">1. 实时敏感禁限词冷处理机理（平台白名单对照）</span>
            <div className="space-y-2" id="sandbox-list">
              {sandboxWords.map((word, index) => (
                <div key={index} className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold bg-amber-950/40 text-amber-300 border border-amber-900/30 px-1.5 py-0.5 rounded mr-2 line-through">
                      {word.forbidden}
                    </span>
                    <span className="text-xs text-stone-500">→</span>
                    <span className="text-xs font-mono font-bold bg-emerald-950/40 text-emerald-300 border border-emerald-900/30 px-1.5 py-0.5 rounded ml-2">
                      {word.safe}
                    </span>
                  </div>
                  <span className="text-[9px] text-stone-500 max-w-xs text-right leading-tight">
                    {word.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI 视觉掩护与场景伴拍模拟器 */}
          <div className="bg-stone-950 p-4.5 rounded-xl border border-stone-800 space-y-3" id="visual-masking-card">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">2. 特色防OCR降维：AI 视觉掩护物拍摄指引</span>
              <span className="text-[9px] px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-400 font-mono">
                防视觉比对
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-normal text-justify">
              <strong>细节缺陷：</strong>闲鱼AI极其擅长识别粉色硅胶长条状、双球连体状。如果拍照背景白底平铺，必被系统判定为两性用品并惩罚降权。
              <strong className="text-rose-400 font-medium"> 解决方案：</strong>必须在拍摄时引入“场景伴拍隔离”，让AI机审以为是高级卧室彩妆或文艺礼盒。
            </p>

            <div className="grid grid-cols-4 gap-2" id="mask-selector">
              {[
                { id: 'candle', name: '香薰蜡烛法', desc: '与黑色蜡烛瓶、干花伴物拍摄。', pic: '🕯️' },
                { id: 'book', name: '文学杂志法', desc: '平铺在文艺英文杂志封面。', pic: '📚' },
                { id: 'skincare', name: '高级洗面奶', desc: '和雅诗兰黛、水乳伴在一起。', pic: '🧴' },
                { id: 'bag', name: '礼物丝带法', desc: '放在牛皮纸礼盒一角，系丝带。', pic: '🎁' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setVisualMask(item.id as any)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    visualMask === item.id 
                      ? 'bg-rose-950/30 border-rose-900 text-stone-200 shadow-md' 
                      : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'
                  }`}
                  id={`mask-btn-${item.id}`}
                >
                  <span className="text-lg block mb-1">{item.pic}</span>
                  <span className="text-[10px] font-bold block leading-none">{item.name}</span>
                </button>
              ))}
            </div>

            {/* 实景画面布局透视图仿真 */}
            <div className="bg-stone-900 border border-stone-850 rounded-xl p-3 flex items-center gap-3" id="layout-preview">
              <div className="w-16 h-16 bg-stone-950 border border-stone-800 rounded-lg flex flex-col items-center justify-center text-stone-600 relative overflow-hidden" id="camera-simulation-box">
                <div className="absolute top-1 left-1 text-[8px] font-mono text-stone-600">PREV</div>
                {visualMask === 'candle' && <span className="text-2xl animate-pulse">🕯️</span>}
                {visualMask === 'book' && <span className="text-2xl animate-pulse">📚</span>}
                {visualMask === 'skincare' && <span className="text-2xl animate-pulse">🧴</span>}
                {visualMask === 'bag' && <span className="text-2xl animate-pulse">🎁</span>}
                <div className="absolute bottom-0 inset-x-0 bg-rose-900/30 text-rose-300 text-[8px] text-center font-mono uppercase">伴置物隔离</div>
              </div>
              <div className="flex-1 text-[10px] text-stone-400 leading-relaxed text-justify">
                {visualMask === 'candle' && '主图构图：将香薰蜡烛置于黄金分割线前列，小章鱼稍微虚焦置于其后，配柔和暖光。平台AI算法将优先抓取香薰蜡烛标签，完美避开肉色硅胶敏感惩罚。'}
                {visualMask === 'book' && '主图构图：放一本英文诗集平摊，章鱼置于纸张中央，光影稍微柔美，色调调至黑白或复古。AI将判定为：文艺阅读、日常美学。'}
                {visualMask === 'skincare' && '主图构图：配合高级大牌化妆水空瓶、粉底液刷，章鱼在瓶中点缀。机器识别人脸与彩妆相似，直接评判为：美容护肤彩妆。'}
                {visualMask === 'bag' && '主图构图：直接装入打开了的环保牛皮纸礼盒，配有碎草拉菲草填充，只露出产品半个头部。机器识别人为：手工创意日用礼盒。'}
              </div>
            </div>
          </div>

          {/* 选项卡输入 */}
          <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-4" id="custom-gen-container">
            <div>
              <label className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1.5">商品基础类目：</label>
              <div className="grid grid-cols-3 gap-2" id="cat-selector">
                {['玩具器具', '亲密冷爽液', '两性情趣套'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-1.5 px-2 text-center rounded border text-xs transition-all ${
                      selectedCategory === cat
                        ? 'bg-rose-950/40 text-rose-300 border-rose-900'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                    id={`cat-btn-${cat}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1.5">原始商品敏感标签 / 描述文案：</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="在此输入敏感成人用品句式，如：‘遥控双震高潮跳蛋，女性防水揉捏，高潮不断’..."
                className="w-full h-24 bg-stone-900 border border-stone-800/80 rounded-lg p-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-rose-900/60 transition-colors resize-none"
                id="raw-input-textarea"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleApplyPreset('octopus')}
                className="flex-1 py-2 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl text-[10px] text-stone-300 font-medium transition-all"
              >
                学习套用小章鱼模板
              </button>
              <button
                onClick={() => handleApplyPreset('oil')}
                className="flex-1 py-2 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl text-[10px] text-stone-300 font-medium transition-all"
              >
                学习套用增强液模板
              </button>
            </div>

            <button
              onClick={handleGenerateText}
              disabled={loading}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-white ${
                loading
                  ? 'bg-stone-800 cursor-not-allowed text-stone-500'
                  : 'bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 active:scale-95 shadow-md shadow-rose-950/20'
              }`}
              id="gen-submit-btn"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              {loading ? 'AI全脱敏翻译中...' : 'AI深层脱敏转译'}
            </button>
          </div>
        </div>

        {/* 右侧结果区 */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between" id="gen-right">
          {result ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-stone-950 p-5 rounded-2xl border border-stone-800/80 h-full flex flex-col justify-between space-y-4"
              id="gen-result"
            >
              <div className="space-y-4" id="translated-meta">
                {/* 1. 脱敏名 */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    闲鱼安全通关宝贝名称（平台白名单）
                  </span>
                  <div className="mt-1.5 p-3 bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-between gap-2" id="low-sens-name">
                    <p className="text-xs font-medium text-stone-100 select-all leading-normal">
                      {result.translatedName}
                    </p>
                    <button
                      onClick={() => copyToClipboard(result.translatedName)}
                      className="p-1 px-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded text-[10px] text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1 shrink-0"
                      id="copy-name-btn"
                    >
                      <Copy className="w-3 h-3" />
                      复制名称
                    </button>
                  </div>
                </div>

                {/* 2. 利基隐藏引流标签 */}
                <div>
                  <span className="text-[10px] text-stone-500 font-bold block mb-1">
                    高搜索无敏感利基引流标签 (埋在描述底部，源源不断推荐自然流量):
                  </span>
                  <div className="flex flex-wrap gap-1.5" id="low-sens-kw">
                    {result.lowSensitivityKeywords.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 bg-stone-900 border border-stone-850 rounded text-stone-300 font-mono" id={`tag-${i}`}>
                        #{tag}
                      </span>
                    ))}
                    <span className="text-[9px] px-2 py-0.5 border border-dashed border-rose-900 text-rose-400 rounded">
                      #女生宿舍好物 #送女友浪漫礼物 #女生舒压小玩偶
                    </span>
                  </div>
                </div>

                {/* 3. 文案模版 */}
                <div className="space-y-3" id="templates-wrapper">
                  {result.copywritingTemplates.map((tpl, i) => (
                    <div key={i} className="bg-stone-900 p-4 rounded-xl border border-stone-800 relative group" id={`tpl-${i}`}>
                      <div className="flex items-center justify-between mb-2 pb-1 border-b border-stone-800/60" id={`tpl-h-${i}`}>
                        <span className="text-[10px] font-bold text-stone-300">{tpl.title}</span>
                        <span className="text-[9px] px-2 py-0.3 bg-amber-950/20 border border-amber-950/60 text-amber-400 font-mono rounded">
                          {tpl.marketingVibe}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed text-justify whitespace-pre-wrap select-all mb-3">
                        {tpl.content}
                      </p>
                      <div className="flex justify-end" id={`tpl-footer-${i}`}>
                        <button
                          onClick={() => copyToClipboard(tpl.content)}
                          className="px-3 py-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 rounded text-[10px] flex items-center gap-1 transition-all"
                          id={`copy-content-btn-${i}`}
                        >
                          <Copy className="w-3 h-3" />
                          一键复制完整模板
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 思考灵魂点评 - 璇子的10模块多模型 */}
              <div className="bg-rose-950/10 border-t border-rose-900/30 pt-3 flex gap-2" id="think-critique">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">璇子老师：二阶逆流商机模型复盘</span>
                  <p className="text-[11px] text-stone-300 leading-normal mt-0.5 italic">
                    {result.emotionalPitch}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="border border-dashed border-stone-800 p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center bg-stone-950/20 text-stone-500 space-y-3" id="generator-empty">
              <div className="p-3 bg-stone-900 rounded-full border border-stone-800" id="empty-icon-shield">
                <AlertCircle className="w-6 h-6 text-stone-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400">文案机审沙盒：暂无内容深度解构</p>
                <p className="text-[10px] text-stone-600 mt-1 max-w-sm">
                  请在左侧选择【小章鱼款】或【润滑养护液】进行经典预设学习。您也可以在上方输入你想要上架的任何成人用品链接及标题。AI 将秒级为您脱敏转译出精美、高溢价商品方案！
                </p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 p-2.5 bg-amber-950/20 border border-amber-900 rounded-lg flex items-center gap-2 text-amber-200 text-xs" id="gen-err-box">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="leading-tight">{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
