/**
 * justify js file created by Tamara G. Mack on 06-May-19 for tamaramack.github.io
 */
export default function justify(sentence, length) {
  length = Number(length);
  if (typeof sentence !== 'string' || Number.isNaN(length)) {
    console.error('ERROR:: Arguments are NOT the proper datatypes');
    return '';
    // throw Error('1st Argument must be a string and 2nd Argument must be a number');
  }

  const regex = /\s+/gm;
  sentence = sentence.trim().replace(regex, ' ');
  if (sentence.length >= length) return sentence;

  const wordArray = sentence.split(regex);
  if (wordArray.length <= 1) return sentence;

  const sentenceWordLength = sentence.replace(regex, '').length;
  const fillAmount = length - sentenceWordLength;
  const gaps = sentence.match(regex).length;
  const spaceBetween = Math.floor(fillAmount / gaps);
  let remainder = fillAmount - spaceBetween * gaps;

  /* one caveat with spacing
   *  HTML autocorrects for spacing so multiple space becomes one space
   *  ** input, textarea and pre does not correct spacing
   *  For all other dom Elements, using &nbsp; in place of ' ' is a solution.
   *  Another solution is using css: `white-space: pre;`
   */
  let spaces = '';
  let i = spaceBetween;
  while (i--) spaces += ' '; // or use &nbsp;

  let justifiedSentence = wordArray[wordArray.length - 1];
  let j = gaps;
  while (j--) {
    let space = spaces;
    if (remainder > 0) {
      remainder--;
      space += ' '; // or use &nbsp;
    }
    justifiedSentence = `${wordArray[j]}${space}${justifiedSentence}`;
  }

  console.log('Justify');
  console.info(length, sentence);
  console.debug(justifiedSentence.length, justifiedSentence);

  return justifiedSentence;
}
