import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel'
import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { FaCodepen, FaEnvelope, FaEnvelopeOpen, FaFolder, FaPen, FaTelegramPlane, FaTrash } from 'react-icons/fa';
import { FcCheckmark, FcHome, FcSms } from 'react-icons/fc';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Index() {

    createTheme('solarized', {
        text: {
            primary: '#bfc5c7',
            secondary: '#2aa198',
        },
        background: {
            default: 'transparent',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#bfc5c7',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    return (
        <div className="container">
            <Card title="Message">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <Card className='border-0' style={{ border: "none !important" }}>
                                <ul class="list-group list-group-flush">
                                    <Link class="list-group-item bg-transparent border-0 text-secondary mb-2" to="/admin/compose"><FaPen className='me-2' /> Compose Message</Link>
                                    <Divider/>
                                    <Link class="list-group-item bg-transparent border-0 text-secondary mb-2" to="/admin/inbox"><FaEnvelopeOpen className='me-2'/> Inbox</Link>
                                    <Divider/>
                                    
                                    <Link class="list-group-item bg-transparent border-0 text-secondary mb-2" to="/admin/sent"><FaTelegramPlane className='me-2' />Sent</Link>
                                    <Divider/>
                                    
                                    <Link class="list-group-item bg-transparent border-0 text-secondary mb-2"to="/admin/draft"><FaFolder className='me-2' /> Draft</Link>
                                    <Divider/>
                                    
                                    <Link class="list-group-item bg-transparent border-0 text-secondary mb-2 text-danger" to="/admin/trash"><FaTrash className='me-2' />Trash</Link>
                                </ul>
                            </Card>
                        </div>
                        <div className="col-lg-9">
                            <DataTable
                                className='w-100'
                                title="Inbox"
                                pagination
                                selectableRows
                                theme='solarized'
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Index