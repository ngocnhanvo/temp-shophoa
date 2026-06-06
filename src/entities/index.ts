/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

export interface ProcessedImageResult {
  src: string;     // Đường dẫn ảnh mặc định (bản lớn nhất hoặc ảnh gốc)
  srcSet: string;
  srcSets: Record<string, string>;   // Chuỗi srcSet chứa nhiều kích thước phục vụ responsive
}

export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  itemName?: Record<string, string>;
  slug?: Record<string, string>;
  slugP?: Record<string, string>;
  itemPrice?: Record<string, number>;
  itemInstallment?: Record<string, number>;
  itemCurrency?: Record<string, string>;
  itemImage?: Record<string, ProcessedImageResult>;
  itemDescription?: Record<string, string>;
  itemDescriptionShort?: Record<string, string>;
  category?: Record<string, string>;
  quantity?: number;
  collectionId?: string;
  isFeatured?: Record<string, boolean>;
}

export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}

export interface Bivit {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
}

export interface Pages {
  key: string,
  id?: string, 
  lang: string,
  slug: string,
  slugP?: string,
  title: string,
  label: string,
  action: string,
  description: string,
  ogImage?: string,
  header?: boolean
}

export interface AppRouterProps {
  basename?: string;
  pages: Pages[];
  data_info?: WPInfo;
  data_pages?: WPPage[];
  data_products?: Products[];
}

export interface WPPage {
  id?: number;
  name?: string;
  slug?: Record<string, string>;
  title?: Record<string, string>;
  content?: Record<string, string>;
  image?: Record<string, ProcessedImageResult>;
  description?: Record<string, string>;
  order?: number;
}

export interface WPInfo {
  id: number;
  tencongty?: Record<string, string>;
  diachi?: Record<string, string>;
  googlemap?: string;
  sodienthoai?: string;
  email?: string;
  domain?: string;
  logo?: ProcessedImageResult;
  favicon?: ProcessedImageResult;
  image?: ProcessedImageResult;
}

/**
 * Collection ID: contactmessages
 * Interface for ContactMessages
 */
export interface ContactMessages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: corevalues
 * Interface for CoreValues
 */
export interface CoreValues {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  valueTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  valueImage?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  slogan?: string;
}

/**
 * Collection ID: floralproducts
 * @catalog This collection is an eCommerce catalog
 * Interface for FloralProducts
 */
export interface FloralProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  occasion?: string;
}
