import { useField, type FieldHookConfig } from 'formik'
import { useTranslation } from 'react-i18next'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { useState } from 'react'
import SvgIcon from '../icons/SvgIcon'
import type { TextInputProps } from '@/lib/types/shared'

export default function TextInput({
  label,
  iconProps,
  containerClass = 'form-group',
  children,
  name,
  autoComplete = 'off',
  type = 'text',
  ...props
}: TextInputProps) {
  const { validate, labelClass, formGroupClass, required, ...inputProps } = props
  const fieldConfig: FieldHookConfig<string> = { name, validate }
  const [field, meta] = useField(fieldConfig)
  const { t } = useTranslation()

  const isPassword = type === 'password'
  const [show, setShow] = useState(false)
  const toggleVisibility = () => setShow((prev) => !prev)
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className={containerClass}>
      {label && (
        <Label for={props.id || name} className="form-label">
          {t(label)}
        </Label>
      )}
      <div className="input-group-wrapper">
        {iconProps?.iconId && <SvgIcon {...iconProps} className="form-icon" />}
        <Input
          {...field}
          {...inputProps}
          autoComplete={autoComplete}
          type={inputType}
          placeholder={props.placeholder ? t(props.placeholder) : undefined}
          invalid={meta.touched && !!meta.error}
          required={required}
          className={meta.touched && !!meta.error ? 'is-invalid' : ''}
        />
        {isPassword && (
          <div className="password-wrap" onClick={toggleVisibility}>
            <SvgIcon className="icon-eye" iconId={show ? 'show-eye' : 'hide-eye'} />
          </div>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback d-block" style={{ fontSize: '12px', marginTop: '4px' }}>
          {meta.error}
        </div>
      ) : null}
      {children}
    </div>
  )
}
