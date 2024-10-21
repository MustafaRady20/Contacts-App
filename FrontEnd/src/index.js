import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import './index.css';
import SignUp from './pages/SignUp';
import SignIn from "./pages/SignIn"
import Layout from './pages/Layout';
import ContactsListPage from './pages/ContactsListPage';
import { Provider } from 'react-redux';
import store from './store';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SignIn />
      },
      {

        path: "sign-up",
        element: <SignUp />
      },
      {

        path: "contacts",
        element: <ContactsListPage />
      }

    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

