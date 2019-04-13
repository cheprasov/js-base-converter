// @flow

import { BaseConverter, baseBinary, baseHexadecimal } from './../src/index';

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

console.log('CBA custom =>', BaseConverter.convert('CBA', ['A', 'B', 'C'], ['0', '1', '2']), 'custom');
// CBA custom => 210 bin
