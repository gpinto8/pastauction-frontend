/** function that changes an elements content scroll position by changing its `element.scrollLeft/scrollTop` */
export function scrollElementContent(el: HTMLElement, direction: 'horizontal' | 'vertical', distanceToScroll: number, unit: '%' | 'px'){
	const totalScrollLength = direction === 'horizontal' ? el.scrollWidth : el.scrollHeight;

	switch (unit) {
		case '%':
			distanceToScroll = totalScrollLength * distanceToScroll;
			break;
		case 'px':
			distanceToScroll = distanceToScroll;
			break;
	}

	if(direction === 'horizontal'){
		el.scrollLeft =  el.scrollLeft + distanceToScroll;
	}else{
		el.scrollTop = el.scrollTop + distanceToScroll;
	}
}