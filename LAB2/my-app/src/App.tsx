import './App.css';
import { useState } from 'react';
import { TextInput } from './components/TestInput/Textinput';
import { StatsDisplay } from './components/StatsDisplay/StatsDisplay';
import type { TextStats } from './types';

function App() {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const stats: TextStats = {
    characterCount: text.length,
    wordCount,
    readingTime: wordCount / 200,
  };

  return (
    <div className="App">
      <h1>Welcome to the Text Analyzer App!</h1>
      <p>Type some text in the input box below to see character and word counts.</p>

      <TextInput onTextChange={setText} placeholder="Start typing..." />

      <StatsDisplay stats={stats} showReadingTime />
    </div>
  );
}

export default App;

