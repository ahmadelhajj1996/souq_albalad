import { useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet, usePost, usePatch, useDelete } from "../../hooks/useApi";
import { useTab } from "../../hooks/useTab";
import { useModal } from "../../hooks/useModal";
import Table from "../../components/display/Table";
import { currencyColumns } from "../../constants/Columns";
import Container from "../../components/layout/Container";
import Button from "../../components/layout/Button";
import Tabs from "../../components/navigation/Tabs";
import Delete from "../../components/feedback/Delete";
import { DetailItem } from "../../components/addetails/Details";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/helpers";
import { ImageGallery } from "../../components/addetails/Imagegallery";
import useToastr from "../../hooks/useToastr";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toastr } = useToastr();
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
      costs: product?.costs,
      mainCurrency: product?.costs[0]?.from_currency,
      images: [
        "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      ],
    };
  }, [product]);

  const handlePublisherClick = useCallback(() => {
    if (normalizedProduct?.product?.added_by) {
      navigate(`/sellers/${normalizedProduct.product.added_by}`);
    }
  }, [normalizedProduct?.product?.added_by, navigate]);

  const renderProductTab = useCallback(() => {
    if (!normalizedProduct) return null;

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
        <div className="grid grid-cols-2">
          <DetailItem label="title" value={normalizedProduct?.product?.title} />
          <DetailItem
            label="status"
            value={
              normalizedProduct?.product?.is_active === 1
                ? "Active"
                : "Inactive"
            }
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailItem
            label="price"
            value={`${normalizedProduct?.product?.price} ${normalizedProduct?.mainCurrency}`}
          />
          <DetailItem
            label="main currency"
            value={normalizedProduct?.mainCurrency}
          />
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
        <Table
          columns={currencyColumns()}
          data={normalizedProduct?.costs}
          pageSize={8}
          pagination={true}
        />
      </div>
    );
  }, [normalizedProduct, handlePublisherClick]);

  const renderDetailsTab = useCallback(() => {
    if (!normalizedProduct?.details) {
      return (
        <div className="p-4 text-gray-500">{t("no_details_available")}</div>
      );
    }

    const excludedKeys = ["created_at", "updated_at", "product_id"];
    const filteredDetails = Object.entries(normalizedProduct.details).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (filteredDetails.length === 0) {
      return (
        <div className="p-4 text-gray-500">{t("no_relevant_details")}</div>
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
  }, [normalizedProduct?.details, t]);

  const renderImagesTab = useCallback(() => {
    return <ImageGallery images={normalizedProduct?.images} productId={id} />;
  }, [normalizedProduct?.images, id]);

  const renderReviewsTab = useCallback(() => {
    if (!normalizedProduct?.reviews?.length) {
      return <div>{t("no_reviews_available")}</div>;
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
  }, [normalizedProduct?.reviews, t]);

  const tabs = useMemo(
    () => [
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
    ],
    [t, renderProductTab, renderDetailsTab, renderImagesTab, renderReviewsTab]
  );

  const { activeTab, handleTabChange } = useTab(tabs, `/product-details/${id}`);

  const { modalState, openFreezeModal, openDeleteModal, closeAllModals } =
    useModal();

    const patchUserStatus = usePost({
      invalidateQueries: ["products"],
      updateQuery: ["product", 20],
      onSuccess: () => {
        toastr(t("status_updated_successfully"), "success");
        closeAllModals();
      },
      onError: (error) => {
        toastr(error.message, "error");
      },
    });

    const handleFreeze = useCallback(() => {
      if (!normalizedProduct?.product?.id) return;

      patchUserStatus.mutate(
        {
          url: `admin/products/toggleActivation`,
          data: {
            product_id: normalizedProduct?.product?.id,
          },
        },
        {
          onSettled: closeAllModals,
        }
      );
    }, [normalizedProduct?.product?.id, patchUserStatus, closeAllModals]);

  const deleteProduct = useDelete({
    invalidateQueries: ["products"],
    onSuccess: () => {
      toastr(t("deleted_successfully"), "success");
      closeAllModals();
      navigate(-1);
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  const handleDelete = useCallback(() => {
    if (!normalizedProduct?.product?.id) return;

    deleteProduct.mutate(
      {
        url: `admin/products/delete?product_id=${normalizedProduct.product.id}`,
      },
      {
        onSettled: closeAllModals,
      }
    );
  }, [normalizedProduct?.product?.id, deleteProduct, closeAllModals]);

  const patchMutation = usePatch({
    invalidateQueries: ["products"],
    onSuccess: () => {
      toastr(t("product_featured_status_updated"), "success");
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  const handleMarkFeatured = useCallback(() => {
    if (!normalizedProduct?.product?.id) return;

    patchMutation.mutate({
      url: `/admin/products/${normalizedProduct.product.id}/feature`,
      data: {},
    });
  }, [normalizedProduct?.product?.id, patchMutation]);

  if (!isFetched) return null;

  return (
    <>
      <Container
        additionalHeaderContent={
          <div className="flex gap-2">
            <Button className="w-[200px]" onClick={handleMarkFeatured}>
              {t("mark_as_featured")}
            </Button>

            <Button
              className="w-[125px]"
              onClick={() => openFreezeModal(normalizedProduct)}
            >
              {normalizedProduct?.product?.is_active
                ? t("freeze")
                : t("unfreeze")}
            </Button>
            <Button
              className="w-[125px]"
              variant="danger"
              onClick={() => openDeleteModal(normalizedProduct)}
            >
              {t("delete")}
            </Button>
          </div>
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
        isOpen={modalState.isModalOpen && modalState.mode === "freeze"}
        onClose={closeAllModals}
        onConfirm={handleFreeze}
        action={
          normalizedProduct?.product?.is_active ? t("freeze") : t("unfreeze")
        }
        itemName={`${
          normalizedProduct?.product?.is_active
            ? t("freeze_the_product")
            : t("unfreeze_the_product")
        } "${normalizedProduct?.product?.title}"`}
        isLoading={patchUserStatus.isLoading}
      />

      <Delete
        isOpen={modalState.isDeleteOpen}
        onClose={closeAllModals}
        onConfirm={handleDelete}
        action={t("delete")}
        itemName={`${t("delete_the_ad")}: ${normalizedProduct?.product?.title}`}
        isLoading={deleteProduct.isLoading}
      />
    </>
  );
}

export default ProductDetails;
