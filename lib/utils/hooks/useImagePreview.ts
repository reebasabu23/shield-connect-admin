import { useCallback, useState } from 'react'
import type { UseImagePreviewReturn } from '@/lib/types/utils'

const useImagePreview = (): UseImagePreviewReturn => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = useCallback((file: File) => {
    if (!file) return

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      console.warn('Selected file is not an image or video')
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewUrl(event.target.result as string)
      }
    }

    reader.onerror = () => {
      console.error('Error reading file')
      setPreviewUrl(null)
    }

    reader.readAsDataURL(file)
  }, [])

  const clearPreview = useCallback(() => {
    setPreviewUrl(null)
  }, [])

  return {
    previewUrl,
    handleFileSelect,
    clearPreview,
    setPreviewUrl,
  }
}

export default useImagePreview
