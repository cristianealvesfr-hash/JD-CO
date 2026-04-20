document.addEventListener('DOMContentLoaded', () => {

    // 1. Atualizar Ano no Footer automaticamente
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Header Style on Scroll (Sticky / Glassmorphism)
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // trigger initial check in case page is loaded scrolled down
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 3. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if(mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }

    // 4. Smooth Scroll for Anchor Links (Enhancement over CSS scroll-behavior for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                e.preventDefault();
                
                // Adjust for sticky header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 5. Intersection Observer para Animações Futuristas (Scroll Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element's index if they appear together
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);
                
                // One time animation, so unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const staggereableElements = document.querySelectorAll('.staggereable');
    staggereableElements.forEach(el => {
        observer.observe(el);
    });

    // 6. LGPD Banner Logic
    const lgpdBanner = document.getElementById('lgpd-banner');
    const lgpdAcceptBtn = document.getElementById('lgpd-accept');

    if (lgpdBanner && lgpdAcceptBtn) {
        // Se ainda não aceitou, remove a class 'hide' para mostrar o banner após 1 segundo
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                lgpdBanner.classList.remove('hide');
            }, 1000);
        }

        lgpdAcceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            lgpdBanner.classList.add('hide');
        });
    }
});
