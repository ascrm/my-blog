import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '1yx8finwqvxd',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'HkJHTVIpx1WymRV_nUQ7aEwLBCTJaW4coyvFsIKFjHQ',
});

export interface Post {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  content: any; // Rich Text JSON
  createdAt: string;
}

// 获取所有文章
export async function getPosts(locale: string = 'zh'): Promise<Post[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-sys.createdAt'], // 按创建时间倒序
      locale: locale === 'zh' ? 'zh' : 'en',
    });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || 'Untitled',
      slug: item.fields.slug || '',
      cover: item.fields.heroImage?.fields?.file?.url
        ? `https:${item.fields.heroImage.fields.file.url}`
        : null,
      content: item.fields.body, // Rich Text
      createdAt: item.sys.createdAt,
    }));
  } catch (error) {
    console.error('Error fetching posts from Contentful:', error);
    return [];
  }
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string, locale: string = 'zh'): Promise<Post | null> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      locale: locale === 'zh' ? 'zh' : 'en',
    });

    if (entries.items.length === 0) {
      return null;
    }

    const item: any = entries.items[0];
    return {
      id: item.sys.id,
      title: item.fields.title || 'Untitled',
      slug: item.fields.slug || '',
      cover: item.fields.heroImage?.fields?.file?.url
        ? `https:${item.fields.heroImage.fields.file.url}`
        : null,
      content: item.fields.body,
      createdAt: item.sys.createdAt,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}
