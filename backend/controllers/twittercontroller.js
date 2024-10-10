require('dotenv').config();
const Twitter = require('twitter-lite');

// Setup Twitter client
const twitterClient = new Twitter({
  subdomain: "api", 
  consumer_key: process.env.TWITTER_API_KEY, 
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Function to send a tweet to a list of accounts
const sendTweetToUsers = async (req, res) => {
  const { twitterAccounts, message } = req.body;
  
  try {
    for (const account of twitterAccounts) {
      await twitterClient.post('statuses/update', {
        status: `@${account} ${message}`
      });
    }
    res.status(200).json({
      success: true,
      message: 'Messages sent to all Twitter accounts successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send messages',
      error: error.message
    });
  }
};

module.exports = {
  sendTweetToUsers
};
