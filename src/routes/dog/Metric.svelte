<script>
  import { onMount } from "svelte";

  export let rating;
  export let metric;

  let width;
  onMount(() => {
    width = (rating * 30) + 200;
  })
</script>

<main>
  <div style="width: {width}px" class="metric">
    <p>{metric}: {rating}</p>
  </div>
</main>

<style>
  .metric {
    padding-top: 0px;
    background-color: #e66464;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    height: 25px;
    font-size: 15px;
    position: relative;
  }
  p {
    color: white;
    font-weight: 500;
    margin-left: 10px;
  }
</style>
