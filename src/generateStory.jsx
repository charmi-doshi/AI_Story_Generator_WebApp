import axios from 'axios';

// Function that generates the story from the Ollama API
async function generateStory(prompt) {
  const apiEndpoint = 'http://localhost:11434/api/generate';  // Ollama API endpoint

  // Request body
  const data = {
    model: 'llama2',
    prompt: `Write a short story with ${prompt}`,
    stream: false  // Set to true for real-time streaming response (optional)
  };

  try {
    // Making POST request to the Ollama API
    const response = await axios.post(apiEndpoint, data);

    // Checking if the request is successful
    if (response.status === 200) {
      return response.data.response;  // Return the generated story to be used in the frontend
    } else {
      throw new Error('Error generating story: ' + response.statusText);
    }
  } catch (error) {
    // Logging errors in case of failure
    console.error('Error with Ollama API request:', error);
    return null;  // Return null to indicate failure
  }
}

export default generateStory;



