export const getPageRange = (page: number, pageSize: number, totalItems: number) => {
    return {
        start: pageSize * (page - 1),
        end: pageSize * page >= totalItems ? totalItems : pageSize * page,
    };
};