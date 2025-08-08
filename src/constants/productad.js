
const productAdsData = [
  // Cars (5 items)
  {
    id: 1,
    category_id: 3,
    sub_category_id: "7",
    title: "مرسيدس C 200 موديل 2020",
    description:
      "سيارة مرسيدس C 200 بحالة ممتازة، خالية من الحوادث، صيانة دورية في الوكالة.",
    price: 85000,
    price_type: "ثابت",
    state: "مستعمل",
    governorate: "دمشق",
    address_details: "المزة، مقابل جامع الرحمن",
    phone_number: "0912345678",
    email: "seller1@example.com",
    added_by: 32,
    created_at: "2025-07-10T08:15:22.000000Z",
    updated_at: "2025-07-10T08:15:22.000000Z",
    images: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      type: "مرسيدس",
      brand: "Mercedes",
      model: "C 200",
      year: "2020",
      kilometers: "45000 كم",
      fuel_type: "بنزين",
      dipstick: "أوتوماتيك",
      engine_capacity: "2 لتر",
      num_of_doors: "4 ابواب",
      topology_status: "خالي من الحوادث",
      color: "فضي",
    },
  },
  {
    id: 2,
    category_id: 3,
    sub_category_id: "7",
    title: "هيونداي اكسنت 2018",
    description:
      "هيونداي اكسنت موديل 2018، فحص كامل، تكييف بارد جدا، مكفولة لمدة سنة.",
    price: 35000,
    price_type: "قابل للتفاوض",
    state: "مستعمل",
    governorate: "حلب",
    address_details: "شارع الجمهورية",
    phone_number: "0934567890",
    email: "seller2@example.com",
    added_by: 45,
    created_at: "2025-07-11T10:20:33.000000Z",
    updated_at: "2025-07-11T10:20:33.000000Z",
    images: [],
    details: {
      type: "هيونداي",
      brand: "Hyundai",
      model: "Accent",
      year: "2018",
      kilometers: "80000 كم",
      fuel_type: "بنزين",
      dipstick: "عادي",
      engine_capacity: "1.6 لتر",
      num_of_doors: "4 ابواب",
      topology_status: "خالي من الحوادث",
      color: "أبيض",
    },
  },
  // Motorcycles
  {
    id: 6,
    category_id: 3,
    sub_category_id: "8",
    title: "ياماها YZF-R1 موديل 2021",
    description:
      "ياماها R1 موديل 2021، بحالة الوكالة، مسجلة رسمي، كامل المواصفات.",
    price: 25000,
    price_type: "ثابت",
    state: "مستعمل",
    governorate: "حمص",
    address_details: "حي الاندلس",
    phone_number: "0945678901",
    email: "seller6@example.com",
    added_by: 78,
    created_at: "2025-07-12T14:30:45.000000Z",
    updated_at: "2025-07-12T14:30:45.000000Z",
    images: [],
    details: {
      type: "سبورت",
      brand: "ياماها",
      model: "YZF-R1",
      year: "2021",
      kilometers: "12000 كم",
      fuel_type: "بنزين",
      color: "أزرق",
      engine_capacity: "1000 سي سي",
    },
  },
  {
    id: 7,
    category_id: 3,
    sub_category_id: "8",
    title: "هوندا CBR 600",
    description:
      "هوندا CBR 600 موديل 2015، بحالة جيدة جدا، إطارات جديدة، لا تحتاج أي صيانة.",
    price: 18000,
    price_type: "قابل للتفاوض",
    state: "مستعمل",
    governorate: "اللاذقية",
    address_details: "شارع 8 آذار",
    phone_number: "0956789012",
    email: "seller7@example.com",
    added_by: 89,
    created_at: "2025-07-13T16:40:56.000000Z",
    updated_at: "2025-07-13T16:40:56.000000Z",
    images: [],
    details: {
      type: "سبورت",
      brand: "هوندا",
      model: "CBR 600",
      year: "2015",
      kilometers: "25000 كم",
      fuel_type: "بنزين",
      color: "أحمر",
      engine_capacity: "600 سي سي",
    },
  },
  // Bicycles
  {
    id: 11,
    category_id: 3,
    sub_category_id: "9",
    title: "دراجة هوائية كهربائية سريعة",
    description:
      "دراجة هوائية كهربائية بمواصفات عالية، سرعة تصل إلى 45 كم/ساعة، بطارية تدوم 50 كم.",
    price: 1200,
    price_type: "ثابت",
    state: "جديد",
    governorate: "دمشق",
    address_details: "الميدان",
    phone_number: "0967890123",
    email: "seller11@example.com",
    added_by: 101,
    created_at: "2025-07-14T09:15:22.000000Z",
    updated_at: "2025-07-14T09:15:22.000000Z",
    images: [],
    details: {
      type: "كهربائي",
      brand: "Giant",
      model: "Escape E+",
      size: "26",
      color: "أسود",
    },
  },
  {
    id: 12,
    category_id: 3,
    sub_category_id: "9",
    title: "دراجة جبلية كانونديل",
    description:
      "دراجة جبلية ماركة كانونديل، إطارات جديدة، فرامل قرصية، مناسبة لجميع التضاريس.",
    price: 800,
    price_type: "قابل للتفاوض",
    state: "مستعمل",
    governorate: "طرطوس",
    address_details: "شارع الكورنيش",
    phone_number: "0978901234",
    email: "seller12@example.com",
    added_by: 112,
    created_at: "2025-07-15T11:25:33.000000Z",
    updated_at: "2025-07-15T11:25:33.000000Z",
    images: [],
    details: {
      type: "جبلية",
      brand: "Cannondale",
      model: "Trail 5",
      size: "28",
      color: "أخضر",
    },
  },
  // Tires & Suppliers
  {
    id: 16,
    category_id: 3,
    sub_category_id: "10",
    title: "إطارات ميشلان جديدة مقاس 16",
    description:
      "4 إطارات ميشلان جديدة مقاس 205/55 R16، ضمان سنتين، سعر القطعة.",
    price: 120,
    price_type: "ثابت",
    state: "جديد",
    governorate: "حماة",
    address_details: "شارع العاصي",
    phone_number: "0989012345",
    email: "seller16@example.com",
    added_by: 131,
    created_at: "2025-07-16T13:35:44.000000Z",
    updated_at: "2025-07-16T13:35:44.000000Z",
    images: [],
    details: {
      type: "إطارات سيارات",
      size: "205/55 R16",
    },
  },
  {
    id: 17,
    category_id: 3,
    sub_category_id: "10",
    title: "زيت محرك موبيل 1 سوبر 5W-30",
    description: "زيت محرك موبيل 1 سوبر 5W-30، صناعة ألمانيا، علبة 4 لتر.",
    price: 75,
    price_type: "ثابت",
    state: "جديد",
    governorate: "درعا",
    address_details: "حي الأطباء",
    phone_number: "0990123456",
    email: "seller17@example.com",
    added_by: 142,
    created_at: "2025-07-17T15:45:55.000000Z",
    updated_at: "2025-07-17T15:45:55.000000Z",
    images: [],
    details: {
      type: "زيت محرك",
      brand: "Mobil",
    },
  },
];

