const express = require('express');
const { uuid } = require('uuidv4')

const app = express();

app.use(express.json());

const projects = 
[
  {
    id: "b0d2f7e1-8ec6-43e6-85aa-38911be0deea",
    name: "Cubos Dash",
    owner: "Cubos Tecnologia",
  }
];

app.get('/projects', (request, response) => {
  const { name } = request.query;

  const projectsFiltered = name ? 
    projects.filter(project => project.name.toLowerCase().includes(name.toLowerCase())) : 
    projects;

  return response.json(projectsFiltered);
});

app.post('/projects', (request, response) => {
  const { name, owner } = request.body;

  const project = { id: uuid(), name, owner };

  projects.push(project);

  return response.status(201).json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return response.status(404).json({ error: 'Projeto não existe' });
  }

  projects.splice(projectIndex, 1);

  return response.json({ message: 'Projeto delatado com sucesso!' });
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { name, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return response.status(404).json({ error: 'Projeto não existe' });
  }

  const project = {
    id,
    name,
    owner,
  }

  projects[projectIndex] = project;

  return response.json(project);
});


app.listen(3333, () => {
  console.log('🚀 Server is running in http://localhost:3333')
});
