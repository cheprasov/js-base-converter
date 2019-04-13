[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

@cheprasov/base-converter
=========

The library allows to convert a number between arbitrary bases.

## Note
Before using the library please check native method [`Number.toString([radix])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString), maybe this is what you need.
The library was written mostly for converting more complicated or custom bases.

## Quick examples:
```javascript

import { BaseConverter, baseBinary, baseHexadecimal } from '@cheprasov/base-converter';

// encode

console.log('7 dec =>', BaseConverter.encode(7, baseBinary), 'bin');
// 7 dec => 111 bin

console.log('255 dec =>', BaseConverter.encode(255, baseHexadecimal), 'hex');
// 255 dec => FF hex

console.log('255 dec =>', BaseConverter.encode(255, ['A', 'B', 'C']), 'custom');
// 255 dec => BAABBA custom

// decode

console.log('101 bin =>', BaseConverter.decode(101, baseBinary), 'dec');
// 101 bin => 5 dec

console.log('FA hex =>', BaseConverter.decode('FA', baseHexadecimal), 'dec');
// FA hex => 250 dec

console.log('BAA custom =>', BaseConverter.decode('BAA', ['A', 'B', 'C']), 'dec');
// BAA custom => 9 dec

// convert

console.log('1010 bin =>', BaseConverter.convert(1010, baseBinary, baseHexadecimal), 'hex');
// 1010 bin => A hex

console.log('FF hex =>', BaseConverter.convert('FF', baseHexadecimal, baseBinary), 'bin');
// FF hex => 11111111 bin

console.log('FF custom =>', BaseConverter.convert('FF', ['A', 'B', 'C', 'D', 'E', 'F'], ['1', '2', '3']), 'custom');
// FF custom => 2133 bin
```

## How to install

```bash
> npm install @cheprasov/base-converter
```

## Documentation

### Import
```javascript
// import library
import { BaseConverter } from '@cheprasov/base-converter';

// import preset bases
import {
    baseBinary,
    baseOctal,
    baseDecimal,
    baseHexadecimal,
    base62
} from '@cheprasov/base-converter';
```

### Custom base
A base has type `Array<string|number>`, it means that each base is array of integers or strings. Also, each element is the array should have 1 symbol only.

Examples:
```javascript

// correct
const base4 = [0, 1, 2, 3];
const base8 = [0, 1, 2, 3, 'W', 'X', 'Y', 'Z'];
const baseSome = ['0', 'a', 'A', 'b', 'B'];
const baseSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '.', '-', '+', '='];

// wrong
const base4 = [0, 10, 20, 30]; // should be 1 symbols for each element
const base8 = [0, 1, 2, 3, 'AA', 'BB', 'CC', 'DD']; // should be 1 symbols for each element
const baseSome = ['0', '1', '1', '2', '2']; // duplicates of items
const baseSome = ['A']; // should be more then 1 element in the array
```

### Public methods

#### `encode(value: number, base: Array<string | number>): string | null`
Converts decimal number to provided base. Will return `null` if value can not be converted.

Example:
```javascript
console.log('7 dec =>', BaseConverter.encode(7, baseBinary), 'bin');
// 7 dec => 111 bin

console.log('255 dec =>', BaseConverter.encode(255, baseHexadecimal), 'hex');
// 255 dec => FF hex

console.log('255 dec =>', BaseConverter.encode(255, ['A', 'B', 'C']), 'custom');
// 255 dec => BAABBA custom
```

#### `decode(value: string, base: Array<string | number>): number | null`
Converts value from provided base to decimal number. Will return `null` if value can not be converted.

Example:
```javascript
console.log('101 bin =>', BaseConverter.decode(101, baseBinary), 'dec');
// 101 bin => 5 dec

console.log('FA hex =>', BaseConverter.decode('FA', baseHexadecimal), 'dec');
// FA hex => 250 dec

console.log('BAA custom =>', BaseConverter.decode('BAA', ['A', 'B', 'C']), 'dec');
// BAA custom => 9 dec
```

#### `convert(value: string | number, fromBase: BaseType, toBase: BaseType): string | null`
Converts value from one base to another base. Will return `null` if value can not be converted.

```javascript
console.log('1010 bin =>', BaseConverter.convert(1010, baseBinary, baseHexadecimal), 'hex');
// 1010 bin => A hex

console.log('FF hex =>', BaseConverter.convert('FF', baseHexadecimal, baseBinary), 'bin');
// FF hex => 11111111 bin

console.log('FF custom =>', BaseConverter.convert('FF', ['A', 'B', 'C', 'D', 'E', 'F'], ['1', '2', '3']), 'custom');
// FF custom => 2133 bin
```

## Something does not work

Feel free to fork project, fix bugs, tests and finally request for pull
