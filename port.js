const cursor = document.getElementById('cursor');
		const ring = document.getElementById('cursorRing');
		let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

		document.addEventListener('mousemove', e => {
			mouseX = e.clientX; mouseY = e.clientY;
			cursor.style.left = mouseX - 6 + 'px';
			cursor.style.top = mouseY - 6 + 'px';
		});

		function animateRing() {
			ringX += (mouseX - ringX - 20) * 0.12;
			ringY += (mouseY - ringY - 20) * 0.12;
			ring.style.left = ringX + 'px';
			ring.style.top = ringY + 'px';
			requestAnimationFrame(animateRing);
		}
		animateRing();

		document.querySelectorAll('a, button, .project-card, .skill-item, .stat-item, .social-link, .spin-badge').forEach(el => {
			el.addEventListener('mouseenter', () => ring.classList.add('hover'));
			el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
		});

		// SCROLL REVEAL
		const observer = new IntersectionObserver(entries => {
			entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
		}, { threshold: 0.15 });
		document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

		// TILT
		document.querySelectorAll('.tilt-wrap').forEach(wrap => {
			const card = wrap.querySelector('.tilt-card');
			if (!card) return;
			wrap.addEventListener('mousemove', e => {
				const rect = wrap.getBoundingClientRect();
				const x = (e.clientX - rect.left) / rect.width - 0.5;
				const y = (e.clientY - rect.top) / rect.height - 0.5;
				card.style.transform = `rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.02)`;
			});
			wrap.addEventListener('mouseleave', () => { card.style.transform = ''; });
		});

		// PARALLAX
		window.addEventListener('scroll', () => {
			const heroGrid = document.querySelector('.hero-grid');
			if (heroGrid) heroGrid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
		});

		// MARQUEE PAUSE
		const track = document.getElementById('marqueeTrack');
		track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
		track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');

		// NAV on scroll
		const nav = document.querySelector('nav');
		window.addEventListener('scroll', () => {
			if (window.scrollY > 80) {
				nav.style.background = 'rgba(242,237,230,0.9)';
				nav.style.backdropFilter = 'blur(10px)';
				nav.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
			} else {
				nav.style.background = '';
				nav.style.backdropFilter = '';
				nav.style.borderBottom = '';
			}
		});

		// MAGNETIC buttons
		document.querySelectorAll('.hero-cta, .social-link').forEach(btn => {
			btn.addEventListener('mousemove', e => {
				const rect = btn.getBoundingClientRect();
				const x = (e.clientX - rect.left - rect.width/2) * 0.25;
				const y = (e.clientY - rect.top - rect.height/2) * 0.25;
				btn.style.transform = `translate(${x}px, ${y}px)`;
			});
			btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
		});