export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Submission {
  id: string;
  userId: string;
  files: {
    html?: {
      name: string;
      content: string;
    };
    css?: {
      name: string;
      content: string;
    };
    js?: {
      name: string;
      content: string;
    };
  };
  submittedAt: Date;
  status: 'pending' | 'reviewed';
  feedback?: string;
  user?: {
    id: string;
    username: string;
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} 