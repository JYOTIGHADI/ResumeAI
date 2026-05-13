import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style.scss"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// import React from "react";
// import ReactDOM from "react-dom/client";

// import { RouterProvider } from "react-router-dom";

// import { router } from "./app.routes.jsx";

// import { AuthProvider } from "./features/auth/auth.context";

// import "./style.scss";

// ReactDOM.createRoot(
//   document.getElementById("root")
// ).render(
//   <React.StrictMode>

//     <AuthProvider>

//       <RouterProvider router={router} />

//     </AuthProvider>

//   </React.StrictMode>
// );