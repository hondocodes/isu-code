import { h, render, Component } from 'preact';
import { useState } from 'preact/hooks';
import { getQueryParams, setQueryParams } from './getQueryParams';

import Result from './Result';
import Program from './Program';
import Filters from './Filters';

const finderPage = document.querySelector('.programs-finder');

if (finderPage) {
  (async () => {
    const response = await fetch(jsonUrl);

    const json = await response.json();
    const rawPrograms = json.programs;
    const { headline } = json;
    const { description } = json;

    const sortedPrograms = rawPrograms.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

    const programs = sortedPrograms.map((program) => Object.assign(program, {
      key: [program.name].join(''),
      searchString: [program.name, program.search, program.paragraph]
        .join(' ')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ''),
    }));

    const queryParams = getQueryParams();

    function OnlineProgramsFinder(props) {
      const [filters, setFiltersActual] = useState(
        queryParams.preFilterFilters || '',
      );
      const [search, setSearchActual] = useState(
        queryParams.preFilterSearch || '',
      );

      const setFilters = (newFilters) => {
        setQueryParams(newFilters, search);
        setFiltersActual(newFilters);
      };

      const setSearch = (newSearch) => {
        setQueryParams(filters, newSearch);
        setSearchActual(newSearch);
      };

      const resetFiltersAndSearch = () => {
        setFilters({});
        setSearch('');
      };

      const handleToggle = (e) => {
        e.preventDefault();
        if (e.currentTarget.getAttribute('data-view')) {
          const type = e.currentTarget.getAttribute('data-view');
          if (type === 'grid') {
            finderPage.setAttribute('data-grid', '');
          } else {
            finderPage.removeAttribute('data-grid');
          }
        }
      };

      if (window.innerWidth < 1280) { finderPage.removeAttribute('data-grid'); } else { finderPage.setAttribute('data-grid', ''); }

      const filteredPrograms = programs.filter((program) => {
        let include = true;

        Object.keys(filters).forEach((filterName) => {
          const filter = filters[filterName];

          if (include === false) {
            return;
          }
          if (filter.length === 0) {
            return;
          }

          include = program[filterName].some(
            (val) => filter.indexOf(val) >= 0,
          );
        });

        if (include) {
          const searchString = search
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');

          if (searchString.length > 0) {
            if (program.searchString.indexOf(searchString) < 0) {
              include = false;
            }
          }
        }

        return include;
      });

      return (
        <div>
          <div className="hero hero--sub overflow-visible invert">
            <div className="wrapper">
              <div className="hero__container">
                <div className="breadcrumbs invert">
                  <div className="py-s">
                    <ul className="reset cluster">
                      <li className="breadcrumbs__home">
                        <a href="#" aria-label="Home page" />
                      </li>
                      <li className="js-program-finder-title">
                        Program Finder
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h1 className="hero__headline js-program-finder-title" />
                  <p className="intro lg:w-75 js-program-finder-intro" />
                  <div className="w-full mt-xl">
                    <Filters
                      programs={programs}
                      filters={filters}
                      setFilters={setFilters}
                      search={search}
                      setSearch={setSearch}
                    />
                  </div>
                  <div>
                    <Result
                      setFilters={setFilters}
                      setSearch={setSearch}
                      resetFiltersAndSearch={resetFiltersAndSearch}
                      filteredPrograms={filteredPrograms}
                      filters={filters}
                      search={search}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="results__main" data-results>

              <div className="flex justify-between">
                <div className="results__message">
                  {filteredPrograms.length}
                  {' '}
                  result
                  {filteredPrograms.length === 1 ? '' : 's'}
                  {' '}
                  based on your
                  selections
                </div>
                <div className="results__toggle-view">
                  <button
                    className="button-program-toggle"
                    data-view="grid"
                    onClick={handleToggle}
                    aria-label="Grid View"
                  >
                    <span className="material-symbols-outlined">
                      apps
                    </span>
                  </button>
                  <button
                    className="button-program-toggle"
                    data-view="list"
                    onClick={handleToggle}
                    aria-label="List View"
                  >
                    <span className="material-symbols-outlined">
                      menu
                    </span>
                  </button>
                </div>
              </div>

              <ul className="reset results__list">
                {filteredPrograms.length > 0 ? (
                  ''
                ) : (
                  <p>No Matches</p>
                )}
                {filteredPrograms.map((c) => (
                  <Program key={c.key} programs={c} />
                ))}
              </ul>

              {/* <ul className="reset c-pagination cluster mt-m-l">
                <li><a className="active" href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>...</li>
                <li><a href="#" className="c-pagination--next"><span className="screen-reader-text">Next page of results</span></a></li>
              </ul> */}
            </div>
          </div>
        </div>
      );
    }

    const App = <OnlineProgramsFinder programs={programs} />;

    render(App, finderPage);

    const finderTitle = finderPage.dataset.programFinderTitle;
    const finderIntro = finderPage.dataset.programFinderIntro;
    document.querySelector('.js-program-finder-title').innerHTML = finderTitle;
    document.querySelector('.js-program-finder-intro').innerHTML = finderIntro;
  })();
}
