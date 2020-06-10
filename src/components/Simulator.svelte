<script>
  import { onMount } from "svelte";
  import * as simulator from "./simulator.js";

  onMount(simulator.start);
</script>

<style>
  .Simulator {
    width: 800px;
    height: 600px;
    background-color: #61d5ff;
  }
</style>

<div class="Simulator">
  <div id="PhysicsWorld" />
</div>
