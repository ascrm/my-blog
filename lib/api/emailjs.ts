import emailjs from '@emailjs/browser';

// 配置常量
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_default',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_default',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key',
};

// 本地限制：每个访客最多可发送 5 条消息
export const LOCAL_LIMIT = 5;

// 频率限制（冷却时间）
export const RATE_LIMIT = {
  cooldownMinutes: 30,
};

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
  const savedData = localStorage.getItem('contactFormLimit');

  if (!savedData) {
    return {
      remainingToday: LOCAL_LIMIT,
      cooldownEnd: null,
      quotaWarning: false,
    };
  }

  try {
    const data = JSON.parse(savedData);
    const remainingToday = Math.max(0, LOCAL_LIMIT - data.count);
    const cooldownEnd = data.cooldownUntil && data.cooldownUntil > Date.now() ? data.cooldownUntil : null;

    return {
      remainingToday,
      cooldownEnd,
      quotaWarning: remainingToday <= 1,
    };
  } catch {
    return {
      remainingToday: LOCAL_LIMIT,
      cooldownEnd: null,
      quotaWarning: false,
    };
  }
}

// 更新限制数据
export function updateLimitData() {
  const savedData = localStorage.getItem('contactFormLimit');
  const data = savedData
    ? JSON.parse(savedData)
    : { count: 0, cooldownUntil: null };

  data.count = (data.count || 0) + 1;
  data.cooldownUntil = Date.now() + RATE_LIMIT.cooldownMinutes * 60 * 1000;

  localStorage.setItem('contactFormLimit', JSON.stringify(data));

  return {
    remainingToday: Math.max(0, LOCAL_LIMIT - data.count),
    cooldownEnd: data.cooldownUntil,
    quotaWarning: data.count >= LOCAL_LIMIT - 1,
    quotaReached: data.count >= LOCAL_LIMIT,
  };
}
