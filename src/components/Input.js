import { h } from 'hyperapp';
import { ALPHABET } from '../utils';

export default ({ updateInput, input }) => {
  const oninput = e => {
    const newInput = e.currentTarget.value;
    updateInput(newInput);
  };

  return (
    <div class="Input">
      <input type="text" oninput={oninput} value={input} />
      <span class="error">
        Valid characters are {Object.keys(ALPHABET).reduce((a, c) => a + c, '')}
      </span>
    </div>
  );
};
