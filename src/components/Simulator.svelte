<script>
  import { onMount } from "svelte";
  import { Engine, Render, World, Bodies } from "matter-js";

  const snowball = Bodies.circle(100, 200, 40);
  const box = Bodies.rectangle(450, 50, 100, 100);
  const ground = Bodies.rectangle(400, 610, 900, 300, {
    isStatic: true,
    angle: 0.2
  });

  onMount(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: document.getElementById("PhysicsWorld"),
      engine: engine,
      options: {
        wireframes: false,
        background: "#61d5ff"
      }
    });

    World.add(engine.world, [snowball, box, ground]);

    Engine.run(engine);
    Render.run(render);
  });
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
