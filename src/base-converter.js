const baseConverter = {

    BASE_2: ['0', '1'],

    BASE_16: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],

    BASE_62: [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ],

    /**
     * @param {number} number
     * @param {string[]} base
     * @return {*|string}
     */
    encodeNumber(number, base) {
        let value = Math.abs(number);
        const encoded = [];
        const count = base.length;

        if (count === 1 && number !== 0) {
            return NaN;
        }
        while (value >= count) {
            let i = value % count;
            value = Math.floor((value - i) / count);
            encoded.push(base[i]);
        }
        encoded.push(base[value]);
        if (number < 0) {
            encoded.push('-');
        }
        return encoded.reduce((str, curr) => String(curr) + str, '');
    },

    /**
     * @param {string} string
     * @param {string[]} base
     * @return {number}
     */
    decodeNumber(string, base) {
        if (isNaN(string)) {
            return NaN;
        }
        const count = base.length;
        const hash = base.reduce((hash, num, i) => {hash[num] = i; return hash;}, {});

        let number = 0;
        let str = string;
        let isNegative = false;

        if (str[0] === '-') {
            str = str.substr(1, str.length - 1);
            isNegative = true;
        }

        let pow = 0;
        while (str.length > 0) {
            const chr = str[str.length - 1];
            str = str.substr(0, str.length - 1);
            number += (count ** pow) * hash[chr];
            pow += 1
        }

        if (isNegative) {
            number = -number;
        }

        return number;
    },

};

module.exports = baseConverter;
