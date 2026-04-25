import { useField } from 'formik'
import Select from 'react-select'
import { Col, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import type { PhoneInputGroupProps } from '@/lib/types/shared'
import { countryCodes } from '@/lib/data/shared'

const PhoneInput = ({ label, name, codeName, containerClass, xxlClass = 2, xxlClass2 = 4 }: PhoneInputGroupProps) => {
  const [codeField, codeMeta, codeHelpers] = useField(codeName)
  const [phoneField, phoneMeta, phoneHelpers] = useField(name)
  const { t } = useTranslation()

  const countryCodeOptions = countryCodes.map((c) => ({
    label: c.name,
    value: c.code,
    flag: c.flag,
    displayCode: c.code,
  }))

  const selectedCode = countryCodeOptions.find((opt) => opt.value === codeField.value)

  return (
    <FormGroup className={`${containerClass ? containerClass : ''} text-start `}>
      {label && <Label>{label}</Label>}
      <Row className="g-2">
        <Col xxl={xxlClass} xl="4" sm="2" xs="4">
          <Select
            className="phone-input"
            defaultValue={countryCodeOptions}
            options={countryCodeOptions}
            value={selectedCode}
            onChange={(option) => {
              codeHelpers.setValue(option?.value || '')
            }}
            onBlur={() => codeHelpers.setTouched(true)}
            isClearable={false}
            isSearchable
            classNamePrefix="react-select"
            placeholder="Select"
            formatOptionLabel={(option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {option.flag.startsWith('http') ? (
                  <img src={option.flag} alt={option.label} width={20} height={15} style={{ objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1.2rem' }}>{option.flag}</span>
                )}
                <span>{option.displayCode}</span>
              </div>
            )}
          />
          {codeMeta.touched && codeMeta.error && (
            <FormFeedback style={{ display: 'block' }}>{codeMeta.error}</FormFeedback>
          )}
        </Col>
        <Col xxl={xxlClass2} xl="8" sm="10" xs="8">
          <Input
            name={phoneField.name}
            onBlur={phoneField.onBlur}
            type="text"
            className="custom-input"
            placeholder={t('type_a_number')}
            invalid={phoneMeta.touched && !!phoneMeta.error}
            value={phoneField.value ?? ''}
            inputMode="numeric"
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '')
              phoneHelpers.setValue(val)
            }}
            onKeyDown={(e) => {
              // Allowed keys: digits, backspace, delete, tab, escape, enter, arrows, home, end
              const allowedKeys = [
                'Backspace',
                'Delete',
                'Tab',
                'Escape',
                'Enter',
                'ArrowLeft',
                'ArrowRight',
                'Home',
                'End',
              ]

              const isNumber = /^[0-9]$/.test(e.key)
              const isControlKey = allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey

              if (!isNumber && !isControlKey) {
                e.preventDefault()
              }
            }}
            onPaste={(e) => {
              e.preventDefault()
              const pasteData = e.clipboardData.getData('text/plain')
              const filteredData = pasteData.replace(/\D/g, '')
              const currentVal = phoneField.value || ''
              phoneHelpers.setValue(currentVal + filteredData)
            }}
          />
          {phoneMeta.touched && phoneMeta.error && <FormFeedback>{phoneMeta.error}</FormFeedback>}
        </Col>
      </Row>
    </FormGroup>
  )
}

export default PhoneInput
