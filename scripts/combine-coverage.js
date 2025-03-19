#!/usr/bin/env node

/**
 * This script combines coverage reports from Jest and Cypress tests
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure the .nyc_output directory exists
if (!fs.existsSync('.nyc_output')) {
  fs.mkdirSync('.nyc_output');
}

// Ensure the public/badges directory exists
if (!fs.existsSync('public/badges')) {
  fs.mkdirSync('public/badges', { recursive: true });
}

// Copy the Jest coverage to .nyc_output
try {
  console.log('Copying Jest coverage data...');
  
  if (fs.existsSync('coverage/jest/coverage-final.json')) {
    fs.copyFileSync(
      'coverage/jest/coverage-final.json',
      '.nyc_output/jest-coverage.json'
    );
  } else {
    console.warn('No Jest coverage file found. Running tests without Jest coverage.');
  }
} catch (error) {
  console.error('Error copying Jest coverage:', error);
}

// Copy the Cypress coverage to .nyc_output
try {
  console.log('Copying Cypress coverage data...');
  
  if (fs.existsSync('coverage/cypress/coverage-final.json')) {
    fs.copyFileSync(
      'coverage/cypress/coverage-final.json',
      '.nyc_output/cypress-coverage.json'
    );
  } else {
    console.warn('No Cypress coverage file found. Running report without Cypress coverage.');
  }
} catch (error) {
  console.error('Error copying Cypress coverage:', error);
}

// Generate the combined report
try {
  console.log('Generating combined coverage report...');
  execSync('nyc report --reporter=html --reporter=lcov --reporter=text-summary --reporter=json-summary', { 
    stdio: 'inherit'
  });
  
  // Copy the json-summary to a location that jest-coverage-badges can use
  if (fs.existsSync('coverage/combined/coverage-summary.json')) {
    fs.copyFileSync(
      'coverage/combined/coverage-summary.json',
      'coverage/coverage-summary.json'
    );
  }
  
  console.log('✅ Combined coverage report generated successfully in coverage/combined');
  
  // Generate badges from the coverage report
  try {
    console.log('Generating coverage badges...');
    execSync('npm run coverage:badges', { stdio: 'inherit' });
    console.log('✅ Coverage badges generated successfully in public/badges');
  } catch (badgeError) {
    console.error('Error generating coverage badges:', badgeError);
  }
} catch (error) {
  console.error('Error generating combined report:', error);
  process.exit(1);
} 