//src/app/types/header/header.types.ts

export interface Logo {
  src: string;
  alt: string;
  href: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string | { pathname: string; params?: any }; // ← Voeg deze toe voor next-intl
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

export interface LanguageSwitcherProps {
  languages: Language[];
  current: string;
  onChange?: (language: string) => void;
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

export interface ButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface LoginButtonProps extends ButtonProps {
  showIcon?: boolean;
  onClick?: () => void;
}