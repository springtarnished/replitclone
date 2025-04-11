interface Props {
    output: string;
    language: 'python' | 'html';
  }
  
  const OutputPane = ({ output, language }: Props) => {
    if (language === 'html') {
      return (
        <iframe
          title="output"
          srcDoc={output}
          className="w-full h-64 border mt-4"
        />
      );
    }
  
    return (
      <pre className="w-full h-64 border mt-4 bg-black text-white p-2 overflow-auto">
        {output}
      </pre>
    );
  };
  
  export default OutputPane;