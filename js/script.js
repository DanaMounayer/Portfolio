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

  /* ---------- Light / dark theme ---------- */
  var themeBtn = $(".theme-toggle");
  var root = document.documentElement;
  var syncThemeBtn = function () {
    var dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };
  themeBtn.addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") !== "dark";
    if (dark) root.setAttribute("data-theme", "dark"); else root.removeAttribute("data-theme");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
    syncThemeBtn();
  });
  syncThemeBtn();

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

  /* ---------- Image viewer (shared by certificates and volunteering) ---------- */
  var box = $("#lightbox");
  var galleries = {};
  var view = { list: [], i: 0 };
  var gid = 0;
  var registerGallery = function (list) { var id = "g" + (gid++); galleries[id] = list; return id; };
  var showView = function () {
    var it = view.list[view.i];
    $("img", box).src = it.src;
    $("img", box).alt = it.caption;
    $(".lightbox-caption", box).textContent = it.caption + (view.list.length > 1 ? "  (" + (view.i + 1) + " of " + view.list.length + ")" : "");
    $$(".lightbox-nav", box).forEach(function (b) { b.hidden = view.list.length < 2; });
  };
  var openGallery = function (id, start) {
    var list = galleries[id]; if (!list) return;
    if (typeof box.showModal !== "function") { window.open(list[0].src, "_blank"); return; }
    view.list = list; view.i = start || 0; showView(); box.showModal();
  };
  $$(".lightbox-nav", box).forEach(function (b) {
    b.addEventListener("click", function () {
      view.i = (view.i + Number(b.dataset.step) + view.list.length) % view.list.length; showView();
    });
  });
  box.addEventListener("keydown", function (e) {
    if (view.list.length < 2) return;
    if (e.key === "ArrowRight") { view.i = (view.i + 1) % view.list.length; showView(); }
    if (e.key === "ArrowLeft") { view.i = (view.i - 1 + view.list.length) % view.list.length; showView(); }
  });
  $(".lightbox-close", box).addEventListener("click", function () { box.close(); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-gallery]"); if (!t) return;
    openGallery(t.dataset.gallery, Number(t.dataset.index || 0));
  });

  /* ---------- Experience ---------- */
  $("#experience-list").innerHTML = (window.EXPERIENCE || []).map(function (x) {
    return '<li class="exp">' +
      '<p class="exp-date">' + esc(x.date) + "</p>" +
      '<div class="exp-body"><h3>' + esc(x.role) + '</h3><p class="exp-org">' + esc(x.org) + "</p><p>" + esc(x.text) + "</p></div>" +
    "</li>";
  }).join("");

  /* ---------- Volunteering ---------- */
  $("#volunteer-grid").innerHTML = (window.VOLUNTEERING || []).map(function (v) {
    var imgs = v.images || [];
    var id = registerGallery(imgs);
    var cover = imgs.length
      ? '<button type="button" class="vol-cover" data-gallery="' + id + '" aria-label="View photos: ' + esc(v.org) + '">' +
          '<img src="' + esc(imgs[0].src) + '" alt="" loading="lazy">' +
          (imgs.length > 1 ? '<span class="vol-count">' + imgs.length + " photos</span>" : "") +
        "</button>"
      : "";
    var meta = [v.date, v.hours].filter(Boolean).map(esc).join(" · ");
    return '<article class="vol">' + cover +
      '<div class="vol-body">' +
        (meta ? '<p class="vol-meta">' + meta + "</p>" : "") +
        "<h4>" + esc(v.org) + "</h4>" +
        '<p class="vol-cause">' + esc(v.cause) + "</p>" +
        "<p>" + esc(v.text) + "</p>" +
      "</div></article>";
  }).join("");

  /* ---------- Papers ---------- */
  $("#papers").innerHTML = (window.PAPERS || []).map(function (p, k) {
    return '<article class="paper' + (k === 0 ? " paper-lead" : "") + '">' +
      '<a class="paper-figure" href="' + esc(p.file) + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">' +
        '<img src="' + esc(p.image) + '" alt="" loading="lazy"></a>' +
      '<div class="paper-body">' +
        '<p class="paper-meta"><span>' + esc(p.course) + "</span><span>" + esc(p.term) + "</span></p>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.finding) + "</p>" +
        (p.authors ? '<p class="paper-authors">' + esc(p.authors) + "</p>" : "") +
        '<a class="repo-link" href="' + esc(p.file) + '" target="_blank" rel="noopener">Read the paper (PDF)</a>' +
      "</div></article>";
  }).join("");

  /* ---------- Skills: a small neural network ---------- */
  var layers = window.SKILLS || [];
  var net = $("#skill-net");
  var svg = $(".net-edges", net);
  $("#skill-layers").innerHTML = layers.map(function (l, li) {
    return '<div class="layer">' +
      '<p class="layer-name"><span>' + esc(l.layer) + "</span>" + esc(l.group) + "</p>" +
      '<ul class="nodes">' + l.items.map(function (it, ni) {
        return '<li><button type="button" class="node" data-l="' + li + '" data-n="' + ni + '">' + esc(it) + "</button></li>";
      }).join("") + "</ul></div>";
  }).join("");

  var NS = "http://www.w3.org/2000/svg";
  var drawEdges = function () {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (window.matchMedia("(max-width: 820px)").matches) return;
    var box0 = net.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + box0.width + " " + box0.height);
    var cols = $$(".layer", net).map(function (layer) {
      return $$(".node", layer).map(function (n) {
        var r = n.getBoundingClientRect();
        return { el: n, l: n.dataset.l, n: n.dataset.n,
          left: r.left - box0.left, right: r.right - box0.left, y: r.top - box0.top + r.height / 2 };
      });
    });
    for (var c = 0; c < cols.length - 1; c++) {
      cols[c].forEach(function (a) {
        cols[c + 1].forEach(function (b) {
          var path = document.createElementNS(NS, "path");
          var mx = (a.right + b.left) / 2;
          path.setAttribute("d", "M" + a.right + "," + a.y + " C" + mx + "," + a.y + " " + mx + "," + b.y + " " + b.left + "," + b.y);
          path.setAttribute("data-a", a.l + "-" + a.n);
          path.setAttribute("data-b", b.l + "-" + b.n);
          svg.appendChild(path);
        });
      });
    }
  };
  var focusNode = function (n) {
    var key = n ? n.dataset.l + "-" + n.dataset.n : null;
    net.classList.toggle("focusing", !!key);
    $$("path", svg).forEach(function (p) {
      p.classList.toggle("on", !!key && (p.getAttribute("data-a") === key || p.getAttribute("data-b") === key));
    });
    $$(".node", net).forEach(function (x) { x.classList.toggle("on", x === n); });
  };
  net.addEventListener("mouseover", function (e) { var n = e.target.closest(".node"); if (n) focusNode(n); });
  net.addEventListener("focusin", function (e) { var n = e.target.closest(".node"); if (n) focusNode(n); });
  net.addEventListener("mouseleave", function () { focusNode(null); });
  net.addEventListener("focusout", function (e) { if (!net.contains(e.relatedTarget)) focusNode(null); });
  var raf;
  window.addEventListener("resize", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(drawEdges); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawEdges);
  drawEdges();

  /* ---------- Certificates ---------- */
  var certs = window.CERTIFICATES || [];
  var certGrid = $("#cert-grid");
  var certFilters = $("#cert-filters");
  var LIMIT = 12;
  var cState = { group: "all", all: false };

  var groups = (window.CERT_GROUPS || []).filter(function (g) {
    return g.id === "all" || certs.some(function (c) { return c.group === g.id; });
  });
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
  ordered.forEach(function (c) {
    var list = c.images || (c.image ? [{ src: c.image, caption: c.title + ", " + c.issuer }] : []);
    c._gallery = list.length ? registerGallery(list) : null;
    c._list = list;
  });
  var certCard = function (c) {
    var thumb;
    if (c._list.length > 1) {
      thumb = '<button type="button" class="cert-thumb stack" data-gallery="' + c._gallery + '" aria-label="View ' + c._list.length + " certificates: " + esc(c.title) + '">' +
        c._list.slice(0, 4).map(function (im, k) { return '<img class="s' + k + '" src="' + esc(im.src) + '" alt="" loading="lazy">'; }).join("") +
        "</button>";
    } else if (c._list.length) {
      thumb = '<button type="button" class="cert-thumb" data-gallery="' + c._gallery + '" aria-label="View certificate: ' + esc(c.title) + '">' +
        '<img src="' + esc(c._list[0].src) + '" alt="" loading="lazy" decoding="async"></button>';
    } else {
      thumb = '<div class="cert-thumb noimg" aria-hidden="true"><span class="seal">' + esc(c.issuer.charAt(0)) + "</span></div>";
    }
    return '<article class="cert">' + thumb +
      '<div class="cert-body">' +
        '<p class="cert-meta"><span>' + esc(c.kind) + "</span><span>" + esc(c.date) + "</span></p>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<p class="cert-issuer">' + esc(c.issuer) + "</p>" +
        (c.note ? '<p class="cert-note">' + esc(c.note) + "</p>" : "") +
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
  certGrid.addEventListener("click", function (e) {
    if (e.target.closest(".cert-more")) { cState.all = !cState.all; renderCerts(); }
  });
  renderCerts();

  $("#year").textContent = new Date().getFullYear();
})();
