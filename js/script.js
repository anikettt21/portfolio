// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 30px var(--card-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on current theme
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const resultsContainer = document.querySelector('.results-container');
    const closeSearchButton = document.getElementById('close-search');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            return;
        }
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Filter projects based on search term
        const filteredProjects = Array.from(projectCards).filter(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = card.getAttribute('data-tags').toLowerCase();
            
            return title.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   tags.includes(searchTerm);
        });
        
        if (filteredProjects.length > 0) {
            // Clone and display matching projects
            filteredProjects.forEach(project => {
                const projectClone = project.cloneNode(true);
                resultsContainer.appendChild(projectClone);
            });
            
            // Show search results section
            searchResults.style.display = 'block';
            
            // Add hover effect to the cloned cards
            const clonedCards = resultsContainer.querySelectorAll('.project-card');
            clonedCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 8px 30px var(--card-shadow)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.boxShadow = 'none';
                });
            });
        } else {
            // No results found message
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No projects found matching "${searchTerm}"</p>
                </div>
            `;
            searchResults.style.display = 'block';
        }
        
        // Scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Search button click event
    searchButton.addEventListener('click', performSearch);
    
    // Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Close search results
    closeSearchButton.addEventListener('click', function() {
        searchResults.style.display = 'none';
    });
});