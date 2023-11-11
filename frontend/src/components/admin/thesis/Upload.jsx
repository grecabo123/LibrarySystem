import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Mention } from 'primereact/mention'
import { Panel } from 'primereact/panel'
import React from 'react'
import { useState } from 'react'

function Upload() {


    const [MonthData, setMonth] = useState([])

    const FormSubmit = (e) => {
        e.preventDefault();

        alert();
    }

    const AddKeyword = (e) => {
        e.preventDefault();
    }

    const months = [
        {label: "January", value: "January"},
        {label: "February", value: "February"},
        {label: "March", value: "March"},
        {label: "Apil", value: "Apil"},
        {label: "May", value: "May"},
        {label: "June", value: "June"},
        {label: "July", value: "July"},
        {label: "August", value: "August"},
        {label: "September", value: "September"},
        {label: "October", value: "October"},
        {label: "November", value: "November"},
        {label: "December", value: "December"},
    ]

    return (
        <div className='container-fluid'>
            <Panel header="Upload Thesis">
                <form onSubmit={FormSubmit}>
                    <Divider align="left">
                        <Badge value={"Student Details"} />
                    </Divider>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 mb-2 mt-4">
                            <label htmlFor="" className="form-label">
                                Email Student<span className='text-danger'>*</span>
                            </label>
                            <Mention className='w-100' rows={2} cols={1} autoResize={false} />
                        </div>
                        <div className="col-lg-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Department<span className='text-danger'>*</span>
                            </label>
                            <Dropdown className='w-100' />
                        </div>
                        <div className="col-lg-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Course<span className='text-danger'>*</span>
                            </label>
                            <Dropdown className='w-100 p-dropdown-sm' />
                        </div>
                    </div>
                    <div className="row">
                        <Divider align="left">
                            <Badge value={"Research Information"} />
                        </Divider>
                        <div className="col-lg-12 col-sm-12 mb-2">
                            <label className="form-label">
                                Research Title<span className='text-danger'>*</span>
                            </label>
                            <InputText className='w-100' />
                        </div>
                        <div className="col-lg-12 col-sm-12 mb-2">
                            <label className="form-label">
                                Keyword<span className='text-danger'>*</span>
                            </label>
                            <div className="p-inputgroup">
                                <InputText placeholder="Keyword" />
                                <Button label="Add" onClick={AddKeyword} icon={PrimeIcons.PLUS} />
                            </div>
                            <span className='text-danger'>*</span><small className='text-info'> Keywords atleast more thean 3</small>
                        </div>
                        <div className="col-lg-6 col-sm-12 mb-2">
                            <label className="form-label">
                                Month Publication<span className='text-danger'>*</span>
                            </label>
                            <Dropdown className='w-100' value={MonthData} options={months} onChange={(e) => setMonth(e.target.value)} placeholder='Month' />
                        </div>
                        <div className="col-lg-6 col-sm-12 mb-2">
                            <label className="form-label">
                                Year Publication<span className='text-danger'>*</span>
                            </label>
                            <InputText className='w-100' keyfilter={'int'} maxLength={4} />
                        </div>
                        <div className="col-lg-12 col-sm-12 mb-2">
                            <label className="form-label">
                                Description<span className='text-danger'>*</span>
                            </label>
                            <InputTextarea className='w-100' rows={5} cols={5} />
                        </div>
                        <div className="col-lg-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">PDF File<span className='text-danger'>*</span>
                            
                            </label>
                            <InputText type='file' className='border-0 w-100' />
                            <small><span className='text-danger'>*PDF File Only</span></small>
                        </div>
                        <div className="mt-4">
                            <Button className='p-button-success p-button-sm' label='Upload Thesis' />
                        </div>
                    </div>
                </form>
            </Panel>
        </div>
    )
}

export default Upload