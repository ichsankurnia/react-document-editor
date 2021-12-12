import React, { Fragment, useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

const TableFull2 = ({ columnTable, dataTable }) => {
    const columns = useMemo(() => columnTable, [columnTable])
    const data = useMemo(() => dataTable, [dataTable])

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canPreviousPage, canNextPage, pageOptions, state, gotoPage, pageCount, setPageSize, prepareRow
    } = useTable(
        {
            columns,
            data,
            //   initialState: { pageIndex: 2 }
        },
        usePagination
    )

    const { pageIndex, pageSize } = state

    return (
        <Fragment>
            <div className="overflow-x-auto">
                <table className="align-middle w-200%" {...getTableProps()}>
                    <thead className='bg-soft text-left'>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className={`${columnTable.length>6? 'py-1': 'py-4'} text-center xs:text-left`} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr className='border-b-2 border-soft' {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td className='py-3 px-1' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            <div className='mt-5 mb-2 sm:mb-0 flex justify-between items-center'>
                <div className='hidden sm:flex items-center'>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <span className='mr-5'>
                        {' '}&nbsp;| Go to page :{' '}
                        <input
                            type='number'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                            className='w-20 outline-none border-1 border-gray-400 rounded-2xl px-3 py-1'
                        />
                    </span>{' '}
                </div>

                <div className='flex items-center justify-between md:justify-end w-full md:w-max'>
                    <div className='flex items-center md:mr-5'>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={`${canPreviousPage? 'text-black hover:text-lightcayn': 'text-gray-400 cursor-text'} font-bold mr-2`}>
                            {'<<'}
                        </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`${canPreviousPage? 'text-black hover:text-lightcayn': 'text-gray-400 cursor-text'} mr-2`}>
                            Previous
                        </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className={`${canNextPage? 'text-black hover:text-lightcayn': 'text-gray-400 cursor-text'} mr-2`}>
                            Next
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={`${canNextPage? 'text-black hover:text-lightcayn': 'text-gray-400 cursor-text'} font-bold`}>
                            {'>>'}
                        </button>
                    </div>
                    <select className='outline-none px-2 py-1 border-1 border-gray-400 rounded-2xl' value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}>
                        {[10, 20, 50, 100, 200, 500].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
        </Fragment>
    )
}

export default TableFull2