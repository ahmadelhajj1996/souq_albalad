import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../components/layout/Container";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import FilterControl from "../../components/utilities/Filtercontrol";
import { useGet } from "../../hooks/useApi";
import { filterData } from "../../utils/helpers";
import { jobadColumns } from "../../constants/Columns";

function Jobs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: jobs = [], isFetched } = useGet(["jobs"]  , "jobs", {
    staleTime: Infinity,
    select: (data) => data?.filter((job) => job.type === "job_vacancy"), // search_for_work
  });

  // Extract unique filter options from data
  const filterOptions = useMemo(() => {
    if (!isFetched) return { jobTypes: [], governorates: [] };

    const jobTypes = [...new Set(jobs.map((job) => job.job_type))].filter(
      Boolean
    );
    const governorates = [
      ...new Set(jobs.map((job) => job.governorate)),
    ].filter(Boolean);

    return {
      jobTypes: ["all", ...jobTypes],
      governorates: ["all", ...governorates],
    };
  }, [jobs, isFetched]);

  // State for filters
  const [filters, setFilters] = useState({
    jobType: "all",
    governorate: "all",
  });

  // Combined filtered data
  const filteredJobs = useMemo(() => {
    if (!isFetched) return [];

    let result = jobs;

    // Apply search filter
    if (searchTerm) {
      result = filterData(result, searchTerm, [
        "id",
        "title",
        "phone_number",
        "job_type",
        "governorate",
      ]);
    }

    // Apply job type filter
    if (filters.jobType !== "all") {
      result = result.filter((job) => job.job_type === filters.jobType);
    }

    // Apply governorate filter
    if (filters.governorate !== "all") {
      result = result.filter((job) => job.governorate === filters.governorate);
    }

    return result;
  }, [jobs, searchTerm, filters, isFetched]);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterName) => (value) => {
      setFilters((prev) => ({ ...prev, [filterName]: value }));
    },
    []
  );

  // Handle search change
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const columns = useMemo(() => jobadColumns(navigate), [navigate]);

  return (
    <Container
      title={t("jobs")}
      additionalHeaderContent={
        <div className="flex flex-wrap items-center gap-4 mb-4 mt-2">
          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("filter_by_job_type")}
            </label>
            <FilterControl
              filterKey={filters.jobType}
              filterOptions={filterOptions.jobTypes}
              onFilterChange={handleFilterChange("jobType")}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("filter_by_location")}
            </label>
            <FilterControl
              filterKey={filters.governorate}
              filterOptions={filterOptions.governorates}
              onFilterChange={handleFilterChange("governorate")}
              className="flex-shrink-0"
            />
          </div>

          <Search
            placeholder={t("search_in_jobs")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow min-w-[200px]"
          />
        </div>
      }
    >
      <Table
        columns={columns}
        data={filteredJobs}
        pageSize={10}
        pagination={true}
        emptyMessage={t("no_jobs_found")}
      />
    </Container>
  );
}

export default Jobs;
