import React from 'react';
import { FaSchool, FaUniversity, FaBriefcase, FaCloud, FaAward, FaLaptopCode, FaCheckCircle } from 'react-icons/fa';

export default function About({
	bio = '',
	skills = []
}: { bio?: string; skills?: string[] }) {
	const sectionHeaderStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		fontWeight: 700,
		fontSize: '1.1rem',
		color: '#38bdf8',
		marginTop: 22,
		marginBottom: 6,
		letterSpacing: 0.5,
	};

	const achievementStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: 6,
		color: '#22d3ee',
		fontWeight: 600,
		fontSize: '0.98rem',
		marginTop: 4,
		marginBottom: 4,
	};

	const paragraphStyle = {
		fontSize: '1rem',
		lineHeight: 1.6,
		color: '#e3e8ee',
		marginBottom: 8,
		fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
	};

	const detailedBio = (
		<div style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif', color: '#e3e8ee', fontSize: '1rem' }}>
			<div style={sectionHeaderStyle}>
				<FaSchool />
				Early Education
			</div>
			<p style={paragraphStyle}>
				Hiranandani Foundation School, Thane (2012–2014). Sparked my interest in computers.
			</p>
			<div style={achievementStyle}>
				<FaAward />
				Scored 98/100 in Computer Science, First Class.
			</div>

			<div style={sectionHeaderStyle}>
				<FaUniversity />
				B.E. Computer Science (2014–2018)
			</div>
			<p style={paragraphStyle}>
				St. Francis Institute of Technology, Mumbai. Built a hand-gesture recognition system (OpenCV) for my final project.
			</p>
			<div style={achievementStyle}>
				<FaAward />
				Campus placement: Montran Corporation.
			</div>

			<div style={sectionHeaderStyle}>
				<FaBriefcase />
				Associate Software Developer at Montran Corporation (2018–2021)
			</div>
			<ul style={{ marginLeft: 22, marginBottom: 8, color: '#e3e8ee', fontSize: '0.98rem' }}>
				<li>Attended 3-month Java training for industry readiness.</li>
				<li>Developed and deployed a Leave Management System (Struts, Hibernate, JSP) on internal servers.</li>
				<li>Implemented mail notifications for leave requests and approvals.</li>
				<li>Upgraded UI for NACH Application (Standard Chartered Bank) using HTML/CSS for gradients, color schemes, and improved readability.</li>
				<li>Created an e-Mandate application (Spring Boot, Bootstrap) to capture and forward client data to NPCI.</li>
				<li>Delivered NACH dashboard for Kotak Mahindra Bank: daily/monthly counts, status-wise summaries, bulk upload parser, and performance improvements (Hibernate, indexing, Struts).</li>
				<li>Promoted to Software Developer; mentored new joiners.</li>
			</ul>
			<div style={achievementStyle}>
				<FaAward />
				Star Performer of the Quarter for excellent delivery and client support.
			</div>

			<div style={sectionHeaderStyle}>
				<FaBriefcase />
				Software Engineer at Wissen Technology (2022–2023)
			</div>
			<ul style={{ marginLeft: 22, marginBottom: 8, color: '#e3e8ee', fontSize: '0.98rem' }}>
				<li>Contracted to Amazon for Smart Store initiative: deployed AWS CDK/SDK blueprints for Amazon Pay in local stores.</li>
				<li>Developed Lambda functions to automate merchant rewards and update DynamoDB for successful Amazon Pay promotions.</li>
			</ul>
			<div style={achievementStyle}>
				<FaAward />
				Praised for excellent performance by client and project manager.
			</div>

			<div style={sectionHeaderStyle}>
				<FaLaptopCode />
				Conestoga College (Jan–Aug 2024)
			</div>
			<p style={paragraphStyle}>
				Learned C#, ASP.NET, SQL Server, React Native, Selenium, and built a music player app.
			</p>
			<div style={achievementStyle}>
				<FaAward />
				GPA: 3.52
			</div>

			<div style={sectionHeaderStyle}>
				<FaCloud />
				George Brown College (Sep 2024–Sep 2025)
			</div>
			<p style={paragraphStyle}>
				Windows &amp; Linux admin, VMware, networking, Azure, AWS, Microsoft 365. Built a 3-tier cloud app.
			</p>
			<div style={achievementStyle}>
				<FaAward />
				GPA: 3.76
			</div>
		</div>
	);

	// if nothing to show, render a small placeholder to avoid crashes
	if (!bio && (!skills || skills.length === 0)) {
		return (
			<section id="about" className="about">
				<div className="container">
					<h2>About</h2>
					<p>No bio provided yet.</p>
				</div>
			</section>
		);
	}

	return (
		<>
			<section id="about" className="about">
				<div className="container" style={{
					fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
					background: '#181f2a',
					borderRadius: 12,
					padding: '2rem 1.5rem',
					boxShadow: '0 2px 12px rgba(2,6,23,0.12)'
				}}>
					<h2 style={{
						fontWeight: 800,
						fontSize: '2rem',
						color: '#38bdf8',
						letterSpacing: 1,
						marginBottom: 16
					}}>About</h2>
					{detailedBio}
					{/* Next button to Skills section */}
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
						<a
							href="#skills"
							aria-label="Go to Skills"
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 56,
								height: 56,
								borderRadius: 999,
								background: 'linear-gradient(90deg,#06b6d4,#00ffd1)',
								color: '#181f2a',
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

			{/* Skills section */}
			<section id="skills" className="skills" aria-label="Skills">
				<div className="container" style={{ paddingTop: 0 }}>
					<h2 style={{ marginTop: 0, marginBottom: 12 }}>Skills</h2>

					{/* Back end row */}
					<div
						className="skill-row"
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem',
							alignItems: 'flex-start',
							marginTop: '1rem'
						}}
					>
						<div style={{ flex: '1 1 100%', marginBottom: 0 }}>
							<h3 style={{ margin: '0 0 12px 0' }}>Back end development</h3>

							<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
								{/* Expert */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--success, #10b981)', /* success green */
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--success, #10b981)' }}>Expert</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										Java (OOP, Collections, Multithreading, Lambdas, JPA/Hibernate, Spring Boot, Struts, JSP, Jersey REST)
									</p>
								</div>

								{/* Intermediate */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--accent, #06b6d4)',
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--accent, #06b6d4)' }}>Intermediate</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										C# ASP.NET, Swagger, GraphQL, Linux
									</p>
								</div>

								{/* Hands on */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--warning, #f59e0b)', /* warning yellow */
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--warning, #f59e0b)' }}>Hands on</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										Python Flask, Node.js
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Front END row */}
					<div
						className="skill-row"
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem',
							alignItems: 'flex-start',
							marginTop: '1rem'
						}}
					>
						<div style={{ flex: '1 1 100%', marginBottom: 0 }}>
							<h3 style={{ margin: '0 0 12px 0' }}>Front END</h3>

							<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
								{/* Expert */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--success, #10b981)', /* success green */
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--success, #10b981)' }}>Expert</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										HTML/CSS, Bootstrap, JavaScript, jQuery
									</p>
								</div>

								{/* Intermediate */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--accent, #06b6d4)',
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--accent, #06b6d4)' }}>Intermediate</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										React, TypeScript
									</p>
								</div>

								{/* Hands on */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--warning, #f59e0b)', /* warning yellow */
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--warning, #f59e0b)' }}>Hands on</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										React Native
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Cloud row */}
					<div
						className="skill-row"
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem',
							alignItems: 'flex-start',
							marginTop: '1rem',
							marginBottom: '1rem'
						}}
					>
						<div style={{ flex: '1 1 100%', marginBottom: 0 }}>
							<h3 style={{ margin: '0 0 12px 0' }}>Cloud</h3>

							<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
								{/* Expert */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--success, #10b981)', /* success green */
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--success, #10b981)' }}>Expert</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										AWS (Lambda, DynamoDB, VPC, CloudFront, CloudWatch, Cognito, ACM, Route53, SNS, SES)
									</p>
								</div>

								{/* Intermediate */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--accent, #06b6d4)',
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--accent, #06b6d4)' }}>Intermediate</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										ECS
									</p>
								</div>

								{/* Hands on */}
								<div
									style={{
										flex: '1 1 30%',
										minWidth: 200,
										borderLeft: '3px solid var(--warning, #f59e0b)', /* warning yellow */
										paddingLeft: 12
									}}
								>
									<h4 style={{ margin: 0, color: 'var(--warning, #f59e0b)' }}>Hands on</h4>
									<p style={{ marginTop: 8, lineHeight: 1.6 }}>
										Azure, VMWare, Microsoft 365 administration
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Next button to Contact section */}
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
						<a
							href="#contact"
							aria-label="Go to Contact"
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 56,
								height: 56,
								borderRadius: 999,
								background: 'linear-gradient(90deg,#06b6d4,#00ffd1)',
								color: '#181f2a',
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

			{/* Certifications section */}
			<section id="certifications" className="certifications" aria-label="Certifications">
				<div className="container" style={{
					marginTop: 0,
					paddingTop: 0,
					paddingBottom: '0.7rem',
					background: 'none'
				}}>
					<h2 style={{
						marginTop: 0,
						marginBottom: 12,
						color: '#fff'
					}}>Certifications</h2>
					<ul style={{
						listStyle: 'none',
						paddingLeft: 0,
						color: '#fff',
						fontSize: '1rem',
						fontWeight: 500
					}}>
						<li style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
							<FaCheckCircle style={{ color: '#10b981', marginRight: 8 }} />
							Oracle Certified Java 8 Associate
						</li>
						<li style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
							<FaCheckCircle style={{ color: '#10b981', marginRight: 8 }} />
							AWS Certified Cloud Practitioner
						</li>
						<li style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
							<FaCheckCircle style={{ color: '#10b981', marginRight: 8 }} />
							Linux Essentials
						</li>
					</ul>
				</div>
			</section>
		</>
	);
}
