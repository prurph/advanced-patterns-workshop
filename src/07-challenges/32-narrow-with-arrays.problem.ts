import { Equal, Expect } from "../helpers/type-utils";

interface Fruit {
  name: string;
  price: number;
}

// Wow this one is hard. Never would've gotten it myself.
export const wrapFruit = <const F extends readonly Fruit[]>(fruits: F) => {
  const getFruit = <N extends F[number]["name"]>(name: N) => {
    return fruits.find((fruit) => fruit.name === name) as Extract<
      F[number],
      { name: N }
    >;
  };

  return {
    getFruit,
  };
};

const fruits = wrapFruit([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);

const banana = fruits.getFruit("banana");
const apple = fruits.getFruit("apple");
// @ts-expect-error
const notAllowed = fruits.getFruit("not-allowed");

type tests = [
  Expect<Equal<typeof apple, { readonly name: "apple"; readonly price: 1 }>>,
  Expect<Equal<typeof banana, { readonly name: "banana"; readonly price: 2 }>>
];
