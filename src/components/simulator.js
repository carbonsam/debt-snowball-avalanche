import {
  Bodies,
  Bounds,
  Engine,
  Events,
  Render,
  Vertices,
  World
} from 'matter-js';
import debtPayoff from '../models/debtPayoff';

const startX = 0;
const startY = 400;
const monthHillLength = 200;

const snowball = Bodies.circle(startX + 40, 200, 40);
let hill = [];

const setup = () => {
  const debtPayoffCalendar = debtPayoff();
  const hillSize = monthHillLength * debtPayoffCalendar.length;

  hill = Bodies.rectangle(startX + hillSize / 2, startY, hillSize, 50, {
    isStatic: true,
    angle: 0.3
  });
};

export const start = () => {
  setup();

  const vertices = Vertices.create([
    { x: 0, y: 0 },
    { x: 800, y: 600 }
  ]);
  const bounds = Bounds.create(vertices);
  const engine = Engine.create();
  const render = Render.create({
    bounds,
    element: document.getElementById('PhysicsWorld'),
    engine,
    options: {
      hasBounds: true,
      width: 800,
      height: 600,
      wireframes: false,
      background: '#61d5ff'
    }
  });

  World.add(engine.world, [hill, snowball]);

  Events.on(engine, 'beforeUpdate', (event) => {
    render.bounds.min.x = snowball.bounds.min.x - 200;
    render.bounds.min.y = snowball.bounds.min.y - 200;
    render.bounds.max.x = snowball.bounds.min.x + 600;
    render.bounds.max.y = snowball.bounds.min.y + 400;
  });

  Engine.run(engine);
  Render.run(render);
};
