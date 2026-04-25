import { RiCloseLargeLine } from 'react-icons/ri'
import { Input } from 'reactstrap'
import SvgIcon from '@/app/components/icons/SvgIcon'
import { Image } from '@/app/components/image'
import type { SelectImageProps } from '@/lib/types/shared'
import { getInitials } from '@/lib/utils'

const SelectImage: React.FC<SelectImageProps> = ({
  name,
  image,
  avatarPreview,
  removeAvatar,
  hasAvatar,
  onAvatarChange,
  onRemoveAvatar,
  removeBtn = true,
  inputRef,
  onClick,
  accept = 'image/*',
  isvideo,
}) => {
  return (
    <div className="profile-box">
      <div className="user-image">
        <div className="avatar position-relative">
          {avatarPreview && !removeAvatar ? (
            <Image src={avatarPreview} alt="Profile" className="img-fluid" isvideo={isvideo} />

          ) : (
            <div className="profile-placeholder">
              <span className="profile-placeholder-text">{getInitials(name || '')}</span>
            </div>
          )}
          <div className="user-img-upload position-relative">
            <Input
              innerRef={inputRef}
              type="file"
              id="image-upload"
              name="image"
              accept={accept}
              onChange={onAvatarChange}
              hidden
            />
            {hasAvatar && removeBtn && (
              <button type="button" className="avatar-remove-btn" onClick={onRemoveAvatar} title="Remove image">
                <RiCloseLargeLine />
              </button>
            )}
          </div>
          {onClick ? (
            <div className="icon-wrapper cursor-pointer" onClick={onClick}>
              <SvgIcon iconId={!avatarPreview ? 'table-edit' : 'camera'} />
            </div>
          ) : (
            <label htmlFor="image-upload" className="icon-wrapper cursor-pointer">
              <SvgIcon iconId={!avatarPreview ? 'table-edit' : 'camera'} />
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectImage
