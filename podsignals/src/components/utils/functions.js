export const dynamicSort = (list) => {
    let sortOrder = 1;
    if(list[0] === "-") {
        sortOrder = -1;
        list = list.substr(1);
    }
    return function (a,b) {
        const result = (a[list] > b[list]) ? -1 : (a[list] > b[list]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const podcastListSort = (list) => {
    list.sort((a, b) => (a.category_rank > b.category_rank) ? 1 : -1)
    return list
}