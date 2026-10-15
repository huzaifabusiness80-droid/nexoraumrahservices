export type Language = "en" | "ar";

export interface SlideData {
  tag: string;
  titleLine1: string;
  titleLine2: string;
  buttonText: string;
}

export interface VehicleData {
  name: string;
  category: string;
  description: string;
  passengers: string;
  luggage: string;
}

export interface VehicleTypeData {
  id: string;
  name: string;
  description: string;
}

export interface FeatureData {
  id: string;
  title: string;
  description: string;
}

export interface TestimonialData {
  name: string;
  review: string;
}

export interface TranslationSchema {
  topBarLocation: string;
  navHome: string;
  navFleet: string;
  navAbout: string;
  navContact: string;
  requestRide: string;
  langSwitchLabel: string;
  langFlag: string;

  heroSlides: SlideData[];

  fleetTag: string;
  fleetHeading: string;
  filterCarClass: string;
  filterSelectClass: string;
  filterCarBrand: string;
  filterSelectBrand: string;
  filterPassengers: string;
  filterSelectCapacity: string;
  filterGuests14: string;
  filterGuests57: string;
  filterGuests814: string;
  filterGuests1530: string;
  bookNow: string;
  showAllCars: string;
  vehicles: VehicleData[];

  vehicleTypeTag: string;
  vehicleTypeHeading: string;
  vehicleTypes: VehicleTypeData[];

  bookTripHeading: string;
  bookTripSubtitle: string;
  bookTripBtn: string;

  whyChooseTag: string;
  whyChooseHeading: string;
  whyChooseFeatures: FeatureData[];

  testimonialsTag: string;
  testimonialsHeadingLine1: string;
  testimonialsHeadingLine2: string;
  testimonialsHeadingLine3: string;
  testimonialsHeadingLine4: string;
  testimonialsAvgRating: string;
  testimonialsRatingSub: string;
  testimonialsList: TestimonialData[];
  bannerStatementTag: string;
  bannerStatementText: string;

  transportBannerHeading: string;
  transportBannerBtn: string;

  footerDesc: string;
  footerSiteMap: string;
  footerCapacityGuide: string;
  cap1to10: string;
  cap1to4: string;
  cap1to7: string;
  cap20to22: string;
  footerContactUs: string;
  footerNewsletterSub: string;
  footerEmailPlaceholder: string;
  footerSubscribeBtn: string;
  footerSubscribedBtn: string;
  footerCopyright: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    topBarLocation: "FW7W+9PJ Makkah Al-Mukarramah, Saudi Arabia",
    navHome: "Home",
    navFleet: "Rental Cars",
    navAbout: "About",
    navContact: "Contact",
    requestRide: "Book Now",
    langSwitchLabel: "العربية",
    langFlag: "🇸🇦",

    heroSlides: [
      {
        tag: "PREMIUM TRANSPORTATION FOR PILGRIMS & VISITORS",
        titleLine1: "Your Trusted Transportation",
        titleLine2: "Partner in Makkah & Madinah",
        buttonText: "EXPLORE SERVICES",
      },
      {
        tag: "VIP PILGRIMAGE CHAUFFEUR SERVICES",
        titleLine1: "Sacred Journeys in Serene",
        titleLine2: "Comfort Across Sanctuaries",
        buttonText: "EXPLORE SERVICES",
      },
      {
        tag: "JEDDAH AIRPORT PRIVATE VIP TERMINAL TRANSFERS",
        titleLine1: "Direct VIP Arrival with",
        titleLine2: "Zero Waiting to Makkah",
        buttonText: "EXPLORE SERVICES",
      },
      {
        tag: "EXECUTIVE FLEET FOR DIGNITARIES & FAMILIES",
        titleLine1: "Luxury Limousine & Ziyarat",
        titleLine2: "Tours in Makkah & Madinah",
        buttonText: "EXPLORE SERVICES",
      },
    ],

