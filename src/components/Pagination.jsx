import ReactPaginate from 'react-paginate';

export const Pagination = ({ currentPage, setPage, totalPages }) => (
  <ReactPaginate
    className='pagination'
    breakLabel='...'
    previousLabel='<'
    nextLabel='>'
    onPageChange={(event) => setPage(event.selected + 1)}
    pageRangeDisplayed={1}
    pageCount={Math.floor(totalPages / 10)}
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
  />
);
