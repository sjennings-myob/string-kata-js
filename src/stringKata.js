const DEFAULT_DELIMITER = ",";
const createCustomDelimiters = (delimiters) => delimiters.map((d) => d.substring(1, d.length - 1));
const getNegatives = (numbers) => numbers.filter((x) => x < 0)
const getNumbersUnder1000 = (numbers) => numbers.filter((x) => x < 1000);
const isCustomDelimiter = (string) => string[0] === "/" && string[1] === "/";

const parse = (string) => {
    if (string.length === 0) {
        return 0;
    }

    const delimiters = getDelimiters(string);
    const numbers = parseString(string, delimiters);
    const negatives = getNegatives(numbers);

    if (negatives.length > 0) {
        throw new Error("no negatives: " + negatives.join(", "))
    }

    const numbersUnder1000 = getNumbersUnder1000(numbers);

    return numbersUnder1000.reduce((x, n) => x + n, 0);
};

function getDelimiters(string) {
    let delimiters = [',', '\n'];

    if (isCustomDelimiter(string)) {
        delimiters = getCustomDelimiters(string);
    }
    return delimiters;
}

function getCustomDelimiters(string) {
    let match = string.match(/\[[^\n]*?\]/g);

    if (!match) return [string[2]];

    return createCustomDelimiters(match);
}

function parseString(string, delimiters) {
    if (isCustomDelimiter(string)) {
        string = string.substring(string.indexOf("\n") + 1);
    }

    const unDelimitedString = delimiters.reduce((a, d) => a.split(d).join(DEFAULT_DELIMITER), string);

    return unDelimitedString.split(DEFAULT_DELIMITER).reduce((r, n) => r.concat([Number.parseInt(n)]), []);
}

module.exports = { parse };