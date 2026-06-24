import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// 延迟初始化 Gemini 客户端，保证即使 API Key 缺省也不会在启动时崩溃
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// ---------------- API ENDPOINTS ----------------

// API 1: 智能去敏转译接口 (结合 Gemini API 智能优化)
app.post("/api/uncensor", async (req, res) => {
  const { rawName, category } = req.body;
  if (!rawName) {
    return res.status(400).json({ success: false, message: "参数缺失：请提供 rawName" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // 降级退路：由于未检测到真实 API_KEY，返回特定错误，前端接到此状态后采用高品质本地预置 fallback 渲染
    return res.json({
      success: false,
      message: "未配置或未激活合适的 GEMINI_API_KEY。即将激活桃心秘境本地去羞耻对折机制！",
    });
  }

  try {
    const prompt = `
      你现在是成人/两性玩具电商领域的去羞耻化与低敏机审核操盘手婉婉老师。
      你的核心工作是让具有强烈的肉体欢愉、敏感甚至粗鄙的成人用品，转译为高雅、富有生活美学、身心灵放松、且能通过“闲鱼、小红书”等普通民用平台最严格机器红线机审的文案。
      请将输入的敏感商品：“${rawName}”（属于${category}大类）进行深度去羞耻化重定义。

      请严格按照以下 JSON Schema 输出：
      {
        "rawName": "原始名称",
        "translatedName": "脱敏后的闲鱼商品名 (例如：用卧室美学、深夜静音解压泡泡、萌宠潮玩、睡前呼吸仪式等，绝对不要出现任何敏感词，但能暗示出作用。控制在30字内)",
        "category": "两性悦己护理",
        "lowSensitivityKeywords": ["4个以上完全无敏感词、符合机审、同时契合悦己调性的标签"],
        "copywritingTemplates": [
          {
            "title": "闲鱼温情生活风出闲置文案",
            "content": "一段语气真诚、完全无擦边词、像女大学生或者闺蜜自用闲置的多行文案 (提示：保密发货，不写成人字样，不写真实品名)",
            "marketingVibe": "温情生活风"
          },
          {
            "title": "小红书身心灵悦己分享种草文案",
            "content": "一段推崇女性身心自由、消除防备羞于自娱的情怀安利文案 (同样无露骨词汇却具有极高溢价美学)",
            "marketingVibe": "身心灵疗愈风"
          }
        ],
        "emotionalPitch": "一句一针见血的商业解释：说明为什么要这么重定义，直击中国女性内心什么避讳痛点，如何消除心理摩擦并产生高溢价。"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rawName: { type: Type.STRING },
            translatedName: { type: Type.STRING },
            category: { type: Type.STRING },
            lowSensitivityKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            copywritingTemplates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  marketingVibe: { type: Type.STRING }
                },
                required: ["title", "content", "marketingVibe"]
              }
            },
            emotionalPitch: { type: Type.STRING }
          },
          required: ["rawName", "translatedName", "category", "lowSensitivityKeywords", "copywritingTemplates", "emotionalPitch"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("模型未吐出合格数据");
    }

    const data = JSON.parse(text);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Gemini Uncensor Error:", error);
    return res.json({
      success: false,
      message: "转译网络拥塞，" + error.message,
    });
  }
});

// API 2: 闲鱼去女性羞耻感客服智能对话模拟器
app.post("/api/chatbot_reply", async (req, res) => {
  const { message, buyerName, product, toneMode } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: "参数缺失：请提供 message" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      success: false,
      message: "API Key未配置。采用本地精妙客服话术生成！",
    });
  }

  try {
    const prompt = `
      你现在是婉婉老师店里的AI智能售货小秘书，也是两性身心灵放松与闺蜜导师。
      买家名字是：${buyerName}。她对成人/私密用品“${product}”非常感兴趣，但表现得很隐晦、羞赧，或者对配送隐私极其敏感，又或者在问“舒服吗”、“好不好用（带有一些耻感、罪恶感或抗拒心理）”。
      买家发来的私信是："${message}"。

      你当前被设定的沟通人格风格是：【${toneMode || "閨蜜溫柔型"}】
      
      请根据不同沟通风格塑造相应的话术和论点：
      - 「閨蜜溫柔型」：极尽温柔、知性共情、像姐姐抱着被子深夜贴耳倾诉。用极大的温情去化解对方的道德自责、害怕以及对生理探索的罪犯感。
      - 「科學脫敏型」：从心身医学、两性解剖学、副交感神经肌肉放松等中性健康科学视角去释然对方，强调“人作为生命的生理反馈是非常健康的自愈手段”。
      - 「大膽傾聽型」：爽直大胆、甚至有点小俏皮，“人生苦短，取悦自己怎么了？”、用活泼自信的悦己大女人姿态感染对方，彻底解开道德绑架。

      你的任务：
      1. 分析买家心理这层隐忧的隐含诉求 (心理学投射分析：到底是在害怕被评价，还是在害怕器具不隔音、害怕包装泄密、还是害怕快感本身带来的身体负罪)。
      2. 针对性用大白话、毫无营销味、完全符合上述风格调性的闺蜜语气回复。
      3. 回复要把一切保密发货和去耻感承诺落实成生动的细节画面，完全消除其恐惧，促成无摩擦下单。

      请严格按照以下 JSON Schema 格式响应：
      {
        "reply": "极具说服力与人情温暖的回复内容 (极其大白话，不使用排版齐整的营销列表，300字以内，包含完美保密发货承诺和去耻感/去罪恶暗示)",
        "msgType": "privacy",
        "analysis": "一句高段位的顾问决策日志：提炼买家背后的真实羞耻/社交恐惧痛点是什么，你如何用心理和物理手段解构它，促成其高回购和高终身价值(LTV)。"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            msgType: { type: Type.STRING, description: "必为: privacy, shame, functional, logistics 其中之一" },
            analysis: { type: Type.STRING }
          },
          required: ["reply", "msgType", "analysis"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("模型未反馈数据");
    }

    const data = JSON.parse(text);
    return res.json({
      success: true,
      reply: data.reply,
      msgType: data.msgType,
      analysis: data.analysis
    });
  } catch (error: any) {
    console.error("Gemini ChatBot Error:", error);
    return res.json({
      success: false,
      message: "客服小秘书打盹了: " + error.message,
    });
  }
});

// API 3: 拼多多 / 闲鱼 -> 飞书机器人推送接口 (打通真实飞书 Webhook 联调)
app.post("/api/feishu_push", async (req, res) => {
  const { webhookUrl, platform, productName, orderId, buyerName, price, quantity, status } = req.body;
  
  if (!platform || !productName) {
    return res.status(400).json({ success: false, message: "参数缺失：平台名与商品名为必填" });
  }

  // 飞书 Webhook 标准卡片格式
  const cardData = {
    msg_type: "interactive",
    card: {
      config: {
        wide_screen_mode: true
      },
      header: {
        title: {
          tag: "plain_text",
          content: `🔔 桃心秘境自动中控台：[${platform}] 新增一笔待发货订单！`
        },
        template: platform === "拼多多" ? "orange" : "pink"
      },
      elements: [
        {
          tag: "div",
          fields: [
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**订单编号:**\n${orderId || "XY-RECOVERY-" + Math.floor(Math.random() * 90000 + 10000)}`
              }
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**销售渠道:**\n${platform}`
              }
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**商品名称:**\n${productName}`
              }
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**付款买家:**\n${buyerName || "保密顾客"}`
              }
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**结算单价:**\n¥${price || "99.00"}`
              }
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**购买数量:**\n${quantity || 1} 件`
              }
            }
          ]
        },
        {
          tag: "hr"
        },
        {
          tag: "div",
          text: {
            tag: "lark_md",
            content: `💡 **中控机器人温馨提醒：**\n1. 本订单已被本地 RPA 异地备份脱敏（收货隐私已保全）。\n2. 请于 12 小时内登录 **拼多多一件代发采购后台** 进行隐私配发付款。\n3. 当前处于异地容灾防护中，防止突发封号。`
          }
        },
        {
          tag: "note",
          elements: [
            {
              tag: "plain_text",
              content: "婉婉老师智能多店群控系统 · 自动监听已激活"
            }
          ]
        }
      ]
    }
  };

  // 如果用户填写了真实的 Webhook URL，执行真实网络发送
  let extMessage = "（本地仿真发送完成）";
  let extSuccess = true;

  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData)
      });
      if (response.ok) {
        extMessage = "（真实飞书机器人Webhook发送成功！）";
      } else {
        const text = await response.text();
        extMessage = `（飞书服务器报错：${text}，切换为本地模拟预览）`;
        extSuccess = false;
      }
    } catch (err: any) {
      extMessage = `（网络连接失败：${err.message || err}，切换为本地模拟预览）`;
      extSuccess = false;
    }
  }

  return res.json({
    success: extSuccess,
    message: `成功触发中控推送${extMessage}`,
    cardJson: cardData
  });
});

