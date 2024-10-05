// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


const apiKey = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey); 


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are a crop growth data generator. When given a crop type and seeding date, return the ideal growth data in JSON format I want that much output that much time it take to grow the crop may be in interval.
  
Input:
{
  "cropType": "Tomato",
  "seedingDate": "2024-10-01"
}

Output:
{
  "message": "Crop growth data retrieved successfully.",
  "growthData": [
    {"day": 1, "height": 0.5, "moisture": 50},
    {"day": 2, "height": 1.0, "moisture": 48}
  ]
}`,
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


app.post('/submit-crop-data', async (req, res) => {
  const { cropType, seedingDate } = req.body;

  
  if (!cropType || !seedingDate) {
    return res.status(400).json({ message: 'Invalid data. Please provide crop type and seeding date.' });
  }


  const chatSession = model.startChat({
    generationConfig,
    history: [], 
  });

  try {
    
    const result = await chatSession.sendMessage(JSON.stringify({ cropType, seedingDate }));
    const responseText = result.response.text();


    // console.log('Response from model:', responseText);

    
    if (!responseText.startsWith('{')) {
      console.error('Unexpected response format:', responseText);
      return res.status(500).json({ message: 'Received non-JSON response from the model.' });
    }

   
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      return res.status(500).json({ message: 'Failed to parse response from model.' });
    }

    return res.json(jsonResponse);
  } catch (error) {
    console.error('Error generating crop growth data:', error.message || error);
    return res.status(500).json({ message: 'Error generating crop growth data.', error: error.message || error });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
});
