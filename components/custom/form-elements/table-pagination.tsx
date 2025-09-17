import { usePagination } from '@/lib/hooks/use-pagination';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    const [pagination, setPagination] = usePagination();
    return (
        <>
            <div className='flex flex-col px-2 mt-6 gap-8 w-full'>
                <div className='flex items-center w-full justify-between'>
                    <span className='text-gray-500 w-24 text-xs'>
                        Showing <span className='w-2'>{pagination.pageNumber + 1}</span> of{' '}
                        {table.getPageCount()}
                    </span>
                    <div className='flex gap-2 justify-center items-center'>
                        <div
                            className={`flex justify-center items-center h-8 w-8 border border-gray-400 bg-white rounded-xl cursor-pointer ${
                                pagination.pageNumber <= 0 ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            aria-disabled={pagination.pageNumber <= 0}
                            onClick={() => {
                                if (pagination.pageNumber <= 0) return;
                                setPagination({
                                    pageNumber: pagination.pageNumber - 1,
                                });
                                table.previousPage();
                            }}
                        >
                            <ChevronLeft className='w-4 h-4 text-gray-500' />
                        </div>

                        {new Array(table.getPageCount()).map((item) => (
                            <div
                                key={item}
                                className={`flex items-center justify-center cursor-pointer text-lg font-semibold border-2 rounded-full w-6 h-6`}
                                onClick={() => {
                                    setPagination({
                                        pageNumber: item - 1,
                                    });
                                    table.setPageIndex(item - 1);
                                }}
                            >
                                <div
                                    className={`flex items-center justify-center cursor-pointer text-lg font-semibold  rounded-full w-2 h-2 ${
                                        pagination.pageNumber === item - 1 ? 'bg-primary' : ''
                                    }`}
                                ></div>
                            </div>
                        ))}

                        <div
                            className={`flex justify-center items-center h-8 w-8 border border-gray-400 rounded-xl cursor-pointer ${
                                pagination.pageNumber >= table.getPageCount() - 1 ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            onClick={() => {
                                if (pagination.pageNumber >= table.getPageCount() - 1) return;
                                setPagination({
                                    pageNumber: pagination.pageNumber + 1,
                                });
                                table.nextPage();
                            }}
                            aria-disabled={pagination.pageNumber >= table.getPageCount() - 1}
                        >
                            <ChevronRight className='w-4 h-4 text-gray-500' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
