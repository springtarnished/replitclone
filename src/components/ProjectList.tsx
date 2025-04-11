import React from 'react';

interface Props {
  setSelectedProject: (name: string) => void;
}

const ProjectList = ({ setSelectedProject }: Props) => {
  const sampleProjects = ['project1', 'project2'];

  return (
    <div className="mb-4">
      <h2 className="font-semibold">Projects</h2>
      <ul>
        {sampleProjects.map(name => (
          <li key={name}>
            <button className="text-blue-600" onClick={() => setSelectedProject(name)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;