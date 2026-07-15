// FAQ Toggle Functionality - FIXED
    function toggleFAQ(button) {
      const answer = button.nextElementSibling;
      const icon = button.querySelector('i');
      
      if (!answer || !icon) return;
      
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
      { title: 'What is OneVictoria?', section: 'getting-started', keywords: ['onevictoria','platform','about','resident hub'] },
      { title: 'How do I create a new account?', section: 'getting-started', keywords: ['register','sign up','create account','new account'] },
      { title: 'How do I sign in?', section: 'getting-started', keywords: ['sign in','login','access','signin'] },
      { title: 'Update profile information', section: 'account-management', keywords: ['profile','edit','update','change info'] },
      { title: 'Change profile photograph', section: 'account-management', keywords: ['photo','picture','avatar','image'] },
      { title: 'Change account password', section: 'account-management', keywords: ['password','change password','new password'] },
      { title: 'Register for event', section: 'events-registration', keywords: ['event','register','join','sign up'] },
      { title: 'Cancel event registration', section: 'events-registration', keywords: ['cancel','unregister','remove'] },
      { title: 'Volunteer application', section: 'volunteering', keywords: ['volunteer','apply','skill','application'] },
      { title: 'Service hours', section: 'service-hours', keywords: ['hours','credit','certified','community service'] },
      { title: 'Make a donation', section: 'donations', keywords: ['donation','gcash','paymaya','bank','cash'] },
      { title: 'Payment methods', section: 'donations', keywords: ['payment','gcash','paymaya','bank transfer'] },
      { title: 'View notifications', section: 'notifications', keywords: ['bell','alerts','notifications','notification'] },
      { title: 'Forgot password', section: 'troubleshooting', keywords: ['password','reset','forgot','cannot login'] },
      { title: 'Platform not loading', section: 'troubleshooting', keywords: ['loading','error','browser','refresh'] },
      { title: 'Contact support', section: 'contact-support', keywords: ['contact','support','email','phone','help'] },
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
        const matches = helpArticles.filter(a => 
          a.title.toLowerCase().includes(query) || 
          a.keywords.some(k => k.includes(query))
        );
        
        if (matches.length > 0) {
          searchResults.innerHTML = matches.map(m => `
            <a href="#${m.section}" 
               class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
               onclick="searchResults.classList.add('hidden'); searchInput.value = '';">
              <p class="text-sm font-medium text-gray-800">${m.title}</p>
              <p class="text-xs text-gray-500 mt-0.5">${m.section.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
            </a>
          `).join('');
          searchResults.classList.remove('hidden');
        } else {
          searchResults.innerHTML = `
            <div class="px-4 py-6 text-center">
              <i class="fa-solid fa-search text-gray-300 text-2xl mb-2"></i>
              <p class="text-sm text-gray-500">No results found for "${this.value}"</p>
              <p class="text-xs text-gray-400 mt-1">Try different keywords or browse topics manually</p>
            </div>
          `;
          searchResults.classList.remove('hidden');
        }
      }, 200);
    });

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
      if (e.key === 'Escape') {
        searchResults.classList.add('hidden');
        searchInput.blur();
      }
    });
