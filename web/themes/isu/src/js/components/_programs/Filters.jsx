import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import Search from './Search';

function Filter(props) {
  const opts = Object.keys(props.programs.map((c) => c[props.target]).reduce((acc, opts) => [
    ...acc,
    ...opts,
  ], [])
    .filter((a) => a)
    .reduce((acc, opt) => Object.assign(acc, { [opt]: true }), {}))
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

  const currentFilters = props.filters[props.target] || [];

  const handleOptionClick = (option) => () => {
    const active = currentFilters.indexOf(option) > -1;

    if (active) {
      const newFilters = currentFilters.filter((i) => i !== option);
      props.setFilters({ ...props.filters, [props.target]: newFilters });
    } else {
      const newFilters = [
        ...currentFilters,
        option,
      ];
      props.setFilters({ ...props.filters, [props.target]: newFilters });
    }
  };

  const node = useRef();

  const [open,
    setOpen] = useState(false);

  const topClasses = open
    ? 'true'
    : 'false';

  const handleClick = (e) => {
    if (node.current.contains(e.target)) { return; }
    setOpen(false);
  };

  const handleKeydown = (e) => {
    if ((node.current.contains(e.target)) && (e.keyCode === 27)) {
      setOpen(false);
      node.current.querySelector('.filter__toggle').focus();
    }
  };

  const handleKeyup = (e) => {
    if ((!node.current.contains(e.target)) && (e.keyCode === 9)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return (
    <div className="filter__item" ref={node}>
      <button className="filter__toggle" aria-expanded={topClasses} onClick={(e) => setOpen(!open)}>{props.title}</button>
      <div className="filter__list">
        {opts.map((opt) => (
          <label className={`filter__label-c-alt ${opt.replace(/\s+/g, '-').toLowerCase()}`} onChange={handleOptionClick(opt)}>
            <input type="checkbox" checked={currentFilters.indexOf(opt) > -1} />
            <span className="filter__checkbox-alt" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function FilterList(props) {
  const opts = Object.keys(
    props.programs
      .map((c) => c[props.target])
      .reduce((acc, opts) => [...acc, ...opts], [])
      .filter((a) => a)
      .reduce((acc, opt) => Object.assign(acc, { [opt]: true }), {}),
  ).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

  const currentFilters = props.filters[props.target] || [];

  const handleOptionClick = (option) => () => {
    const active = currentFilters.indexOf(option) > -1;

    if (active) {
      const newFilters = currentFilters.filter((i) => i !== option);
      props.setFilters({ ...props.filters, [props.target]: newFilters });
    } else {
      const newFilters = [...currentFilters, option];
      props.setFilters({ ...props.filters, [props.target]: newFilters });
    }
  };

  const node = useRef();

  const [open, setOpen] = useState(false);

  const topClasses = open ? 'true' : 'false';

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const handleKeydown = (e) => {
    if (node.current.contains(e.target) && e.keyCode === 27) {
      setOpen(false);
      node.current.querySelector('.filter__toggle').focus();
    }
  };

  const handleKeyup = (e) => {
    if (!node.current.contains(e.target) && e.keyCode === 9) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return (
    <ul className="reset flex flex-col gap-m lg:flex-row" ref={node}>
      {opts.map((opt) => (
        <li>
          <label
            className="filter__label-c"
            onChange={handleOptionClick(opt)}
          >
            <input
              type="checkbox"
              checked={
                                        currentFilters.indexOf(opt) > -1
                                    }
            />
            <span className="filter__checkbox" />
            {opt}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function Filters(props) {
  return (
    <div className="flow">
      <Search {...props} />

      <div className="flex flex-col gap-m pb-l lg:flex-row lg:items-center">
        <Filter
          title="Degree Level"
          target="degree"
          {...props}
        />
        <Filter
          title="Area of Interest"
          target="interest"
          {...props}
        />
        <Filter
          title="College"
          target="college"
          {...props}
        />
        <FilterList
          title="Location"
          target="location"
          {...props}
        />
      </div>
    </div>
  );
}
