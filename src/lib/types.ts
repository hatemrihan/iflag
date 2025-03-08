export type FormState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
    service?: string[];
  };
}; 