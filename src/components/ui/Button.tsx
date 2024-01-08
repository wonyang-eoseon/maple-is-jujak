import * as React from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  base: {
    borderWidth: 0,
    backgroundColor: {
      default: 'black',
      ':hover': 'gray',
      ':active': 'darkgray',
    },
    color: 'white',
    borderRadius: 16,
    paddingBlock: 4.5,
    paddingInline: 16,
    fontSize: 16,
    cursor: 'pointer',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return <button {...stylex.props(styles.base)} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button }
