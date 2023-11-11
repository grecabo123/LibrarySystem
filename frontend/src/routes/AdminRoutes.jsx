import Course from "../components/admin/Department/Course";
import CreateDepartment from "../components/admin/Department/CreateDepartment";
import AccountPending from "../components/admin/accounts/AccountPending";
import Accounts from "../components/admin/accounts/Accounts";
import ActivityLogs from "../components/admin/pages/ActivityLogs";
import Dashboard from "../components/admin/pages/Dashboard";
import Upload from "../components/admin/thesis/Upload";


const AdminRoutes = [
    {path: '/admin/dashboard', exact: true, name: "Dashbaord", component: Dashboard},
    {path: '/admin/upload', exact: true, name: "Accounts", component: Upload},
    {path: '/admin/pending', exact: true, name: "Pending", component: AccountPending},
    {path: '/admin/logs', exact: true, name: "Logs", component: ActivityLogs},
    {path: '/admin/accounts', exact: true, name: "Logs", component: Accounts},
    {path: '/admin/department', exact: true, name: "Logs", component: CreateDepartment},
    {path: '/admin/course', exact: true, name: "Logs", component: Course},
 
];

export default AdminRoutes;