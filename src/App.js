import { AuthProvider } from './components/AuthProvider/AuthProvider';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import { SignUp } from './components/Signup/Signup';
import { RequireAuthRoute } from './components/RequireAuthRoute/RequireAuthRoute';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { MyRecipes } from './components/Recipes/MyRecipes/MyRecipes';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
