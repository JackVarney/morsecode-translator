import { h } from 'hyperapp';
import { encodeMorseCode } from '../utils';
import { Audio } from '.';

export default ({ input }) => {
  const morseCode = input
    .split('')
    .map(encodeMorseCode)
    .join(' ');

  return (
    <div class="morsecode-output">
      <span>{morseCode}</span>
      <Audio morseCode={morseCode} />
    </div>
  );
};
