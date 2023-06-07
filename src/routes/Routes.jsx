import { createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../Pages/login/Login";
import Register from "../Pages/register/Register";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children: [
            {
            path: "/login",
            element:<Login></Login>,
            },
            {
            path: "/register",
            element:<Register></Register>
            }

        ]
    },
  ]);
export default router;