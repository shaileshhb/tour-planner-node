const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createTourPlan = async (req, res) => {
  const { destination, fromLocation, showLocalRestaurants, showShoppingSites, howToGetThere, noOfDays } = req.body;

  if (noOfDays > 10) {
    noOfDays = 10
  }

  let prompt = `create me a detailed, day-by-day itinerary for ${noOfDays} days trip to ${destination}.`

  if (howToGetThere) {
    prompt += ` Add how to get to there from ${fromLocation} with all possible modes of transport.`
  }

  if (showLocalRestaurants) {
    prompt += ` Also add famous restaurants in that locality which are must try.`
  }

  if (showShoppingSites) {
    prompt += ` Specify any local shopping sites if any.`
  }

  try {
    // "naruto mobile wallpaper"
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 800,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({
      output: basePromptOutput
    })

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(400).json({
        error: error.response.data,
      })
    } else {
      console.log(error.message);

      res.status(400).json({
        error: error.message,
      })
    }
  }
}


module.exports = { createTourPlan }