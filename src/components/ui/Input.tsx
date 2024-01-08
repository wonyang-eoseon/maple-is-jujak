import React from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  base: {
    borderWidth: 1.5,
    borderColor: { default: 'gray', ':focus': 'black' },
    color: 'black',
    borderRadius: 13.25,
    paddingBlock: 4,
    paddingInline: 12,
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', ...props }, ref) => {
    return (
      <input type={type} {...stylex.props(styles.base)} ref={ref} {...props} />
    )
  },
)

Input.displayName = 'Input'

export { Input }
