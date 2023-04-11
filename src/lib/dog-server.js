import dog from "../../lib/dog.js";

export let dog_val = "";

dog.subscribe((value) => {
  dog_val = value;
});
