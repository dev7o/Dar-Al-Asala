import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: "men" | "women" | "unisex";
  rating: number;
  image: string;
  bestSeller: boolean;
  notes: string[];
  size: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "عود الملوك",
    description: "عطر ملكي فاخر بمزيج من العود الكمبودي والمسك الأبيض",
    longDescription: "عطر عود الملوك هو تحفة عطرية فاخرة تجمع بين أجود أنواع العود الكمبودي والمسك الأبيض النقي. يبدأ العطر بمقدمة دافئة من العنبر والزعفران، ثم ينتقل إلى قلب غني بالعود والورد الدمشقي، ليستقر على قاعدة من المسك والصندل.",
    price: 450,
    category: "men",
    rating: 5,
    image: perfume1,
    bestSeller: true,
    notes: ["العود الكمبودي", "المسك الأبيض", "العنبر", "الزعفران"],
    size: "100 مل",
  },
  {
    id: 2,
    name: "زهرة الليل",
    description: "عطر أنثوي ساحر بنفحات الورد والياسمين الليلي",
    longDescription: "زهرة الليل عطر يحتفي بجمال الأنوثة وغموض الليل. مزيج فريد من الورد التركي والياسمين الليلي مع لمسات من الفانيليا والعنبر الدافئ. عطر يدوم طويلاً ويترك أثراً لا يُنسى.",
    price: 380,
    category: "women",
    rating: 5,
    image: perfume2,
    bestSeller: true,
    notes: ["الورد التركي", "الياسمين", "الفانيليا", "العنبر"],
    size: "75 مل",
  },
  {
    id: 3,
    name: "أسرار الشرق",
    description: "عطر شرقي غامض للجنسين بمكونات نادرة",
    longDescription: "أسرار الشرق عطر يجسد روعة التراث العطري الشرقي. يمزج بين البخور الصومالي والعود الهندي مع لمسات من الورد والمسك. عطر للجنسين يعكس الأناقة والرقي.",
    price: 520,
    category: "unisex",
    rating: 4,
    image: perfume3,
    bestSeller: false,
    notes: ["البخور الصومالي", "العود الهندي", "الورد", "المسك"],
    size: "100 مل",
  },
  {
    id: 4,
    name: "بخور العود",
    description: "عطر كلاسيكي فاخر مستوحى من تقاليد البخور العربي",
    longDescription: "بخور العود هو رحلة عطرية إلى قلب التقاليد العربية الأصيلة. يجمع بين أجود أنواع العود مع دخان البخور والعنبر الرمادي. عطر يحمل في طياته عبق التاريخ وفخامة الحاضر.",
    price: 590,
    category: "men",
    rating: 5,
    image: perfume4,
    bestSeller: true,
    notes: ["العود", "البخور", "العنبر الرمادي", "الصندل"],
    size: "100 مل",
  },
  {
    id: 5,
    name: "مسك الغزال",
    description: "عطر ناعم وأنيق بنفحات المسك الطبيعي الفاخر",
    longDescription: "مسك الغزال عطر يتميز بنقاء المسك الطبيعي الممزوج بالورد الطائفي والعنبر. عطر رقيق وأنيق يناسب كل المناسبات ويدوم طوال اليوم.",
    price: 350,
    category: "women",
    rating: 4,
    image: perfume1,
    bestSeller: false,
    notes: ["المسك الطبيعي", "الورد الطائفي", "العنبر", "الصندل"],
    size: "75 مل",
  },
  {
    id: 6,
    name: "عنبر الصحراء",
    description: "عطر دافئ وجريء مستوحى من رمال الصحراء الذهبية",
    longDescription: "عنبر الصحراء عطر يأخذك في رحلة إلى قلب الصحراء العربية. مزيج فريد من العنبر والتوابل الشرقية مع قاعدة من خشب الأرز والباتشولي.",
    price: 420,
    category: "unisex",
    rating: 5,
    image: perfume3,
    bestSeller: true,
    notes: ["العنبر", "التوابل الشرقية", "خشب الأرز", "الباتشولي"],
    size: "100 مل",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "أحمد الراشد",
    text: "عطر عود الملوك من أفخم العطور التي جربتها. ثباته مذهل ورائحته تبقى طوال اليوم. أنصح به بشدة!",
    rating: 5,
  },
  {
    id: 2,
    name: "سارة المنصور",
    text: "زهرة الليل عطري المفضل! رائحة أنثوية راقية تجذب الانتباه. التغليف أيضاً فاخر جداً.",
    rating: 5,
  },
  {
    id: 3,
    name: "خالد العتيبي",
    text: "جربت بخور العود وأصبح عطري اليومي. جودة عالية وسعر مناسب مقارنة بالعلامات العالمية.",
    rating: 5,
  },
  {
    id: 4,
    name: "نورة الشمري",
    text: "تجربة تسوق رائعة! الشحن سريع والتغليف فاخر. العطور أصلية وثباتها ممتاز.",
    rating: 4,
  },
];
