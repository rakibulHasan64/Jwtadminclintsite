import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AuthProvider from './componet/provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Login from './componet/register/Login';
import Regsiter from './componet/register/Regsiter';
import HomeLayout from './componet/homelayout/HomeLayout';
import AddCar from './componet/addcar/AddCar';
import AllCars from './componet/allcars/AllCars';
import MyCars from './componet/mycars/MyCars';
import DetlisPage from './componet/detlispage/DetlisPage';
import MyBooking from './componet/mybookingepage/MyBooking';
import ErrorPage from './componet/home/ErrorPage';
import PriverRoute from './componet/provider/PriverRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
    
      {
        path: "/",
        index: true,
        element: <HomeLayout />
      
      },

      {
        path: "/available-cars",
        element: <AllCars />

      },
      {
        path: "/my-cars",
        element: <PriverRoute><MyCars /></PriverRoute>
        

      },
      {
        path: "/my-bookings",
        element: <PriverRoute><MyBooking /></PriverRoute>

      },

      {
        path: "/detlis/:id",
        element: <PriverRoute><DetlisPage /></PriverRoute>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:5000/cardetlis/${params.id}`);
          return res.json();
        },
      },
      

      {

        path: "/addcar",
        element: <PriverRoute><AddCar /></PriverRoute>
         
      },


      {
        path: "/login",
        element: <Login />
      },

      {
        path: "/regsiter",
        element: <Regsiter />
      }
      
    ],
  
    
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
);
