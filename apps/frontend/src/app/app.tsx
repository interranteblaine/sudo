import { useEffect, useState } from 'react';
import { trpcClient } from '../api/trpc';
import { User } from '@sudo/shared-models';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await trpcClient.users.get.query({
          userId: '1234',
        });
        setUser(userRes);
      } catch (error) {
        console.error('Failed to fetch message:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome frontend!</h1>
      <p>{user ? `Hello: ${user.username}` : 'User info not loaded.'}</p>
    </div>
  );
}

export default App;
