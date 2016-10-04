import test from 'tape-catch'
import Immutable, { List, Map } from 'immutable'
import { setEntries, next, vote } from '../src/core'

test('it adds entries to the state object', (t) => {
  const state = Map()
  const expectedState = Map({'entries': List.of('Breaking Bad', 'The Wire', 'The Sopranos')})
  const newState = setEntries(state, List.of('Breaking Bad', 'The Wire', 'The Sopranos'))
  t.true(Immutable.is(expectedState, newState))
  t.end()
})

test('it takes the first two items in the entries as a pair', t => {
  const state = Map({'entries': List.of('Breaking Bad', 'The Wire', 'The Sopranos')})
  const expectedState = Map(
    {
      'vote': Map({pair: List.of('Breaking Bad', 'The Wire')}),
      'entries': List.of('The Sopranos')
    }
  )
  const nextState = next(state)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('voting on one item in a pair increases the tally for that item', t => {
  const state = Map({pair: List.of('Breaking Bad', 'The Wire')})
  const expectedState = Map(
    {
      pair: List.of('Breaking Bad', 'The Wire'),
      tally: Map(
        {
          'Breaking Bad': 1
        }
      )
    }
  )
  const nextState = vote(state, 'Breaking Bad')
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('puts winner of current vote back to entries', t => {
  const state = Map(
    {
      'vote': Map(
        {
          pair: List.of('Breaking Bad', 'The Wire'),
          tally: Map(
            {
              'Breaking Bad': 1,
              'The Wire': 4
            }
          )
        }
      ),
      'entries': List.of('The Sopranos', 'Billions')
    }
  )
  const expectedState = Map(
    {
      'vote': Map(
        {
          pair: List.of('The Sopranos', 'Billions')
        }
      ),
      'entries': List.of('The Wire')
    }
  )
  const nextState = next(state)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('puts both from a tied vote back to entries', t => {
  const state = Map(
    {
      'vote': Map(
        {
          pair: List.of('Breaking Bad', 'The Wire'),
          tally: Map(
            {
              'Breaking Bad': 4,
              'The Wire': 4
            }
          )
        }
      ),
      'entries': List.of('The Sopranos', 'Billions')
    }
  )
  const expectedState = Map(
    {
      'vote': Map(
        {
          pair: List.of('The Sopranos', 'Billions')
        }
      ),
      'entries': List.of('Breaking Bad', 'The Wire')
    }
  )
  const nextState = next(state)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('it marks the winner when there is only one entry left', t => {
  const state = Map({
    vote: Map({
      pair: List.of('The Wire', 'Billions'),
      tally: Map({
        'The Wire': 4,
        'Billions': 2
      })
    }),
    entries: List()
  })
  const expectedState = Map({
    winner: 'The Wire'
  })
  const nextState = next(state)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})
