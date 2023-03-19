<script>
  import Metric from "./Metric.svelte";
</script>

<div class="metric-grid">
  <Metric rating={2} metric="Obedience"/>
  <Metric rating={10} metric="Size"/>
  <Metric rating={8} metric="Health"/>
  <Metric rating={4} metric="Energy"/>
  <Metric rating={1} metric="Compassion"/>
  <Metric rating={1} metric="Cleanliness"/>
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
