'use client';
import { JSX } from 'react';
import Link from 'next/link';
import React from 'react';

type Props = React.ComponentProps<'svg'> & {
  href?: string;
  // alt/src zijn niet nodig voor een inline SVG. Verwijder ze of maak ze optioneel
  alt?: string;
  src?: string;
  label?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: 'default' | 'light' | 'dark';
};

// Exporteer desgewenst ook de ruwe SVG als named export:
export function LogoSvg({
  className = '',
  width = 'auto',
  height = '50',
  variant = 'default',
  label = 'Logo',
  ...props
}: Props) {
  return (
    <svg
      viewBox="0 0 89.75 87.91"
      width={width}
      height={height}
      className={`transition-all duration-200 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      {...props}
    >
      <title>{label}</title>
      <defs>
        <style>{`
          .logo-dark-default { fill: #475467; }
          .logo-light-default { fill: #d0d5dd; }
          .logo-dark-light { fill: #667085; }
          .logo-light-light { fill: #eaecf0; }
          .logo-dark-dark { fill: #344054; }
          .logo-light-dark { fill: #98a2b3; }
        `}</style>
      </defs>
      <path
        className={`logo-dark-${variant}`}
        d="M83.46,67.89c-10-21.56-21.43-42.47-31.72-63.89-.99-1.67-2.47-3.19-4.24-3.99v35.35c0,.93,7.34,14.06,8.39,16.52.47,1.1,2.09,4.08.98,4.86-1.25.87-7.3-1.76-9.14-2.03-1.35-.2-.22.56-.22.67v22.01l38.55,10.52c2.22,0,3.68-1.97,3.7-4.07.02-3.42-4.64-12.39-6.29-15.95Z"
      />
      <path
        className={`logo-light-${variant}`}
        d="M36.82,3.78c-3.09,5.06-5.78,12.49-8.44,18.02-.98,2.05-1.79,4.39-2.67,6.23-.28.58-.6,1.17-.89,1.78-1.62,3.39-3.27,6.83-4.89,10.23-2.76,5.79-5.72,11.53-8.45,17.34-2.64,5.63-5.45,11.23-8,16.9-1.72,3.83-6.63,10.71-.44,12.9,3.7,1.31,6.13-.86,9.34-1.78,2.2-.63,4.46-1.16,6.67-1.78,2.66-.74,5.33-1.5,8-2.22,1.9-.51,13.97-3.18,14.23-4v-22.68c-.44.21-.87.32-1.33.44-1.19.32-6.06,2.31-6.4,2.26-.23-.03-1.13-1.68-1.14-2.04-.04-.96,5.32-11.06,6.17-12.98.82-1.86,1.44-4.01,2.7-5.92V.45c-.66-1.9-4.1,2.73-4.46,3.32ZM41.04,63.5c-.08-2.57-.19-5.14-.32-7.71.09.21.11.46.14.87.18,2.16.2,4.47.17,6.84Z"
      />
    </svg>
  );
}

export default function Logo({
  href,
  label = 'Ga naar home',
  className = '',
  variant = 'default',
  ...svgProps
}: Props): JSX.Element {
  const svg = (
    <LogoSvg
      {...svgProps}
      variant={variant}
      label={label}
      className={`cursor-pointer hover:opacity-80 ${className}`}
    />
  );

  if (!href) return svg;

  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy-500 hover:opacity-80 transition-opacity duration-200"
    >
      {svg}
    </Link>
  );
}
