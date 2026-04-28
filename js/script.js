(function () {
  'use strict';

  var scriptSrc = document.currentScript ? document.currentScript.src : '';
  var baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/script.js'));

  var navStructure = [
    { href: 'index.html', text: 'Home' },
    { href: 'begin.html', text: 'Why This Exists' },
    { text: '·· Anchors ··', isCategory: true },
    { href: 'anchors/inevitability.html', text: 'Inevitability' },
    { href: 'anchors/future-self.html', text: 'Future Self' },
    { href: 'anchors/audhd.html', text: 'AuDHD: Dual‑Booting Brain' },   // <-- ONLY ADDED THIS LINE
    { text: 'Ⅰ · Foundation', isCategory: true },
    { href: '01-foundation/01-operating-system/', text: '01. My Operating System' },
    { href: '01-foundation/02-physical-environment/', text: '02. My Physical Environment' },
    { href: '01-foundation/03-internal-resources/', text: '03. My Internal Resources' },
    { text: '· Threshold ·', isCategory: true },
    { href: 'threshold/foundation-check.html', text: 'Foundation Check' },
    { text: 'Ⅱ · Depth', isCategory: true },
    { href: '02-depth/01-shadow-inventory/', text: '04. The Shadow Inventory' },
    { href: '02-depth/02-pressure-and-resilience/', text: '05. Pressure and Resilience' },
    { href: '02-depth/03-ripple-map/', text: '06. The Ripple Map' },
    { text: '· Threshold ·', isCategory: true },
    { href: 'threshold/depth-check.html', text: 'Depth Check' },
    { text: 'Ⅲ · Construction', isCategory: true },
    { href: '03-construction/01-exploration-and-focus/', text: '07. Exploration and Focus' },
    { href: '03-construction/02-deep-work/', text: '08. Deep Work' },
    { href: '03-construction/03-sustainable-systems/', text: '09. Sustainable Systems' },
    { text: '· Threshold ·', isCategory: true },
    { href: 'threshold/construction-check.html', text: 'Construction Check' },
    { text: 'Ⅳ · Legacy', isCategory: true },
    { href: '04-legacy/01-moving-through-the-world/', text: '10. Moving Through the World' },
    { href: '04-legacy/02-relationships-and-repair/', text: '11. Relationships and Repair' },
    { href: '04-legacy/03-what-remains/', text: '12. What Remains' },
    { text: '· Threshold ·', isCategory: true },
    { href: 'threshold/legacy-check.html', text: 'Legacy Check' }
  ];

  function populateNav() {
    var navList = document.getElementById('navLinks');
    if (!navList) return;

    var currentPage = window.location.href.replace(/\/$/, '');
    var linksHTML = '';

    navStructure.forEach(function (item) {
      if (item.isCategory) {
        linksHTML += '<li class="nav-category">' + item.text + '</li>';
      } else {
        var absoluteHref = baseUrl + '/' + item.href.replace(/\/$/, '');
        var isActive = currentPage.startsWith(absoluteHref) ? ' active' : '';
        linksHTML += '<li><a href="' + absoluteHref + '" class="' + isActive + '">' + item.text + '</a></li>';
      }
    });

    navList.innerHTML = linksHTML;
  }

  function initProgressBar() {
    var fill = document.getElementById('progressFill');
    if (!fill) return;
    window.addEventListener('scroll', function () {
      var winScroll = document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      fill.style.width = scrolled + '%';
    });
  }

  function init() {
    populateNav();
    initProgressBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
