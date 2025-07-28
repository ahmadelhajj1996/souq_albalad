import {  useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Table from "../components/display/Table";
import Container from "../components/layout/Container";
import { useModal } from "../hooks/useModal";
import { categoryColumns } from "../constants/Columns";
import { categories } from "../constants/general";

function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { openEditModal, openDeleteModal } = useModal();

  const handleViewSubcategories = useCallback(
    (item) => {
      if (!item?.id) return;
      setSearchParams({ id: item.id.toString() });
    },
    [setSearchParams]
  );

  const subcategoryCounts = useMemo(() => {
    const counts = {};
    categories?.forEach((category) => {
      counts[category.id] = categories.filter(
        (cat) => cat.parent_id === category.id
      ).length;
    });
    return counts;
  }, [categories]);

  const tableData = useMemo(() => {
    if (!categories) return [];
    const id = searchParams.get("id");
    return id
      ? categories.filter((cat) => cat.parent_id === Number(id))
      : categories.filter((cat) => cat.parent_id === null);
  }, [categories, searchParams]);

  const columns = useMemo(() => {
    return categoryColumns(
      handleViewSubcategories,
      openEditModal,
      openDeleteModal,
      t,
      subcategoryCounts
    );
  }, [
    handleViewSubcategories,
    openEditModal,
    openDeleteModal,
    t,
    subcategoryCounts,
  ]);

  return (
    <Container title={t("title")}>
      <Table
        columns={columns}
        data={tableData}
        pageSize={5}
        pagination={true}
        emptyMessage={t("no_categories_found")}
      />
    </Container>
  );
}

export default Settings;
