import { writable } from 'svelte/store'

export const generatedImage = writable(null)
export const isLoading = writable(false)
export const error = writable(null)

export const resetStores = () => {
  generatedImage.set(null)
  isLoading.set(false)
  error.set(null)
} 