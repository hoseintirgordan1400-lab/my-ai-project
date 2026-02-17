
export interface Story {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'handle' | 'cabinet' | 'home-accessory';
  files: string[];
}

export interface SiteInfo {
  name: string;
  address: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  description: string;
  videoUrl?: string;
}
