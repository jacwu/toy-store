'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/lib/api'; // Import userApi

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const responseData = await userApi.registerUser(username, password);

      if (responseData.success) {
        setSuccessMessage(responseData.message || 'Registration successful! You can now log in.');
        setUsername('');
        setPassword('');
        // Optionally redirect after a delay:
        // setTimeout(() => router.push('/login'), 2000); 
      } else {
        // This path might be taken if the API returns a 2xx status but with success: false
        setError(responseData.message || 'An unexpected error occurred.');
      }
    } catch (err: any) { // Errors thrown by userApi (e.g., network error, 4xx/5xx responses)
      if (err && err.message) { // err.message should contain the backend's error message
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '1rem' }}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ padding: '0.75rem', backgroundColor: isLoading ? '#ccc' : '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
