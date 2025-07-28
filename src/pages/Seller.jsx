import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useApi";
import { useTab } from "../hooks/useTab";
import Grid from "../components/layout/Grid";
import Tabs from "../components/navigation/Tabs";
import { DetailItem } from "../components/addetails/Details";
import { getInitialValues, options } from "../constants/user";
import { warningSchema } from "../utils/validator";

import { useModal } from "../hooks/useModal";
import { modalActions } from "../constants/general";
import { sellerFreeze , sellerDelete } from "../services/general";
import Button from "../components/layout/Button";
import Delete from "../components/feedback/Delete";
import Form from "../components/form/Form";
import Select from "../components/form/Select";
import Datec from "../components/form/Date";
import Textarea from "../components/form/Textarea";

const STORAGE_KEY = `sellers_warning_form_${window.location.pathname}`;

function Seller() {

  const {id} = useParams();
  const { data, isFetched } = useGet(["sellers"] , "sellers", {
    staleTime: Infinity,
  });

  const seller = data?.data?.find((user) => user.id === parseInt(id));

  const normalized = useMemo(() => {
    if (!seller) return [];
    return {
      id: seller?.id,

      name: seller?.user?.name,
      email: seller?.user?.email,
      phone: seller?.user?.phone,
       store_owner_name: seller?.store_owner_name,
      store_name: seller?.store_name,
      address: seller?.address,
      logo: seller?.logo,
      description: seller?.description,
      created_at: seller?.created_at
    };
  }, [seller]);
  

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

  // // Memoize user's warnings
  // // const userWarnings = useMemo(
  // //   () => warnings?.filter((i) => i.user_id == id) || [],
  // //   [id]
  // // );

  // // const userReports = useMemo(
  // //   () => reports?.filter((i) => i.reported_user == id) || [],
  // //   [id]
  // // );

  // // const {
  // //   filterKey: warningsKey,
  // //   filteredItems: filteredWarnings,
  // //   handleFilterChange: warningFilterChange,
  // //   filterOptions: warningOptions,
  // // } = useFilter(userWarnings, {
  // //   filterKey: "all",
  // //   filterOptions: ["all", "low", "medium", "high"],
  // //   filterProperty: "severity",
  // //   storageKey: `user-warnings-filter-${id}`,
  // // });
  // // const {
  // //   filterKey: reportsKey,
  // //   filteredItems: filteredReports,
  // //   handleFilterChange: reportFilterChange,
  // //   filterOptions: reportOptions,
  // // } = useFilter(userReports, {
  // //   filterKey: "all",
  // //   filterOptions: [
  // //     "all",
  // //     "User Behavior",
  // //     "Fraud",
  // //     "Content Violation",
  // //     "Payment Issue",
  // //   ],
  // //   filterProperty: "type",
  // //   storageKey: `user-reports-filter-${id}`,
  // // });

  useEffect(() => {
    const stateToSave = { show, formValues };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [show, formValues]);

  // Modal handlers for user actions
  const {
    modalState: userState,
    dispatch: userDispatch,
    openFreezeModal,
    openDeleteModal: userDel,
    closeAllModals: closeUserModals,
  } = useModal();

  const handleFreeze = () => {
    sellerFreeze(normalized);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  const handleDelete = () => {
    sellerDelete(normalized);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  // Modal handlers for warning actions
  // const {
  //   modalState: warningState,
  //   dispatch: warningDispatch,
  //   openDeleteModal: openWarningDelete,
  //   openEditModal: openWarningEdit,
  //   closeAllModals: closeWarningModals,
  // } = useModal();
  // Modal handlers for report actions
  // const {
  //   modalState: reportState,
  //   dispatch: reportDispatch,
  //   openDeleteModal: openReportDelete,
  //   closeAllModals: closeReportModals,
  // } = useModal();

  // const handleFreeze = () => {
  //   sellerFreeze(user, " Freezing ... ");
  //   userDispatch({ type: modalActions.CLOSE_ALL });
  // };

  // const handleDelete = () => {
  //   sellerDelete(user, " deleting ... ");
  //   userDispatch({ type: modalActions.CLOSE_ALL });
  // };

  const sendWarning = (values) => {
    console.log("Sending warning:", values);
    setShow(false);
    setFormValues(getInitialValues(id));
    localStorage.removeItem(STORAGE_KEY);
    userDispatch({ type: modalActions.CLOSE_ALL });
  };

  // // const updateWarning = (values) => {
  // //   editWarning(values);
  // //   warningDispatch({ type: modalActions.CLOSE_ALL });
  // // };
  // // const handleWarningDelete = (item) => {
  // //   delWarning(item);
  // //   warningDispatch({ type: modalActions.CLOSE_ALL });
  // // };
  // // const handleReportDelete = (item) => {
  // //   delReport(item);
  // //   reportDispatch({ type: modalActions.CLOSE_ALL });
  // // };
  // // const warningcolumns = warningColumns(
  // //   (item) => openWarningEdit(item),
  // //   (item) => openWarningDelete(item)
  // // );

  // // const reportcolumns = reportColumns((item) => openReportDelete(item));

  const tabs = [
    {
      label: "Basic Info",
      content: (
        <>
          <div className="px-2">
            <Grid cols={2} gap={3} className="w-full">
              <>
                <div className="flex flex-col gap-y-3 ms-2 mt-2">
                  <div className=" grid grid-cols-2 gap-x-4">
                    <DetailItem label="id" value={normalized?.id} />
                    <DetailItem label="name" value={normalized?.name} />
                  </div>
                  <div className=" grid grid-cols-2 gap-x-4">
                    <DetailItem label="email" value={normalized?.email} />
                    <DetailItem label="phone" value={normalized?.phone} />
                  </div>
                  <div className=" w-3/4 mx-auto grid grid-cols-3 gap-x-5 mt-12">
                    <Button onClick={() => setShow(true)} className="w-[125px]">
                      Send Warning
                    </Button>
                    <Button
                      onClick={() => openFreezeModal(normalized)}
                      className="w-[125px]"
                    >
                      Freeze
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
                  buttonClass="relative bottom-12 max-w-1/2 bottom-12"
                  submitButtonText="Send"
                  onChange={(values) => setFormValues(values)}
                >
                  <h2 className="font-normal text-lg   mb-4">
                    Send Warning to the Seller ( {normalized?.name} )
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
      content: (
        <>
          {/* <Container
            additionalHeaderContent={
              userWarnings?.length > 0 && (
                <select
                  name="filterkey"
                  onChange={warningFilterChange}
                  value={warningsKey}
                  className="w-[150px] fixed end-[40px] top-[90px] bordered p-2 px-4"
                >
                  {warningOptions.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </option>
                  ))}
                </select>
              )
            }
          >
            <div className="mt-8">
              <Table
                columns={warningcolumns}
                data={filteredWarnings}
                pageSize={8}
                pagination={true}
              />

              <Delete
                isOpen={warningState.isDeleteOpen}
                onClose={closeWarningModals}
                onConfirm={() => handleWarningDelete(warningState.selectedItem)}
                action="Delete"
                itemName="this warning"
              />
            </div>
          </Container> */}
        </>
      ),
    },
    {
      label: "Reports",
      content: (
        <>
          {/* <Container
            additionalHeaderContent={
              userReports?.length > 0 && (
                <select
                  name="reportskey"
                  onChange={reportFilterChange}
                  value={reportsKey}
                  className="w-[150px] fixed end-[40px] top-[90px] bordered p-2 px-4"
                >
                  {reportOptions.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </option>
                  ))}
                </select>
              )
            }
          >
            <div className="mt-8">
              <Table
                columns={reportcolumns}
                data={filteredReports.map((report) => ({
                  ...report,
                  id: report.report_id,
                  date: report.created_at,
                }))}
                pageSize={8}
                pagination={true}
              />

              <Delete
                isOpen={reportState.isDeleteOpen}
                onClose={closeReportModals}
                onConfirm={() => handleReportDelete(reportState.selectedItem)}
                action="Delete"
                itemName={`report #${reportState.selectedItem?.report_id}`}
              />
            </div>
          </Container>*/}
        </>
      ),
    },
  ];

  const { activeTab, handleTabChange } = useTab(tabs, `/sellers/${id}`);

  if (!isFetched) {
    return <div>Loading...</div>;
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
        onConfirm={() => handleFreeze(seller)}
        action="Freeze"
        itemName={` Freeze The Seller   "  ${normalized?.name} " `}
      />

      {/* Delete Confirmation Modal */}
      <Delete
        isOpen={userState.isDeleteOpen}
        onClose={closeUserModals}
        onConfirm={() => handleDelete(seller)}
        action="Delete"
        itemName={` Delete The Seller   "  ${normalized?.name} " `}
      />

      {/* Delete Warning Confirmation Modal
                      <Delete
                        isOpen={warningState.isDeleteOpen}
                        onClose={closeWarningModals}
                        onConfirm={() => handleWarningDelete(warningState.selectedItem)}
                        action="Delete"
                        itemName="this warning"
                      /> */}
    </>
  );

}

export default Seller;
