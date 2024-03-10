export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatar?: string;
  followersCount: number;
  followingCount: number;
}
