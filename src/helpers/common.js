import armors from '../tables/armors';
import weapons from '../tables/weapons';

// eslint-disable-next-line arrow-body-style
export const armorsList = () => {
  return Object.keys(armors)
    .map((key) => ({
      id: key,
      title: armors[key].title,
      ac: armors[key].ac,
      type: armors[key].type,
    }));
};

// eslint-disable-next-line arrow-body-style
export const meleeList = () => {
  return Object.keys(weapons)
    .filter((key) => !weapons[key].range || weapons[key].modifiers.includes('thrown'))
    .map((key) => ({
      id: key,
      title: weapons[key].title,
      damage: weapons[key].damage,
    }));
};

// eslint-disable-next-line arrow-body-style
export const rangedList = () => {
  return Object.keys(weapons)
    .filter((key) => weapons[key].range || weapons[key].modifiers.includes('thrown'))
    .map((key) => ({
      id: key,
      title: weapons[key].title,
      damage: weapons[key].damage,
    }));
};
