<script>
  import Header from "$lib/Header.svelte";
  import { goto } from "$app/navigation";
  import dog from "../../lib/dog.js";
  import supabase from "../../lib/db.js";

  let dog_val = "";

  let retrieved_ratings;

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
  const addJSON = async () => {
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

    console.log(avg_energy);

    //Update row with new array
    const { error: update_error } = await supabase
      .from("dogs")
      .update({"rating": json_array})
      .eq("Breed", dog_val);

    if (update_error) {
      console.error(update_error);
      return;
    }

    console.log("Row updated successfully");
    goto("/dog");
  };

  //Method to get averages of all JSON body data and add it to average columns
  const addAverages = async () => {};

  //Method to get all user ratings and assign it to retrieved_ratings
  const handleSumbit = async () => {
    try {
      let { data: ratings } = await supabase
        .from("dogs")
        .select("rating")
        .eq("Breed", dog_val)
        .then();

      //Combine ratings on database to submitted rating
      retrieved_ratings = ratings[0].rating;

      if (!retrieved_ratings) {
        console.log(my_rating);
        retrieved_ratings = [my_rating];
        console.log(retrieved_ratings);
      } else {
        retrieved_ratings = retrieved_ratings.push(my_rating);
      }

      //Get new average ratings
      for (var i = 0; i < retrieved_ratings.length; i++) {
        obedience_sum += Number(retrieved_ratings[i].Obedience);
        health_sum += Number(retrieved_ratings[i].Health);
        compassion_sum += Number(retrieved_ratings[i].Compassion);
        energy_sum += Number(retrieved_ratings[i].Energy);
        cleanliness_sum += Number(retrieved_ratings[i].Cleanliness);
        size_sum += Number(retrieved_ratings[i].Size);
      }

      new_obedience_avg = obedience_sum / retrieved_ratings.length;
      new_health_avg = health_sum / retrieved_ratings.length;
      new_compassion_avg = compassion_sum / retrieved_ratings.length;
      new_energy_avg = energy_sum / retrieved_ratings.length;
      new_cleanliness_avg = cleanliness_sum / retrieved_ratings.length;
      new_size_avg = size_sum / retrieved_ratings.length;

      console.log(retrieved_ratings);
      updateAverages(
        new_cleanliness_avg,
        new_obedience_avg,
        new_compassion_avg,
        new_size_avg,
        new_energy_avg,
        new_health_avg
      );
    } catch (e) {
      console.error(e);
    }
  };

  const updateAverages = async (
    cleanliness,
    obedience,
    compassion,
    size,
    energy,
    health
  ) => {
    cleanliness = Math.round(cleanliness);
    obedience = Math.round(obedience);
    compassion = Math.round(compassion);
    size = Math.round(size);
    energy = Math.round(energy);
    health = Math.round(health);

    console.log(obedience);
    const { error } = await supabase
      .from("dogs")
      .update({
        avg_cleanliness: cleanliness,
        avg_obedience: obedience,
        avg_compassion: compassion,
        avg_size: size,
        avg_energy: energy,
        avg_health: health,
      })
      .eq("Breed", dog_val);
    if (error) {
      console.error(error);
    } else {
      console.log(dog_val);
    }
  };

  //Method to get all average ratings and assign it to corresponding variables
  const getAllAverages = async () => {
    try {
      let { data: metrics, error } = await supabase
        .from("dogs")
        .select(
          "avg_size, avg_obedience, avg_compassion, avg_health, avg_cleanliness, avg_energy"
        )
        .eq("Breed", dog_val);

      avg_size = metrics[0].avg_size;
      avg_obedience = metrics[0].avg_obedience;
      avg_compassion = metrics[0].avg_compassion;
      avg_cleanliness = metrics[0].avg_cleanliness;
      avg_health = metrics[0].avg_health;
      avg_energy = metrics[0].avg_energy;
    } catch (e) {
      console.error(e);
    }
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
    <button on:click={(e) => addJSON(e)}>Submit Review</button>
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