// API 4: 团队合伙人 AI 孵化、培训及脚本赋能导师
app.post("/api/affiliate_mentor", async (req, res) => {
  const { stage, customRules, question, partnerName } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, message: "参数缺失：请提供 question" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      success: false,
      message: "API Key未配置。已为您调配本地婉婉老师导师话术！",
    });
  }

  try {
    const prompt = `
      你现在是「桃心秘境」的主理人婉婉老师特调的“合伙人AI孵化导师”。
      你的学生/受教合伙人名字叫“${partnerName || "新手伙伴"}”，他们目前处于孵化培训的 **${stage}** 阶段。
      他们对成人用品、两性悦己的电商运营认知几乎为零，因此情绪上可能有退缩、对于跟买家提及私密感到羞于启口，或者不懂任何闲鱼/小红书引流手法。
      
      主理人婉婉老师设立的本团队核心运营宗旨 (自定义运营规则库)：
      "${customRules || "无囤货一件代发套利、高溢价闺蜜去羞味服务、面单极度安全保障、高粘度私域转化。"}"

      请针对合伙人的真实提问："${question}" 进行亲子般的关怀指引。
      
      你应该：
      1. 抱有极度温暖、循循善诱、毫无说教感，像亲近的大学学姐和战友。
      2. 给出极其落地的“指令化脚本” (分步指令、可直接复制的话术、实操步骤)。
      3. 鼓励他们大胆去取悦用户，打消“卖成人用品低俗”的负能量，站在女性独立与两性健康的崇高视角给他们降维赋能。
      4. 将解答拆解成：【认知重组】、【实操第一步】、【话术脚本模版】。
      
      请严格按照以下 JSON Schema 输出：
      {
        "mentorReply": "导师亲切答复正文 (含有排版优雅的话术和清晰指示步骤，控制在400字内)",
        "actionScript": "可以直接复制去使用的爆款上架话术、引流短句或客户话术模板 (控制在150字内)",
        "evaluationLog": "一句话暗地分析该合伙人的心智成熟度与当前阶段缺陷，并给出婉婉老师改进建议。"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mentorReply: { type: Type.STRING },
            actionScript: { type: Type.STRING },
            evaluationLog: { type: Type.STRING }
          },
          required: ["mentorReply", "actionScript", "evaluationLog"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("大模型返回异常");
    }

    const data = JSON.parse(text);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Gemini Affiliate Mentor Error:", error);
    return res.json({
      success: false,
      message: "导师由于网络原因暂时离席，" + error.message,
    });
  }
});

// ---------------- VITE MIDDLEWARE SETUP ----------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[桃心秘境] 婉婉AI全栈自动售卖后中端服务已完美启动！`);
    console.log(`运行在: http://localhost:${PORT}`);
  });
}

startServer();
