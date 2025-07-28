import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../components/layout/Container";
import Search from "../components/form/Search";
import Table from "../components/display/Table";
import Ordercontrol from "../components/utilities/Order";

// import Filtercontrol from "../components/utilities/Filtercontrol";
// import useFilter from "../hooks/useFilter";

import useOrder from "../hooks/useOrder";
import { sellerColumns } from "../constants/Columns";
import { filterData } from "../utils/helpers";
import { useGet } from "../hooks/useApi";

function Sellers() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isFetched } = useGet( ["sellers"] , "sellers", {
    staleTime: Infinity,
  });

  // Memoized data transformations
  const normalizedData = useMemo(() => {
    if (!data) return [];
    return data?.data?.map((item) => ({
      id: item.id,
      name: item.user.name,
      email: item.user.email,
      phone: item.user.phone,
      store_owner_name: item.store_owner_name,
      store_name: item.store_name,
      address: item.address,
      logo: item.logo,
      description: item.description,
      created_at: item.created_at
    }));
  }, [data]);

  // console.log();

  // Columns memoization
  const columns = sellerColumns(navigate, t);

  // const { filterKey, filteredItems, handleFilterChange, filterOptions } =
  //   useFilter(normalizedData      , {
  //     filterKey: "all",
  //     filterOptions: ["all", "active", "freezed", "deleted"],
  //     filterProperty: "status",
  //     storageKey: "user-list-filter",
  //   });

  const finalData = useMemo(() => {
    return filterData(normalizedData, searchTerm, [
      "id",
      "name",
      "email",
      "phone",
    ]);
  }, [normalizedData, searchTerm]);
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const {
    orderKey,
    orderDirection,
    orderedItems,
    handleOrderChange,
    orderOptions,
  } = useOrder(finalData, {
    orderKey: "name",
    orderDirection: "asc",
    orderOptions: ["name", "id", "createdAt"],
  });

  if (!isFetched) {
    return <div>{t("loading")}...</div>;
  }

  return (
    <>
      <Container
        title={"Sellers"}
        additionalHeaderContent={
          <>
            <Search value={searchTerm} onChange={handleSearchChange} />

            {/* <Filtercontrol
              filterKey={filterKey}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
            /> */}

            <Ordercontrol
              orderKey={orderKey}
              orderDirection={orderDirection}
              orderOptions={orderOptions}
              onOrderChange={handleOrderChange}
            />
          </>
        }
      >
        <Table
          columns={columns}
          data={orderedItems}
          pageSize={8}
          pagination={true}
        />
      </Container>
    </>
  );
}

export default Sellers;
