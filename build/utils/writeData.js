"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeResults = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function writeResults(filePath, data) {
    var documentsDataPath = path_1.default.join.apply(path_1.default, __spreadArray([process.cwd()], filePath));
    var results = data.join("\n");
    fs_1.default.writeFileSync(documentsDataPath, results);
}
exports.writeResults = writeResults;
