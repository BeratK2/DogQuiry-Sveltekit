<script>
  import MetricGrid from "./MetricGrid.svelte";

  let dog = "";
  export let review;
  export let cleanliness;
  export let compassion;
  export let obedience;
  export let health;
  export let size;
  export let energy;
</script>

<div class="container">
  <div class="metric-grid">
    <MetricGrid
      {cleanliness}
      {compassion}
      {energy}
      {size}
      {health}
      {obedience}
    />
  </div>

  <p>
    {review}
  </p>
</div>

<style>
  .container {
    border-bottom: 4px solid rgba(83, 80, 80, 0.2);
    display: flex;
    flex-direction: column;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 10px;
  }
  .metric-grid{
    float: right;
  }
  p{
    font-size: 20px;
  }
</style>
