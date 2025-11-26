// Dashboard collapse functionality with GSAP
const dashboardWrapper = document.querySelector('.dashboardsWrapper');
const collapseDashboardBtn = document.querySelector('.collapseDashboardWrapper');
const dashboardContent = document.querySelector('.dashboardContent');
const topSwitcher = document.querySelector('.topSwitcherDashboards');

let isDashboardCollapsed = false;
let currentTabIndex = 0; // Track current tab: 0 = Dashboard (40rem), 1/2 = Map Layers/Legends (32rem)

// Function to get the appropriate width and height based on current tab
const getTargetWidth = () => currentTabIndex === 0 ? '40rem' : '32rem';
const getTargetHeight = () => currentTabIndex === 0 ? '95dvh' : '40rem';

if (collapseDashboardBtn) {
    collapseDashboardBtn.addEventListener('click', () => {
        isDashboardCollapsed = !isDashboardCollapsed;

        if (isDashboardCollapsed) {
            // Collapse animation
            gsap.timeline()
                // Fade out content first
                .to([topSwitcher, dashboardContent], {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.in'
                })
                // Then shrink the wrapper
                .to(dashboardWrapper, {
                    width: '4rem',
                    height: '4rem',
                    duration: 0.4,
                    ease: 'power3.inOut'
                }, '-=0.1')
                // Animate the collapse button to center and rotate
                .to(collapseDashboardBtn, {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    xPercent: -50,
                    yPercent: -50,
                    rotation: 180,
                    duration: 0.3,
                    ease: 'power2.inOut'
                }, '-=0.3');
        } else {
            // Expand animation - use appropriate width and height based on current tab
            const targetWidth = getTargetWidth();
            const targetHeight = getTargetHeight();
            gsap.timeline()
                // Reset button position and rotation first
                .to(collapseDashboardBtn, {
                    top: '1rem',
                    left: 'auto',
                    right: '1rem',
                    xPercent: 0,
                    yPercent: 0,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                })
                // Expand the wrapper to appropriate width and height
                .to(dashboardWrapper, {
                    width: targetWidth,
                    height: targetHeight,
                    duration: 0.4,
                    ease: 'power3.inOut'
                }, '-=0.2')
                // Fade in content
                .to([topSwitcher, dashboardContent], {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                }, '-=0.1');
        }
    });
}

// Base maps trigger animation
const baseMapTrigger = document.querySelector('.baseMapTrigger');
const baseMapsWrapper = document.querySelector('.baseMapsWrapper');
const baseMapsContainer = document.querySelector('.baseMapsContainer');
const mapButtons = document.querySelectorAll('.baseMapsWrapper a');

let isOpen = false;

const closeMenu = () => {
    isOpen = false;
    gsap.killTweensOf(mapButtons);
    baseMapsWrapper.classList.remove('open');
    gsap.to(mapButtons, {
        opacity: 0,
        x: -100,
        duration: 0.2,
        stagger: {
            each: 0.05,
            from: "end"
        }
    });
};

baseMapTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;

    gsap.killTweensOf(mapButtons);

    if (isOpen) {
        baseMapsWrapper.classList.add('open');
        gsap.to(mapButtons, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: {
                each: 0.1,
                from: "end"
            }
        });
    } else {
        closeMenu();
    }
});

document.addEventListener('click', (e) => {
    if (isOpen && !baseMapsContainer.contains(e.target)) {
        closeMenu();
    }
});

// Tab switcher functionality
const tabLinks = document.querySelectorAll('.topSwitcherDashboards a');
const dashboardPanel = document.querySelector('.dashboardWrapperSwitcher');
const mapLayersPanel = document.querySelector('.mapLayersWrapperSwitcher');
const mapLegendsPanel = document.querySelector('.mapLegendsWrapperSwitcher');

const panels = [dashboardPanel, mapLayersPanel, mapLegendsPanel];

// Initialize: show only the first panel
panels.forEach((panel, index) => {
    if (index === 0) {
        panel.classList.add('active');
    } else {
        panel.classList.remove('active');
    }
});

tabLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update current tab index for collapse/expand to remember
        currentTabIndex = index;

        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('activeBtn'));

        // Add active class to clicked tab
        link.classList.add('activeBtn');

        // Hide all panels, show the selected one
        panels.forEach((panel, panelIndex) => {
            if (panelIndex === index) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Animate dashboard wrapper width and height based on selected tab
        // index 0 = Dashboard (40rem width, 95dvh height), index 1/2 = Map Layers/Legends (32rem width, 40rem height)
        const targetWidth = index === 0 ? '40rem' : '32rem';
        const targetHeight = index === 0 ? '95dvh' : '40rem';

        gsap.to(dashboardWrapper, {
            width: targetWidth,
            height: targetHeight,
            duration: 0.4,
            ease: 'power3.out'
        });
    });
});

