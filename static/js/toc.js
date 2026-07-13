(function () {
  var links = document.querySelectorAll(".toc-wrap nav a");
  if (!links.length) return;

  var headings = Array.prototype.map.call(links, function (a) {
    var id = decodeURIComponent(a.getAttribute("href").replace("#", ""));
    return document.getElementById(id);
  }).filter(Boolean);

  function onScroll() {
    var y = window.scrollY + 160;
    var activeIndex = 0;
    headings.forEach(function (h, i) {
      if (h.offsetTop <= y) activeIndex = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle("active", i === activeIndex);
    });
  }

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
