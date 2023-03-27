<script>
  import dog from "../../lib/dog.js";
  import { goto } from "$app/navigation";
  import Header from "$lib/Header.svelte";
  import Review from "./Review.svelte";
  import MetricGrid from "./MetricGrid.svelte";
  import supabase from "../../lib/db.js";
  import { onMount } from "svelte";

  let dog_val = "";
  let new_dog_val = "";

  let avg_size;
  let avg_energy;
  let avg_compassion;
  let avg_obedience;
  let avg_health;
  let avg_cleanliness;

  let metrics = {};

  dog.subscribe((value) => {
    dog_val = value;
  });

  const getAllRatings = async () => {
    try {
      let { data: dogs, error } = await supabase
        .from("dogs")
        .select(
          "avg_size, avg_obedience, avg_compassion, avg_health, avg_cleanliness, avg_energy"
        )
        .eq("Breed", dog_val);
      metrics = dogs;
      avg_size = metrics[0].avg_size;
      avg_energy = metrics[0].avg_energy;
      avg_cleanliness = metrics[0].avg_cleanliness;
      avg_compassion = metrics[0].avg_compassion;
      avg_health = metrics[0].avg_health;
      avg_obedience = metrics[0].avg_obedience;
    } catch (e) {
      console.error(e);
    }
  };

  getAllRatings();
</script>

<main>
  <Header />
  <div class="dog-showcase">
    <div class="metric-grid-container">
      <MetricGrid
        {avg_size}
        {avg_cleanliness}
        {avg_energy}
        {avg_compassion}
        {avg_obedience}
        {avg_health}
      />
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
