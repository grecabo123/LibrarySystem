import ReportIssue from "../components/admin/Reports/ReportIssue";
import AccountDetails from "../components/admin/accounts/AccountDetails";
import AccountPending from "../components/admin/accounts/AccountPending";
import Accounts from "../components/admin/accounts/Accounts";
import ActivityLogs from "../components/admin/pages/ActivityLogs";
import Dashboard from "../components/admin/pages/Dashboard";
import Bid from "../components/admin/pages/Items/Bid";
import Compose from "../components/admin/pages/Message/Compose";
import Inbox from "../components/admin/pages/Message/Inbox";
import Index from "../components/admin/pages/Message/Index";
import Sent from "../components/admin/pages/Message/Sent";
import Copras from "../components/admin/pages/price/Copras";
import Wholenut from "../components/admin/pages/price/Wholenut";


const AdminRoutes = [
    {path: '/admin/dashboard', exact: true, name: "Dashbaord", component: Dashboard},
    {path: '/admin/registered', exact: true, name: "Accounts", component: Accounts},
    {path: '/admin/pending', exact: true, name: "Pending", component: AccountPending},
    {path: '/admin/logs', exact: true, name: "Logs", component: ActivityLogs},
    {path: '/admin/bid', exact: true, name: "Bid", component: Bid},
    {path: '/admin/message', exact: true, name: "Bid", component: Index},
    {path: '/admin/inbox', exact: true, name: "Bid", component: Inbox},
    {path: '/admin/sent', exact: true, name: "Bid", component: Sent},
    {path: '/admin/issue', exact: true, name: "Issue", component: ReportIssue},
    {path: '/admin/copras', exact: true, name: "Copras", component: Copras },
    {path: '/admin/whole', exact: true, name: "Whole", component: Wholenut },
    {path: '/admin/compose', exact: true, name: "Copras", component: Compose },
    {path: '/admin/account/refid=:id', exact: true, name: "Pending", component: AccountDetails},
];

export default AdminRoutes;