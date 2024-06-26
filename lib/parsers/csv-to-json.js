"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const csvtojson_1 = tslib_1.__importDefault(require("csvtojson"));
const camelcase_keys_1 = tslib_1.__importDefault(require("camelcase-keys"));
async function csvToJson(csv, quote = '"', delimiter = ',') {
    const service = (0, csvtojson_1.default)({
        quote,
        delimiter,
        checkColumn: true,
    });
    const results = (await service.fromString(csv));
    if (results.length === 0) {
        return results;
    }
    return (0, camelcase_keys_1.default)(results, {
        deep: true,
    });
}
exports.default = csvToJson;
