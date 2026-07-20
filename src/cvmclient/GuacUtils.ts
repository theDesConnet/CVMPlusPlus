export function encodeGuac(array: Array<string>): string {
    return array.map(v => { if (v !== undefined) return v.length.toString() + '.' + v }).join(',') + ';';
}

export function decodeGuac(str: string): Array<string> {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        let sectionLengthStr = [];
        for (; str[i] !== '.'; i++) {
            sectionLengthStr.push(str[i]);
        }
        i++;
        const sectionLength = parseInt(sectionLengthStr.join(''));
        if (isNaN(sectionLength)) throw new Error('sectionLength is NaN while decoding guacamole string' + str);
        result.push(str.substring(i, i + sectionLength));
        i += sectionLength;
        if (str[i] === ';') break;
    }
    return result;
}