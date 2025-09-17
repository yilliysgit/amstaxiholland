export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Nieuw: Modal types
export interface LoginFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}