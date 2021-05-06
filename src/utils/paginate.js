import _ from "lodash"
export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // const itemss = items.splice(startIndex, startIndex + 4)
    items = items.slice(startIndex, startIndex + 4)
    return items
    // _(items).slice(items, startIndex).take(pageSize).value()

}