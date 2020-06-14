import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');

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

  function handleSubmit(e) {
    e.preventDefault();
    
    api.post('projects', { name, owner })
      .then(response => {
        setProjects([...projects, response.data]);
        setOwner('');
        setName('');
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="container">
      <h1>Projetos</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome do projeto"
          value={name} 
          onChange={e => setName(e.target.value)}
          required
        />

        <input 
          type="text" 
          placeholder="Criador do projeto"
          value={owner} 
          onChange={e => setOwner(e.target.value)}
          required 
        />

        <button type="submit">Adionar projeto</button>
      </form>

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