    fleetTag: "Transport Services",
    fleetHeading: "Get Our Best Offers for Safe & Comfortable Trips",
    filterCarClass: "Car Class",
    filterSelectClass: "Select Car Class",
    filterCarBrand: "Car Brand",
    filterSelectBrand: "Select Car Brand",
    filterPassengers: "Passengers",
    filterSelectCapacity: "Select Capacity",
    filterGuests14: "1 – 4 Guests",
    filterGuests57: "5 – 7 Guests",
    filterGuests814: "8 – 14 Guests",
    filterGuests1530: "15 – 30 Guests",
    bookNow: "Book Now",
    showAllCars: "Show All Cars",
    vehicles: [
      {
        name: "Toyota Coaster",
        category: "Mini Bus",
        description: "Ideal for large groups, Hajj & Umrah campaigns, and long city tours.",
        passengers: "22 – 30",
        luggage: "Large Storage",
      },
      {
        name: "Mercedes V-Class",
        category: "Executive Van",
        description: "A premium accessible van offering maximum comfort and a hydraulic wheelchair lift.",
        passengers: "6 – 7",
        luggage: "6 Bags",
      },
      {
        name: "Toyota HiAce",
        category: "Passenger Van",
        description: "A large van ideal for group transport, city to city trips, and airport services.",
        passengers: "10 – 14",
        luggage: "8 Bags",
      },
      {
        name: "GMC Yukon Denali",
        category: "Luxury SUV",
        description: "A full-size luxury SUV perfect for VIP transfers, intercity highway rides, and family groups.",
        passengers: "5 – 6",
        luggage: "5 Bags",
      },
      {
        name: "Toyota Camry",
        category: "Executive Sedan",
        description: "A reliable and comfortable sedan perfect for long distance travel and city rides.",
        passengers: "3 – 4",
        luggage: "3 Bags",
      },
      {
        name: "Hyundai Staria",
        category: "Premium MPV",
        description: "A futuristic premium people mover with spacious cabin for comfortable family pilgrimages.",
        passengers: "7 – 11",
        luggage: "6 Bags",
      },
    ],

    vehicleTypeTag: "CHOOSE YOUR VEHICLE TYPE",
    vehicleTypeHeading: "Select the transport option for your journey.",
    vehicleTypes: [
      {
        id: "sedan",
        name: "Sedan Cars",
        description: "Reliable and comfortable for business trips and airport transfers.",
      },
      {
        id: "suv",
        name: "SUV Cars",
        description: "Spacious luxury suited for families and long-distance travel.",
      },
      {
        id: "van",
        name: "Van",
        description: "Ideal for group transport, Umrah trips, and intercity journeys.",
      },
      {
        id: "accessible-van",
        name: "Accessible Van",
        description: "Designed for safe and comfortable wheelchair-friendly transport.",
      },
      {
        id: "mini-bus",
        name: "Mini Bus",
        description: "comfortable mini buses tailored for large groups, tours, and organized trips",
      },
    ],

    bookTripHeading: "Book Your Trip with Nexora – Safe & Comfortable Transport, Anytime.",
    bookTripSubtitle: "We provide premium transportation for visitors and pilgrims between Makkah, Madinah, Jeddah, Taif, and all major cities.",
    bookTripBtn: "REQUEST A RIDE",

    whyChooseTag: "Premium Travel Transport",
    whyChooseHeading: "Why Choose Nexora Transport",
    whyChooseFeatures: [
      {
        id: "modern-vehicles",
        title: "Wide Range of Modern Vehicles",
        description: "We provide a selection of well-maintained sedans, SUVs, vans, mini buses, and accessible vehicles to suit all travel needs.",
      },
      {
        id: "safe-reliable",
        title: "Safe & Reliable Transportation",
        description: "Professional drivers and comfortable vehicles ensuring a smooth, safe, and stress-free travel experience.",
      },
      {
        id: "availability",
        title: "24/7 Availability",
        description: "We operate around the clock to provide airport pickup, city rides, long-distance trips, and urgent transport needs.",
      },
    ],

    testimonialsTag: "WHAT OUR CUSTOMERS SAY ABOUT NEXORA",
    testimonialsHeadingLine1: "Trusted by",
    testimonialsHeadingLine2: "thousands of",
    testimonialsHeadingLine3: "travelers every",
    testimonialsHeadingLine4: "year.",
    testimonialsAvgRating: "Average rating: 4.9 / 5.0",
    testimonialsRatingSub: "Based on real feedback from pilgrims and visitors.",
    testimonialsList: [
      {
        name: "Mohammed Youssef",
        review: "Nexora provided a great Mazarat tour with a knowledgeable guide. Highly recommended for pilgrims and families.",
      },
      {
        name: "Samir Khaled",
        review: "Reliable transport and quick response. Booking was easy and the long distance trip to Madinah was very comfortable.",
      },
    ],
    bannerStatementTag: "TRUSTED BY THOUSANDS OF PILGRIMS & VISITORS EVERY YEAR",
    bannerStatementText: "We proudly serve travelers across Makkah, Madinah, Jeddah, and Taif with safe and reliable transport.",

    transportBannerHeading: "Enjoy Safe & Comfortable Transport Anytime Serving Makkah • Madinah • Jeddah • Taif",
    transportBannerBtn: "BOOK NOW",

