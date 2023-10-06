import { Home } from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AllCourses from "./components/AllCourses";
import ConsumeContent from "./components/ConsumeContent";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/all-courses',
    element: <AllCourses/>
  },
  {
    path: '/course-id',
    element: <ConsumeContent/>
  }


];

export default AppRoutes;
