
export function makePhoneCall(phone: string){
	window.open('tel:' + phone, '_blank');
}