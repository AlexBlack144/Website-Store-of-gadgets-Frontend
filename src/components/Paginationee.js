import React from "react";
import { Pagination } from "@mui/material";

const Paginationee = ({cardsPerPage, totalCards,  paginate})=>{
    const pageNumbers = [];
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };

    for (let i = 1; i <= Math.ceil(totalCards/cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <Pagination 
            count={pageNumbers.length} 
            page={paginate(page)} 
            onChange={handleChange}
            color='secondary'
        ></Pagination>
    )
}
export default Paginationee;