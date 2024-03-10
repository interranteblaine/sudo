// User Item:
// PK: USER#<user_id>
// SK: PROFILE#<user_id>
// FollowersCount: Number Atomic Counter Updates
// FollowingCount: Number Atomic Counter Updates
// Attributes: Username, Email, CreatedAt, Avatar

export interface UserItem {
  PK: string; // "USER#<user_id>"
  SK: string; // "PROFILE#<user_id>"
  Username: string;
  Email: string;
  CreatedAt: number; // Stored as an epoch timestamp in UTC
  Avatar?: string; // Optional
  FollowersCount: number;
  FollowingCount: number;
}

// User Relationsip (Adjacency List Pattern):
// PK (Partition Key): UserID#<user_id>
// SK (Sort Key): FOLLOWER#<follower_user_id> or FOLLOWING#<following_user_id>
// Attributes: FollowedAt, etc.

export interface UserRelationshipItem {
  PK: string; // "USER#<user_id>"
  SK: string; // "FOLLOWER#<follower_user_id>" or "FOLLOWING#<following_user_id>"
  FollowedAt: string;
}
