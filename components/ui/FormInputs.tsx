import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#17231D]">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3 py-2.5 rounded-xl border bg-white text-sm text-[#17231D] placeholder-[#738078] transition-all
            focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B]
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'}
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500 mt-0.5" role="alert">
            {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-[#738078] mt-0.5">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-[#17231D]">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full px-3 py-2.5 rounded-xl border bg-white text-sm text-[#17231D] placeholder-[#738078] resize-y transition-all
            focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B]
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'}
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-0.5" role="alert">
            {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-[#738078] mt-0.5">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, className = '', id, options, placeholder, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-[#17231D]">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3 py-2.5 rounded-xl border bg-white text-sm text-[#17231D] transition-all
            focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B]
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'}
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${className}`}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-500 mt-0.5" role="alert">
            {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-[#738078] mt-0.5">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
