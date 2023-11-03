// lib/logoGenerator.js
const { Triangle, Circle, Square } = require('./shapes');
const fs = require('fs');

const generateLogo = (text, textColor, shapeType, shapeColor) => {
  try {
    const shape = new (eval(shapeType))();
    shape.setColor(shapeColor);

    const textSvg = `<text x="150" y="100" fill="${textColor}" font-size="20" text-anchor="middle" alignment-baseline="middle">${text}</text>`;
    const shapeSvg = shape.render();
    const logoSvg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shapeSvg}${textSvg}</svg>`;

    fs.writeFileSync('logo.svg', logoSvg);

    console.log('Generated logo.svg');
  } catch (error) {
    console.error('Error generating logo:', error);
  }
};

module.exports = generateLogo;
