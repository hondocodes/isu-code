import { h, createRef } from 'preact';
import { useState } from 'preact/hooks';

export default function Program(props) {
  const [open, setOpen] = useState(false);

  const topClasses = open ? 'true' : 'false';

  const programLocations = Object.values(props.programs.location)
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .flat()
    .join(', ');
  const programDegrees = Object.values(props.programs.degree)
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .flat()
    .join(', ');
  const programCollege = Object.values(props.programs.college)
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .flat()
    .join(', ');

  function handleOpenClick(e, open) {
    if (e.target.nodeName != 'A') {
      return setOpen(open);
    }
  }

  return (
    <li className={programCollege.replace(/\s+/g, '-').toLowerCase()}>
      <a
        className="button-program flex gap-2xs justify-end lg:items-center lg:py-xs lg:px-m"
        href={props.programs.url}
      >
        <div className="frame border-radius" data-ratio="3:2">
          <img src={props.programs.image} alt="placeholder" />
          <div className="button-program__box" />
        </div>
        <div className="program__content">
          <div className="program__name-wrapper">
            <h2 className="program__name">
              {props.programs.name}
              {programDegrees ? (
                <span>
                  {' '}
                  (
                  {programDegrees}
                  )
                </span>
              ) : (
                ''
              )}
            </h2>
          </div>

          <div className="program__options">
            {programLocations ? (
              <div className="font-bold text-step-s">
                { programLocations }
              </div>
            ) : (
              ''
            )}
            {programCollege ? (
              <div className="text-step-s">
                { programCollege }
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </a>
    </li>
  );
}
