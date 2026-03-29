'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
	ArrowUpRight,
	Play,
	Zap,
	Palette,
	BarChart3,
	Shield,
} from 'lucide-react';
import Hls from 'hls.js';

function BlurText({
	text,
	className,
	delayOffset = 0,
}: {
	text: string;
	className?: string;
	delayOffset?: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });
	const words = text.split(' ');

	return (
		<div
			ref={ref}
			className={`flex flex-wrap justify-center ${className}`}
		>
			{words.map((word, i) => (
				<motion.span
					key={i}
					initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
					animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.35, delay: delayOffset + i * 0.1 }}
					className='mr-[0.25em]'
				>
					{word}
				</motion.span>
			))}
		</div>
	);
}

function SectionBadge({ children }: { children: React.ReactNode }) {
	return (
		<div className='liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4'>
			{children}
		</div>
	);
}

function HLSVideo({
	src,
	className,
	style,
	desaturate,
}: {
	src: string;
	className?: string;
	style?: React.CSSProperties;
	desaturate?: boolean;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (Hls.isSupported()) {
			const hls = new Hls({ startPosition: -1 });
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.play().catch(() => {});
			});
			return () => hls.destroy();
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
			video.addEventListener('loadedmetadata', () => {
				video.play().catch(() => {});
			});
		}
	}, [src]);

	return (
		<video
			ref={videoRef}
			autoPlay
			loop
			muted
			playsInline
			className={className}
			style={{ ...style, filter: desaturate ? 'saturate(0)' : undefined }}
		/>
	);
}

function Navbar() {
	return (
		<nav className='fixed top-4 left-0 right-0 w-full px-6 z-50 flex items-center justify-between pointer-events-none'>
			<div className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center pointer-events-auto liquid-glass'>
				{/* Mock Logo */}
				<span className='font-heading italic text-2xl text-white'>S</span>
			</div>

			<div className='liquid-glass rounded-full px-2 py-2 flex items-center gap-6 pointer-events-auto'>
				<div className='hidden md:flex items-center gap-6 px-4'>
					{['Home', 'Services', 'Work', 'Process', 'Pricing'].map((v) => (
						<a
							key={v}
							href='#'
							className='text-sm font-medium text-white/90 hover:text-white transition-colors'
						>
							{v}
						</a>
					))}
				</div>
				<button className='bg-white text-black font-body font-medium flex items-center gap-1 rounded-full px-5 py-2 text-sm hover:opacity-90 transition-opacity'>
					Get Started
					<ArrowUpRight className='w-4 h-4' />
				</button>
			</div>
			<div className='w-12 h-12 hidden md:block' />
			{/* balancer */}
		</nav>
	);
}

