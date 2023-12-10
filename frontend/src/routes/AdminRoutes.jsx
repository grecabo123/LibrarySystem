import Course from "../components/admin/Department/Course";
import CreateDepartment from "../components/admin/Department/CreateDepartment";
import AccountDetails from "../components/admin/accounts/AccountDetails";
import AccountPending from "../components/admin/accounts/AccountPending";
import Accounts from "../components/admin/accounts/Accounts";
import Announcement from "../components/admin/announcement/Announcement";
import ActivityLogs from "../components/admin/pages/ActivityLogs";
import Dashboard from "../components/admin/pages/Dashboard";
import ReportsThesis from "../components/admin/pages/Reports/ReportsThesis";
import SchoolYear from "../components/admin/schoolyear/SchoolYear";
import CourseListThesis from "../components/admin/thesis/CourseListThesis";
import CourseThesis from "../components/admin/thesis/CourseThesis";
import ListDocument from "../components/admin/thesis/ListDocument";
import Upload from "../components/admin/thesis/Upload";


const AdminRoutes = [
    {path: '/admin/dashboard', exact: true, name: "Dashbaord", component: Dashboard},
    {path: '/admin/upload', exact: true, name: "Accounts", component: Upload},
    {path: '/admin/pending', exact: true, name: "Pending", component: AccountPending},
    {path: '/admin/logs', exact: true, name: "Logs", component: ActivityLogs},
    {path: '/admin/accounts', exact: true, name: "Logs", component: Accounts},
    {path: '/admin/department', exact: true, name: "Logs", component: CreateDepartment},
    {path: '/admin/course', exact: true, name: "Logs", component: Course},
    {path: '/admin/schoolyear', exact: true, name: "SchoolYear", component: SchoolYear},
    {path: '/admin/list', exact: true, name: "SchoolYear", component: ListDocument},
    {path: '/admin/reports', exact: true, name: "SchoolYear", component: ReportsThesis},
    {path: '/admin/list/course=:id', exact: true, name: "SchoolYear", component: CourseThesis},
    {path: '/admin/list/thesis=:id', exact: true, name: "SchoolYear", component: CourseListThesis},
    {path: '/admin/announcement', exact: true, name: "SchoolYear", component: Announcement},
    {path: '/admin/account/refid=:id', exact: true, name: "AccountDetailsInformation", component: AccountDetails},
    
    
];

export default AdminRoutes;