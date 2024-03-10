import { UserRepository } from '@sudo/db';
import { User } from '@sudo/shared-models';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser(
    userSub: string,
    userData: { username: string; email: string }
  ): User {
    try {
      const user = this.userRepository.addUser({
        ...userData,
        id: userSub,
      });
      return user;
    } catch (error) {
      console.error('UserService: Error creating user', error);
      throw new Error('UserService: Failed to create user.');
    }
  }

  getUserById(id: string): User | null {
    try {
      const user = this.userRepository.getUserById(id);
      if (!user) {
        console.log(`UserService: User not found for ID: ${id}`);
        return null;
      }
      return user;
    } catch (error) {
      console.error(
        'UserService: Error fetching user by ID from UserService:',
        error
      );
      throw new Error('UserService: Failed to get user by ID.');
    }
  }
}
