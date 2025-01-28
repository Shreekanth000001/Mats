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
    <div className="App bg-[#F1F5F9] tracking-wide h-screen">
      <div className="md:flex tracking-wider mb-7 md:mb-0">
        <Menu />
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
