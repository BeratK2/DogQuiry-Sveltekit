<script>
  import Header from "$lib/Header.svelte";
  import { goto } from "$app/navigation";
  import dog from "../../lib/dog.js";
  import supabase from "../../lib/db.js";

  let dog_val = "";
  
  let retrieved_ratings;
  let combo_ratings;

  let avg_size;
  let avg_energy;
  let avg_compassion;
  let avg_obedience;
  let avg_health;
  let avg_cleanliness;


  let rating = {
    "obedience": 5,
    "health": 5,
    "compassion": 5,
    "size": 5,
    "cleanliness": 5,
    "energy": 5,
    "review": ""
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

      retrieved_ratings = ratings;
      console.log(retrieved_ratings)
    }
    catch(e){
      console.error(e)
    }
  }

  //Method to get all average ratings and assign it to corresponding variables
  const getAllMetrics = async () => {
    try {
      let { data: metrics, error } = await supabase
        .from("dogs")
        .select(
          "avg_size, avg_obedience, avg_compassion, avg_health, avg_cleanliness, avg_energy"
        )
        .eq("Breed", dog_val);
      metrics = metrics;
      avg_size = metrics[0].avg_size;
      avg_energy = metrics[0].avg_energy;
      avg_cleanliness = metrics[0].avg_cleanliness;
      avg_compassion = metrics[0].avg_compassion;
      avg_health = metrics[0].avg_health;
      avg_obedience = metrics[0].avg_obedience;
    } catch (e) {
      console.error(e);
    }
  }


  //Method to combine new JSON object(rating) to JSON array(retrieved_ratings)
  const combineRatings = () => {
    combo_ratings = retrieved_ratings[0].rating
    combo_ratings.push(rating)
    console.log(combo_ratings)
  }  

  getAllUserRatings();
  getAllMetrics();
  //combineRatings();

</script>

<main>
  <Header />
  <section>
    <h2>Rate this breed's OBEDIENCE from 1-10</h2>
    <input bind:value={rating.obedience} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate this breed's HEALTH from 1-10</h2>
    <input bind:value={rating.health} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate this breed's COMPASSION from 1-10</h2>
    <input bind:value={rating.compassion} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate this breed's SIZE from 1-10</h2>
    <input bind:value={rating.size} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate this breed's CLEANLINESS from 1-10</h2>
    <input bind:value={rating.cleanliness} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Rate how ENERGETIC this breed is from 1-10</h2>
    <input bind:value={rating.energy} type="range" min="1" max="10" class="slider" id="myRange" />
  </section>
  <section>
    <h2>Share your experience owning this breed</h2>
    <textarea bind:value={rating.review} id="" cols="30" rows="10" />
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
