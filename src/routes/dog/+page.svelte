<script>
  import dog from "../../lib/dog.js";
  import { goto } from "$app/navigation";
  import Review from "./Review.svelte";
  import MetricGrid from "./MetricGrid.svelte";
  import { onMount } from "svelte";
  import Metric from "./Metric.svelte";
  import { get } from "svelte/store";

  export let dog_val = "";
  
  dog.subscribe((value) => {
    dog_val = value;
  });
  
  onMount(async () => {
    const response = await fetch(`http://localhost:5173/api/dog.js/${dog_val}`)
    data = await response.json();
    console.log(data);
  }) 

  </script>
<main>
  <div class="dog-showcase">
    <div class="metric-grid-container">
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
  main {
    overflow: hidden;
  }
  .dog-showcase {
    height: 225px;
    border-bottom: 4px solid rgba(83, 80, 80, 0.2);
    object-fit: contain;
    overflow: hidden;
  }
  .metric-grid-container {
    display: flex;
    margin-right: 100px;
    float: right;
    height: 225px;
    padding-top: 4px;
  }
  .left-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 175px;
    padding-bottom: 25px;
    margin-top: 5px;
    float: left;
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
