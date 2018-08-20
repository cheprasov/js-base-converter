const baseConverter = require('/SRC/base-converter.js');

test('baseConverter has methods', () => {
    expect(typeof baseConverter.encodeNumber).toBe('function');
    expect(typeof baseConverter.decodeNumber).toBe('function');
    expect(typeof baseConverter.convert).toBe('function');
});

test('baseConverter has prepared bases', () => {
    expect(Array.isArray(baseConverter.BASE_2)).toBe(true);
    expect(Array.isArray(baseConverter.BASE_8)).toBe(true);
    expect(Array.isArray(baseConverter.BASE_16)).toBe(true);
    expect(Array.isArray(baseConverter.BASE_62)).toBe(true);
});

test('Prepared bases have correct size', () => {
    expect(baseConverter.BASE_2.length).toBe(2);
    expect(baseConverter.BASE_8.length).toBe(8);
    expect(baseConverter.BASE_16.length).toBe(16);
    expect(baseConverter.BASE_62.length).toBe(62);
});

test('Prepared bases have unique chars', () => {
    /**
     * @param {array} base
     * @return {boolean}
     */
    const isUnique = (base) => {
        const hash = {};
        for (const chr of base) {
            if (hash[chr]) {
                return false;
            }
            hash[chr] = true;
        }
        return true;
    };
    expect(isUnique(baseConverter.BASE_2)).toBe(true);
    expect(isUnique(baseConverter.BASE_8)).toBe(true);
    expect(isUnique(baseConverter.BASE_16)).toBe(true);
    expect(isUnique(baseConverter.BASE_62)).toBe(true);
});

test('Check "encodeNumber" edge cases', () => {
    expect(baseConverter.encodeNumber(10, [])).toBe(null);
    expect(baseConverter.encodeNumber(10, ['a'])).toBe(null);
});

test('Check "encodeNumber" with prepared bases', () => {
    expect(baseConverter.encodeNumber(0, baseConverter.BASE_2)).toBe('0');
    expect(baseConverter.encodeNumber(1, baseConverter.BASE_2)).toBe('1');
    expect(baseConverter.encodeNumber(2, baseConverter.BASE_2)).toBe('10');
    expect(baseConverter.encodeNumber(3, baseConverter.BASE_2)).toBe('11');
    expect(baseConverter.encodeNumber(4, baseConverter.BASE_2)).toBe('100');
    expect(baseConverter.encodeNumber(100, baseConverter.BASE_2)).toBe('1100100');

    expect(baseConverter.encodeNumber(0, baseConverter.BASE_8)).toBe('0');
    expect(baseConverter.encodeNumber(7, baseConverter.BASE_8)).toBe('7');
    expect(baseConverter.encodeNumber(8, baseConverter.BASE_8)).toBe('10');
    expect(baseConverter.encodeNumber(9, baseConverter.BASE_8)).toBe('11');
    expect(baseConverter.encodeNumber(100, baseConverter.BASE_8)).toBe('144');

    expect(baseConverter.encodeNumber(0, baseConverter.BASE_16)).toBe('0');
    expect(baseConverter.encodeNumber(8, baseConverter.BASE_16)).toBe('8');
    expect(baseConverter.encodeNumber(10, baseConverter.BASE_16)).toBe('A');
    expect(baseConverter.encodeNumber(11, baseConverter.BASE_16)).toBe('B');
    expect(baseConverter.encodeNumber(15, baseConverter.BASE_16)).toBe('F');
    expect(baseConverter.encodeNumber(16, baseConverter.BASE_16)).toBe('10');
    expect(baseConverter.encodeNumber(32, baseConverter.BASE_16)).toBe('20');
    expect(baseConverter.encodeNumber(64, baseConverter.BASE_16)).toBe('40');
    expect(baseConverter.encodeNumber(100, baseConverter.BASE_16)).toBe('64');

    expect(baseConverter.encodeNumber(0, baseConverter.BASE_62)).toBe('0');
    expect(baseConverter.encodeNumber(8, baseConverter.BASE_62)).toBe('8');
    expect(baseConverter.encodeNumber(10, baseConverter.BASE_62)).toBe('A');
    expect(baseConverter.encodeNumber(11, baseConverter.BASE_62)).toBe('B');
    expect(baseConverter.encodeNumber(15, baseConverter.BASE_62)).toBe('F');
    expect(baseConverter.encodeNumber(16, baseConverter.BASE_62)).toBe('G');
    expect(baseConverter.encodeNumber(32, baseConverter.BASE_62)).toBe('W');
    expect(baseConverter.encodeNumber(61, baseConverter.BASE_62)).toBe('z');
    expect(baseConverter.encodeNumber(62, baseConverter.BASE_62)).toBe('10');
    expect(baseConverter.encodeNumber(64, baseConverter.BASE_62)).toBe('12');
    expect(baseConverter.encodeNumber(100, baseConverter.BASE_62)).toBe('1c');
});

