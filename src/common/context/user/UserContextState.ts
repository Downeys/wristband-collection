export interface UserContextState {
  username: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string | null;
  userId: string | null;
  isLoading: boolean;
  error?: Error | null;
}