// Pre-compute categories for better performance
const categoriesData = [
  {
    id: 1,
    name: "Animals",
    data: productAdsData.filter((e) => e.category_id === 1),
  },
  {
    id: 2,
    name: "Devices",
    data: productAdsData.filter((e) => e.category_id === 2),
  },
  {
    id: 3,
    name: "Vehicles",
    data: productAdsData.filter((e) => e.category_id === 3),
  },
  {
    id: 4,
    name: "RealEstate",
    data: productAdsData.filter((e) => e.category_id === 4),
  },
  {
    id: 5,
    name: "Entertainment",
    data: productAdsData.filter((e) => e.category_id === 5),
  },
  {
    id: 6,
    name: "miscellaneous",
    data: productAdsData.filter((e) => e.category_id === 6),
  },
  {
    id: 7,
    name: "Furniture and miscellaneous",
    data: productAdsData.filter((e) => e.category_id === 7),
  },
];

// Memoized exports
export const productAds = Object.freeze(productAdsData);
export const categories = Object.freeze(categoriesData);

// Memoized filter function
export const filterProducts = (id, subId) => {
  const categoryId = parseInt(id);
  const subCategoryId = parseInt(subId);

  return productAds.filter(
    (e) =>
      e.category_id === categoryId &&
      e.sub_category_id === subCategoryId.toString()
  );
};

export const getAd = (id) => {
  return productAds?.find((e) => e.id === parseInt(id));
};
