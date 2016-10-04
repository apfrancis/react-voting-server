import test from 'tape-catch'
import makeStore from './../src/store'
import { Map, fromJS } from 'Immutable'

test('is a Redux store configured with the correct reducer', t => {
  const store = makeStore()
  t.deepEqual(store.getState(), Map())
  t.end()
})

test('is a Redux store that gets the right state', t => {
  const store = makeStore()
  const entries = ['Entry 1', 'Entry 2']

  store.dispatch({
    type: 'SET_ENTRIES',
    entries
  })

  t.equal(store.getState()[0], fromJS({entries})[0])
  t.equal(store.getState()[1], fromJS({entries})[1])
  t.end()
})
