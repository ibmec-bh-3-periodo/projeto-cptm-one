import express from 'express';
import data from "./data/usuarios.json";
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';






const dataFilePath = path.resolve(__dirname, "./data/usuarios.json");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/login/verificacao', (req, res) => {
    const { email, senha } = req.body;

    // Leia o arquivo atualizado
    fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ success: false, message: 'Erro ao processar login' });
        }

        const usuarios = JSON.parse(fileData); // Parse dos dados do arquivo
        const usuarioEncontrado = usuarios.find((user: any) => user.email === email && user.senha === senha);

        if (usuarioEncontrado) {
            res.status(200).json({ success: true, message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ success: false, message: 'Email ou senha inválidos' });
        }
    });
});

app.post('/login/cadastro', (req, res) => {
    const { nome, email, senha, sobrenome, telefone } = req.body;

    // Leia o arquivo atualizado
    fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ success: false, message: 'Erro ao processar cadastro' });
        }

        const usuarios = JSON.parse(fileData); // Parse dos dados do arquivo
        const usuarioExistente = usuarios.find((user: any) => user.email === email);

        if (!usuarioExistente) {
            const tickets = 0; // Inicializa com um array vazio de tickets
            const novoUsuario = { nome, sobrenome, email, senha, telefone, tickets };
            const novosDados = [...usuarios, novoUsuario]; // Adiciona o novo usuário

            // Escreve os dados atualizados no arquivo
            fs.writeFile(dataFilePath, JSON.stringify(novosDados, null, 2), (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
                }
                res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso' });
            });
        } else {
            res.status(409).json({ success: false, message: 'Email já cadastrado' });
        }
    });
});


app.get('/usuario/perfil/:email', (req, res) => {
    const { email } = req.params;

    fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ success: false, message: 'Erro interno' });
        }

        const usuarios = JSON.parse(fileData);
        const usuario = usuarios.find((user:any) => user.email === email);

        if (usuario) {
            const { nome, sobrenome, email, telefone } = usuario;
            res.status(200).json({ nome, sobrenome, email, telefone });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
    });
});

app.get('/usuario/tickets/:email', (req, res) => {
    const { email } = req.params;

    fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ success: false, message: 'Erro interno' });
        }

        const usuarios = JSON.parse(fileData);
        const usuario = usuarios.find((user: any) => user.email === email);

        if (usuario) {
            res.status(200).json({ tickets: usuario.tickets });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
    });
});


app.post("/usuario/comprar-ticket", (req, res) => {
    const { email } = req.body;

    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) return res.status(500).json({ message: "Erro ao ler dados" });

        const usuarios = JSON.parse(fileData);
        const userIndex = usuarios.findIndex((u:any) => u.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        usuarios[userIndex].tickets += 1;

        fs.writeFile(dataFilePath, JSON.stringify(usuarios, null, 2), err => {
            if (err) return res.status(500).json({ message: "Erro ao salvar" });
            res.status(200).json({success: true ,message: "Ticket comprado com sucesso" });
        });
    });
});

// Rota para consumir um ticket
app.post('/usuario/usar-ticket', (req, res) => {
    const { email } = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ success: false, message: 'Erro interno' });
        }

        let usuarios = JSON.parse(fileData);
        const index = usuarios.findIndex((user:any) => user.email === email);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        if (usuarios[index].tickets > 0) {
            usuarios[index].tickets -= 1;
        } else {
            return res.status(400).json({ success: false, message: 'Sem tickets disponíveis' });
        }

        fs.writeFile(dataFilePath, JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar arquivo:', err);
                return res.status(500).json({ success: false, message: 'Erro ao atualizar dados' });
            }

            res.status(200).json({ success: true, message: 'Ticket usado com sucesso' });
        });
    });
});




// Servir arquivos estáticos (CSS, JS, etc)
app.use("/css", express.static(path.join(__dirname, "../frontend/src/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/src/js")));
app.use("/images", express.static(path.join(__dirname, "../frontend/src/images")));
app.use("/pages", express.static(path.join(__dirname, "../frontend/src/pages")));



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});