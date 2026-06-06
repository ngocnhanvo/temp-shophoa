import { WPInfo } from '@/entities';
import { processAndStoreImage } from './imageProcessor'; // Import the new utility function
// import { generateAndSaveSitemap } from './sitemap'; // Removed as sitemap is generated in Astro

const WC_URL = import.meta.env.WC_URL || process.env.WC_URL; // Keep WC_URL

export async function getInfo(isPreview: boolean = false): Promise<WPInfo[]> {
  if (!WC_URL) {
    throw new Error('❌ LỖI: Biến WC_URL chưa được cấu hình trong Environment Variables. Không thể fetch thông tin chung.');
  }

  try {
    const response = await fetch(
      `${WC_URL}/wp-json/wp/v2/thong-tin-chung?_embed=true&status=publish&v=${Date.now()}`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ LỖI fetch thông tin chung từ CMS: ${response.status} ${response.statusText} - ${errorText}`);
    }
  
  const raw_data = await response.json();

  return await Promise.all(raw_data.map(async (item: any): Promise<WPInfo> => {
    const logoUrl = item.acf.logo?.url || '';
    const faviconUrl = item.acf.favicon?.url || '';
    const imageUrl = item.acf.image?.url || '';

    const processedLogoUrl = await processAndStoreImage({
      imageUrl: logoUrl,
      wcUrl: WC_URL,
      publicDirBase: 'images/info', // Lưu ảnh logo/favicon vào thư mục riêng
      isPreview: isPreview, // Truyền trạng thái preview
    });
    const processedFaviconUrl = await processAndStoreImage({
      imageUrl: faviconUrl,
      wcUrl: WC_URL,
      publicDirBase: 'images/info', // Lưu ảnh logo/favicon vào thư mục riêng
      isPreview: isPreview, // Truyền trạng thái preview
    });
    const processedImageUrl = await processAndStoreImage({
      imageUrl: imageUrl,
      wcUrl: WC_URL,
      publicDirBase: 'images/info', // Lưu ảnh logo/favicon vào thư mục riêng
      isPreview: isPreview, // Truyền trạng thái preview
    });

    return {
      id: item.id,
      tencongty: {
        vi: item.acf.tencongty || '',
        en: item.acf.en_tencongty || '',
        ja: item.acf.ja_tencongty || '',
        zh: item.acf.zh_tencongty || '',
        ko: item.acf.ko_tencongty || '',
        fr: item.acf.fr_tencongty || '',
        de: item.acf.de_tencongty || ''
      },
      diachi: {
        vi: item.acf.diachi || '',
        en: item.acf.en_diachi || '',
        ja: item.acf.ja_diachi || '',
        zh: item.acf.zh_diachi || '',
        ko: item.acf.ko_diachi || '',
        fr: item.acf.fr_diachi || '',
        de: item.acf.de_diachi || ''
      },
      googlemap: item.acf.googlemap || '',
      sodienthoai: item.acf.sodienthoai || '',
      email: item.acf.email || '',
      domain: item.acf.domain || '',
      logo: processedLogoUrl,
      favicon: processedFaviconUrl,
      image: processedImageUrl
    };
  }));

  } catch (error) {
    console.error(`❌ LỖI nghiêm trọng khi fetch thông tin chung từ CMS:`, error);
    throw error; // Re-throw to fail the build
  }
}