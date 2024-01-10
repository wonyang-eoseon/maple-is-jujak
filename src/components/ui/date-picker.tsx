import * as stylex from '@stylexjs/stylex'
import { Input } from './input'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const DatePicker = ({
  label,
  id,
  value,
  onChange,
}: {
  label: string
  id: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div {...stylex.props(styles.base)}>
      <label htmlFor={id}>{label}</label>
      <Input type="date" id={id} value={value} onChange={onChange} />
    </div>
  )
}

export { DatePicker }
