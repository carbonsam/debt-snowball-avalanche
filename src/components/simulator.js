import {
  Body,
  Bodies,
  Bounds,
  Engine,
  Events,
  Render,
  Vertices,
  World
} from 'matter-js';
import debtPayoff from '../models/debtPayoff';

let currentUpdate = 0;
let currentMonthIndex = 0;
let debtPayoffCalendar;
const snowballStartingSize = 20;
const startX = 100;
const startY = 400;
const monthHillLength = snowballStartingSize * 5;

const snowball = Bodies.circle(startX + 40, 200, snowballStartingSize, {
  render: {
    sprite: {
      texture: './images/snowball_small.png'
    }
  }
});
let hill = [];

const getSnowballScale = () => {
  const startingPayment = debtPayoffCalendar[0].currentExtraPayment;
  const finalPayment =
    debtPayoffCalendar[debtPayoffCalendar.length - 1].currentExtraPayment;
  const previousMonthPayment =
    debtPayoffCalendar[currentMonthIndex - 1].currentExtraPayment;
  const currentMonthPayment =
    debtPayoffCalendar[currentMonthIndex].currentExtraPayment;

  const currentScale =
    (currentMonthPayment - startingPayment) / (finalPayment - startingPayment) +
    1;
  const previousScale =
    (previousMonthPayment - startingPayment) /
      (finalPayment - startingPayment) +
    1;

  return currentScale - previousScale + 1;
};

const setup = () => {
  debtPayoffCalendar = debtPayoff();
  const hillSize = monthHillLength * debtPayoffCalendar.length;

  hill = Bodies.rectangle(hillSize / 2, hillSize / 2, hillSize, 50, {
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

  const followSnowball = () => {
    render.bounds.min.x = snowball.bounds.min.x - 200;
    render.bounds.min.y = snowball.bounds.min.y - 200;
    render.bounds.max.x = snowball.bounds.min.x + 600;
    render.bounds.max.y = snowball.bounds.min.y + 400;
  };

  const updateSimulation = () => {
    currentUpdate++;

    if (currentMonthIndex >= debtPayoffCalendar.length) {
      Render.stop(render);
    } else if (currentUpdate >= 60) {
      currentMonthIndex++;
      currentUpdate = 0;

      const scale = getSnowballScale();

      Body.scale(snowball, scale, scale);
      snowball.render.sprite.xScale = scale;
      snowball.render.sprite.yScale = scale;
    }
  };

  World.add(engine.world, [hill, snowball]);

  Events.on(engine, 'beforeUpdate', () => {
    followSnowball();
    updateSimulation();
  });

  Engine.run(engine);
  Render.run(render);
};
