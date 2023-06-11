import { createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../Pages/login/Login";
import Register from "../Pages/register/Register";
import ClassesPage from "../Pages/classes/ClassesPage";
import Home from "../Pages/Home/Home";
import InstructorsPage from "../Pages/instructors/InstructorsPage";
import { Dashboard } from "../layouts/Dashboard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses";
import MyPayments from "../Pages/Dashboard/MyPayments";
import MyEnrolledClasses from "../Pages/Dashboard/MyEnrolledClasses";
import AddClass from "../Pages/Dashboard/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses";

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
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "selectedClass",
          element: <MySelectedClasses />,
        },
        {
          path: "enrolledClass",
          element: <MyEnrolledClasses />,
        },
        {
          path: "PaymentList",
          element: <MyPayments />,
        },
        {
          path: "addClass",
          element: <AddClass></AddClass>,
        },
        {
          path: "myClasses",
          element: <MyClasses />,
        },
        {
          path: "manageUsers",
          element: <ManageUsers />,
        },
        {
          path: "manageClasses",
          element: <ManageClasses/>,
        },
        {
          path: "payment/:classItemId",
          element: <Payment />,
        }
        
      ],
    }
    
  ]);
export default router;