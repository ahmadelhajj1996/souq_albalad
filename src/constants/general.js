
export const languages = [
  { name: "english", code: "en" },
  { name: "arabic", code: "ar" },
]


 
export const navItems = [
  { to: "/", label: "home" },
  { to: "/customers", label: "Customers" },
  { to: "/stores", label: "Stores" },
  { to: "/sellers", label: "Sellers" },
  { to: "/product-ads", label: "Ads" },
  { to: "/categories", label: "Categories" },
  { to: "/settings", label: "settings" },
];

export const subNavItems = [
  { to: "/product-ads", label: "Products" },
  { to: "/job-ads", label: "Job Vacancies" },
  { to: "/job-seeking", label: "Job Seeking" },
  { to: "/services-ads", label: "Services" },
  { to: "/offers", label: "Offers" },
];

export const modalActions = {
  OPEN_VIEW : "OPEN_VIEW",
  OPEN_ADD: "OPEN_ADD",
  OPEN_FREEZE: "OPEN_FREEZE",
  OPEN_EDIT: "OPEN_EDIT",
  OPEN_DELETE: "OPEN_DELETE",
  CLOSE_ALL: "CLOSE_ALL",
};

  export const modalReducer = (state, action) => {
    switch (action.type) {
      case modalActions.OPEN_VIEW:
        return {
          isModalOpen: true,
          isDeleteOpen: false,
          selectedItem: action.payload,
          mode: "view",
        };

      case modalActions.OPEN_ADD:
        return {
          isModalOpen: true,
          isDeleteOpen: false,
          selectedItem: null,
          mode: "add",
        };
      case modalActions.OPEN_FREEZE:
        return {
          isModalOpen: true,
          isDeleteOpen: false,
          selectedItem: action.payload,
          mode: "freeze",
        };
      case modalActions.OPEN_EDIT:
        return {
          isModalOpen: true,
          isDeleteOpen: false,
          selectedItem: action.payload,
          mode: "edit",
        };
      case modalActions.OPEN_DELETE:
        return {
          isModalOpen: false,
          isDeleteOpen: true,
          selectedItem: action.payload,
          mode: null,
        };
      case modalActions.CLOSE_ALL:
        return {
          isModalOpen: false,
          isDeleteOpen: false,
          selectedItem: null,
          mode: null,
        };
      default:
        return state;
    }
  };


// data 
  



export const categories = [
  // Parent categories
  {
    id: 1,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: null,
  },
  {
    id: 2,
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: null,
  },
  {
    id: 3,
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: null,
  },

  // Subcategories for Electronics (id:1)
  {
    id: 11,
    name: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 1,
  },
  {
    id: 12,
    name: "Laptops",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 1,
  },
  {
    id: 13,
    name: "TVs",
    image:
      "https://images.unsplash.com/photo-1467296587692-908382c6feb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 11,
  },

  // Subcategories for Clothing (id:2)
  {
    id: 21,
    name: "Men's Clothing",
    image:
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 2,
  },
  {
    id: 22,
    name: "Women's Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 2,
  },

  // Subcategories for Home & Garden (id:3)
  {
    id: 31,
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 3,
  },
  {
    id: 32,
    name: "Garden Tools",
    image:
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: 3,
  },

  // Other parent categories
  {
    id: 4,
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: null,
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    parent_id: null,
  },
];