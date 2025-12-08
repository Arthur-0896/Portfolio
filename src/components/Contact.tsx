import React from 'react';

export default function Contact({ email, phone }: { email: string; phone: string }) {
	return (
		<section id="contact" className="contact">
			<div className="container">
				<h2>Contact</h2>
				<p>For more information, I can be reached at:</p>

				<div className="contact-list">
					<div className="contact-item">
						{/* envelope icon */}
						<svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
							<path d="M3 7.5L12 13l9-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
						</svg>
						<a className="email" href={`mailto:${email}`}>{email}</a>
					</div>

					<div className="contact-item">
						{/* phone icon */}
						<svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M3 5.5c0 0 3.2-1.2 5.4 1s3.6 5.4 3.6 5.4 1.8 1.8 3.6 1.8 3.6-1.2 4.6-2.2c1-1 1-1 1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
							<path d="M22 16.5v3a1 1 0 0 1-1 1c-9.4 0-17-7.6-17-17A1 1 0 0 1 8 2h3a1 1 0 0 1 1 0.9c0.1 1.2.6 2.6 1.4 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
						</svg>
						<a className="phone" href={`tel:${phone}`}>{phone}</a>
					</div>
				</div>
			</div>
		</section>
	);
}
