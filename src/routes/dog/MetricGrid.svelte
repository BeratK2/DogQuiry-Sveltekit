<script>
  import Metric from "./Metric.svelte";
  export let average_size;
  export let average_cleanliness;
  export let average_health;
  export let average_compassion;
  export let average_energy;
  export let average_obedience;
</script>

<div class="metric-grid">
  <Metric rating={average_obedience} metric="Obedience"/>
  <Metric rating={average_size} metric="Size"/>
  <Metric rating={average_health} metric="Health"/>
  <Metric rating={average_energy} metric="Energy"/>
  <Metric rating={average_compassion} metric="Compassion"/>
  <Metric rating={average_cleanliness} metric="Cleanliness"/>
</div>

<style>
  .metric-grid {
    display: grid;
    grid-template-columns: 55% 100%;
    row-gap: 10px;
    column-gap: 0px;
    justify-content: space-between;
    float: right;
  }
</style>
