const { getJson } = require('serpapi');

exports.handler = async (event) => {
  const params = {
    q: event.queryStringParameters.q,
    location: event.queryStringParameters.location
  };

  try {
    const data = await getJson(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
