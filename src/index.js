import { h, app } from 'hyperapp';
import state from './state';
import actions from './actions';
import { Input, Translator } from './components';
import './index.scss';

const view = ({ input }, { updateInput }) => {
  return (
    <div class="app">
      <h1>Morse code translator</h1>
      <Input updateInput={updateInput} input={input} />
      <Translator input={input} />
    </div>
  );
};

app(state, actions, view, document.body);
