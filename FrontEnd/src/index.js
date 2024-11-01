import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import { AuthProvider } from './context/authProvider';
import SignUp from './pages/SignUp';
import Login from "./pages/SignIn"
import Layout from './pages/Layout';

import ContactsListPage from './pages/ContactsListPage';
import PersistLogin from './pages/PrisistLogin';
import NotFound from './pages/404';
import RequiredAuth from './pages/RequiredAuth';

import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route path='"register' element={<SignUp />} />

            {/* protected Routes */}
            <Route element={< PersistLogin />} >
              <Route element={<RequiredAuth />}>
                <Route path='contacts' element={<ContactsListPage />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

