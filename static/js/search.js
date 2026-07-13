(function () {
  var overlay = document.getElementById("search-overlay");
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  var trigger = document.getElementById("search-trigger");
  if (!overlay || !input || !results) return;

  var index = null;
  var activeIndex = -1;
  var rows = [];

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(window.searchIndexURL || "/index.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data;
        return data;
      })
      .catch(function () {
        index = [];
        return index;
      });
  }

  function open() {
    overlay.hidden = false;
    input.value = "";
    results.innerHTML = "";
    loadIndex().then(renderRecent);
    setTimeout(function () { input.focus(); }, 0);
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function renderRecent(data) {
    var recent = data.slice(0, 8);
    paint(recent, "Recent");
  }

  function paint(items, emptyLabel) {
    activeIndex = -1;
    if (!items.length) {
      results.innerHTML = '<div class="search-empty">No matches for "' + escapeHTML(input.value) + '".</div>';
      rows = [];
      return;
    }
    results.innerHTML = items.map(function (item, i) {
      return '<a class="s-row" data-i="' + i + '" href="' + item.url + '">' +
        '<span>' + escapeHTML(item.title) + '</span>' +
        '<span class="r-type">' + escapeHTML(item.section) + '</span>' +
        '</a>';
    }).join("");
    rows = Array.prototype.slice.call(results.querySelectorAll(".s-row"));
  }

  function escapeHTML(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function doSearch(q) {
    loadIndex().then(function (data) {
      if (!q) { renderRecent(data); return; }
      var needle = q.toLowerCase();
      var matches = data.filter(function (item) {
        return (
          item.title.toLowerCase().indexOf(needle) !== -1 ||
          (item.summary || "").toLowerCase().indexOf(needle) !== -1 ||
          (item.tags || []).join(" ").toLowerCase().indexOf(needle) !== -1
        );
      }).slice(0, 12);
      paint(matches);
    });
  }

  function move(delta) {
    if (!rows.length) return;
    activeIndex = (activeIndex + delta + rows.length) % rows.length;
    rows.forEach(function (r, i) { r.classList.toggle("active", i === activeIndex); });
    rows[activeIndex].scrollIntoView({ block: "nearest" });
  }

  if (trigger) trigger.addEventListener("click", open);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
  input.addEventListener("input", function () { doSearch(input.value.trim()); });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") {
      e.preventDefault();
      var target = activeIndex >= 0 ? rows[activeIndex] : rows[0];
      if (target) window.location.href = target.getAttribute("href");
    } else if (e.key === "Escape") {
      close();
    }
  });

  document.addEventListener("keydown", function (e) {
    var isK = e.key === "k" || e.key === "K";
    if ((e.metaKey || e.ctrlKey) && isK) {
      e.preventDefault();
      overlay.hidden ? open() : close();
    } else if (e.key === "Escape" && !overlay.hidden) {
      close();
    }
  });
})();
