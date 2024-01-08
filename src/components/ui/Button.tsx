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
    borderRadius: 12,
    paddingBlock: 4,
    paddingInline: 12,
    cursor: 'pointer',
  },
})

const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<{ onClick: () => void }>
>(({ onClick, children, ...props }, ref) => {
  return (
    <button
      {...stylex.props(styles.base)}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export { Button }
