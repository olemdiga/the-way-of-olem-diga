// ==============================================
// THE WAY OF OLEM DIGA - MAIN SCRIPT
// ==============================================

(function() {
    'use strict';

    // Debug flag - set to true to see console logs
    const DEBUG = false;

    function log(...args) {
        if (DEBUG) console.log('[TheWay]', ...args);
    }

    function error(...args) {
        console.error('[TheWay]', ...args);
    }

    // Helper to get correct asset paths based on current page depth
    function getAssetPath() {
        const path = window.location.pathname;

        // Count directory depth from root
        // Remove leading slash
        let cleanPath = path.replace(/^\//, '');
        // Remove filename if present (contains .html)
        if (cleanPath.includes('.html')) {
            cleanPath = cleanPath.substring(0, cleanPath.lastIndexOf('/'));
        }
        // Count slashes
        const depth = cleanPath.split('/').filter(p => p.length > 0).length;
        
        log('Path depth detected:', depth);
        
        // Root: no prefix
        if (depth === 0) return '';
        // One level deep (e.g., anchors/, threshold/)
        if (depth === 1) return '../';
        // Two levels deep (e.g., 01-foundation/01-operating-system/)
        if (depth >= 2) return '../../';
        
        return '';
    }

    // ==============================================
    // SITEWIDE DATA STRUCTURE
    // ==============================================
    const siteStructure = [
        { type: 'main', items: [
            { name: 'Home', url: 'index.html' },
            { name: 'Why This Exists', url: 'begin.html' }
        ]},
        { type: 'separator' },
        { id: 'anchors', label: '· Anchors ·', items: [
            { name: 'Inevitability', url: 'anchors/inevitability.html' },
            { name: 'Future Self', url: 'anchors/future-self.html' },
            { name: 'AuDHD: Dual‑Booting Brain', url: 'anchors/audhd.html' }
        ]},
        { type: 'separator' },
        { id: 'foundation', label: 'Ⅰ · Foundation', items: [
            { name: '01. My Operating System', url: '01-foundation/01-operating-system/index.html' },
            { name: '02. My Physical Environment', url: '01-foundation/02-physical-environment/index.html' },
            { name: '03. My Internal Resources', url: '01-foundation/03-internal-resources/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-fund', label: '', items: [
            { name: 'Foundation Check', url: 'threshold/foundation-check.html' }
        ]},
        { type: 'separator' },
        { id: 'depth', label: 'Ⅱ · Depth', items: [
            { name: '04. The Shadow Inventory', url: '02-depth/01-shadow-inventory/index.html' },
            { name: '05. Pressure and Resilience', url: '02-depth/02-pressure-and-resilience/index.html' },
            { name: '06. The Ripple Map', url: '02-depth/03-ripple-map/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-depth', label: '', items: [
            { name: 'Depth Check', url: 'threshold/depth-check.html' }
        ]},
        { type: 'separator' },
        { id: 'construction', label: 'Ⅲ · Construction', items: [
            { name: '07. Exploration and Focus', url: '03-construction/01-exploration-and-focus/index.html' },
            { name: '08. Deep Work', url: '03-construction/02-deep-work/index.html' },
            { name: '09. Sustainable Systems', url: '03-construction/03-sustainable-systems/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-const', label: '', items: [
            { name: 'Construction Check', url: 'threshold/construction-check.html' }
        ]},
        { type: 'separator' },
        { id: 'legacy', label: 'Ⅳ · Legacy', items: [
            { name: '10. Moving Through the World', url: '04-legacy/01-moving-through-the-world/index.html' },
            { name: '11. Relationships and Repair', url: '04-legacy/02-relationships-and-repair/index.html' },
            { name: '12. What Remains', url: '04-legacy/03-what-remains/index.html' }
        ]},
        { type: 'separator', label: '· Threshold ·' },
        { id: 'threshold-leg', label: '', items: [
            { name: 'Legacy Check', url: 'threshold/legacy-check.html' }
        ]}
    ];

    // Get current page URL (relative to root)
    function getCurrentPageUrl() {
        const path = window.location.pathname;
        // Remove leading slash
        let relative = path.replace(/^\//, '');
        
        // Handle root
        if (relative === '' || relative === 'index.html') {
            return 'index.html';
        }
        
        return relative;
    }

    // Generate navigation sidebar HTML
    function generateNavigationSidebar() {
        const currentUrl = getCurrentPageUrl();
        log('Current URL:', currentUrl);
        
        let navHtml = '';
        let currentSection = '';
        
        for (const section of siteStructure) {
            // Handle separators
            if (section.type === 'separator') {
                if (section.label) {
                    navHtml += `<li class="nav-category">${escapeHtml(section.label)}</li>`;
                } else {
                    navHtml += `<li class="nav-category" style="list-style: none;">&nbsp;</li>`;
                }
                continue;
            }
            
            // Handle regular nav section with items
            if (section.items) {
                // Add section label if present (not for threshold sections)
                if (section.label && !section.label.startsWith('·')) {
                    navHtml += `<li class="nav-category">${escapeHtml(section.label)}</li>`;
                }
                
                for (const item of section.items) {
                    const isActive = (item.url === currentUrl);
                    const activeClass = isActive ? 'active' : '';
                    
                    // Build URL with correct path prefix based on current page depth
                    let displayUrl = item.url;
                    // If item.url doesn't start with the prefix we need, add it conditionally
                    // This handles links from different depth levels correctly
                    if (!item.url.startsWith('http')) {
                        // Get depth prefix
                        const prefix = getAssetPath();
                        // For root-level files (index.html, begin.html), use empty prefix
                        if (item.url === 'index.html' || item.url === 'begin.html') {
                            displayUrl = item.url;
                        } else {
                            displayUrl = prefix + item.url;
                        }
                    }
                    
                    navHtml += `<li><a href="${escapeHtml(displayUrl)}" class="${activeClass}">${escapeHtml(item.name)}</a></li>`;
                }
            }
        }
        
        return navHtml;
    }

    // Simple HTML escape to prevent XSS
    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
            return c;
        });
    }

    // Initialize page with sidebar and progress bar
    function initPage() {
        log('Initializing page...');
        
        // Inject navigation sidebar
        const navContainer = document.getElementById('navLinks');
        if (navContainer) {
            const navHtml = generateNavigationSidebar();
            navContainer.innerHTML = navHtml;
            log('Sidebar injected successfully');
        } else {
            error('navLinks container not found');
        }
        
        // Initialize progress bar
        initProgressBar();
        
        // Handle active state for navigation toggle
        initNavigationToggle();
        
        // Handle current page highlight (fallback for dynamic content)
        highlightCurrentPage();
    }
    
    // Highlight current page in navigation
    function highlightCurrentPage() {
        const currentUrl = getCurrentPageUrl();
        const allLinks = document.querySelectorAll('.nav-links a');
        
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                // Extract the actual URL from href (remove any prefix paths)
                let cleanHref = href.replace(/^\.\.\/\.\.\//, '').replace(/^\.\.\//, '');
                if (cleanHref === currentUrl) {
                    link.classList.add('active');
                } else {
                    // Also handle case where link might have index.html implicitly
                    if (currentUrl === '' || currentUrl === 'index.html') {
                        if (cleanHref === 'index.html') {
                            link.classList.add('active');
                        }
                    }
                }
            }
        });
    }

    // Initialize progress bar based on scroll position
    function initProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const progressBar = document.querySelector('.progress');
        
        if (!progressFill || !progressBar) {
            log('Progress bar elements not found');
            return;
        }
        
        // Show progress bar after scrolling a little bit
        const checkProgressBarVisibility = () => {
            if (window.scrollY > 100) {
                progressBar.style.opacity = '1';
                progressBar.style.visibility = 'visible';
            } else {
                progressBar.style.opacity = '0';
                progressBar.style.visibility = 'hidden';
            }
        };
        
        const updateProgressBar = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressFill.style.width = scrolled + '%';
        };
        
        window.addEventListener('scroll', () => {
            checkProgressBarVisibility();
            updateProgressBar();
        });
        
        // Initial call
        checkProgressBarVisibility();
        updateProgressBar();
        
        log('Progress bar initialized');
    }
    
    // Initialize navigation toggle for mobile
    function initNavigationToggle() {
        const toggleBtn = document.getElementById('navToggle');
        const sidenav = document.getElementById('sidenav');
        
        if (toggleBtn && sidenav) {
            // Remove any existing inline onclick to avoid conflicts
            toggleBtn.removeAttribute('onclick');
            
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                sidenav.classList.toggle('open');
                log('Navigation toggled');
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(event) {
                const isMobile = window.innerWidth <= 1024;
                if (isMobile && sidenav.classList.contains('open')) {
                    if (!sidenav.contains(event.target) && !toggleBtn.contains(event.target)) {
                        sidenav.classList.remove('open');
                        log('Sidebar closed due to outside click');
                    }
                }
            });
            
            // Close sidebar when window is resized above mobile breakpoint
            window.addEventListener('resize', function() {
                if (window.innerWidth > 1024 && sidenav.classList.contains('open')) {
                    sidenav.classList.remove('open');
                }
            });
            
            log('Navigation toggle initialized');
        } else {
            log('Toggle button or sidenav not found');
        }
    }

    // Build mobile navigation when sidebar is closed
    function buildMobileNav() {
        const navContainer = document.getElementById('navLinks');
        if (!navContainer) return;
        
        // If we already have content, use it
        if (navContainer.children.length > 0) return;
        
        // Otherwise generate content
        const navHtml = generateNavigationSidebar();
        navContainer.innerHTML = navHtml;
    }

    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initPage();
            buildMobileNav();
        });
    } else {
        initPage();
        buildMobileNav();
    }
})();
