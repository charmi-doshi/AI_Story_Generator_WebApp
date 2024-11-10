import axios from 'axios';

// Function that generates the story from the Ollama API
async function generateStory(prompt) {
  const apiEndpoint = 'http://localhost:11434/api/generate';  

  // Request body
  const data = {
    model: 'llama2',
    prompt: `Write a short story with ${prompt} in 500 words`,
    stream: false  
  };

  try {
    
    const response = await axios.post(apiEndpoint, data);

    
    if (response.status === 200) {
      return response.data.response;  
    } else {
      throw new Error('Error generating story: ' + response.statusText);
    }
  } catch (error) {
  
    console.error('Error with Ollama API request:', error);
    return null;  
  }
}

export default generateStory;



