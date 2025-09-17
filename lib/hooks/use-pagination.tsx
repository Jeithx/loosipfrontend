'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

export function usePagination() {
    return useQueryStates(
        {
            pageNumber: parseAsInteger.withDefault(0),
            pageSize: parseAsInteger.withDefault(10),
        },
        { shallow: false }
    );
}
