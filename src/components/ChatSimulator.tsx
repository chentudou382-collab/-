import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Heart, EyeOff, ShieldCheck, ShoppingCart, HelpCircle, AlertCircle, RefreshCw, BarChart2, Star, Sparkles, AlertTriangle, Brain, Check, Copy, Activity, ChevronRight, Lock, Smile, Zap, TrendingDown } from 'lucide-react';
import { ChatSession, Message } from '../types';

// ======================== 新增：去耻感情感共鸣评估与策略话术知识库 ========================
interface SuggestionPattern {
  mode: '閨蜜溫柔型' | '科學脫敏型' | '大膽傾聽型';
  title: string;
  text: string;
}

interface SentimentEvaluation {
  keywords: string[];
  underlyingFear: string;
  strategy: string;
  shame: number;
  anxiety: number;
  readiness: number;
  patterns: SuggestionPattern[];
}

const getEmotionalSuggestions = (sessionId: string, lastMessageText: string): SentimentEvaluation => {
  const text = lastMessageText || '';
  const isComfortQuestion = text.includes('舒服') || text.includes('好用') || text.includes('纠结') || text.includes('疙瘩') || text.includes('坏女孩') || text.includes('想不通');
  const isBillQuestion = text.includes('账单') || text.includes('微信') || text.includes('支付宝') || text.includes('记录') || text.includes('付款') || text.includes('付钱') || text.includes('扣款');
  const isPackagingQuestion = text.includes('包装') || text.includes('拆') || text.includes('写字') || text.includes('寄') || text.includes('包裹') || text.includes('快递');

  if (isBillQuestion || (sessionId === 'session-1' && text.includes('账单'))) {
    return {
      keywords: ["支付泄密恐慌", "对账隔离", "金融防备度 95%", "长辈代拆"],
      underlyingFear: "害怕微信、支付宝或者花呗等账单流水明细，被家人、长辈或同居伴侣翻看并进行二阶道德审判。",
      strategy: "实施【物理金融级中性隔离】，以万无一失的平台清算机制释怀，用绝对笃定不含糊的细节化场景保障其自尊防线。",
      shame: 65,
      anxiety: 95,
      readiness: 70,
      patterns: [
        {
          mode: '閨蜜溫柔型',
          title: '深夜闺房耳语消虑 🌸',
          text: "“一万个放心宝贝！咱家走的是闲鱼官方最安全的二级交易通道，不管是微信还是支付宝扣款，账单明细里只会统一显示「闲鱼官方平台担保」或者「闲杂二手礼杂配件」，绝对绝对、打死不会透露半个敏感字眼！就算是爸妈帮你付款代付，他们也只会以为你是入手了一个可爱的二手机械摆件噢。有姐姐在，安全墙给你码得死死的，放一百个心。”"
        },
        {
          mode: '科學脫敏型',
          title: '中性商户信息混淆 🔬',
          text: "“亲爱的，从信息安全与账单隔离角度，我们已对接中性第三方清算通道。支付明细在账单上均作为『日常二手图书与礼品配件』归档。此流程属于平台对私密类目的标准脱敏对策，逆向无法溯源任何特定品类。科学保护财务隐私，完全无需多虑。”"
        },
        {
          mode: '大膽傾聽型',
          title: '悦己无罪大女人态度 ✊',
          text: "“宝！咱们不偷不抢，自掏腰包买解压好物疼爱自己，天经地义！不过我完全懂你的顾虑，账单隐私我们做了最硬核的中性混淆，明细显示绝对无痕。生活已经够累了，晚上犒劳下自己还要瞻前顾后？今晚姐姐直接顺丰给你闪电发出，开心享受就完了！”"
        }
      ]
    };
  }

  if (isComfortQuestion || sessionId === 'session-3' || text.includes('舒服') || text.includes('好女孩')) {
    return {
      keywords: ["超我道德审判", "自我贬抑 90%", "两性耻感", "焦虑自愈"],
      underlyingFear: "受传统观念束缚，对自身正常的生理愉悦产生恐惧，陷入“我是不是变坏了”的二阶精神内耗和罪恶感。",
      strategy: "运用【去罪恶化认知重塑】，将本能需求与高尚的身心灵自愈睡眠调理深度绑定，消融其二阶道德评判。",
      shame: 90,
      anxiety: 75,
      readiness: 40,
      patterns: [
        {
          mode: '閨蜜溫柔型',
          title: '深夜睡前无罪倾听 🌸',
          text: "“乖宝贝，特别心疼你的忐忑。其实在晚上学着去倾听、抚摸和照顾自己温热的身体，是世界上最干净、也最需要被温柔宠爱的事情。你完全不是坏女孩，反而是个超级真挚、最懂疼爱自己的小可爱。把它当做深夜安神呼吸的小灯，姐姐会一直陪着你的。”"
        },
        {
          mode: '科學脫敏型',
          title: '副交感神经生物降噪 🔬',
          text: "“亲爱的，从人体机能动力学来看。深夜焦虑往往是脑内皮质醇（压力激素）过度积累所致。物理温感与微频物理刺激，能温和激活骨盆底副交感神经肌肉群，促进内啡肽、多巴胺及催产素释放。这在医学上属于健康的非药物日常物理理疗，目的在于改善睡眠深度，完全合理体面。”"
        },
        {
          mode: '大膽傾聽型',
          title: '先锋女性悦己宣言 ✊',
          text: "“宝！人生苦短，取悦自己能有什么错呢！那些白天一本正经活给别人看的泥菩萨，深夜还不是一样焦虑？我们用它睡个好觉、省下大几千的眼霜钱，皮肤掐出水来，元气满满去挣钱搞事业，这才是最爽的先锋活法！甩掉思想包袱，冲！”"
        }
      ]
    };
  }

  if (isPackagingQuestion || sessionId === 'session-2') {
    return {
      keywords: ["伴侣防拆壁垒", "面单脱敏 95%", "白牌无感", "高自尊收箱"],
      underlyingFear: "恐慌快件在派送、签收或代取阶段被室友、伴侣无意拆开，引发关系中极度尴尬和自尊崩塌。",
      strategy: "提供【极致三层无感物理防护】。描绘极有画面感的视觉隐匿过程（中性包装、日用百货面单等），实现零心理摩擦交付。",
      shame: 80,
      anxiety: 95,
      readiness: 55,
      patterns: [
        {
          mode: '閨蜜溫柔型',
          title: '温情物理双重隔音 🌸',
          text: "“宝贝放心！姐姐懂那种需要小小私人空间的秘密。咱们外箱采用的是「无标纯白硬质牛皮纸箱」，内裹三层密封不透光气泡垫，拿在手上圆滚滚的，捏起来就像是普通洗护乳液。快递标签统一写“面部日常洗护礼品”，快递大叔和老公拿到了也根本猜不出任何端倪，安全到家。”"
        },
        {
          mode: '科學脫敏型',
          title: '中性无感仓配脱敏 🔬',
          text: "“您好，关于伴侣生活环境防拆包，我们提供严格的『物理隐私仓配去标方案』。出货单代发人写“日用洗护工艺中心”，外包装经过高密度无声缓震设计。不含任何行业行业敏感关键字，整体重量与形态均经过混淆，保障交付全链路高尊严无痕通过。”"
        },
        {
          mode: '大膽傾聽型',
          title: '硬核保密无阻下单 ✊',
          text: "“姐，交给我吧！咱们是保密发货的行家。直接给你安排高级纯白无标飞机盒，封箱胶带也是中性的。发件人过滤真实源头。女孩子对自己好天经地义，咱们在后方把该防的小心思和隐私帮姐封得死死的。大大方方拍下，剩下的重活累活，妹妹保你办妥！”"
        }
      ]
    };
  }

  return {
    keywords: ["通识情感防线", "新手探索期", "保密无痕 80%", "树洞舒压"],
    underlyingFear: "对未知的两性自娱产品抱持警惕，面对一阶本能冲动与二阶道德防备，处于最后的戒备期。",
    strategy: "全面抚慰与温暖去罪暗示，将交付细节具象化，建立树洞闺房般的绝对心理依赖，促成高高黏性转化。",
    shame: 70,
    anxiety: 80,
    readiness: 50,
    patterns: [
      {
        mode: '閨蜜溫柔型',
        title: '温暖树洞闺蜜抚慰 🌸',
        text: "“乖宝贝，别不好意思。每个在漫长深夜里给自己点一盏温热小灯、体面解压的女孩，都是在好好生活。咱们发货是绝对绝对保密的，厚黑避光膜，快递单写“洗护日杂”，外头一丁点轮廓都摸不出来，连快递小哥都不知道里面是什么，安安心心等收货就好啦。”"
      },
      {
        mode: '科學脫敏型',
        title: '非药理性微震物理理疗 🔬',
        text: "“亲爱的，生理理疗本身在生物学和解剖学上非常普遍。我们全线包装经过中性微调，标签做去名化处理，旨在彻底过滤污名化标签。保持健康自信的身体主权，是日常压力管理中最自然的一环。科学看待自我的身体节奏，放松收单即可。”"
      },
      {
        mode: '大膽傾聽型',
        title: '悦己态度即时解封 ✊',
        text: "“宝！人生就是用来享受的，不内耗才是硬道理！咱们自己赚钱买喜欢的好物调理身心，怎么舒服怎么来。多层避光打包和无敏面单是我们的标配底线。别犹豫啦，今晚好好享受睡眠、睡个饱觉比什么都重要，大胆爱自己，姐姐在后面挺你！”"
      }
    ]
  };
};

