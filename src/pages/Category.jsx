import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate , useParams } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import Table from "../components/display/Table";
import Button from "../components/layout/Button";
import Search from "../components/form/Search";
import Container from "../components/layout/Container";
import Modal from "../components/feedback/Modal";
import Delete from "../components/feedback/Delete";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import Fileupload from "../components/form/Fileupload";
import { store } from "../store/store";
import { useModal } from "../hooks/useModal";
import useOrder from "../hooks/useOrder";
import { addCategorySchema, editCategorySchema } from "../utils/validator";
import { subcategoryColumns } from "../constants/Columns";
import { modalActions } from "../constants/general";
import { useGet, useDelete, usePost, usePut } from "../hooks/useApi";
import useToastr from "../hooks/useToastr";
import { filterData } from "../utils/helpers";

function Categories() {
  const currentLanguage = store.getState().settings.lang;
  const navigate = useNavigate();
  const { id } = useParams()
  const toastr = useToastr();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data : subcategories , isFetched, refetch } = useGet(["sub-categories"] , "sub-categories", {
    staleTime: Infinity,
  });



  const data = useMemo(() => {
    if (!subcategories) return [];
    return subcategories?.filter((e) => e.category_id === parseInt(id))
  }, [subcategories]);
  

  const { mutate: deleteCategory } = useDelete({
    invalidateQueries: "sub-categories",
    onSuccess: () => {
      dispatch({ type: modalActions.CLOSE_ALL });
      toastr(t("deleted_successfully"), "success");
    },
    onError: (error) => {
      toastr(error.message || t("delete_failed"), "error");
    },
  });

  const { mutate: createCategory } = usePost({
    invalidateQueries: "sub-categories",
    onSuccess: () => {
      dispatch({ type: modalActions.CLOSE_ALL });
      toastr(t("category_created_successfully"), "success");
      refetch();
    },
    onError: (error) => {
      toastr(error.message || t("create_category_failed"), "error");
    },
  });

  const { mutate: updateCategory } = usePut({
    invalidateQueries: "sub-categories",
    onSuccess: () => {
      dispatch({ type: modalActions.CLOSE_ALL });
      toastr(t("category_updated_successfully"), "success");
      refetch();
    },
    onError: (error) => {
      toastr(error.message || t("update_category_failed"), "error");
    },
  });

  const {
    modalState,
    dispatch,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeAllModals,
  } = useModal();

  // Memoized data transformations
  
  const normalized = useMemo(() => {
    if (!data) return [];
    return data
    .map((item) => ({
      id: item?.id,
      name: item?.name,
      image: item?.image,
      category : item?.category,
      products : item?.products?.length,
      createdAt: item?.created_at,
    }));
  }, [data]);

  // console.log();

  const filteredData = useMemo(() => {
    return filterData(normalized, searchTerm, ["id", "name"]);
  }, [normalized, searchTerm]);
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // const {
  //   orderKey,
  //   orderDirection,
  //   orderedItems,
  //   handleOrderChange,
  //   orderOptions,
  // } = useOrder(filteredData, {
  //   orderKey: "name",
  //   orderDirection: "asc",
  //   orderOptions: ["name", "id", "createdAt"],
  // });

  // Columns memoization
  const columns = useMemo(
    () => subcategoryColumns(openEditModal, openDeleteModal),
    [openEditModal, openDeleteModal]
  );

  // Modal handlers
  const handleCloseAllModals = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  const getInitialValues = useCallback(() => {
    if (modalState.mode === "edit" && modalState.selectedItem) {
      const nameValue =
        typeof modalState.selectedItem.name === "string"
          ? modalState.selectedItem.name
          : modalState.selectedItem.name[currentLanguage] || "";
      return {
        name: nameValue,
        image: modalState.selectedItem.image || null,
        category_id : id
      };
    }
    return {
      name: { ar: "", en: "" },
      image: null,
      category_id: id,
    };
  }, [modalState.mode, modalState.selectedItem, currentLanguage]);

  // // Event handlers
  const handleSubmit = useCallback(
    (values) => {
      let payload;

      if (modalState.mode === "add") {
        payload = {
          name: {
            en: values.name.en,
            ar: values.name.ar,
          },
          ...(values.image && { image: values.image }),
          category_id: id
        };
      } else if (modalState.mode === "edit") {
        const currentName = modalState.selectedItem.name;
        payload = {
          name:
            typeof currentName === "object"
              ? { ...currentName, [currentLanguage]: values.name }
              : { en: values.name, ar: values.name },
          ...(values.image && { image: values.image }),
          category_id: id
        };
      }

      if (modalState.mode === "add") {
        createCategory({ url: "sub-categories", data: payload });
      } else if (modalState.mode === "edit") {
        updateCategory({
          url: `sub-categories/${modalState.selectedItem.id}`,
          data: payload,
        });
      }
    },
    [
      modalState.mode,
      modalState.selectedItem,
      currentLanguage,
      createCategory,
      updateCategory,
    ]
  );

  const handleDelete = useCallback(() => {
    if (!modalState.selectedItem?.id) return;
    deleteCategory({ url: `sub-categories/${modalState.selectedItem.id}` });
  }, [modalState.selectedItem, deleteCategory]);

  if (!isFetched) {
    return <div>{t("loading")}...</div>;
  }

  return (
    <>
      <Container
        title={normalized[0].category.name}
        additionalHeaderContent={
          <div className="flex items-center gap-x-4">
            {/* <Search
              placeholder={t("search_in_categories")}
              value={searchTerm}
              onChange={handleSearchChange}
            /> */}

            {/* <div className="flex relative w-[220px]">
              <select
                name="orderkey"
                onChange={handleOrderChange}
                value={orderKey}
                className="px-3 py-2 w-4/5 bordered rounded focus:border-transparent transition-all"
              >
                {orderOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(option.charAt(0).toUpperCase() + option.slice(1))}
                    {orderKey === option && ` (${orderDirection})`}
                  </option>
                ))}
              </select>
              {orderKey && (
                <button
                  onClick={() =>
                    handleOrderChange(
                      {
                        target: {
                          name: "orderkey",
                          value: orderKey,
                        },
                      },
                      orderDirection === "asc" ? "desc" : "asc"
                    )
                  }
                  className="absolute end-0 inset-y-0 px-3 py-2 bordered"
                  aria-label={`Sort ${
                    orderDirection === "asc" ? "descending" : "ascending"
                  }`}
                >
                  {orderDirection === "asc" ? "↓ " : "↑ "}
                </button>
              )}
            </div> */}

            <Button
              onClick={openAddModal}
              className="border-0"
              prefixIcon={
                <IoIosAddCircleOutline size={32} color="black" stroke="0.5" />
              }
              aria-label={t("add_category")}
            />
          </div>
        }
      >
        <Table
          columns={columns}
          data={filteredData}
          pageSize={5}
          pagination={true}
          emptyMessage={t("no_categories_found")}
        />
      </Container>

      {/* Add Modal */}
      <Modal
        isOpen={modalState.mode === "add"}
        onClose={handleCloseAllModals}
        className="w-full max-w-xl h-[500px] -mt-32"
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <Form
          key="add"
          initialValues={getInitialValues()}
          validationSchema={addCategorySchema}
          onSubmit={handleSubmit}
          onClose={handleCloseAllModals}
          outerClassName="p-4 pt-0"
          formClassName="flex flex-col "
          buttonClass=" mt-32"
        >
          <div className="flex gap-x-3">
            <Input
              name="name.en"
              type="text"
              label={`${t("category_name")} (English)`}
              placeholder={t("enter_category_name")}
              containerClassName="mb-4 flex-1"
              fieldClassName="w-full"
              labelClassName=""
              errorClassName="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="flex gap-x-3">
            <Input
              name="name.ar"
              type="text"
              label={`${t("category_name")} (Arabic)`}
              placeholder={t("enter_category_name")}
              containerClassName="mb-4 flex-1"
              fieldClassName="w-full"
              labelClassName=""
              errorClassName="text-red-500 text-sm mt-1"
            />
          </div>
          <Fileupload name="image" label={t("image")} accept="image/*" />
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modalState.mode === "edit"}
        onClose={handleCloseAllModals}
        className="w-full max-w-xl h-[450px] -mt-32"
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <Form
          key={`edit-${modalState.selectedItem?.id}`}
          initialValues={getInitialValues()}
          validationSchema={editCategorySchema}
          onSubmit={handleSubmit}
          onClose={handleCloseAllModals}
          outerClassName="p-4 pt-0"
          formClassName="flex flex-col  "
          buttonClass=" mt-32"
         >
          <div className="flex gap-x-3">
            <Input
              name="name"
              type="text"
              label={`${t("category_name")} (${currentLanguage.toUpperCase()})`}
              placeholder={t("enter_category_name")}
              containerClassName="mb-4 flex-1"
              fieldClassName="w-full"
              labelClassName=""
              errorClassName="text-red-500 text-sm mt-1"
            />
          </div>

          <Fileupload
            name="image"
            label={t("image")}
            accept="image/*"
            initialPreview={modalState.selectedItem?.image || null}
          />
        </Form>
      </Modal>

      <Delete
        isOpen={modalState.isDeleteOpen}
        onClose={handleCloseAllModals}
        onConfirm={handleDelete}
        itemName={
          typeof modalState.selectedItem?.name === "string"
            ? modalState.selectedItem?.name
            : modalState.selectedItem?.name?.[currentLanguage] ||
              t("this_category")
        }
        isLoading={false}
      />
    </>
  );
}

export default Categories;
