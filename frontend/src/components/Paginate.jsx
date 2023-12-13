import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';


function Paginate(props) {


    const { data } = props;
    const [currentItems, setCurrentItems] = useState([])
    const [loading, setloading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, data])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {/* <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Most Relevant"> */}
                    {
                        currentItems.map((title, id) => {
                            return (
                                <div key={id} className="mb-3 container">
                                    <ul>
                                        <li className='text-color-code mb-3 list-result'>
                                            <Link to={`/document/refid=${title.uniquecode}`}><span className='text-details-title fs-4 fw-bold'>{title.title}</span></Link>
                                        </li>
                                        <li className='text-color-code mb-3 list-result'>
                                            <span><b className='text-secondary'>Keywords</b>: {title.keywords}</span>
                                        </li>
                                        <li className="text-color-code mb-3 list-result">
                                            <span><b className='text-secondary'>Year Published</b>: {title.year_published} </span>
                                        </li>
                                        <li className='text-color-code mb-3 list-result'>
                                            <span> <b className='text-secondary'>Abstract:</b> <p className='text-details text-secondary'>
                                                {title.description.slice(0, 300)}...
                                            </p></span>
                                        </li>
                                    </ul>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName='page-num'
                        previousLinkClassName='page-num'
                        nextLinkClassName='page-num'
                        activeLinkClassName='active'
                    />
                {/* </TabPanel>
            </TabView> */}
        </>
    )
}

export default Paginate