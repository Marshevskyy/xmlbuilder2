import $$ from '../TestHelpers'

describe('dtd()', () => {

  test('without identifiers', () => {
    const root = $$.create('root').dtd()
    expect($$.printTree(root.doc())).toBe($$.t`
      !DOCTYPE root
      root
      `)
  })

  test('public identifier', () => {
    const root = $$.create('root').dtd({ pubID: 'pub' })
    expect($$.printTree(root.doc())).toBe($$.t`
      !DOCTYPE root PUBLIC pub
      root
      `)
  })

  test('system identifier', () => {
    const root = $$.create('root').dtd({ sysID: 'sys' })
    expect($$.printTree(root.doc())).toBe($$.t`
      !DOCTYPE root SYSTEM sys
      root
      `)
  })

  test('both identifiers', () => {
    const root = $$.create('root').dtd({ pubID: 'pub', sysID: 'sys' })
    expect($$.printTree(root.doc())).toBe($$.t`
      !DOCTYPE root PUBLIC pub sys
      root
      `)
  })

  test('replace doctype', () => {
    const root = $$.withOptions({ docType: { pubID: "pub", sysID: "sys" } }).create('root')
    expect($$.printTree(root.doc())).toBe($$.t`
      !DOCTYPE root PUBLIC pub sys
      root
      `)

    root.dtd({ pubID: 'newpub', sysID: 'newsys' })
    expect($$.printTree(root.doc())).toBe($$.t`
      !DOCTYPE root PUBLIC newpub newsys
      root
      `)
  })

  test('update when element node changes', () => {
    const doc = $$.withOptions({ docType: { pubID: "pub", sysID: "sys" } }).create()
    doc.ele('newroot')
    expect($$.printTree(doc)).toBe($$.t`
      !DOCTYPE newroot PUBLIC pub sys
      newroot
      `)
  })

})