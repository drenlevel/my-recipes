// Libs
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

// Components
import { AuthProvider } from '#components/AuthProvider/AuthProvider';
import { DataProvider } from '#components/DataProvider/DataProvider';
import ResetAccount from '#components/ResetAccount';
import { Home } from '#components/Home/Home';
import { Login } from '#components/Login/Login';
import { RequireAuthRoute } from '#components/RequireAuthRoute/RequireAuthRoute';
import { SignUp } from '#components/Signup/Signup';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({ typography: { fontFamily: '' } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route element={<RequireAuthRoute />}>
                <Route path="/home" search={`?recipe`} element={<Home />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-account" element={<ResetAccount />} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
