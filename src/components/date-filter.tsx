import { useReducer } from 'react'
import * as stylex from '@stylexjs/stylex'
import dayjs, { Dayjs } from 'dayjs'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'

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

interface State {
  startDate: string
  endDate: string
}

type ActionType =
  | 'SET_START_DATE'
  | 'SET_END_DATE'
  | 'SET_DURATION_WEEK'
  | 'SET_DURATION_MONTH'
  | 'SET_DURATION_YEAR'

type Action = { type: ActionType; payload?: string }

const setDateRange = (startDate: Dayjs, endDate: Dayjs): State => ({
  startDate: startDate.format('YYYY-MM-DD'),
  endDate: endDate.format('YYYY-MM-DD'),
})

const initialState: State = setDateRange(dayjs(), dayjs())

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload || '' }
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload || '' }
    case 'SET_DURATION_WEEK':
      return setDateRange(dayjs().subtract(1, 'week'), dayjs())
    case 'SET_DURATION_MONTH':
      return setDateRange(dayjs().subtract(1, 'month'), dayjs())
    case 'SET_DURATION_YEAR':
      return setDateRange(dayjs().subtract(1, 'year'), dayjs())
    default:
      return state
  }
}

const DateFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSetDate = (type: ActionType, payload?: string) => {
    dispatch({ type, payload })
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.wrapper)}>
        <DatePicker
          label="시작일"
          id="start"
          value={state.startDate}
          onChange={(event) =>
            handleSetDate('SET_START_DATE', event.target.value)
          }
        />
        <DatePicker
          label="마지막일"
          id="end"
          value={state.endDate}
          onChange={(event) =>
            handleSetDate('SET_END_DATE', event.target.value)
          }
        />
      </div>
      <div {...stylex.props(styles.wrapper)}>
        <Button onClick={() => handleSetDate('SET_DURATION_WEEK')}>
          1주일
        </Button>
        <Button onClick={() => handleSetDate('SET_DURATION_MONTH')}>
          1개월
        </Button>
        <Button onClick={() => handleSetDate('SET_DURATION_YEAR')}>1년</Button>
      </div>
    </div>
  )
}

export default DateFilter
