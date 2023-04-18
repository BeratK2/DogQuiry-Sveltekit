<script>
  import Metric from "./Metric.svelte";
  export let size;
  export let cleanliness;
  export let health;
  export let compassion;
  export let energy;
  export let obedience;
</script>

<div class="metric-grid">
  <Metric rating={obedience} metric="Obedience"/>
  <Metric rating={size} metric="Size"/>
  <Metric rating={health} metric="Health"/>
  <Metric rating={energy} metric="Energy"/>
  <Metric rating={compassion} metric="Compassion"/>
  <Metric rating={cleanliness} metric="Cleanliness"/>
</div>

<style>
  .metric-grid {
    display: grid;
    grid-template-columns: 55% 55%;
    row-gap: 10px;
    column-gap: 40px;
    justify-content: space-between;
    float: left;
  }
</style>
