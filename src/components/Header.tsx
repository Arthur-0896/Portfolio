import React, { useEffect, useRef } from 'react';

export default function Header({ name }: { name: string }) {
	const headerRef = useRef<HTMLElement | null>(null);

	// single source of truth for anchor offset (px)
	const EXTRA_OFFSET = -80;
	const EXTRA_OFFSET_SKILLS = -160; // Larger negative offset for skills anchor

	useEffect(() => {
		const STYLE_ID = 'dark-digital-styles';
		const BODY_CLASS = 'dark-digital';

		if (!document.getElementById(STYLE_ID)) {
			const style = document.createElement('style');
			style.id = STYLE_ID;
			style.textContent = `
				/* Dark digital background */
				body.${BODY_CLASS} {
					background:
						radial-gradient(1200px 600px at 10% 10%, rgba(6,182,212,0.06), transparent 15%),
						radial-gradient(800px 400px at 90% 80%, rgba(0,122,255,0.04), transparent 12%),
						linear-gradient(180deg, #030511 0%, #071028 60%, #040617 100%);
					color: #dbeafe;
					min-height: 100vh;
					background-attachment: fixed;
				}

				/* subtle grid / matrix lines */
				body.${BODY_CLASS}::before {
					content: "";
					pointer-events: none;
					position: fixed;
					inset: 0;
					background-image:
						repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px),
						repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px);
					mix-blend-mode: overlay;
					opacity: 0.7;
					z-index: 0;
				}

				/* floating color blobs for depth */
				body.${BODY_CLASS}::after {
					content: "";
					pointer-events: none;
					position: fixed;
					inset: 0;
					background:
						radial-gradient(circle at 10% 20%, rgba(0,255,170,0.03), transparent 12%),
						radial-gradient(circle at 85% 80%, rgba(0,122,255,0.03), transparent 12%);
					animation: ddFloat 18s linear infinite;
					z-index: 0;
				}

				@keyframes ddFloat {
					0% { transform: translateY(0); }
					50% { transform: translateY(-18px); }
					100% { transform: translateY(0); }
				}

				/* ensure page content sits above the background layers */
				.site-header, .container, main, .site-footer {
					position: relative;
					z-index: 1;
				}

				/* tweak header/nav colors for dark theme and center nav */
				.site-header {
					position: sticky;
					top: 0;
					left: 0;
					right: 0;
					z-index: 1100;
					padding: 0.9rem 0;
					transition: padding 180ms ease, box-shadow 180ms ease, backdrop-filter 180ms ease, background 180ms ease;
					will-change: padding, box-shadow;
					background: rgba(2,6,23,0.35);
					backdrop-filter: blur(6px);
					border-bottom: 1px solid rgba(255,255,255,0.03);
				}
				.site-header.header-scrolled {
					padding: 0.35rem 0;
					box-shadow: 0 8px 24px rgba(2,6,23,0.5);
					background: rgba(2,6,23,0.55);
				}
				/* center the nav items horizontally */
				.site-header .container {
					display: flex;
					align-items: center;
					justify-content: center; /* center content */
					gap: 1rem;
				}
				/* layout nav as a horizontal flex row with spacing */
				.site-header nav {
					display: flex;
					gap: 1.25rem;
					align-items: center;
					justify-content: center;
				}
				.site-header nav a {
					padding: 0.25rem 0.4rem;
					border-radius: 6px;
					text-decoration: none;
					font-weight: 600;
					color: rgba(219,234,254,0.95);
					transition: background .12s ease, color .12s ease;
				}
				.site-header nav a:hover {
					background: rgba(255,255,255,0.03);
					color: #fff;
				}

				.site-header .brand { color: #9be7ff; }
				.site-header nav a { color: rgba(219,234,254,0.95); }
				.cta { background: linear-gradient(90deg,#00ffd1,#06b6d4); color: #001; }
				.card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.04); }
			`;
			document.head.appendChild(style);
		}

		document.body.classList.add(BODY_CLASS);
		return () => {
			document.body.classList.remove(BODY_CLASS);
		};
	}, []);

	// keep scroll padding in sync with header height so anchors are not hidden behind the sticky header
	useEffect(() => {
		function setScrollPadding() {
			const el = headerRef.current;
			const height = el ? el.getBoundingClientRect().height : 0;
			// Only use header height for scrollPaddingTop
			document.documentElement.style.scrollPaddingTop = `${height}px`;
		}

		// initial set and on resize
		setScrollPadding();
		window.addEventListener('resize', setScrollPadding, { passive: true });

		// observe header size changes (in case of dynamic content)
		// Safely construct ResizeObserver (avoid optional chaining with `new`)
		const RO = (window as any).ResizeObserver;
		const obs: any | null = RO ? new RO(() => setScrollPadding()) : null;
		if (headerRef.current && obs) obs.observe(headerRef.current);

		return () => {
			window.removeEventListener('resize', setScrollPadding);
			if (obs && headerRef.current) obs.unobserve(headerRef.current);
		};
	}, []);

	// attach scroll listener to toggle compact header class
	useEffect(() => {
		function onScroll() {
			const el = headerRef.current;
			if (!el) return;
			if (window.scrollY > 24) el.classList.add('header-scrolled');
			else el.classList.remove('header-scrolled');
		}
		// initial check and listener
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// smooth scroll handler for nav links that also accounts for header height as a fallback
	function onNavClick(e: React.MouseEvent<HTMLElement>) {
		const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
		if (!a) return;
		const href = a.getAttribute('href') || '';
		if (href.startsWith('#')) {
			e.preventDefault();
			const target = document.querySelector(href);
			if (!target) return;

			const header = headerRef.current;
			let offset = EXTRA_OFFSET;
			if (href === '#skills') {
				offset = EXTRA_OFFSET_SKILLS;
			}
			const headerHeight = header ? header.getBoundingClientRect().height : 0;
			const scrollOffset = headerHeight + offset;

			const targetRect = target.getBoundingClientRect();
			const scrollTop = window.scrollY + targetRect.top - scrollOffset;

			window.scrollTo({ top: Math.max(0, Math.round(scrollTop)), behavior: 'smooth' });

			// update the URL hash without immediate jump
			history.replaceState(null, '', href);
		}
	}

	return (
		<header className="site-header" ref={headerRef}>
			<div className="container">
				<nav onClick={onNavClick}>
					<a href="#projects">Projects</a>
					<a href="#about">About</a>
					<a href="#skills">Skills</a> {/* <-- Fix href here */}
					<a href="#contact">Contact</a>
				</nav>
			</div>
		</header>
	);
}
