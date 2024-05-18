import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegistrationPage.jsx";
import ProfileCRUD from "./pages/ProfileCRUD.jsx";
import PrivateRoute from "./atoms/PrivateRoute.jsx";
import CreateEventScreen from "./pages/CreateEventScreen.jsx";
import UpdateEventScreen from "./pages/UpdateEventScreen.jsx";
import EventScreen from "./pages/EventScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileCRUD />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/events" element={<EventScreen />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/create" element={<CreateEventScreen />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/update" element={<UpdateEventScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
