document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. CẬP NHẬT THÔNG TIN LIÊN HỆ TỰ ĐỘNG
    // ==========================================
    const contactData = {
        phone: '0369343399',
        email: '25050012@student.bdu.edu.vn'
    };

    // Cập nhật vào các phần tử HTML nếu có sẵn ID
    const phoneEl = document.getElementById('phoneDisplay') || document.getElementById('footerPhone');
    const emailEl = document.getElementById('emailDisplay') || document.getElementById('footerEmail');

    if (phoneEl) {
        phoneEl.innerHTML = `<a href="tel:${contactData.phone}">${contactData.phone}</a>`;
    }
    if (emailEl) {
        emailEl.innerHTML = `<a href="mailto:${contactData.email}">${contactData.email}</a>`;
    }

    // Nếu chưa có khu vực hiển thị thông tin liên hệ, tự động chèn vào phần Contact/Footer
    const contactSection = document.getElementById('contact') || document.querySelector('footer');
    if (contactSection && !document.getElementById('dynamicContactInfo')) {
        const infoDiv = document.createElement('div');
        infoDiv.id = 'dynamicContactInfo';
        infoDiv.className = 'contact-info-box';
        infoDiv.style.cssText = 'margin: 15px 0; font-size: 1rem; line-height: 1.8;';
        infoDiv.innerHTML = `
            <p><strong>📞 Điện thoại:</strong> <a href="tel:${contactData.phone}" style="color: inherit;">${contactData.phone}</a></p>
            <p><strong>✉️ Email:</strong> <a href="mailto:${contactData.email}" style="color: inherit;">${contactData.email}</a></p>
        `;
        contactSection.prepend(infoDiv);
    }

    // ==========================================
    // 1. PARTICLE CANVAS BACKGROUND ANIMATION
    // ==========================================
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ==========================================
    // 2. TYPING EFFECT FOR HERO TITLE
    // ==========================================
    const words = ["Web Developer", "Frontend Expert", "Python & AI Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');

    if (typingElement) {
        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();
    }

    // ==========================================
    // 3. THEME TOGGLE (DARK / LIGHT MODE)
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) updateIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (themeIcon) updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ==========================================
    // 4. MOBILE NAVBAR HAMBURGER
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // ==========================================
    // 5. SCROLL REVEAL & STATS COUNTER ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    function checkReveal() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 80) {
                el.classList.add('active');
            }
        });

        // Counter Animation
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const top = aboutSection.getBoundingClientRect().top;
            if (top < windowHeight - 100 && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const increment = target / 40;
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 30);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        }
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // ==========================================
    // 6. 3D CARD TILT EFFECT ON MOUSEMOVE
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ==========================================
    // 7. FORM SUBMISSION TOAST NOTIFICATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('formNotification');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('.form-input');
            let valid = true;
            inputs.forEach(i => {
                if (!i.value.trim()) valid = false;
            });

            if (valid) {
                if (toast) toast.style.display = 'block';
                contactForm.reset();
                if (toast) {
                    setTimeout(() => toast.style.display = 'none', 4000);
                }
            }
        });
    }

    // ==========================================
    // 8. SCROLL TO TOP
    // ==========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});