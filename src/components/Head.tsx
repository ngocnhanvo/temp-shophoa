import { WPInfo } from "@/entities";

// 1. Định nghĩa bảng quy đổi giữa Short Lang và Full Locale
export const LOCALE_MAP: Record<string, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  fr: 'fr_FR',
  ja: 'ja_JP',
  ko: 'ko_KR',
  // Bạn có thể thêm các ngôn ngữ khác của dự án vào đây
};

export interface HeadProps {
  title: string;
  description: string;
  ogImage?: string;
  lang: string;
  href: string;
  data_info: WPInfo;
}
export const Head = (props: HeadProps) => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" hrefLang={props.lang} href={props.href} />
      <link
          rel="icon"
          href={props.data_info.favicon.srcSets["20"] || '/favicon.ico'}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.href} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:locale" content={LOCALE_MAP[props.lang]} />
      {props.ogImage && <meta property="og:image" content={props.ogImage} />}
      {props.ogImage && <meta property="og:image:width" content="1424" />}
      {props.ogImage && <meta property="og:image:height" content="752" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={props.href} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      {props.ogImage && <meta name="twitter:image" content={props.ogImage} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": props.data_info?.['tencongty'] || "Vibe Code Studio",
            "url": props.href,
            "description": props.description,
            "inLanguage": LOCALE_MAP[props.lang],
            "publisher": {
              "@type": "Organization",
              "name": props.data_info?.['tencongty'] || "Vibe Code Studio",
              "url": props.href,
              "contactPoint": {
                "@type": "ContactPoint",
                "email": props.data_info?.['email'] || "contact@vibecodestudio.com",
                "telephone": props.data_info?.['sodienthoai'] || "+84123456789",
                "contactType": "customer service",
                "areaServed": "VN",
                "availableLanguage": ["Vietnamese", "English"]
              }
            }
          })
        }}
      />
    </>
  );
};
