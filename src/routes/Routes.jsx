import { createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../Pages/login/Login";
import Register from "../Pages/register/Register";
import ClassesPage from "../Pages/classes/ClassesPage";
import Home from "../Pages/Home/Home";
import InstructorsPage from "../Pages/instructors/InstructorsPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children: [
            {
              path: "/",
              element:<Home></Home>

            },
            {
            path: "/login",
            element:<Login></Login>,
            },
            {
            path: "/register",
            element:<Register></Register>
            },
            {
            path: "/classes",
            element : <ClassesPage></ClassesPage>
            },
            {
              path : '/instructors',
              element : <InstructorsPage></InstructorsPage>
            }

        ]
    },
  ]);
export default router;