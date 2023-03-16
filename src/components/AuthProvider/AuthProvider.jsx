// Constants
import { Auth } from '#constants/contexts';
import { useAuthenticateUser } from '#utils/hooks';

export const AuthProvider = ({ children }) => {
  const { loading, currentUser } = useAuthenticateUser();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return <Auth.Provider value={{ currentUser }}>{children}</Auth.Provider>;
};
