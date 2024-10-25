import { ref, onMounted, onUnmounted } from 'vue';

export function useBreakpoint() {
  const breakpoint = ref(''); // To store the current breakpoint
  const width = ref(window.innerWidth); // Store window width

  // Define your breakpoints
  const updateBreakpoint = () => {
    if (width.value < 640) {
      breakpoint.value = 'sm';
    } else if (width.value >= 640 && width.value < 768) {
      breakpoint.value = 'md';
    } else if (width.value >= 768 && width.value < 1024) {
      breakpoint.value = 'lg';
    } else if (width.value >= 1024 && width.value < 1536) {
      breakpoint.value = 'xl';
    } else {
      breakpoint.value = '2xl';
    }
  };

  // Update width and breakpoint on resize
  const onResize = () => {
    width.value = window.innerWidth;
    updateBreakpoint();
  };

  onMounted(() => {
    // Set initial breakpoint
    updateBreakpoint();
    // Add resize listener
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    // Clean up event listener
    window.removeEventListener('resize', onResize);
  });

  return {
    breakpoint,
    width, // You can return the width if you want to access the raw window width
  };
}
