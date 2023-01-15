import React from 'react'
import '../../css/messages/components/Paginator.css'
import { IoIosArrowForward } from 'react-icons/io';

export default function Paginator({ currentPage, totalElements, totalPages, handleChangePage }) {
    const nextPage = currentPage + 1
    const previousPage = currentPage - 1

    return (
        <div className="rooms-paginator">
            {previousPage >= 0 && (<div onClick={() => handleChangePage(currentPage - 1)}>
                <IoIosArrowForward className='btn-circular btn-circular-previous'/>
            </div>)}
            <span>Página {currentPage + 1} de {totalPages}</span>
            {nextPage < totalPages && (<div onClick={() => handleChangePage(currentPage + 1)}>
                <IoIosArrowForward className='btn-circular'/>
            </div>)}
        </div>
    )
}