import test from 'tape-catch'
import reducer from '../src/reducer'
import Immutable, { fromJS, Map } from 'immutable'

test('it has an initial state', t => {
  const expectedState = fromJS({
    entries: ['Baywatch']
  })
  const action = {type: 'SET_ENTRIES', entries: ['Baywatch']}
  const nextState = reducer(undefined, action)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('it should call vote when a vote action is recieved', t => {
  const state = fromJS({
    vote: {
      pair: ['Breaking Bad', 'The Wire']
    },
    entries: []
  })
  const expectedState = fromJS({
    vote: {
      pair: ['Breaking Bad', 'The Wire'],
      tally: {'The Wire': 1}
    },
    entries: []
  })
  const action = {type: 'VOTE', entry: 'The Wire'}
  const nextState = reducer(state, action)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('it should call next when a next action is recieved', t => {
  const state = fromJS({
    entries: ['Breaking Bad', 'The Wire', 'Tellytubbies']
  })
  const expectedState = fromJS({
    vote: {
      pair: ['Breaking Bad', 'The Wire']
    },
    entries: ['Tellytubbies']
  })
  const action = {type: 'NEXT'}
  const nextState = reducer(state, action)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('it should call setEntries when a set entries action is recieved', t => {
  const state = Map()
  const expectedState = fromJS({
    entries: ['Tellytubbies', 'Mr Bean', 'Home and Away']
  })
  const action = {type: 'SET_ENTRIES', entries: ['Tellytubbies', 'Mr Bean', 'Home and Away']}
  const nextState = reducer(state, action)
  t.true(Immutable.is(expectedState, nextState))
  t.end()
})

test('it works with JS array reduce', t => {
  const actions = [
    {type: 'SET_ENTRIES', entries: ['Tellytubbies', 'Mr Bean']},
    {type: 'NEXT'},
    {type: 'VOTE', entry: 'Tellytubbies'},
    {type: 'VOTE', entry: 'Tellytubbies'},
    {type: 'VOTE', entry: 'Mr Bean'},
    {type: 'NEXT'}
  ]
  const expectedState = Map({
    winner: 'Tellytubbies'
  })
  const state = actions.reduce(reducer, Map())
  t.true(Immutable.is(expectedState, state))
  t.end()
})
