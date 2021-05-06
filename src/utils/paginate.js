import React from 'react';
import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    items = items.slice(startIndex, startIndex + 4)
    return items
}