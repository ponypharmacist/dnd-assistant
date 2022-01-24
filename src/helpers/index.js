// Capitalize text filter
export const capitalize = (text = '') => text.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// Dice roller
export const rollDice = (die, times = 1, modifier = 0) => {
  let sumOfRolls = 0;
  for (let i = 1; i <= times; i += 1) {
    const currentRoll = Math.ceil(Math.random() * Math.floor(die));
    sumOfRolls += currentRoll;
    // console.log('Rolled a d' + die + ' #' + i + ' for ' + currentRoll)
  }
  return sumOfRolls + modifier;
};

// Dice expression (e.g. '2d6+2') roller. Expression is a String.
export const rollString = (expression) => {
  const times = parseInt(expression.split(/[d+]/)[0], 10);
  const die = parseInt(expression.split(/[d+]/)[1], 10) ? parseInt(expression.split(/[d+]/)[1], 10) : 1;
  const modifier = parseInt(expression.split(/[d+]/)[2], 10) ? parseInt(expression.split(/[d+]/)[2], 10) : 0;
  return rollDice(die, times, modifier);
};

// Calculate modifier filter
export const getModifier = (abilityValue) => Math.floor((abilityValue - 10) / 2);

// Decorate positive numbers with a plus
export const decoratePositive = (number) => (number > 0 ? `+${number}` : number);
// Hide 0
export const decoratePositiveSmart = (number) => {
  if (number > 0) {
    return `+${number}`;
  }
  if (number === 0) {
    return '';
  }
  return number;
};

// Flatten array to a list
export const flattenArray = (array) => array.join(', ');

// Flatten array to a list
export const flattenArrayMultiline = (array) => array.join(', \n');

export const add = (number, bonus) => number + bonus;

// Local storage
export const readLocalStorage = (localName) => JSON.parse(localStorage.getItem(localName));

export const updateLocalStorage = (data, localName) => {
  localStorage.setItem(localName, JSON.stringify(data));
};

export const clearLocalStorage = (localName) => {
  localStorage.removeItem(localName);
};
