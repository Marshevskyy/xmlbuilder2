import $$ from '../TestHelpers'

describe('CharacterData.test', function () {

  const doc = $$.dom.createDocument('myns', 'root')
  const node1 = doc.createTextNode('data')
  const node2 = doc.createTextNode('data')
  if (doc.documentElement) {
    doc.documentElement.appendChild(node1)
    doc.documentElement.appendChild(node2)
  }

  test('constructor()', function () {
    expect(node1.data).toBe('data')
  })

  test('isEqualNode()', function () {
    expect(node1.isEqualNode(node2)).toBeTruthy()
  })

  test('nodeValue, textContent, data', function () {
    expect(node1.nodeValue).toBe('data')
    expect(node1.textContent).toBe('data')
    expect(node1.data).toBe('data')
    node1.nodeValue = 'new data'
    expect(node1.nodeValue).toBe('new data')
    expect(node1.textContent).toBe('new data')
    expect(node1.data).toBe('new data')
    node1.textContent = 'other data'
    expect(node1.nodeValue).toBe('other data')
    expect(node1.textContent).toBe('other data')
    expect(node1.data).toBe('other data')
    node1.data = 'old data'
    expect(node1.nodeValue).toBe('old data')
    expect(node1.textContent).toBe('old data')
    expect(node1.data).toBe('old data')
    node1.data = 'data'
  })

  test('length', function () {
    expect(node1.length).toBe(4)
  })

  test('appendData', function () {
    node1.appendData(' or data')
    expect(node1.data).toBe('data or data')
    node1.data = 'data'
  })

  test('insertData', function () {
    node1.insertData(2, 'da')
    expect(node1.data).toBe('dadata')
    node1.data = 'data'
  })

  test('deleteData', function () {
    node1.data = 'a long night'
    node1.deleteData(2, 5)
    expect(node1.data).toBe('a night')
    node1.data = 'data'
  })

  test('replaceData', function () {
    node1.data = 'a long night'
    node1.replaceData(2, 4, 'starry')
    expect(node1.data).toBe('a starry night')
    node1.data = 'data'
  })

  test('substringData', function () {
    node1.data = 'a long night'
    expect(node1.substringData(2, 4)).toBe('long')
    node1.data = 'data'
  })

})