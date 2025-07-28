import Image from "../components/display/Image";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

export const categoryColumns = (editBtn = null, deleteBtn = null, navigate) => [
  {
    key: "id",
    title: "id",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: "Name",
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },
  {
    key: "sub_categories",
    title: "Number of Sub Categories",
    width: "300px",
    render: (item) => (
      <span className="font-semibold text-center ">
        {item?.sub_categories?.length || 0}
      </span>
    ),
  },
  {
    key: "image",
    title: "Image",
    width: "300px",
    render: (item) => (
      <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded">
        {item?.image ? (
          <Image
            src={item.image}
            className="w-full h-full object-cover rounded"
            alt="Category"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {/* Empty div as per your requirement */}
          </div>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => {
      return (
        <div className="flex gap-x-4">
          <button
            onClick={() => navigate(`/categories/${item?.id}`)}
            aria-label="View"
          >
            <FiEye className="w-5 h-5" />
          </button>

          {editBtn && (
            <button onClick={() => editBtn(item)} aria-label="Edit">
              <FiEdit className="w-5 h-5" />
            </button>
          )}
          {deleteBtn && (
            <button onClick={() => deleteBtn(item)} aria-label="Delete">
              <FiTrash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      );
    },
  },
];

export const subcategoryColumns = (editBtn = null, deleteBtn = null) => [
  {
    key: "id",
    title: "id",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: "Name",
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },
  {
    key: "products",
    title: "Number of products",
    width: "300px",
    render: (item) => (
      <span className="font-semibold text-center ">{item?.products || 0}</span>
    ),
  },
  {
    key: "image",
    title: "Image",
    width: "300px",
    render: (item) => (
      <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded">
        {item?.image ? (
          <Image
            src={item.image}
            className="w-full h-full object-cover rounded"
            alt="Category"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {/* Empty div as per your requirement */}
          </div>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => {
      return (
        <div className="flex gap-x-4">
          {/* <button
            onClick={() => navigate(`/categories/${item?.id}`)}
            aria-label="View"
          >
            <FiEye className="w-5 h-5" />
          </button> */}

          {editBtn && (
            <button onClick={() => editBtn(item)} aria-label="Edit">
              <FiEdit className="w-5 h-5" />
            </button>
          )}
          {deleteBtn && (
            <button onClick={() => deleteBtn(item)} aria-label="Delete">
              <FiTrash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      );
    },
  },
];


export const userColumns = (navigate, t) => [
  {
    key: "id",
    title: t("id"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: t("name"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },

  {
    key: "emai",
    title: t("email"),
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },
  {
    key: "phone",
    title: t("phone"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.phone}</span>,
  },

  {
    key: "status",
    title: t("status"),
    width: "175px",
    render: () => <span className="font-semibold">active/freezed</span>,
  },
  {
    key: "actions",
    title: t("actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/customers/${item.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const storeColumns = (navigate, t) => [
  {
    key: "id",
    title: t("id"),
    width: "50px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "store_name",
    title: t("name"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.store_name}</span>,
  },
  {
    key: "store_owner_name",
    title: t("owner"),
    width: "100px",

    render: (item) => (
      <span
        className="font-semibold cursor-pointer"
        onClick={() => navigate(`/sellers/${item?.id}`)}
      >
        {item?.store_owner_name}
      </span>
    ),
  },
  {
    key: "address",
    title: t("address"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.address}</span>,
  },
  {
    key: "is_featured",
    title: t("is_featured"),
    width: "75px",
    render: (item) => (
      <span className="font-semibold">
        {item?.is_featured == 0 ? "no" : "yes"}
      </span>
    ),
  },
  {
    key: "description",
    title: t("description"),
    width: "300px",
    render: (item) => (
      <span className="font-semibold">{item?.description}</span>
    ),
  },
  // {
  //   key: "actions",
  //   title: t("actions"),
  //   width: "300px",
  //   render: (item) => (
  //     <div className="flex gap-x-4">
  //       <button
  //         onClick={() => navigate(`/stores/${item.id}`)}
  //         aria-label="View"
  //       >
  //         <FiEye className="w-5 h-5" />
  //       </button>
  //     </div>
  //   ),
  // },
];

export const sellerColumns = (navigate, t) => [
  {
    key: "id",
    title: t("id"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: t("name"),
    width: "150px",

    render: (item) => (
      <span
        className="font-semibold cursor-pointer"
        onClick={() => navigate(`/customers/${item?.id}`)}
      >
        {item?.name}
      </span>
    ),
  },
  {
    key: "phone",
    title: t("phone"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.phone}</span>,
  },
  {
    key: "store_name",
    title: "Store Name",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.store_name}</span>,
  },

  {
    key: "address",
    title: t("address"),
    width: "300px",
    render: (item) => <span className="font-semibold">{item?.address}</span>,
  },

  {
    key: "status",
    title: t("status"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.status}</span>,
  },
  // {
  //   key: "created_at",
  //   title: t("created_at"),
  //   width: "175px",
  //   render: (item) => <span className="font-semibold">{item?.created_at}</span>,
  // },
  {
    key: "actions",
    title: t("actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/sellers/${item.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const warningColumns = (editBtn, deleteBtn) => [
  {
    key: "id",
    title: "Id",
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "reason",
    title: "Reason",
    width: "700px",
    render: (item) => <span className="font-semibold">{item?.reason}</span>,
  },
  {
    key: "expires_at",
    title: "Expire",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.expires_at}</span>,
  },

  {
    key: "level",
    title: "Level",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.severity}</span>,
  },

  {
    key: "actions",
    title: "Actions",
    render: (item) => (
      <div className="flex gap-x-4">
        {editBtn && (
          <button onClick={() => editBtn(item)} aria-label="Edit">
            <FiEdit className="w-5 h-5" />
          </button>
        )}

        {deleteBtn && (
          <button onClick={() => deleteBtn(item)} aria-label="Delete">
            <FiTrash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    ),
  },
];

export const reportColumns = (deleteBtn) => [
  {
    key: "id",
    title: "Id",
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "type",
    title: "Type",
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.type}</span>,
  },
  {
    key: "reporting_user",
    title: "Reporting User",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.reporting_user}</span>
    ),
  },
  {
    key: "date",
    title: "Date",
    width: "120px",
    render: (item) => <span className="font-semibold">{item?.date}</span>,
  },

  {
    key: "status",
    title: "Status",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.status}</span>,
  },

  {
    key: "priority",
    title: "Priority",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.priority}</span>,
  },

  {
    key: "actions",
    title: "Actions",
    width: "150px",
    render: (item) => (
      <div className="flex ">
        {deleteBtn && (
          <button onClick={() => deleteBtn(item)} aria-label="Delete">
            <FiTrash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    ),
  },
];


// ****************************************************************************************************************************** // 
//  the product ads columns

export const productColumns = (navigate) => [
  {
    key: "id",
    title: "Id",
    width: "50px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: "Name",
    width: "125px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },
  {
    key: "sub_categories",
    title: "Sub Categories",
    width: "100px",
    render: (item) => (
      <span className="font-semibold ms-[40px]">
        {item?.sub_categories || 0}
      </span>
    ),
  },
  {
    key: "products",
    title: "Products",
    width: "100px",
    render: (item) => (
      <span className="font-semibold ms-[40px]">{item?.products || 0}</span>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => {
      return (
        <div className="flex gap-x-4">
          <button
            onClick={() => navigate(`/product-ads/${item?.id}`)}
            aria-label="View"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
];


export const productadColumns = (navigate) => [
   {
      key: "id",
      title: "ID",
      width: "100px",
      render: (item) => (
        <span className="font-semibold">{item?.id}</span>
      ),
    },
    {
      key: "title",
      title: "Title",
      width: "225px",
      render: (item) => (
        <span className="font-semibold">{item?.title}</span>
      ),
    },
    {
      key: "price",
      title: "Price && type",
      width: "175px",
      render: (item) => (
        <span className="font-semibold">
          {item?.price}{" "}
          {item?.price_type === "ثابت" ? "" : "(قابل للتفاوض	)"}
        </span>
      ),
    },
    {
      key: "final_price",
      title: "final_price",
      width: "150px",
      render: (item) => (
        <span className="font-semibold">{item?.final_price} </span>
      ),
    },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => {
      return (
        <div className="flex gap-x-4">
          <button
            onClick={() => navigate(`/product-details/${item?.id}`)}
            aria-label="View"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
];

export const jobadColumns = (navigate) => [
  {
    key: "id",
    title: "ID",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: "Title",
    width: "250px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "phone_number",
    title: "phone number",
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
  {
    key: "email",
    title: "Email",
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.email}</span>
    ),
  },

  {
    key: "job_type",
    title: "Job Type",
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.job_type}</span>,
  },
  {
    key: "governorate",
    title: "Governorate",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.governorate}</span>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/job-ads/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const seekingadColumns = (navigate) => [
  {
    key: "id",
    title: "ID",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: "Title",
    width: "250px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "phone_number",
    title: "phone number",
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
  {
    key: "email",
    title: "Email",
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },

  {
    key: "job_type",
    title: "Job Type",
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.job_type}</span>,
  },
  {
    key: "governorate",
    title: "Governorate",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.governorate}</span>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/job-seeking/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];


export const serviceColumns = (navigate) => [
  {
    key: "id",
    title: "ID",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: "Title",
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "phone_number",
    title: "phone",
    width: "175px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
  {
    key: "email",
    title: "Email",
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },

  {
    key: "days_hours",
    title: "days_hours",
    width: "175px",
    render: (item) => (
      <span className="font-semibold ms-[40px]">{item?.days_hours}</span>
    ),
  },
  {
    key: "price",
    title: "price",
    width: "175px",
    render: (item) => (
      <span className="font-semibold ">{item?.price}</span>
    ),
  },
  {
    key: "location",
    title: "Governorate",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.location}</span>,
  },
  {
    key: "actions",
    title: "Actions",
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/services-ads/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];


export const offerColumns = (navigate) => [
  {
    key: "id",
    title: "ID",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "offer_item",
    title: "Ad",
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.offer_item?.title}</span>
    ),
  },

  {
    key: "type",
    title: "type",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.type}</span>,
  },
  {
    key: "discount",
    title: "discount",
    width: "125px",
    render: (item) => (
      <span className="font-semibold ms-[30px]">{item?.discount}</span>
    ),
  },
  {
    key: "offer_on",
    title: "Ad Type",
    width: "125px",
    render: (item) => <span className="font-semibold">{item?.offer_on}</span>,
  },

  {
    key: "price",
    title: "price",
    width: "125px",
    render: (item) => (
      <span className="font-semibold">{item?.offer_item?.price}</span>
    ),
  },

  {
    key: "final_price",
    title: "Final Price",
    width: "125px",
    render: (item) => (
      <span className="font-semibold">{item?.offer_item?.final_price}</span>
    ),
  },

  {
    key: "actions",
    title: "Actions",
    width: "200px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/offers/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];





export const subCategoryColumns = {
  // Cars (sub_category_id: "7")
  7: [
    {
      key: "brand_model",
      title: "Brand/Model",
      width: "150px",
      render: (item) => (
        <span className="font-semibold">
          {item?.details?.brand} {item?.details?.model}
        </span>
      ),
    },
    {
      key: "year",
      title: "Year",
      width: "80px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.year}</span>
      ),
    },
    {
      key: "kilometers",
      title: "Kilometers",
      width: "100px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.kilometers}</span>
      ),
    },
    {
      key: "fuel_type",
      title: "Fuel Type",
      width: "100px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.fuel_type}</span>
      ),
    },
  ],
  // Motorcycles (sub_category_id: "8")
  8: [
    {
      key: "brand_model",
      title: "Brand/Model",
      width: "150px",
      render: (item) => (
        <span className="font-semibold">
          {item?.details?.brand} {item?.details?.model}
        </span>
      ),
    },
    {
      key: "year",
      title: "Year",
      width: "80px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.year}</span>
      ),
    },
    {
      key: "engine_capacity",
      title: "Engine CC",
      width: "100px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.engine_capacity}</span>
      ),
    },
  ],
  // Bicycles (sub_category_id: "9")
  9: [
    {
      key: "brand_model",
      title: "Brand/Model",
      width: "150px",
      render: (item) => (
        <span className="font-semibold">
          {item?.details?.brand} {item?.details?.model}
        </span>
      ),
    },
    {
      key: "type",
      title: "Type",
      width: "100px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.type}</span>
      ),
    },
    {
      key: "size",
      title: "Size",
      width: "80px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.size}</span>
      ),
    },
  ],
  // Tires & Suppliers (sub_category_id: "10")
  10: [
    {
      key: "type",
      title: "Product Type",
      width: "150px",
      render: (item) => (
        <span className="font-semibold">{item?.details?.type}</span>
      ),
    },
    {
      key: "specs",
      title: "Specifications",
      width: "150px",
      render: (item) => (
        <span className="font-semibold">
          {item?.details?.size || item?.details?.brand}
        </span>
      ),
    },
  ],
};
 

 






















































export const commonVacancyAdColumns = [
  {
    key: "id",
    title: "ID",
    width: "50px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "job_title",
    title: "Job Title",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.job_title}</span>,
  },
  {
    key: "job_type",
    title: "Employment Type",
    width: "120px",
    render: (item) => (
      <span className="font-semibold capitalize">
        {item?.job_type?.replace("_", " ")}
      </span>
    ),
  },
  {
    key: "location",
    title: "Location",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">
        {[item?.governorate, item?.location].filter(Boolean).join("  -  ")}
      </span>
    ),
  },
  {
    key: "salary",
    title: "Salary",
    width: "120px",
    render: (item) => <span className="font-semibold">{item?.salary}</span>,
  },
  {
    key: "start_date",
    title: "Start Date",
    width: "120px",
    render: (item) => <span className="font-semibold">{item?.start_date}</span>,
  },
];

export const VacancyActionColumn = {
  key: "actions",
  title: "Actions",
  width: "150px",
  render: (item, navigate) => (
    <div className="flex gap-x-4">
      <button
        onClick={() => navigate(`/vacancy-ads/${item.id}`)}
        aria-label="View details"
        className=""
      >
        <FiEye className="w-5 h-5" />
      </button>
    </div>
  ),
};

export const getVacancyAdColumns = (navigate) => {
  const columns = [...commonVacancyAdColumns];

  // // Add job type specific columns if provided and they exist
  // if (jobType && jobTypeSpecificColumns[jobType]) {
  //   columns.push(...jobTypeSpecificColumns[jobType]);
  // }

  // Add action column
  columns.push({
    ...VacancyActionColumn,
    render: (item) => VacancyActionColumn.render(item, navigate),
  });

  return columns;
};

// Default export for convenience
export const vacancyAdColumns = (navigate) => getVacancyAdColumns(navigate);

// Seeking (Job Seeker Ads)

// Common columns shared by all job seeker ads
export const commonSeekingAdColumns = [
  {
    key: "id",
    title: "ID",
    width: "50px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "job_title",
    title: "Desired Position",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.job_title}</span>,
  },
  {
    key: "job_type",
    title: "Employment Type",
    width: "120px",
    render: (item) => (
      <span className="font-semibold capitalize">
        {item?.job_type?.replace("_", " ")}
      </span>
    ),
  },
  {
    key: "location",
    title: "Location",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">
        {[item?.governorate, item?.location].filter(Boolean).join(" - ")}
      </span>
    ),
  },
  {
    key: "experience",
    title: "Experience",
    width: "120px",
    render: (item) => <span className="font-semibold">{item?.experience}</span>,
  },
  {
    key: "education",
    title: "Education",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.education}</span>,
  },
];

export const SeekingActionColumn = {
  key: "actions",
  title: "Actions",
  width: "150px",
  render: (item, navigate) => (
    <div className="flex gap-x-4">
      <button
        onClick={() => navigate(`/seeking-ads/${item.id}`)}
        aria-label="View details"
      >
        <FiEye className="w-5 h-5" />
      </button>
    </div>
  ),
};

// Optional: Additional columns that can be conditionally added
export const seekingAdditionalColumns = {
  skills: {
    key: "skills",
    title: "Skills",
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.skills}</span>,
  },
  work_hours: {
    key: "work_hours",
    title: "Preferred Hours",
    width: "120px",
    render: (item) => <span className="font-semibold">{item?.work_hours}</span>,
  },
};

export const getSeekingAdColumns = (
  navigate,
  includeAdditionalColumns = false
) => {
  const columns = [...commonSeekingAdColumns];

  // Add additional columns if needed
  if (includeAdditionalColumns) {
    columns.push(
      seekingAdditionalColumns.skills,
      seekingAdditionalColumns.work_hours
    );
  }

  // Add action column
  columns.push({
    ...SeekingActionColumn,
    render: (item) => SeekingActionColumn.render(item, navigate),
  });

  return columns;
};

// Default export for convenience
export const seekingAdColumns = (navigate, includeAdditionalColumns = false) =>
  getSeekingAdColumns(navigate, includeAdditionalColumns);

// Service Ads Columns Configuration

// Common columns shared by all service ads
export const commonServiceAdColumns = [
  {
    key: "id",
    title: "ID",
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: "Service Title",
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "type",
    title: "Service Type",
    width: "150px",
    render: (item) => (
      <span className="font-semibold capitalize">
        {item?.type?.replace(/_/g, " ")}
      </span>
    ),
  },
  {
    key: "location",
    title: "Location",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">
        {[item?.governorate, item?.location].filter(Boolean).join(" - ")}
      </span>
    ),
  },
  {
    key: "price",
    title: "Price",
    width: "120px",
    render: (item) => (
      <span className="font-semibold">{item?.price || "Negotiable"}</span>
    ),
  },
];

export const ServiceActionColumn = {
  key: "actions",
  title: "Actions",
  width: "150px",
  render: (item, navigate) => (
    <div className="flex gap-x-4">
      <button
        onClick={() => navigate(`/service-ads/${item.id}`)}
        aria-label="View details"
      >
        <FiEye className="w-5 h-5" />
      </button>
    </div>
  ),
};

// Optional: Additional columns that can be conditionally added
export const serviceAdditionalColumns = {
  days_hours: {
    key: "days_hours",
    title: "Availability",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.days_hours}</span>,
  },
  contact: {
    key: "contact",
    title: "Contact",
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
};

export const getServiceAdColumns = (
  navigate,
  includeAdditionalColumns = false
) => {
  const columns = [...commonServiceAdColumns];

  // Add additional columns if needed
  if (includeAdditionalColumns) {
    columns.push(
      serviceAdditionalColumns.days_hours,
      serviceAdditionalColumns.contact
    );
  }

  // Add action column
  columns.push({
    ...ServiceActionColumn,
    render: (item) => ServiceActionColumn.render(item, navigate),
  });

  return columns;
};

// Default export for convenience
export const serviceAdColumns = (navigate, includeAdditionalColumns = false) =>
  getServiceAdColumns(navigate, includeAdditionalColumns);
