document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item a');
    const analysisTitle = document.getElementById('analysis-title');

    const retractionData = {
        country: {
            label: "Country",
            value: "United States"
        },
        subject: {
            label: "Subject",
            value: "Medicine"
        },
        institution: {
            label: "Institution",
            value: "Harvard University"
        },
        publisher: {
            label: "Publisher",
            value: "Elsevier"
        },
        date: {
            label: "Retraction Date",
            value: "2023-05-15"
        },
        author: {
            label: "Author",
            value: "John Smith"
        },
        reason: {
            label: "Reason for Retraction",
            value: "Data manipulation"
        }
    };

    // Initialize Chart.js
    let currentChart = null;

    // Content templates for different analysis types
    const contentTemplates = {
        country: {
            title: 'Retraction Analysis Based on Country',
            description: 'This visualization shows the distribution of retractions across different countries. The data can be filtered by time period and displayed in various chart types.',
            chartData: {
                labels: ['USA', 'UK', 'China', 'India', 'Germany'],
                datasets: [{
                    label: 'Number of Retractions',
                    data: [65, 45, 78, 32, 28],
                    backgroundColor: 'rgba(107, 33, 231, 0.2)',
                    borderColor: 'rgba(107, 33, 231, 1)',
                    borderWidth: 1
                }]
            }
        },
        subject: {
            title: 'Retraction Analysis Based on Subject',
            description: 'Analysis of retractions across different subject areas and disciplines.',
            chartData: {
                labels: ['Medicine', 'Biology', 'Physics', 'Chemistry', 'Engineering'],
                datasets: [{
                    label: 'Number of Retractions',
                    data: [85, 55, 35, 42, 28],
                    backgroundColor: 'rgba(107, 33, 231, 0.2)',
                    borderColor: 'rgba(107, 33, 231, 1)',
                    borderWidth: 1
                }]
            }
        },
        institution: {
            title: 'Retraction Analysis Based on Institution',
            filters: ['Institution', 'Country', 'Year'],
            description: 'Analysis of retractions by research institutions.'
        },
        publisher: {
            title: 'Retraction Analysis Based on Publisher',
            filters: ['Publisher', 'Year', 'Subject Area'],
            description: 'Analysis of retractions across different publishers.'
        },
        date: {
            title: 'Retraction Analysis Based on Date',
            filters: ['Year Range', 'Country', 'Subject Area'],
            description: 'Temporal analysis of retractions over time.'
        },
        author: {
            title: 'Retraction Analysis Based on Author',
            filters: ['Author', 'Institution', 'Year'],
            description: 'Analysis of retractions by author demographics.'
        },
        reason: {
            title: 'Retraction Analysis Based on Reason',
            filters: ['Reason', 'Year', 'Country'],
            description: 'Analysis of different reasons for retractions.'
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(nav => nav.parentElement.classList.remove('active'));
            
            this.parentElement.classList.add('active');
            
            const analysisType = this.getAttribute('data-analysis');
            analysisTitle.textContent = contentTemplates[analysisType].title;
            
            const filterGroup = document.querySelector('.filter-group');
            if (analysisType === 'country') {
                filterGroup.style.display = 'flex';
            } else {
                filterGroup.style.display = 'none';
            }
            
            updateRetractionInfo(analysisType);
        });
    });
    
    // Function to update retraction information display
    function updateRetractionInfo(type) {
        const retractionInfo = document.querySelector('.retraction-info-sidebar');
        if (retractionInfo) {
            // Highlight the selected category
            const items = retractionInfo.querySelectorAll('.retraction-item');
            items.forEach(item => {
                const label = item.querySelector('.retraction-label').textContent.toLowerCase();
                if (label.includes(type.toLowerCase())) {
                    item.classList.add('highlighted');
                } else {
                    item.classList.remove('highlighted');
                }
            });
        }
    }
    
    // Initialize with the first item (country) highlighted
    updateRetractionInfo('country');

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
    });

    // Bookmark and Download button functionality
    const bookmarkBtn = document.querySelector('.btn-bookmark');
    const downloadBtn = document.querySelector('.btn-download');

    bookmarkBtn.addEventListener('click', function() {
        // Add bookmark functionality here
        alert('Graph bookmarked!');
    });

    downloadBtn.addEventListener('click', function() {
        // Add download functionality here
        alert('Downloading graph...');
    });

    // Handle sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the content type from data attribute
            const contentType = this.getAttribute('data-content');
            const template = contentTemplates[contentType];
            
            // Update the page content
            updatePageContent(template);
        });
    });

    function updatePageContent(template) {
        // Update title
        document.getElementById('analysis-title').textContent = template.title;
        
        // Update filters
        const filterLabels = document.querySelectorAll('.filter-item label');
        template.filters.forEach((filter, index) => {
            if (filterLabels[index]) {
                filterLabels[index].textContent = filter;
            }
        });
        
        // Update description
        const descriptionText = document.querySelector('.description-box p');
        if (descriptionText) {
            descriptionText.textContent = template.description;
        }
        
        // Here you would also update the graph data and visualization
        // This would depend on your data visualization library and data structure
    }

    // Handle graph type changes
    document.getElementById('graph-type').addEventListener('change', function() {
        const contentType = document.querySelector('.nav-item.active a').getAttribute('href').substring(1);
        updateChart(contentType, this.value);
    });

    function updateChart(contentType, chartType = 'bar') {
        const ctx = document.getElementById('analysisChart').getContext('2d');
        const template = contentTemplates[contentType];

        if (currentChart) {
            currentChart.destroy();
        }

        const config = {
            type: chartType,
            data: template.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Retractions'
                        }
                    }
                }
            }
        };

        currentChart = new Chart(ctx, config);
    }

    // Initialize the first chart
    updateChart('country');

    // Handle filter changes
    document.querySelectorAll('select, input').forEach(filter => {
        filter.addEventListener('change', function() {
            const contentType = document.querySelector('.nav-item.active a').getAttribute('href').substring(1);
            // Here you would typically fetch new data based on filters
            // For now, we'll just update the chart with the same data
            updateChart(contentType);
        });
    });
});