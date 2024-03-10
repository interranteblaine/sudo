import { User, UserItem } from '@sudo/shared-models';

function getMockUserItem(id: string): UserItem {
  return {
    PK: `USER#${id}`,
    SK: `PROFILE#${id}`,
    Username: 'MockUserName',
    Email: 'mockuser@gmail.com',
    CreatedAt: new Date().getTime(),
    FollowersCount: 11,
    FollowingCount: 12,
  };
}

export class UserRepository {
  // Database access logic here...

  addUser(userData: { id: string; username: string; email: string }): User {
    const userItem = {
      PK: `USER#${userData.id}`,
      SK: `PROFILE#${userData.id}`,
      Username: userData.username,
      Email: userData.email,
      CreatedAt: this.getCurrentUTCTimeAsEpoch(),
      FollowersCount: 0,
      FollowingCount: 0,
    };
    // Insert userItem into db...
    console.log(`Add user to db - PK:${userItem.PK} SK:${userItem.SK}`);
    return this.toUser(userItem);
  }

  getUserById(id: string): User | null {
    const params = {
      TableName: 'YourTableName',
      Key: {
        PK: `USER#${id}`,
        SK: `PROFILE#${id}`,
      },
    };

    try {
      const result = { Item: getMockUserItem(id) }; // Replace object with db query
      if (!result.Item) return null;
      const userItem: UserItem = result.Item as UserItem;
      return this.toUser(userItem);
    } catch (error) {
      console.error('Failed to get user by ID:', error);
      throw new Error('Failed to get user by ID.');
    }
  }

  private toUser(userItem: UserItem): User {
    return {
      id: userItem.PK.split('#')[1],
      username: userItem.Username,
      email: userItem.Email,
      createdAt: new Date(userItem.CreatedAt).toISOString(), // Convert to ISO 8601 string in UTC
      avatar: userItem.Avatar,
      followersCount: userItem.FollowersCount,
      followingCount: userItem.FollowingCount,
    };
  }

  private getCurrentUTCTimeAsEpoch(): number {
    return new Date().getTime(); // Current time in UTC as an epoch timestamp in milliseconds
  }
}
