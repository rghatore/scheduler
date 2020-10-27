// desctructing example

const object = {
  test: 1,
  example: 2
}
const {test, example} = object;

const array = ["test", "example"];

const [first, second, third] = array;

const first = array[0];
const second = array[1];
const third = array[2];



//  is the same as
// const test = object.test;
// const example = object.example;
console.log(first);
console.log(second);
console.log(third);
