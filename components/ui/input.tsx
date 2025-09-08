import * as React from 'react';
import { cn } from './utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-mutedForeground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 border-white/15',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };

