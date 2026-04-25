import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import SvgIcon from '../icons/SvgIcon'
import { useTranslation } from 'react-i18next'
import { getInitials } from '@/lib/utils'

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'stickers' | 'wallpaper' | 'status' | 'announcement' | 'groups'

  onSubmit: (data: { file: File | null; caption: string }) => void
  loading?: boolean
  usageLimit?: number // e.g. 3
  initialCaption?: string
  name?: string
}

const FileUploadModal: FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
  loading = false,
  usageLimit,
  initialCaption = '',
  name = '',
}) => {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState(initialCaption)
  const [charCount, setCharCount] = useState(initialCaption.length)

  const minChars = 50
  const maxChars = 150

  const config = {
    status: {
      title: 'Create Status',
      buttonLabel: 'Select Image or Video',
      instructions: 'Max 10MB for images',
      placeholder: 'Type a status',
      accept: 'image/*,video/*',
    },
    stickers: {
      title: 'Add Sticker',
      buttonLabel: 'Select Sticker',
      instructions: 'Max 10MB (PNG, WEBP, GIF recommended)',
      placeholder: 'Sticker name...',
      accept: 'image/png,image/webp,image/gif,image/jpeg',
    },
    wallpaper: {
      title: 'Add Wallpaper',
      buttonLabel: 'Select Wallpaper',
      instructions: 'Max 10MB (High resolution recommended)',
      placeholder: 'Wallpaper title...',
      accept: 'image/*',
    },
    announcement: {
      title: 'Add Announcement',
      buttonLabel: 'Select Media',
      instructions: 'Max 20MB for images',
      placeholder: 'Type announcement text...',
      accept: 'image/*',
    },
    groups: {
      title: 'Group Icon',
      buttonLabel: 'Select Group Icon',
      instructions: 'Max 5MB (PNG, JPEG recommended)',
      placeholder: 'Group name...',
      accept: 'image/*',
    },
  }[type]


  useEffect(() => {
    if (isOpen) {
      setCaption(initialCaption)
      setCharCount(initialCaption.length)
    } else {
      setFile(null)
      setPreviewUrl(null)
      setCaption('')
      setCharCount(0)
    }
  }, [isOpen, initialCaption])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= maxChars) {
      setCaption(text)
      setCharCount(text.length)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    onSubmit({ file, caption })
  }

  const isVideo = file?.type.startsWith('video/')

  return (
    <Modal isOpen={isOpen} toggle={onClose} centered className="file-upload-modal">
      <ModalHeader toggle={onClose} tag="div">
        <h4 className="modal-title">{t(config.title)}</h4>
      </ModalHeader>
      <ModalBody>
        <div className="preview-section">
          <div className="preview-circle" onClick={triggerFileInput}>
            {previewUrl ? (
              isVideo ? (
                <video src={previewUrl} />
              ) : (
                <img src={previewUrl} alt="Preview" />
              )
            ) : (
              <div className="placeholder-content">
                <span className="placeholder-text">{getInitials(name)}</span>
                <div className="hover-icon">
                  <SvgIcon iconId="camera" />
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={config.accept}
              hidden
            />
          </div>
        </div>

        <div className="action-section">
          <button 
            className="gradient-upload-btn btn" 
            onClick={triggerFileInput}
            disabled={loading}
          >
            {t(config.buttonLabel)}
          </button>
        </div>

        <div className="info-section">
          <p className="constraint-text">{t(config.instructions)}</p>
          {usageLimit !== undefined && (
            <p className="limit-text text-muted">
              {t('You can upload {{count}} more status(es) today', { count: usageLimit })}
            </p>
          )}
          <p>File format : png,webp,jpeg,.mp4,.mov</p>
        </div>

        <div className="caption-section mt-3">
          <textarea
            className="form-control"
            placeholder={t(config.placeholder)}
            value={caption}
            onChange={handleCaptionChange}
            rows={3}
            style={{ resize: 'none' }}
          />
          <div className="d-flex justify-content-between mt-1">
            <div className="text-danger small">
              {type === 'status' && charCount > 0 && charCount < minChars && (
                <span>{t('Minimum {{count}} characters required', { count: minChars })}</span>
              )}
            </div>
            <div className={`char-count small ${charCount >= maxChars ? 'text-danger' : 'text-muted'}`}>
              {charCount}/{maxChars}
            </div>
          </div>
        </div>

        

        <div className="mt-4 d-grid">
           <button 
            className="btn btn-primary py-2" 
            onClick={handleSubmit}
            disabled={loading || (type === 'status' && charCount < minChars && charCount > 0)}
          >
            {loading ? t('Processing...') : t('Submit')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default FileUploadModal
