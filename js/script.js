document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    // Toggle menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        navbar.style.boxShadow = window.scrollY > 10 ? 
            '0 4px 15px rgba(0, 0, 0, 0.1)' : 
            '0 2px 10px rgba(0, 0, 0, 0.1)';
    });

    // Command Tab System
    function openTab(evt, tabName) {
        // Hide all tab contents
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = "none";
        }
        
        // Remove active class from all buttons
        const tabButtons = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove("active");
        }
        
        // Show current tab and mark button as active
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.classList.add("active");
    }

    // Initialize first tab as active if exists
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
        const firstTabContent = document.getElementById(firstTab.getAttribute('onclick').match(/'([^']+)'/)[1]);
        if (firstTabContent) {
            firstTabContent.style.display = 'block';
        }
    }

    // Command Search Functionality
    const searchBox = document.getElementById('commandSearch');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const commandCards = document.querySelectorAll('.command-card');
            
            commandCards.forEach(card => {
                const cmdName = card.querySelector('.cmd-name').textContent.toLowerCase();
                const cmdDesc = card.querySelector('.cmd-desc').textContent.toLowerCase();
                
                if (cmdName.includes(searchTerm) || cmdDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Set active tab from URL hash if present
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const tabButton = document.querySelector(`.tab-btn[onclick*="${hash}"]`);
        if (tabButton) {
            openTab({currentTarget: tabButton}, hash);
        }
    }
});