    footerDesc: "Nexora Company offers safe, comfortable, and reliable transportation for visitors and pilgrims across Makkah, Madinah, Jeddah, Taif, and more — including guided tours to major historical and tourist sites.",
    footerSiteMap: "Site Map",
    footerCapacityGuide: "Vehicle Capacity Guide",
    cap1to10: "1-10 passengers",
    cap1to4: "1-4 passengers",
    cap1to7: "1-7 passengers",
    cap20to22: "20-22 passengers",
    footerContactUs: "Contact Us",
    footerNewsletterSub: "For Latest update Sign up here",
    footerEmailPlaceholder: "Enter Email Here",
    footerSubscribeBtn: "SUBSCRIBE NOW",
    footerSubscribedBtn: "SUBSCRIBED!",
    footerCopyright: "Copyright © 2026 Nexora. All rights reserved | Designed and Developed EngazMedia",
  },
  ar: {
    topBarLocation: "FW7W+9PJ مكة المكرمة، المملكة العربية السعودية",
    navHome: "الرئيسية",
    navFleet: "تأجير السيارات",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    requestRide: "احجز الآن",
    langSwitchLabel: "English",
    langFlag: "🇬🇧",

    heroSlides: [
      {
        tag: "خدمات نقل راقية للحجاج والمعتمرين والزوار",
        titleLine1: "شريككم الموثوق للنقل الفاخر",
        titleLine2: "في مكة المكرمة والمدينة المنورة",
        buttonText: "استكشف الخدمات",
      },
      {
        tag: "خدمات سائق خاص لكبار الشخصيات والمعتمرين",
        titleLine1: "رحلات مباركة براحة وسكينة",
        titleLine2: "بين رحاب الحرمين الشريفين",
        buttonText: "استكشف الخدمات",
      },
      {
        tag: "استقبال خاص لكبار الشخصيات من مطار جدة",
        titleLine1: "توصيل مباشر من صالة كبار الشخصيات",
        titleLine2: "بدون انتظار إلى مكة المكرمة",
        buttonText: "استكشف الخدمات",
      },
      {
        tag: "أسطول تنفيذي للضيوف والعائلات",
        titleLine1: "ليموزين فاخر وجولات مزارات",
        titleLine2: "في مكة المكرمة والمدينة المنورة",
        buttonText: "استكشف الخدمات",
      },
    ],

    fleetTag: "خدمات النقل",
    fleetHeading: "احصل على أفضل عروضنا لرحلات آمنة ومريحة",
    filterCarClass: "فئة السيارة",
    filterSelectClass: "اختر فئة السيارة",
    filterCarBrand: "نوع السيارة",
    filterSelectBrand: "اختر نوع السيارة",
    filterPassengers: "عدد الركاب",
    filterSelectCapacity: "اختر السعة",
    filterGuests14: "1 – 4 ضيوف",
    filterGuests57: "5 – 7 ضيوف",
    filterGuests814: "8 – 14 ضيف",
    filterGuests1530: "15 – 30 ضيف",
    bookNow: "احجز الآن",
    showAllCars: "عرض جميع السيارات",
    vehicles: [
      {
        name: "تويوتا كوستر",
        category: "حافلة صغيرة",
        description: "مثالية للمجموعات الكبيرة وحملات الحج والعمرة وجولات المدن الطويلة.",
        passengers: "22 – 30",
        luggage: "مساحة تخزين واسعة",
      },
      {
        name: "مرسيدس في كلاس",
        category: "فان تنفيذي فاخر",
        description: "فان فاخر مجهز بكامل سبل الراحة ومصعد هيدروليكي للكراسي المتحركة.",
        passengers: "6 – 7",
        luggage: "6 حقائب",
      },
      {
        name: "تويوتا هايس",
        category: "فان ركاب",
        description: "فان واسع مثالي لنقل المجموعات، والتنقل بين المدن وخدمات المطار.",
        passengers: "10 – 14",
        luggage: "8 حقائب",
      },
      {
        name: "جي إم سي يوكن دينالي",
        category: "دفع رباعي فاخر (SUV)",
        description: "سيارة فاخرة كاملة الحجم مثالية لتوصيل كبار الشخصيات والتنقل بين المدن.",
        passengers: "5 – 6",
        luggage: "5 حقائب",
      },
      {
        name: "تويوتا كامري",
        category: "سيدان تنفيذية",
        description: "سيارة سيدان مريحة وموثوقة ومثالية للمسافات الطويلة والتنقلات السريعة.",
        passengers: "3 – 4",
        luggage: "3 حقائب",
      },
      {
        name: "هيونداي ستاريا",
        category: "سيارة عائلية فاخرة",
        description: "سيارة عصرية بمقصورة رحبة ومريحة جداً لرحلات العائلات والمعتمرين.",
        passengers: "7 – 11",
        luggage: "6 حقائب",
      },
    ],

    vehicleTypeTag: "اختر نوع مركبتك",
    vehicleTypeHeading: "حدد خيار النقل المناسب لرحلتك المباركة.",
    vehicleTypes: [
      {
        id: "sedan",
        name: "سيارات سيدان",
        description: "مريحة وموثوقة لرحلات العمل والتوصيل من وإلى المطار.",
      },
      {
        id: "suv",
        name: "سيارات الدفع الرباعي",
        description: "فخامة ورحابة تناسب العائلات والسفر لمسافات طويلة.",
      },
      {
        id: "van",
        name: "سيارات فان",
        description: "مثالية للمجموعات، رحلات العمرة والتنقل بين المدن.",
      },
      {
        id: "accessible-van",
        name: "فان لذوي الاحتياجات",
        description: "مصممة خصيصاً لنقل مريح وآمن لمستخدمي الكراسي المتحركة.",
      },
      {
        id: "mini-bus",
        name: "حافلات صغيرة",
        description: "حافلات مريحة مخصصة للمجموعات الكبيرة والرحلات المنظمة.",
      },
    ],

    bookTripHeading: "احجز رحلتك مع نكسورا – نقل آمن ومريح في أي وقت.",
    bookTripSubtitle: "نقدم خدمات نقل فاخرة للزوار والمعتمرين بين مكة المكرمة والمدينة المنورة وجدة والطائف وجميع المدن.",
    bookTripBtn: "طلب توصيلة",

    whyChooseTag: "خدمات نقل راقية ومميزة",
    whyChooseHeading: "لماذا تختار نكسورا للنقل؟",
    whyChooseFeatures: [
      {
        id: "modern-vehicles",
        title: "أسطول واسع من أحدث المركبات",
        description: "نوفر تشكيلة من أحدث سيارات السيدان والدفع الرباعي والفانات والحافلات لتلبية كافة احتياجاتك.",
      },
      {
        id: "safe-reliable",
        title: "نقل آمن وموثوق بأعلى المعايير",
        description: "سائقون محترفون ومركبات مجهزة تضمن لك تجربة سفر سلسة وآمنة ومريحة تماماً.",
      },
      {
        id: "availability",
        title: "خدمة متواصلة على مدار الساعة 24/7",
        description: "نعمل على مدار 24 ساعة لاستقبال المطار والجولات الميدانية والرحلات وتلبية كافة الطلبات.",
      },
    ],

    testimonialsTag: "ماذا يقول عملاؤنا الكرام عن نكسورا",
    testimonialsHeadingLine1: "محل ثقة",
    testimonialsHeadingLine2: "آلاف المسافرين",
    testimonialsHeadingLine3: "والمعتمرين في",
    testimonialsHeadingLine4: "كل عام.",
    testimonialsAvgRating: "متوسط التقييم: 4.9 / 5.0",
    testimonialsRatingSub: "بناءً على تقييمات وتجارب حقيقية من الحجاج والمعتمرين.",
    testimonialsList: [
      {
        name: "محمد يوسف",
        review: "قدمت لنا نكسورا جولة مزارات رائعة مع سائق خلوق ومحترف. نوصي بهم بشدة لكل زائر ومعتمر.",
      },
      {
        name: "سمير خالد",
        review: "خدمة نقل موثوقة واستجابة سريعة جداً. الحجز كان في غاية السهولة والرحلة للمدينة المنورة مريحة جداً.",
      },
    ],
    bannerStatementTag: "محل ثقة آلاف الحجاج والمعتمرين والزوار سنوياً",
    bannerStatementText: "نعتز بخدمة ضيوف الرحمن عبر مكة المكرمة والمدينة المنورة وجدة والطائف بنقل آمن وفاخر.",

    transportBannerHeading: "استمتع بنقل آمن ومريح في أي وقت نخدم مكة المكرمة • المدينة المنورة • جدة • الطائف",
    transportBannerBtn: "احجز الآن",

    footerDesc: "تقدم شركة نكسورا خدمات نقل آمنة ومريحة وموثوقة للزوار والمعتمرين في مكة المكرمة والمدينة المنورة وجدة والطائف، بما في ذلك جولات سياحية لأهم المعالم التاريخية والدينية.",
    footerSiteMap: "خريطة الموقع",
    footerCapacityGuide: "دليل سعة المركبات",
    cap1to10: "1-10 ركاب",
    cap1to4: "1-4 ركاب",
    cap1to7: "1-7 ركاب",
    cap20to22: "20-22 راكب",
    footerContactUs: "اتصل بنا",
    footerNewsletterSub: "للحصول على آخر العروض والتحديثات اشترك هنا",
    footerEmailPlaceholder: "أدخل بريدك الإلكتروني",
    footerSubscribeBtn: "اشترك الآن",
    footerSubscribedBtn: "تم الاشتراك بنجاح!",
    footerCopyright: "جميع الحقوق محفوظة © 2026 نكسورا | تصميم وتطوير إنجاز ميديا",
  },
};
