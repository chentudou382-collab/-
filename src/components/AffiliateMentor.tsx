import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  HelpCircle, 
  BookOpen, 
  Play, 
  Copy, 
  Check, 
  Heart, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Edit, 
  Save, 
  Compass, 
  MessageCircle,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Zap,
  Activity,
  Send
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  avatar: string;
  stage: string;
  avatarColor: string;
  status: string;
  defaultQuestions: { label: string; text: string }[];
}

export default function AffiliateMentor() {
  const [activePartner, setActivePartner] = useState<string>('pt_1');
  const [stage, setStage] = useState<string>('【阶段一：极速冷启动建号】');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // 主理人可编辑的规则库
  const [isEditingRules, setIsEditingRules] = useState(false);
  const [customRules, setCustomRules] = useState<string>(() => {
    return `【桃心秘境·合伙人操作八守则】：
1. 账号去敏：头像绝对不露，使用“温暖香薰、磨砂简约茶杯或手绘猫咪”；产品分类一律选“解压玩具”或“女性身体乳”。
2. 开场去羞耻：切忌官方词！客户咨询小章鱼，统一回答：“亲亲，这款是睡前卧室辅助呼吸引导，能放松疲惫的一天。保密发货哈。”
3. 爆款上架：每天10点、16点各擦亮一次。详情页最下面加上：“室友合租不尴尬，黑膜保密，寄件人是『生活解压品』。”
4. 城市差异化：优先选择“杭州、武汉、成都”等高校多、白领多的城市作为面首，定位女性觉醒重灾区。
5. 绝不压货：合伙人不用垫资，闲鱼出单后拿着订单来系统“代配发中控”一键采购，赚取双倍客差价！
6. 私域转化卡：每一个保密发货包裹里，都要嘱咐仓库塞一张《深夜身心能量唤醒调试指南》女性调护私域卡；`;
  });

  // 合伙人聊天状态
  const [chatInput, setChatInput] = useState<string>('');
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  
  // 合伙人AI导师对话输出
  const [mentorResponse, setMentorResponse] = useState<{
    reply: string;
    script: string;
    analysis: string;
  }>({
    reply: '亲爱的，建号第一天不需要有任何心理阻碍。咱们做的是女性卧室舒适度美学，不是旧社会的粗鄙色情。头像和昵称定位要像“深夜卧室设计师”或者“温暖女孩”。让客户看到你的主页时，感受到的只有暖意、隐私和放松。你准备好起名字了吗？',
    script: '昵称推荐：【深夜卧室疗愈盒】 / 【午夜微温泡泡】\n主页签名：分享温润的深夜空气与情绪。所有包裹均包装黑色无光膜，保密不写品名，顺丰/驿站自提，室友合租无尴尬。',
    analysis: '分析日志：该合伙人有较重的社会传统教条阻碍，需要首先进行高强度的[认知疗愈去无耻化]，重新赋予她们崇高的美感使命。'
  });

  // 伙伴人员定义
  const partners: Partner[] = [
    {
      id: 'pt_1',
      name: '小丽 (宝妈/无货源新手)',
      avatar: '👩‍🍼',
      stage: '【阶段一：极速冷启动建号】',
      avatarColor: 'from-pink-500 to-rose-500',
      status: '对成人话题极其害羞，不知如何起名和设置头像',
      defaultQuestions: [
        { label: '我总觉得卖这个不好意思，亲戚朋友看见怎么办？', text: '婉婉老师，我想问，如果我闲鱼卖这个，被我的亲戚或者是熟人看到怎么办？好尴尬啊，我该怎么包装，才能不让他们觉得粗俗，显得很正规呀？' },
        { label: '第一天账号怎么改资料，需要交开店押金吗？', text: '婉婉老师，我的闲鱼新号和快手小红书号，头像怎么设？要不要交保证金？要写情趣成人器具这几个字吗？' }
      ]
    },
    {
      id: 'pt_2',
      name: '阿强 (刚转行的朋友/懂文案)',
      avatar: '🧑‍💻',
      stage: '【阶段二：脱敏上架与抗封机审】',
      avatarColor: 'from-amber-500 to-orange-500',
      status: '写文案频频被闲鱼提醒违规审核，渴望规避红线',
      defaultQuestions: [
        { label: '商品上架一直被判违规或者降权，应该怎么写？', text: '婉婉老师，我上架的商品老是被闲鱼删掉或者封号，说含有敏感两性用品，有没有什么绝妙的翻译，既能让看的人懂是做什么的，又完全能躲过最严格的机审？' },
        { label: '怎么在主页和详情里打保密发货标签？', text: '婉婉老师，我想设置详情，重点在安全。我要在详情里怎么写，才能让那些合租的女生或者大学生不担心室友代拆？' }
      ]
    },
    {
      id: 'pt_3',
      name: '晓静 (小红书种草博主)',
      avatar: '💅',
      stage: '【阶段三：高客单成交与私域锁定】',
      avatarColor: 'from-blue-500 to-indigo-500',
      status: '有流量但转化低，不知如何温柔把客服引导至微信',
      defaultQuestions: [
        { label: '怎么让人下单，话术要带什么情绪价值？', text: '婉婉老师，好多女孩子来问“好用吗/痛不痛”，我应该怎么回复她们，才能既科学体面，又不显得像个推销的，能卖高溢价？' },
        { label: '退货怎么处理？如果买家用了说不要怎么办？', text: '婉婉老师，如果有人问退换货怎么办，毕竟是私密用品，我应该怎么给团队和自己订立规则去解决？' }
      ]
    }
  ];

  // 合伙人团队系统协作状态
  const [collaborationPartners, setCollaborationPartners] = useState([
    {
      id: 'pt_1',
      name: '小丽',
      avatar: '👩‍🍼',
      avatarColor: 'from-pink-500 to-rose-500',
      xianyuAccount: '桃心气泡舒缓盒',
      progress: 35,
      progressText: '建号改主页，养号蓄水中',
      pendingOrders: 3,
      conversionRate: '1.8%',
      lastSyncedScript: '暖风起步建号迎客词 v1.0',
      syncTime: '2026-06-22 18:30'
    },
    {
      id: 'pt_2',
      name: '阿强',
      avatar: '🧑‍💻',
      avatarColor: 'from-amber-500 to-orange-500',
      xianyuAccount: '深夜极致舒暖美学',
      progress: 70,
      progressText: '规避机审防降权抗封上架中',
      pendingOrders: 1,
      conversionRate: '3.2%',
      lastSyncedScript: '防删防降权高能翻译详情模版 v2.1',
      syncTime: '2026-06-22 15:45'
    },
    {
      id: 'pt_3',
      name: '晓静',
      avatar: '💅',
      avatarColor: 'from-blue-500 to-indigo-500',
      xianyuAccount: '午夜身心气泡唤醒站',
      progress: 92,
      progressText: '爆单引流，微信高溢价成交中',
      pendingOrders: 7,
      conversionRate: '5.6%',
      lastSyncedScript: '女性女性调护私域唤醒卡 SOP v3.0',
      syncTime: '2026-06-22 20:10'
    }
  ]);

  // =============== 新增：好友/合伙人专属闯关陪伴导师状态与配置库 ===============
  const [activeOnboardingStep, setActiveOnboardingStep] = useState<number>(0);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    'step_0_task_0': true,
    'step_0_task_1': false,
    'step_0_task_2': false,
    'step_1_task_0': false,
    'step_1_task_1': false,
    'step_1_task_2': false,
    'step_2_task_0': false,
    'step_2_task_1': false,
    'step_2_task_2': false,
    'step_3_task_0': false,
    'step_3_task_1': false,
    'step_3_task_2': false,
  });

  const onboardingSteps = [
    {
      title: "第一关：起号起跑线",
      phaseName: "建号改主页，解除道德负罪",
      mascotSpeech: "“宝儿！起步开张这一关最关键啦。我们不需要感到不好意思，咱们做的是女性身心灵舒缓健康，不是粗俗下流的事情噢。头像听学姐的，千万别用露骨擦边图，直接挑个简约自然或者猫咪插画；主页文案拷走学姐给你配好的去敏感字神仙句，这就打消了顾客一阶的窥私顾虑！”",
      scriptToCopy: "【温情治愈风主页签名签】：\n分享深夜卧室疗愈美学。本店所售健康辅导舒压仪/悦己小红心，全部采用「无字纯黑多重气泡防护包装膜」多层封口，保密配发，快递标签及扣款账单绝对不含任何敏感词及本字。支持宿舍、前台代签，合租无尴尬。正当爱己，科学享乐。",
      targetQuestion: "我初次开号卖这种私密东西非常不好意思，由于面临心理障碍，如何优雅地进行个人介绍和心理脱敏包装？",
      tasks: [
        { id: "step_0_task_0", text: "换个温馨治愈不露痕迹的主页头像（如磨砂香薰、微距插画等）" },
        { id: "step_0_task_1", text: "复制并张贴「保密到家、消融耻感、保障自尊」的主页签名模板" },
        { id: "step_0_task_2", text: "新注册号正常发一两件普通解压玩具/香薰，养号提高账号活跃度" }
      ]
    },
    {
      title: "第二关：防封机审上架",
      phaseName: "无感物理去词，轻松避开审核红线",
      mascotSpeech: "“宝贝，要落地我们得先度过官方机器的审核。绝对不能老老实实写‘情趣器具、跳蛋、催情’这些词，否则会被直接秒判降权甚至关店！我们要用‘卧室美学暖风摆件’、‘呼吸脉冲小礼物’来重新翻译！拿走我的去敏上架脚本，让我们擦亮开始吧！”",
      scriptToCopy: "【防删防屏蔽高安全上架文案】：\n「深夜极暖气泡系列 · 卧室美学生理温润理疗调控呼吸灯」\n近乎全新无痕包装，因合租室友作息变动不便故折价处理。外包装保密不写本字，走咸鱼官方物流保密配送。睡前温感静音，舒缓疲惫一整天。特别亲测超级好用！懂的姐妹自留秒，多省自带包邮。",
      targetQuestion: "应该采用哪些物理伪装去词神级文案，在咸鱼以及多平台安全发布两性玩具爆品而绝不触碰降权屏蔽红线？",
      tasks: [
        { id: "step_1_task_0", text: "选定爆款产品，重绘一个中性去羞化的雅致商品名，不带任何刺眼字面" },
        { id: "step_1_task_1", text: "商品主图前三张严用精致的生活艺术照，切忌粗俗直白，屏蔽机器视觉抓拍" },
        { id: "step_1_task_2", text: "详情页尾部加注：支持私聊、保密无痕黑发货等防打扰标语" }
      ]
    },
    {
      title: "第三关：密友流爆单引流",
      phaseName: "微信私域促单，实现高溢价 1+N 转化",
      mascotSpeech: "“真棒，已经有买家私信你啦！顾客一般会问得很无辜，比如『好用吗、痛不痛、别人会听到吗』。别担心，不能用死板的客服调调回她。要把你对她的心理呵护，像闺蜜悄悄话一样连珠炮发过去，一瞬间打动女性脆弱面。把学姐塞在你手里的促单蜜笈复制到你键盘上！”",
      scriptToCopy: "【客户促单深夜悄悄话秘笈】：\n“完全不尴尬的啦宝！姐姐刚买的时候也纠结好久，买完直呼后悔没早点心疼自己！塞在厚盖头里，动静比蚊子哼歌还小，床挨床合租室友都毫无感觉。咱们是100%全保密配送，外头裹多重厚塑料，快递大叔以为是小杯子而已。今晚下单，姐姐连带亲测的《深夜调节与悦己呼吸能量卡》精装版顺丰带走，好好搂抱自己一次～”",
      targetQuestion: "买家在深夜发来十分羞涩或试探性的提问（如好不好用、疼不疼、有没有杂音不安全），该如何结合AI进行深度心理卸防促单？",
      tasks: [
        { id: "step_2_task_0", text: "一键配发「迎客词」和「心理卸防话术」到你的云控客户端" },
        { id: "step_2_task_1", text: "模拟顾客无意隐晦询问（如“合租会不会被听到响”）进行AI实训" },
        { id: "step_2_task_2", text: "熟练利用“高黏度超额赠品”（如身心自理电子手册）提升成交客单价" }
      ]
    },
    {
      title: "第四关：多平台一键代发",
      phaseName: "RPA中控抗泄密，高净值躺赚出货",
      mascotSpeech: "“天啊！终于爆单赚到真金白银了！朋友们记住：绝对不能在拼多多买了直接贴单发走，那会透露出拼多多大广告纸和几毛钱的低廉标志，买家会秒退退货并指责你！要利用咱们这里的『白牌容灾发货中控』，一键发送无痕脱敏指令，让库房贴最安全高档的白盖瓦楞箱送过去，躺着净取几倍大差价！”",
      scriptToCopy: "【一件代发脱敏防穿帮出库备注】：\n「出库紧急备注：该订单为桃心闺蜜密送单！务必清除并过滤包裹内任何拼多多发件传单格、价格清单和返现券，一律采用干净无字牛皮中性纸箱包装，保障买家极致拆箱自尊！」",
      targetQuestion: "如何落地对接拼多多多渠道防泄密一件代发采购？自动化流程、物流面单无痕防穿帮如何落地，怎么关联飞书机器人推送？",
      tasks: [
        { id: "step_3_task_0", text: "挂靠咱们中性的白牌供应链上游，锁死超额客单利润链" },
        { id: "step_3_task_1", text: "开启一键配发中控模拟平台发货，中介发件人过滤真实电商源头痕迹" },
        { id: "step_3_task_2", text: "配接你的真实飞书机器人Webhook，体验订单落袋的清脆飞书推报声" }
      ]
    }
  ];

  const scriptTemplates = [
    {
      id: 'sc_1',
      name: '🥑 悦己去耻化·暖风闺蜜迎客词 (2026版)',
      content: '“宝，睡前玩玩解压特别助眠哈。我们面单全部保密写日常工艺摆件，特制高密防窥无光黑袋多层打包，室友/邮局快递代取全无尴尬。”'
    },
    {
      id: 'sc_2',
      name: '🔒 高安全机审无感物理去词爆款文案',
      content: '“深夜身心灵高频极简呼吸小灯。全新仅拆封试色，不适合舍友合租故闲置转。通体保密无字纸，安心直下，拍完秒结顺丰。”'
    },
    {
      id: 'sc_3',
      name: '📈 极限导流！99元私域觉醒电子书勾引脚本',
      content: '“因平台屏蔽联系方式，请添加小主理闺蜜信。下单赠您限量亲测的《深夜身心两性唤醒与调试特护指南》精整版，为您极致解答疑问。”'
    }
  ];

  const [selectedScriptToSync, setSelectedScriptToSync] = useState<string>('sc_1');
  const [syncTarget, setSyncTarget] = useState<string>('all'); // 'all' or specific partner id
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // 一键下发新的脚本模板至客户端函数
  const handleSyncScript = () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    
    // 模拟网络下发极速响应
    setTimeout(() => {
      const selectedScript = scriptTemplates.find(s => s.id === selectedScriptToSync);
      if (!selectedScript) return;

      setCollaborationPartners(prev => prev.map(p => {
        if (syncTarget === 'all' || p.id === syncTarget) {
          return {
            ...p,
            lastSyncedScript: selectedScript.name,
            syncTime: '刚刚 (云控实时同步)'
          };
        }
        return p;
      }));

      setIsSyncing(false);
      setSyncFeedback(`成功！已通过「桃心云控中枢」向 ${syncTarget === 'all' ? '全体合伙人' : `${partners.find(p => p.id === syncTarget)?.name.split(' ')[0]}`} 的闲鱼助手客户端和浏览器拦截助手一键导入："${selectedScript.name}" 脚本！`);
      setTimeout(() => setSyncFeedback(null), 5000);
    }, 1200);
  };

  const currentPartner = partners.find(p => p.id === activePartner) || partners[0];

  // 复制文案至剪切板
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // 询问 AI 导师接口
  const handleAskMentor = async (questionText: string) => {
    if (!questionText.trim()) return;
    setIsAILoading(true);
    try {
      const response = await fetch('/api/affiliate_mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: currentPartner.stage,
          customRules,
          question: questionText,
          partnerName: currentPartner.name
        })
      });

      const data = await response.json();
      if (data.success && data.data) {
        setMentorResponse({
          reply: data.data.mentorReply,
          script: data.data.actionScript,
          analysis: data.data.evaluationLog
        });
      } else {
        // API 降级 Fallback 渲染本地
        setMentorResponse({
          reply: `亲爱的${currentPartner.name.split(' ')[0]}，婉婉老师认真看完了你的问题。关于“${questionText.slice(0, 15)}...”，你要记住咱们的主导守则：咱们做的是「女性高溢价悦己能量」，跟粗俗无关。首要实操是：不要在标题详情出现拼杀词，把高矮、厚薄、档位换成“情绪舒缓频率”，用闺蜜温暖话术直接打消对方的最后的顾虑。`,
          script: `【闺蜜话术模板】：\n“姑娘，我也很理解，我以前寄快递也会不好意思。所以咱们家包裹都是特地裹三层黑膜保密，单子上只写‘生活日用品’，完全看不出来哦。你可以放宽一万个心。”`,
          analysis: '说明：Gemini API 处于特设代理，已触发婉婉老师本地全站 SOP 去极性降级回答机制。'
        });
      }
    } catch (err: any) {
      console.error(err);
      setMentorResponse(prev => ({
        ...prev,
        reply: "导师服务器被闺蜜军团问爆啦，咱们先用本地配发的规则行动起来！"
      }));
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-stone-900 border border-stone-850 rounded-2xl p-6 shadow-xl space-y-6"
      id="affiliate-mentor-root"
    >
      {/* 头部精炼阐释 */}
      <div className="border-b border-stone-800 pb-5" id="mentor-header">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-rose-500/10 text-rose-500 rounded-lg border border-rose-500/20">
            <Users className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-stone-100">合伙人AI陪练导师与规则脚本发布站</h2>
        </div>
        <p className="text-xs text-stone-400 mt-1">
          带着朋友团队做自动化赚钱？最怕他们不懂、害羞、不会写文案。你负责在**左侧配置你的指令规则与爆款脚本库**，零基础的合伙人将在**右侧和AI导师演练学习**，直接获取完全听你指挥的分步指令和保密模板！
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="mentor-body-grid">
        
        {/* 左侧：主理人控局 (婉婉老师配置端) */}
        <div className="lg:col-span-5 bg-stone-950 p-5 rounded-xl border border-stone-850 flex flex-col justify-between" id="left-controls">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-900 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h3 className="text-xs font-bold text-stone-200">主理人控制面板：指令规则与脚本树</h3>
              </div>
              <button
                onClick={() => setIsEditingRules(!isEditingRules)}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-all"
                id="edit-rules-btn"
              >
                {isEditingRules ? (
                  <>
                    <Save className="w-3 h-3" />
                    保存修改
                  </>
                ) : (
                  <>
                    <Edit className="w-3 h-3" />
                    编辑规则库
                  </>
                )}
              </button>
            </div>

            {/* 可自由编辑的规则区 */}
            {isEditingRules ? (
              <textarea
                value={customRules}
                onChange={(e) => setCustomRules(e.target.value)}
                rows={12}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-[11px] font-mono text-stone-300 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            ) : (
              <div className="bg-stone-900/60 p-4 rounded-lg border border-stone-850 max-h-[300px] overflow-y-auto">
                <pre className="text-[11px] font-mono text-stone-400 whitespace-pre-wrap leading-relaxed text-justify">
                  {customRules}
                </pre>
              </div>
            )}

            <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-950/40 space-y-1.5" id="tutorial-tip">
              <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1 leading-none">
                <Lightbulb className="w-3.5 h-3.5" />
                这套规则是如何传授给合伙人的？
              </span>
              <p className="text-[11px] text-stone-400 leading-normal text-justify">
                AI机器人已被硬编码灌入手上这套“操盘手守则”。当团队成员在右侧提问，AI机器人会**严格遵守你的这些要求**来训练辅导他们，输出的话术模版也会严格遵循你的保密和去敏要求。
              </p>
            </div>
          </div>

          <div className="border-t border-stone-900 pt-3.5 mt-4 text-[9px] text-stone-500 font-mono flex justify-between items-center">
            <span>婉婉老师定制指令库 · 已发布并全球同步</span>
            <span className="text-emerald-500 flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              已更新同步
            </span>
          </div>
        </div>

        {/* 右侧：合伙人AI导师陪练 (成员视点区) */}
        <div className="lg:col-span-7 bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-5" id="right-simulator">
          
          {/* 选择成员训练卡 */}
          <div>
            <label className="text-[10px] text-stone-500 font-bold block mb-2 font-mono uppercase">第一步：选择需要辅导帮扶的合伙人成员：</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="partners-selector">
              {partners.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => {
                    setActivePartner(partner.id);
                    setStage(partner.stage);
                    // 预置个回答，配合其角色
                    if (partner.id === 'pt_1') {
                      setMentorResponse({
                        reply: '亲爱的小丽，很多带娃宝妈刚加入都会有这层心理包袱，觉得自己是个妈妈，做情趣用品不太好意思。其实你转换下思维，咱们不仅不是黄色下流，反而是全职妈妈们重新自我掌控、追求体面身心平衡的引路者。小主页头像你找个极简风卧室、香薰、甚至一杯暖手咖啡，不带任何情欲，只有生活惬意。',
                        script: '账号昵称：【深夜气泡美学盒】\n背景设计：放极简ins风格香氛蜡烛图。\n主页一句话：深夜属于自己，寻找有温度的生活气泡，卧室香氛/静音疗愈，纯保密。',
                        analysis: '分析日志：该成员带娃多年，耻感深，通过闺蜜化生活风，快速帮助其重组高溢价身心认同。'
                      });
                    } else if (partner.id === 'pt_2') {
                      setMentorResponse({
                        reply: '阿强，大老爷们更不用慌。闲鱼封杀的绝不是商品本身，而是那些太直接、太暴露同行竞争扔出来的露骨刺眼词。咱们要充分利用[去敏转译机器]：把一切“抽插/高潮/调情”转化成安全温暖的外套。给产品加一个“人体工学身心灵减压仪式”或者“深夜舒暖蝴蝶”，绝对能完美封堵机审漏洞！',
                        script: '上架闲鱼爆款文案套路：\n“买多了闲置出，深夜舒暖呼吸小仪器（静音加温版）。原本是闺蜜极力安利的改善深夜不安的小物，只打开检查配过色。快递极其隐私，用不透光黑膜、没有退货成人字样，放宽心。”',
                        analysis: '分析日志：拥有自媒体文案功底，但缺乏风控二阶思维，需提供极客与机审去敏直接脚本套用。'
                      });
                    } else if (partner.id === 'pt_3') {
                      setMentorResponse({
                        reply: '晓静，你既然有小红书基础，微信引流这一关很好打。女孩子们买私密用品有很强的求知欲、缺乏分享。不要用销售员口气，你在私信里回答：“亲亲，情趣从来不是耻辱，而是女性对自己情绪的一种体贴调试。我也有一份亲自写的女性深夜舒暖调护指南PDF，来加我微，我免费传一份给你调养哦。”顺理成章导入微。',
                        script: '闲鱼引导留微信话术脚本：\n“亲亲，平台查联系方式。因为咱们配有《深夜两性性美学唤醒指南》PDF电子书（价值99元但对合伙人完全免费发买家），加我微：W-W-X-X（去掉减号）传哦，保密自提更安心。”',
                        analysis: '分析日志：对引流有认知但对转化有心理畏难，需赋能有高度的‘唤醒调试指南’降低买家微信防线。'
                      });
                    }
                  }}
                  className={`p-3 rounded-lg border text-left transition-all relative ${
                    activePartner === partner.id
                      ? 'bg-rose-950/20 border-rose-900/60 shadow-lg'
                      : 'bg-stone-900/50 border-stone-850 hover:bg-stone-900 hover:border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{partner.avatar}</span>
                    <div>
                      <h4 className="text-xs font-bold text-stone-200">{partner.name}</h4>
                      <span className="text-[9px] text-rose-400 font-bold block mt-0.5">{partner.stage}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-400 leading-relaxed mt-2 text-justify">
                    {partner.status}
                  </p>
                  {activePartner === partner.id && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-900 pt-4" id="ask-questions-container">
            {/* 预置常见问题 */}
            <div className="space-y-1.5 mb-4">
              <span className="text-[10px] text-stone-500 font-bold block font-mono">第二步：合伙人遇到的棘手痛点：</span>
              <div className="flex flex-wrap gap-2">
                {currentPartner.defaultQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(q.text);
                      handleAskMentor(q.text);
                    }}
                    className="bg-stone-900 border border-stone-850 hover:border-rose-900/40 hover:bg-rose-950/10 text-stone-300 text-[10px] px-2.5 py-1.5 rounded-lg transition-all text-left max-w-full truncate"
                  >
                    💡 {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 输入及对话 */}
            <div className="space-y-3" id="mentor-chat-field">
              <div className="relative">
                <input
                  type="text"
                  placeholder="或者，帮合伙人输入全新的痛点提问（AI机器人会自动读取左侧控制规则解答）..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAskMentor(chatInput);
                  }}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-3 pr-16 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-rose-500"
                />
                <button
                  onClick={() => handleAskMentor(chatInput)}
                  disabled={isAILoading || !chatInput.trim()}
                  className="absolute right-1.5 top-1.5 bg-rose-600 hover:bg-rose-700 disabled:bg-stone-800 text-white text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1 transition-all"
                >
                  {isAILoading ? '导师答复中...' : '询问导师'}
                </button>
              </div>

              {/* 导师落地答复展现卡片 */}
              <div className="bg-stone-900/80 rounded-xl border border-stone-850 p-4.5 space-y-4" id="mentor-response-card">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center shrink-0 shadow">
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">导师 婉婉老师机器人</span>
                      <span className="text-[9px] bg-rose-950/60 text-rose-300 border border-rose-900/60 px-1 py-0.2 rounded">
                        AI 特调大脑
                      </span>
                    </div>
                    <div className="text-xs text-stone-300 leading-relaxed text-justify whitespace-pre-line" id="mentor-reply-text">
                      {mentorResponse.reply}
                    </div>
                  </div>
                </div>

                {/* 今日可复制的行动脚本 */}
                {mentorResponse.script && (
                  <div className="bg-stone-950 border border-stone-800 p-3 rounded-lg space-y-2 relative" id="mentor-script-box">
                    <div className="flex items-center justify-between border-b border-stone-900 pb-1.5">
                      <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        今日可直接复制的实操爆款脚本：
                      </span>
                      <button
                        onClick={() => handleCopy(mentorResponse.script)}
                        className="text-[9px] text-stone-400 hover:text-white flex items-center gap-0.5 transition-all"
                      >
                        {copiedText === mentorResponse.script ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            复制脚本
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-[10px] text-stone-400 font-mono whitespace-pre-wrap leading-relaxed text-justify">
                      {mentorResponse.script}
                    </pre>
                  </div>
                )}

                {/* 仅主理人可见的后台分析 */}
                {mentorResponse.analysis && (
                  <div className="text-[10px] text-stone-500 font-mono border-t border-stone-900 pt-2 text-justify">
                    🔒 **主理人专属暗日志 (后台心智分析)：** {mentorResponse.analysis}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🚀 新增：合伙人专属起爆陪伴关卡沙盘 (让合伙人朋友能点进来一步步跟着实操落地) */}
      <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-6 text-left" id="affiliate-onboarding-companion-sand">
        <div className="border-b border-stone-900 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-500/10 text-rose-500 rounded-lg border border-rose-500/10">
              <Users className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-stone-200">合伙人 14 天快速起爆闯关陪伴系统 (SOP Onboarding)</h3>
              <span className="text-[10px] text-stone-500 block font-mono">STEP-BY-STEP LANDING GUIDE FOR FRIENDS & PARTNERS</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] bg-rose-950/20 px-2.5 py-1 rounded-md border border-rose-900/20 text-rose-450 shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>数字人学姐 桃子 🍑 已实时值守</span>
          </div>
        </div>

        <p className="text-[10.5px] text-stone-400 leading-relaxed -mt-3">
          主理人专门为你的合伙人朋友（或新起店伙伴）定制的14天爆店极速冲关路线。无需死记硬背枯燥理论，直接点击相应卡片，配合右侧的 **桃子学姐IP数字人** 以及一键引流脚本工具，即可零基础开单！
        </p>

        {/* 关卡网格选择器 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5" id="onboarding-steps-tabs">
          {onboardingSteps.map((step, idx) => {
            const isCompleted = step.tasks.every(t => checkedTasks[t.id]);
            return (
              <button
                key={idx}
                onClick={() => setActiveOnboardingStep(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[90px] ${
                  activeOnboardingStep === idx
                    ? 'bg-rose-950/20 border-rose-800 shadow-inner'
                    : 'bg-stone-900 hover:bg-stone-900/80 border-stone-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-stone-500 block uppercase tracking-wider">{step.title}</span>
                    {isCompleted && (
                      <span className="text-[8px] bg-emerald-950/50 border border-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold">
                        已通关 🎉
                      </span>
                    )}
                  </div>
                  <h4 className={`text-[11.5px] font-bold mt-1.5 ${activeOnboardingStep === idx ? 'text-rose-400' : 'text-stone-300'}`}>
                    {step.phaseName}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[9px] text-stone-500 mt-2 border-t border-stone-850/50 pt-1">
                  <span>点击进入实操</span>
                  <ArrowRight className="w-2.5 h-2.5 text-stone-600" />
                </div>
              </button>
            )
          })}
        </div>

        {/* 关卡核心操作核心交互台 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-stone-900/40 p-4.5 rounded-xl border border-stone-900 text-left">
          {/* 左侧：学姐IP对话与可复制爆款脚本 (7/12 宽度) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 桃子学姐对话气泡 */}
            <div className="bg-stone-900/80 rounded-xl border border-stone-850 p-3.5 space-y-2.5 relative">
              <div className="flex items-center gap-2">
                <span className="text-xl bg-stone-950 border border-stone-850 w-7 h-7 rounded-lg flex items-center justify-center">🍑</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-bold text-stone-200">陪伴学姐 桃子 🍑</span>
                    <span className="text-[8.5px] bg-rose-950/40 text-rose-400 px-1 py-0.1 rounded border border-rose-900/20 font-mono">IP GUIDE MASCOT</span>
                  </div>
                  <span className="text-[8px] text-stone-500 font-mono block">“用高维温度去包容女孩子的第一次两性自娱”</span>
                </div>
              </div>
              <p className="text-[11px] text-rose-350 italic leading-relaxed text-justify bg-stone-950/50 p-2.5 border border-stone-850 rounded-lg">
                {onboardingSteps[activeOnboardingStep].mascotSpeech}
              </p>
            </div>

            {/* 本关高溢价专用脚本模板 */}
            <div className="bg-stone-950 rounded-xl border border-stone-850 p-3.5 space-y-2.5 relative">
              <div className="flex justify-between items-center border-b border-stone-900 pb-2">
                <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  本关好友专用爆单/上架话术 (防被和谐直拷包)：
                </span>
                <button
                  onClick={() => handleCopy(onboardingSteps[activeOnboardingStep].scriptToCopy)}
                  className="text-[9px] text-stone-400 hover:text-white flex items-center gap-0.5 transition-all text-xs"
                >
                  {copiedText === onboardingSteps[activeOnboardingStep].scriptToCopy ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>已成功复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>直接复制代码</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[10px] text-stone-400 leading-relaxed font-mono whitespace-pre-wrap text-justify italic font-semibold">
                {onboardingSteps[activeOnboardingStep].scriptToCopy}
              </pre>
            </div>
          </div>

          {/* 右侧：冲关打卡任务完成度核算及AI学姐实时特训 (5/12 宽度) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">🚩 实操冲关任务打卡：</span>
                <span className="text-[9px] text-stone-500 font-mono bg-stone-950 px-2 py-0.5 rounded border border-stone-850">
                  本关通关度: {Math.round((onboardingSteps[activeOnboardingStep].tasks.filter(t => checkedTasks[t.id]).length / onboardingSteps[activeOnboardingStep].tasks.length) * 100)}%
                </span>
              </div>
              
              <div className="space-y-2 max-h-[160px] overflow-y-auto">
                {onboardingSteps[activeOnboardingStep].tasks.map((task) => (
                  <label
                    key={task.id}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border text-[10.5px] cursor-pointer transition-all ${
                      checkedTasks[task.id]
                        ? 'bg-emerald-950/10 border-emerald-900/30 text-emerald-400 line-through'
                        : 'bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedTasks[task.id]}
                      onChange={(e) => setCheckedTasks(prev => ({ ...prev, [task.id]: e.target.checked }))}
                      className="mt-0.5 rounded border-stone-800 bg-stone-950 text-pink-600 focus:ring-transparent h-3.5 w-3.5 cursor-pointer accent-rose-600 shrink-0"
                    />
                    <span className="leading-tight text-justify">{task.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 本关卡AI学姐快捷对接连片试验 */}
            <div className="border-t border-stone-905 pt-3.5 space-y-2.5">
              <span className="text-[10px] text-stone-400 font-bold block flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
                遇到疑惑？连结本关AI学姐特训：
              </span>
              <p className="text-[10px] text-stone-400 leading-normal text-justify">
                如果你的合伙人对这个关卡操作犯嘀咕，点击下方快捷模拟提问，系统大模型将自动载入婉婉导师知识库进行高能拆解！
              </p>
              <button
                onClick={() => {
                  const qText = onboardingSteps[activeOnboardingStep].targetQuestion;
                  setChatInput(qText);
                  handleAskMentor(qText);
                }}
                className="w-full bg-stone-900 hover:bg-stone-850 hover:border-rose-900/45 border border-stone-800 text-[10.5px] text-stone-300 font-bold py-2 rounded-lg flex items-center justify-center gap-1 ml-auto md:w-auto px-4 cursor-pointer transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-rose-500" />
                自动仿真导入并向学姐提问 🍑
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 合伙人团队协作看板 (Xianyu Cloud Hub) */}
      <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-6" id="affiliate-collab-dashboard">
        <div className="border-b border-stone-900 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-500/10 text-rose-500 rounded-lg border border-rose-500/10">
              <Activity className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-stone-200">合伙人团队运营协作中心 (Xianyu Cloud Hub)</h3>
              <span className="text-[10px] text-stone-500 block font-mono">LIVE CLOUD MULTI-STORE CO-OPERATION BOARD</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] bg-stone-900 px-2.5 py-1 rounded-md border border-stone-850">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping inline-block mr-1"></span>
            <span className="text-stone-400">中枢直连店铺：</span>
            <strong className="text-stone-200">3 店在线</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧合伙人店铺状态卡片列表 (2/3 宽度) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
              当前合伙人闲鱼号运营排期与状态：
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {collaborationPartners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="bg-stone-900 border border-stone-850 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-stone-800 transition-all text-left"
                >
                  {/* 基本店家名册与主页 */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${partner.avatarColor} flex items-center justify-center text-xl shadow shrink-0`}>
                      {partner.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-stone-200">{partner.name}</h4>
                        <span className="text-[9px] bg-rose-950/40 text-rose-400 px-1.5 py-0.2 rounded font-mono border border-rose-900/10">
                          {partner.xianyuAccount}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        运营节点：<strong className="text-rose-450">{partner.progressText}</strong>
                      </span>
                    </div>
                  </div>

                  {/* 核心指标数据：进度(带进度条)与转化率、待配发数 */}
                  <div className="flex-1 grid grid-cols-3 gap-3 items-center border-t border-b md:border-t-0 md:border-b-0 py-2.5 md:py-0 border-stone-850">
                    {/* 进度 */}
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-500 block">运营建号进度 :</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-stone-950 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-pink-500 to-rose-500 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${partner.progress}%` }} 
                          />
                        </div>
                        <span className="text-[10.5px] font-mono font-bold text-stone-300">{partner.progress}%</span>
                      </div>
                    </div>

                    {/* 转化率 */}
                    <div className="text-center md:text-left">
                      <span className="text-[9px] text-stone-500 block">转化率 (订单/咨询) :</span>
                      <div className="flex items-center justify-center md:justify-start gap-1 font-mono text-[11px] font-bold text-stone-200 mt-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{partner.conversionRate}</span>
                      </div>
                    </div>

                    {/* 待完成派发订单数 */}
                    <div className="text-right pr-2">
                      <span className="text-[9px] text-stone-500 block">待处理订单 :</span>
                      <div className="inline-flex items-center gap-1.5 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          partner.pendingOrders > 5 
                            ? 'bg-rose-950/80 text-rose-400 border border-rose-900/60 animate-pulse' 
                            : partner.pendingOrders > 0
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-900/40'
                            : 'bg-stone-950 text-stone-500'
                        }`}>
                          {partner.pendingOrders} 单
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 脚本绑定状态以及新同步时间 */}
                  <div className="min-w-[140px] text-left md:text-right border-l md:border-l border-stone-850/50 pl-0 md:pl-4 space-y-1">
                    <span className="text-[8px] text-stone-500 block uppercase">ACTIVE CLIENT SCRIPT:</span>
                    <span className="text-[10.5px] text-amber-400 font-bold block truncate" title={partner.lastSyncedScript}>
                      {partner.lastSyncedScript}
                    </span>
                    <span className="text-[9px] text-stone-500 block font-mono shrink-0">
                      同步于: {partner.syncTime}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* 右侧一键同步派发控制面板 (1/3 宽度) */}
          <div className="bg-stone-900 border border-stone-850 p-4.5 rounded-xl flex flex-col justify-between space-y-4 text-left">
            <div className="space-y-3">
              <span className="text-[10px] text-rose-500 uppercase font-bold tracking-wider block flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                云控新脚本模版一键下发站
              </span>
              <p className="text-[10px] text-stone-400 leading-normal">
                主理人在此挑选预热好、已经过防降权认证的安全迎客话术，瞬间同步至目标合伙人的闲鱼助手，实现标准化运营。
              </p>

              {/* 选择欲分发的脚本 */}
              <div className="space-y-1.5 pt-1.5">
                <label className="text-[10.5px] font-bold text-stone-400 block">
                  1. 选择下发的业务脚本模板：
                </label>
                <select
                  value={selectedScriptToSync}
                  onChange={(e) => setSelectedScriptToSync(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-[11px] text-stone-300 focus:outline-none focus:border-rose-500 cursor-pointer text-ellipsis"
                >
                  {scriptTemplates.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 实时预览脚本内容 */}
              <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-850 max-h-[90px] overflow-y-auto">
                <span className="text-[8px] text-stone-500 uppercase block font-mono mb-1">SCRIPT PREVIEW (模版快照):</span>
                <p className="text-[10px] text-stone-400 font-mono leading-relaxed italic">
                  "{scriptTemplates.find(s => s.id === selectedScriptToSync)?.content}"
                </p>
              </div>

              {/* 选择同步目标店 */}
              <div className="space-y-1.5">
                <label className="text-[10.5px] font-bold text-stone-400 block">
                  2. 选择下发的目标合伙人店：
                </label>
                <select
                  value={syncTarget}
                  onChange={(e) => setSyncTarget(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-[11px] text-stone-300 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="all font-semibold">🚀 全体合伙人同步 (多店并发下发)</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.id}>
                      🤝 仅下发给：{p.name.split(' ')[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 云下发按钮 & 反馈提示 */}
            <div className="space-y-2 pt-2 border-t border-stone-850/60">
              <button
                onClick={handleSyncScript}
                disabled={isSyncing}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-stone-800 text-white text-[11px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
              >
                {isSyncing ? (
                  <>
                    <span className="w-3 h-3 border-2 border-stone-300 border-t-rose-500 rounded-full animate-spin" />
                    <span>桃心云控脚本分发传输中...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>立即一键同步下发至目标客户端</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {syncFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[10px] text-emerald-400 leading-relaxed text-justify"
                  >
                    {syncFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
