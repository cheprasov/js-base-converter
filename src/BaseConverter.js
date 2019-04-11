// @flow

export type BaseType = Array<string|number>;

export default class BaseConverter {

    static _isAllowedNegativeValues(base: BaseType): boolean {
        return Array.isArray(base) && base.indexOf('-') === -1;
    }

    static encode(num: number | null, base: BaseType): string | null {
        if (isNaN(num) || num === null || !Array.isArray(base) || !base.length) {
            return null;
        }
        let value = Math.abs(num);
        const encoded = [];
        const count = base.length;

        if (count === 1 && num !== 0) {
            return null;
        }
        while (value >= count) {
            let i = value % count;
            value = Math.floor((value - i) / count);
            encoded.push(base[i]);
        }
        encoded.push(base[value]);
        if (num < 0) {
            if (!this._isAllowedNegativeValues(base)) {
                return null;
            }
            encoded.push('-');
        }
        return encoded.reduce((str, curr) => String(curr) + str, '');
    }

    static decode(value: string, base: BaseType): number | null {
        if (value === '' || !Array.isArray(base) || !base.length) {
            return null;
        }
        const count = base.length;
        const hash = base.reduce((hash, num, i) => {hash[num] = i; return hash;}, {});

        let number = 0;
        let str = String(value);
        let isNegative = false;

        if (str[0] === '-' && this._isAllowedNegativeValues(base)) {
            str = str.substr(1, str.length - 1);
            isNegative = true;
        }

        let pow = 0;
        while (str.length > 0) {
            const chr = str[str.length - 1];
            const num = hash[chr];
            if (typeof num !== 'number') {
                return null;
            }
            str = str.substr(0, str.length - 1);
            number += (count ** pow) * num;
            pow += 1
        }

        if (isNegative) {
            number = -number;
        }

        return number;
    }

    static convert(value: string | number, fromBase: BaseType, toBase: BaseType): string | null {
        const num = this.decode(value, fromBase);
        return this.encode(num, toBase);
    }

}
