import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Grow - Talent Acquisition AI',
	description: 'The most powerful AI ever deployed in talent acquisition',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className='dark h-full antialiased'
		>
			<body className='min-h-full flex flex-col font-sans bg-background text-foreground'>
				{children}
			</body>
		</html>
	);
}
