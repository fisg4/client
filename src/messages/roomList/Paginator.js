import React from 'react'

export default function Paginator({ currentPage, totalElements, totalPages, handleChangePage }) {
    const nextPage = currentPage + 1
    const previousPage = currentPage - 1

    return (
        <div className="rooms-paginator">
            {previousPage >= 0 && (<button onClick={() => handleChangePage(currentPage - 1)}>Anterior</button>)}
            <span>Página {currentPage + 1} de {totalPages}</span>
            {nextPage < totalPages && (<button onClick={() => handleChangePage(currentPage + 1)}>Siguiente</button>)}
            <span> - {totalElements} elementos</span>
        </div>
    )
}