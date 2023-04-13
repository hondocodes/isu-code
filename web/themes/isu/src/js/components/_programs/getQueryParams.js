import 'url-search-params-polyfill';

export function setQueryParams(filters, search) {
    const searchParams = new URLSearchParams();
    searchParams.set('search', search);
    Object.keys(filters).forEach((filterName) => {
        if (filterName != 'date') {
            const filterVals = filters[filterName];
            searchParams.set(filterName, filterVals.join(';'));
        }
    })
    const newUrl = decodeURIComponent(
        `${window.location.pathname}?${encodeURIComponent(searchParams)}`
    )
    window.history.pushState({}, '', newUrl);
}

export function getQueryParams() {
    const searchParams = new URLSearchParams(window.location.search);

    const preFilterSearch = searchParams.get('search');
    const preFilterDegree = searchParams.get('degree');
    const preFilterInterest = searchParams.get('interest');
    const preFilterCollege = searchParams.get('college');
    const preFilterLocation = searchParams.get('location');

    const preFilterFilters = {}

    if (preFilterDegree) {
        const values = preFilterDegree.split(';')
        preFilterFilters.degree = values;
    }

    if (preFilterInterest) {
        const values = preFilterInterest.split(';')
        preFilterFilters.interest = values;
    }

    if (preFilterCollege) {
        const values = preFilterCollege.split(';')
        preFilterFilters.college = values;
    }

    if (preFilterLocation) {
        const values = preFilterLocation.split(';')
        preFilterFilters.location = values;
    }

    return { preFilterSearch, preFilterFilters }
}
