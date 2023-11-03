import Inbox from "../components/admin/pages/Message/Inbox";
import Sent from "../components/admin/pages/Message/Sent";


const AdminMessage = [
    {path: "/admin/inbox", exact: true, name: "Inbox", component: Inbox},
    {path: "/admin/sent", exact: true, name: "Inbox", component: Sent},
    {path: "/admin/trash", exact: true, name: "Inbox", component: Inbox},
];


export default AdminMessage;