'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#16865B] text-white hover:bg-[#123B2A] focus:ring-[#16865B]/40 shadow-sm',
  secondary:
    'bg-[#B5E853] text-[#123B2A] hover:bg-[#a3d448] focus:ring-[#B5E853]/40 shadow-sm font-semibold',
  outline:
    'border border-[#16865B] text-[#16865B] hover:bg-[#16865B]/10 focus:ring-[#16865B]/30 bg-transparent',
  ghost:
    'text-[#16865B] hover:bg-[#16865B]/10 focus:ring-[#16865B]/20 bg-transparent',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 shadow-sm',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
