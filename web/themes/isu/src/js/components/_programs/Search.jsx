import { h, createRef } from 'preact';

export default function Search(props) {
  const inputRef = createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setSearch(inputRef.current.value);
    inputRef.current.blur();
    return false;
  };

  return (
    <form className="filter__form" onSubmit={handleSubmit}>
      <label htmlFor="filter-search" className="screen-reader-text">
        Search programs
      </label>
      <input
        ref={inputRef}
        id="filter-search"
        type="search"
        autoComplete="false"
        className="filter__input"
        value={props.search}
        placeholder="Search"
      />

      <button className="filter-search__submit">
        <span className="material-symbols-outlined">
          search
        </span>
        <span className="filter-search__submit-text">
          Search
        </span>
      </button>
    </form>
  );
}
