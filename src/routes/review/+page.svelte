<script>
  import Header from "$lib/Header.svelte";
  import { goto } from "$app/navigation";
  import dog from "../../lib/dog.js";

  let dog_val = "";
  let res;

  let my_rating = {
    Size: 5,
    Energy: 5,
    Health: 5,
    review: "",
    Obedience: 5,
    Cleanliness: 5,
    Compassion: 5,
  };

  dog.subscribe((value) => {
    dog_val = value;
  });

  const handleSubmit = async () => {
    const rating = await fetch(
      `http://localhost:5173/api/review.js?dog=${dog_val}&rating=${JSON.stringify(my_rating)}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        res = data;
      })
      .then(
        goto("/dog")
      )  
  }
  
</script>

<main>
  <Header />
  <section>
    <h2>Rate this breed's OBEDIENCE from 1-10</h2>
    <input
      bind:value={my_rating.Obedience}
      type="range"
      min="1"
      max="10"
      class="slider"
      id="myRange"
    />
  </section>
  <section>
    <h2>Rate this breed's HEALTH from 1-10</h2>
    <input
      bind:value={my_rating.Health}
      type="range"
      min="1"
      max="10"
      class="slider"
      id="myRange"
    />
  </section>
  <section>
    <h2>Rate how FRIENDLY this breed is from 1-10</h2>
    <input
      bind:value={my_rating.Compassion}
      type="range"
      min="1"
      max="10"
      class="slider"
      id="myRange"
    />
  </section>
  <section>
    <h2>Rate this breed's SIZE from 1-10</h2>
    <input
      bind:value={my_rating.Size}
      type="range"
      min="1"
      max="10"
      class="slider"
      id="myRange"
    />
  </section>
  <section>
    <h2>Rate how CLEAN this dog is from 1-10</h2>
    <input
      bind:value={my_rating.Cleanliness}
      type="range"
      min="1"
      max="10"
      class="slider"
      id="myRange"
    />
  </section>
  <section>
    <h2>Rate how ENERGETIC this breed is from 1-10</h2>
    <input
      bind:value={my_rating.Energy}
      type="range"
      min="1"
      max="10"
      class="slider"
      id="myRange"
    />
  </section>
  <section>
    <h2>Share your experience owning this breed</h2>
    <textarea bind:value={my_rating.review} id="" cols="30" rows="10" />
  </section>
  <section>
    <button on:click={() => handleSubmit()}>Submit Review</button>
  </section>
</main>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 4px solid rgba(83, 80, 80, 0.2);
    padding-top: 5px;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 25px;
  }
  h2 {
    color: rgb(90, 90, 90);
  }
  input[type="range"] {
    width: 500px;
    accent-color: #e66464;
  }
  textarea {
    height: 100px;
    width: 776px;
    border-radius: 20px;
    border: 1px solid rgba(117, 117, 117, 0.5);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
    font-family: "Courier New", Courier, monospace;
    resize: none;
  }
  textarea:focus {
    outline: none;
    box-shadow: 0px 4px 4px rgba(255, 34, 34, 0.5);
    border: 1px solid rgba(255, 34, 34, 0.25);
  }
  button {
    width: 225px;
    height: 60px;
    background: #e66464;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 0.5px solid rgba(231, 80, 80, 0.5);
    border-radius: 30px;
    color: whitesmoke;
    font-size: 20px;
    font-weight: bold;
    margin-top: 25px;
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
