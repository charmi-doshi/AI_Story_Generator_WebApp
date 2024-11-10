import './styles.css'
import React, { useState } from 'react';
import generateStory from './generateStory';  

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

      <div >
        <div >
      
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
