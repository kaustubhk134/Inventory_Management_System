// Theme Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher elements
    const themeSwitchers = document.querySelectorAll('.theme-switcher');
    const themeIcon = document.querySelector('#themeDropdown i');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);
    
    // Add click event to all theme switchers
    themeSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            e.preventDefault();
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'auto') {
            // Use system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                themeIcon.className = 'fas fa-adjust';
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                themeIcon.className = 'fas fa-adjust';
            }
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
            }
        }
        
        // Update active state in dropdown
        themeSwitchers.forEach(switcher => {
            switcher.classList.remove('active');
            if (switcher.getAttribute('data-theme') === theme) {
                switcher.classList.add('active');
            }
        });
    }
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'auto') {
            setTheme('auto');
        }
    });

    // Rest of your existing chart code...
    // Initialize Charts when DOM is loaded
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    // ... (keep your existing chart code)
});

// Initialize Charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales (₹)',
                data: [120000, 190000, 150000, 180000, 220000, 250000],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Clothing', 'Grocery', 'Appliances', 'Accessories'],
            datasets: [{
                data: [35, 25, 20, 10, 10],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f1c40f',
                    '#e74c3c',
                    '#9b59b6'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
});