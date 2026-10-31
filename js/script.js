(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var tags = function (list) {
    return '<ul class="tags">' + (list || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  };
  var repo = function (link, label) {
    return link
      ? '<a class="repo-link" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(label || "View on GitHub") + "</a>"
      : '<span class="repo-none">Code available on request</span>';
  };

  /* ---------- Header: mobile menu, border on scroll, current section ---------- */
  var header = $(".site-header");
  var nav = $("#nav");
  var toggle = $(".menu-toggle");

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
  $$("a", nav).forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  });

  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var links = $$("a", nav);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          if (l.getAttribute("href") === "#" + e.target.id) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Featured projects ---------- */
  var projects = window.PROJECTS || [];
  var featuredEl = $("#featured");
  featuredEl.innerHTML = projects.filter(function (p) { return p.featured; }).map(function (p) {
    return '<article class="case">' +
      "<div>" +
        '<p class="case-course">' + esc(p.course) + "</p>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<dl>" +
          "<div><dt>The problem</dt><dd>" + esc(p.problem) + "</dd></div>" +
          "<div><dt>What I built</dt><dd>" + esc(p.approach) + "</dd></div>" +
          "<div><dt>Result</dt><dd>" + esc(p.outcome) + "</dd></div>" +
        "</dl>" +
        tags(p.tech) +
      "</div>" +
      '<div class="case-side">' +
        (p.result ? '<p class="case-result"><strong>' + esc(p.result.value) + "</strong><span>" + esc(p.result.label) + "</span></p>" : "") +
        repo(p.link) +
      "</div>" +
    "</article>";
  }).join("");

  /* ---------- All projects: filter + search ---------- */
  var others = projects.filter(function (p) { return !p.featured; });
  var all = projects; // the list shows every project, featured ones included
  var listEl = $("#project-list");
  var pFilters = $("#project-filters");
  var searchEl = $("#project-search");
  var pState = { cat: "all", q: "" };

  var cats = (window.CATEGORIES || []).filter(function (c) {
    return c.id === "all" || all.some(function (p) { return p.categories.indexOf(c.id) > -1; });
  });
  pFilters.innerHTML = cats.map(function (c) {
    var n = c.id === "all" ? all.length : all.filter(function (p) { return p.categories.indexOf(c.id) > -1; }).length;
    return '<button type="button" class="filter" data-cat="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' +
      esc(c.label) + '<span class="count">' + n + "</span></button>";
  }).join("");

  var renderProjects = function () {
    var q = pState.q.toLowerCase();
    var list = all.filter(function (p) {
      var inCat = pState.cat === "all" || p.categories.indexOf(pState.cat) > -1;
      var text = [p.title, p.course, p.summary, p.approach, (p.tech || []).join(" ")].join(" ").toLowerCase();
      return inCat && (!q || text.indexOf(q) > -1);
    });
    listEl.innerHTML = list.length ? list.map(function (p) {
      return '<li class="project-row">' +
        "<div><h4>" + esc(p.title) + '</h4><p class="case-course">' + esc(p.course) + "</p></div>" +
        "<div><p>" + esc(p.summary || p.outcome) + "</p>" + tags(p.tech) + "</div>" +
        "<div>" + repo(p.link, "GitHub") + "</div>" +
      "</li>";
    }).join("") : '<li class="empty">No projects match "' + esc(pState.q) + '". Try another word or choose All.</li>';
  };
  pFilters.addEventListener("click", function (e) {
    var b = e.target.closest(".filter"); if (!b) return;
    pState.cat = b.dataset.cat;
    $$(".filter", pFilters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    renderProjects();
  });
  searchEl.addEventListener("input", function () { pState.q = searchEl.value.trim(); renderProjects(); });
  renderProjects();

  /* ---------- Coursework timeline ---------- */
  $("#semesters").innerHTML = (window.SEMESTERS || []).map(function (s) {
    return '<li class="semester' + (s.now ? " now" : "") + '">' +
      '<p class="semester-term">' + esc(s.term) + (s.now ? "<em>Now</em>" : "") + "</p>" +
      '<p class="semester-courses">' + s.courses.map(esc).join(", ") + "</p>" +
    "</li>";
  }).join("");

  /* ---------- Experience ---------- */
  $("#experience-list").innerHTML = (window.EXPERIENCE || []).map(function (x) {
    return '<li class="exp' + (x.image ? " has-img" : "") + '">' +
      '<p class="exp-date">' + esc(x.date) + "</p>" +
      '<div class="exp-body"><h3>' + esc(x.role) + '</h3><p class="exp-org">' + esc(x.org) + "</p><p>" + esc(x.text) + "</p></div>" +
      (x.image ? '<button type="button" class="exp-photo" data-src="' + esc(x.image) + '" data-caption="' + esc(x.imageAlt || x.org) +
        '" aria-label="View photo: ' + esc(x.imageAlt || x.org) + '"><img src="' + esc(x.image) + '" alt="" loading="lazy"></button>' : "") +
    "</li>";
  }).join("");

  /* ---------- Papers ---------- */
  $("#papers").innerHTML = (window.PAPERS || []).map(function (p) {
    var action = p.link
      ? '<a class="repo-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || "Read paper") + "</a>"
      : '<a class="repo-link" href="mailto:dana.mounayer@gmail.com?subject=' + encodeURIComponent("Paper: " + p.title) + '">Request a copy</a>';
    return '<article class="paper"><h3>' + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" + action + "</article>";
  }).join("");

  /* ---------- Skills ---------- */
  $("#skill-groups").innerHTML = (window.SKILLS || []).map(function (g) {
    return '<div class="skill-group"><h3>' + esc(g.group) + "</h3><ul>" +
      g.items.map(function (i) { return "<li><strong>" + esc(i[0]) + "</strong><span>" + esc(i[1]) + "</span></li>"; }).join("") +
      "</ul></div>";
  }).join("");

  /* ---------- Certificates ---------- */
  var certs = window.CERTIFICATES || [];
  var certGrid = $("#cert-grid");
  var certFilters = $("#cert-filters");
  var LIMIT = 12;
  var cState = { group: "all", all: false };

  var groups = (window.CERT_GROUPS || []).filter(function (g) {
    return g.id === "all" || certs.some(function (c) { return c.group === g.id; });
  });
  // a single category needs no filter row
  if (groups.length > 2) {
    certFilters.innerHTML = groups.map(function (g) {
      var n = g.id === "all" ? certs.length : certs.filter(function (c) { return c.group === g.id; }).length;
      return '<button type="button" class="filter" data-group="' + g.id + '" aria-pressed="' + (g.id === "all") + '">' +
        esc(g.label) + '<span class="count">' + n + "</span></button>";
    }).join("");
  } else {
    certFilters.hidden = true;
  }

  var ordered = certs.slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
  var certCard = function (c) {
    var thumb = c.image
      ? '<button type="button" class="cert-thumb" data-src="' + esc(c.image) + '" data-caption="' + esc(c.title + ", " + c.issuer) +
        '" aria-label="View certificate: ' + esc(c.title) + '"><img src="' + esc(c.image) + '" alt="" loading="lazy" decoding="async"></button>'
      : '<div class="cert-thumb noimg" aria-hidden="true"><span class="seal">' + esc(c.issuer.charAt(0)) + "</span></div>";
    return '<article class="cert">' + thumb +
      '<div class="cert-body">' +
        '<p class="cert-meta"><span>' + esc(c.kind) + "</span><span>" + esc(c.date) + "</span></p>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<p class="cert-issuer">' + esc(c.issuer) + "</p>" +
        (c.verify ? '<a class="cert-verify" href="' + esc(c.verify) + '" target="_blank" rel="noopener">Verify certificate</a>' : "") +
      "</div></article>";
  };
  var renderCerts = function () {
    var list = ordered.filter(function (c) { return cState.group === "all" || c.group === cState.group; });
    var shown = cState.all ? list : list.slice(0, LIMIT);
    certGrid.innerHTML = shown.map(certCard).join("") +
      (list.length > LIMIT
        ? '<button type="button" class="btn btn-line cert-more" aria-expanded="' + cState.all + '">' +
          (cState.all ? "Show fewer" : "Show all " + list.length + " certificates") + "</button>"
        : "");
  };
  certFilters.addEventListener("click", function (e) {
    var b = e.target.closest(".filter"); if (!b) return;
    cState.group = b.dataset.group; cState.all = false;
    $$(".filter", certFilters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    renderCerts();
  });

  /* lightbox */
  var box = $("#lightbox");
  certGrid.addEventListener("click", function (e) {
    if (e.target.closest(".cert-more")) { cState.all = !cState.all; renderCerts(); return; }
    var t = e.target.closest(".cert-thumb[data-src]");
    if (!t) return;
    if (typeof box.showModal !== "function") { window.open(t.dataset.src, "_blank"); return; }
    $("img", box).src = t.dataset.src;
    $("img", box).alt = t.dataset.caption;
    $(".lightbox-caption", box).textContent = t.dataset.caption;
    box.showModal();
  });
  $("#experience-list").addEventListener("click", function (e) {
    var t = e.target.closest(".exp-photo"); if (!t || typeof box.showModal !== "function") return;
    $("img", box).src = t.dataset.src; $("img", box).alt = t.dataset.caption;
    $(".lightbox-caption", box).textContent = t.dataset.caption; box.showModal();
  });
  $(".lightbox-close", box).addEventListener("click", function () { box.close(); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  renderCerts();

  $("#year").textContent = new Date().getFullYear();
})();
