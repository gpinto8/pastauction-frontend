export const getPagination = <T>({ page, per_page }: { page?: number; per_page?: number }) => {
    const p = reactive({
        page: page || 1,
        perPage: per_page,
        totalPages: 1,
        totalItems: 1,
        data: [] as T[],
        loading: false,
        hasNext: false
    })
    return p;
}