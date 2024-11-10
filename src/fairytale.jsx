import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import generateStory from './generateStory';  
import './fairytale.css'

function StoryComponent() {
  const [story, setStory] = useState(''); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');  
  const [prompt, setPrompt] = useState('');  

  // Function to handle generating the story
  const handleGenerateStory = async () => {
    setLoading(true);
    setError(''); 

    if (prompt.trim() === '') {
      setError('Please provide a prompt!');
      setLoading(false);
      return;
    }

    const generatedStory = await generateStory(prompt); 

    if (generatedStory) {
       // Set the generated story in the state
      setStory(generatedStory); 
    } else {
      setError('Failed to generate the story');  
    }

    setLoading(false);  
  };

  // GSAP animation for generated story
  useEffect(() => {
    if (story) {
      gsap.fromTo('.generated-text', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1 });
    }
  }, [story]);

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
          onChange={(e) => setPrompt(e.target.value)}  
          placeholder="Enter your story prompt here..."
        />

        {/* Button to trigger the story generation */}
        <button onClick={handleGenerateStory} disabled={loading}>
          <span role="img" aria-label="magic wand">🪄</span>
          {loading ? 'Generating...' : 'Generate Story'}
        </button>
      </div>

      <div>
        {error && <p className="error">{error}</p>}

        {/* Display the generated story */}
        {story && (
          <div className="response-card">
            <h2>Generated Story</h2>
            <p className="generated-text">{story}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryComponent;
