import { writable } from "svelte/store";
import { browser } from "$app/environment";

const dog = writable(browser && localStorage.getItem("dog") || "LOL");
dog.subscribe((value) => browser && localStorage.setItem("dog", value))

export default dog;

