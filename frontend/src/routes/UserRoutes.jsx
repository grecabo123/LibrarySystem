import Dashboard from "../components/users/pages/Dashboard";
import CourseListThesis from "../components/users/pages/ListThesis/CourseListThesis";
import CourseThesis from "../components/users/pages/ListThesis/CourseThesis";
import ListThesis from "../components/users/pages/ListThesis/ListThesis";
import Logs from "../components/users/pages/Logs";
import OpenDocument from "../components/users/pages/SearchResults/OpenDocument";
import SearchEngineResult from "../components/users/pages/SearchResults/SearchEngineResults";


const UserRoutes = [
    {path: "/user/dashboard", exact: true, name: "Dashboard", component: Dashboard},
    {path: '/user/search=:id', exact: true, name: "SearchEngine", component: SearchEngineResult},
    {path: '/user/document/refid=:id', exact: true, name: "ViewItem", component: OpenDocument},
    {path: '/user/logs', exact: true, name: "ViewItem", component: Logs},
    {path: '/user/list', exact: true, name: "ViewItem", component: ListThesis},
    {path: '/user/list/course=:id', exact: true, name: "SchoolYear", component: CourseThesis},
    {path: '/user/list/thesis=:id', exact: true, name: "SchoolYear", component: CourseListThesis},


];

export default UserRoutes;