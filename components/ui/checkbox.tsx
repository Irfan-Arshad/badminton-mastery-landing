import * as React from 'react';
import { cn } from './utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-lime-400 focus:ring-lime-200 focus:ring-offset-1 focus:ring-offset-[hsl(var(--background))]',
        className,
      )}
      {...props}
    />
  );
});
Checkbox.displayName = 'Checkbox';
