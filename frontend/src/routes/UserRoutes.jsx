import Dashboard from "../components/users/pages/Dashboard";
import Logs from "../components/users/pages/Logs";
import OpenDocument from "../components/users/pages/SearchResults/OpenDocument";
import SearchEngineResult from "../components/users/pages/SearchResults/SearchEngineResults";


const UserRoutes = [
    {path: "/user/dashboard", exact: true, name: "Dashboard", component: Dashboard},
    {path: '/user/search=:id', exact: true, name: "SearchEngine", component: SearchEngineResult},
    {path: '/user/document/refid=:id', exact: true, name: "ViewItem", component: OpenDocument},
    {path: '/user/logs', exact: true, name: "ViewItem", component: Logs},


];

export default UserRoutes;