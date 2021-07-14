export class BPE {
  constructor(public document: string[]) {}

  word_freq_obj(): { [word: string]: number } {
    const wordList = this.document.map((word: string) => word + "#"); // the "#" symbole indicate the end of word;

    const wordFreqObj: { [word: string]: number } = {};

    wordList.forEach((word): void => {
      if (word in wordFreqObj) {
        wordFreqObj[word] += 1;
      } else {
        wordFreqObj[word] = 1;
      }
    });

    return wordFreqObj;
  }

  splited_word_freq_obj(wordFreqObj: { [word: string]: number }): {
    [splitedWord: string]: number;
  } {
    const splitedWordFreqObj: { [splitedWord: string]: number } = {};

    for (const [word, freq] of Object.entries(wordFreqObj)) {
      // object keys transformed to splited keys:  'word' => 'w,o,r,d,#' : 12 freq
      const splitedWord: string = word.split("").toString();
      splitedWordFreqObj[splitedWord] = freq;
    }

    return splitedWordFreqObj;
  }

  extract_pairs(splitedWordFreqObj: { [splitedWord: string]: number }): {
    [pair: string]: number;
  } {
    let extractedPairsObj: { [pair: string]: number } = {};

    for (const [splitedWord, freq] of Object.entries(splitedWordFreqObj)) {
      const symbols: string[] = splitedWord.split(","); // 'l,o,w'=> ['l','o','w']

      for (let i = 0; i < symbols.length - 1; i++) {
        const leftChar = symbols[i]; // 'l'
        const rightChar = symbols[i + 1]; // 'o'
        const pair: string = `${leftChar},${rightChar}`; // 'l,o'

        if (pair in extractedPairsObj) {
          extractedPairsObj[pair] += freq;
        } else {
          extractedPairsObj[pair] = freq;
        }
      }
    }
    // sotre extracted pairs Object with frequency
    const entries = Object.entries(extractedPairsObj);
    const sorte = entries.sort((a, b) => b[1] - a[1]);
    extractedPairsObj = Object.fromEntries(sorte);

    return extractedPairsObj;
  }

  get_and_merge_best_pair(extractedPairsObj: { [pairs: string]: number }): {
    bestPair: string;
    mergedPair: string;
  } {
    const pairsAndFreq = Object.entries(extractedPairsObj); //extractedPairsObj is sorted the top prop is the best pair
    const bestPair = pairsAndFreq[0][0]; // this get the fisrt pair in pairsAndFreq (2D array)
    const mergedPair = bestPair.replace(",", ""); // 'l,o' => 'lo'

    return { bestPair, mergedPair };
  }

  merge_splited_word(
    // {'w,o,r,d,#': 12, ...} => [['w,o,r,d,#', 12], []]
    splitedWordFreqObj: { [splitedWord: string]: number },
    bestPairObj: {
      bestPair: string;
      mergedPair: string;
    }
  ): {
    [newSplitedWord: string]: number;
  } {
    const { bestPair, mergedPair } = bestPairObj;
    const newSplitedWordObj: { [newSplitedWord: string]: number } = {};

    for (const [splitedWord, freq] of Object.entries(splitedWordFreqObj)) {
      // 'w,o,r,d,#' => 'wo,r,d,#'
      const newSplitedWord = splitedWord.replace(bestPair, mergedPair);
      newSplitedWordObj[newSplitedWord] = freq;
    }

    return newSplitedWordObj;
  }

  _bpe(numberOfMerges: number): string[] {
    const wordFreqObj = this.word_freq_obj();
    const bpeList: string[] = [];
    let itr = 0;
    let splitedWordFreqObj = this.splited_word_freq_obj(wordFreqObj);

    while (itr < numberOfMerges) {
      let extractedPairsObj = this.extract_pairs(splitedWordFreqObj);
      let bestPairObj = this.get_and_merge_best_pair(extractedPairsObj);
      console.log("############", itr, "###########");
      // console.log("bestPairObj", bestPairObj);
      bpeList.push(bestPairObj.mergedPair);

      splitedWordFreqObj = this.merge_splited_word(
        splitedWordFreqObj,
        bestPairObj
      );

      itr++;
    }

    return bpeList;
  }
}
