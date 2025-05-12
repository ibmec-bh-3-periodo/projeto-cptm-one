import express from 'express';
import data from "./data/usuarios.json";
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';






const dataFilePath = path.resolve(__dirname, "dados.json");

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
