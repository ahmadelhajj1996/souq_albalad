import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useTab } from "../../hooks/useTab";
import { useModal } from "../../hooks/useModal";
import { modalActions } from "../../constants/general";
import Container from "../../components/layout/Container";
import Button from "../../components/layout/Button";
import Tabs from "../../components/navigation/Tabs";
import Delete from "../../components/feedback/Delete";
import { DetailItem } from "../../components/addetails/Details";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/helpers";
import { ImageGallery } from "../../components/addetails/Imagegallery";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const url = `products?id=${id}`;

  const { data: product, isFetched } = useGet(["products", id], url, {
    staleTime: Infinity,
    select: (data) => data.products[0],
  });

  const normalizedProduct = useMemo(() => {
    if (!product) return null;

    return {
      category: product?.category?.name,
      subcategory: product?.subCategory?.name,
      product: product?.product,
      details: product?.details,
      reviews: product?.reviews,
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
    };
  }, [product]);

  const handlePublisherClick = () => {
    if (normalizedProduct?.product?.added_by) {
      navigate(`/sellers/${normalizedProduct.product.added_by}`);
    }
  };

  const renderProductTab = () => {
    return (
      <div className="flex flex-col gap-y-6 ms-2 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailItem
            label="product id"
            value={normalizedProduct?.product?.id}
          />
          <DetailItem
            label="Publisher"
            value={normalizedProduct?.product?.added_by}
            className="text-blue-500 underline underline-offset-8 cursor-pointer"
            onClick={handlePublisherClick}
          />
          <DetailItem label="Category" value={normalizedProduct?.category} />
          <DetailItem
            label="Sub category"
            value={normalizedProduct?.subcategory}
          />
        </div>
        <DetailItem label="title" value={normalizedProduct?.product?.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailItem label="price" value={normalizedProduct?.product?.price} />
        </div>
        <DetailItem
          label="description"
          value={normalizedProduct?.product?.description}
          className="whitespace-pre-line"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            label="publish date"
            value={
              normalizedProduct?.product?.created_at
                ? formatDate(new Date(normalizedProduct.product.created_at))
                : "N/A"
            }
          />
          <DetailItem
            label="last update"
            value={
              normalizedProduct?.product?.updated_at
                ? formatDate(new Date(normalizedProduct.product.updated_at))
                : "N/A"
            }
          />
        </div>
      </div>
    );
  };

  const renderDetailsTab = () => {
    if (!normalizedProduct?.details) {
      return <div className="p-4 text-gray-500">No details available</div>;
    }

    const excludedKeys = ["created_at", "updated_at", "product_id"];
    const filteredDetails = Object.entries(normalizedProduct.details).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (filteredDetails.length === 0) {
      return (
        <div className="p-4 text-gray-500">No relevant details available</div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredDetails.map(([key, value]) => (
          <DetailItem
            key={key}
            label={key}
            value={value}
            className="border-b pb-2"
          />
        ))}
      </div>
    );
  };

  const renderImagesTab = () => {
    return <ImageGallery images={normalizedProduct?.images} productId={id} />;
  };

  const renderReviewsTab = () => {
    if (!normalizedProduct?.reviews?.length) {
      return <div>No reviews available</div>;
    }

    return (
      <div className="space-y-4 p-4">
        {normalizedProduct.reviews.map((review, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{review.user}</h3>
              <span className="text-sm text-gray-500">
                {formatDate(new Date(review.date))}
              </span>
            </div>
            <p className="mt-2">{review.comment}</p>
            <div className="mt-1">Rating: {review.rating}/5</div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    {
      label: t("product"),
      content: renderProductTab(),
    },
    {
      label: t("details"),
      content: renderDetailsTab(),
    },
    {
      label: t("images"),
      content: renderImagesTab(),
    },
    {
      label: t("reviews"),
      content: renderReviewsTab(),
    },
  ];

  const { activeTab, handleTabChange } = useTab(tabs, `/product-details/${id}`);

  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();
  const handleFreeze = () => {
    console.log("freezed" , normalizedProduct?.product?.id);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  const handleDelete = () => {
    console.log("deleted", normalizedProduct?.product?.id);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };
  if (!isFetched) return null;

  return (
    <>
      <Container
        additionalHeaderContent={
          <>
            <Button
              className="w-[125px]"
              onClick={() => openFreezeModal(normalizedProduct)}
            >
              Freeze
            </Button>
            <Button
              className="w-[125px]"
              onClick={() => userDel(normalizedProduct)}
            >
              Delete
            </Button>
          </>
        }
      >
        <Tabs
          tabs={tabs}
          tabListClassName="w-[60%] -mt-3"
          tabListWidth="1000px"
          tabPanelWidth="calc(100% - 200px)"
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </Container>

      <Delete
        isOpen={userState.isModalOpen && userState.mode === "freeze"}
        onClose={closeUserModals}
        onConfirm={() => handleFreeze(normalizedProduct)}
        action="Freeze"
        itemName={`freeze the ad : ${normalizedProduct?.product?.title}`}
      />

      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={() => handleDelete(normalizedProduct)}
        action="Delete"
        itemName={`delete the ad : ${normalizedProduct?.product?.title}`}
      />
    </>
  );
}

export default ProductDetails;