function HeroSection() {
	return (
		<section className='relative w-full h-[1000px] overflow-hidden bg-black flex flex-col pt-[150px]'>
			<video
				autoPlay
				loop
				muted
				playsInline
				className='absolute top-[20%] w-full h-auto object-contain z-0'
				src='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
			/>
			<div className='absolute inset-0 bg-black/5 z-0' />
			<div
				className='absolute bottom-0 left-0 right-0 h-[300px] z-[1]'
				style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
			/>

			<div className='z-10 relative flex flex-col items-center text-center px-4'>
				<div className='liquid-glass rounded-full p-1 pr-4 flex items-center gap-3 mb-8'>
					<div className='bg-white text-black rounded-full px-3 py-1 text-xs font-semibold'>
						New
					</div>
					<span className='text-sm font-medium text-white/90'>
						Introducing AI-powered web design.
					</span>
				</div>

				<BlurText
					text='The Website Your Brand Deserves'
					className='text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px] max-w-4xl'
				/>

				<motion.p
					initial={{ filter: 'blur(10px)', opacity: 0 }}
					animate={{ filter: 'blur(0px)', opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className='font-body font-light text-white/60 text-lg md:text-xl mt-8 max-w-xl'
				>
					Stunning design. Blazing performance. Built by AI, refined by experts.
					This is web design, wildly reimagined.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1.1 }}
					className='flex flex-col sm:flex-row items-center gap-4 mt-10'
				>
					<button className='liquid-glass-strong text-white font-body font-medium flex items-center gap-2 rounded-full px-8 py-4 text-base hover:bg-white/10 transition-colors'>
						Get Started
						<ArrowUpRight className='w-4 h-4' />
					</button>
					<button className='text-white font-body font-medium flex items-center gap-2 rounded-full px-8 py-4 text-base hover:text-white/80 transition-colors'>
						<Play className='w-4 h-4 fill-current' />
						Watch the Film
					</button>
				</motion.div>
			</div>

			<div className='mt-auto pb-8 pt-16 z-10 w-full flex flex-col items-center'>
				<SectionBadge>Trusted by the teams behind</SectionBadge>
				<div className='flex flex-wrap justify-center gap-8 md:gap-12 mt-4 px-4'>
					{['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((name) => (
						<span
							key={name}
							className='text-2xl md:text-3xl font-heading italic text-white/80'
						>
							{name}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}

function StartSection() {
	return (
		<section className='relative w-full min-h-[700px] py-32 px-6 md:px-16 lg:px-24 flex items-center justify-center'>
			<HLSVideo
				src='https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'
				className='absolute inset-0 w-full h-full object-cover z-0'
			/>
			<div className='absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-0' />
			<div className='absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-0' />

			<div className='relative z-10 flex flex-col items-center text-center max-w-3xl min-h-[500px] justify-center'>
				<SectionBadge>How It Works</SectionBadge>
				<h2 className='text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-2 mb-6'>
					You dream it. We ship it.
				</h2>
				<p className='font-body font-light text-white/60 text-lg md:text-xl mb-10'>
					Share your vision. Our AI handles the rest—wireframes, design, code,
					launch. All in days, not quarters.
				</p>
				<button className='liquid-glass-strong text-white font-body font-medium flex items-center gap-2 rounded-full px-8 py-4 text-base hover:bg-white/10 transition-colors'>
					Get Started
					<ArrowUpRight className='w-4 h-4' />
				</button>
			</div>
		</section>
	);
}

function FeaturesChessSection() {
	return (
		<section className='py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto'>
			<div className='mb-20 text-center'>
				<SectionBadge>Capabilities</SectionBadge>
				<h2 className='text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-2'>
					Pro features. Zero complexity.
				</h2>
			</div>

			<div className='flex flex-col gap-32'>
				<div className='flex flex-col lg:flex-row items-center gap-16'>
					<div className='flex-1'>
						<h3 className='text-3xl md:text-4xl font-heading italic text-white mb-6 leading-tight'>
							Designed to convert.
							<br />
							Built to perform.
						</h3>
						<p className='font-body font-light text-white/60 text-lg mb-8'>
							Every pixel is intentional. Our AI studies what works across
							thousands of top sites—then builds yours to outperform them all.
						</p>
						<button className='liquid-glass-strong text-white font-body font-medium rounded-full px-8 py-3 text-base'>
							Learn more
						</button>
					</div>
					<div className='flex-1 w-full relative'>
						<div className='liquid-glass rounded-2xl overflow-hidden aspect-[4/3] bg-white/5 flex items-center justify-center border border-white/10'>
							<div className='w-16 h-16 rounded-xl bg-white/10 animate-pulse' />{' '}
							{/* Placeholder GIF */}
						</div>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row-reverse items-center gap-16'>
					<div className='flex-1'>
						<h3 className='text-3xl md:text-4xl font-heading italic text-white mb-6 leading-tight'>
							It gets smarter.
							<br />
							Automatically.
						</h3>
						<p className='font-body font-light text-white/60 text-lg mb-8'>
							Your site evolves on its own. AI monitors every click, scroll, and
							conversion—then optimizes in real time. No manual updates. Ever.
						</p>
						<button className='text-white font-body border border-white/20 font-medium rounded-full px-8 py-3 text-base hover:bg-white/5 transition-colors'>
							See how it works
						</button>
					</div>
					<div className='flex-1 w-full relative'>
						<div className='liquid-glass rounded-2xl overflow-hidden aspect-[4/3] bg-white/5 flex items-center justify-center border border-white/10'>
							<div className='w-24 h-24 rounded-full bg-white/10 animate-pulse delay-150' />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function FeaturesGridSection() {
	const cards = [
		{
			icon: Zap,
			title: 'Days, Not Months',
			desc: 'Concept to launch at a pace that redefines fast.',
		},
		{
			icon: Palette,
			title: 'Obsessively Crafted',
			desc: 'Every detail considered. Every element refined.',
		},
		{
			icon: BarChart3,
			title: 'Built to Convert',
			desc: 'Layouts informed by data. Decisions backed by performance.',
		},
		{
			icon: Shield,
			title: 'Secure by Default',
			desc: 'Enterprise-grade protection comes standard.',
		},
	];

	return (
		<section className='py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col items-center'>
			<SectionBadge>Why Us</SectionBadge>
			<h2 className='text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-2 mb-16 text-center'>
				The difference is everything.
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
				{cards.map((card, i) => (
					<div
						key={i}
						className='liquid-glass rounded-2xl p-6 flex flex-col gap-6 items-start'
					>
						<div className='liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center text-white'>
							<card.icon className='w-5 h-5' />
						</div>
						<div>
							<h4 className='text-lg font-heading italic text-white mb-2'>
								{card.title}
							</h4>
							<p className='text-white/60 font-body font-light text-sm'>
								{card.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function StatsSection() {
	const stats = [
		{ value: '200+', label: 'Sites launched' },
		{ value: '98%', label: 'Client satisfaction' },
		{ value: '3.2x', label: 'More conversions' },
		{ value: '5 days', label: 'Average delivery' },
	];

	return (
		<section className='relative w-full py-32 px-6 md:px-16 lg:px-24 flex justify-center items-center'>
			<HLSVideo
				src='https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'
				className='absolute inset-0 w-full h-full object-cover z-0 opacity-40'
				desaturate
			/>
			<div className='absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-0' />
			<div className='absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-0' />

			<div className='relative z-10 w-full max-w-5xl'>
				<div className='liquid-glass border border-white/5 rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-black/20'>
					{stats.map((stat, i) => (
						<div
							key={i}
							className='flex flex-col gap-2'
						>
							<div className='text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]'>
								{stat.value}
							</div>
							<div className='text-white/60 font-body font-light text-sm uppercase tracking-wider'>
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function TestimonialsSection() {
	const reviews = [
		{
			quote:
				"A complete rebuild in five days. The final product looks like it took six months. It's almost unfair.",
			name: 'Sarah Chen',
			role: 'CEO Luminary',
		},
		{
			quote:
				"Conversions up 4x since launch. AI didn't just build the site, it completely optimized our funnel.",
			name: 'Marcus Webb',
			role: 'Head of Growth Arcline',
		},
		{
			quote:
				"They didn't just design our site, they captured our exact brand essence perfectly.",
			name: 'Elena Voss',
			role: 'Brand Director Helix',
		},
	];

	return (
		<section className='py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col items-center'>
			<SectionBadge>What They Say</SectionBadge>
			<h2 className='text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-2 mb-16 text-center'>
				Don't take our word for it.
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
				{reviews.map((r, i) => (
					<div
						key={i}
						className='liquid-glass rounded-2xl p-8 flex flex-col justify-between min-h-[220px]'
					>
						<p className='text-white/80 font-body font-light text-[15px] italic leading-relaxed mb-8'>
							"{r.quote}"
						</p>
						<div>
							<div className='text-white font-body font-medium text-sm'>
								{r.name}
							</div>
							<div className='text-white/50 font-body font-light text-xs mt-0.5'>
								{r.role}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function CTAFooter() {
	return (
		<section className='relative w-full py-32 pb-8 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center text-center mt-20'>
			<HLSVideo
				src='https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'
				className='absolute inset-0 w-full h-full object-cover z-0 opacity-50'
			/>
			<div className='absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-0' />
			<div className='absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-0' />

			<div className='relative z-10 flex flex-col items-center w-full max-w-3xl'>
				<h2 className='text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-6'>
					Your next website starts here.
				</h2>
				<p className='font-body font-light text-white/70 text-lg md:text-xl mb-10'>
					Book a free strategy call. See what AI-powered design can do.
				</p>

				<div className='flex flex-col sm:flex-row gap-4 mb-32'>
					<button className='liquid-glass-strong text-white font-body font-medium rounded-full px-8 py-4 text-base hover:bg-white/10 transition-colors'>
						Book a Call
					</button>
					<button className='bg-white text-black font-body font-medium rounded-full px-8 py-4 text-base hover:opacity-90 transition-opacity'>
						View Pricing
					</button>
				</div>

				<div className='w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs font-body font-light'>
					<div>© 2026 Studio. All rights reserved.</div>
					<div className='flex gap-6'>
						<a
							href='#'
							className='hover:text-white/80 transition-colors'
						>
							Privacy
						</a>
						<a
							href='#'
							className='hover:text-white/80 transition-colors'
						>
							Terms
						</a>
						<a
							href='#'
							className='hover:text-white/80 transition-colors'
						>
							Contact
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function LandingPage() {
	return (
		<main className='min-h-screen bg-black text-white font-body selection:bg-white/20 selection:text-white overflow-hidden pb-0 flex flex-col'>
			<Navbar />
			<HeroSection />
			<StartSection />
			<FeaturesChessSection />
			<FeaturesGridSection />
			<StatsSection />
			<TestimonialsSection />
			<CTAFooter />
		</main>
	);
}
