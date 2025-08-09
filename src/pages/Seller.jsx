import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGet, usePost, usePatch, useDelete } from "../hooks/useApi";
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
import useToastr from "../hooks/useToastr";
const STORAGE_KEY = `sellers_warning_form_${window.location.pathname}`;

function Seller() {
  const { id } = useParams();
  const toastr = useToastr();
  const { data, isFetched } = useGet(["sellers"], "sellers", {
    staleTime: Infinity,
  });

  const seller = data?.data?.find((user) => user.id === parseInt(id));

  const normalized = useMemo(() => {
    if (!seller) return [];
    return {
      id: seller?.id,
      user_id: seller?.user?.id,
      name: seller?.user?.name,
      email: seller?.user?.email,
      phone: seller?.user?.phone,
      is_active: seller?.user?.is_active,
      store_owner_name: seller?.store_owner_name,
      store_name: seller?.store_name,
      address: seller?.address,
      logo: seller?.logo,
      status: seller?.status,
      description: seller?.description,
      created_at: seller?.created_at,
    };
  }, [seller]);

  console.log(normalized);

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

  useEffect(() => {
    const stateToSave = { show, formValues };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [show, formValues]);

  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  const { mutate: updateStatus } = usePost({
    invalidateQueries: ["sellers"],
    updateQuery: ["sellers", 20],
    onSuccess: () => {
      console.log("done");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: patchUserStatus } = usePatch({
    invalidateQueries: ["sellers"],
    onSuccess: () => {
      console.log("Status updated successfully");
      toastr("status_updated_successfully", "success");
      closeUserModals();
    },
    onError: (error) => {
      toastr("Error", "error");
      console.error(error);
    },
  });

  const { mutate: deleteItem } = useDelete({
    invalidateQueries: ["users"],
    onSuccess: () => {
      console.log("Deleted successfully");
      closeUserModals();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleFreeze = useCallback(() => {
    if (!normalized?.id) return;
    patchUserStatus({
      url: `admin/users/${normalized?.user_id}/inactive`,
      data: {},
      config: {},
    });
  }, [normalized, patchUserStatus]);

  const handleDelete = useCallback(() => {
    if (!normalized?.user_id) return;
    deleteItem({ url: `admin/users/${normalized?.user_id}` });
  }, [normalized, deleteItem]);

  const sendWarning = (values) => {
    console.log("Sending warning:", values);
    setShow(false);
    setFormValues(getInitialValues(id));
    localStorage.removeItem(STORAGE_KEY);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  const accept = async (id) => {
    try {
      await updateStatus({
        url: `/admin/seller/${id}/status?status=accepted`,
        data: {},
      });
    } catch (error) {
      console.error("Error accepting seller:", error);
    }
  };

  const reject = async (id) => {
    try {
      await updateStatus({
        url: `/admin/seller/${id}/status?status=rejected`,
        data: {},
      });
    } catch (error) {
      console.error("Error rejecting seller:", error);
    }
  };

  const tabs = [
    {
      label: "Basic Info",
      content: (
        <>
          <div className="px-2">
            <Grid cols={2} gap={3} className="w-full">
              <>
                <div className="flex flex-col gap-y-3 ms-2 mt-2">
                  <div className=" grid grid-cols-2 gap-x-0">
                    <DetailItem label="id" value={normalized?.id} />
                    <DetailItem label="name" value={normalized?.name} />
                  </div>
                  <div className=" grid grid-cols-1 gap-x-0">
                    <DetailItem label="email" value={normalized?.email} />
                  </div>
                  <div className=" grid grid-cols-2 gap-x-0">
                    <DetailItem label="phone" value={normalized?.phone} />
                    <DetailItem
                      label="seller.user_status"
                      value={
                        normalized?.is_active == 1
                          ? "filter.active"
                          : "filter.inactive"
                      }
                    />
                  </div>
                  <div className=" grid grid-cols-2 gap-x-0">
                    <DetailItem
                      label="seller.upgrade_status"
                      value={normalized?.status}
                    />
                  </div>
                  {normalized?.status == "pending" && (
                    <div className="mt-12">
                      <p>seller.become_seller_request</p>
                      <div className=" w-3/4 mx-auto grid grid-cols-3 gap-x-5 mt-6">
                        <Button
                          onClick={() => accept(normalized?.id)}
                          className="w-[125px]"
                        >
                          seller.accept
                        </Button>
                        <Button
                          onClick={() => reject(normalized?.id)}
                          className="w-[125px]"
                        >
                          seller.reject
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className=" w-3/4 mx-auto grid grid-cols-3 gap-x-5 mt-12">
                    <Button onClick={() => setShow(true)} className="w-[125px]">
                      user.send_warning
                    </Button>
                    <Button
                      onClick={() => openFreezeModal(normalized)}
                      className="w-[125px]"
                    >
                      user.freeze
                    </Button>
                    <Button
                      onClick={() => userDel(normalized)}
                      className="w-[125px]"
                    >
                      user.delete
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
                  buttonClass="relative bottom-12 max-w-1/2 bottom-12"
                  submitButtonText="seller.send"
                  onChange={(values) => setFormValues(values)}
                >
                  <h2 className="font-normal text-lg mb-4">
                    seller.warning_title
                  </h2>

                  <Grid cols={2} gap={3} className="w-full">
                    <Select
                      name="severity"
                      label="user.severity_level"
                      containerClassName="mb-4"
                      fieldClassName=""
                      labelClassName=""
                      errorClassName="text-red-500 text-sm mt-1"
                      options={options}
                    />

                    <Datec
                      name="expires_at"
                      label="user.expiry_date"
                      minDate={new Date().toISOString().split("T")[0]}
                      containerClassName="mb-4"
                    />
                  </Grid>

                  <Textarea
                    name="reason"
                    label="user.reason"
                    rows={5}
                    placeholder="user.warning_reason_placeholder"
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
      label: "user.warnings",
      content: <></>,
    },
    {
      label: "Reports",
      content: <></>,
    },
  ];

  const { activeTab, handleTabChange } = useTab(tabs, `/sellers/${id}`);

  if (!isFetched) {
    return <div>loading</div>;
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
      <Delete
        isOpen={userState.isModalOpen && userState.mode === "freeze"}
        onClose={closeUserModals}
        onConfirm={() => handleFreeze()}
        action="user.freeze"
        itemName={`seller.freeze_confirmation`}
      />

      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={() => handleDelete()}
        action="user.delete"
        itemName={`seller.delete_confirmation`}
      />
    </>
  );
}

export default Seller;
