import { Link, useLocation } from "react-router-dom";
import "../index.css";
import Menu from "./menu";
import Dashboard from "./dashboard";

const Home = () => {
  // const location = useLocation();

  const renderContent = () => {


    if (location.pathname === '/') {

       return <Dashboard />;

    } 
    // else if (location.pathname === '/account') {
    //    return <Account />;

    // } else if (location.pathname.startsWith('/course/')) {

    //    const courseId = location.pathname.split('/')[2];
    //    return <Course courseId={courseId} savedcourses={savedcoursesid} />;

    // } else if (location.pathname.startsWith('/faculty/')) {
    //    const faculty = location.pathname.split('/')[2];
    //    return <Courses faculty={faculty} />;
    // }
    return null;
 };

  return (
    <div className="App md:bg-[#F6F7F9] tracking-wide h-screen">
      <div className="md:flex md:mx-auto justify-center tracking-wider mb-7 md:mb-0">
        <Menu />
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
