import { Card } from 'primereact/card'
import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component'

function Inbox() {

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
        <Card>
            <DataTable
                className='w-100'
                title="Inbox"
                pagination
                selectableRows
                theme='solarized'
            />
        </Card>
    )
}

export default Inbox