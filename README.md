Projeto de Graduação

Este repositório contém o código-fonte desenvolvido para o projeto de graduação, orientado pela professora Denilce de Almeida O. Veloso. Trata-se de um projeto full-stack, com objetivo de criar uma lista de alunos. Para a primeira versão, foi utilizada a API randomuser, para fornecer dados constantes e aleatórios para vários usuários fictícios. 
Para a segunda fase, uma API própria foi desenvolvida, a fim de conectar o banco de dados, criado e operado via MongoDB, e o frontend, previamente desenvolvido durante a primeira etapa do projeto. 
O frontend é uma aplicação mobile, desenvolvida em React Native, utilizando a ferramenta Expo Router para testes e navegação dentro do projeto, e o backend conta com uma API desenvolvida em Node.js e Express, conectando as duas frentes e sendo responsável pelas operações de CRUD. 

O projeto conta com as seguintes funcionalidades: 
* Listar alunos cadastrados no banco de dados;
* Criar novos alunos através de um formulário de informações;
* Visualizar o detalhamento de um aluno;
* Editar os dados de um aluno já existente;
* Apagar um cadastro de um aluno;
* Cadastrar endereços através da API ViaCep;


Execução do projeto:
O projeto é dividido em duas partes: Frontend e Backend. Ambas devem ser executadas simultaneamente e devem estar corretamente instaladas na máquina de teste, com as devidas dependências e em terminais distintos. 
Para isso, clone o repositório com:
    
    git clone https://github.com/aranhasd/PrjLista.git
    
E navegue até a pasta do projeto: cd PrjLista
Encontrando-se na pasta do projeto, navegue até a pasta do Backend para iniciar sua instalação: cd backend
Dentro da pasta, baixe as dependências do servidor com:  npm install
Após instalar as dependências, será necessário ter uma conta no MongoDB Atlas e substituir a string de conexão, presente no ficheiro ".env" com as informações respectivamente detalhadas na string. Com a instalação finalizada, basta iniciar o servidor com: 

    node server.js 

Assim, em outro terminal, navegue até a pasta do Frontend para sua instalação: cd frontend
Dentro da pasta, instale as dependências com: npm install 
Então, entre em seu CMD e, com ip config, descubra as informações de seu IP para configuração dos ficheiros, de forma que correspondam ao seu servidor local para execução do banco. Nas linhas "const API_URL=XXX:5000", inclua seu IP para pleno funcionamento da execução.
Feitos os devidos passos, dê inicio ao servidor Expo, para uso da aplicação Mobile com: 

    npx expo start

E escaneie o QR Code disponibilizado no terminal, ou execute pela Web para visualização.

