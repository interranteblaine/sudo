import { useEffect, useState } from 'react';
import { trpcClient } from '../api/trpc';

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await trpcClient.greeting.query();
        setGreeting(response);
      } catch (error) {
        console.error('Failed to fetch message:', error);
      }
    };
    fetchGreeting();
  }, []);

  return (
    <div>
      <h1>Welcome frontend!</h1>
      <p>{`Greeting: ${greeting}`}</p>
    </div>
  );
}

export default App;
