import logoSrc from '../assets/logo.svg';

interface LogoProps {
  className?: string;
  size?: number;
  /** 
   * 'white'  — inverts black SVG to white (for dark nav/sidebar backgrounds)
   * 'dark'   — keeps original black (for light backgrounds)
   * 'blue'   — tints to brand blue
   */
  variant?: 'white' | 'dark' | 'blue';
}

const FILTER: Record<string, string> = {
  white : 'brightness(0) invert(1)',
  dark  : 'none',
  blue  : 'brightness(0) saturate(100%) invert(40%) sepia(90%) saturate(500%) hue-rotate(200deg)',
};

export function Logo({ className = '', size = 40, variant = 'white' }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="M/s. S.A Construction"
      width={size}
      height={size}
      className={`object-contain select-none ${className}`}
      style={{ filter: FILTER[variant] }}
      draggable={false}
    />
  );
}
