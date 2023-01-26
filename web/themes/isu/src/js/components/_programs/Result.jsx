import { h } from 'preact';

export default function Result(props) {
  const handleResetFilters = () => {
    props.resetFiltersAndSearch();
  };

  const clearSearch = () => {
    props.setSearch('');
  };

  const activeFilters = Object.keys(props.filters)
    .map((filterName) => {
      const filterValues = props.filters[filterName];
      return filterValues.map((value) => ({
        type: filterName,
        value,
        remove: () => {
          const currentFilters = props.filters[filterName] || [];
          const newFilters = currentFilters.filter((i) => i !== value);

          props.setFilters({
            ...props.filters,
            [filterName]: newFilters,
          });
        },
      }));
    })
    .reduce((a, b) => [...a, ...b], []);

  const showResetFilters = Object.values(props.filters).flat().length > 0
        || props.search.length > 0;

  return (
    <div className="results__current cluster items-center">
      <div className="results__buttons cluster">
        {activeFilters.map(({ type, value, remove }) => (
          <button
            className={`button button-rounded button-icon button-icon--close button--${value.replace(/\s+/g, '-').toLowerCase()}`}
            aria-label={`Remove ${value} Filter`}
            onClick={remove}
          >
            {value}
          </button>
        ))}

        {props.search.length ? (
          <button
            className="button button-rounded button-icon button-icon--close"
            onClick={clearSearch}
            aria-label="Remove {props.search} Filter"
          >
            {props.search}
          </button>
        ) : (
          ''
        )}

        <div className="results__side">
          {showResetFilters ? (
            <button
              onClick={handleResetFilters}
              className="button-link"
            >
              Clear Filters
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
