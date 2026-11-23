import React from 'react';

export default function AnimeButton({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  badge,
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary-container text-on-primary border-2 border-black shadow-[4px_4px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#ffe600] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#000000]',
    secondary:
      'bg-surface-container-highest text-secondary-container border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-secondary-container hover:text-on-secondary-container hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0 active:translate-y-0',
    tertiary:
      'bg-tertiary text-on-tertiary border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-tertiary-fixed hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0 active:translate-y-0',
    ghost:
      'bg-surface-container text-on-surface border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-surface-container-high hover:text-secondary-container active:translate-x-0.5 active:translate-y-0.5',
  };

  const sizes = {
    sm: 'px-space-md py-1.5 font-label-sm text-label-sm gap-1.5',
    md: 'px-space-lg py-space-md font-label-lg text-label-lg gap-space-sm',
    lg: 'px-space-xl py-space-md font-headline-sm text-headline-sm gap-space-sm',
  };

  const baseClasses = `group relative inline-flex items-center justify-center uppercase tracking-wider transition-all duration-150 cursor-pointer select-none ${
    variants[variant] || variants.primary
  } ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {iconLeft && (
        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">
          {iconLeft}
        </span>
      )}
      <span>{children}</span>
      {badge && (
        <span className="font-label-sm text-label-sm bg-surface-container-lowest px-1.5 py-0.5 text-secondary group-hover:bg-on-secondary-container group-hover:text-secondary border border-black">
          {badge}
        </span>
      )}
      {iconRight && (
        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
          {iconRight}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} {...props}>
      {content}
    </button>
  );
}