// Chart.js Configuration
const chartData = {
    labels: ['Econet', 'Telecel', 'Netone'],
    datasets: [
        {
            label: '2G',
            data: [8500, 2100, 5200],
            backgroundColor: '#6b9fe8',
            borderRadius: 4,
        },
        {
            label: '3G',
            data: [11500, 2800, 9800],
            backgroundColor: '#f87171',
            borderRadius: 4,
        },
        {
            label: '4G',
            data: [7200, 600, 4100],
            backgroundColor: '#fbbf24',
            borderRadius: 4,
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
                usePointStyle: true,
                pointStyle: 'rectRounded',
                padding: 15,
                font: {
                    size: 11,
                    weight: '500'
                }
            }
        },
        tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 11 },
            padding: 10,
            cornerRadius: 6,
            displayColors: true
        }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: {
                font: { size: 11, weight: '600' },
                color: '#64748b'
            }
        },
        y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            ticks: {
                font: { size: 10 },
                color: '#94a3b8',
                callback: function(value) {
                    return value.toLocaleString();
                }
            }
        }
    }
};

// Initialize bar chart
const barCtx = document.getElementById('barChart');
let barChart = null;

if (barCtx) {
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
}

// Initialize pie chart
const pieCtx = document.getElementById('pieChart');
let pieChart = null;

if (pieCtx) {
    // Prepare pie chart options
    const pieOptions = JSON.parse(JSON.stringify(chartOptions));
    pieOptions.scales = {};
    pieOptions.plugins.legend.position = 'right';
    pieOptions.animation = {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: 'easeOutQuart'
    };

    // Calculate totals for pie chart
    const totals = chartData.labels.map((label, i) => {
        return chartData.datasets.reduce((sum, ds) => sum + ds.data[i], 0);
    });

    const pieData = {
        labels: chartData.labels,
        datasets: [{
            data: totals,
            backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'],
            borderWidth: 0
        }]
    };

    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: pieData,
        options: pieOptions
    });
}

// Initialize province coverage chart (horizontal bar)
const provinceCtx = document.getElementById('provinceChart');
let provinceChart = null;

if (provinceCtx) {
    // Zimbabwe provinces with site counts
    const provinceData = {
        labels: ['Harare', 'Bulawayo', 'Manicaland', 'Mash. East', 'Mash. West', 'Mash. Central', 'Masvingo', 'Mat. North', 'Mat. South', 'Midlands'],
        datasets: [{
            label: 'Total Sites',
            data: [8420, 5180, 4850, 4320, 4100, 3890, 3780, 3250, 2980, 3385],
            backgroundColor: [
                '#2d74df',
                '#5a94e8',
                '#22c55e',
                '#10b981',
                '#f59e0b',
                '#fbbf24',
                '#ef4444',
                '#f87171',
                '#a855f7',
                '#c084fc'
            ],
            borderRadius: 4,
            borderSkipped: false
        }]
    };

    const provinceOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 11 },
                padding: 10,
                cornerRadius: 6,
                callbacks: {
                    label: function(context) {
                        return `Sites: ${context.raw.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: {
                    font: { size: 10 },
                    color: '#94a3b8',
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            },
            y: {
                grid: { display: false },
                ticks: {
                    font: { size: 10, weight: '500' },
                    color: '#64748b'
                }
            }
        }
    };

    provinceChart = new Chart(provinceCtx, {
        type: 'bar',
        data: provinceData,
        options: provinceOptions
    });
}

// Initialize network growth trend chart (line)
const trendCtx = document.getElementById('trendChart');
let trendChart = null;

if (trendCtx) {
    const trendData = {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Econet',
                data: [18200, 19500, 20800, 21900, 22800, 23428],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Netone',
                data: [12500, 13200, 14100, 15200, 15800, 16394],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Telecel',
                data: [3200, 3450, 3700, 3950, 4150, 4333],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const trendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 15,
                    font: {
                        size: 11,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 11 },
                padding: 10,
                cornerRadius: 6,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()} sites`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 11, weight: '600' },
                    color: '#64748b'
                }
            },
            y: {
                beginAtZero: false,
                min: 0,
                grid: { color: '#f1f5f9' },
                ticks: {
                    font: { size: 10 },
                    color: '#94a3b8',
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        }
    };

    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: trendData,
        options: trendOptions
    });
}

// Legend Accordion functionality with GSAP
const legendGroups = document.querySelectorAll('.legendGroup');

