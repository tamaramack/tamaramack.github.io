/**
 * justify js file created by Tamara G. Mack on 06-May-19 for tamaramack.github.io
 */
export default function justify(sentence, length) {
  if (sentence.length >= length) return sentence;
  sentence = sentence.trim();
  const regex = /\s+/gm;
  const fillAmount = length - (sentence.replace(regex, '')).length;
  const gaps = (sentence).match(regex).length;
  const wordArray = sentence.split(regex);

  const spaceBetween = Math.floor(fillAmount / gaps);
  let remainder = fillAmount - spaceBetween * gaps;

  let spaces = '';
  let i = spaceBetween;
  while (i--) spaces += ' ';

  let justifiedSentence = wordArray[wordArray.length - 1];
  let j = gaps;
  while (j--) {
    let space = spaces;
    if (remainder > 0) {
      remainder--;
      space += ' ';
    }
    justifiedSentence = `${wordArray[j]}${space}${justifiedSentence}`;
  }

  console.log('Justify');
  console.debug(length, sentence);
  console.debug(justifiedSentence.length, justifiedSentence);

  return justifiedSentence;
}
