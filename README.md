# [Grupo 2] CPTM ONE

- [Link dos slides]
- [Modelo de registro de Dailies](https://docs.google.com/document/d/1sg9-XnS0XWlmYKIeP0JerL6xg7LS9sgfdZZyv98aP5c/edit?usp=sharing)

## Integrantes

- Lucas Buccini: Desenvolvimento
- Marcello Rocha: Desenvolvimento
- Mateus Milanez: Scrum Master/Desenvolvimento
- Lucas Tergilene: Desenvolvimento

# 1. Nome do Projeto: CPTM ONE

Web app informativo sobre o metro gerenciado pela CPTM.

## 2. Apresentação do Projeto

Nosso web app tem como objetivo, facilitar a vida de usuários do metro. Com a possibilidade de planejamento de rotas, compras de passagens, e diversas outras funcionalidades para melhorar a experiencia do usuário.

## 3. Gestão de Código

Este projeto utiliza as seguintes tecnologias e ferramentas:

- **Linguagens:** HTML, CSS, JS e TS
- **Framework:** Bootstrap
- **Versionamento de código:** Git

### Padrão para nomes de branches

- pagina/: Usado para criar pagina.
  
- feature/nome-da-feature: novas funcionalidades

- bugfix/nome-do-bug: correções de bugs

- hotfix/nome-do-hotfix: correções críticas diretamente em produção



### Tipos de Commits


- feat: nova funcionalidade

- fix: correção em geral

- chore: tarefas de configuração, dependências, etc

- refactor: melhorias de código sem mudar funcionalidade

- docs: mudanças no README ou documentação

- style: mudanças de estilo (espaçamento, identação, etc)

- test: adição ou correção de testes

### 4. Organização de Pastas e Arquivos

- **/frontend**: Contém todas os codigos feitos no frontend
  - **/src**: Contém o código fonte do projeto.
    - **/pages**: Arquivos HTML.
    - **/css**: Folhas de estilo CSS.
    - **/js**: Arquivos JS.
    - **/img**: Imagens.
    

- **/src**: Contém o código fonte do projeto.
  - **/services**: Aqui é a pasta onde vai ficar as funções criadas, em ts.
  - **app.ts**: Arquivo principal da nosa api, que fará o acesso com base nas funções utilizadas
  - **/data**: Pasta onde vão ficar os bancos de dados.

- **/testes**: Arquivos de teste.
  - **/copiaJS**: pasta onde fica a copia dos arquivos que serão testados
  - **/testeJS**: pasta onde fica os arquivos de teste


- **package.json**
- **package-lock.json**
- **README.md**
- **tsconfig.json**
- **Retrospectiva.md**
- **Abertura_sprint.md**


### 5. Requisitos Funcionais(backlog)

1. **Calculo de rotas:** Usuários podem calcular a melhor rota para chegar no destino.
2. **Compra de passagem:** Usuários podem comprar passagens pelo app.
3. **Visualização de mapa:** Visualização do mapa das linhas de metro, com localização em tempo real.
4. **Ampla gama de compatibilidade** Visualização do programa em varios dispositivos ( diferentes modelos de celulares )
5. **Visualização do histórico** Visualização do historico de compras.
6. **Histórico de uso de tickets e pagamentos feitos** Historico de uso e transferencia (dinheiro e passagens)


### 6. Documentação API

-Base URL de Login:
https://api.exemplo.com/login/verificacao  
Endpoint:POST (Precisa de um envio de body, para comparar o cadastro e fazer autenticação, alem de proteger os dados do usuario)

-Descrição:
Faz a verificação de usuarios, com base na existência na base de dados
Recebe os campos do formulario de login, pre configurados como body no js da pagina, nesse caso seria email e senha.
Recebe também o banco de dados de usuarios, para fazer a comparação
Retorna uma resposta em json, com o success, sendo true ou false e as mensagens pra cada condição

-Parâmetros:
| Campo  | Tipo   | Obrigatório | Descrição              |
|--------|--------|-------------|------------------------|
| email  | string | Sim         | Email do usuário       |
| senha  | string | Sim         | Senha do usuário       |

-Erros: 

| Código | Tipo de Erro           | Descrição                                     |
|--------|------------------------|-----------------------------------------------|
| 200    | OK                     | Requisição bem-sucedida                       |
| 400    | Bad Request            | Requisição malformada ou dados inválidos      |
| 401    | Unauthorized           | Email ou senha invalidos                      |
| 500    | Internal Server Error  | Erro inesperado no servidor                   |




---------------

-Base URL de cadastro:
https://api.exemplo.com/login/cadastro
Endpoint: POST

-Descrição:
Recebe os campos descritos abaixo em parametros, e faz a comparação se os dados são validos, e se o email já não está cadastrado.
Caso as condições sejam atendidas, o endpoint retorna a mensagem de sucesso na rota 201, e faz a atualização do banco de dados, cadastrando o novo usuario.


-Parâmetros:
| Campo     | Tipo   | Obrigatório | Descrição                     |
|-----------|--------|-------------|-------------------------------|
| nome      | string | Sim         | Nome do usuário               |
| sobrenome | string | Sim         | Sobrenome do usuário          |
| email     | string | Sim         | Email do usuário              |
| senha     | string | Sim         | Senha do usuário              |
| telefone  | string | Não         | Telefone para contato         |

-Erros: 

| Código | Tipo de Erro           | Descrição                                     |
|--------|------------------------|-----------------------------------------------|
| 200    | OK                     | Requisição bem-sucedida                       |
| 400    | Bad Request            | Requisição malformada ou dados inválidos      |
| 409    | Conflict               | Conflito de dados (ex: email já cadastrado)   |
| 500    | Internal Server Error  | Erro inesperado no servidor                   |


##  7. Daily's

### 📅 Data: `09/05/2025`

---

### 👤 Mateus
- ✅ O que fiz ontem:
  - Reajustei pagina de login.
- 🚧 O que vou fazer hoje:
  - Iniciar teste pagina de perfil.
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Marcelo
- ✅ O que fiz ontem:
  - Rotulei tipos de branch, commits, pastas.
- 🚧 O que vou fazer hoje:
  - Inciar teste de senhas.
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Lucas B
- ✅ O que fiz ontem:
  - Reorganizai as pastas.
- 🚧 O que vou fazer hoje:
  - Iniciar API de login dos usuarios.
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Lucas T
- ✅ O que fiz ontem:
  - Reajustei pagina de pagamento.
- 🚧 O que vou fazer hoje:
  - Inciar teste de verificação email.
- ⚠️ Impedimentos:
  - nenhum.

---

### 📅 Data: `11/05/2025`

---

### 👤 Mateus
- ✅ O que fiz ontem:
  - Teste pagina perfil e terminei de reajustar pagiina home
- 🚧 O que vou fazer hoje:
  - Arrumar readme, aumentar teste de perfil
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Marcelo
- ✅ O que fiz ontem:
  - Teste de senhas
- 🚧 O que vou fazer hoje:
  - Arrumar conflito do merge
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Lucas B
- ✅ O que fiz ontem:
  - Fiz API de cadastro e login
- 🚧 O que vou fazer hoje:
  - Teste do carrossel
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Lucas T
- ✅ O que fiz ontem:
  - Teste de verificação de email
- 🚧 O que vou fazer hoje:
  - Apagar arquivos copias sem necessidade(otimização)
- ⚠️ Impedimentos:
  - informação dos integrantes, quais podem apagar

---

### 📅 Data: `12/05/2025`

---

### 👤 Mateus
- ✅ O que fiz ontem:
  - Teste de perfil aprimorada
- 🚧 O que vou fazer hoje:
  - Documentação e organização das funcinalidades
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Marcelo
- ✅ O que fiz ontem:
  - Arrumei o conflito
- 🚧 O que vou fazer hoje:
  - melhorar documentação e verificar documentação de entrega
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Lucas B
- ✅ O que fiz ontem:
  - Teste de carrossel.
- 🚧 O que vou fazer hoje:
  - Melhorar API e fazer API/pagina de cadastro.
- ⚠️ Impedimentos:
  - nenhum.

---

### 👤 Lucas T
- ✅ O que fiz ontem:
  - Apagar arquivos nao usados
- 🚧 O que vou fazer hoje:
  - Melhorar o teste de email.
- ⚠️ Impedimentos:
  - nenhum.

---


