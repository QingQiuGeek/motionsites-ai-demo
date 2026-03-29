import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	variant?: 'default' | 'hero' | 'heroSecondary';
	size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = 'default',
			size = 'default',
			asChild = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';

		// Using simple conditional logic instead of class-variance-authority for simplicity
		const baseClass =
			'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

		const variants = {
			default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
			hero: 'bg-primary text-primary-foreground rounded-full px-6 py-3 text-base font-medium hover:bg-primary/90',
			heroSecondary:
				'liquid-glass text-foreground rounded-full px-6 py-3 text-base font-normal hover:bg-white/5',
		};

		const sizes = {
			default: 'h-9 px-4 py-2',
			sm: 'h-8 rounded-md px-3 text-xs',
			lg: 'h-10 rounded-md px-8',
			icon: 'h-9 w-9',
		};

		const compiledClasses = cn(
			baseClass,
			variants[variant],
			variant !== 'hero' && variant !== 'heroSecondary' ? sizes[size] : '', // Custom variants define their own padding/sizing in the prompt
			className,
		);

		return (
			<Comp
				className={compiledClasses}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button };
