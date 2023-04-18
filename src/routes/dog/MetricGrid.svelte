<script>
  import Metric from "./Metric.svelte";
  export let avg_size;
  export let avg_cleanliness;
  export let avg_health;
  export let avg_compassion;
  export let avg_energy;
  export let avg_obedience;
</script>

<div class="metric-grid">
  <Metric rating={avg_obedience} metric="Obedience"/>
  <Metric rating={avg_size} metric="Size"/>
  <Metric rating={avg_health} metric="Health"/>
  <Metric rating={avg_energy} metric="Energy"/>
  <Metric rating={avg_compassion} metric="Compassion"/>
  <Metric rating={avg_cleanliness} metric="Cleanliness"/>
</div>

<style>
  .metric-grid {
    display: grid;
    grid-template-columns: 55% 100%;
    row-gap: 10px;
    column-gap: 40px;
    justify-content: space-between;
    float: right;
  }
</style>
