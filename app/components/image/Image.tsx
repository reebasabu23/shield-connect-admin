import { useEffect, useState, useCallback, type FC, type MouseEvent } from 'react'
import { ImagePath } from '@/lib/constants'
import type { ImageProps } from '@/lib/types/shared'
import SimpleModal from '../modal/SimpleModal'

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || ''

type FileOrBlob = File | Blob

interface FileObject {
  preview?: FileOrBlob
  file?: FileOrBlob
}

const Image: FC<ImageProps> = ({
  src,
  baseUrl = DEFAULT_BASE_URL,
  fallbackSrc,
  alt = '',
  previewable = false,
  previewTitle,
  style,
  isvideo,
  ...rest
}) => {
  const isVideoFile = (source: any) => {
    if (isvideo) return true
    if (typeof source === 'string') {
      const lowerSource = source.toLowerCase()
      return (
        lowerSource.endsWith('.mp4') ||
        lowerSource.endsWith('.mov') ||
        lowerSource.endsWith('.webm') ||
        lowerSource.endsWith('.ogg') ||
        lowerSource.startsWith('data:video/') ||
        lowerSource.startsWith('blob:') // If it's a blob URL, we might need an explicit prop, but this is a common case for previews
      )
    }
    if (source instanceof File || source instanceof Blob) {
      return source.type.startsWith('video/')
    }
    return false
  }


  const isFileOrBlob = (val: unknown): val is FileOrBlob => val instanceof File || val instanceof Blob
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getResolvedSrc = useCallback(
    (source: string | FileOrBlob | FileObject | null | undefined): string => {
      if (!source) return ''

      if (typeof source === 'object') {
        if (isFileOrBlob(source)) {
          return URL.createObjectURL(source)
        }

        const fileObj = source as FileObject
        if (fileObj.preview && isFileOrBlob(fileObj.preview)) {
          return URL.createObjectURL(fileObj.preview)
        }

        if (fileObj.file && isFileOrBlob(fileObj.file)) {
          return URL.createObjectURL(fileObj.file)
        }
      }

      if (typeof source === 'string') {
        let normalizedSrc = source.trim().replace(/\\/g, '/')

        if (
          normalizedSrc.startsWith('http') ||
          normalizedSrc.startsWith('data:') ||
          normalizedSrc.startsWith('blob:') ||
          normalizedSrc.startsWith('//')
        ) {
          return normalizedSrc
        }

        // Handle leading ./ or /
        const cleanPath = normalizedSrc.replace(/^(\.\/|\/)+/, '')
        const cleanBaseUrl = baseUrl.replace(/\/+$/, '')

        if (cleanPath.startsWith('uploads/')) {
          return `${cleanBaseUrl}/${cleanPath}`
        }

        if (normalizedSrc.startsWith('/')) {
          return `${ImagePath}${normalizedSrc}`
        }

        return `${cleanBaseUrl}/${cleanPath}`
      }

      return ''
    },
    [baseUrl],
  )

  const [imgSrc, setImgSrc] = useState<string>(() => getResolvedSrc(src))

  useEffect(() => {
    const resolved = getResolvedSrc(src)
    setImgSrc(resolved)

    return () => {
      if (typeof src === 'object' && src !== null) {
        const fileObj = src as FileObject
        if (
          isFileOrBlob(src) ||
          (fileObj.preview && isFileOrBlob(fileObj.preview)) ||
          (fileObj.file && isFileOrBlob(fileObj.file))
        ) {
          URL.revokeObjectURL(resolved)
        }
      }
    }
  }, [src, getResolvedSrc])

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

const handlePreview = (e: MouseEvent<HTMLImageElement | HTMLVideoElement>) => {
    if (previewable) {
      e.stopPropagation()
      setIsModalOpen(true)
    }
    if (rest.onClick) {
      rest.onClick(e as any)
    }
  }

  const isVid = isVideoFile(src)

  return (
    <>
      {isVid ? (
        <video
          src={imgSrc}
          style={{
            cursor: previewable ? 'pointer' : 'default',
            objectFit: 'cover',
            ...style,
          }}
          onClick={handlePreview}
          muted
          playsInline
          loop
          autoPlay
          {...(rest as any)}
        />
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          style={{
            cursor: previewable ? 'pointer' : 'default',
            ...style,
          }}
          onClick={handlePreview}
          {...rest}
        />
      )}
      {previewable && (
        <SimpleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={previewTitle || (isVid ? 'Video Preview' : 'Image Preview')}
          size="lg"
        >
          <div className="text-center p-2">
            {isVid ? (
              <video
                src={imgSrc}
                controls
                autoPlay
                style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '4px' }}
              />
            ) : (
              <img src={imgSrc} alt={alt} style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '4px' }} />
            )}
          </div>
        </SimpleModal>
      )}
    </>
  )
}

export default Image
