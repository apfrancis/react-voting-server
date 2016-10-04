import { createStore } from 'redux'
import reducer from './reducer'

export default function makeStore () {
  console.log('hello')
  return createStore(reducer)
}
