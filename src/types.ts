export interface StrategyDimension {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  coreConcept: string;
  keyPoints: {
    title: string;
    desc: string;
    model?: string; // 关联的思维模型
  }[];
}

export interface UncensoredProduct {
  id: string;
  rawName: string;
  rawCategory: string;
  rawKeywords: string[];
}

export interface TranslatedProduct {
  rawName: string;
  translatedName: string;
  category: string;
  lowSensitivityKeywords: string[];
  copywritingTemplates: {
    title: string;
    content: string;
    marketingVibe: string;
  }[];
  emotionalPitch: string;
}

export interface Message {
  id: string;
  sender: 'buyer' | 'ai';
  text: string;
  timestamp: string;
  isSensitive?: boolean;
  sensitiveAnalysis?: string;
  sensitiveType?: 'privacy' | 'shame' | 'functional' | 'logistics';
}

export interface ChatSession {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  productName: string;
  status: 'pending' | 'chatting' | 'ordered' | 'completed';
  messages: Message[];
  unreadCount: number;
}

export interface DropshipOrder {
  id: string;
  productName: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddr: string;
  sourceUrl: string;
  sourcePrice: number;
  salePrice: number;
  status: 'ordered' | 'padd_paying' | 'shipped' | 'delivered';
  trackingNumber?: string;
  privacyCheck: {
    blackFilm: boolean;
    anonymousSender: boolean;
    noProductKeyword: boolean;
    courierNote: boolean;
  };
}
