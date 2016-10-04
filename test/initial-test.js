import test from 'tape'

function addListItem (list, newItem) {
  return [...newItem, ...list]
}

test('we can add new list items', (t) => {
  const list = ['The Wire', 'The Sopranos']
  Object.freeze(list)
  const newList = addListItem(list, ['Breaking Bad'])
  t.deepEqual(newList, ['Breaking Bad', 'The Wire', 'The Sopranos'])
  t.end()
})
