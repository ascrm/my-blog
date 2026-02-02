// Substack 订阅配置
export const SUBSTACK_CONFIG = {
  // 替换为你的 Substack publication 名称
  publication: 'ascrm',
  // 订阅页面 URL
  getSubscribeUrl: (email?: string) => {
    const baseUrl = `https://${SUBSTACK_CONFIG.publication}.substack.com/subscribe`;
    if (email) {
      return `${baseUrl}?email=${encodeURIComponent(email)}`;
    }
    return baseUrl;
  },
  // Embed URL
  getEmbedUrl: () => {
    return `https://${SUBSTACK_CONFIG.publication}.substack.com/embed`;
  },
};

// 打开订阅页面
export function openSubstackSubscribe(email?: string) {
  const url = SUBSTACK_CONFIG.getSubscribeUrl(email);
  window.open(url, '_blank', 'noopener,noreferrer');
}
