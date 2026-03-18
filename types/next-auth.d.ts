import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    username?: string;
    user: {
      /** The user's id from the database */
      id?: string;
      /** The user's username */
      username?: string;
    } & DefaultSession['user'];
  }

  interface User {
    username?: string;
    followers?: number;
    verified?: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username?: string;
  }
}
