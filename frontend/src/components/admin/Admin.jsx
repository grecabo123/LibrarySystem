import React, { useRef, useState } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AdminRoutes from '../../routes/AdminRoutes'
import { Divider } from 'primereact/divider';
import { Menubar } from 'primereact/menubar';
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback, FcSpeaker } from 'react-icons/fc'
import { FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFile, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaUser, FaUserAlt, FaUsers } from 'react-icons/fa'
import { Button } from 'primereact/button';
import axios from 'axios';
import swal from 'sweetalert';
import { HiOutlineX } from "react-icons/hi";
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { BiLogOut } from 'react-icons/bi'
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';


function Admin() {

    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const menu = useRef(null);

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
        // { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        // { label: 'My Account', icon: 'pi pi-fw pi-user' },
        // { label: <span>Sidebar</span>, icon: 'pi pi-fw pi-user' },
        { label: <span className='text-danger fw-bold' onClick={Logout}>Logout</span>, icon: 'pi pi-fw pi-power-off' },
    ];


    return (
        <>
            <div class="sidebar sidebar-dark sidebar-fixed" id="sidebar">
                <div class="sidebar-brand d-none d-md-flex">
                    <h4>ADMIN</h4>
                </div>
                <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li class="nav-item"><a class="nav-link fs-5">
                    </a></li>

                    <li class="nav-title">Pages</li>
                    <li class="nav-item"><a class="nav-link" href="/admin">
                        <FcHome className='nav-icon' /> Dashboard</a></li>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <FcManager className='nav-icon' />Accounts</a>
                    </li>
                    <div class="collapse" id='collapseOne'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/accounts"> <span className='nav-icon'></span> Registered Account</Link></li>
                        {/* <li class="nav-item"><Link class="nav-link" to="/admin/accounts/add"> <span className='nav-icon'></span>Register Email</Link></li> */}
                    </div>
                    {/* Chart */}
                    <li class="nav-title">Chart</li>
                    <li class="nav-item"><Link class="nav-link" to="/admin/reports">
                        <FaChartLine className='nav-icon' /> Reports</Link></li>
                    {/* History */}
                    <li class="nav-title">Manage</li>
                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#price">
                        <FaFile className='nav-icon' />Thesis Files</a>
                    </li>
                    <div class="collapse" id='price'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/upload"> <span className='nav-icon'></span> Upload Thesis Files</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/noaccount" ><span className='nav-icon'></span>Upload No Account</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/list" ><span className='nav-icon'></span>List of Thesis</Link></li>
                    </div>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#department">
                        <FaBuilding className='nav-icon' />Add</a>
                    </li>
                    <div class="collapse" id='department'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/department"> <span className='nav-icon'></span>Department</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/schoolyear" ><span className='nav-icon'></span>School Year</Link></li>
                    </div>

                    {/* <li class="nav-item"><Link class="nav-link" to={`/admin/announcement`}>
                        <FcCalendar className='nav-icon' /> Annoucement</Link></li> */}

                    <li class="nav-title">History</li>
                    <li class="nav-item"><Link class="nav-link" to="/admin/logs">
                        <FaDesktop className='nav-icon' /> Activity Logs</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/history">
                        <FaUser className='nav-icon' /> Account History</Link></li>
                </ul>
            </div>

            {/* Sidebar */}
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                Content
            </Sidebar>
            {/* End of sidebar */}

            <div class="wrapper d-flex flex-column min-vh-100">
                <header class="header  mb-4">
                    <div class="container-fluid">
                        <FaBars className='text-white d-md-none' style={{ cursor: "pointer" }} size={25} onClick={(e) => setVisible(true)} />
                        <ul class="header-nav ms-auto">
                        </ul>
                        <ul class="header-nav ms-3">
                            <Menu model={items} id="popup_menu" popup ref={menu} />
                            <Avatar className='text-dark fw-bold' onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup shape='square' label='A' size='large' />
                        </ul>
                    </div>

                </header>

                <Switch>
                    {
                        AdminRoutes.map((route, idx) => {
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
                    <Redirect from='/admin' to='/admin/dashboard' />
                </Switch>
            </div>
        </>
    )
}

export default Admin