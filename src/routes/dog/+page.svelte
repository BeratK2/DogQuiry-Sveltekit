<script>
  import Header from "$lib/Header.svelte";
  import Review from "./Review.svelte";
  import MetricGrid from "./MetricGrid.svelte";
</script>

<main>
  <Header />
  <div class="dog-showcase">
    <MetricGrid />
    <div class="left-section">
      <h1>German Shepherd</h1>
      <button>Review This Breed</button>
    </div>
  </div>
  <Review />
  <Review />
  <Review />
  <Review />
  <Review />
</main>

<style>
  .dog-showcase {
    height: 225px;
    border-bottom: 4px solid rgba(83, 80, 80, 0.2);
    padding-right: 200px;
    padding-left: 200px;
    padding-top: 10px;
    overflow-y: hidden;
    background-image: url("https://www.freewebheaders.com/wp-content/gallery/dogs/german-shepherd-dog-and-puppy-website-header.jpg");
    object-fit: contain;
  }
  .left-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 275px;
    height: 175px;
    padding-bottom: 25px;
    margin-top: 5px;
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
  button:hover{
    box-shadow: 0px 4px 4px rgba(231, 80, 80, 0.25);
    cursor: pointer;
  }
  button:focus{
    box-shadow: 0px 4px 4px rgba(231, 80, 80, 0.5);
    outline: none;
  }
</style>
