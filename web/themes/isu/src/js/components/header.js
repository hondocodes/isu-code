const $header = document.querySelector("[data-header]");

if ($header) {
  const scrollLimit = getComputedStyle(
    document.documentElement,
    null
  ).getPropertyValue("--js__scroll-gap");

  let lastScroll = 0;
  const checkNavbar = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = top > lastScroll;
    const type = $header.dataset.header;

    if (top >= scrollLimit && scrollingDown && type !== "hidden")
    $header.dataset.header = "hidden";
    else if (top >= scrollLimit && !scrollingDown && type !== "sticky")
    $header.dataset.header = "sticky";
    else if (top < scrollLimit && type) $header.dataset.header = "hidden";

    lastScroll = top <= 0 ? 0 : top;
  };
  window.addEventListener("scroll", (e) => requestAnimationFrame(checkNavbar));
  checkNavbar();
}
