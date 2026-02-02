import emailjs from '@emailjs/browser';

// 配置常量
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_default',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_default',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key',
};

// 每月配额
export const MONTHLY_QUOTA = 200;

// 频率限制
export const RATE_LIMIT = {
  maxPerDay: 5,
  cooldownMinutes: 30,
};

// 验证码题目
export const CAPTCHA_QUESTIONS = [
  { question: { zh: "请输入 7 + 3 = ?", en: "What is 7 + 3 = ?" }, answer: "10" },
  { question: { zh: "请输入 12 - 4 = ?", en: "What is 12 - 4 = ?" }, answer: "8" },
  { question: { zh: "请输入 5 × 6 = ?", en: "What is 5 × 6 = ?" }, answer: "30" },
  { question: { zh: "请输入 20 ÷ 5 = ?", en: "What is 20 ÷ 5 = ?" }, answer: "4" },
  { question: { zh: "请输入 9 + 6 = ?", en: "What is 9 + 6 = ?" }, answer: "15" },
];

// 发送邮件
export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  await emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    {
      name: data.name,
      email: data.email,
      message: data.message,
      date: new Date().toLocaleString(),
    },
    EMAILJS_CONFIG.publicKey
  );
}

// 获取限制状态
export function getLimitStatus() {
  const today = new Date().toDateString();
  const savedData = localStorage.getItem('contactFormLimit');

  if (!savedData) {
    return {
      remainingToday: RATE_LIMIT.maxPerDay,
      totalSent: 0,
      cooldownEnd: null,
      quotaWarning: false,
    };
  }

  try {
    const data = JSON.parse(savedData);
    const lastDate = new Date(data.date).toDateString();

    let remainingToday = RATE_LIMIT.maxPerDay;
    if (lastDate === today) {
      remainingToday = Math.max(0, RATE_LIMIT.maxPerDay - data.count);
    }

    const totalSent = data.totalSent || 0;
    const cooldownEnd = data.cooldownUntil && data.cooldownUntil > Date.now() ? data.cooldownUntil : null;
    const quotaWarning = totalSent >= MONTHLY_QUOTA - 10;

    return { remainingToday, totalSent, cooldownEnd, quotaWarning };
  } catch {
    return {
      remainingToday: RATE_LIMIT.maxPerDay,
      totalSent: 0,
      cooldownEnd: null,
      quotaWarning: false,
    };
  }
}

// 更新限制数据
export function updateLimitData() {
  const savedData = localStorage.getItem('contactFormLimit');
  let data = savedData
    ? JSON.parse(savedData)
    : { date: new Date(), count: 0, totalSent: 0, cooldownUntil: null };

  const today = new Date().toDateString();
  const lastDate = new Date(data.date).toDateString();

  if (lastDate !== today) {
    data.count = 0;
    data.date = new Date();
  }

  data.count += 1;
  data.totalSent = (data.totalSent || 0) + 1;
  data.cooldownUntil = Date.now() + RATE_LIMIT.cooldownMinutes * 60 * 1000;

  localStorage.setItem('contactFormLimit', JSON.stringify(data));

  return {
    remainingToday: Math.max(0, RATE_LIMIT.maxPerDay - data.count),
    totalSent: data.totalSent,
    cooldownEnd: data.cooldownUntil,
    quotaWarning: data.totalSent >= MONTHLY_QUOTA - 10,
    quotaReached: data.totalSent >= MONTHLY_QUOTA,
  };
}

// 获取随机验证码
export function getRandomCaptcha() {
  const index = Math.floor(Math.random() * CAPTCHA_QUESTIONS.length);
  return CAPTCHA_QUESTIONS[index];
}