legendGroups.forEach(group => {
    const header = group.querySelector('.legendGroup__header');
    const items = group.querySelector('.legendGroup__items');
    const icon = header.querySelector('i');

    // Set initial state for open groups
    if (group.classList.contains('open')) {
        gsap.set(items, { height: 'auto', opacity: 1 });
    } else {
        gsap.set(items, { height: 0, opacity: 0 });
    }

    header.addEventListener('click', () => {
        const isOpen = group.classList.contains('open');

        if (isOpen) {
            // Close
            gsap.to(items, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut'
            });
            gsap.to(icon, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.inOut'
            });
            group.classList.remove('open');
        } else {
            // Open
            gsap.to(items, {
                height: 'auto',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut'
            });
            gsap.to(icon, {
                rotation: 180,
                duration: 0.3,
                ease: 'power2.inOut'
            });
            group.classList.add('open');
        }
    });
});

// ==========================================
// USER AVATAR DROPDOWN FUNCTIONALITY
// ==========================================

const userAvatar = document.querySelector('.userAvatar');
const userDropdown = document.querySelector('.userDropdown');
const userAvatarContainer = document.querySelector('.userAvatarContainer');
const dropdownItems = document.querySelectorAll('.userDropdown__item, .userDropdown__header, .userDropdown__divider');

let isUserDropdownOpen = false;

// Set initial state for dropdown items
gsap.set(dropdownItems, { opacity: 0, x: -20 });

const closeUserDropdown = () => {
    isUserDropdownOpen = false;

    // Animate items out
    gsap.to(dropdownItems, {
        opacity: 0,
        x: -20,
        duration: 0.15,
        stagger: {
            each: 0.03,
            from: "end"
        },
        ease: 'power2.in',
        onComplete: () => {
            userDropdown.classList.remove('open');
        }
    });
};

const openUserDropdown = () => {
    userDropdown.classList.add('open');

    // Animate items in with stagger
    gsap.fromTo(dropdownItems,
        { opacity: 0, x: -20 },
        {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: {
                each: 0.05,
                from: "start"
            },
            ease: 'power2.out',
            delay: 0.1
        }
    );
};

if (userAvatar) {
    userAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        isUserDropdownOpen = !isUserDropdownOpen;

        if (isUserDropdownOpen) {
            openUserDropdown();
        } else {
            closeUserDropdown();
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (isUserDropdownOpen && !userAvatarContainer.contains(e.target)) {
        closeUserDropdown();
    }
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');

// Function to update Chart.js colors based on dark mode
const updateChartTheme = (isDark) => {
    const gridColor = isDark ? '#2a3a5a' : '#f1f5f9';
    const tickColor = isDark ? '#8892a8' : '#64748b';
    const tickColorY = isDark ? '#8892a8' : '#94a3b8';
    const legendColor = isDark ? '#e0e6f0' : '#333';

    // Update bar chart
    if (barChart) {
        barChart.options.scales.x.ticks.color = tickColor;
        barChart.options.scales.y.grid.color = gridColor;
        barChart.options.scales.y.ticks.color = tickColorY;
        barChart.options.plugins.legend.labels.color = legendColor;
        barChart.update();
    }

    // Update pie chart
    if (pieChart) {
        pieChart.options.plugins.legend.labels.color = legendColor;
        pieChart.update();
    }

    // Update province chart
    if (provinceChart) {
        provinceChart.options.scales.x.grid.color = gridColor;
        provinceChart.options.scales.x.ticks.color = tickColorY;
        provinceChart.options.scales.y.ticks.color = tickColor;
        provinceChart.update();
    }

    // Update trend chart
    if (trendChart) {
        trendChart.options.scales.x.ticks.color = tickColor;
        trendChart.options.scales.y.grid.color = gridColor;
        trendChart.options.scales.y.ticks.color = tickColorY;
        trendChart.options.plugins.legend.labels.color = legendColor;
        trendChart.update();
    }
};

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            updateChartTheme(true);
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            updateChartTheme(false);
        }
    });

    // Check for saved preference on load (default to dark mode)
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === null || savedDarkMode === 'enabled') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
        updateChartTheme(true);
    }
}

// ==========================================
// LAYERS PANEL FUNCTIONALITY
// ==========================================

const layersContent = document.querySelector('.layersContent');

