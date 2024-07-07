
# LabChat - Real-time Chat Application - English Version
This is a chat application that allows users to exchange real-time messages with each other. To use it, you need to have an account and enter the email address of the person you wish to chat with.

## Tech Stack
#### - React 18
#### - .NET with SignalR
#### - Docker
#### - SQL Server (https://hub.docker.com/_/microsoft-azure-sql-edge)

### Features

- Authentication: Implementation of authentication using JWT, allowing user login and registration.
- Authorization: Use of RBAC (Role-Based Access Control) to grant different permissions according to different roles.
- Real-Time Connection: Use of WebSocket to enable real-time bidirectional communication between client and server.
- Chat System: Through WebSocket, real-time communication between two users is possible, allowing them to exchange messages, files, and audio.
- Notifications: Also using WebSocket, it is possible to receive real-time notifications.

### TODO
- [x]  User authentication
- [ ]  User registration screen
- [x]  Establish client WebSocket connection upon user authentication
- [x]  Enable a user to request the start of a conversation with another user
- [x]  Allow the request to be accepted or rejected
- [x]  Allow users to see the connection status of active conversations, whether they are offline or online.
- [x]  Notify users of the following events: request received, sent request rejected, sent request accepted
- [x]  Allow users to update their profile information
- [x]  Allow users to change their profile picture
- [x]  Enable users to exchange real-time messages with each other
- [ ]  Enable users to exchange files with each other
- [ ]  Enable users to exchange audio with each other
- [ ]  Develop a module for administrators to manage users and view chat history

## Usage
### Prerequisites
- Node.js (14^)
- NPM
- Docker if you want to run the project on a container (https://docs.docker.com/desktop/install/windows-install/) (https://docs.docker.com/desktop/install/linux-install/) (https://docs.docker.com/desktop/install/mac-install/)



### Installation and How to Run
#### Clone the Repository
```git
git clone https://github.com/pdrhp/LabChat
```

#### Navigate to the Project Folder
```bash
cd LabChat
```
### With docker
##### Assuming that you already have Docker installed*

#### Run the development Docker Compose in the project
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Local development

#### Install dependencies
```bash
npm install
```

### Run the application
```bash
npm run dev
```


## Versão em Português

Esta é uma aplicação de chat que permite aos usuários trocarem mensagens em tempo real entre si. Para utilizá-la, é necessário ter uma conta e inserir o e-mail da pessoa com quem deseja conversar.

## Tecnologias utilizadas
#### - React 18
#### - .NET with SignalR
#### - Docker
#### - SQL Server (https://hub.docker.com/_/microsoft-azure-sql-edge)

### Funcionalidades

- **Autenticação:** Implementação de autenticação utilizando JWT, permitindo login e cadastro de usuários.
- **Autorização:** Utilização de RBAC (Role-Based Access Control) para conceder diferentes permissões conforme os diferentes cargos.
- **Conexão em Tempo Real:** Utilização de WebSocket para permitir comunicação bidirecional em tempo real entre cliente e servidor.
- **Sistema de Chat:** Através de WebSocket, é possível realizar comunicação em tempo real entre dois usuários, permitindo a troca de mensagens, arquivos e áudios.
- **Notificações:** Também utilizando WebSocket, é possível receber notificações em tempo real.

### TODO
- [x]  Autenticação de usuários
- [ ]  Tela para registro de usuários
- [x]  Estabelecer conexão WebSocket do cliente após a autenticação do usuário
- [x]  Permitir que um usuário solicite o início de uma conversa com outro usuário
- [x]  Permitir que a solicitação seja aceita ou rejeitada
- [x]  Permitir que os usuários vejam o status de conexão das conversas ativas, se estão offline ou online
- [x]  Notificar os usuários sobre os seguintes eventos: solicitação recebida, solicitação enviada rejeitada, solicitação enviada aceita
- [x]  Permitir que os usuários atualizem suas informações de perfil
- [x]  Permitir que os usuários alterem sua foto de perfil
- [x]  Permitir que os usuários troquem mensagens em tempo real entre si
- [ ]  Permitir que os usuários troquem arquivos entre si
- [ ]  Permitir que os usuários troquem áudios entre si
- [ ]  Desenvolver um módulo para administradores gerenciarem usuários e visualizarem o histórico de conversas

## Uso
### Pré-requisitos
- Node.js (14^)
- NPM
- Docker se você quiser rodar o projeto em um container (https://docs.docker.com/desktop/install/windows-install/) (https://docs.docker.com/desktop/install/linux-install/) (https://docs.docker.com/desktop/install/mac-install/)


### Instalação
#### Clone o repositório
```git
git clone https://github.com/pdrhp/LabChat
```

#### Navegue até a pasta do projeto
```bash
cd LabChat
```

### With docker
##### Assumindo que você já tenha o Docker instalado*

#### Rode o Docker Compose de desenvolvimento no projeto
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Desenvolvimento Local

#### Instale as Dependências
```bash
npm install
```

### Rode a Aplicação
```bash
npm run dev
```
