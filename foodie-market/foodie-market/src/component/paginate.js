
// lodash
const Paginate = (products, itemsPerPage, currentPage) => {
    const index = currentPage
    const PaginateProducts = products.slice(index, (index + itemsPerPage))
    return PaginateProducts
}

export default Paginate
