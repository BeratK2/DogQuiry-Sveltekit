<script>
  import dog from "../lib/dog";
  import { goto } from "$app/navigation";
  
  export let data;
  const { breeds } = data;

  let dog_val = "";
  let new_dog_val = "";

  dog.subscribe((value) => {
    dog_val = value;
  });

  const handleSubmit = () => {
    console.log(dog);
    dog.set(new_dog_val);
    goto("/dog");
  };

</script>

<div class="index">
  <h1>DogQuiry</h1>
  <!-- svelte-ignore a11y-missing-attribute -->
  <img
    src="https://www.alltech.com/sites/default/files/2021-08/Pet%20Mobile%20Header_0.png"
  />
  <div class="form-container">
    <input
      list="breeds"
      name="breed"
      bind:value={new_dog_val}
      placeholder="Search for a dog breed"
    />
    <datalist id="breeds">
      {#each breeds as breed}
        <option value={breed.Breed} />
      {/each}
    </datalist>
    <button on:click={(e) => handleSubmit(e)}>Search This Breed</button>
  </div>
  <p>
    Find the perfect breed! 🐶🐕
  </p>
</div>

<style>
  .index {
    display: block;
    margin: 20px auto;
    text-align: center;
    height: 100%;
    overflow-y: none;
  }
  h1 {
    font-size: 70px;
  }
  img {
    width: 100%;
    height: 10%;
    object-fit: contain;
  }
  p {
    font-weight: 500;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    margin-top: 50px;
  }
  input {
    width: 650px;
    height: 59px;
    background: rgb(241, 241, 241);
    color: black;
    border: 1px solid rgba(117, 117, 117, 0.5);
    border-radius: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 20px;
    text-align: left;
    padding-top: 5px;
    padding-left: 20px;
  }
  input:focus {
    outline: none;
    box-shadow: 0px 4px 4px rgba(255, 34, 34, 0.5);
    border: 1px solid rgba(255, 34, 34, 0.25);
  }
  input::target-text {
    margin-left: 10px;
  }
  input::-webkit-calendar-picker-indicator {
    display: none !important;
  }
  button {
    width: 361.65px;
    height: 64.18px;
    margin-top: 50px;
    padding-top: 5px;
    background: #e66464;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 0.5px solid rgba(231, 80, 80, 0.5);
    border-radius: 30px;
    color: whitesmoke;
    font-size: 30px;
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
  p {
    margin-top: 50px;
  }
</style>