export default function ChatSimulator() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      buyerName: '林夕子 (大二合租)',
      buyerAvatar: '👧',
      productName: '「深夜的小章鱼」卧室静音脉冲解压仪',
      status: 'chatting',
      unreadCount: 1,
      messages: [
        {
          id: 'm1',
          sender: 'buyer',
          text: '姐姐在吗？这个小物理减压章鱼...静音效果真的可以吗？我跟室友合租在一个房间，墙板不太隔音，如果半夜开着玩，会不会被发现啊？我感觉好尴尬，第一次买这种东西...',
          timestamp: '22:15',
          isSensitive: true,
          sensitiveType: 'shame',
          sensitiveAnalysis: '买家处于高耻感状态，且面临具体的合租现实社交压力。极度害怕室友察觉。'
        },
        {
          id: 'm2',
          sender: 'ai',
          text: '宝贝儿别怕！太懂你了，合租确实很需要自己的秘密小角落。姐姐实话告诉你：这个小章鱼使用的是无刷微磁阻静音技术，分贝在35分贝以下，相当于在耳边说悄悄话的声音，只要你盖上双层羽绒被，床贴着床都听不见任何一丝震。这是属于你自己的解压自留地，享受自己身体的欢愉是世界上最高雅最正当的事，千万别自责，来，姐姐宠你。',
          timestamp: '22:16'
        },
        {
          id: 'm3',
          sender: 'buyer',
          text: '真的吗姐姐？那付款的时候，微信或者支付宝账单会显示什么“情趣、成人、跳蛋”之类的字吗？要是被爸妈或者室友翻出付款记录，我真的想直接搬离这个地球呜呜呜...',
          timestamp: '22:17',
          isSensitive: true,
          sensitiveType: 'privacy',
          sensitiveAnalysis: '买家对支付记录账单曝光有灾难化认知，恐慌被家人发现。'
        }
      ]
    },
    {
      id: 'session-2',
      buyerName: '悠悠妈妈',
      buyerAvatar: '👩',
      productName: '「仲夏身体保湿精华」女性睡前舒缓润滑调养液',
      status: 'pending',
      unreadCount: 1,
      messages: [
        {
          id: 'my-1',
          sender: 'buyer',
          text: '老板，包装上会写字吗？我老公平时喜欢拆我快件，如果是大盒情趣药水寄过来，被他看到了，夫妻之间会觉得很不舒服……',
          timestamp: '19:40',
          isSensitive: true,
          sensitiveType: 'logistics',
          sensitiveAnalysis: '面临伴侣直接拆包的极高级隐私恐惧，要求极其苛刻的无痕包装。'
        }
      ]
    },
    {
      id: 'session-3',
      buyerName: '思涵 (羞怯探索)',
      buyerAvatar: '🌸',
      productName: '「悦己小红心」无线温控舒缓能量仪',
      status: 'chatting',
      unreadCount: 1,
      messages: [
        {
          id: 'ms3-1',
          sender: 'buyer',
          text: '姐姐……请问这个真的舒服吗？好用吗？我之前从没了解过……看别的博主发得很暖心，但我心里总有个疙瘩。感觉这是不是不是个好女孩该用的呀……我会不会有心理阴影？总是一到半夜就莫名焦虑、睡不好。',
          timestamp: '00:05',
          isSensitive: true,
          sensitiveType: 'shame',
          sensitiveAnalysis: '极度羞涩。用隐晦无辜的词询问生理体验与好用度，并夹杂道德自我谴责，需要强大的「去罪恶化」和「自我和解」闺蜜树洞疏导。'
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [typedMessage, setTypedMessage] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [aiToneMode, setAiToneMode] = useState<'閨蜜溫柔型' | '科學脫敏型' | '大膽傾聽型'>('閨蜜溫柔型');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // 科学评估系统状态量：耻感值(耻感下降，成交几率飙升，LTV成倍放大)
  const [metrics, setMetrics] = useState({
    shameScore: 85,        // 0-100（越低越放松）
    anxietyScore: 90,     // 0-100（越低越安全）
    buyReadiness: 30       // 0-100（越高越渴望下单）
  });

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // 针对不同回复阶段，动态改变买家的心态因子模拟
  useEffect(() => {
    if (activeSessionId === 'session-1') {
      if (activeSession.messages.length === 3) {
        setMetrics({ shameScore: 50, anxietyScore: 85, buyReadiness: 65 });
      } else if (activeSession.messages.length > 3) {
        setMetrics({ shameScore: 15, anxietyScore: 10, buyReadiness: 95 });
      }
    } else if (activeSessionId === 'session-2') {
      if (activeSession.messages.length === 1) {
        setMetrics({ shameScore: 75, anxietyScore: 95, buyReadiness: 45 });
      } else {
        setMetrics({ shameScore: 20, anxietyScore: 15, buyReadiness: 98 });
      }
    } else if (activeSessionId === 'session-3') {
      if (activeSession.messages.length === 1) {
        setMetrics({ shameScore: 90, anxietyScore: 75, buyReadiness: 35 });
      } else {
        setMetrics({ shameScore: 15, anxietyScore: 20, buyReadiness: 95 });
      }
    }
  }, [activeSession.messages.length, activeSessionId]);

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
  };

  const handleSendMessage = async () => {
    if (!typedMessage.trim()) return;

    const userMsg: Message = {
      id: `custom-${Date.now()}`,
      sender: 'buyer',
      text: typedMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...activeSession.messages, userMsg];
    const updatedSessions = sessions.map((s) => {
      if (s.id === activeSessionId) {
        return { ...s, messages: updatedMessages };
      }
      return s;
    });
    setSessions(updatedSessions);
    const backupMessage = typedMessage;
    setTypedMessage('');
    setIsBotThinking(true);

    try {
      const response = await fetch('/api/chatbot_reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: backupMessage,
          buyerName: activeSession.buyerName,
          product: activeSession.productName,
          toneMode: aiToneMode
        })
      });

      if (!response.ok) {
        throw new Error('呼叫大模型忙碌，将启动本地高情商去微羞感话术引擎回答。');
      }

      const resData = await response.json();
      if (resData.success) {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'ai',
          text: resData.reply,
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          isSensitive: true,
          sensitiveType: resData.msgType as any,
          sensitiveAnalysis: resData.analysis
        };

        setSessions((prev) =>
          prev.map((s) => (s.id === activeSessionId ? { ...s, messages: [...s.messages, botMsg] } : s))
        );
      } else {
        throw new Error(resData.message);
      }
    } catch (e) {
      console.warn(e);
      // Fallback response mapping matching different AI Tone Modes and question styles
      let fallbackText = '';
      let analysisText = '';
      
      const isBillQuestion = backupMessage.includes('账单') || backupMessage.includes('微信') || backupMessage.includes('支付宝') || backupMessage.includes('付钱');
      const isExperienceQuestion = backupMessage.includes('舒服') || backupMessage.includes('好用') || backupMessage.includes('会不会') || backupMessage.includes('害怕') || backupMessage.includes('坏女孩');

      if (isBillQuestion) {
        fallbackText = `宝贝，一万个放心！闲鱼走的是官方担保二手交易通道。无论你是用支付宝、花呗还是微信，付款明细账单里只会统一显示「闲鱼-个人二手闲置交易」或「官方平台担保款」，绝对、死活不会透露出哪怕半个跟“情趣、章鱼、按摩、成人”有关的怪字！即便你把手机扔给闺蜜、爸妈帮你付款代抽，他们也看不出任何猫腻。这波安全隔离长城给你筑得牢牢的，放心冲！`;
        analysisText = `对支付暴露、账单曝光具有社交性恐慌，采取「物理金融级中性隔离」打消顾虑。`;
      } else if (isExperienceQuestion) {
        if (aiToneMode === '閨蜜溫柔型') {
          fallbackText = `乖宝贝，特别懂你的这种忐忑和不安。其实在晚上抱着暖和的被子，关掉灯，去学着去探索、倾听自己身体最真实的呼吸和小心跳，是这个世界上最干净、也最需要被温柔宠溺的事情了。你不是什么坏女孩，反而是最勇敢、最懂得疼爱自己的可爱灵魂。这款小红心贴在身上暖洋洋的，就像羽毛轻抚一样温润。不要给自己扣任何枷锁，这一刻你是绝对自由的。有姐姐在陪着你呢。`;
          analysisText = `买家面临深度道德负罪和自我凝视羞耻。闺蜜人设通过「去罪化投射」重构认知，给予其强大的深夜情感依靠。`;
        } else if (aiToneMode === '科學脫敏型') {
          fallbackText = `亲爱的，你的焦虑完全可以通过生理学和神经认知学来解释。人体骨盆底神经分布末梢在接收到温控震动波刺激时，不仅会促进局部微循环，更能瞬间反馈给大脑前额叶，促使多巴胺和催产素（抗压力激素）的分泌，用以对抗深夜慢性的皮质醇（也就是你失眠、焦虑的根源）。这属于完全健康、中立、非药理性的日常物理理疗。科学对待自我身心律动，没有任何心理阴影的必要。`;
          analysisText = `运用「心身体脱敏理论」和临床神经学中性解释释怀，以专业科学降维，阻断二阶道德评判。`;
        } else {
          fallbackText = `宝！听我的，人生苦短，取悦自己能有什么错呢？那群在白天循规蹈矩、拼命活给别人看的泥菩萨，深夜里不也同样需要安放燥动的灵魂。咱们用它调理身体、保障深度睡眠，省下大几千的眼霜钱和面霜钱，皮肤气色还越来越好，这不比什么都爽、都体面？大方爱自己，宝贝冲，这届新女性绝对不搞内耗那套！`;
          analysisText = `悦己大女主姿态。通过「破除形式主义反内耗」对仗唤醒，将微羞情绪转译为自信和爽朗的先锋象征。`;
        }
      } else {
        fallbackText = `乖宝贝，别害羞。每一个学着在漫漫长夜里给自已点一盏温热的小灯、体贴取悦自己的女孩，都是在用力、浪漫地拥抱生活。咱们发货全部是顶级的多重避光保密，外包装是坚厚无缝的塑料纸，快递单写“日杂礼品配件”，除了你本人，连快递小哥都不知道里面装了什么。安安心心等收货，姐姐会一直守着你到拆包！`;
        analysisText = `通识情感抚慰。物理包装无痕保护与心理温情陪伴并行，彻底消解最后一公里疑惑。`;
      }

      const botMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isSensitive: true,
        sensitiveType: isBillQuestion ? 'privacy' : 'shame',
        sensitiveAnalysis: `[${aiToneMode}] 驱动策略分级反馈：${analysisText}`
      };

      setSessions((prev) =>
        prev.map((s) => (s.id === activeSessionId ? { ...s, messages: [...s.messages, botMsg] } : s))
      );
    } finally {
      setIsBotThinking(false);
    }
  };

  const handleInjectSnippet = (text: string) => {
    setTypedMessage(text);
    setCopiedSnippet(text);
    setTimeout(() => setCopiedSnippet(null), 1500);
  };

  const handleDirectSendSnippet = async (text: string, toneMode: '閨蜜溫柔型' | '科學脫敏型' | '大膽傾聽型') => {
    if (isBotThinking) return;
    setIsBotThinking(true);
    
    // 1. Append the AI message
    const botMsg: Message = {
      id: `bot-direct-${Date.now()}`,
      sender: 'ai',
      text: text,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isSensitive: true,
      sensitiveType: 'shame',
      sensitiveAnalysis: `[${toneMode}] 策略直发：高纬去污名化话术，精准给予心理安慰与防爆物理支撑。`
    };

    const nextMessages = [...activeSession.messages, botMsg];
    
    setSessions((prev) =>
      prev.map((s) => (s.id === activeSession.id ? { ...s, messages: nextMessages } : s))
    );

    // 2. Drive the metrics (degrade shame and anxiety, increase buy readiness!)
    setMetrics((prev) => ({
      shameScore: Math.max(12, Math.round(prev.shameScore - 35)),
      anxietyScore: Math.max(10, Math.round(prev.anxietyScore - 40)),
      buyReadiness: Math.min(98, Math.round(prev.buyReadiness + 30))
    }));

    setIsBotThinking(false);

    // 3. Simulate client replying after 1.5s
    setTimeout(() => {
      let buyerReplyText = "谢谢姐姐……真的，本来我有一万个道德包袱，感觉买这个非常见不得人，听了你的话我真的彻底跟自己的身体和解了。不丢人，我也要追求好睡眠，现在就下单！";
      if (activeSession.id === 'session-1') {
        buyerReplyText = "哇，太好啦！原来账单明细是这样中性保密的，那我就彻底放心啦！要不然真被室友或家人看到我真的想搬离地球了。姐姐人太温柔了，我现在就下单付款去拍！";
      } else if (activeSession.id === 'session-2') {
        buyerReplyText = "听老板你这样讲我就踏实多了！外部标签打印成洗护日常礼品、采用三层纯白厚箱，我老公拿到了也根本看不透。我马上下单两瓶回去，感谢感谢！";
      }

      const buyerMsg: Message = {
        id: `buyer-reply-${Date.now()}`,
        sender: 'buyer',
        text: buyerReplyText,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isSensitive: true,
        sensitiveType: 'privacy',
        sensitiveAnalysis: "心理安全感彻底建立。道德焦虑与现实窥私威胁完全消融。客户全面转化，进入付款意愿。"
      };

      setSessions((prev) =>
        prev.map((s) => (s.id === activeSession.id ? { ...s, messages: [...s.messages, buyerMsg] } : s))
      );
    }, 1500);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl" id="chat-simulator">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-800 pb-4 mb-5 shadow-sm" id="chat-header">
        <div>
          <h2 className="text-lg font-medium text-stone-100 flex items-center gap-2" id="chat-title">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            AI 密友客服 · 拒绝羞耻高黏高客单系统 (抗风险升级)
          </h2>
          <p className="text-xs text-stone-400 mt-1" id="chat-subtitle">
            解决痛点：普通机器人只会冷冰冰背诵公开发货条款，极易引发退避恐慌。中控采用动态心理共振微调机制，阻断羞耻痛点。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 md:mt-0" id="current-gimmick">
          <div className="flex bg-stone-950 px-2.5 py-1 rounded text-[10px] text-stone-400 font-mono gap-1 border border-stone-800 justify-center">
            🤖 已配接 Shadowbot / 影刀微信群控拦截通道
          </div>
        </div>
      </div>

      {/* 核心亮点：AI客服话术人格微调配置栏 */}
      <div className="mb-5 bg-stone-950 border border-stone-850 p-3 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left" id="ai-personality-tuning-dashboard">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-rose-500">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="text-[11px] font-bold uppercase tracking-wider block">心理深度话术配置 (可交互实时切换模型)：</span>
          </div>
          <p className="text-[10px] text-stone-400">
            针对买家发来的带有“舒服吗、有没有负罪、隐私包装”等高耻感提问，切换不同模型微调指令：
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['閨蜜溫柔型', '科學脫敏型', '大膽傾聽型'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setAiToneMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all border shrink-0 flex items-center gap-1 cursor-pointer ${
                aiToneMode === mode
                  ? 'bg-rose-950/40 text-rose-400 border-rose-900/60 shadow-inner'
                  : 'bg-stone-900 text-stone-400 border-stone-850 hover:bg-stone-850'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${aiToneMode === mode ? 'bg-rose-500 animate-ping' : 'bg-stone-600'}`}></span>
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 辩证思考卡：自动化的弊端与防漏气对策 */}
      <div className="mb-6 p-4.5 bg-stone-950 rounded-xl border border-stone-805 text-xs grid grid-cols-1 md:grid-cols-12 gap-4" id="chat-philosophy-card">
        <div className="md:col-span-8 space-y-2">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">⚠️ 多维推演：AI 极速群控应答的弊端 (Drawback)</span>
          <p className="text-stone-400 leading-normal text-justify">
            当一个在深夜带着极度自责、恐慌隐私的女性顾客提问时，如果 AI <strong>在 0.5 秒内瞬间秒回了 500 字的精美公关稿</strong>，顾客会瞬间感到“极不真实”，判定这只是冰冷冰冷的群发机器，甚至产生“自己是不是进入了某种诈骗陷阱/数据被大范围标记监控”的二阶恐慌，信任瞬间归零而跑单！
          </p>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">💡 杭州终极无损抗震对策 (Mitigation)</span>
          <p className="text-stone-400 leading-normal text-justify">
            1. <strong>群控软件模拟人工延迟（Simulated Delays）：</strong>在 ShadowBot 端配置“随机思考延迟（20s-45s）”，并在输入行上开启“正在输入中...”状态。
            2. <strong>语气大白话（Human-Like Dialect）：</strong>AI 绝对不用专业销售腔和排版齐整的营销列表，而是多打错别字、常用口癖、频繁使用叠词（“是的呀、宝贝儿、绝对哒”），多把长段文字拆分成2-3句甚至多条连发，从而以假乱真，创造深夜闺房促膝长谈的暖心意境！
          </p>
        </div>

        <div className="md:col-span-4 bg-stone-900 border border-stone-800 p-3.5 rounded-lg flex flex-col justify-between" id="metric-gauge-panel">
          <span className="text-[10px] font-bold text-stone-300 block mb-2 flex items-center gap-1">
            <BarChart2 className="w-3.5 h-3.5 text-rose-500" />
            极具科学感：买家心智评估参数
          </span>
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>身体性罪恶耻感：</span>
                <span className={`font-mono font-bold ${metrics.shameScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>{metrics.shameScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${metrics.shameScore > 50 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${metrics.shameScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>包裹账单曝光焦虑：</span>
                <span className={`font-mono font-bold ${metrics.anxietyScore > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{metrics.anxietyScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${metrics.anxietyScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>信任下单转化几率：</span>
                <span className="font-mono text-emerald-400 font-bold">{metrics.buyReadiness}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${metrics.buyReadiness}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="chat-grid-wrapper">
        {/* 会话列表 - 占 3/12 */}
        <div className="lg:col-span-3 space-y-2" id="chat-sessions-column">
          <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">活跃会话客情 ({sessions.length})</span>
          <div className="space-y-2" id="sessions-list">
            {sessions.map((sess) => (
              <button
                key={sess.id}
                onClick={() => handleSelectSession(sess.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                  activeSessionId === sess.id
                    ? 'bg-rose-950/20 border-rose-900 shadow-inner'
                    : 'bg-stone-950 hover:bg-stone-950/80 border-stone-850'
                }`}
                id={`session-btn-${sess.id}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-xs">
                    {sess.buyerAvatar}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-stone-200 block">{sess.buyerName}</span>
                    <span className="text-[9px] text-stone-500 mt-0.5 truncate max-w-[120px] block">{sess.productName}</span>
                  </div>
                </div>

                {sess.unreadCount > 0 && activeSessionId !== sess.id && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* 100% 支付宝账单无痕解脱仿真 */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-850 space-y-2 text-xs" id="invisible-bill-card">
            <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% 独立账单伪装机制
            </span>
            <div className="p-2 border border-stone-800 rounded bg-stone-900 space-y-1 text-[10px] font-mono leading-relaxed" id="alipay-obscure-demo">
              <span className="text-stone-500 block">支付宝历史详细扣款账单：</span>
              <div className="flex justify-between border-b border-stone-800 pb-1 text-stone-400">
                <span>交易对方:</span>
                <span className="text-stone-300">闲鱼个人二手交易专区</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-1 text-stone-400">
                <span>商户品类:</span>
                <span className="text-stone-300">二手图书与电子日杂类</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>账单摘要:</span>
                <span className="text-stone-300">闲置置换自提取件单号</span>
              </div>
            </div>
            <p className="text-[9px] text-stone-500 leading-normal text-justify">
              本系统专设“不显字通道”，消除中国女性用户最后一寸后顾之忧。
            </p>
          </div>
        </div>

        {/* 聊天实体框 - 占 5/12 */}
        <div className="lg:col-span-5 bg-stone-950 border border-stone-850 rounded-2xl p-4 flex flex-col justify-between min-h-[480px]" id="chat-frame">
          {/* 头栏 */}
          <div className="border-b border-stone-900 pb-3 flex items-center justify-between" id="chat-frame-header">
            <div className="flex items-center gap-2">
              <span className="text-lg">{activeSession.buyerAvatar}</span>
              <div>
                <span className="text-xs font-bold text-stone-200">{activeSession.buyerName}</span>
                <span className="text-[9px] text-rose-400 font-mono block mt-0.5">{activeSession.productName}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-stone-900 px-2.5 py-1 rounded-full border border-stone-850" id="typing-indicator-box">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-stone-400 font-mono">
                {isBotThinking ? '婉婉AI正在悄悄打字中...' : '客情防丢连接正常'}
              </span>
            </div>
          </div>

          {/* 信息滚轴区 */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 max-h-[350px] scrollbar-thin" id="messages-scroller">
            {activeSession.messages.map((msg, index) => (
              <div key={msg.id} className="space-y-1.5" id={`msg-block-${msg.id}`}>
                <div className={`flex ${msg.sender === 'buyer' ? 'justify-start' : 'justify-end'}`} id={`msg-flex-${msg.id}`}>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs relative text-justify leading-relaxed ${
                      msg.sender === 'buyer'
                        ? 'bg-stone-900 text-stone-200 rounded-tl-none border border-stone-800'
                        : 'bg-gradient-to-tr from-rose-950/40 to-stone-900 text-stone-100 rounded-tr-none border border-rose-950/60'
                    }`}
                    id={`bubble-${msg.id}`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[9px] text-stone-600 block text-right mt-1.5 font-mono">{msg.timestamp}</span>
                  </div>
                </div>

                {/* 如果为买家敏感句，大模型进行战略投射拆解，显示在下方 */}
                {msg.sender === 'buyer' && msg.isSensitive && (
                  <div className="ml-2 pl-3 border-l-2 border-amber-900/60 py-1 space-y-1 animate-fade-in" id={`alert-analysis-${msg.id}`}>
                    <div className="flex items-center gap-1 text-[9px] text-amber-400 font-bold">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      大模型实时意图拆解 ({msg.sensitiveType}):
                    </div>
                    <p className="text-[10px] text-stone-500 leading-normal">{msg.sensitiveAnalysis}</p>
                  </div>
                )}

                {/* 如果是AI的回复，显示底层情感策略日志 */}
                {msg.sender === 'ai' && msg.isSensitive && (
                  <div className="mr-2 pr-3 text-right flex flex-col items-end py-1 space-y-1 animate-fade-in" id={`strat-analysis-${msg.id}`}>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold justify-end">
                      <Star className="w-3 h-3 text-emerald-500 animate-spin-slow" />
                      闺蜜高维去留存决策特征:
                    </div>
                    <p className="text-[10px] text-stone-500 leading-normal max-w-sm text-right">{msg.sensitiveAnalysis || '利用双倍降噪音和暖营承诺让两性发泄体面化、情调化，完美解决其一阶本能与二阶心智之间的矛盾冲突。'}</p>
                  </div>
                )}
              </div>
            ))}

            {isBotThinking && (
              <div className="flex justify-start animate-pulse" id="bot-loading-bubble">
                <div className="bg-stone-900 text-stone-550 p-3 rounded-2xl rounded-tl-none border border-stone-850 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                  <span className="text-[10px] font-mono">正在分析对方的羞耻与隐私顾忌点，撰写有温度的悄悄话...</span>
                </div>
              </div>
            )}
          </div>

          {/* 输入栏与模拟下单促单工具 */}
          <div className="border-t border-stone-900 pt-3 flex gap-2 items-center" id="chat-inputs-bar">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="模拟买家的提问：如“宿舍合租、账单会显示字样吗，包装牢不牢”..."
              className="flex-1 bg-stone-900 border border-stone-850 rounded-xl px-4 py-2 text-xs text-stone-100 placeholder-stone-605 focus:outline-none focus:border-rose-900/70"
              id="chat-buyer-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={isBotThinking || !typedMessage.trim()}
              className="p-2 bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 rounded-xl text-stone-100 active:scale-95 transition-all flex items-center justify-center shrink-0 disabled:opacity-40 cursor-pointer"
              id="send-msg-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* 辅佐决策促成下单模块 */}
          {activeSession.messages.length >= 2 && activeSession.status !== 'ordered' && (
            <div className="mt-3.5 p-3 bg-rose-950/10 border border-rose-900/30 rounded-xl flex items-center justify-between gap-2 animate-fade-in" id="conversion-cta">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-rose-400 font-bold block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  已建立深度情感共鸣！推荐促单。
                </span>
                <span className="text-[9px] text-stone-500 block truncate leading-tight mt-0.5">买家戒备心已被温情消解。可推荐“搭配套组”提高客单价。</span>
              </div>
              <button
                onClick={() => {
                  alert(`恭喜！买家 ${activeSession.buyerName} 已经被去耻感话术深深打动，决定拍下「${activeSession.productName}搭配套包」，仿真店铺收益增加！`);
                  const updatedOrdered = sessions.map(s => {
                    if (s.id === activeSession.id) {
                      return { ...s, status: 'ordered' as const };
                    }
                    return s;
                  });
                  setSessions(updatedOrdered);
                }}
                className="py-1 px-2.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-stone-100 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                id="create-order-simulation-btn"
              >
                <ShoppingCart className="w-3 h-3" />
                模拟拍下出单
              </button>
            </div>
          )}

          {activeSession.status === 'ordered' && (
            <div className="mt-3.5 p-3 bg-emerald-950/10 border border-emerald-900/30 rounded-xl flex items-center justify-between animate-fade-in" id="conversion-success">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="p-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-400 font-bold block">🎉 恭喜！成交订单落地</span>
                  <span className="text-[9px] text-stone-500 block truncate">该会话已成功转化为高利润订单，代发单同步中。</span>
                </div>
              </div>
              <span className="text-[8px] bg-emerald-950/40 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold shrink-0">
                已成交
              </span>
            </div>
          )}
        </div>

        {/* 情感图谱与共振策略中枢 - 占 4/12 */}
        <div className="lg:col-span-4 bg-stone-950 border border-stone-850 rounded-2xl p-4 flex flex-col justify-between space-y-4" id="sentiment-analysis-panel">
          {/* 头栏 */}
          <div className="flex items-center gap-2 border-b border-stone-900 pb-3" id="sentiment-analysis-header">
            <div className="p-1.5 bg-rose-950/40 border border-rose-900/60 rounded-xl text-rose-400">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-200 block">🧠 语义深度解构与策略中枢</span>
              <span className="text-[9px] text-stone-500 font-mono">PSYCHOLOGICAL COGNITION ANALYSIS</span>
            </div>
          </div>

          {/* 实时语义透视 */}
          <div className="space-y-1.5" id="sentiment-inquiry-box">
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">当前咨询文本特征 (Buyer Inquiry)</span>
            <div className="p-3 bg-stone-900/40 border border-stone-850 rounded-xl text-[11px] text-stone-300 italic text-justify leading-relaxed relative min-h-[50px] flex items-center">
              <span className="absolute top-1 left-2 text-lg text-rose-800/40 font-serif font-bold">“</span>
              <p className="px-3">
                {(() => {
                  const lastBuyerMsg = [...activeSession.messages].reverse().find(m => m.sender === 'buyer');
                  return lastBuyerMsg ? (lastBuyerMsg.text.length > 72 ? `${lastBuyerMsg.text.slice(0, 72)}...` : lastBuyerMsg.text) : '暂无最新买家语料...';
                })()}
              </p>
              <span className="absolute bottom-1 right-2 text-lg text-rose-800/40 font-serif font-bold">”</span>
            </div>
          </div>

          {/* 耻感/隐私潜台词深度剖析 */}
          {(() => {
            const lastBuyerMsg = [...activeSession.messages].reverse().find(m => m.sender === 'buyer');
            const evalData = getEmotionalSuggestions(activeSession.id, lastBuyerMsg?.text || '');
            return (
              <>
                <div className="space-y-2.5 bg-stone-900/30 p-3.5 border border-stone-850 rounded-xl text-xs" id="intent-psychology-decoder">
                  <div>
                    <span className="text-[10px] text-rose-400 font-bold block flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3 text-rose-500 animate-pulse" />
                      内心深处耻感与恐惧潜台词：
                    </span>
                    <p className="text-[10.5px] text-stone-400 leading-normal text-justify">{evalData.underlyingFear}</p>
                  </div>
                  <div className="border-t border-stone-850/60 pt-2.5">
                    <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      去羞耻核心共情阻断对策：
                    </span>
                    <p className="text-[10.5px] text-stone-400 leading-normal text-justify">{evalData.strategy}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {evalData.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-950/20 text-rose-400 border border-rose-900/30 text-[9px] font-semibold rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 买家心智刻度 */}
                <div className="space-y-2.5 bg-stone-900/45 p-3 border border-stone-850 rounded-xl text-xs" id="live-gauges-block">
                  <span className="text-[10px] text-stone-300 font-bold uppercase tracking-wider block flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    心智特征多维刻度 (Real-time Mentality Metrics)
                  </span>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-rose-500" />
                          身体性内耗/耻感包袱:
                        </span>
                        <span className={`font-mono font-bold ${metrics.shameScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>{metrics.shameScore}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${metrics.shameScore > 50 ? 'bg-gradient-to-r from-red-600 to-rose-500' : 'bg-emerald-500'}`} style={{ width: `${metrics.shameScore}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                        <span className="flex items-center gap-1">
                          <EyeOff className="w-2.5 h-2.5 text-amber-500" />
                          账单包裹暴露极端焦虑:
                        </span>
                        <span className={`font-mono font-bold ${metrics.anxietyScore > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{metrics.anxietyScore}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-500" style={{ width: `${metrics.anxietyScore}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Smile className="w-2.5 h-2.5 text-emerald-500" />
                          深夜共振信任下单意向:
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">{metrics.buyReadiness}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-500" style={{ width: `${metrics.buyReadiness}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 推荐共情话术分发卡 */}
                <div className="space-y-2 flex-1 flex flex-col justify-end" id="empathy-recommender">
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    推荐共情话术预置 (Click to Apply/Send)
                  </span>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin" id="patterns-scrolling">
                    {evalData.patterns.map((p) => (
                      <div key={p.mode} className="bg-stone-900 border border-stone-850 p-2.5 rounded-xl hover:border-rose-900/40 transition-all space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                            p.mode === '閨蜜溫柔型' ? 'bg-rose-950/40 text-rose-400' :
                            p.mode === '科學脫敏型' ? 'bg-blue-950/40 text-blue-400' : 'bg-amber-950/40 text-amber-400'
                          }`}>
                            {p.mode} · {p.title}
                          </span>
                          <span className="text-[8.5px] text-stone-500 font-mono">
                            {p.mode === aiToneMode ? '🔥 推荐当前' : '可越级'}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-300 leading-relaxed text-justify italic bg-stone-950 p-2 rounded-lg border border-stone-900/60 font-serif">
                          {p.text}
                        </p>
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => handleInjectSnippet(p.text)}
                            className="px-2 py-0.5 bg-stone-850 hover:bg-stone-800 text-stone-300 text-[9px] font-medium rounded-md flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Copy className="w-2.5 h-2.5" />
                            {copiedSnippet === p.text ? '已填入' : '填入草稿'}
                          </button>
                          <button
                            onClick={() => handleDirectSendSnippet(p.text, p.mode)}
                            disabled={isBotThinking}
                            className="px-2.5 py-0.5 bg-gradient-to-r from-rose-900 to-amber-900 hover:from-rose-800 hover:to-amber-800 text-stone-100 text-[9px] font-bold rounded-md flex items-center gap-1 transition-all shadow cursor-pointer disabled:opacity-40"
                          >
                            <Send className="w-2.5 h-2.5" />
                            云端直接发
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
