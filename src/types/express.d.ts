declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      type: 'ordinary' | 'pro';
    } | null;
  }
}
