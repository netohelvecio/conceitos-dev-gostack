import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects')
      .then(response => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [])

  return (
    <div className="container">
      <h1>Projetos</h1>

      <ul className="list-projects">
        {projects.map(project => (
          <li key={project.id}>
            <h3>{project.name}</h3>

            <span>{project.owner}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;