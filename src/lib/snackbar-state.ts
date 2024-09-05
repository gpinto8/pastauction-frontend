import { ref } from 'vue'

export function snackbarState () {
  return ref({
    text: '',
    color: '',
    show: false,
  })
}