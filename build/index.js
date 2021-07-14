"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BPE_1 = require("./BPE");
var readData_1 = require("./utils/readData");
var writeData_1 = require("./utils/writeData");
// TODO: fixe issue of the end_of_word symbol appearence after cleaning arabic text  
console.log("#######################");
// load textual data => array of strings with filtering stopwords
var document = readData_1.readDocuments(["src", "data", "arabic.txt"]);
console.log("document:", document, "document length: ", document.length);
console.log("######################");
// // clean up phase only for Arabic text if text is not arabic it will return empty array
// const cleaner = new Cleaner();
// const cleanedText = cleaner.fullCleanUp(document);
// console.log(
//   "cleanedText:",
//   cleanedText,
//   "cleanedText length: ",
//   cleanedText.length
// );
// console.log("######################");
// writeResults(["src", "data", "results.txt"], document);
var bpe = new BPE_1.BPE(document);
// creat {word: frequency} => {'low': 2, 'new': 1, ...}
// const wordFreqObj = bpe.word_freq_obj();
// console.log("word Frequency Object:", wordFreqObj);
// console.log("#######################");
// // splite object keys {word: frequency} => {'w,o,r,d,#': frequency}
// const splitedWordFreqObj = bpe.splited_word_freq_obj(wordFreqObj);
// console.log("splited word frequency Object:", splitedWordFreqObj);
// console.log("#######################");
// // extract and sorte Pairs from splited word frequency Object {'w,o,r,d,#': frequency} => {'w,o': freq, ...}
// const extractedPairs = bpe.extract_pairs(splitedWordFreqObj);
// console.log("extracted and sorted Pairs and frequency Object:", extractedPairs);
// console.log("#######################");
// // get Merged Best Pair Object: {bestPair: 'o,w', mergedPair: 'ow'}
// const bestPairObj = bpe.get_and_merge_best_pair(extractedPairs);
// console.log("get Merged Best Pair Object:", bestPairObj);
// console.log("#######################");
// // merge splited word in splitedWordFreqObj with the bestPair : {'l,o,w,#': 4, ...} => {'l,ow,#': 4, ...}
// const mergedSplitedWord = bpe.merge_splited_word(
//   splitedWordFreqObj,
//   bestPairObj
// );
// console.log("Merge splited word with bestPair :", mergedSplitedWord);
// console.log("#######################");
var numberOfMerges = 20;
var results = bpe._bpe(numberOfMerges);
writeData_1.writeResults(["src", "data", "results.txt"], results);
