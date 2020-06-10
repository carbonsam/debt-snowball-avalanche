import {
  Bodies,
  Bounds,
  Engine,
  Events,
  Render,
  Vertices,
  World,
} from "matter-js";

const snowball = Bodies.circle(100, 200, 40);
const box = Bodies.rectangle(450, 50, 100, 100);
const ground = Bodies.rectangle(400, 610, 900, 300, {
  isStatic: true,
  angle: 0.2,
});

export const start = () => {
  const vertices = Vertices.create([
    { x: 0, y: 0 },
    { x: 800, y: 600 },
  ]);
  const bounds = Bounds.create(vertices);

  const engine = Engine.create();
  const render = Render.create({
    bounds,
    element: document.getElementById("PhysicsWorld"),
    engine: engine,
    options: {
      hasBounds: true,
      width: 800,
      height: 600,
      wireframes: false,
      background: "#61d5ff",
    },
  });

  World.add(engine.world, [snowball, box, ground]);

  Events.on(engine, "beforeUpdate", (event) => {
    render.bounds.min.x = snowball.bounds.min.x - 200;
    render.bounds.min.y = snowball.bounds.min.y - 200;
    render.bounds.max.x = snowball.bounds.max.x + 600;
    render.bounds.max.y = snowball.bounds.max.y + 400;
  });

  Engine.run(engine);
  Render.run(render);
};
