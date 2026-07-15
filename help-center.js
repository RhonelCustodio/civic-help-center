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

    const searchInput = document.getElementById('help-search');
    const searchResults = document.getElementById('search-results');
    const helpArticles = [
      { title: 'What is OneVictoria?', section: 'getting-started', keywords: ['onevictoria','platform','about'] },
      { title: 'How do I create a new account?', section: 'getting-started', keywords: ['register','sign up','create account'] },
      { title: 'How do I sign in?', section: 'getting-started', keywords: ['sign in','login','access'] },
      { title: 'Update profile information', section: 'account-management', keywords: ['profile','edit','update'] },
      { title: 'Register for event', section: 'events-registration', keywords: ['event','register','join'] },
      { title: 'Volunteer application', section: 'volunteering', keywords: ['volunteer','apply','skill'] },
      { title: 'Service hours', section: 'service-hours', keywords: ['hours','credit','certified'] },
      { title: 'Make a donation', section: 'donations', keywords: ['donation','gcash','paymaya','bank'] },
      { title: 'Notifications', section: 'notifications', keywords: ['bell','alerts','notifications'] },
      { title: 'Forgot password', section: 'troubleshooting', keywords: ['password','reset','forgot'] },
      { title: 'Contact support', section: 'contact-support', keywords: ['contact','support','email','phone'] },
    ];
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.toLowerCase().trim();
      if (query.length < 2) { searchResults.classList.add('hidden'); return; }
      searchTimeout = setTimeout(() => {
        const matches = helpArticles.filter(a => a.title.toLowerCase().includes(query) || a.keywords.some(k => k.includes(query)));
        if (matches.length) {
          searchResults.innerHTML = matches.map(m => `<a href="#${m.section}" class="block px-4 py-3 hover:bg-gray-50 border-b" onclick="searchResults.classList.add('hidden')">${m.title}</a>`).join('');
          searchResults.classList.remove('hidden');
        } else {
          searchResults.innerHTML = `<div class="px-4 py-4 text-sm text-gray-500">No results found</div>`;
          searchResults.classList.remove('hidden');
        }
      }, 200);
    });
    document.addEventListener('click', (e) => { if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) searchResults.classList.add('hidden'); });
    document.addEventListener('keydown', (e) => { if ((e.ctrlKey && e.key==='k') || (e.key==='/' && document.activeElement===document.body)) { e.preventDefault(); searchInput.focus(); } });
