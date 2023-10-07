import { Home } from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllCourses from "./pages/AllCourses";
import ConsumeContent from "./pages/ConsumeContent";
import InstructorSignUp from "./pages/InstructorSignUp";
import CourseDetails from "./pages/CourseDetails";
import StudentProfilePage from "./pages/StudentProfilePage";

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
  },
  {
    path: '/instructor-signup',
    element: <InstructorSignUp/>
  },
  {
    path: '/course-details/:courseId',
    element: <CourseDetails/>
  },
  {
    path: '/profile',
    element: <StudentProfilePage/>
  }


];

export default AppRoutes;
