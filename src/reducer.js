import { vote, next, setEntries, initialState } from './core'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry))
    case 'NEXT':
      return next(state)
    case 'SET_ENTRIES':
      return setEntries(state, action.entries)
    default:
      return state
  }
}
