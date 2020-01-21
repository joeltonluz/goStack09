const express = require('express');

const app = express();

app.use(express.json());

const myProjects = [
    {
        id: 0,
        title: 'Teste',
        tasks: ['1', '2'],
    }
];

//Função MIDDLEWARE
function verifyIdExists (req, res, next) {
    const { id } = req.params;
    
    if (!myProjects[id]) {
        return res.send(`id ${id} não foi localizado, favor verificar !!`);
    };

    return next();
};

let qtdRequisicoes = 0;
app.use((req, res, next) => {
    console.log(`Quantidade de requisições: ${++qtdRequisicoes}`);

    return next();
});

app.get('/projects', (req, res) => {
    return res.json(myProjects);
});

app.post('/projects', (req, res) => {
    const { id, title, tasks = [] } = req.body;

    myProjects.push({ id, title, tasks });

    return res.json(myProjects);
});

app.put('/projects/:id', verifyIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    myProjects[id].title = title;

    return res.json(myProjects);
});

app.delete('/projects/:id', verifyIdExists, (req, res) => {
    const { id } = req.params;

    myProjects.splice(id,1);

    return res.json(myProjects);
});

app.post('/projects/:id/tasks', verifyIdExists, (req, res) => {
    const { id } = req.params;
    const { title, tasks = [] } = req.body;

    myProjects[id].title = title;
    myProjects[id].tasks = tasks;

    return res.json(myProjects);
});

app.listen(3000);