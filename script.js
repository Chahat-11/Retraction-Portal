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

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(nav => nav.parentElement.classList.remove('active'));
            
            this.parentElement.classList.add('active');
            
            const analysisType = this.getAttribute('data-analysis');
            analysisTitle.textContent = `Retraction Analysis Based on ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)}`;
            
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
});