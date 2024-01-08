import { useReducer } from 'react'
import * as stylex from '@stylexjs/stylex'

import { Button } from './ui/Button'
import { DatePicker } from './ui/DatePicker'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: { default: 'row', '@media (max-width: 800px)': 'column' },
    alignItems: { default: 'end', '@media (max-width: 800px)': 'start' },
    gap: '1rem',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'end',
    gap: '8px',
  },
})

const setDateRange = (startDate: Date, endDate: Date) => ({
  startDate: startDate.toISOString().slice(0, 10),
  endDate: endDate.toISOString().slice(0, 10),
})

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload }
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload }
    case 'SET_DURATION_WEEK':
      const weekStartDate = new Date(
        new Date().setDate(new Date().getDate() - 7),
      )
      return setDateRange(weekStartDate, new Date())
    case 'SET_DURATION_MONTH':
      const monthStartDate = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      )
      return setDateRange(monthStartDate, new Date())
    case 'SET_DURATION_YEAR':
      const yearStartDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1),
      )
      return setDateRange(yearStartDate, new Date())
    default:
      return state
  }
}

const initialState = setDateRange(new Date(), new Date())

const DateFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSetStartDate = (event: any) => {
    dispatch({ type: 'SET_START_DATE', payload: event.target.value })
  }

  const handleSetEndDate = (event: any) => {
    dispatch({ type: 'SET_END_DATE', payload: event.target.value })
  }

  const handleSetDurationWeek = () => {
    dispatch({ type: 'SET_DURATION_WEEK' })
  }

  const handleSetDurationMonth = () => {
    dispatch({ type: 'SET_DURATION_MONTH' })
  }

  const handleSetDurationYear = () => {
    dispatch({ type: 'SET_DURATION_YEAR' })
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.wrapper)}>
        <DatePicker
          label="시작일"
          id="start"
          value={state.startDate}
          onChange={handleSetStartDate}
        />
        <DatePicker
          label="마지막일"
          id="end"
          value={state.endDate}
          onChange={handleSetEndDate}
        />
      </div>
      <div {...stylex.props(styles.wrapper)}>
        <Button onClick={handleSetDurationWeek}>1주일</Button>
        <Button onClick={handleSetDurationMonth}>1개월</Button>
        <Button onClick={handleSetDurationYear}>1년</Button>
      </div>
    </div>
  )
}

export default DateFilter
