export interface AuthState {
  uid: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;
}