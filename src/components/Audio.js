import { h } from 'hyperapp';

const DOT_LENGTH = 50;

const ctx = new (window.AudioContext || window.webkitAudioContext)();

const reduceMorseCode = (instructions, char, index, arr) => {
  const nextCharElement = arr[index + 1] === '.' || arr[index + 1] === '-';
  const previousCharElement = arr[index - 1] === '.' || arr[index - 1] === '-';
  const elGap = {
    length: DOT_LENGTH,
    sound: false,
  };

  switch (char) {
    case '.': {
      instructions.push({
        length: DOT_LENGTH,
        sound: true,
      });

      if (nextCharElement) {
        instructions.push(elGap);
      }
    }

    case '-': {
      instructions.push({
        length: DOT_LENGTH * 2,
        sound: true,
      });

      if (nextCharElement) {
        instructions.push(elGap);
      }
    }

    case ' ': {
      if (previousCharElement && nextCharElement) {
        instructions.push({
          length: DOT_LENGTH * 3,
          sound: false,
        });
      }
    }

    case '/': {
      instructions.push({
        length: DOT_LENGTH * 7,
        sound: false,
      });
    }
  }

  return instructions;
};

const createOnPlay = morseCode => () => {
  const instructions = morseCode.split('').reduce(reduceMorseCode, []);
  instructions.push({ length: 0, sound: false });

  const now = ctx.currentTime;
  let time = now + DOT_LENGTH;
  const oscNode = ctx.createOscillator();
  const gainNode = ctx.createGain();

  instructions.forEach(instruction => {
    const { length, sound } = instruction;

    setTimeout(() => {
      gainNode.gain.value = sound ? 0.2 : 0;
    }, time - now);

    time += length;
  });

  oscNode.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscNode.start();
};

export default ({ morseCode }) => {
  const onPlay = createOnPlay(morseCode);

  return (
    <button class="play-button" onclick={onPlay}>
      Play
    </button>
  );
};
