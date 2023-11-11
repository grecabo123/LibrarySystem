import axios from 'axios'
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import { Badge } from 'primereact/badge'
import { FcBusinessContact } from 'react-icons/fc';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { PrimeIcons } from 'primereact/api';
import { TabView, TabPanel } from 'primereact/tabview';
import AdminAccounts from './AdminAccounts';
import Students from './Students';
import NonStudent from './NonStudent';


function Accounts() {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className=' p-3'>
            <Card title="Accounts" >
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Admin">
                        <AdminAccounts />
                    </TabPanel>
                    <TabPanel header="Students">
                        <Students />
                    </TabPanel>
                    <TabPanel header="Non Student">
                        <NonStudent />
                    </TabPanel>
                </TabView>

            </Card>
        </div>
    )
}

export default Accounts