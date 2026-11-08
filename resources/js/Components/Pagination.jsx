import { Link } from "@inertiajs/react";
export default function Pagination({ pagination }) {

    return (
        <>
            {pagination.links.length > 3 && (
                <div className="paginationBox">
                    <div className="container">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                            <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                                <Link className="page-link" href={pagination.prev_page_url} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </Link>
                            </li>
                            {Array.from({ length: pagination.last_page }, (_, index) => (
                                <li key={index + 1} className={`page-item ${pagination.current_page === index + 1 ? 'active' : ''}`}>
                                    {pagination.current_page === index + 1 ? <span className="page-link">{ index + 1 }</span> 
                                    :
                                    <Link className="page-link" href={`${pagination.path}?page=${index+1}`}>
                                        {index + 1}
                                    </Link>
                                    }
                                </li>
                            ))}
                            <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                                <Link className="page-link" href={pagination.next_page_url} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                </Link>
                            </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
