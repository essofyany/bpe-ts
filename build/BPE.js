"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPE = void 0;
var BPE = /** @class */ (function () {
    function BPE(document) {
        this.document = document;
    }
    BPE.prototype.word_freq_obj = function () {
        var wordList = this.document.map(function (word) { return word + "#"; }); // the "#" symbole indicate the end of word;
        var wordFreqObj = {};
        wordList.forEach(function (word) {
            if (word in wordFreqObj) {
                wordFreqObj[word] += 1;
            }
            else {
                wordFreqObj[word] = 1;
            }
        });
        return wordFreqObj;
    };
    BPE.prototype.splited_word_freq_obj = function (wordFreqObj) {
        var splitedWordFreqObj = {};
        for (var _i = 0, _a = Object.entries(wordFreqObj); _i < _a.length; _i++) {
            var _b = _a[_i], word = _b[0], freq = _b[1];
            // object keys transformed to splited keys:  'word' => 'w,o,r,d,#' : 12 freq
            var splitedWord = word.split("").toString();
            splitedWordFreqObj[splitedWord] = freq;
        }
        return splitedWordFreqObj;
    };
    BPE.prototype.extract_pairs = function (splitedWordFreqObj) {
        var extractedPairsObj = {};
        for (var _i = 0, _a = Object.entries(splitedWordFreqObj); _i < _a.length; _i++) {
            var _b = _a[_i], splitedWord = _b[0], freq = _b[1];
            var symbols = splitedWord.split(","); // 'l,o,w'=> ['l','o','w']
            for (var i = 0; i < symbols.length - 1; i++) {
                var leftChar = symbols[i]; // 'l'
                var rightChar = symbols[i + 1]; // 'o'
                var pair = leftChar + "," + rightChar; // 'l,o'
                if (pair in extractedPairsObj) {
                    extractedPairsObj[pair] += freq;
                }
                else {
                    extractedPairsObj[pair] = freq;
                }
            }
        }
        // sotre extracted pairs Object with frequency
        var entries = Object.entries(extractedPairsObj);
        var sorte = entries.sort(function (a, b) { return b[1] - a[1]; });
        extractedPairsObj = Object.fromEntries(sorte);
        return extractedPairsObj;
    };
    BPE.prototype.get_and_merge_best_pair = function (extractedPairsObj) {
        var pairsAndFreq = Object.entries(extractedPairsObj); //extractedPairsObj is sorted the top prop is the best pair
        var bestPair = pairsAndFreq[0][0]; // this get the fisrt pair in pairsAndFreq (2D array)
        var mergedPair = bestPair.replace(",", ""); // 'l,o' => 'lo'
        return { bestPair: bestPair, mergedPair: mergedPair };
    };
    BPE.prototype.merge_splited_word = function (
    // {'w,o,r,d,#': 12, ...} => [['w,o,r,d,#', 12], []]
    splitedWordFreqObj, bestPairObj) {
        var bestPair = bestPairObj.bestPair, mergedPair = bestPairObj.mergedPair;
        var newSplitedWordObj = {};
        for (var _i = 0, _a = Object.entries(splitedWordFreqObj); _i < _a.length; _i++) {
            var _b = _a[_i], splitedWord = _b[0], freq = _b[1];
            // 'w,o,r,d,#' => 'wo,r,d,#'
            var newSplitedWord = splitedWord.replace(bestPair, mergedPair);
            newSplitedWordObj[newSplitedWord] = freq;
        }
        return newSplitedWordObj;
    };
    BPE.prototype._bpe = function (numberOfMerges) {
        var wordFreqObj = this.word_freq_obj();
        var bpeList = [];
        var itr = 0;
        var splitedWordFreqObj = this.splited_word_freq_obj(wordFreqObj);
        while (itr < numberOfMerges) {
            var extractedPairsObj = this.extract_pairs(splitedWordFreqObj);
            var bestPairObj = this.get_and_merge_best_pair(extractedPairsObj);
            console.log("############", itr, "###########");
            // console.log("bestPairObj", bestPairObj);
            bpeList.push(bestPairObj.mergedPair);
            splitedWordFreqObj = this.merge_splited_word(splitedWordFreqObj, bestPairObj);
            itr++;
        }
        return bpeList;
    };
    return BPE;
}());
exports.BPE = BPE;