if (layersContent) {
    // Initialize SortableJS for layer reordering
    new Sortable(layersContent, {
        animation: 200,
        handle: '.layerAccordion__drag',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',

        onStart: function(evt) {
            gsap.to(evt.item, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out'
            });
        },

        onEnd: function(evt) {
            gsap.to(evt.item, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });

            // Success feedback
            if (evt.oldIndex !== evt.newIndex) {
                gsap.to(evt.item, {
                    boxShadow: '0 4px 12px rgba(45, 116, 223, 0.4)',
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        }
    });

    // Layer Accordion functionality
    const layerAccordions = document.querySelectorAll('.layerAccordion');

    layerAccordions.forEach(accordion => {
        const header = accordion.querySelector('.layerAccordion__header');
        const content = accordion.querySelector('.layerAccordion__content');
        const chevron = accordion.querySelector('.layerAccordion__chevron');
        const chevronIcon = chevron.querySelector('i');
        const mainSlider = accordion.querySelector('.layerAccordion__slider input[type="range"]');
        const mainSliderValue = accordion.querySelector('.layerAccordion__sliderValue');
        const mainToggle = accordion.querySelector('.layerAccordion__controls > .layerToggle input');
        const subLayers = content.querySelectorAll('.subLayer');

        // Set initial state for open accordions
        if (accordion.classList.contains('open')) {
            gsap.set(content, { height: 'auto' });
            gsap.set(chevronIcon, { rotation: 180 });
            if (subLayers.length > 0) {
                gsap.set(subLayers, { opacity: 1, y: 0, scale: 1 });
            }
            header.classList.add('active');
        } else {
            gsap.set(content, { height: 0 });
            gsap.set(chevronIcon, { rotation: 0 });
        }

        // Accordion toggle (click on header but not on controls)
        header.addEventListener('click', (e) => {
            // Ignore clicks on drag handle, toggle, or slider
            if (e.target.closest('.layerAccordion__drag') ||
                e.target.closest('.layerToggle') ||
                e.target.closest('.layerAccordion__slider') ||
                e.target.closest('.layerAccordion__chevron')) {
                return;
            }

            toggleAccordion(accordion);
        });

        // Chevron click
        chevron.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAccordion(accordion);
        });

        function toggleAccordion(acc) {
            const isOpen = acc.classList.contains('open');
            const accContent = acc.querySelector('.layerAccordion__content');
            const accHeader = acc.querySelector('.layerAccordion__header');
            const accChevron = acc.querySelector('.layerAccordion__chevron i');
            const subLayers = accContent.querySelectorAll('.subLayer');

            if (isOpen) {
                // Close - animate sublayers out first
                if (subLayers.length > 0) {
                    gsap.to(subLayers, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        ease: 'power2.out',
                        stagger: 0.03
                    });
                }
                gsap.to(accContent, {
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    delay: 0.1
                });
                gsap.to(accChevron, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
                acc.classList.remove('open');
                accHeader.classList.remove('active');
            } else {
                // Open
                accContent.style.height = 'auto';
                const naturalHeight = accContent.offsetHeight;
                accContent.style.height = '0px';

                // Set sublayers to hidden state initially
                if (subLayers.length > 0) {
                    gsap.set(subLayers, { opacity: 0, y: 20, scale: 0.95 });
                }

                gsap.to(accContent, {
                    height: naturalHeight,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        accContent.style.height = 'auto';
                    }
                });
                gsap.to(accChevron, {
                    rotation: 180,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });

                // Animate sublayers in with stagger
                if (subLayers.length > 0) {
                    gsap.to(subLayers, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                        stagger: 0.1,
                        delay: 0.2
                    });
                }

                acc.classList.add('open');
                accHeader.classList.add('active');
            }
        }

        // Main slider functionality
        if (mainSlider && mainSliderValue) {
            mainSlider.addEventListener('click', (e) => e.stopPropagation());
            mainSlider.addEventListener('input', function() {
                mainSliderValue.textContent = this.value + '%';
            });
        }

        // Main toggle functionality
        if (mainToggle) {
            mainToggle.addEventListener('click', (e) => e.stopPropagation());
            mainToggle.addEventListener('change', function() {
                const subToggles = accordion.querySelectorAll('.subLayer .layerToggle input');
                const subSliders = accordion.querySelectorAll('.subLayer input[type="range"]');

                subToggles.forEach(toggle => {
                    toggle.disabled = !this.checked;
                    toggle.closest('.layerToggle').style.opacity = this.checked ? '1' : '0.5';
                });

                subSliders.forEach(slider => {
                    slider.disabled = !this.checked;
                    slider.style.opacity = this.checked ? '1' : '0.5';
                });

                if (mainSlider) {
                    mainSlider.disabled = !this.checked;
                    mainSlider.style.opacity = this.checked ? '1' : '0.5';
                }
            });
        }
    });

    // Sub-layer slider functionality
    const subSliders = document.querySelectorAll('.subLayer__slider input[type="range"]');
    subSliders.forEach(slider => {
        const valueSpan = slider.nextElementSibling;
        slider.addEventListener('input', function() {
            if (valueSpan) {
                valueSpan.textContent = this.value + '%';
            }
        });
    });

    // Sub-layer toggle functionality
    const subToggles = document.querySelectorAll('.subLayer .layerToggle input');
    subToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const slider = this.closest('.subLayer').querySelector('input[type="range"]');
            if (slider) {
                slider.disabled = !this.checked;
                slider.style.opacity = this.checked ? '1' : '0.5';
            }
        });
    });
}
