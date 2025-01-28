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
    // } 
    return null;
 };

  return (
    <div className="App md:bg-[#F6F7F9] tracking-wide h-screen">
      <div className="md:flex tracking-wider mb-7 md:mb-0">
        <Menu />
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
