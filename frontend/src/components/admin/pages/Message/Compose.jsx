import React, { useState } from 'react'
import { Editor } from 'primereact/editor';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { InputText } from 'primereact/inputtext';


function Compose() {

    const [text, setText] = useState([]);
    const header = <>
        <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className='text-white'>Compose Message</h5>
            <Link to="/admin/message"> <Button className='p-button-sm p-button-info' label='Back' /></Link>
        </div>
    </>
    return (
        <div className="container">
            <Panel headerTemplate={header}>
                <div className="mb-3 row">
                    <div className="col-lg-6">
                        <InputText className='w-100' name='' placeholder='To' />
                    </div>
                    <div className="col-lg-6">
                        <InputText className='w-100' name='' placeholder='Subject' />
                    </div>
                </div>
                <Editor style={{ height: '400px', fontSize: "20px" }} value={text} onTextChange={(e) => setText(e.htmlValue)} />
                <div className="mt-2">
                    <Button className='p-button-sm p-button-info' label='Send Email'></Button>

                </div>
            </Panel>
        </div>
    )
}

export default Compose