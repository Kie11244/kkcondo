import type { Property, Project, Testimonial, FaqItem, Area, BlogPost } from './types.ts';

export const PROPERTIES: Property[] = [
  { id: 1, type: 'rent', title: 'The Line 101 • 1BR 35 ตร.ม. ชั้นสูง', description: 'ห้องนอน 1 ห้องนอน ตกแต่งสวยงามพร้อมเข้าอยู่ บนชั้นสูงที่มองเห็นวิวเมืองได้เต็มตา โครงการ The Line 101 มีสิ่งอำนวยความสะดวกครบครัน ทั้งสระว่ายน้ำ ฟิตเนส และสวนลอยฟ้า เดินทางสะดวกเพียง 2 นาทีจาก BTS ปุณณวิถี', location: 'BTS ปุณณวิถี', walkTime: 2, bedrooms: '1', bathrooms: 1, size: 35, price: '฿18,000', imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d7e?q=80&w=1200&auto=format&fit=crop', tags: ['เช่า', 'ใกล้ BTS'], imageCount: 10 },
  { id: 2, type: 'sale', title: 'Aspire Asoke • Studio 28 ตร.ม.', description: 'ขายด่วน! ห้องสตูดิโอขนาดกะทัดรัดที่โครงการ Aspire Asoke-Ratchada ตกแต่งครบด้วยเฟอร์นิเจอร์บิวท์อินคุณภาพดี เหมาะสำหรับนักศึกษาหรือคนทำงานที่ต้องการความสะดวกสบายในการเดินทาง ใกล้ MRT พระราม 9 และห้างสรรพสินค้าชั้นนำ', location: 'MRT พระราม 9', walkTime: 5, bedrooms: 'สตูดิโอ', bathrooms: 1, size: 28, price: '฿3.9M', imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop', tags: ['ขาย', 'วิวเมือง'], imageCount: 8 },
  { id: 3, type: 'rent', title: 'Rhythm Ekkamai • 1BR 32 ตร.ม.', description: 'ให้เช่าคอนโด 1 ห้องนอนในย่านเอกมัยสุดฮิป โครงการ Rhythm Ekkamai มาพร้อมสระว่ายน้ำระบบเกลือยาว 360 องศาบนดาดฟ้า ห้องตกแต่งสไตล์โมเดิร์น เฟอร์นิเจอร์ครบครัน ใกล้แหล่งไลฟ์สไตล์ ร้านอาหาร และคาเฟ่มากมาย', location: 'BTS เอกมัย', walkTime: 6, bedrooms: '1', bathrooms: 1, size: 32, price: '฿22,000', imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop', tags: ['เช่า', 'สระว่ายน้ำ'], imageCount: 12 },
  { id: 4, type: 'sale', title: 'Ideo Mobi Rama 9 • 2BR 55 ตร.ม.', description: 'โอกาสเป็นเจ้าของห้องมุม 2 ห้องนอนที่ Ideo Mobi พระราม 9 ห้องกว้างขวาง โปร่งสบายด้วยหน้าต่างสองด้าน เห็นวิวเมืองสวยงาม ทำเลดีเยี่ยมใกล้ MRT พระราม 9 และ Central Rama 9 เหมาะสำหรับครอบครัวขนาดเล็ก', location: 'MRT พระราม 9', walkTime: 3, bedrooms: '2', bathrooms: 2, size: 55, price: '฿7.5M', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop', tags: ['ขาย', 'ห้องมุม'], imageCount: 15 },
  { id: 5, type: 'rent', title: 'Noble Ploenchit • Studio 30 ตร.ม.', description: 'สัมผัสชีวิตใจกลางเมืองที่ Noble Ploenchit คอนโดหรูที่มีทางเชื่อมตรงสู่ BTS เพลินจิต ห้องสตูดิโอวิวสระ ตกแต่งอย่างมีระดับ พร้อมสิ่งอำนวยความสะดวกครบครันระดับ 5 ดาว ใกล้ Central Embassy และสวนลุมพินี', location: 'BTS เพลินจิต', walkTime: 1, bedrooms: 'สตูดิโอ', bathrooms: 1, size: 30, price: '฿25,000', imageUrl: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop', tags: ['เช่า', 'วิวสระ'], imageCount: 9 },
  { id: 6, type: 'sale', title: 'The Esse Asoke • 2BR 70 ตร.ม.', description: 'ขายคอนโด Super Luxury ที่ The Esse Asoke ห้อง 2 ห้องนอนขนาดใหญ่บนชั้นสูง วิวสวยไม่บล็อค ตกแต่งด้วยวัสดุพรีเมียม โครงการตั้งอยู่ใจกลางอโศก ใกล้ทั้ง BTS และ MRT พร้อมส่วนกลางที่หรูหราที่สุดในย่าน', location: 'MRT สุขุมวิท', walkTime: 3, bedrooms: '2', bathrooms: 2, size: 70, price: '฿18.9M', imageUrl: 'https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=1200&auto=format&fit=crop', tags: ['ขาย', 'ชั้นสูง'], imageCount: 20 },
  { id: 7, type: 'rent', title: 'Life Ladprao • 1BR 33 ตร.ม.', description: 'ให้เช่าคอนโด Life Ladprao ตรงข้าม Central Ladprao และติด BTS ห้าแยกลาดพร้าว ห้อง 1 ห้องนอน ตกแต่งครบ พร้อมเข้าอยู่ โครงการมีสวนลอยฟ้าขนาดใหญ่ และสระว่ายน้ำแบบ Sky Pool ที่สวยที่สุดในย่าน', location: 'BTS ห้าแยกลาดพร้าว', walkTime: 2, bedrooms: '1', bathrooms: 1, size: 33, price: '฿17,000', imageUrl: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop', tags: ['เช่า', 'สวนลอยฟ้า'], imageCount: 11 },
  { id: 8, type: 'sale', title: 'The Base Sukhumvit 50 • 1BR 30 ตร.ม.', description: 'ขายคอนโด The Base สุขุมวิท 50 ใกล้ BTS อ่อนนุช ห้อง 1 ห้องนอน ตกแต่งครบพร้อมเฟอร์นิเจอร์และเครื่องใช้ไฟฟ้า สามารถเข้าอยู่หรือปล่อยเช่าได้ทันที ทำเลดีใกล้ทางด่วนและแหล่งของกินย่านอ่อนนุช', location: 'BTS อ่อนนุช', walkTime: 5, bedrooms: '1', bathrooms: 1, size: 30, price: '฿3.2M', imageUrl: 'https://images.unsplash.com/photo-1545324418-20f1d235c32a?q=80&w=1200&auto=format&fit=crop', tags: ['ขาย', 'ตกแต่งครบ'], imageCount: 7 },
];

export const PROJECTS: Project[] = [
    { id: 1, name: 'The Line 101', developer: 'Sansiri', year: 2018, station: 'BTS ปุณณวิถี', walkTime: 2, floors: 28, units: '285 ยูนิต', priceRangeRent: '฿15k–45k', priceRangeSale: '฿3.5M–12M', imageUrl: 'https://images.unsplash.com/photo-1529429612779-c8e40ef2f36e?q=80&w=1600&auto=format&fit=crop' },
    { id: 2, name: 'Aspire Asoke', developer: 'AP', year: 2020, station: 'MRT พระราม 9', walkTime: 6, floors: 30, units: '1230 ยูนิต', priceRangeRent: '฿12k–35k', priceRangeSale: '฿2.9M–7.9M', imageUrl: 'https://images.unsplash.com/photo-1545324418-bdf23ca9e42a?q=80&w=1600&auto=format&fit=crop' },
    { id: 3, name: 'Noble BE19', developer: 'Noble', year: 2019, station: 'BTS นานา', walkTime: 7, floors: 48, units: '1014 ยูนิต', priceRangeRent: '฿20k–60k', priceRangeSale: '฿5.9M–18M', imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop' },
    { id: 4, name: 'Park 24', developer: 'Origin', year: 2018, station: 'BTS พร้อมพงษ์', walkTime: 8, floors: 51, units: '2000+ ยูนิต', priceRangeRent: '฿15k–45k', priceRangeSale: '฿4.2M–15M', imageUrl: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop' },
    { id: 5, name: 'Life Asoke', developer: 'AP', year: 2018, station: 'MRT เพชรบุรี', walkTime: 3, floors: 35, units: '1642 ยูนิต', priceRangeRent: '฿13k–40k', priceRangeSale: '฿3.1M–9.9M', imageUrl: 'https://images.unsplash.com/photo-1496252302384-4253e39e872b?q=80&w=1600&auto=format&fit=crop' },
    { id: 6, name: 'Q Asoke', developer: 'Q House', year: 2015, station: 'MRT เพชรบุรี', walkTime: 1, floors: 41, units: '482 ยูนิต', priceRangeRent: '฿18k–65k', priceRangeSale: '฿6.5M–22M', imageUrl: 'https://images.unsplash.com/photo-1529429612779-3dfe9e933c6a?q=80&w=1600&auto=format&fit=crop' },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, name: 'คุณเมย์', role: 'พนักงานออฟฟิศ', quote: 'ทีมงานช่วยหาห้องตรงงบมาก เดินถึง BTS แค่ 2 นาที แนะนำสุดๆ', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Mr. John', role: 'Consultant', quote: 'Great service and quick response. Found a fully furnished unit near Asoke.', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'คุณตั้ม', role: 'สตาร์ทอัพ', quote: 'ทีมงานมืออาชีพ ประสานงานเจ้าของได้ไว เอกสารครบ เช่าจบในสัปดาห์เดียว', imageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop' },
];

export const FAQ_ITEMS: FaqItem[] = [
    { id: 1, question: 'ค่าบริการพาไปดูห้องมีค่าใช้จ่ายหรือไม่?', answer: 'ไม่มีค่าใช้จ่าย เราบริการลูกค้าฟรีตั้งแต่ค้นหา นัดดูห้อง จนถึงทำสัญญา' },
    { id: 2, question: 'ต้องใช้เอกสารอะไรบ้างในการเช่า?', answer: 'สำเนาบัตรประชาชน/พาสปอร์ต สลิปเงินเดือน/หนังสือรับรองเงินเดือน และมัดจำตามเงื่อนไข' },
    { id: 3, question: 'สามารถเลี้ยงสัตว์ได้ไหม?', answer: 'ขึ้นอยู่กับนโยบายของแต่ละโครงการและเจ้าของห้อง เราจะช่วยคัดเฉพาะที่อนุญาต' },
];

export const AREAS: Area[] = [
    { id: 1, name: 'BTS ปุณณวิถี', type: 'BTS', startPrice: '฿15k' },
    { id: 2, name: 'BTS อโศก', type: 'BTS', startPrice: '฿18k' },
    { id: 3, name: 'BTS เอกมัย', type: 'BTS', startPrice: '฿17k' },
    { id: 4, name: 'MRT พระราม 9', type: 'MRT', startPrice: '฿14k' },
    { id: 5, name: 'BTS เพลินจิต', type: 'BTS', startPrice: '฿22k' },
    { id: 6, name: 'MRT สุขุมวิท', type: 'MRT', startPrice: '฿19k' },
];

export const BLOG_POSTS: BlogPost[] = [
    { id: 1, title: 'เช่าคอนโดยังไงให้คุ้ม งบไม่บานปลาย', excerpt: 'เคล็ดลับเลือกทำเล ต่อรองราคา และเอกสารที่ต้องเตรียม', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop', date: 'Sep 2025' },
    { id: 2, title: 'คอนโดปล่อยเช่า ย่านไหน Yield ดีสุด', excerpt: 'จัดอันดับ 6 ทำเลยอดนิยมสำหรับนักลงทุนมือใหม่', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop', date: 'Aug 2025' },
    { id: 3, title: 'เฟอร์นิเจอร์จำเป็นสำหรับคอนโด 30 ตร.ม.', excerpt: 'ลิสต์ของที่ควรมี พร้อมงบประมาณโดยประมาณ', imageUrl: 'https://images.unsplash.com/photo-1485451456034-a0847fba2b00?q=80&w=1600&auto=format&fit=crop', date: 'Jul 2025' },
];

export const TRANSLATIONS = {
  th: {
    'hero.title': 'ค้นหาคอนโดที่ใช่ ใกล้ BTS/MRT',
    'hero.subtitle': 'ใกล้รถไฟฟ้า ราคาดี บริการมืออาชีพ'
  },
  en: {
    'hero.title': 'Find your perfect condo near BTS/MRT',
    'hero.subtitle': 'Prime locations, fair prices, professional service'
  }
};