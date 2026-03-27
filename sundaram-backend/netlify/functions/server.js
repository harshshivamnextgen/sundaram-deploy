const serverless = require('serverless-http');
const app = require('../../server');
const { connectDB } = require('../../server');

// Initialize DB connection for serverless environment
const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // Ensure we are connected to MongoDB before processing the request
    await connectDB();

    // Clean up paths for Express routing within Netlify Functions
    // The function is at /.netlify/functions/server
    // We want to handle routes like /products, /categories, etc.
    return await handler(event, context);
};
