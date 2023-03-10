<script>
  import Metric from "./Metric.svelte";
</script>

<div class="metric-grid">
  <Metric />
  <Metric />
  <Metric />
  <Metric />
  <Metric />
  <Metric />
</div>

<style>
  .metric-grid {
    display: grid;
    grid-template-columns: 100% 100%;
    position: relative;
    row-gap: 0px;
    column-gap: 20px;
    justify-content: space-around;
    float: right;
    margin-top: 10px;
    transition: cubic-bezier(0.23, 1, 0.32, 1);
  }
</style>
