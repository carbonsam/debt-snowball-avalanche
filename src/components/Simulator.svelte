<script>
  import { onMount } from 'svelte';
  import * as simulator from './simulator.js';

  onMount(simulator.start);
</script>

<style>
  .Simulator {
    width: 100vw;
    height: 100vh;
    background-color: #61d5ff;
  }
</style>

<div class="Simulator">
  <div id="PhysicsWorld" />
</div>
