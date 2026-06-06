import { WPInfo, WPPage } from '@/entities';
import { resolvePlaceholders } from '../stringUtils';
const WC_URL = import.meta.env.WC_URL || process.env.WC_URL;

export async function getPages(infoData: WPInfo) { // Renamed function to match file name
  if (!WC_URL) {
    console.error('❌ LỖI: Biến WC_URL chưa được cấu hình trong Environment Variables.');
    return [];
  }

  try {
    // Fetch trang chính sách bảo mật tiếng Việt
    const Response = await fetch(`${WC_URL}/wp-json/wp/v2/pages?_embed=true&status=publish`);
    const Pages = Response.ok ? await Response.json() : [];

    let unifiedPages: WPPage[] = [];

    Pages.forEach((item: any) => {
      // Xác định ID gốc: Nếu có origin_page_id thì dùng nó, nếu không thì dùng chính ID của item (bản tiếng Việt)
      const originKey = (item.acf?.origin_page_id || item.id).toString();
      //const featuredImage = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      const lang = item.acf?.product_lang?.value || 'vi'; // Mặc định là tiếng Việt nếu không có trường này
      let itemcp = unifiedPages.find((t) => t.id === originKey);
      //const url = item.attributes?.find((attr: any) => attr.slug === 'pa_url').options?.[0] || '';
      if (itemcp == null) {
        itemcp = {
          id: originKey,
          slug: { [lang]: item.slug },
          //image: { [lang]: featuredImage},
          //url: {[lang]: url},
          title: { [lang]: item.title?.rendered || '' },
          content: { [lang]: item.content?.rendered || '' }
        };
        unifiedPages.push(itemcp);
      }
      else {
        itemcp.slug = { ...itemcp.slug, [lang]: item.slug };
        itemcp.title = { ...itemcp.title, [lang]: item.title?.rendered || '' };
        itemcp.content = { ...itemcp.content, [lang]: item.content?.rendered || '' };
        //itemcp.image = { ...itemcp.image, [lang]: featuredImage };
      }
    });
    // Xử lý lưu ảnh static cho tất cả template đã gom nhóm
    return await Promise.all(Object.values(unifiedPages).map(async (p: any): Promise<WPPage> => {
      return p;
    }));
    
  } catch (error) {
    console.error(`❌ LỖI fetch Pages:`, error);
    // Trả về đối tượng rỗng để tránh lỗi undefined trong các component React
    return [];
  }
}