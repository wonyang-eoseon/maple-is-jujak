import { render, screen } from '@testing-library/react'

import Test from '../Test'

test('renders MyComponent correctly', () => {
  render(<Test />)
  expect(screen.getByText('MyComponent content')).toBeTruthy()
})
