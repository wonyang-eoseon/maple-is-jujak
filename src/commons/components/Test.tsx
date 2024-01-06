import stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    color: 'green',
  },
})

function Test() {
  return <div {...stylex.props(styles.root)}>테스트</div>
}

export default Test
