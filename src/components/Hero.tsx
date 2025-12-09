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
					justifyContent: 'space-between',
					flexDirection: 'row',
					paddingTop: '1rem' // reduce top padding to move content closer to navbar
				}}
			>
				{/* larger, responsive profile image (place at public/static/images/profile.jpg) */}
				<img
					src="/static/images/profile.jpg"
					alt={`${name} profile`}
					style={{
						/* responsive square: grows up to 340px, shrinks on small screens */
						width: 'clamp(140px, 28vw, 340px)',
						height: 'clamp(140px, 28vw, 340px)',
						objectFit: 'cover',
						objectPosition: 'top center', /* ensure the top of the image (head) stays visible */
						borderRadius: 16,
						flex: '0 0 auto',
						boxShadow: '0 8px 28px rgba(2,6,23,0.35)',
						display: 'block',
						margin: '0 auto',
					}}
					onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
				/>

				<div style={{ minWidth: 260, flex: '1 1 420px', marginTop: 0 }}>
					<h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)' }}>{displayName}</h1>
					<p style={{
						margin: '4px 0 10px 0',
						fontSize: 'clamp(1.2rem, 2.2vw, 1.35rem)',
						fontWeight: 600,
						color: '#38bdf8',
						letterSpacing: 0.3
					}}>
						{displayRole}
					</p>
					<p className="subtitle" style={{ marginTop: 8, marginBottom: 12, fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)' }}>
						{displayTitle}
					</p>

					{/* Clients Served section */}
					<div style={{ margin: '24px 0 32px 0', textAlign: 'center' }}>
						<h2 style={{
							margin: '0 0 18px 0',
							color: '#38bdf8',
							fontSize: '1.15rem',
							fontWeight: 700,
							letterSpacing: 0.2
						}}>Clients Served</h2>
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '2.2rem',
							flexWrap: 'wrap',
							paddingTop: 8,
							paddingBottom: 18 // extra space below logos
						}}>
							<img
								src="/static/clients/amazon.png"
								alt="Amazon"
								title="Amazon"
								style={{
									height: 70,
									width: 120,
									background: '#fff',
									borderRadius: 12,
									padding: 10,
									objectFit: 'contain',
									boxShadow: '0 2px 8px rgba(2,6,23,0.07)',
									display: 'block'
								}}
							/>
							<img
								src="/static/clients/trafigura.jpg"
								alt="Trafigura"
								title="Trafigura"
								style={{
									height: 70,
									width: 120,
									background: '#fff',
									borderRadius: 12,
									padding: 10,
									objectFit: 'contain',
									boxShadow: '0 2px 8px rgba(2,6,23,0.07)',
									display: 'block'
								}}
							/>
							<img
								src="/static/clients/standardchartered.webp"
								alt="Standard Chartered"
								title="Standard Chartered"
								style={{
									height: 70,
									width: 120,
									background: '#fff',
									borderRadius: 12,
									padding: 10,
									objectFit: 'contain',
									boxShadow: '0 2px 8px rgba(2,6,23,0.07)',
									display: 'block'
								}}
							/>
							<img
								src="/static/clients/kotak.webp"
								alt="Kotak Mahindra"
								title="Kotak Mahindra"
								style={{
									height: 70,
									width: 120,
									background: '#fff',
									borderRadius: 12,
									padding: 10,
									objectFit: 'contain',
									boxShadow: '0 2px 8px rgba(2,6,23,0.07)',
									display: 'block'
								}}
							/>
						</div>
					</div>

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
			<style>
				{`
				@media (max-width: 700px) {
					.hero .container {
						flex-direction: column !important;
						align-items: center !important;
						justify-content: center !important;
						text-align: center;
					}
					.hero img {
						margin-bottom: 1.2rem !important;
					}
				}
				`}
			</style>
		</section>
	);
}
