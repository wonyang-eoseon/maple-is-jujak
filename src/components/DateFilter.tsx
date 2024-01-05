import { useReducer } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
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
  dateWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_START_DATE':
      return { startDate: action.payload, ...state }
    case 'SET_END_DATE':
      return { endDate: action.payload, ...state }
    case 'SET_DURATION_WEEK':
      return {
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date(),
      }
    case 'SET_DURATION_MONTH':
      return {
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        endDate: new Date(),
      }
    case 'SET_DURATION_YEAR':
      return {
        startDate: new Date(
          new Date().setFullYear(new Date().getFullYear() - 1),
        ),
        endDate: new Date(),
      }
    default:
      return state
  }
}

const initialState = {
  startDate: new Date(),
  endDate: new Date(),
}

const init = (initialState: any) => {
  return initialState
}

const DateFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init)

  const handleDurationWeek = () => {
    dispatch({ type: 'SET_DURATION_WEEK' })
  }

  const handleDurationMonth = () => {
    dispatch({ type: 'SET_DURATION_MONTH' })
  }

  const handleDurationYear = () => {
    dispatch({ type: 'SET_DURATION_YEAR' })
  }

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.wrapper)}>
        <div {...stylex.props(styles.dateWrapper)}>
          <label htmlFor="start">시작일</label>
          <input
            type="date"
            id="start"
            value={state.startDate.toISOString().slice(0, 10)}
            onChange={(event) => {
              dispatch({
                type: 'SET_START_DATE',
                payload: event.target.value,
              })
            }}
          />
        </div>
        ~
        <div {...stylex.props(styles.dateWrapper)}>
          <label htmlFor="end">마지막일</label>
          <input
            type="date"
            id="end"
            value={state.endDate.toISOString().slice(0, 10)}
            onChange={(event) => {
              dispatch({ type: 'SET_END_DATE', payload: event.target.value })
            }}
          />
        </div>
      </div>
      <div {...stylex.props(styles.wrapper)}>
        <button onClick={handleDurationWeek}>1주일</button>
        <button onClick={handleDurationMonth}>1개월</button>
        <button onClick={handleDurationYear}>1년</button>
      </div>
    </div>
  )
}

export default DateFilter
