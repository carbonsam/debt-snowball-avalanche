<script>
  import Simulator from './components/Simulator.svelte';
</script>

<style>
  .App {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    max-height: 100%;
    max-width: 100%;

    background-color: #f5f7f8;
  }
</style>

<div class="App">
  <!-- <h1>Debt Snowball Avalanche</h1> -->
  <svelte:component this={Simulator} />
</div>
