import React, { useEffect, useRef, useState } from 'react';

type Project = { title: string; description: string; link?: string; github?: string };

export default function Projects({ projects = [] }: { projects?: Project[] }) {
	// track preview state + modal (now generic)
	const previewImageSrc = '/static/gifs/graphQL.gif'; // <-- remove leading slash
	const youTubeId = '4KpTkeEvLW4'; // from your link
	const youTubeThumbnail = `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
	const youTubeEmbed = `https://www.youtube.com/embed/${youTubeId}?autoplay=1&rel=0`;

	const [imgError, setImgError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [natural, setNatural] = useState({ w: 0, h: 0 });
	const [currentType, setCurrentType] = useState<'image' | 'video' | null>(null);
	const [currentSrc, setCurrentSrc] = useState<string | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const STYLE_ID = 'projects-modal-styles';
		if (!document.getElementById(STYLE_ID)) {
			const style = document.createElement('style');
			style.id = STYLE_ID;
			style.textContent = `
				/* Dark theme variable overrides (applies when Header adds body.dark-digital) */
				body.dark-digital {
					--card: rgba(255,255,255,0.03);
					--card-border: rgba(255,255,255,0.04);
					--text: #dbeafe;
					--muted: #94a3b8;
					/* ensure font remains the app's font */
					font-family: inherit;
				}

				/* Basic layout reset to restore container/grid/card styles (lightweight, safe) */
				.container {
					/* prefer --container if present, fallback to 1024px */
					max-width: var(--container, 1024px);
					margin: 0 auto;
					padding: 2rem;
					box-sizing: border-box;
					/* inherit app font and color */
					font-family: inherit;
					color: var(--text, #0f172a);
				}
				/* grid used across the projects list */
				.grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
					gap: 1rem;
					align-items: start;
				}
				/* project card defaults - use variables so dark theme works */
				.card {
					background: var(--card, #ffffff);
					color: var(--text, #0f172a);
					padding: 1rem;
					border-radius: 8px;
					border: 1px solid var(--card-border, rgba(232,238,244,1));
				}

				/* keep the rest of the component's scoped rules (images, modal, play button, etc.) */
				.projects .image-wrapper { position: relative; display: inline-block; width: 100%; max-width: 420px; }
				.projects .project-image { width: 100%; border-radius: 8px; display: block; }
				.projects .watermark {
					position: absolute;
					inset: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					pointer-events: none;
					color: rgba(255,255,255,0.95);
					font-weight: 700;
					letter-spacing: .6px;
					background: linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.35) 100%);
					border-radius: 8px;
					transition: opacity .15s ease, transform .12s ease;
					opacity: 0.95;
					text-shadow: 0 1px 0 rgba(0,0,0,0.6);
				}
				.projects .watermark-btn {
					pointer-events: auto;
					background: rgba(0,0,0,0.25);
					backdrop-filter: blur(2px);
					border: 1px solid rgba(255,255,255,0.06);
					padding: .45rem .9rem;
					border-radius: 999px;
					color: inherit;
					cursor: pointer;
					font-weight:700;
				}
				.projects .watermark-btn:focus { outline: 2px solid rgba(6,182,212,0.6); outline-offset: 3px; }

				/* modal: use viewport units and hide internal overflow so no vertical scrollbar appears */
				.projects .img-modal {
					position: fixed;
					inset: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(2,6,23,0.7);
					z-index: 10000;
					padding: 0; /* use viewport-based sizing below, avoid extra padding adding to height */
				}
				.projects .img-modal .modal-inner {
					/* leave a small gap around viewport (20px each side) and prevent internal scrolling */
					max-width: calc(100vw - 40px);
					max-height: calc(100vh - 40px);
					overflow: hidden; /* prevent internal scrollbars */
					border-radius: 6px;
					outline: none;
				}
				.projects .img-modal img {
					display: block;
					/* scale image down to fit viewport; no scrollbars */
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
					cursor: pointer;
				}
				.projects .img-modal iframe {
					display: block;
					width: 100%;
					height: 100%;
					max-width: 100%;
					max-height: 100%;
					border: 0;
				}
				.projects .modal-close {
					position: fixed;
					top: 18px;
					right: 18px;
					background: #ffffff; /* solid white for visibility */
					border: 1px solid rgba(0,0,0,0.08);
					color: #0b1220; /* dark text for contrast */
					padding: .4rem .6rem;
					border-radius: 6px;
					cursor: pointer;
					z-index: 10001;
				}

				/* play overlay for video thumbnail */
				.projects .play-btn {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					width: 72px;
					height: 72px;
					border-radius: 50%;
					background: rgba(0,0,0,0.55);
					border: 1px solid rgba(255,255,255,0.08);
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					z-index: 10002; /* increased to be above watermark/button overlays */
					pointer-events: auto;
					transition: transform .12s ease, background .12s ease;
				}
				.projects .play-btn:hover { transform: translate(-50%, -50%) scale(1.05); background: rgba(0,0,0,0.65); }
				.projects .play-icon {
					width: 26px;
					height: 26px;
					fill: white;
					display: block;
					margin-left: 3px; /* visually center triangle */
				}

				/* video modal sizing: large, responsive 16:9 (max 1280px) */
				.projects .img-modal.video-open .modal-inner {
					width: min(1280px, calc(100vw - 40px));
					aspect-ratio: 16/9;
					max-height: calc(100vh - 40px);
					overflow: hidden;
				}
				.projects .img-modal.video-open iframe {
					width: 100%;
					height: 100%;
				}

				/* keep existing image modal rules intact */
			`;
			document.head.appendChild(style);
		}
	}, []);

	// prevent body scroll while modal is open
	useEffect(() => {
		const prev = document.body.style.overflow;
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = prev || '';
		}
		return () => {
			// restore on unmount
			document.body.style.overflow = prev || '';
		};
	}, [isOpen]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setIsOpen(false);
		}
		if (isOpen) document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [isOpen]);

	// safe renderer for a single project item to avoid one bad item crashing the page
	function renderProject(p: Project, i: number) {
		try {
			return (
				<article key={i} className="card">
					<h3>{p.title}</h3>
					<p>{p.description}</p>

					{/* first project: GIF preview (existing) */}
					{ i === 0 && (
						<>
							<div className="image-wrapper" aria-hidden={imgError ? 'true' : 'false'}>
								<img
									src={previewImageSrc}
									alt={`${p.title} preview`}
									className="project-image"
									onClick={() => { setCurrentType('image'); setCurrentSrc(previewImageSrc); setIsOpen(true); }}
									style={{ cursor: 'pointer' }}
									onLoad={(e) => {
										const img = e.currentTarget as HTMLImageElement;
										setNatural({ w: img.naturalWidth, h: img.naturalHeight });
										setImgError(false);
									}}
									onError={(e) => {
										setImgError(true);
										console.warn(`Preview image failed to load from "${previewImageSrc}". Ensure file is at public/static/gifs/graphQL.gif`);
										(e.currentTarget as HTMLImageElement).style.display = 'none';
									}}
								/>

								{/* watermark button overlay */}
								<button
									className="watermark-btn"
									style={{ position: 'absolute', inset: 0, margin: 'auto', width: 'auto', pointerEvents: 'auto', alignSelf: 'center', justifySelf: 'center' }}
									onClick={() => { setCurrentType('image'); setCurrentSrc(previewImageSrc); setIsOpen(true); }}
									aria-label="Open image preview in native resolution"
								>
									Click to enlarge
								</button>
							</div>

							{imgError && (
								<div
									className="image-missing"
									style={{
										marginTop: 12,
										padding: '0.75rem 1rem',
										borderRadius: 8,
										background: 'rgba(255,255,255,0.03)',
										color: 'var(--muted)',
										fontSize: '.95rem'
									}}
								>
									Preview not available. Place your GIF at: <code>public/static/gifs/graphQL.gif</code>
								</div>
							)}
						</>
					) }

					{/* second project: YouTube video preview (thumbnail + play overlay) */}
					{ i === 1 && (
						<>
							<div className="image-wrapper" aria-hidden="false">
								{/* clicking the image also opens the modal */}
								<img
									src={youTubeThumbnail}
									alt={`${p.title} video preview`}
									className="project-image"
									onClick={() => { setCurrentType('video'); setCurrentSrc(youTubeEmbed); setIsOpen(true); }}
									style={{ cursor: 'pointer' }}
									onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
								/>

								{/* prominent play button overlay */}
								<button
									className="play-btn"
									onClick={(e) => {
										// prevent any unintended bubbling
										e.stopPropagation();
										setCurrentType('video');
										setCurrentSrc(youTubeEmbed);
										setIsOpen(true);
									}}
									aria-label="Play video"
								>
									<svg className="play-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
										<path d="M8 5v14l11-7z" />
									</svg>
								</button>
							</div>
						</>
					) }

					{/* GitHub link below project */}
					{p.github && (
						<div style={{ marginTop: 10 }}>
							<a
								href={p.github}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: '#38bdf8',
									fontWeight: 600,
									textDecoration: 'underline',
									fontSize: '0.98rem'
								}}
							>
								View on GitHub
							</a>
						</div>
					)}
				</article>
			);
		} catch (err) {
			console.error(`Failed to render project at index ${i}`, err);
			return (
				<article key={i} className="card">
					<h3>Invalid project</h3>
					<p>There was an error rendering this project. Check console for details.</p>
				</article>
			);
		}
	}

	const projectsList = Array.isArray(projects) ? projects : [];
	if (!Array.isArray(projects)) console.warn('projects prop is not an array', projects);

	return (
		<section id="projects" className="projects">
			<div className="container">
				<h2>Projects</h2>
				<div className="grid">
					{projectsList.map((p, i) => renderProject(p, i))}
				</div>

				{/* navigation button to About section */}
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
					<a
						href="#about"
						aria-label="Go to About"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: 56,
							height: 56,
							borderRadius: 999,
							background: 'linear-gradient(90deg,#06b6d4,#00ffd1)',
							color: '#001',
							textDecoration: 'none',
							boxShadow: '0 6px 18px rgba(2,6,23,0.2)',
							border: 'none'
						}}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
				</div>
			</div>

			{/* generic modal: image OR video */}
			{isOpen && currentSrc && (
				<div
					className={`img-modal ${currentType === 'video' ? 'video-open' : ''}`}
					role="dialog"
					aria-modal="true"
					// close only on backdrop click (don't close when clicking the iframe/image)
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setIsOpen(false);
							setCurrentType(null);
							setCurrentSrc(null);
						}
					}}
					ref={modalRef}
				>
					<button className="modal-close" onClick={() => { setIsOpen(false); setCurrentType(null); setCurrentSrc(null); }} aria-label="Close preview">Close</button>
					<div className="modal-inner" tabIndex={-1}>
						{currentType === 'image' && (
							<img src={currentSrc} alt="Preview (native resolution)" width={natural.w || undefined} height={natural.h || undefined} />
						)}
						{currentType === 'video' && (
							<iframe
								src={currentSrc}
								title="Video preview"
								allow="autoplay; fullscreen; picture-in-picture"
								allowFullScreen
							/>
						)}
					</div>
				</div>
			)}
		</section>
	);
}