test('Check "encodeNumber" with custom bases', () => {
    let base = ['a', 'b', 'c'];
    expect(baseConverter.encodeNumber(0, base)).toBe('a');
    expect(baseConverter.encodeNumber(1, base)).toBe('b');
    expect(baseConverter.encodeNumber(2, base)).toBe('c');
    expect(baseConverter.encodeNumber(3, base)).toBe('ba');
    expect(baseConverter.encodeNumber(4, base)).toBe('bb');
    expect(baseConverter.encodeNumber(5, base)).toBe('bc');
    expect(baseConverter.encodeNumber(6, base)).toBe('ca');
    expect(baseConverter.encodeNumber(7, base)).toBe('cb');
    expect(baseConverter.encodeNumber(8, base)).toBe('cc');
    expect(baseConverter.encodeNumber(9, base)).toBe('baa');
    expect(baseConverter.encodeNumber(10, base)).toBe('bab');
});

test('Check "encodeNumber" with negative numbers', () => {
    expect(baseConverter.encodeNumber(-1, baseConverter.BASE_16)).toBe('-1');
    expect(baseConverter.encodeNumber(-10, baseConverter.BASE_16)).toBe('-A');
    expect(baseConverter.encodeNumber(-16, baseConverter.BASE_16)).toBe('-10');
});

test('Check "decodeNumber" edge cases', () => {
    expect(baseConverter.decodeNumber('10', [])).toBe(NaN);
    expect(baseConverter.decodeNumber('123', [1, 2])).toBe(NaN);
    expect(baseConverter.decodeNumber('10 ', [1, 0])).toBe(NaN);
    expect(baseConverter.decodeNumber('', [1, 0])).toBe(NaN);

    expect(baseConverter.decodeNumber('001', [0, 1])).toBe(1);
    expect(baseConverter.decodeNumber('00F', baseConverter.BASE_16)).toBe(15);
    expect(baseConverter.decodeNumber('-00F', baseConverter.BASE_16)).toBe(-15);
});

test('Check "decodeNumber" with prepared bases', () => {
    expect(baseConverter.decodeNumber(0, baseConverter.BASE_2)).toBe(0);
    expect(baseConverter.decodeNumber(1, baseConverter.BASE_2)).toBe(1);
    expect(baseConverter.decodeNumber(10, baseConverter.BASE_2)).toBe(2);
    expect(baseConverter.decodeNumber(11, baseConverter.BASE_2)).toBe(3);
    expect(baseConverter.decodeNumber(100, baseConverter.BASE_2)).toBe(4);
    expect(baseConverter.decodeNumber(1100100, baseConverter.BASE_2)).toBe(100);

    expect(baseConverter.decodeNumber('0', baseConverter.BASE_2)).toBe(0);
    expect(baseConverter.decodeNumber('1', baseConverter.BASE_2)).toBe(1);
    expect(baseConverter.decodeNumber('10', baseConverter.BASE_2)).toBe(2);
    expect(baseConverter.decodeNumber('11', baseConverter.BASE_2)).toBe(3);
    expect(baseConverter.decodeNumber('100', baseConverter.BASE_2)).toBe(4);
    expect(baseConverter.decodeNumber('1100100', baseConverter.BASE_2)).toBe(100);

    expect(baseConverter.decodeNumber(0, baseConverter.BASE_8)).toBe(0);
    expect(baseConverter.decodeNumber(7, baseConverter.BASE_8)).toBe(7);
    expect(baseConverter.decodeNumber(10, baseConverter.BASE_8)).toBe(8);
    expect(baseConverter.decodeNumber(11, baseConverter.BASE_8)).toBe(9);
    expect(baseConverter.decodeNumber(144, baseConverter.BASE_8)).toBe(100);

    expect(baseConverter.decodeNumber('0', baseConverter.BASE_8)).toBe(0);
    expect(baseConverter.decodeNumber('7', baseConverter.BASE_8)).toBe(7);
    expect(baseConverter.decodeNumber('10', baseConverter.BASE_8)).toBe(8);
    expect(baseConverter.decodeNumber('11', baseConverter.BASE_8)).toBe(9);
    expect(baseConverter.decodeNumber('144', baseConverter.BASE_8)).toBe(100);

    expect(baseConverter.decodeNumber('0', baseConverter.BASE_16)).toBe(0);
    expect(baseConverter.decodeNumber('8', baseConverter.BASE_16)).toBe(8);
    expect(baseConverter.decodeNumber('A', baseConverter.BASE_16)).toBe(10);
    expect(baseConverter.decodeNumber('B', baseConverter.BASE_16)).toBe(11);
    expect(baseConverter.decodeNumber('F', baseConverter.BASE_16)).toBe(15);
    expect(baseConverter.decodeNumber(10, baseConverter.BASE_16)).toBe(16);
    expect(baseConverter.decodeNumber(20, baseConverter.BASE_16)).toBe(32);
    expect(baseConverter.decodeNumber(40, baseConverter.BASE_16)).toBe(64);
    expect(baseConverter.decodeNumber(64, baseConverter.BASE_16)).toBe(100);

    expect(baseConverter.decodeNumber(0, baseConverter.BASE_62)).toBe(0);
    expect(baseConverter.decodeNumber(8, baseConverter.BASE_62)).toBe(8);
    expect(baseConverter.decodeNumber('A', baseConverter.BASE_62)).toBe(10);
    expect(baseConverter.decodeNumber('B', baseConverter.BASE_62)).toBe(11);
    expect(baseConverter.decodeNumber('F', baseConverter.BASE_62)).toBe(15);
    expect(baseConverter.decodeNumber('G', baseConverter.BASE_62)).toBe(16);
    expect(baseConverter.decodeNumber('W', baseConverter.BASE_62)).toBe(32);
    expect(baseConverter.decodeNumber('z', baseConverter.BASE_62)).toBe(61);
    expect(baseConverter.decodeNumber(10, baseConverter.BASE_62)).toBe(62);
    expect(baseConverter.decodeNumber(12, baseConverter.BASE_62)).toBe(64);
    expect(baseConverter.decodeNumber('1c', baseConverter.BASE_62)).toBe(100);
});

