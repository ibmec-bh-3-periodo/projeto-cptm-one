import express from 'express';
import data from "./data/usuarios.json";
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';






const dataFilePath = path.resolve(__dirname, "./data/usuarios.json");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/login/verificacao', (req, res)=> {

    const { email, senha } = req.body;

    const usuarioEncontrado = data.find((user) => user.email === email && user.senha === senha);

    if (usuarioEncontrado) {
        res.status(200).json({ success: true,  message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ success: false, message: 'Email ou senha inválidos' });
    }

})

app.post('/login/cadastro', (req, res) => {
    const { nome, email, senha, sobrenome, telefone } = req.body;
    const usuarioExistente = data.find((user) => user.email === email);
    if(!usuarioExistente) {
        const novoUsuario = { nome, sobrenome, email, senha, telefone };
        fs.writeFile(dataFilePath, JSON.stringify([...data, novoUsuario], null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
            }
            res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso' });
        });
    }
    else {
        res.status(409).json({ success: false, message: 'Email já cadastrado' });
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
