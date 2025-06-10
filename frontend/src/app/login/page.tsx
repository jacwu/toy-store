'use client';

import { useState } from 'react';
// useRouter might still be needed if there are other navigation needs, but not for login success redirection.
// import { useRouter } from 'next/navigation'; 
import { userApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter(); // Replaced by useAuth for redirection on login
  const { login } = useAuth(); // Get login function from AuthContext

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await userApi.loginUser(username, password);
      // response.data from backend is { success: true, message: 'Login successful', data: { id, username } }
      
      if (response && response.success && response.data) {
        login(response.data); // Call context's login function
        // localStorage and router.push('/') are handled by AuthContext's login
      } else {
        // This path might not be commonly hit if userApi throws for non-2xx and non-success responses.
        setError(response.message || 'Login failed, please check your credentials.');
      }
    } catch (err: any) {
      // err should be the object thrown by userApi, which is error.response.data from axios
      // Expected error format: { success: false, message: "..." }
      if (err && err.message) {
        if (err.message.toLowerCase().includes('invalid username or password') || 
            err.message.toLowerCase().includes('user not found') ||
            err.message.toLowerCase().includes('invalid credentials')) { // Added 'invalid credentials'
          setError('Invalid username or password');
        } else {
          setError(err.message); 
        }
      } else {
        setError('Login failed, unknown error occurred, please try again later');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Please enter username"
            required
            disabled={isLoading}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter password"
            required
            disabled={isLoading}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '10px 15px', backgroundColor: isLoading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
