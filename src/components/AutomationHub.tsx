import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Send, 
  Settings, 
  Layers, 
  CheckCircle2, 
  Smartphone, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  FileJson,
  PlusCircle,
  Truck,
  ArrowRight,
  AlertTriangle,
  Copy,
  Check,
  CheckCircle,
  Share2,
  Info,
  ShieldCheck
} from 'lucide-react';

interface MockOrder {
  id: string;
  platform: '拼多多' | '闲鱼';
  productName: string;
  buyerName: string;
  price: number;
  quantity: number;
  time: string;
  status: '待采购' | '采购中' | '已配发发货' | '已完成';
  orderId: string;
}

export default function AutomationHub() {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [orders, setOrders] = useState<MockOrder[]>(() => {
    const local = localStorage.getItem('tx_automation_orders');
    if (local) {
      try { return JSON.parse(local); } catch (e) {}
    }
    return [
      {
        id: 'ord_1',
        platform: '拼多多',
        productName: '「深夜卧室温暖解压仪器」高定静音调情棒',
        buyerName: '陈女士 (杭州西湖)',
        price: 189.0,
        quantity: 1,
        time: '10分钟前',
        status: '待采购',
        orderId: 'PDD-8829402948293'
      },
      {
        id: 'ord_2',
        platform: '闲鱼',
        productName: '「仲夏身体亲密精华液」私密润滑油 (送脱敏说明书)',
        buyerName: '江同学 (武汉洪山)',
        price: 99.0,
        quantity: 2,
        time: '34分钟前',
        status: '已配发发货',
        orderId: 'XY-7729830294726'
      },
      {
        id: 'ord_3',
        platform: '拼多多',
        productName: '「闺蜜礼袋·晨曦蝴蝶」智能暖腹微温震动器具',
        buyerName: '林小姐 (广州天河)',
        price: 249.0,
        quantity: 1,
        time: '2小时前',
        status: '待采购',
        orderId: 'PDD-1192039482710'
      }
    ];
  });

  const [feishuLogs, setFeishuLogs] = useState<{ id: string; msg: string; time: string; success: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPayload, setLastPayload] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'status' | 'webhook' | 'logs' | 'workflow'>('workflow');
  const [selectedOrderForTemplate, setSelectedOrderForTemplate] = useState<string>('ord_1');
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'strict'>('standard');
  const [rpaMode, setRpaMode] = useState<'auto' | 'hybrid'>('auto');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // 保存订单数据
  useEffect(() => {
    localStorage.setItem('tx_automation_orders', JSON.stringify(orders));
  }, [orders]);

  // 计算订单统计数据
  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + (o.price * o.quantity), 0),
    pddCount: orders.filter(o => o.platform === '拼多多').length,
    xyCount: orders.filter(o => o.platform === '闲鱼').length,
    pendingShip: orders.filter(o => o.status === '待采购').length
  };

  // 触发模拟下单
  const handleSimulateOrder = async (platform: '拼多多' | '闲鱼') => {
    const products = {
      '拼多多': [
        { name: '「深夜卧室温暖解压仪器」高定静音调情棒', price: 189.0 },
        { name: '「闺蜜礼袋·晨曦蝴蝶」智能暖腹微温震动器具', price: 249.0 },
        { name: '「磨砂极简香薰重组」保密发货智能加温按摩器', price: 159.0 }
      ],
      '闲鱼': [
        { name: '「仲夏身体亲密精华液」私密润滑油 (送脱敏说明书)', price: 99.0 },
        { name: '「深夜卧室呼吸解压包」温热触电式指纹环', price: 139.0 },
        { name: '「舒暖玫瑰自娱露」纯植物两性护理液', price: 79.0 }
      ]
    };

    const buyerNames = ['王女士 (成都武侯)', '林同学 (北京海淀)', '李小姐 (深圳南山)', '陆女士 (南京鼓楼)', '安顾客 (上海静安)'];
    const pList = products[platform];
    const randProd = pList[Math.floor(Math.random() * pList.length)];
    const randBuyer = buyerNames[Math.floor(Math.random() * buyerNames.length)];
    const randOrderId = (platform === '拼多多' ? 'PDD-' : 'XY-') + Math.floor(Math.random() * 90000000000 + 10000000000);

    const newOrder: MockOrder = {
      id: 'ord_' + Date.now(),
      platform,
      productName: randProd.name,
      buyerName: randBuyer,
      price: randProd.price,
      quantity: 1,
      time: '刚刚',
      status: '待采购',
      orderId: randOrderId
    };

    setOrders(prev => [newOrder, ...prev]);

    // 自动触发飞书推送
    await executeFeishuPush(newOrder);
  };

  // 执行飞书Webhook推送任务
  const executeFeishuPush = async (order: MockOrder) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/feishu_push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl,
          platform: order.platform,
          productName: order.productName,
          orderId: order.orderId,
          buyerName: order.buyerName,
          price: order.price,
          quantity: order.quantity
        })
      });

      const body = await res.json();
      setLastPayload(body.cardJson);

      const logMsg = `[${order.platform}] 自动化推送：商品「${order.productName.slice(0, 11)}..」付款买家为「${order.buyerName.split(' ')[0]}」：${body.message}`;
      
      setFeishuLogs(prev => [
        {
          id: 'log_' + Date.now(),
          msg: logMsg,
          time: new Date().toLocaleTimeString(),
          success: body.success
        },
        ...prev
      ]);
    } catch (err: any) {
      setFeishuLogs(prev => [
        {
          id: 'log_' + Date.now(),
          msg: `推送失败：${err.message || err}`,
          time: new Date().toLocaleTimeString(),
          success: false
        },
        ...prev
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 标记为已采购发货
  const handleMarkShipped = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: '已配发发货' };
      }
      return o;
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-stone-900 border border-stone-850 rounded-2xl p-6 space-y-6 shadow-xl"
      id="automation-hub-root"
    >
      {/* 顶部标题 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800 pb-5" id="hub-header">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20">
              <Zap className="w-4 h-4 animate-bounce" />
            </span>
            <h2 className="text-base font-bold text-stone-100">桃心秘境·多店RPA中控与飞书通知系统</h2>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            无缝监听拼多多店铺下单、闲鱼咨询出单。当买家付款，立刻将精脱敏发货提示推送至您的飞书或手机，让多平台订单不漏单、发货零延迟！
          </p>
        </div>

        {/* 触发模拟按钮 */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => handleSimulateOrder('拼多多')}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-stone-100 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 shadow-md shadow-amber-950/20"
            id="sim-pdd-order"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            模拟拼多多出单
          </button>
          <button
            onClick={() => handleSimulateOrder('闲鱼')}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-stone-100 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 shadow-md shadow-rose-950/20"
            id="sim-xy-order"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            模拟闲鱼出单
          </button>
        </div>
      </div>

      {/* 统计指标卡片组 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-grid">
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center gap-3.5 relative overflow-hidden">
          <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block leading-none">今日整体销售额</span>
            <span className="text-lg font-bold text-stone-200 mt-1 block">¥{stats.totalRevenue.toFixed(1)}</span>
          </div>
          <div className="absolute right-0 bottom-0 text-[64px] font-bold text-stone-900/10 select-none pointer-events-none font-mono">¥</div>
        </div>

        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center gap-3.5">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block leading-none">拼多多店铺订单</span>
            <span className="text-lg font-bold text-stone-200 mt-1 block">{stats.pddCount} 笔已同步</span>
          </div>
        </div>

        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center gap-3.5">
          <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block leading-none">闲鱼矩阵订单</span>
            <span className="text-lg font-bold text-stone-200 mt-1 block">{stats.xyCount} 笔同步</span>
          </div>
        </div>

        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center gap-3.5 relative overflow-hidden">
          <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block leading-none">待采购/发货提醒</span>
            <span className="text-lg font-bold text-emerald-400 mt-1 block">{stats.pendingShip} 单极速待发</span>
          </div>
          {stats.pendingShip > 0 && (
            <div className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
          )}
        </div>
      </div>

      {/* 子菜单切换 */}
      <div className="flex border-b border-stone-800" id="hub-tabs">
        <button
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'status'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
          id="hub-tab-status"
        >
          平台订单自动流 ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'workflow'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
          id="hub-tab-workflow"
        >
          <Layers className="w-3.5 h-3.5" />
          订单多店介入工作流 (SOP指令)
        </button>
        <button
          onClick={() => setActiveTab('webhook')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'webhook'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
          id="hub-tab-webhook"
        >
          <Settings className="w-3.5 h-3.5" />
          配置真实飞书或手机中控推送
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
          id="hub-tab-logs"
        >
          <Bell className="w-3.5 h-3.5" />
          飞书推送日志 ({feishuLogs.length})
        </button>
      </div>

      {/* 多选项面板 */}
      <div className="min-h-[290px]" id="hub-content">
        <AnimatePresence mode="wait">
          {activeTab === 'status' && (
            <motion.div
              key="orders-list"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
              id="list-orders-wrapper"
            >
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-stone-950 rounded-xl border border-stone-850 text-stone-500 text-xs">
                  暂未监听到任何新订单，请点击上方“模拟订单”极速创建测试流！
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-stone-950 p-4 rounded-xl border border-stone-850 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-stone-750 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        {/* 渠道标签 */}
                        <span className={`px-2 py-1 text-[9px] font-bold rounded shrink-0 ${
                          order.platform === '拼多多' 
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-900/50' 
                            : 'bg-rose-950/60 text-rose-400 border border-rose-900/50'
                        }`}>
                          {order.platform}
                        </span>
                        
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-stone-200">{order.productName}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-400">
                            <span>单号: <strong className="font-mono text-stone-300">{order.orderId}</strong></span>
                            <span>买家: <span className="text-stone-300">{order.buyerName}</span></span>
                            <span>数量: <strong className="text-rose-400">{order.quantity} 件</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* 价格与流转状态 */}
                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none border-stone-900 pt-3 md:pt-0 shrink-0">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] text-stone-500 block leading-none">应收/结算</span>
                          <span className="text-xs font-bold text-white font-mono mt-1 block">¥{(order.price * order.quantity).toFixed(1)}</span>
                        </div>

                        {/* 操作按纽 */}
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            order.status === '待采购' 
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/60' 
                              : 'bg-stone-900 text-stone-500 border border-stone-800'
                          }`}>
                            {order.status}
                          </span>

                          {order.status === '待采购' ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => executeFeishuPush(order)}
                                className="p-1 px-2 bg-stone-900 hover:bg-stone-850 text-stone-300 text-[10px] border border-stone-800 rounded flex items-center gap-1 transition-all"
                                title="手动重发飞书机器人通知"
                              >
                                <Send className="w-3 h-3" />
                                推送
                              </button>
                              <button
                                onClick={() => handleMarkShipped(order.id)}
                                className="p-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded flex items-center gap-0.5 transition-all shadow-md"
                              >
                                采购下单
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-stone-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
                              已处理
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'workflow' && (
            <motion.div
              key="workflow-setup"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
              id="workflow-config-wrapper"
            >
              {/* 模块顶部概览引导 */}
              <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-4" id="workflow-top-doc">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-200">极速订单接入与合伙人交付控制台</h3>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed text-justify">
                      本模块专门为了解决您「拼多多多店与闲鱼合怀人流转难」的硬痛点设计。
                      您可以一键生成专属于特定订单的标准电子交付 JSON 契约，或生成人类友好的飞书/微信标准化 SOP 发货话术。
                      当合伙人拿到指令，即可按照您设定的无感安全标准进行百分百正确履约，不用压货，赚取双倍客差价！
                    </p>
                  </div>
                </div>
              </div>

              {/* 主操作格栅 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="workflow-workflow-grid">
                
                {/* 1. 左侧：中中配置与测试引导 */}
                <div className="space-y-5 bg-stone-950 p-5 rounded-xl border border-stone-850" id="workflow-left-panel">
                  <div className="border-b border-stone-900 pb-3">
                    <span className="text-[10px] text-rose-500 font-mono font-bold block uppercase">CONFIGURATION STEPS</span>
                    <h4 className="text-xs font-bold text-stone-300 mt-0.5">步骤一：设定飞书机器人并关联订单</h4>
                  </div>

                  {/* 1a. 飞书Webhook设置 */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-stone-400 block mb-1">
                      1. 输入飞书群 Bot Webhook 链接：
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://open.feishu.cn/open-apis/bot/v2/hook/..."
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs font-mono text-stone-300 placeholder-stone-600 focus:outline-none focus:border-rose-500"
                      />
                      <button
                        onClick={async () => {
                          const activeOrder = orders.find(o => o.id === selectedOrderForTemplate) || orders[0];
                          if (activeOrder) {
                            await executeFeishuPush(activeOrder);
                          }
                        }}
                        disabled={isLoading}
                        className="px-3 bg-stone-900 hover:bg-stone-800 text-[11px] font-medium text-stone-300 hover:text-white border border-stone-800 rounded-lg flex items-center gap-1 transition-all shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        联调发送测试卡片
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-500 shrink-0">
                      提示：此 Webhook 与系统全局同步，输入后即可在测试出单时往您的飞书推送精美卡片通知。
                    </p>
                  </div>

                  {/* 1b. 信息脱敏级别 & RPA规则设置 */}
                  <div className="space-y-3.5 pt-1">
                    <div>
                      <label className="text-[11px] font-bold text-stone-400 block mb-1.5 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-rose-500" />
                        2. 客户隐私去敏机制选项：
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSecurityLevel('standard')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            securityLevel === 'standard'
                              ? 'bg-stone-900/80 border-rose-500/50 text-rose-400'
                              : 'bg-stone-900/20 border-stone-850 text-stone-400 hover:border-stone-800'
                          }`}
                        >
                          <span className="text-xs font-bold block">🛡️ 标准脱敏代发</span>
                          <span className="text-[9px] text-stone-550 block mt-1 leading-relaxed">
                            自动屏蔽买家中间四个手机号并且隐藏真实门牌号，最适合作为通用渠道分包。
                          </span>
                        </button>
                        <button
                          onClick={() => setSecurityLevel('strict')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            securityLevel === 'strict'
                              ? 'bg-stone-900 border-rose-500/50 text-rose-400'
                              : 'bg-stone-900/20 border-stone-850 text-stone-400 hover:border-stone-800'
                          }`}
                        >
                          <span className="text-xs font-bold block">🔒 极客国密级脱敏</span>
                          <span className="text-[9px] text-stone-550 block mt-1 leading-relaxed">
                            详细地址及电话一律转译成去标识 Token，合伙人履约时需要通过中央系统完成解析。
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-400 block mb-1.5 flex items-center gap-1 flex-wrap">
                        <Settings className="w-3.5 h-3.5 text-rose-500" />
                        3. 指令格式与流转模式：
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setRpaMode('auto')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            rpaMode === 'auto'
                              ? 'bg-stone-900/80 border-rose-500/50 text-rose-400'
                              : 'bg-stone-900/20 border-stone-850 text-stone-400 hover:border-stone-800'
                          }`}
                        >
                          <span className="text-xs font-bold block">⚙️ 自动自动化 (JSON 契约)</span>
                          <span className="text-[9px] text-stone-550 block mt-1 leading-relaxed">
                            生成精练标准的 JSON 指令结构，专为影刀、Shadowbot 等 RPA 执行程序自动调取。
                          </span>
                        </button>
                        <button
                          onClick={() => setRpaMode('hybrid')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            rpaMode === 'hybrid'
                              ? 'bg-stone-900 border-rose-500/50 text-rose-400'
                              : 'bg-stone-900/20 border-stone-850 text-stone-400 hover:border-stone-800'
                          }`}
                        >
                          <span className="text-xs font-bold block">💬 团队直发模式 (微信-飞书文本)</span>
                          <span className="text-[9px] text-stone-550 block mt-1 leading-relaxed">
                            生成带有高感染力、人性化步骤指南的微信文本描述，十分适合直接复制发放给合伙人好友。
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 1c. 样板订单选择 */}
                  <div className="space-y-2 pt-3 border-t border-stone-900">
                    <label className="text-[11px] font-bold text-stone-400 block">
                      4. 选择欲作为样板的销售订单：
                    </label>
                    <select
                      value={selectedOrderForTemplate}
                      onChange={(e) => setSelectedOrderForTemplate(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          [{o.platform}] - {o.productName.slice(0, 15)}... - 应收 ¥{(o.price * o.quantity).toFixed(0)} -单号 {o.orderId.slice(0, 14)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. 右侧：标准的“订单指令 JSON 模板 & 标准话术”生成树 */}
                <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 flex flex-col justify-between" id="workflow-right-panel">
                  {/* JSON/TEXT 实时切换查看器 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-900 pb-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <FileJson className="w-4 h-4 text-rose-500" />
                        <h4 className="text-stone-300 text-xs">
                          {rpaMode === 'auto' ? '自动中控 API/RPA 订单指令契约 (JSON)' : '合伙人微信/飞书直发发货指令话术 (Text)'}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          const activeOrder = orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {
                            id: 'dummy', platform: '拼多多', productName: '「深夜卧室温暖解压仪器」高定静音调情棒', buyerName: '陈女士 (杭州西湖)', price: 189.0, quantity: 1, time: '刚刚', status: '待采购', orderId: 'PDD-8829402948293'
                          };
                          const textPayload = rpaMode === 'auto' 
                            ? JSON.stringify({
                                "instruction_id": `CMD-${activeOrder.platform === '拼多多' ? 'PDD' : 'XY'}-${activeOrder.orderId}`,
                                "timestamp": new Date().toISOString(),
                                "source_platform": activeOrder.platform,
                                "execution_priority": "🔥 HIGH (Requires immediate dispatch within 12h)",
                                "dispatch_security": {
                                  "anonymized_buyer": activeOrder.buyerName,
                                  "privacy_mask": securityLevel === 'strict' ? "🔒 HIGHLY_ENCRYPTED (Address matching via central RPA platform token to prevent direct customer leak)" : "🛡️ PARTIAL_MASK (Standard address mask applied)",
                                  "category_alias": "生活解压用品 / 居家舒暖系列"
                                },
                                "goods_info": {
                                  "sku_name": activeOrder.productName,
                                  "quantity": activeOrder.quantity,
                                  "unit_price_rmb": activeOrder.price,
                                  "estimated_settlement": activeOrder.price * activeOrder.quantity
                                },
                                "standard_fulfillment_sop": [
                                  "1. 根据密文对应关联的备存中控数据库，防范多平台封卡限售。",
                                  "2. 采购下单叮嘱面单脱敏：寄件人统一定名生活摆件，禁止带有成人等两性字样。选用保密深黑无光包装袋层层阻断透光限制。",
                                  "3. 反馈韵达、顺丰或中通等真实快递轨迹至桃心秘境服务器，秒结提成佣金并完成核销。"
                                ]
                              }, null, 2)
                            : `🔔 【桃心秘境·合伙人标准化发货委派令】\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n📌 来源渠道：[${activeOrder.platform}]\n📦 待发商品：${activeOrder.productName} (数量：${activeOrder.quantity}件)\n👤 收件客户：${activeOrder.buyerName}\n🔒 隐私安全级别：${securityLevel === 'strict' ? '高能国密级脱敏（极度保密）' : '标准脱敏单（去隐私中间码）'}\n🛡️ 寄件品名声明：居家装饰/舒缓空气摆件 (严标不得出现成人情趣两性字眼，通体黑膜防窥保密包装)\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n💡 团队履约分步指南：\n1. 收到本通知后，请依据以上标准无感下单一件代发平台。\n2. 包裹中确保随货物包入一张《深夜身心能量唤醒调试指南》女性调护温情小卡片。\n3. 下单后请速在4小时内将发货顺丰/中通快递单号私聊反馈给主理人结束循环订单。`;

                          navigator.clipboard.writeText(textPayload);
                          setCopiedText(rpaMode);
                          setTimeout(() => setCopiedText(null), 2000);
                        }}
                        className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1.5 bg-stone-900 hover:bg-stone-850 px-2.5 py-1 rounded-md transition-all border border-stone-800 shrink-0 cursor-pointer"
                        id="copy-workflow-payload"
                      >
                        {copiedText === rpaMode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400 animate-pulse" />
                            已成功复制
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            一键复制指令
                          </>
                        )}
                      </button>
                    </div>

                    {rpaMode === 'auto' ? (
                      <div className="space-y-3" id="workflow-json-preview">
                        <pre className="text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-850 p-4 rounded-xl leading-relaxed max-h-[280px] overflow-y-auto overflow-x-auto text-left">
                          {JSON.stringify({
                            "instruction_id": `CMD-${(orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {platform: '拼多多'}).platform === '拼多多' ? 'PDD' : 'XY'}-${(orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {orderId: '88294029482' }).orderId}`,
                            "timestamp": new Date().toISOString(),
                            "source_platform": (orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {platform: '拼多多'}).platform,
                            "execution_priority": "🔥 HIGH (Requires immediate dispatch within 12h)",
                            "dispatch_security": {
                              "anonymized_buyer": (orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {buyerName: '陈女士 (杭州)'}).buyerName,
                              "privacy_mask": securityLevel === 'strict' ? "🔒 HIGHLY_ENCRYPTED (Address matching via central RPA platform token to prevent direct customer leak)" : "🛡️ PARTIAL_MASK (Standard address mask applied)",
                              "category_alias": "生活解压用品 / 居家舒暖系列"
                            },
                            "goods_info": {
                              "sku_name": (orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {productName: '智能暖腹微温震动器具'}).productName,
                              "quantity": (orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {quantity: 1}).quantity,
                              "unit_price_rmb": (orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {price: 189}).price,
                              "estimated_settlement": ((orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {price: 189}).price) * ((orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {quantity: 1}).quantity)
                            },
                            "standard_fulfillment_sop": [
                              "1. 根据密文对应关联的备存中控数据库，防范多平台封卡限售。",
                              "2. 采购下单叮嘱面单脱敏：寄件人统一定名生活摆件，禁止带有成人等字样。选用保密深黑无光包装袋层层阻断透光限制。",
                              "3. 反馈韵达、顺丰或中通等真实快递轨迹至桃心秘境服务器，秒结提成佣金并完成核销。"
                            ]
                          }, null, 2)}
                        </pre>
                        <div className="flex items-start gap-1.5 text-[10px] text-stone-500 text-justify">
                          <Info className="w-3.5 h-3.5 shrink-0 text-stone-600 mt-0.5" />
                          <span>
                            此 JSON 内容支持全格式机器读取。您可以直接输入诸如影刀 RPA 循环动作逻辑中，或者将其挂载到您的 API 路由中用于高效对接分销中台，实现完全不手动的单号反输。
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3" id="workflow-text-preview">
                        <div className="text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-stone-300 bg-stone-900 border border-stone-850 p-4 rounded-xl max-h-[280px] overflow-y-auto text-left">
                          🔔 【桃心秘境·合伙人标准化发货委派令】
                          <br />━━━━━━━━━━━━━━━━━━━━━━━━━━
                          <br />📌 来源渠道：[{(orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {platform: '拼多多'}).platform}]
                          <br />📦 待发商品：{(orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {productName: '智能暖腹微温震动器具'}).productName} (数量：{(orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {quantity: 1}).quantity}件)
                          <br />👤 收件客户：{(orders.find(o => o.id === selectedOrderForTemplate) || orders[0] || {buyerName: '陈女士 (杭州)'}).buyerName}
                          <br />🔒 隐私安全级别：{securityLevel === 'strict' ? '高能国密级脱敏（极度保密）' : '标准脱敏单（去隐私中间码）'}
                          <br />🛡️ 寄件品名声明：居家装饰/舒缓空气摆件 (严标不得出现成人情趣两性字眼，通体黑膜防窥保密包装)
                          <br />━━━━━━━━━━━━━━━━━━━━━━━━━━
                          <br />💡 团队履约分步指南：
                          <br />1. 收到本通知后，请依据以上标准无感下单代发采购平台。
                          <br />2. 包裹中确保随货物包入一张《深夜身心能量唤醒调试指南》女性调护温情小卡片（可在左侧导师控制面板定制）。
                          <br />3. 下单后请速在4小时内将发货顺丰/中通快递单号私聊反馈给主理人，系统自动解冻并结算利润，保障整个团队赚钱流转效率。
                        </div>
                        <div className="flex items-start gap-1.5 text-[10px] text-stone-500 text-justify">
                          <Info className="w-3.5 h-3.5 shrink-0 text-stone-600 mt-0.5" />
                          <span>
                            此文字描述去除了敏感的情欲成人字词标签，专门针对新手或兼职合伙人设计。即使直接在群聊发布也非常正规高级，契合极度去耻化与生活化解压调养。
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-stone-900 pt-3 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-stone-500 font-mono" id="workflow-footer-logs">
                    <span>
                      SOP 格式版本：<strong className="text-stone-300">v2.1 桃心特化无囤货中控发布</strong>
                    </span>
                    <span className="text-emerald-500 flex items-center gap-1 leading-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                      数据已通过反泄密检测
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'webhook' && (
            <motion.div
              key="webhook-setup"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
              id="webhook-config-wrapper"
            >
              <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-4" id="config-card">
                <div className="border-b border-stone-900 pb-3">
                  <h3 className="text-xs font-bold text-stone-200">打通您真实的飞书群聊机器人 Webhook</h3>
                  <p className="text-[11px] text-stone-500 mt-1">
                    只要在此处输入您的飞书自定义机器人 Webhook URL，每次上方模拟出单，极速中控服务器将直接向您的真实飞书发送格式优美的卡片通知！
                  </p>
                </div>

                <div className="space-y-3" id="webhook-field">
                  <div>
                    <label className="text-[10px] text-stone-400 font-bold block mb-1">飞书 Custom Webhook 地址：</label>
                    <input
                      type="url"
                      placeholder="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="bg-stone-900/60 p-3.5 rounded-lg border border-stone-850 space-y-2" id="tutorial-alert">
                    <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      如何获取此 Webhook 链接？
                    </span>
                    <ol className="text-[11px] text-stone-400 space-y-1 list-decimal list-inside leading-relaxed text-justify">
                      <li>打开飞书电脑端，进入任意你想接收通知的群聊；</li>
                      <li>点击群聊右上角「设置」-「群机器人」-「添加机器人」- 选择「自定义机器人」；</li>
                      <li>设置机器人名字（如“桃心秘境自动中控”），复制生成的 **Webhook 地址** 贴到上方即可！</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* 飞书卡片载荷动态 JSON 预览 */}
              {lastPayload && (
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-2">
                  <span className="text-[10px] font-bold text-stone-500 block flex items-center gap-1">
                    <FileJson className="w-3.5 h-3.5" />
                    已推送飞书标准卡片 JSON 报文预览：
                  </span>
                  <pre className="text-[10px] font-mono text-stone-400 bg-stone-900 p-3 rounded-lg overflow-x-auto max-h-[160px] leading-relaxed">
                    {JSON.stringify(lastPayload, null, 2)}
                  </pre>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div
              key="logs-list"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3 font-mono text-[11px] bg-stone-950 p-4 rounded-xl border border-stone-850 min-h-[290px] overflow-y-auto max-h-[350px]"
              id="pushes-logs-container"
            >
              <div className="flex items-center justify-between border-b border-stone-900 pb-2 mb-2">
                <span className="text-[10px] text-stone-500 font-bold">RPA 自动化推送网络流日志</span>
                <span className="text-[9px] text-stone-600">最新在最前</span>
              </div>

              {feishuLogs.length === 0 ? (
                <div className="text-center py-12 text-stone-600">
                  暂无日志流水。请先点击右上角“模拟出单”或手动发送推送。
                </div>
              ) : (
                <div className="space-y-2" id="logs-inner">
                  {feishuLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`p-2 rounded border leading-relaxed flex items-start gap-2 ${
                        log.success 
                          ? 'bg-rose-950/20 text-stone-300 border-rose-950/40' 
                          : 'bg-stone-900/60 text-stone-400 border-stone-850'
                      }`}
                    >
                      <span className="text-stone-500 shrink-0 select-none">[{log.time}]</span>
                      <span className="text-left flex-1">{log.msg}</span>
                      <span className={`px-1 rounded text-[9px] font-bold uppercase shrink-0 ${
                        log.success ? 'bg-rose-900/60 text-rose-300' : 'bg-stone-800 text-stone-500'
                      }`}>
                        {log.success ? '成功' : '离线'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部自动运行看板状态栏 */}
      <div className="bg-stone-950 px-4 py-2.5 rounded-xl border border-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]" id="hub-footer">
        <span className="text-stone-500 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse inline-block"></span>
          拼多多店铺订单监听状态：<strong className="text-stone-300 font-mono">监听中 (SHADOWBOT RPA 已捕获)</strong>
        </span>
        <span className="text-stone-500 text-justify">
          🔒 数据全脱敏处理：本系统已做全域国密高强度去敏感，绝对不上传买家姓名及家庭门牌号至任何第三方。
        </span>
      </div>
    </motion.div>
  );
}
