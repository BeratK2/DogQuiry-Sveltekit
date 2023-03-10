<script>
  import dog from "../../lib/dog.js";
  import { goto } from "$app/navigation";
  import Header from "$lib/Header.svelte";
  import Review from "./Review.svelte";
  import MetricGrid from "./MetricGrid.svelte";

  let dog_val = "";
  let new_dog_val = "";

  dog.subscribe((value) => {
    dog_val = value;
  });

  console.log(dog_val);
</script>

<main>
  <Header />
  <div class="dog-showcase">
    <div class="metric-grid-container">
      <MetricGrid />
    </div>
    <div class="left-section">
      <h1>{dog_val}</h1>
      <button on:click={() => goto("/review")}>Review This Breed</button>
    </div>
  </div>
  <Review />
  <Review />
  <Review />
  <Review />
  <Review />
</main>

<style>
  .dog-showcase {
    height: 225px;
    border-bottom: 4px solid rgba(83, 80, 80, 0.2);
    padding-right: 5%;
    padding-left: 5%;
    padding-top: 10px;
    overflow-y: hidden;
    object-fit: contain;
  }
  .metric-grid-container {
    margin-right: 10%;
  }
  .left-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 275px;
    height: 175px;
    padding-bottom: 25px;
    margin-top: 5px;
  }
  button {
    width: 225px;
    height: 50px;
    margin-top: 25px;
    background: #e66464;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 0.5px solid rgba(231, 80, 80, 0.5);
    border-radius: 30px;
    color: whitesmoke;
    font-size: 20px;
    font-weight: bold;
  }
  button:hover {
    box-shadow: 0px 4px 4px rgba(231, 80, 80, 0.25);
    cursor: pointer;
  }
  button:focus {
    box-shadow: 0px 4px 4px rgba(231, 80, 80, 0.5);
    outline: none;
  }
</style>
