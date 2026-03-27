/**
 * Indigo database seed - run: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const config = require('../config/env');

const ContentPage = require('../models/ContentPage');
const Category = require('../models/Category');
const Product = require('../models/Product');

const run = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Seeding database...');

    await ContentPage.findOneAndUpdate(
      { pageKey: 'home' },
      { pageKey: 'home', title: 'Welcome', plainTextContent: 'Welcome to Sundaram.' },
      { upsert: true }
    );
    await Category.findOneAndUpdate(
      { name: 'Main' },
      { name: 'Main', order: 1, isActive: true },
      { upsert: true }
    );
    console.log('Seed complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
