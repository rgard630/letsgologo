// lib/svgGenerator.js
const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./shapes');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: (input) => /^[a-zA-Z0-9]{1,3}$/.test(input),
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter text color (color keyword or hex code):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Select a shape:',
    choices: ['Triangle', 'Circle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter shape color (color keyword or hex code):',
  },
];

const shapeConstructors = {
  Triangle,
  Circle,
  Square,
};

const generateLogo = async () => {
  try {
    const answers = await inquirer.prompt(questions);

    const ShapeConstructor = shapeConstructors[answers.shape];
    const shape = new ShapeConstructor();
    shape.setColor(answers.shapeColor);

    const textSvg = `<text x="150" y="100" fill="${answers.textColor}" font-size="20" text-anchor="middle" alignment-baseline="middle">${answers.text}</text>`;
    const shapeSvg = shape.render();
    const logoSvg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shapeSvg}${textSvg}</svg>`;

    fs.writeFileSync('logo.svg', logoSvg);

    console.log('Generated logo.svg');
  } catch (error) {
    console.error('Error generating logo:', error);
  }
};

module.exports = generateLogo;


