/**
 * Dan Meador - Personal Site
 */

(function() {
    'use strict';

    // ==========================================================================
    // Typewriter Effect
    // ==========================================================================

    const typewriterElement = document.querySelector('.typewriter');
    const phrases = [
        { text: 'Privacy lawyer.', italic: false },
        { text: 'This is not a resume.', italic: true }
    ];

    if (typewriterElement) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 50;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 500;

        function type() {
            const currentPhrase = phrases[phraseIndex].text;
            const isItalic = phrases[phraseIndex].italic;

            typewriterElement.style.fontStyle = isItalic ? 'italic' : 'normal';

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                delay = pauseAfterType;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = pauseAfterDelete;
            }

            setTimeout(type, delay);
        }

        type();
    }

    // ==========================================================================
    // Mobile Navigation Toggle
    // ==========================================================================

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // Scroll Reveal for Sections
    // ==========================================================================

    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // Active Nav State Based on Scroll
    // ==========================================================================

    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    if (navAnchors.length > 0) {
        const updateActiveNav = () => {
            const scrollPos = window.scrollY + 100;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const isAtBottom = (window.scrollY + windowHeight) >= (documentHeight - 50);

            navAnchors.forEach(anchor => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const section = document.querySelector(href);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    // If at bottom of page, activate the last nav item (Contact)
                    if (isAtBottom && href === '#contact') {
                        anchor.classList.add('active');
                    } else if (isAtBottom && href !== '#contact') {
                        anchor.classList.remove('active');
                    } else if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        anchor.classList.add('active');
                    } else {
                        anchor.classList.remove('active');
                    }
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }

    // ==========================================================================
    // Project Modal
    // ==========================================================================

    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalBackdrop = modal?.querySelector('.modal-backdrop');
    const modalClose = modal?.querySelector('.modal-close');

    const openModal = (card) => {
        if (!modal) return;

        const title = card.querySelector('.project-title').textContent;
        const labelEl = card.querySelector('.project-label');
        const label = labelEl.textContent;
        const labelClass = labelEl.classList.contains('project-label--live') ? 'project-label--live' :
                           labelEl.classList.contains('project-label--building') ? 'project-label--building' : '';
        const tags = Array.from(card.querySelectorAll('.project-tags span')).map(t => t.textContent);
        const longDesc = card.dataset.longDesc || '';
        const siteUrl = card.dataset.siteUrl || '';
        const githubUrl = card.dataset.githubUrl || '';
        const preview = card.dataset.preview || '';

        const modalLabel = modal.querySelector('.modal-label');
        modalLabel.textContent = label;
        modalLabel.className = 'modal-label';
        if (labelClass) modalLabel.classList.add(labelClass);
        modal.querySelector('.modal-description').textContent = longDesc;

        // Tags
        const tagsContainer = modal.querySelector('.modal-tags');
        tagsContainer.innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');

        // Preview
        const previewContainer = modal.querySelector('.modal-preview');
        if (preview === 'none') {
            previewContainer.style.display = 'none';
        } else if (preview) {
            previewContainer.style.display = '';
            previewContainer.innerHTML = `<img src="${preview}" alt="${title} preview">`;
        } else {
            previewContainer.style.display = '';
            previewContainer.innerHTML = `<div class="modal-preview-placeholder">Preview coming soon</div>`;
        }

        // Links
        const linksContainer = modal.querySelector('.modal-links');
        let linksHtml = '';
        if (siteUrl) {
            linksHtml += `<a href="${siteUrl}" target="_blank" rel="noopener" class="btn-site">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Visit Site
            </a>`;
        } else if (card.dataset.project !== 'danmeadorwork') {
            linksHtml += `<span class="btn-site disabled">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Visit Site
            </span>`;
        }
        if (githubUrl) {
            linksHtml += `<a href="${githubUrl}" target="_blank" rel="noopener" class="btn-github">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
            </a>`;
        }
        linksContainer.innerHTML = linksHtml;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    modalBackdrop?.addEventListener('click', closeModal);
    modalClose?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // Library Shelf Toggle (Current / Previous)
    // ==========================================================================

    const shelfToggle = document.querySelector('.shelf-toggle');
    const currentShelf = document.querySelector('[data-shelf="current"]');
    const previousShelf = document.querySelector('[data-shelf="previous"]');

    if (shelfToggle && currentShelf && previousShelf) {
        shelfToggle.addEventListener('click', () => {
            const showing = shelfToggle.dataset.showing;

            if (showing === 'current') {
                currentShelf.classList.add('shelf-hidden');
                currentShelf.classList.remove('shelf-visible');
                previousShelf.classList.remove('shelf-hidden');
                previousShelf.classList.add('shelf-visible');
                shelfToggle.textContent = 'Latest';
                shelfToggle.dataset.showing = 'previous';
            } else {
                previousShelf.classList.add('shelf-hidden');
                previousShelf.classList.remove('shelf-visible');
                currentShelf.classList.remove('shelf-hidden');
                currentShelf.classList.add('shelf-visible');
                shelfToggle.textContent = 'More';
                shelfToggle.dataset.showing = 'current';
            }
        });
    }

})();
