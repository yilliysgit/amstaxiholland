//src/app/types/header/header.types.ts

export interface Logo {
  src: string;
  alt: string;
  href: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  active?: boolean;
}

export interface Language {
  code: string;
  name: string;
  flag?: string;
}

export interface HeaderConfig {
  logo: Logo;
  navigation: NavigationItem[];
  languages: Language[];
  currentLanguage: string;
}

export interface MobileMenuState {
  isOpen: boolean;
  activeItem?: string;
}

// Component Props Types
export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  label?: string;
  controlsId?: string;
}

// Fixed: consistent prop names met onze components
export interface LanguageSwitcherProps {
  languages: Language[];
  current: string;  // ✅ Consistent met component
  onChange?: (language: string) => void;  // ✅ Consistent met component
  className?: string;
}

export interface LogoProps {
  logo: Logo;
  className?: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

// UI Button Types
export interface ButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface LoginButtonProps extends ButtonProps {
  showIcon?: boolean;
    onClick?: () => void;  // Open modal

}
