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

window.decomp = decomp;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

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
let debtFreeDude;

const setup = () => {
  debtPayoffCalendar = debtPayoff();

  landscape = LandscapeFactory(debtPayoffCalendar);
  hill = landscape.hill;
  markers = landscape.markers;
  milestones = landscape.milestones;

  debtFreeDude = Bodies.rectangle(
    milestones[milestones.length - 1].x + 500,
    milestones[milestones.length - 1].y - 50,
    300,
    319,
    {
      isStatic: true,
      collisionFilter: false,
      render: { sprite: { texture: './images/debt_free.png' } }
    }
  );
};

const resizeCanvas = () => {
  const canvas = document.querySelector('canvas');
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
};

const getTotalDebtPaidOff = () => {
  let debtPaidOff = 0;

  for (let i = 0; i < currentMonthIndex; i++) {
    debtPaidOff += debtPayoffCalendar[i].currentExtraPayment;
  }

  return debtPaidOff;
};

const drawText = (text, x, y) => {
  const canvas = document.querySelector('canvas').getContext('2d');
  canvas.font = '18px sans-serif';
  canvas.fillStyle = 'black';
  canvas.fillText(text, x, y);
};

export const start = () => {
  setup();

  const vertices = Vertices.create([
    { x: 0, y: 0 },
    { x: windowWidth, y: windowHeight }
  ]);
  const bounds = Bounds.create(vertices);
  const engine = Engine.create();
  const render = Render.create({
    bounds,
    element: document.getElementById('PhysicsWorld'),
    engine,
    options: {
      hasBounds: true,
      width: windowWidth,
      height: windowHeight,
      wireframes: false,
      background: '#61d5ff'
    }
  });

  const followSnowball = () => {
    render.bounds.min.x = snowball.bounds.min.x - 200;
    render.bounds.min.y = snowball.bounds.min.y - 200;
    render.bounds.max.x = snowball.bounds.min.x + windowWidth - 200;
    render.bounds.max.y = snowball.bounds.min.y + windowHeight - 200;
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

  World.add(engine.world, [...hill, ...markers, debtFreeDude, snowball]);

  Events.on(engine, 'beforeUpdate', () => {
    resizeCanvas();
    followSnowball();
    updateSimulation();
  });

  Events.on(render, 'afterRender', () => {
    drawText(
      `Current Extra Payment: $${debtPayoffCalendar[currentMonthIndex].currentExtraPayment}`,
      8,
      24
    );
    drawText(`Debt Paid Off: $${getTotalDebtPaidOff()}`, 8, 48);
    drawText(`Months: ${currentMonthIndex}`, 8, 72);
  });

  Engine.run(engine);
  Render.run(render);
};
