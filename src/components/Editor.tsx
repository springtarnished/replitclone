import React from 'react';

interface Props {
  code: string;
  setCode: (c: string) => void;
}

const Editor = ({ code, setCode }: Props) => {
  return (
    <textarea
      value={code}
      onChange={e => setCode(e.target.value)}
      className="w-full h-64 border p-2 font-mono"
      placeholder="Write your code here..."
    />
  );
};

export default Editor;
