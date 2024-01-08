import stylex from '@stylexjs/stylex'

import DateFilter from './components/DateFilter'

const styles = stylex.create({
  root: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'red',
  },
})

export default function App() {
  return (
    <div {...stylex.props(styles.root)}>
      <h1>Hello world!</h1>
      <DateFilter />
    </div>
  )
}
