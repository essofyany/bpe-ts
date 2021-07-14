"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cleaner = void 0;
var Cleaner = /** @class */ (function () {
    function Cleaner() {
        this.regex_chars = /\w+/g;
        // regular expression for removing emojis
        this.regex_emojis =
            /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        //  regular expression for removing symbols
        this.regex_0 = /\@{1,}/gm;
        this.regex_1 = /\/{1,}/gm;
        this.regex_2 = /\.{1,}/gm;
        this.regex_3 = /\#{1,}/gm;
        this.regex_4 = /\:{1,}/gm;
        this.regex_5 = /\?{1,}/gm;
        this.regex_6 = /\'{1,}/gm;
        this.regex_7 = /\"{1,}/gm;
        this.regex_8 = /\`{1,}/gm;
        this.regex_9 = /\*{1,}/gm;
        this.regex_11 = /\${1,}/gm;
        this.regex_12 = /\&{1,}/gm;
        this.regex_13 = /\%{1,}/gm;
        this.regex_14 = /\({1,}/gm;
        this.regex_15 = /\){1,}/gm;
        this.regex_16 = /\={1,}/gm;
        this.regex_17 = /\[{1,}/gm;
        this.regex_18 = /\]{1,}/gm;
        this.regex_19 = /\+{1,}/gm;
        this.regex_10 = /\-{1,}/gm;
        this.regex_20 = /\<{1,}/gm;
        this.regex_21 = /\>{1,}/gm;
        this.regex_22 = /\!{1,}/gm;
        this.regex_23 = /\؟{1,}/gm;
        this.regex_24 = /\…{1,}/gm;
        this.regex_25 = /\،{1,}/gm;
        this.regex_26 = /\\{1,}/gm;
        this.regex_27 = /\é{1,}/gm;
        this.regex_28 = /\à{1,}/gm;
        this.regex_29 = /\—{1,}/gm;
        this.regex_30 = /\,{1,}/gm;
        this.regex_31 = /\;{1,}/gm;
        // letters with diacritics
        this.regex_32 = /\گ{1,}/gm;
        this.regex_33 = /\آ{1,}/gm;
        this.regex_34 = /\أ{1,}/gm;
        this.regex_35 = /\إ{1,}/gm;
    }
    Cleaner.prototype.removeEmojis = function (document) {
        var _this = this;
        var cleanedFromEmojis = document.map(function (word) {
            return word.replace(_this.regex_emojis, "");
        });
        return cleanedFromEmojis;
    };
    Cleaner.prototype.removeChars = function (document) {
        var _this = this;
        // chars like abcd ABCS ....
        var cleanedFromChars = document.map(function (word) {
            return word.replace(_this.regex_chars, "");
        });
        return cleanedFromChars;
    };
    Cleaner.prototype.deepCleaner = function (document) {
        var _this = this;
        // remove critical chars and diacritics
        return document.map(function (word) {
            return word
                .replace(_this.regex_chars, "")
                .replace(_this.regex_emojis, "")
                .replace(_this.regex_0, "")
                .replace(_this.regex_1, "")
                .replace(_this.regex_2, "")
                .replace(_this.regex_3, "")
                .replace(_this.regex_4, "")
                .replace(_this.regex_5, "")
                .replace(_this.regex_6, "")
                .replace(_this.regex_7, "")
                .replace(_this.regex_8, "")
                .replace(_this.regex_9, "")
                .replace(_this.regex_10, "")
                .replace(_this.regex_11, "")
                .replace(_this.regex_12, "")
                .replace(_this.regex_13, "")
                .replace(_this.regex_14, "")
                .replace(_this.regex_15, "")
                .replace(_this.regex_16, "")
                .replace(_this.regex_17, "")
                .replace(_this.regex_18, "")
                .replace(_this.regex_19, "")
                .replace(_this.regex_20, "")
                .replace(_this.regex_21, "")
                .replace(_this.regex_22, "")
                .replace(_this.regex_23, "")
                .replace(_this.regex_24, "")
                .replace(_this.regex_25, "")
                .replace(_this.regex_26, "")
                .replace(_this.regex_27, "")
                .replace(_this.regex_28, "")
                .replace(_this.regex_29, "")
                .replace(_this.regex_30, "")
                .replace(_this.regex_31, "")
                .replace(_this.regex_32, "ڪ")
                .replace(_this.regex_33, "ا")
                .replace(_this.regex_34, "ا")
                .replace(_this.regex_35, "ا");
        });
    };
    Cleaner.prototype.normalizor = function (document) {
        var wordList = document
            .map(function (word) {
            return word.trim();
        })
            .filter(function (word) { return word.length >= 3; });
        //Delete [ا] جدااااا => جدا
        var normlalizedWordList = wordList.map(function (word) {
            return word
                .replace(/ا{2,}/gm, "ا")
                .replace(/ه{3,}/gm, "ه")
                .replace(/ي{2,}/gm, "ي")
                .replace(/ب{3,}/gm, "ب")
                .replace(/ل{3,}/gm, "ل")
                .replace(/ن{2,}/gm, "ن")
                .replace(/ت{3,}/gm, "ت")
                .replace(/م{3,}/gm, "م")
                .replace(/ك{2,}/gm, "ك")
                .replace(/ط{2,}/gm, "ط")
                .replace(/د{2,}/gm, "د")
                .replace(/ج{2,}/gm, "ج")
                .replace(/ح{2,}/gm, "ح")
                .replace(/خ{2,}/gm, "خ")
                .replace(/غ{2,}/gm, "غ")
                .replace(/ف{2,}/gm, "ف")
                .replace(/ق{2,}/gm, "ق")
                .replace(/ث{2,}/gm, "ث")
                .replace(/ص{2,}/gm, "ص")
                .replace(/ش{2,}/gm, "ش")
                .replace(/س{2,}/gm, "س")
                .replace(/ر{2,}/gm, "ر")
                .replace(/لا{2,}/gm, "لا")
                .replace(/ى{2,}/gm, "ى")
                .replace(/ة{2,}/gm, "ة")
                .replace(/و{2,}/gm, "و")
                .replace(/ز{2,}/gm, "ز")
                .replace(/ظ{2,}/gm, "ظ");
        });
        return normlalizedWordList;
    };
    Cleaner.prototype.fullCleanUp = function (text) {
        var removeEmojis = this.removeEmojis(text);
        var removeNumbersAndChars = this.removeChars(removeEmojis);
        var fullCleanedText = this.deepCleaner(removeNumbersAndChars);
        var normalizedText = this.normalizor(fullCleanedText);
        return normalizedText;
    };
    return Cleaner;
}());
exports.Cleaner = Cleaner;
