
        // FAQ Toggle Functionality
        function toggleFAQ(button) {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            const isExpanded = answer.classList.contains('expanded');
            
            if (isExpanded) {
                answer.classList.remove('expanded');
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.add('expanded');
                answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        }

        // Sidebar Active State on Scroll
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveSidebarLink() {
            let currentSection = '';
            const scrollPosition = window.scrollY + 120;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveSidebarLink, { passive: true });

        // Search Functionality
        const searchInput = document.getElementById('help-search');
        const searchResults = document.getElementById('search-results');
        
        const helpArticles = [
            { title: 'What is OneVictoria?', section: 'getting-started', keywords: ['onevictoria', 'platform', 'resident hub', 'portal', 'about'] },
            { title: 'How do I create a new account?', section: 'getting-started', keywords: ['create account', 'register', 'sign up', 'new account', 'registration'] },
            { title: 'How do I sign in to my account?', section: 'getting-started', keywords: ['sign in', 'login', 'access portal', 'signin', 'log in'] },
            { title: 'Understanding the Dashboard Interface', section: 'getting-started', keywords: ['dashboard', 'navigation', 'sidebar', 'menu', 'interface'] },
            { title: 'How do I update my profile information?', section: 'account-management', keywords: ['update profile', 'edit profile', 'profile settings', 'change info'] },
            { title: 'How do I change my profile photograph?', section: 'account-management', keywords: ['profile picture', 'photo', 'avatar', 'upload photo', 'image'] },
            { title: 'How do I change my account password?', section: 'account-management', keywords: ['change password', 'password', 'reset password', 'new password'] },
            { title: 'How do I register for a community event?', section: 'events-registration', keywords: ['register event', 'join event', 'event registration', 'sign up event'] },
            { title: 'Is it possible to cancel an event registration?', section: 'events-registration', keywords: ['cancel event', 'cancel registration', 'unregister', 'remove registration'] },
            { title: 'What do the event status indicators represent?', section: 'events-registration', keywords: ['event status', 'registered', 'completed', 'cancelled', 'status'] },
            { title: 'How do I submit a volunteer application?', section: 'volunteering', keywords: ['volunteer', 'apply volunteer', 'volunteer application', 'volunteering'] },
            { title: 'What documents are accepted for skill verification?', section: 'volunteering', keywords: ['skill verification', 'documents', 'certificate', 'upload proof', 'verification'] },
            { title: 'How are community service hours earned?', section: 'service-hours', keywords: ['service hours', 'earn hours', 'community service', 'hours', 'credit'] },
            { title: 'What do the certification statuses indicate?', section: 'service-hours', keywords: ['certified', 'pending', 'hours status', 'certification'] },
            { title: 'How do I make a donation?', section: 'donations', keywords: ['donation', 'donate', 'make donation', 'contribute', 'giving'] },
            { title: 'Which payment methods are accepted?', section: 'donations', keywords: ['payment', 'gcash', 'paymaya', 'bank transfer', 'cash', 'payment method'] },
            { title: 'How do I view my notifications?', section: 'notifications', keywords: ['notifications', 'bell', 'alerts', 'view notifications', 'notification'] },
            { title: 'How do I mark notifications as read?', section: 'notifications', keywords: ['mark read', 'read notifications', 'notification read', 'mark all'] },
            { title: 'I have forgotten my password', section: 'troubleshooting', keywords: ['forgot password', 'password reset', 'cannot login', 'forgot', 'reset'] },
            { title: 'The platform is not loading correctly', section: 'troubleshooting', keywords: ['page not loading', 'error', 'browser', 'refresh', 'not working', 'loading'] },
            { title: 'My volunteer application status has not been updated', section: 'troubleshooting', keywords: ['application status', 'pending application', 'volunteer status', 'no update'] },
            { title: 'Contact Support', section: 'contact-support', keywords: ['contact', 'support', 'help', 'email', 'phone', 'visit', 'office'] },
        ];

        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }
            
            searchTimeout = setTimeout(() => {
                const matches = helpArticles.filter(article => {
                    const titleMatch = article.title.toLowerCase().includes(query);
                    const keywordMatch = article.keywords.some(k => k.toLowerCase().includes(query));
                    return titleMatch || keywordMatch;
                });
                
                if (matches.length > 0) {
                    searchResults.innerHTML = matches.map(m => `
                        <a href="#${m.section}" 
                           class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                           onclick="searchResults.classList.add('hidden'); searchInput.value = '';">
                            <p class="text-sm font-medium text-gray-800">${highlightMatch(m.title, query)}</p>
                            <p class="text-xs text-gray-500 mt-0.5">${formatSectionName(m.section)}</p>
                        </a>
                    `).join('');
                    searchResults.classList.remove('hidden');
                } else {
                    searchResults.innerHTML = `
                        <div class="px-4 py-6 text-center">
                            <i class="fa-solid fa-search text-gray-300 text-2xl mb-2"></i>
                            <p class="text-sm text-gray-500">No results found for "${this.value}"</p>
                            <p class="text-xs text-gray-400 mt-1">Please try different keywords or browse the topics manually</p>
                        </div>
                    `;
                    searchResults.classList.remove('hidden');
                }
            }, 200);
        });

        function highlightMatch(text, query) {
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedQuery})`, 'gi');
            return text.replace(regex, '<span class="search-highlight">$1</span>');
        }

        function formatSectionName(section) {
            return section.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        }

        // Close search results on outside click
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });

        // Keyboard shortcut: Ctrl+K or / to focus search
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement === document.body)) {
                e.preventDefault();
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Close search on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchResults.classList.add('hidden');
                searchInput.blur();
            }
        });
