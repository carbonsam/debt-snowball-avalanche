import {
  Body,
  Bodies,
  Bounds,
  Engine,
  Events,
  Render,
  Runner,
  Vertices,
  World
} from 'matter-js';
import decomp from 'poly-decomp';
import debtPayoff from '../models/debtPayoff';
import getSnowballScale from './getSnowballScale';
import HillFactory from './HillFactory';
import MarkerFactory from './MarkerFactory';
import { segmentHeight, segmentLength } from '../constants';

window.decomp = decomp;

let currentMonthIndex = 0;
let debtPayoffCalendar;
const snowballStartingSize = 20;
const startX = 100;
const startY = 0;

let spriteScale = 0.02;

const snowball = Bodies.circle(startX, startY, snowballStartingSize, {
  render: {
    sprite: {
      texture: './images/snowball.png',
      xScale: spriteScale,
      yScale: spriteScale
    }
  }
});
let hill;
let markers;
let finish;

const setup = () => {
  debtPayoffCalendar = debtPayoff();

  hill = HillFactory(50, 300, debtPayoffCalendar);
  markers = MarkerFactory(hill.milestones);

  console.log(hill.milestones);

  finish = Bodies.rectangle(
    hill.milestones[hill.milestones.length - 1].x + segmentLength + 500,
    hill.milestones[hill.milestones.length - 1].y + segmentHeight,
    1000,
    15,
    {
      render: {
        fillStyle: 'purple'
      },
      isStatic: true
    }
  );
};

export const start = () => {
  setup();

  const vertices = Vertices.create([
    { x: 0, y: 0 },
    { x: 800, y: 600 }
  ]);
  const bounds = Bounds.create(vertices);
  const engine = Engine.create();
  let runner;
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
    const nextMonthIndex = currentMonthIndex + 1;

    if (!debtPayoffCalendar[nextMonthIndex]) {
      // Render.stop(render);
      // Runner.stop(runner);
    } else if (hill.milestones[nextMonthIndex].x <= snowball.bounds.min.x) {
      currentMonthIndex++;

      const scale = getSnowballScale(debtPayoffCalendar, currentMonthIndex);
      spriteScale *= scale;

      Body.scale(snowball, scale, scale);
      snowball.render.sprite.xScale = spriteScale;
      snowball.render.sprite.yScale = spriteScale;
    }
  };

  World.add(engine.world, [...hill.bodies, ...markers, finish, snowball]);

  Events.on(engine, 'beforeUpdate', () => {
    followSnowball();
    updateSimulation();
  });

  runner = Runner.run(engine);
  Render.run(render);
};
