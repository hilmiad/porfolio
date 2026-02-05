feather.replace();
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;
        const navLinks = document.querySelectorAll('.nav-link');

        function toggleMenu() {
            const isActive = navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            hamburgerBtn.innerHTML = isActive ? feather.icons['x'].toSvg() : feather.icons['menu'].toSvg();
        }

        hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        document.addEventListener('click', (e) => { if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) toggleMenu(); });
        navLinks.forEach(link => { link.addEventListener('click', () => { if (navMenu.classList.contains('active')) toggleMenu(); }); });

        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { 
                    entry.target.classList.add('active'); 
                    // FIX: Stop observing setelah muncul agar tidak hilang-hilang
                    observer.unobserve(entry.target); 
                } 
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));