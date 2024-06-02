import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/login-page";
import MainPage from "./pages/private/main-page";
import ChatPage from "./pages/private/main-pages/chat-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<MainPage />} />,
    children: [
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "admin",
        element: <div>TODO ADMIN</div>,
        children: [
          {
            path: "users",
            element: <div>TODO USERS</div>,
          },
          {
            path: "history",
            element: <div>TODO HISTORY</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const Routes: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default Routes;
