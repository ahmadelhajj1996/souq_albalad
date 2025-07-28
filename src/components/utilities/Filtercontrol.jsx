import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Filtercontrol = ({
  filterKey,
  filterOptions,
  onFilterChange,
  className = "",
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (e) => {
      onFilterChange(e.target.value);
    },
    [onFilterChange]
  );

  return (
    <select
      name="filterkey"
      onChange={handleChange}
      value={filterKey}
      className={`px-3 py-2 bordered rounded focus:border-transparent transition-all w-[200px] ${className}`}
    >
      {filterOptions.map((filter) => (
        <option key={filter} value={filter}>
          {t(filter.charAt(0).toUpperCase() + filter.slice(1))}
        </option>
      ))}
    </select>
  );
};

Filtercontrol.propTypes = {
  /** Currently selected filter key */
  filterKey: PropTypes.string.isRequired,
  /** Array of available filter options */
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Callback function when filter changes */
  onFilterChange: PropTypes.func.isRequired,
  /** Additional className for styling */
  className: PropTypes.string,
};

export default Filtercontrol;
