import BaseConverter from './BaseConverter';
import baseBinary from './Base/baseBinary';
import baseOctal from './Base/baseOctal';
import baseDecimal from './Base/baseDecimal';
import baseHexadecimal from './Base/baseHexadecimal';
import base62 from './Base/base62';

describe('BaseConverter', () => {

    describe('_isNegativeValueAllowed', () => {
        it('should return true', () => {
            expect(BaseConverter._isNegativeValueAllowed(baseBinary)).toBeTruthy();
            expect(BaseConverter._isNegativeValueAllowed(baseOctal)).toBeTruthy();
            expect(BaseConverter._isNegativeValueAllowed(baseDecimal)).toBeTruthy();
            expect(BaseConverter._isNegativeValueAllowed(baseHexadecimal)).toBeTruthy();
            expect(BaseConverter._isNegativeValueAllowed(base62)).toBeTruthy();
        });

        it('should return false', () => {
            expect(BaseConverter._isNegativeValueAllowed(['A', 'B', 'C', '-'])).toBeFalsy();
            expect(BaseConverter._isNegativeValueAllowed(['-', 'A', 'B', 'C'])).toBeFalsy();
            expect(BaseConverter._isNegativeValueAllowed(['-', 1, 2, 3])).toBeFalsy();
            expect(BaseConverter._isNegativeValueAllowed([1, 2, 3, '-'])).toBeFalsy();
            expect(BaseConverter._isNegativeValueAllowed(null)).toBeFalsy();
            expect(BaseConverter._isNegativeValueAllowed(1)).toBeFalsy();
        });
    });

    it('should has public methods', () => {
        expect(typeof BaseConverter.encode).toBe('function');
        expect(typeof BaseConverter.decode).toBe('function');
        expect(typeof BaseConverter.convert).toBe('function');
    });

    it('should has prepared bases', () => {
        expect(Array.isArray(baseBinary)).toBeTruthy();
        expect(baseBinary.length).toBe(2);

        expect(Array.isArray(baseOctal)).toBeTruthy();
        expect(baseOctal.length).toBe(8);

        expect(Array.isArray(baseHexadecimal)).toBeTruthy();
        expect(baseHexadecimal.length).toBe(16);

        expect(Array.isArray(base62)).toBeTruthy();
        expect(base62.length).toBe(62);
    });

    it('Prepared bases have unique chars', () => {
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
        expect(isUnique(baseBinary)).toBeTruthy();
        expect(isUnique(baseOctal)).toBeTruthy();
        expect(isUnique(baseHexadecimal)).toBeTruthy();
        expect(isUnique(base62)).toBeTruthy();
    });

    it('Check "encode" edge cases', () => {
        expect(BaseConverter.encode(10, [])).toBeNull();
        expect(BaseConverter.encode(10, ['a'])).toBeNull();
        expect(BaseConverter.encode('AA', ['a', 'b'])).toBeNull();
        expect(BaseConverter.encode(null, [0, 1])).toBeNull();
        expect(BaseConverter.encode(NaN, [0, 1])).toBeNull();
    });

    it('Check "encode" with prepared bases', () => {
        expect(BaseConverter.encode(0, baseBinary)).toBe('0');
        expect(BaseConverter.encode(1, baseBinary)).toBe('1');
        expect(BaseConverter.encode(2, baseBinary)).toBe('10');
        expect(BaseConverter.encode(3, baseBinary)).toBe('11');
        expect(BaseConverter.encode(4, baseBinary)).toBe('100');
        expect(BaseConverter.encode(100, baseBinary)).toBe('1100100');

        expect(BaseConverter.encode(0, baseOctal)).toBe('0');
        expect(BaseConverter.encode(7, baseOctal)).toBe('7');
        expect(BaseConverter.encode(8, baseOctal)).toBe('10');
        expect(BaseConverter.encode(9, baseOctal)).toBe('11');
        expect(BaseConverter.encode(100, baseOctal)).toBe('144');

        expect(BaseConverter.encode(0, baseHexadecimal)).toBe('0');
        expect(BaseConverter.encode(8, baseHexadecimal)).toBe('8');
        expect(BaseConverter.encode(10, baseHexadecimal)).toBe('A');
        expect(BaseConverter.encode(11, baseHexadecimal)).toBe('B');
        expect(BaseConverter.encode(15, baseHexadecimal)).toBe('F');
        expect(BaseConverter.encode(16, baseHexadecimal)).toBe('10');
        expect(BaseConverter.encode(32, baseHexadecimal)).toBe('20');
        expect(BaseConverter.encode(64, baseHexadecimal)).toBe('40');
        expect(BaseConverter.encode(100, baseHexadecimal)).toBe('64');

        expect(BaseConverter.encode(0, base62)).toBe('0');
        expect(BaseConverter.encode(8, base62)).toBe('8');
        expect(BaseConverter.encode(10, base62)).toBe('A');
        expect(BaseConverter.encode(11, base62)).toBe('B');
        expect(BaseConverter.encode(15, base62)).toBe('F');
        expect(BaseConverter.encode(16, base62)).toBe('G');
        expect(BaseConverter.encode(32, base62)).toBe('W');
        expect(BaseConverter.encode(61, base62)).toBe('z');
        expect(BaseConverter.encode(62, base62)).toBe('10');
        expect(BaseConverter.encode(64, base62)).toBe('12');
        expect(BaseConverter.encode(100, base62)).toBe('1c');
    });

    it('Check "encode" with custom bases', () => {
        let base = ['a', 'b', 'c'];
        expect(BaseConverter.encode(0, base)).toBe('a');
        expect(BaseConverter.encode(1, base)).toBe('b');
        expect(BaseConverter.encode(2, base)).toBe('c');
        expect(BaseConverter.encode(3, base)).toBe('ba');
        expect(BaseConverter.encode(4, base)).toBe('bb');
        expect(BaseConverter.encode(5, base)).toBe('bc');
        expect(BaseConverter.encode(6, base)).toBe('ca');
        expect(BaseConverter.encode(7, base)).toBe('cb');
        expect(BaseConverter.encode(8, base)).toBe('cc');
        expect(BaseConverter.encode(9, base)).toBe('baa');
        expect(BaseConverter.encode(10, base)).toBe('bab');
    });

    it('Check "encode" with negative numbers', () => {
        expect(BaseConverter.encode(-1, baseHexadecimal)).toBe('-1');
        expect(BaseConverter.encode(-10, baseHexadecimal)).toBe('-A');
        expect(BaseConverter.encode(-16, baseHexadecimal)).toBe('-10');
    });

    it('Check "decode" edge cases', () => {
        expect(BaseConverter.decode('10', [])).toBeNull();
        expect(BaseConverter.decode('123', [1, 2])).toBeNull();
        expect(BaseConverter.decode('10 ', [1, 0])).toBeNull();
        expect(BaseConverter.decode('', [1, 0])).toBeNull();

        expect(BaseConverter.decode('001', [0, 1])).toBe(1);
        expect(BaseConverter.decode('00F', baseHexadecimal)).toBe(15);
        expect(BaseConverter.decode('-00F', baseHexadecimal)).toBe(-15);
    });

    it('Check "decode" with prepared bases', () => {
        expect(BaseConverter.decode(0, baseBinary)).toBe(0);
        expect(BaseConverter.decode(1, baseBinary)).toBe(1);
        expect(BaseConverter.decode(10, baseBinary)).toBe(2);
        expect(BaseConverter.decode(11, baseBinary)).toBe(3);
        expect(BaseConverter.decode(100, baseBinary)).toBe(4);
        expect(BaseConverter.decode(1100100, baseBinary)).toBe(100);

        expect(BaseConverter.decode('0', baseBinary)).toBe(0);
        expect(BaseConverter.decode('1', baseBinary)).toBe(1);
        expect(BaseConverter.decode('10', baseBinary)).toBe(2);
        expect(BaseConverter.decode('11', baseBinary)).toBe(3);
        expect(BaseConverter.decode('100', baseBinary)).toBe(4);
        expect(BaseConverter.decode('1100100', baseBinary)).toBe(100);

        expect(BaseConverter.decode(0, baseOctal)).toBe(0);
        expect(BaseConverter.decode(7, baseOctal)).toBe(7);
        expect(BaseConverter.decode(10, baseOctal)).toBe(8);
        expect(BaseConverter.decode(11, baseOctal)).toBe(9);
        expect(BaseConverter.decode(144, baseOctal)).toBe(100);

        expect(BaseConverter.decode('0', baseOctal)).toBe(0);
        expect(BaseConverter.decode('7', baseOctal)).toBe(7);
        expect(BaseConverter.decode('10', baseOctal)).toBe(8);
        expect(BaseConverter.decode('11', baseOctal)).toBe(9);
        expect(BaseConverter.decode('144', baseOctal)).toBe(100);

        expect(BaseConverter.decode('0', baseHexadecimal)).toBe(0);
        expect(BaseConverter.decode('8', baseHexadecimal)).toBe(8);
        expect(BaseConverter.decode('A', baseHexadecimal)).toBe(10);
        expect(BaseConverter.decode('B', baseHexadecimal)).toBe(11);
        expect(BaseConverter.decode('F', baseHexadecimal)).toBe(15);
        expect(BaseConverter.decode(10, baseHexadecimal)).toBe(16);
        expect(BaseConverter.decode(20, baseHexadecimal)).toBe(32);
        expect(BaseConverter.decode(40, baseHexadecimal)).toBe(64);
        expect(BaseConverter.decode(64, baseHexadecimal)).toBe(100);

        expect(BaseConverter.decode(0, base62)).toBe(0);
        expect(BaseConverter.decode(8, base62)).toBe(8);
        expect(BaseConverter.decode('A', base62)).toBe(10);
        expect(BaseConverter.decode('B', base62)).toBe(11);
        expect(BaseConverter.decode('F', base62)).toBe(15);
        expect(BaseConverter.decode('G', base62)).toBe(16);
        expect(BaseConverter.decode('W', base62)).toBe(32);
        expect(BaseConverter.decode('z', base62)).toBe(61);
        expect(BaseConverter.decode(10, base62)).toBe(62);
        expect(BaseConverter.decode(12, base62)).toBe(64);
        expect(BaseConverter.decode('1c', base62)).toBe(100);
    });

    it('Check "decode" with custom bases', () => {
        let base = ['a', 'b', 'c'];
        expect(BaseConverter.decode('a', base)).toBe(0);
        expect(BaseConverter.decode('b', base)).toBe(1);
        expect(BaseConverter.decode('c', base)).toBe(2);
        expect(BaseConverter.decode('ba', base)).toBe(3);
        expect(BaseConverter.decode('bb', base)).toBe(4);
        expect(BaseConverter.decode('bc', base)).toBe(5);
        expect(BaseConverter.decode('ca', base)).toBe(6);
        expect(BaseConverter.decode('cb', base)).toBe(7);
        expect(BaseConverter.decode('cc', base)).toBe(8);
        expect(BaseConverter.decode('baa', base)).toBe(9);
        expect(BaseConverter.decode('bab', base)).toBe(10);
    });

    it('Check "decode" with negative numbers', () => {
        expect(BaseConverter.decode(-1, baseHexadecimal)).toBe(-1);
        expect(BaseConverter.decode('-2', baseHexadecimal)).toBe(-2);
        expect(BaseConverter.decode('-A', baseHexadecimal)).toBe(-10);
        expect(BaseConverter.decode('-F', baseHexadecimal)).toBe(-15);
        expect(BaseConverter.decode(-10, baseHexadecimal)).toBe(-16);
        expect(BaseConverter.decode('-10', baseHexadecimal)).toBe(-16);
    });

    it('Check "convert" edge cases', () => {
        expect(BaseConverter.convert('FOO', baseHexadecimal, baseBinary)).toBeNull();
        expect(BaseConverter.convert('', baseHexadecimal, baseBinary)).toBeNull();
        expect(BaseConverter.convert(null, baseHexadecimal, baseBinary)).toBeNull();
    });

    it('Check "convert" common cases', () => {
        expect(BaseConverter.convert('FF', baseHexadecimal, baseOctal)).toBe('377');
        expect(BaseConverter.convert('10', baseOctal, baseBinary)).toBe('1000');

        expect(BaseConverter.convert('-FF', baseHexadecimal, baseOctal)).toBe('-377');
        expect(BaseConverter.convert('-10', baseOctal, baseBinary)).toBe('-1000');
    });

    it('Check "convert" custom cases', () => {
        expect(BaseConverter.convert(1010, [0, 1], [1, 0])).toBe('0101');
        expect(BaseConverter.convert(-777, [0, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe('-7');
        expect(BaseConverter.convert(42, [0, 1, 2, 3, 4], [4, 3, 2, 1, 0])).toBe('02');
        expect(BaseConverter.convert('02', [4, 3, 2, 1, 0], [0, 1, 2, 3, 4])).toBe('42');
    });

    it('should allow dash symbol for custom base for not negative converting', () => {
        const baseWithDash = [0, 1, 2, 3, 4, 5, 6, 7, 8, '-'];
        expect(BaseConverter.convert(-1, baseWithDash, baseDecimal)).toBe('91');
        expect(BaseConverter.convert(91, baseDecimal, baseWithDash)).toBe('-1');
        expect(BaseConverter.encode(5, ['-', '+'])).toBe('+-+');
        expect(BaseConverter.decode(-5, ['-', '5'])).toBe(1);
    });

});
