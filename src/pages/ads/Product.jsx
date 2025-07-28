import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import { useGet } from "../../hooks/useApi";
import { productadColumns } from "../../constants/Columns";
import { filterData } from "../../utils/helpers";

const initialFilters = {
  sub_category_id: null,
  is_featured: null,
  price: null,
  seller_id: null,
  newest: null,
  title: null,
  price_min: null,
  price_max: null,
};

function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const { data: subcategories, isFetched } = useGet(
    ["sub-categories"],
    "sub-categories",
    {
      staleTime: Infinity,
    }
  );

  // Filter subcategories by category_id
  const data = useMemo(() => {
    if (!subcategories) return [];
    return subcategories?.filter((e) => e.category_id === parseInt(id));
  }, [subcategories, id]);

  // Normalize subcategories for dropdown
  const normalized = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      id: item?.id,
      name: item?.name,
    }));
  }, [data]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append("category_id", id);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        params.append(key, value);
      }
    });

    return params.toString();
  }, [filters, id]);

  const url = `products?${queryString}`;

  const { data: productsarray, isFetched: productsFetched } = useGet(
    ["products", id, filters],
    url,
    {
      staleTime: Infinity,
    }
  );

  const productsdata = useMemo(() => {
    return productsFetched ? productsarray?.products ?? [] : [];
  }, [productsFetched, productsarray]);

  const allproducts = productsdata.map((product) => product.product);

  const products = useMemo(() => {
    return filterData(allproducts, searchTerm, ["id", "title"]);
  }, [allproducts, searchTerm]);

  console.log(products);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const item = normalized.find((item) => item.id === selectedId);
    if (item) {
      setSelectedItem(item);
      setFilters((prev) => ({ ...prev, sub_category_id: item.id }));
      localStorage.setItem(`selectedItem-${id}`, JSON.stringify(item));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    if (normalized.length > 0) {
      setSelectedItem(normalized[0]);
    }
  };

  useEffect(() => {
    if (normalized.length > 0) {
      const savedSelectedItem = localStorage.getItem(`selectedItem-${id}`);

      if (savedSelectedItem) {
        try {
          const parsedItem = JSON.parse(savedSelectedItem);
          if (normalized.some((item) => item.id === parsedItem.id)) {
            setSelectedItem(parsedItem);
            setFilters((prev) => ({ ...prev, sub_category_id: parsedItem.id }));
            return;
          }
        } catch (e) {
          console.error("Failed to parse saved selectedItem", e);
        }
      }

      setSelectedItem(normalized[0]);
      setFilters((prev) => ({ ...prev, sub_category_id: normalized[0].id }));
      localStorage.setItem(`selectedItem-${id}`, JSON.stringify(normalized[0]));
    }
  }, [normalized, id]);

  const productcolumns = useMemo(() => productadColumns(navigate), [navigate]);

  return (
    <Container
      additionalHeaderContent={
        <div className="flex gap-2 fixed top-[72px] end-4 z-40">
          <>
            <select
              value={selectedItem?.id || ""}
              onChange={handleSelectChange}
              className="p-2 border border-gray-300 rounded-md w-[200px] bg-white"
            >
              {normalized.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <Search value={searchTerm} onChange={handleSearchChange} />
          </>
        </div>
      }
    >
      <div className="relative">
        {isFetched && productsFetched && (
          <div className="mt-20 w-3/4">
            <Table
              columns={productcolumns}
              data={products}
              pageSize={10}
              pagination={true}
              emptyMessage={t("no_categories_found")}
            />
          </div>
        )}

        {products.length > 0 && (
          <div className="fixed top-40 right-0 h-full w-80 bg-white shadow-lg z-30 overflow-y-auto pt-4 border-l">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-medium mb-4 -mt-8">{t("filters")}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("featured")}
                  </label>
                  <select
                    name="is_featured"
                    value={filters.is_featured || ""}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">{t("all")}</option>
                    <option value="1">{t("featured")}</option>
                    <option value="0">{t("not_featured")}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm bordered bg-rose-500 text-white "
                >
                  {t("reset_filters")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Product;
