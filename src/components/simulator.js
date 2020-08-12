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
import decomp from 'poly-decomp';
import debtPayoff from '../models/debtPayoff';
import getSnowballScale from './getSnowballScale';
import LandscapeFactory from '../factories/LandscapeFactory';
import { segmentHeight, segmentLength } from '../constants';

window.decomp = decomp;

let currentMonthIndex = 0;
let debtPayoffCalendar;
const snowballStartingSize = 20;
const startX = 100;
const startY = 0;

const spriteScale = 0.02;

const snowball = Bodies.circle(startX, startY, snowballStartingSize, {
  render: {
    sprite: {
      texture: './images/snowball.png',
      xScale: spriteScale,
      yScale: spriteScale
    }
  }
});
let landscape;
let hill;
let markers;
let milestones;
let finish;
let debtFreeDude;

const setup = () => {
  debtPayoffCalendar = debtPayoff();

  landscape = LandscapeFactory(debtPayoffCalendar);
  hill = landscape.hill;
  markers = landscape.markers;
  milestones = landscape.milestones;

  finish = Bodies.rectangle(
    milestones[milestones.length - 1].x + segmentLength + 500,
    milestones[milestones.length - 1].y + segmentHeight + 500,
    1000,
    1000,
    { render: { fillStyle: '#e8eced' }, isStatic: true }
  );

  debtFreeDude = Bodies.rectangle(
    milestones[milestones.length - 1].x + 500,
    milestones[milestones.length - 1].y - 50,
    300,
    319,
    {
      isStatic: true,
      collisionFilter: false,
      render: {
        sprite: {
          texture: './images/debt_free.png',
          xScale: 1,
          yScale: 1
        }
      }
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
    const nextMilestones = milestones[currentMonthIndex + 1];

    if (nextMilestones && nextMilestones.x <= snowball.bounds.min.x) {
      currentMonthIndex++;

      const scale = getSnowballScale(debtPayoffCalendar, currentMonthIndex);

      Body.scale(snowball, scale, scale);
      snowball.render.sprite.xScale *= scale;
      snowball.render.sprite.yScale *= scale;
    }
  };

  World.add(engine.world, [
    ...hill,
    finish,
    ...markers,
    debtFreeDude,
    snowball
  ]);

  Events.on(engine, 'beforeUpdate', () => {
    followSnowball();
    updateSimulation();
  });

  Engine.run(engine);
  Render.run(render);
};
