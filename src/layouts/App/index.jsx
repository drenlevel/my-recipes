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
import { ForgotPassword } from '#components/ForgotPassword/ForgotPassword';
import { Home } from '#components/Home/Home';
import { Login } from '#components/Login/Login';
import { MyRecipes } from '#components/Recipes/MyRecipes/MyRecipes';
import { RequireAuthRoute } from '#components/RequireAuthRoute/RequireAuthRoute';
import { SignUp } from '#components/Signup/Signup';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route element={<RequireAuthRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
