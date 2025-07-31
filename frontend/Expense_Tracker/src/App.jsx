import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from "./pages/Auth/Login";
import SignUp from './pages/Auth/SignUp';
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { UserProvider } from "./context/userContext";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <Router>
        {/* ✅ Toaster should be here, inside Router */}
        <Toaster
          toastOptions={{
            style: {
              fontSize: '13px',
            },
          }}
          position="top-center"
        />

        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