test('Check "decodeNumber" with custom bases', () => {
    let base = ['a', 'b', 'c'];
    expect(baseConverter.decodeNumber('a', base)).toBe(0);
    expect(baseConverter.decodeNumber('b', base)).toBe(1);
    expect(baseConverter.decodeNumber('c', base)).toBe(2);
    expect(baseConverter.decodeNumber('ba', base)).toBe(3);
    expect(baseConverter.decodeNumber('bb', base)).toBe(4);
    expect(baseConverter.decodeNumber('bc', base)).toBe(5);
    expect(baseConverter.decodeNumber('ca', base)).toBe(6);
    expect(baseConverter.decodeNumber('cb', base)).toBe(7);
    expect(baseConverter.decodeNumber('cc', base)).toBe(8);
    expect(baseConverter.decodeNumber('baa', base)).toBe(9);
    expect(baseConverter.decodeNumber('bab', base)).toBe(10);
});

test('Check "decodeNumber" with negative numbers', () => {
    expect(baseConverter.decodeNumber(-1, baseConverter.BASE_16)).toBe(-1);
    expect(baseConverter.decodeNumber('-2', baseConverter.BASE_16)).toBe(-2);
    expect(baseConverter.decodeNumber('-A', baseConverter.BASE_16)).toBe(-10);
    expect(baseConverter.decodeNumber('-F', baseConverter.BASE_16)).toBe(-15);
    expect(baseConverter.decodeNumber(-10, baseConverter.BASE_16)).toBe(-16);
    expect(baseConverter.decodeNumber('-10', baseConverter.BASE_16)).toBe(-16);
});

test('Check "convert" edge cases', () => {
    expect(baseConverter.convert('FOO', baseConverter.BASE_16, baseConverter.BASE_2)).toBe(null);
    expect(baseConverter.convert('', baseConverter.BASE_16, baseConverter.BASE_2)).toBe(null);
    expect(baseConverter.convert(null, baseConverter.BASE_16, baseConverter.BASE_2)).toBe(null);
});

test('Check "convert" common cases', () => {
    expect(baseConverter.convert('FF', baseConverter.BASE_16, baseConverter.BASE_8)).toBe('377');
    expect(baseConverter.convert('10', baseConverter.BASE_8, baseConverter.BASE_2)).toBe('1000');

    expect(baseConverter.convert('-FF', baseConverter.BASE_16, baseConverter.BASE_8)).toBe('-377');
    expect(baseConverter.convert('-10', baseConverter.BASE_8, baseConverter.BASE_2)).toBe('-1000');
});

test('Check "convert" custom cases', () => {
    expect(baseConverter.convert(1010, [0, 1], [1, 0])).toBe('0101');
    expect(baseConverter.convert(-777, [0, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe('-7');
    expect(baseConverter.convert(42, [0, 1, 2, 3, 4], [4, 3, 2, 1, 0])).toBe('02');
    expect(baseConverter.convert('02', [4, 3, 2, 1, 0], [0, 1, 2, 3, 4])).toBe('42');
});
