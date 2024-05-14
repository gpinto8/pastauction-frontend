import { httpGet } from "@/api/api";

/** a fetch wrapper that fetches all items of all pages, by default a request to an endoit has a limit of 100 items for example, this function will make as much request as needed to fetch the hole list of items that the endoint can return
 * @param url all fetch requests will be made on this request, the `fetchAllItems` will only change the `page` and `size` parameters
 * @param cb a callback to execute on every fetch request, usefull when you are fetching a big data and dont want to let the user to wait until the hole data is fetched.
 * @param [maxItemCount=100] stop fetching more items if this count was reachead, by default is 100 to avoid data overloading
*/
export async function fetchAllItems<T>(
	url: string,
	cb?: (data: T[]) => void,
	maxItemCount = 100
): Promise<T[]> {
	function addToUrl(url: string, params: string): string {
		return url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
	}
	const firstQueryUrl = addToUrl(url, 'size=1');
	const firstQueryResponse = await httpGet(firstQueryUrl);
	const totalItems = firstQueryResponse.data.total;
	const pageSize = 100;
	const numberOfPages = Math.ceil(totalItems / pageSize);
	const items: T[] = [];
	for (let page = 1; page <= numberOfPages; page++) {
		const queryUrl = addToUrl(url, `page=${page}&size=${pageSize}`);
		const response = (await httpGet(queryUrl)) as { data: { items: T[] }};

		response.data.items = response.data.items.slice(0, maxItemCount);

		items.push(...response.data.items);
		cb && cb(response.data.items);
		if (items.length >= maxItemCount) break;
	}
	return items;
}