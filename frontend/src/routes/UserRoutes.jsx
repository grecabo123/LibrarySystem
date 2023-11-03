import AddProduct from "../components/users/pages/AddProduct";
import Dashboard from "../components/users/pages/Dashboard";
import InviteUser from "../components/users/pages/InviteUser";
import Logs from "../components/users/pages/Logs";
import ProductDetails from "../components/users/pages/ProductDetails";
import ProductList from "../components/users/pages/ProductList";
import UpdateProducts from "../components/users/pages/UpdateProducts";


const UserRoutes = [
    {path: "/user/dashboard", exact: true, name: "Dashboard", component: Dashboard},
    {path: "/user/product", exact: true, name: "product", component: ProductList},
    {path: "/user/add", exact: true, name: "product", component: AddProduct},
    {path: "/user/invite", exact: true, name: "invite", component: InviteUser},
    {path: "/user/logs", exact: true, name: "Logs", component: Logs},
    {path: '/user/update/refid=:id', exact: true, name: "Products", component: UpdateProducts},
    {path: '/user/product/details/refid=:id', exact: true, name: "Products", component: ProductDetails},

];

export default UserRoutes;