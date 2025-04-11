import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import Editor from './components/Editor';
import OutputPane from './components/OutputPane';
import { runCode } from './api';

const App = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<'python' | 'html'>('python');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Replit Clone</h1>
      <ProjectList setSelectedProject={setSelectedProject} />
      <select
        value={language}
        onChange={e => setLanguage(e.target.value as 'python' | 'html')}
        className="my-2 border px-2 py-1"
      >
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <Editor code={code} setCode={setCode} />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={async () => {
          const data = await runCode(code, language);
          setOutput(data.stdout || data.stderr || data.error);
        }}
      >
        Run
      </button>
      <OutputPane output={output} language={language} />
    </div>
  );
};

export default App;