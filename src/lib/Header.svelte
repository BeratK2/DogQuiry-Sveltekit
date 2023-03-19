<script>
  import dog from "../lib/dog";
  import { goto } from "$app/navigation";
  import supabase from "./db";

  let dog_val = "";
  let new_dog_val = "";

  let breeds = [];

  dog.subscribe((value) => {
    dog_val = value;
  });

  const getAllDogs = async () => {
    try {
      let { data, error } = await supabase.from("dogs").select("Breed");
      breeds = data;
    } catch (e) {
      console.error(e);
    }
  };

  getAllDogs();

  const handleSubmit = (e) => {
    if (e.charCode === 13) {
      console.log(dog);
      dog.set(new_dog_val);
      goto("/dog");
      location.reload();
    }
  };
</script>

<div class="header">
  <h3>DogQuiry</h3>
  <input
    list="breeds"
    on:keypress={(e) => handleSubmit(e)}
    bind:value={new_dog_val}
    placeholder="Search for a dog breed"
  />
  <datalist id="breeds">
    {#each breeds as breed}
      <option value={breed.Breed} />
    {/each}
  </datalist>
</div>

<style>
  .header {
    border-bottom: 4px solid rgba(83, 80, 80, 0.2);
    display: flex;
    justify-content: space-between;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 10px;
  }
  h3 {
    float: left;
  }
  input {
    float: right;
    height: 30px;
    margin-top: 10px;
    width: 200px;
    padding-left: 10px;
    border: 1px solid rgba(117, 117, 117, 0.5);
    border-radius: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  input:focus {
    outline: none;
    box-shadow: 0px 4px 4px rgba(255, 34, 34, 0.5);
    border: 1px solid rgba(255, 34, 34, 0.25);
  }
  input::-webkit-calendar-picker-indicator {
    display: none !important;
  }
</style>
