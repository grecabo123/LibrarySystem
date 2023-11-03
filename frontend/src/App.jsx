import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/admin/Admin';
import PrivateAdminRoutes from './private/PrivateAdminRoutes';
import PrivateUserRoutes from './private/PrivateUserRoutes';
import SearchProduct from './components/SearchProduct';
import Results from './components/ProductsSearch/Results';
import DetailsItem from './components/Bidding/Details/DetailsItem';
import PrimeReact from 'primereact/api';
import Frontpage from './components/frontpage/Frontpage';

// default laravel url
axios.defaults.baseURL = "http://127.0.0.1:8000/";

// Apartment url
// axios.defaults.baseURL = "http://192.168.1.17:8000/";

// Office
// axios.defaults.baseURL ="http://192.168.1.227:8000/";

axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

function App() {

    PrimeReact.ripple = true;

    return (
        <div className='d-flex flex-column min-vh-100'>
            <Router>
                <Switch>
                    <Route path="/" name="landing" exact={true} component={Frontpage} />
                    <Route path="/register" name="landing" exact={true} component={Register} />
                    <Route path='/login' name='login' exact={true} component={Login} />
                    <Route path='/search/product' name="Search" exact={true} component={SearchProduct} />
                    <Route path='/search/results=:id' name="Search" exact={true} component={Results} />
                    <Route path="/details/product/refid=:id" name="Details" exact={true} component={DetailsItem} />
                    {/* Private Routes */}
                    <PrivateAdminRoutes path="/admin" name="Admin" />

                    {/* User Routes */}
                    <PrivateUserRoutes path="/user" name="User" />
                </Switch>
            </Router>
        </div>
    )
}

export default App