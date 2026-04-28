// ==============================================
// THE WAY OF OLEM DIGA - MAIN SCRIPT
// ==============================================

(function() {
    'use strict';

    const DEBUG = false;
    function log(...args) { if (DEBUG) console.log('[TheWay]', ...args); }
    function error(...args) { console.error('[TheWay]', ...args); }

    // Site structure with root‑relative paths (starting with /)
    const siteStructure = [
        { type: 'main', items: [
            { name: 'Home', url: '/' },
            { name: 'Why This Exists', url: '/begin.html' }
        ]},
        { type: 'separator' },
        { id: 'anchors', label: '· Anchors ·', items: [
            { name: 'Inevitability', url: '/anchors/inevitability.html' },
            { name: 'Future Self', url: '/anchors/future-self.html' },
            { name: 'AuDHD: Dual‑Booting Brain', url: '/anchors/audhd.html' }
        ]},
        { type: 'separator' },
        { id: 'foundation', label: 'Ⅰ · Foundation', items: [
            { name: '01. My Operating System', url: '/01-foundation/01-operating-system/index.html' },
            { name: '02. My Physical Environment', url: '/01-foundation/02-physical-environment/index.html' },
            { name: '03. My Internal Resources', url: '/01-foundation/03-internal-resources/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-fund', label: '', items: [
            { name: 'Foundation Check', url: '/threshold/foundation-check.html' }
        ]},
        { type: 'separator' },
        { id: 'depth', label: 'Ⅱ · Depth', items: [
            { name: '04. The Shadow Inventory', url: '/02-depth/01-shadow-inventory/index.html' },
            { name: '05. Pressure and Resilience', url: '/02-depth/02-pressure-and-resilience/index.html' },
            { name: '06. The Ripple Map', url: '/02-depth/03-ripple-map/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-depth', label: '', items: [
            { name: 'Depth Check', url: '/threshold/depth-check.html' }
        ]},
        { type: 'separator' },
        { id: 'construction', label: 'Ⅲ · Construction', items: [
            { name: '07. Exploration and Focus', url: '/03-construction/01-exploration-and-focus/index.html' },
            { name: '08. Deep Work', url: '/03-construction/02-deep-work/index.html' },
            { name: '09. Sustainable Systems', url: '/03-construction/03-sustainable-systems/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-const', label: '', items: [
            { name: 'Construction Check', url: '/threshold/construction-check.html' }
        ]},
        { type: 'separator' },
        { id: 'legacy', label: 'Ⅳ · Legacy', items: [
            { name: '10. Moving Through the World', url: '/04-legacy/01-moving-through-the-world/index.html' },
            { name: '11. Relationships and Repair', url: '/04-legacy/02-relationships-and-repair/index.html' },
            { name: '12. What Remains', url: '/04-legacy/03-what-remains/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-leg', label: '', items: [
            { name: 'Legacy Check', url: '/threshold/legacy-check.html' }
        ]}
    ];

    function generateNavigationSidebar() {
        let html = '';
        for (const section of siteStructure) {
            if (section.type === 'separator') {
                if (section.label) {
                    html += `<li class="nav-category">${escapeHtml(section.label)}</li>`;
                } else {
                    html += `<li class="nav-category" style="list-style: none;">&nbsp;</li>`;
                }
                continue;
            }
            if (section.items) {
                if (section.label && !section.label.startsWith('·')) {
                    html += `<li class="nav-category">${escapeHtml(section.label)}</li>`;
                }
                for (const item of section.items) {
                    // Use the URL as is (root‑relative)
                    const activeClass = (item.url === window.location.pathname) ? 'active' : '';
                    html += `<li><a href="${escapeHtml(item.url)}" class="${activeClass}">${escapeHtml(item.name)}</a></li>`;
                }
            }
        }
        return html;
    }

    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    function initPage() {
        const navContainer = document.getElementById('navLinks');
        if (navContainer) {
            navContainer.innerHTML = generateNavigationSidebar();
        }
        initProgressBar();
        initNavigationToggle();
        highlightCurrentPage();
    }

    function highlightCurrentPage() {
        const current = window.location.pathname;
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }

    function initProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const progressBar = document.querySelector('.progress');
        if (!progressFill || !progressBar) return;

        const update = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressFill.style.width = scrolled + '%';
            if (winScroll > 100) {
                progressBar.style.opacity = '1';
                progressBar.style.visibility = 'visible';
            } else {
                progressBar.style.opacity = '0';
                progressBar.style.visibility = 'hidden';
            }
        };
        window.addEventListener('scroll', update);
        update();
    }

    function initNavigationToggle() {
        const toggle = document.getElementById('navToggle');
        const sidenav = document.getElementById('sidenav');
        if (!toggle || !sidenav) return;
        toggle.onclick = (e) => {
            e.preventDefault();
            sidenav.classList.toggle('open');
        };
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && sidenav.classList.contains('open') &&
                !sidenav.contains(e.target) && !toggle.contains(e.target)) {
                sidenav.classList.remove('open');
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) sidenav.classList.remove('open');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }
})();
