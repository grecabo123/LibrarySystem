import Dashboard from "../components/users/pages/Dashboard";
import OpenDocument from "../components/users/pages/SearchResults/OpenDocument";
import SearchEngineResult from "../components/users/pages/SearchResults/SearchEngineResults";


const UserRoutes = [
    {path: "/user/dashboard", exact: true, name: "Dashboard", component: Dashboard},
    {path: '/user/search=:id', exact: true, name: "SearchEngine", component: SearchEngineResult},
    {path: '/user/document/refid=:id', exact: true, name: "ViewItem", component: OpenDocument},


];

export default UserRoutes;