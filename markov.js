/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextword = this.words[i + 1] || null;

      if (!(word in this.chains)) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextword);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let out = [];

    for (let i = 0; i < numWords; i++) {
      out.push(key);
      let nextword = this.chains[key];
      if (!nextword) break;
      key = nextword[Math.floor(Math.random() * nextword.length)];
      if (key === null) break;
    }

    return out.join(" ");
  }
}

module.exports = { MarkovMachine };
