<script>
  import Header from "$lib/Header.svelte";
  import { goto } from "$app/navigation";
  import dog from "../../lib/dog.js";
  import supabase from "../../lib/db.js";

  let dog_val = "";
  
  let retrieved_ratings;

  let avg_size = 0;
  let avg_energy = 0;
  let avg_compassion = 0;
  let avg_obedience = 0;
  let avg_health = 0;
  let avg_cleanliness = 0;

  var obedience_sum = 0;
  var size_sum = 0;
  var health_sum = 0;
  var compassion_sum = 0; 
  var energy_sum = 0;
  var cleanliness_sum = 0;

  var new_size_avg = 0;
  var new_energy_avg = 0;
  var new_compassion_avg = 0;
  var new_obedience_avg = 0;
  var new_health_avg = 0;
  var new_cleanliness_avg = 0;

  let my_rating = {
    "Size": 5,
    "Energy": 5,
    "Health": 5,
    "review": "Helloooooo",
    "Obedience": 5,
    "Cleanliness": 5,
  }

  dog.subscribe((value) => {
    dog_val = value;
  });

  
  //Method to get all user ratings and assign it to retrieved_ratings
  const getAllUserRatings = async () => {
    try{
      let {data: ratings, error} = await supabase
      .from('dogs')
      .select('rating')
      .eq("Breed", dog_val)
      
      //Combine ratings on database to submitted rating
      retrieved_ratings = ratings[0].rating;
      retrieved_ratings.push(my_rating)

      console.log(retrieved_ratings[0].Obedience)
      //Get new average ratings 
      for (var i = 0; i < retrieved_ratings.length; i++) {
        obedience_sum += Number(retrieved_ratings[i].Obedience);
        health_sum += Number(retrieved_ratings[i].Health);
        compassion_sum += Number(retrieved_ratings[i].Compassion);
        energy_sum += Number(retrieved_ratings[i].Energy);
        cleanliness_sum += Number(retrieved_ratings[i].Cleanliness);
        size_sum += Number(retrieved_ratings[i].Size);

        console.log(retrieved_ratings[i].Obedience)
      }
      
      new_obedience_avg = obedience_sum / retrieved_ratings.length
      new_health_avg = health_sum / retrieved_ratings.length
      new_compassion_avg = compassion_sum / retrieved_ratings.length
      new_energy_avg = energy_sum / retrieved_ratings.length
      new_cleanliness_avg = cleanliness_sum / retrieved_ratings.length
      new_size_avg = size_sum / retrieved_ratings.length
    }
    catch(e){
      console.error(e)
    }
  }

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
  }

  getAllAverages();
  getAllUserRatings();

</script>

<main>
  <Header />
  <section>
    <h2>Rate this breed's OBEDIENCE from 1-10</h2>
    <input bind:value={my_rating.Obedience} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate this breed's HEALTH from 1-10</h2>
    <input bind:value={my_rating.Health} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate how FRIENDLY this breed is from 1-10</h2>
    <input bind:value={my_rating.Compassion} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate this breed's SIZE from 1-10</h2>
    <input bind:value={my_rating.Size} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate how CLEAN this dog is from 1-10</h2>
    <input bind:value={my_rating.Cleanliness} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate how ENERGETIC this breed is from 1-10</h2>
    <input bind:value={my_rating.Energy} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Share your experience owning this breed</h2>
    <textarea bind:value={my_rating.review} id="" cols="30" rows="10" />
  </section>
  <section>
    <button on:click={() => goto("/dog")}>Submit Review</button>
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
