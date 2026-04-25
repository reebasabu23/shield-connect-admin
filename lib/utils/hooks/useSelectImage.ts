import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ImageBaseUrl } from '@/lib/constants'
import type { SelectImageHookProps } from '@/lib/types/shared'
import useImagePreview from './useImagePreview'

export const useSelectImage = ({ name, image }: SelectImageHookProps) => {
  const { previewUrl: avatarPreview, handleFileSelect, clearPreview, setPreviewUrl } = useImagePreview()
  const [removeAvatar, setRemoveAvatar] = useState<boolean>(false)
  const [confirmRemoveMemberOpen, setConfirmRemoveMemberOpen] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)
  const hasAvatar = Boolean(avatarPreview && !removeAvatar)
  
  useEffect(() => {
    if (name && image) {
      setPreviewUrl(image ? ImageBaseUrl + `${image}` : null)
      setRemoveAvatar(false)
      setAvatar(null)
    }
  }, [image, name, setPreviewUrl])
  
  const confirmRemoveAvatar = useCallback(() => {
    setAvatar(null)
    clearPreview()
    setRemoveAvatar(true)
    const fileInput = document.getElementById('image-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
    setConfirmRemoveMemberOpen(false)
  }, [clearPreview])
  
  const onAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      console.log("🚀 ~ useSelectImage ~ file:", file)
      if (file) {
        setAvatar(file)
        setRemoveAvatar(false)
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const onRemoveAvatar = () => {
    if (image) {
      setConfirmRemoveMemberOpen(true)
    } else {
      confirmRemoveAvatar()
    }
  }

  const resetSelection = useCallback(() => {
    setPreviewUrl(image ? ImageBaseUrl + `${image}` : null)
    setRemoveAvatar(false)
    setAvatar(null)
    const fileInput = document.getElementById('image-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }, [image, setPreviewUrl])

  return {
    avatarPreview,
    removeAvatar,
    confirmRemoveMemberOpen,
    avatar,
    hasAvatar,
    setConfirmRemoveMemberOpen,
    confirmRemoveAvatar,
    onAvatarChange,
    onRemoveAvatar,
    setPreviewUrl,
    setAvatar,
    resetSelection,
  }
}
