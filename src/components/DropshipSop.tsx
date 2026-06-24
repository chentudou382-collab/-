import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, EyeOff, ClipboardList, CheckSquare, Sparkles, UserX, Package, Milestone, HelpCircle, BadgeCheck, DollarSign, Plus, Eye, AlertTriangle, RefreshCw, ShieldCheck, Info } from 'lucide-react';
import { DropshipOrder } from '../types';

export default function DropshipSop() {
  const [orders, setOrders] = useState<DropshipOrder[]>([
    {
      id: 'XY-202606-901',
      productName: '「深夜的小章鱼」卧室静音减压呼吸仪',
      buyerName: '林夕子',
      buyerPhone: '138****5541',
      buyerAddr: '浙江省杭州市下沙学林街518号大众大学女生宿舍C栋402',
      sourceUrl: 'https://pinduoduo.com/goods/12903820',
      sourcePrice: 22.50,
      salePrice: 119.00,
      status: 'padd_paying',
      privacyCheck: {
        blackFilm: true,
        anonymousSender: true,
        noProductKeyword: true,
        courierNote: true
      }
    },
    {
      id: 'XY-202606-902',
      productName: '「仲夏夜之梦」女性睡前保湿润亮液',
      buyerName: '悠悠妈妈',
      buyerPhone: '159****8827',
      buyerAddr: '江苏省南京市雨花台区铁心桥街道翡翠豪庭2期9栋2单元1104',
      sourceUrl: 'https://1688.com/offer/6638201',
      sourcePrice: 8.90,
      salePrice: 69.00,
      status: 'shipped',
      trackingNumber: 'YT662890123019',
      privacyCheck: {
        blackFilm: true,
        anonymousSender: true,
        noProductKeyword: true,
        courierNote: true
      }
    }
  ]);

  // 实货采购与套利计算器
  const [calcSource, setCalcSource] = useState(15.9);
  const [calcSale, setCalcSale] = useState(99.0);
  const [calcGiftMail, setCalcGiftMail] = useState(3.5); // 包裹配附件(黑膜+小信封+贴纸)

  // 供应商隐私合规核对清单状态
  const [complianceWaybill, setComplianceWaybill] = useState<boolean>(true); // 中通/圆通隐私面单
  const [complianceNoAdult, setComplianceNoAdult] = useState<boolean>(true); // 无成人字样包装
  const [complianceHiddenInfo, setComplianceHiddenInfo] = useState<boolean>(false); // 电子面单隐藏信息
  const [selectedPreset, setSelectedPreset] = useState<string>('pddShop'); // 预设模板

  // 异地封号容灾控制台状态
  const [recoveryName, setRecoveryName] = useState('王可可');
  const [recoveryPhone, setRecoveryPhone] = useState('18612349987');
  const [recoveryAddr, setRecoveryAddr] = useState('四川省成都市金牛区天回镇街道蜀新苑5栋22法');
  const [recoveryProduct, setRecoveryProduct] = useState('「深夜小章鱼」卧室呼吸仪');
  const [customSMS, setCustomSMS] = useState('');

  const generateRecoverySMS = () => {
    setCustomSMS(`【桃心秘境】亲爱的${recoveryName}，告诉你一个温馨小插曲：你拍下的卧室解压仪由于仓库做二度双重隐私无味杀菌封装，为了物流保密万无一失，不让驿站看穿，我们特殊启用了顺丰/邮政专用绿色特急绿色通道发出（面单：高档美容护理香薰）。由于系统接口正在例行底层结算，平台可能暂不显示单号。别担心，已为你极速单独配发，你的中秘专属快递号为：SF12440921102。有任何不解，加微信：wan_oasis 随时呼唤姐姐！比心~`);
  };

  const handleUpdateStatus = (id: string, newStatus: DropshipOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const netProfit = calcSale - calcSource - calcGiftMail;
  const marginPercent = ((netProfit / calcSale) * 100).toFixed(1);

  // 动态评估供应商隐私合规评级
  const activeChecksCount = [complianceWaybill, complianceNoAdult, complianceHiddenInfo].filter(Boolean).length;

  let riskAssessment = {
    level: '极高风险',
    color: 'text-red-400 bg-red-950/20 border-red-900/50',
    dotColor: 'bg-red-500',
    advice: '绝命警告：该供应商不支持任何隐私功能！买家收货地址与手机号完全裸奔，且包装极其容易携带敏感成人两性字样标签，极易引发大范围买家羞辱性差评与高额退款索赔！建议立即更换优质供货商！'
  };

  if (activeChecksCount === 3) {
    riskAssessment = {
      level: '极低风险 (全面隐私合规)',
      color: 'text-emerald-400 bg-emerald-950/20 border-emerald-900/50',
      dotColor: 'bg-emerald-500',
      advice: '完美级别的保密配送！屏蔽印花纸单、清洗云端分拣敏感字段，买家即使在人群集中的写字楼、宿舍或前台开箱也完全无尴尬。店铺客怨纠纷率可降至最低限度。'
    };
  } else if (activeChecksCount === 2) {
    riskAssessment = {
      level: '中等风险',
      color: 'text-amber-400 bg-amber-950/20 border-amber-900/30',
      dotColor: 'bg-amber-500',
      advice: '有基础保密机制。虽规避了外盒中性化与基础联系姓名，但在网点分拣扫描等二级环节由于缺乏云码屏蔽，仍有暴露情趣成人品的微弱隐患，可能产生零星敏感客怨，建议叮促供应商升级。'
    };
  } else if (activeChecksCount === 1) {
    riskAssessment = {
      level: '高风险',
      color: 'text-orange-400 bg-orange-950/20 border-orange-900/30',
      dotColor: 'bg-orange-500',
      advice: '高危警告！供应商在三大保密红线中仅勉强满足其中一个，在驿站停留或大头笔扫描打印时具有高达 80% 概率露出成人类字词，买家拒签率与差评退款几率剧烈飙升。'
    };
  }

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl" id="dropship-sop">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-800 pb-4 mb-5" id="sop-header">
        <div>
          <h2 className="text-lg font-medium text-stone-100 flex items-center gap-2" id="sop-title">
            <Truck className="w-5 h-5 text-rose-500" />
            杭州璇子专属：隐私发货代发与质量黑盒防灾系统
          </h2>
          <p className="text-xs text-stone-400 mt-1" id="sop-subtitle">
            痛点狙击：多维度审视代发环节：代发货源良莠不齐容易退单，且大卖家多店群控时常遇到“闲鱼中途突发封号导致买家订单及地址完全无法加载”的灾难。
          </p>
        </div>
        <span className="text-[10px] bg-red-950/40 text-red-300 border border-red-900 px-2 py-0.5 rounded font-mono" id="sop-version">
          防封号异地容灾机制已就位
        </span>
      </div>

      {/* 辩证分析卡：无货源代发的隐藏弊端与自动安全阀 */}
      <div className="mb-6 p-4.5 bg-stone-950 rounded-xl border border-stone-800 text-xs grid grid-cols-1 lg:grid-cols-12 gap-5" id="sop-mitigation-box">
        <div className="lg:col-span-8 space-y-2">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">⚠️ 空中代发隐秘弊端 (Dropshipping Drawback)</span>
          <p className="text-stone-450 leading-relaxed text-justify">
            1. <strong>质量失控：</strong>由于你不经手实物，上游拼多多/1688若采用劣质回料塑料做器具、发货混杂廉价宣传单、甚至有异味破裂，买家拆封后会愤怒差评并质问售后。
            <br />
            2. <strong>突发封号：</strong>闲鱼可能在订单发货前突然因判定违禁而<strong>关闭或限制你的商户账号</strong>。一旦封号，你将无法在后台查看订单，也无法复制买家的详细名字、电话、收货地址，直接导致无法去采购发货，大额资产被冻结，甚至遭遇恶意投诉！
          </p>

          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">💡 全视角阻绝对策 (Tactical Mitigations)</span>
          <p className="text-stone-450 leading-relaxed text-justify">
            1. <strong>首单防身样板检测：</strong>每次上新，必须自掏腰包买普通退货包退件（花费10余元）到本市自己家中拆看看质量。质量通关（医用环保、分贝极低）才可加入代发。
            <br />
            2. <strong>RPA异地同步容灾：</strong>利用 ShadowBot 运行采集脚本，在闲鱼出单的第一时间，<strong>将买家的姓名收货地址异地自动脱敏备份在本地文件/腾讯文档</strong>，不依赖闲鱼后台。即便账号突发暴雷被限制，也可以通过普通手机短信或微信单独安排供货发至其手中，保全资金流！
          </p>
        </div>

        {/* 供应上游质量防身检测清单 */}
        <div className="lg:col-span-4 bg-stone-900 p-4 border border-stone-850 rounded-xl space-y-3" id="quality-audit-inner">
          <span className="text-[10px] uppercase font-bold text-stone-200 block border-b border-stone-800 pb-1.5 flex items-center gap-1">
            <BadgeCheck className="w-4 h-4 text-emerald-500 animate-pulse" />
            代发货源四条质量红线 (防退款)
          </span>
          <ul className="text-[10.5px] text-stone-400 space-y-2 leading-relaxed" id="quality-list">
            <li className="flex items-start gap-1.5">
              <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-rose-600 shrink-0" />
              <span><strong>母婴级硅胶证：</strong>异味小、零毒素。决不要劣质带塑料刺鼻气味的杂片。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-rose-600 shrink-0" />
              <span><strong>分贝分界点 (35dB)：</strong>供货商必须保证开启强律动时，分贝不超越35分贝。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-rose-600 shrink-0" />
              <span><strong>无成人敏感纸条：</strong>供货商包裹里决不能塞有“好评返1元，购买成人用品小册”的纸卡。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-rose-600 shrink-0" />
              <span><strong>多重不透光黑膜：</strong>包裹必须为双层气泡垫，外套深黑防撕拉伸膜。</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="sop-main-grid">
        {/* 左侧：代发流水台 */}
        <div className="xl:col-span-7 space-y-5" id="sop-left">
          <div className="flex items-center justify-between" id="sop-table-header">
            <span className="text-xs font-bold text-stone-300">当前活跃代发订单流水 (与1688中继同步)</span>
            <span className="text-[10px] text-stone-500">模拟影刀群控批量下单状态</span>
          </div>

          <div className="space-y-4" id="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3 hover:border-rose-950 transition-colors" id={`order-card-${order.id}`}>
                <div className="flex items-center justify-between border-b border-stone-900 pb-2" id={`order-h-${order.id}`}>
                  <div>
                    <span className="text-xs font-bold text-rose-400 font-mono block">{order.id}</span>
                    <span className="text-[10px] text-stone-400 font-medium block mt-0.5">{order.productName}</span>
                  </div>
                  <div className="flex items-center gap-1.5" id={`status-badges-${order.id}`}>
                    {order.status === 'ordered' && <span className="text-[10px] bg-sky-950/30 text-sky-400 border border-sky-900 px-2 py-0.5 rounded">买家已付款</span>}
                    {order.status === 'padd_paying' && <span className="text-[10px] bg-amber-950/30 text-amber-400 border border-amber-900 px-2 py-0.5 rounded">1688/拼下单待付款</span>}
                    {order.status === 'shipped' && <span className="text-[10px] bg-emerald-950/30 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded">已发密包</span>}
                    {order.status === 'delivered' && <span className="text-[10px] bg-stone-900 text-stone-500 border border-stone-800 px-2 py-0.5 rounded">包裹安全签收</span>}
                  </div>
                </div>

                {/* 脱敏买家收货面单 */}
                <div className="bg-stone-900 p-3 rounded-lg text-xs space-y-1.5 leading-relaxed font-mono" id={`order-details-${order.id}`}>
                  <div className="flex justify-between text-stone-400" id={`row-name-${order.id}`}>
                    <span>收货人昵称/电话:</span>
                    <span className="text-stone-200 font-bold">{order.buyerName} ({order.buyerPhone})</span>
                  </div>
                  <div className="flex justify-between text-stone-400" id={`row-addr-${order.id}`}>
                    <span>保密寄件目的地:</span>
                    <span className="text-stone-300 text-right leading-relaxed max-w-sm">{order.buyerAddr}</span>
                  </div>
                  <div className="flex justify-between text-stone-400" id={`row-prices-${order.id}`}>
                    <span>代发底价/标售客单:</span>
                    <span>
                      <strong className="text-stone-550 font-medium font-mono">¥{order.sourcePrice}</strong> / <strong className="text-emerald-400 font-bold font-mono">¥{order.salePrice}</strong>
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex justify-between text-stone-450 pt-1.5 border-t border-stone-850" id={`row-track-${order.id}`}>
                      <span>保密承运单号:</span>
                      <span className="text-emerald-300 font-bold">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>

                {/* 隐私核定保障卡，点亮代表流程执行到位 */}
                <div className="flex flex-wrap gap-2 text-[9px]" id={`privacy-checks-${order.id}`}>
                  <span className="px-2 py-0.5 bg-rose-950/20 text-rose-300 border border-rose-950 rounded flex items-center gap-1 font-mono">
                    <CheckSquare className="w-3 h-3 text-rose-400 font-bold" />
                    深层不透光拉伸黑膜
                  </span>
                  <span className="px-2 py-0.5 bg-rose-950/20 text-rose-300 border border-rose-950 rounded flex items-center gap-1 font-mono">
                    <CheckSquare className="w-3 h-3 text-rose-400 font-bold" />
                    中性发件人(工艺礼品)
                  </span>
                  <span className="px-2 py-0.5 bg-rose-950/20 text-rose-300 border border-rose-950 rounded flex items-center gap-1 font-mono">
                    <CheckSquare className="w-3 h-3 text-rose-400 font-bold" />
                    快递标签无成人类目字样
                  </span>
                </div>

                {/* 状态操作台 */}
                <div className="flex justify-end gap-2 pt-1 border-t border-stone-900" id={`order-actions-${order.id}`}>
                  {order.status === 'padd_paying' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                      className="px-2.5 py-1 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-stone-100 text-[10px] font-bold rounded transition-all"
                      id={`ship-btn-${order.id}`}
                    >
                      已在拼多多完成付款(一键转配发)
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-[10px] rounded transition-all"
                      id={`deliver-btn-${order.id}`}
                    >
                      确认妥投(资金流回归)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：高利润套利计算器与突发封号异地容灾 */}
        <div className="xl:col-span-5 space-y-5" id="sop-right">
          {/* 高客单套利计算器 */}
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4 shadow-lg" id="profit-calculator">
            <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider block flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              桃心秘境：单品套利溢价模型
            </span>

            <div className="grid grid-cols-2 gap-3" id="calc-inputs">
              <div>
                <label className="text-[10px] text-stone-500 block mb-1">上游一件代发采购底价 :</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1.5 text-stone-500 text-xs">¥</span>
                  <input
                    type="number"
                    value={calcSource}
                    onChange={(e) => setCalcSource(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 pl-6 text-xs text-stone-200 focus:outline-none focus:border-rose-900/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-stone-500 block mb-1">升级包装后标售客单价 :</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1.5 text-stone-500 text-xs">¥</span>
                  <input
                    type="number"
                    value={calcSale}
                    onChange={(e) => setCalcSale(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 pl-6 text-xs text-stone-200 focus:outline-none focus:border-rose-900/40"
                  />
                </div>
              </div>
            </div>

            {/* 盈余核算条 */}
            <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl flex items-center justify-between" id="calc-result">
              <div>
                <span className="text-[10.5px] text-stone-400 block font-medium">单笔套利净纯利 :</span>
                <span className="text-xl font-bold font-mono text-emerald-400">¥{netProfit.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10.5px] text-stone-400 block font-medium">单品资金利润率 :</span>
                <span className="text-xl font-bold font-mono text-rose-400">{marginPercent}%</span>
              </div>
            </div>

            <p className="text-[10px] text-stone-500 leading-normal text-justify">
              <strong>杭州婉婉解析：</strong>普通人卖货嫌便宜没人买，是因为他们只卖“不锈钢或者塑胶本身”。你赠送了你用AI高速生成的睡前冥想音乐卡、身心灵能量小贴签、暖肚子热宝。溢价高达 <strong>6-8 倍</strong>，彻底消灭债务。
            </p>
          </div>

          {/* 供应商隐私合规核对清单 */}
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4 shadow-lg" id="supplier-privacy-compliance">
            <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider block flex items-center gap-1.5 animate-pulse">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              供应商隐私合规核对清单 (SOP Audit)
            </span>

            <p className="text-[10.5px] text-stone-400 leading-normal text-justify">
              本工具专门解决您「代销发货、上游代理商泄漏私密」的核心痛点。一键检测或手动勾选供应商隐私履约特征，实时输出平台物流层与消费者端的包裹防盗风险评级。
            </p>

            {/* 一键导入厂商预设 */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-stone-500 block">选择行业典型代发商模版一键测算 :</span>
              <div className="flex flex-wrap gap-1.5" id="preset-buttons-container">
                <button
                  onClick={() => {
                    setComplianceWaybill(true);
                    setComplianceNoAdult(true);
                    setComplianceHiddenInfo(true);
                    setSelectedPreset('oasis');
                  }}
                  className={`text-[9.5px] px-2 py-1 rounded border transition-all cursor-pointer ${
                    selectedPreset === 'oasis'
                      ? 'bg-rose-950/40 border-rose-500 text-rose-450 font-medium'
                      : 'bg-stone-900 border-stone-850 text-stone-400 hover:border-stone-800'
                  }`}
                  id="preset-oasis-btn"
                >
                  🍑 桃心专属保密源头仓
                </button>
                <button
                  onClick={() => {
                    setComplianceWaybill(true);
                    setComplianceNoAdult(true);
                    setComplianceHiddenInfo(false);
                    setSelectedPreset('pddShop');
                  }}
                  className={`text-[9.5px] px-2 py-1 rounded border transition-all cursor-pointer ${
                    selectedPreset === 'pddShop'
                      ? 'bg-amber-950/40 border-amber-500 text-amber-450 font-medium'
                      : 'bg-stone-900 border-stone-850 text-stone-400 hover:border-stone-800'
                  }`}
                  id="preset-pdd-btn"
                >
                  📦 拼多多一件代发同行
                </button>
                <button
                  onClick={() => {
                    setComplianceWaybill(false);
                    setComplianceNoAdult(true);
                    setComplianceHiddenInfo(false);
                    setSelectedPreset('standard1688');
                  }}
                  className={`text-[9.5px] px-2 py-1 rounded border transition-all cursor-pointer ${
                    selectedPreset === 'standard1688'
                      ? 'bg-orange-950/40 border-orange-500 text-orange-450 font-medium'
                      : 'bg-stone-900 border-stone-850 text-stone-400 hover:border-stone-800'
                  }`}
                  id="preset-1688-btn"
                >
                  ⚠️ 1688成人情趣器具厂
                </button>
              </div>
            </div>

            {/* 核对单可选列表 */}
            <div className="space-y-2 pt-1.5" id="compliance-checklist">
              <span className="text-[10px] text-stone-500 block">合规能力核对项 (点击随时手动调试) :</span>
              
              <label className="flex items-start gap-2.5 bg-stone-900 p-2.5 rounded-lg border border-stone-850 hover:border-stone-800 transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={complianceWaybill}
                  onChange={(e) => {
                    setComplianceWaybill(e.target.checked);
                    setSelectedPreset('custom');
                  }}
                  className="mt-0.5 accent-rose-600 shrink-0 w-3.5 h-3.5 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-200 block">中通/圆通隐私面单</span>
                  <span className="text-[9px] text-stone-450 block leading-normal">
                    物理外包装面单自动对收寄双方姓名、联系方式进行脱敏打码替代，防止在驿站积压或丢弃后个人信息外包走漏。
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 bg-stone-900 p-2.5 rounded-lg border border-stone-850 hover:border-stone-800 transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={complianceNoAdult}
                  onChange={(e) => {
                    setComplianceNoAdult(e.target.checked);
                    setSelectedPreset('custom');
                  }}
                  className="mt-0.5 accent-rose-600 shrink-0 w-3.5 h-3.5 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-200 block">无成人字样包装</span>
                  <span className="text-[9px] text-stone-450 block leading-normal">
                    严禁任何成人品牌、情色或敏感器具词汇打印在任何外显纸条卡片，使用通体纯色加黑防窥袋保密封装。
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 bg-stone-900 p-2.5 rounded-lg border border-stone-850 hover:border-stone-800 transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={complianceHiddenInfo}
                  onChange={(e) => {
                    setComplianceHiddenInfo(e.target.checked);
                    setSelectedPreset('custom');
                  }}
                  className="mt-0.5 accent-rose-600 shrink-0 w-3.5 h-3.5 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-stone-200 block">电子面单隐藏信息</span>
                  <span className="text-[9px] text-stone-450 block leading-normal">
                    包裹在运单云端系统自动被替代并归入「日常配饰」、「美容小样」，屏蔽分拣扫码端所显示的器具商品敏感大字。
                  </span>
                </div>
              </label>
            </div>

            {/* 动态风险评估结果卡片 */}
            <div className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all duration-300 ${riskAssessment.color}`} id="compliance-risk-result">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${riskAssessment.dotColor} animate-pulse`} />
                  <span className="text-[11.5px] font-bold">
                    风险评级方案：<span className="underline">{riskAssessment.level}</span>
                  </span>
                </div>
                {selectedPreset !== 'custom' && (
                  <span className="text-[8px] bg-stone-900/60 text-stone-400 px-1.5 py-0.5 rounded font-mono uppercase">
                    模版联动
                  </span>
                )}
              </div>
              <p className="text-[9.5px] leading-relaxed text-justify">
                {riskAssessment.advice}
              </p>
            </div>
          </div>

          {/* 突发封号备忘灾难容灾中心 */}
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4" id="recovery-center">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
                封号容灾中心 (防闲鱼订单清零方案)
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-red-950/20 text-red-300 border border-red-900 rounded font-mono">
                离线自发货
              </span>
            </div>

            <p className="text-[10.5px] text-stone-400 leading-normal text-justify">
              如果闲鱼因检测同行恶意举报突然冻结了你的账号，后台直接无法点开，但你手里却有待发货买家的订单。请使用此脱敏备份数据，通过我们与1688单独建立的离线备用管道直发，并发送高慰问短信，消除投诉和纠纷：
            </p>

            <div className="space-y-2.5 text-xs text-stone-400" id="recovery-inputs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-stone-500 block mb-0.5">离线买家姓名:</label>
                  <input type="text" value={recoveryName} onChange={(e) => setRecoveryName(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-200" />
                </div>
                <div>
                  <label className="text-[10px] text-stone-500 block mb-0.5">离线电话:</label>
                  <input type="text" value={recoveryPhone} onChange={(e) => setRecoveryPhone(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-200" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-stone-500 block mb-0.5">原始备份收获地址:</label>
                <input type="text" value={recoveryAddr} onChange={(e) => setRecoveryAddr(e.target.value)} className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-200" />
              </div>

              <button
                onClick={generateRecoverySMS}
                className="w-full py-1.5 bg-gradient-to-r from-red-800 to-amber-800 hover:from-red-700 hover:to-amber-700 text-stone-100 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
                id="gen-sms-btn"
              >
                <RefreshCw className="w-3 h-3" />
                第一手智能防投拆慰问短信一键生成
              </button>
            </div>

            {customSMS && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-stone-900 border border-stone-850 p-3 rounded-lg space-y-2"
                id="sms-result-box"
              >
                <span className="text-[10px] text-stone-300 block font-bold">已生成的防投诉离线暖心慰问信 (可直接发到对方手机):</span>
                <p className="text-[10.5px] text-stone-400 leading-relaxed text-justify whitespace-pre-wrap select-all">
                  {customSMS}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(customSMS);
                    alert('防投诉慰问信已完美复制！可以直接用虚拟号码/真实短信发给买家，完全杜绝纠纷！');
                  }}
                  className="px-2 py-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-[10px] text-stone-350 rounded font-bold"
                  id="copy-sms-btn"
                >
                  一键复制慰问短信
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
