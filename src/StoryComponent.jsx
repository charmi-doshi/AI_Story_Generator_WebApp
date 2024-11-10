import './styles.css'
import React, { useState } from 'react';
import generateStory from './generateStory';  // Import the story generation function

function StoryComponent() {
  const [story, setStory] = useState('');  // State for generated story
  const [loading, setLoading] = useState(false);  // State for loading
  const [error, setError] = useState('');  // State for error messages
  const [prompt, setPrompt] = useState('');  // State for the user-input prompt

  // Function to handle generating the story
  const handleGenerateStory = async () => {
    setLoading(true);
    setError('');  // Reset any previous error messages

    if (prompt.trim() === '') {
      setError('Please provide a prompt!');
      setLoading(false);
      return;
    }

    const generatedStory = await generateStory(prompt);  // Call the generateStory function with the prompt

    if (generatedStory) {
      setStory(generatedStory);  // Set the generated story in the state
    } else {
      setError('Failed to generate the story');  // Handle failure case
    }

    setLoading(false);  // Reset loading state
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Fairytale Generator</h1>
        <p>Unleash your creativity and generate a fairytale with a click!</p>
      </header>

      <div className="search-bar">
      {/* Textbox to input custom prompt */}
      <input type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}  // Update the prompt state
        placeholder="Enter your story prompt here..."
       
      />

      {/* Button to trigger the story generation */}
      <button onClick={handleGenerateStory} disabled={loading}>
        <span role="img" aria-label="magic wand">🪄</span>
        {loading ? 'Generating...' : 'Generate Story'}
      </button>
      </div>

      <div >
        <div >
      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the generated story */}
      {story && (
        <div className="response-card">
          
          <h2>Generated Story</h2>
          <p>{story}</p>
        </div>
      )}
         </div>
      </div>
    </div>
  );
}

export default StoryComponent;
