/** returns the current date in the format `2024-05-22` */
export function getCurrentDateFormatted() {
	const today = new Date();
	
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	
	return `${year}-${month}-${day}`;
}