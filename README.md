# xmlbuilder2

An XML builder for [node.js](https://nodejs.org/).

[![License](http://img.shields.io/npm/l/xmlbuilder2.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![NPM Version](http://img.shields.io/npm/v/xmlbuilder2.svg?style=flat-square)](https://www.npmjs.com/package/xmlbuilder2)

[![Travis Build Status](http://img.shields.io/travis/oozcitak/xmlbuilder2.svg?style=flat-square)](http://travis-ci.org/oozcitak/xmlbuilder2)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/3cg6w6rkn81qnlo5?svg=true)](https://ci.appveyor.com/project/oozcitak/xmlbuilder2)
[![Dev Dependency Status](http://img.shields.io/david/dev/oozcitak/xmlbuilder2.svg?style=flat-square)](https://david-dm.org/oozcitak/xmlbuilder2)
[![Code Coverage](https://img.shields.io/codecov/c/github/oozcitak/xmlbuilder2?style=flat-square)](https://codecov.io/gh/oozcitak/xmlbuilder2)

### Installation:

``` sh
npm install xmlbuilder2
```

### Usage:

`xmlbuilder2` is a wrapper around DOM nodes which adds chainable functions to make it easier to create and work with XML documents. For example the following XML document:

``` xml
<?xml version="1.0"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz/>
</root>
```

can be created with the following function chain:

``` js
const { create } = require('xmlbuilder2');

const root = create({ version: '1.0' })
  .ele('root', { att: 'val' })
    .ele('foo')
      .ele('bar').txt('foobar').up()
    .up()
    .ele('baz').up()
  .up();

// convert the XML tree to string
const xml = root.end({ prettyPrint: true });
console.log(xml);
```

___

The same XML document can be created by converting a JS object into XML nodes:

``` js
const { create } = require('xmlbuilder2');

const obj = {
  root: {
    '@att': 'val',
    foo: {
      bar: 'foobar'
    },
    baz: {}
  }
};

const doc = create(obj);
const xml = doc.end({ prettyPrint: true });
console.log(xml);
```
___

`xmlbuilder2` can also parse and serialize XML documents from different formats:
```js
const { create } = require('xmlbuilder2');

const xmlStr = '<root att="val"><foo><bar>foobar</bar></foo></root>';
const doc = create(xmlStr);

// append a 'baz' element to the root node of the document
doc.root().ele('baz');

const xml = doc.end({ prettyPrint: true });
console.log(xml);
```
which would output the same document string at the top of this page.

Or you could return a JS object by changing the `format` argument to `'object'`:
```js
const obj = doc.end({ format: 'object' });
console.log(obj);
```
```js
{
  root: {
    '@att': 'val',
    foo: {
      bar: 'foobar'
    },
    baz: {}
  }
}
```

___

You can convert between formats in one go with the `convert` function:

```js
const { convert } = require('xmlbuilder2');

const xmlStr = '<root att="val"><foo><bar>foobar</bar></foo></root>';
const obj = convert(xmlStr, { format: "object" });

console.log(obj);
```
```js
{
  root: {
    '@att': 'val',
    foo: {
      bar: 'foobar'
    }
  }
}
```

___

If you need to do some processing:

``` js
const { create } = require('xmlbuilder2');

const root = create().ele('squares');
root.com('f(x) = x^2');
for(let i = 1; i <= 5; i++)
{
  const item = root.ele('data');
  item.att('x', i);
  item.att('y', i * i);
}

const xml = root.end({ prettyPrint: true });
console.log(xml);
```

This will result in:

``` xml
<?xml version="1.0"?>
<squares>
  <!-- f(x) = x^2 -->
  <data x="1" y="1"/>
  <data x="2" y="4"/>
  <data x="3" y="9"/>
  <data x="4" y="16"/>
  <data x="5" y="25"/>
</squares>
```

### Documentation:

See the [wiki](https://github.com/oozcitak/xmlbuilder2/wiki) for details.

