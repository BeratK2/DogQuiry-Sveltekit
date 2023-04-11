<script>
  import Header from "$lib/Header.svelte";
  import { goto } from "$app/navigation";
  import dog from "../../lib/dog.js";
  import supabase from "../../lib/db.js";

  let dog_val = "";

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

  //Method to add JSON body to database
  const handleSubmit = async () => {
    //Get JSON body for corresponding breed
    const { data, error } = await supabase
      .from("dogs")
      .select("rating")
      .eq("Breed", dog_val);
    if (error) {
      console.error(error);
      return;
    }

    let json_array;

    //Check whether or not there is existing JSON data and append all data
    if (data[0]["rating"] === null) {
      json_array = my_rating;
    } else {
      json_array = data[0]["rating"];
      json_array.push(my_rating);
    }

    // Calculate the averages of value1, value2, and value3
    const avg_size =
      json_array.reduce((sum, obj) => sum + obj.Size, 0) / json_array.length;
    const avg_energy =
      json_array.reduce((sum, obj) => sum + obj.Energy, 0) / json_array.length;
    const avg_health =
      json_array.reduce((sum, obj) => sum + obj.Health, 0) / json_array.length;
    const avg_obedience =
      json_array.reduce((sum, obj) => sum + obj.Obedience, 0) /
      json_array.length;
    const avg_cleanliness =
      json_array.reduce((sum, obj) => sum + obj.Cleanliness, 0) /
      json_array.length;
    const avg_compassion =
      json_array.reduce((sum, obj) => sum + obj.Compassion, 0) /
      json_array.length;

    console.log(Math.round(avg_energy));

    //Update row with new array
    const { error: update_error } = await supabase
      .from("dogs")
      .update({ rating: json_array })
      .eq("Breed", dog_val);

    if (update_error) {
      console.error(update_error);
      return;
    }

    const { error: avgError } = await supabase
      .from("dogs")
      .update({
        avg_obedience: Math.round(avg_obedience),
        avg_size: Math.round(avg_size),
        avg_energy: Math.round(avg_energy),
        avg_health: Math.round(avg_health),
        avg_cleanliness: Math.round(avg_cleanliness),
        avg_compassion: Math.round(avg_compassion),
      })
      .eq("Breed", dog_val);

    if (avgError) {
      console.error(avgError);
    }

    console.log("Row updated successfully");
    goto("/dog");
  };

  
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
    <button on:click={(e) => handleSubmit(e)}>Submit Review</button>
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
