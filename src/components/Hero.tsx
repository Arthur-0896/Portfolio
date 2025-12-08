import React from 'react';
import { portfolio } from '../data/portfolio';

export default function Hero({ name, title, role }: { name?: string; title?: string; role?: string }) {
	const displayName = name || portfolio.name;
	const displayTitle = title || portfolio.title;
	const displayRole = role || portfolio.role;

	return (
		<section className="hero">
			<div
				className="container"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1.5rem',
					flexWrap: 'wrap',
					justifyContent: 'space-between'
				}}
			>
				{/* larger, responsive profile image (place at public/static/images/profile.jpg) */}
				<img
					src="static/images/profile.jpg"
					alt={`${name} profile`}
					style={{
						/* responsive square: grows up to 340px, shrinks on small screens */
						width: 'clamp(140px, 28vw, 340px)',
						height: 'clamp(140px, 28vw, 340px)',
						objectFit: 'cover',
						objectPosition: 'top center', /* ensure the top of the image (head) stays visible */
						borderRadius: 16,
						flex: '0 0 auto',
						boxShadow: '0 8px 28px rgba(2,6,23,0.35)'
					}}
					onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
				/>

				<div style={{ minWidth: 260, flex: '1 1 420px' }}>
					<h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)' }}>{displayName}</h1>
					<p style={{
						margin: '4px 0 10px 0',
						fontSize: 'clamp(1.2rem, 2.2vw, 1.35rem)', // slightly larger than title
						fontWeight: 600,
						color: '#38bdf8',
						letterSpacing: 0.3
					}}>
						{displayRole}
					</p>
					<p className="subtitle" style={{ marginTop: 8, marginBottom: 12, fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)' }}>
						{displayTitle}
					</p>
					{/* round down-arrow -> scrolls to #projects */}
					<a
						href="#projects"
						aria-label="Go to Projects"
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
		</section>
	);
}
