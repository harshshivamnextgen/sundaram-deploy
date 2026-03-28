const serverless = require('serverless-http');
const app = require('../../server');
const { connectDB } = require('../../server');

// Initialize the serverless-http wrapper
const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // 1. Double check DB connection
    await connectDB();

    // 2. STRIP THE PREFIX (This was missing!)
    // Needed so that Netlify requests match your Express routes
    event.path = event.path.replace(/\.netlify\/functions\/server/, '');

    // 3. Hand over the request to Express
    return await handler(event, context);
};
