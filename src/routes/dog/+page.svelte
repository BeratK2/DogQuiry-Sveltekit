<script>
  import dog from "../../lib/dog.js";
  import { goto } from "$app/navigation";
  import Review from "./Review.svelte";
  import MetricGrid from "./MetricGrid.svelte";
  import { onMount } from "svelte";
  import Metric from "./Metric.svelte";
  import { get } from "svelte/store";
  import { each } from "svelte/internal";
  import Header from "../../lib/Header.svelte";

  export let dog_val = "";

  let average_cleanliness = 10;
  let average_compassion = 10;
  let average_size;
  let average_health;
  let average_obedience;
  let average_energy;

  dog.subscribe((value) => {
    dog_val = value;
  });

  let averages;
  let ratings = [];

  //Method to get overall averages and each rating
  onMount(async () => {

    //Get overall averages
    const avg_req = await fetch(
      `http://localhost:5173/api/averages.js?dog=${dog_val}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        averages = data;
      });

      average_energy = averages[0].avg_energy;
      average_obedience = averages[0].avg_obedience;
      average_size = averages[0].avg_size;
      average_compassion = averages[0].avg_compassion;
      average_cleanliness = averages[0].avg_cleanliness;
      average_health = averages[0].avg_health;

    //Get individual ratings
    const rating_req = await fetch(
      `http://localhost:5173/api/ratings.js?dog=${dog_val}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        ratings = data;
      });

      ratings = ratings[0].rating;
});
</script>

<main>
  <div class="dog-showcase">
    <Header/>
    <div class="metric-grid-container">
      <MetricGrid
        size={average_size}
        cleanliness={average_cleanliness}
        compassion={average_compassion}
        energy={average_energy}
        health={average_health}
        obedience={average_obedience}
      />
    </div>
    <div class="left-section">
      <h1>{dog_val}</h1>
      <button on:click={() => goto("/review")}>Review This Breed</button>
    </div>
  </div>
  {#each ratings as rating}
    <Review
      review={rating.review}
      size={rating.Size}
      compassion={rating.Compassion}
      health={rating.Health}
      obedience={rating.Obedience}
      cleanliness={rating.Cleanliness}
      energy={rating.Energy}
    />
  {/each}
</main>

<style>
  main {
    overflow: hidden;
  }
  .dog-showcase {
    height: 300px;
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
