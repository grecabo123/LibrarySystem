import React, { useRef } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Divider } from 'primereact/divider';
import { Menubar } from 'primereact/menubar';
import { FcComments, FcOvertime, FcOpenedFolder, FcHome, FcList, FcPositiveDynamic, FcPaid, FcHighPriority, FcFolder, FcSms } from 'react-icons/fc'
import { FaBars, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaSearch, FaUserAlt, FaUsers } from 'react-icons/fa'
import { Button } from 'primereact/button';
import axios from 'axios';
import {HiUserAdd} from 'react-icons/hi'
import swal from 'sweetalert';
import UserRoutes from '../../routes/UserRoutes';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { BiLogOut } from 'react-icons/bi';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
 
function User() {

    const history = useHistory();
    const menu = useRef();
    const Logout = () => {
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_id');
                swal('Success', res.data.message, 'success');
                history.push('/login');
            }
        });
    }

    let items = [
        { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        { label: 'My Account', icon: 'pi pi-fw pi-user' },
        // { label: <span>Sidebar</span>, icon: 'pi pi-fw pi-user' },
        // { label: <span className='text-primary fw-bold' onClick={Logout}>Account Rating</span>, icon: 'pi pi-fw pi-power-off' },
        { label: <span className='text-danger fw-bold' onClick={Logout}>Logout</span>, icon: 'pi pi-fw pi-power-off' },
    ];

    return (
        <>
            <div class="sidebar sidebar-dark sidebar-fixed" id="sidebar">
                <div class="sidebar-brand d-none d-md-flex">
                    <h4>Users</h4>
                </div>
                <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li class="nav-item"><a class="nav-link fs-5">
                       </a></li>

                    <li class="nav-title">Pages</li>
                    <li class="nav-item"><a class="nav-link" href="/user">
                        <FaSearch className='nav-icon' />Search Thesis</a></li>
                        
                    
                    <li class="nav-item"><Link class="nav-link" to="/user/product">
                        <FcFolder className='nav-icon' />Archives</Link></li>
                    <li class="nav-item"><a class="nav-link">
                        <FaDesktop className='nav-icon' /> Activity Logs  </a></li>

                    
                </ul>
            </div>
            <div class="wrapper d-flex flex-column min-vh-100">
                <header class="header  mb-4">
                    <div class="container-fluid">

                        <Button className='p-button-sm p-button-info p-button-outlined' icon={PrimeIcons.REFRESH} label='Refresh' />

                        <ul class="header-nav ms-auto">
                        </ul>
                        <ul class="header-nav ms-3">
                            <li class="nav-item dropdown"><a class="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <Menu model={items} id="popup_menu" popup ref={menu}  />
                            <Avatar className='text-white fw-bold' onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup  shape='square' label='A' size='large' />
                                {/* <div class="avatar avatar-md"> <Avatar className='text-white fw-bold' shape='square' label='A'  size='large' /> </div> */}
                            </a>
                            </li>
                        </ul>
                    </div>

                </header>
                <Switch>
                    {
                        UserRoutes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => <route.component {...props} />}
                                    />
                                )
                            )
                        })
                    }
                    <Redirect from='/user' to='/user/dashboard' />
                </Switch>
            </div>
        </>
    )
}

export default User