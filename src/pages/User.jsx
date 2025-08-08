import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGet, useDelete } from "../hooks/useApi";
import { useTab } from "../hooks/useTab";
import Grid from "../components/layout/Grid";
import Tabs from "../components/navigation/Tabs";
import { DetailItem } from "../components/addetails/Details";
import { getInitialValues, options } from "../constants/user";
import { warningSchema } from "../utils/validator";
import { useModal } from "../hooks/useModal";
import { modalActions } from "../constants/general";
import Button from "../components/layout/Button";
import Delete from "../components/feedback/Delete";
import Form from "../components/form/Form";
import Select from "../components/form/Select";
import Datec from "../components/form/Date";
import Textarea from "../components/form/Textarea";
import { usePatch } from "../hooks/useApi";
import useToastr from "../hooks/useToastr";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = `customers_warning_form_${window.location.pathname}`;

function User() {
  const { id } = useParams();
  const { t } = useTranslation();
  const toastr = useToastr();

  // Data fetching
  const { data, isFetched, refetch } = useGet(["customers"], "customers", {
    staleTime: Infinity,
  });

  // User data normalization
  const user = data?.data?.find((user) => user.id === parseInt(id));
  const normalized = useMemo(() => {
    if (!user) return null;
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      is_active: user?.is_active,
        created_at: user?.created_at,
    };
  }, [user]);

  // Warning form state
  const [show, setShow] = useState(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState).show : false;
  });

  const [formValues, setFormValues] = useState(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState
      ? JSON.parse(savedState).formValues
      : getInitialValues(id);
  });

  // Save form state to localStorage
  useEffect(() => {
    const stateToSave = { show, formValues };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [show, formValues]);

  // Modals
  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  // API mutations
  const patchUserStatus = usePatch({
    invalidateQueries: ["users"],
    updateQuery: ["user", 20],
    onSuccess: () => {
      toastr(t("status_updated_successfully"), "success");
      refetch();
      closeUserModals();
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  const { mutate: deleteItem } = useDelete({
    invalidateQueries: ["users"],
    onSuccess: () => {
      toastr(t("deleted_successfully"), "success");
      closeUserModals();
      // In a real app, you might want to redirect after deletion
    },
    onError: (error) => {
      toastr(error.message, "error");
    },
  });

  // Handlers
  const handleFreeze = useCallback(() => {
    if (!normalized?.id) return;

    patchUserStatus.mutate({
      url: `admin/users/${normalized.id}/inactive`,
      data: {},
      config: {},
    });
  }, [normalized, patchUserStatus]);

  const handleDelete = useCallback(() => {
    if (!normalized?.id) return;
    deleteItem({ url: `admin/users/${normalized.id}` });
  }, [normalized, deleteItem]);

  const sendWarning = (values) => {
    console.log("Sending warning:", values);
    setShow(false);
    setFormValues(getInitialValues(id));
    localStorage.removeItem(STORAGE_KEY);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  // Tabs configuration
  const tabs = [
    {
      label: "Basic Info",
      content: (
        <>
          <div className="px-2">
            <Grid cols={2} gap={3} className="w-full">
              <>
                <div className="flex flex-col gap-y-3 ms-2 mt-2">
                  <div className="grid grid-cols-2 gap-x-4">
                    <DetailItem label="id" value={normalized?.id} />
                    <DetailItem label="name" value={normalized?.name} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <DetailItem label="email" value={normalized?.email} />
                    <DetailItem label="phone" value={normalized?.phone} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <DetailItem
                      label="Status"
                      value={normalized?.is_active ? "Active" : "Inactive"}
                    />
                  </div>
                  <div className="w-3/4 mx-auto grid grid-cols-3 gap-x-5 mt-12">
                    <Button onClick={() => setShow(true)} className="w-[125px]">
                      Send Warning
                    </Button>
                    <Button
                      onClick={() => openFreezeModal(normalized)}
                      className="w-[125px]"
                    >
                      {normalized?.is_active == true ? "Freeze" : "Unfreeze"}
                    </Button>
                    <Button
                      onClick={() => userDel(normalized)}
                      className="w-[125px]"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </>
              {show && (
                <Form
                  key={id}
                  onClose={() => {
                    setShow(false);
                    setFormValues(getInitialValues(id));
                    localStorage.removeItem(STORAGE_KEY);
                  }}
                  initialValues={formValues}
                  validationSchema={warningSchema}
                  onSubmit={sendWarning}
                  outerClassName=""
                  formClassName="flex flex-col gap-y-6"
                  buttonClass="relative bottom-12 max-w-1/2 top-2"
                  submitButtonText="Send"
                  onChange={(values) => setFormValues(values)}
                >
                  <h2 className="font-normal text-lg mb-4">
                    Send Warning to the Customer ({normalized?.name})
                  </h2>

                  <Grid cols={2} gap={3} className="w-full">
                    <Select
                      name="severity"
                      label="Severity Level"
                      containerClassName="mb-4"
                      fieldClassName=""
                      labelClassName=""
                      errorClassName="text-red-500 text-sm mt-1"
                      options={options}
                    />

                    <Datec
                      name="expires_at"
                      label="Expiry Date"
                      minDate={new Date().toISOString().split("T")[0]}
                      containerClassName="mb-4"
                    />
                  </Grid>

                  <Textarea
                    name="reason"
                    label="Reason"
                    rows={5}
                    placeholder="Enter the reason for the warning please"
                    containerClassName="mb-4"
                  />
                </Form>
              )}
            </Grid>
          </div>
        </>
      ),
    },
    {
      label: "Warnings",
      content: <></>,
    },
  ];

  const { activeTab, handleTabChange } = useTab(tabs, `/customers/${id}`);

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  if (!normalized) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Tabs
        tabs={tabs}
        tabListClassName="w-1/6"
        tabListWidth="400px"
        tabPanelWidth="calc(100% - 200px)"
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      {/* Freeze Confirmation Modal */}
      <Delete
        isOpen={userState.isModalOpen && userState.mode === "freeze"}
        onClose={closeUserModals}
        onConfirm={handleFreeze}
        action={normalized?.is_active == true ? "Freeze" : "Unfreeze"}
        itemName={`${
          normalized?.is_active ? "Freeze" : "Unfreeze"
        } the customer "${normalized?.name}"`}
      />

      {/* Delete Confirmation Modal */}
      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={handleDelete}
        action="Delete"
        itemName={`Delete the customer "${normalized?.name}"`}
      />
    </>
  );
}

export default User;
