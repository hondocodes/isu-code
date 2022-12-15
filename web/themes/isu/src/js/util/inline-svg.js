export default (img, cls = '') => {
  const svg = require(`../../svg/${img}.svg`); // eslint-disable-line
  return `<span class="svg svg--${img} ${cls}">${svg}</span>`;
};
