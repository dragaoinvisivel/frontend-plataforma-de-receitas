# Plataforma de Receitas
Esta é uma aplicação web desenvolvida com Flask que permite gerenciar cursos em vídeo, incluindo arquivos em anexo e progresso do usuário, semelhante à plataformas consolidadas (Udemy, Coursera, Skillshare...).

## Funcionalidades

- **Listagem de cursos**: Visualize todos os cursos cadastrados em uma única página, incluindo detalhes como nome, foto de capa e progresso das lições.

- **Adição de curso**: Adicione novos cursos, incluindo nome e foto de capa (opcional). As lições serão automaticamente detectadas a partir do diretório do curso.

- **Edição de curso**: Edite os detalhes de um curso existente, incluindo nome, diretório do curso e foto de capa (opcional), mantendo a lista de lições existente.

- **Exclusão de curso**: Remova cursos existentes, incluindo todas as lições associadas.

- **Listagem de lições**: Visualize todas as lições associadas a um curso específico, incluindo título, módulo, status de progresso e duração.

- **Atualização de progresso da lição**: Atualize o progresso de uma lição específica, incluindo o status de progresso (iniciado, concluído) e o tempo decorrido.

## Instalando e executando o projeto

Para instalar e executar o projeto, é necessário ter [Docker](https://www.docker.com/products/docker-desktop/) instalado em seu computador.

### 1. Instalando
Após instalar o Docker, crie um arquivo chamado ```docker-compose.yml``` em qualquer lugar do seu computador e insira o seguinte conteúdo:

```yml
name: receitas

services:
  front-end:
    container_name: front-end
    image: ghcr.io/ryanrpj/frontend-plataforma-de-receitas:latest
    ports:
      - 5050:4173
    depends_on:
      - back-end
    restart: always

  back-end:
    container_name: back-end
    image: ghcr.io/ryanrpj/backend-plataforma-de-receitas:latest
    restart: always
    ports:
      - 9823:9823
    volumes:
      - your-courses:/courses:ro
```

Na última linha do arquivo, substitua ```your-courses``` pelo diterório onde estão os seus cursos. **Todos** os cursos que você deseja adicionar na plataforma devem estar dentro desse diretório.

Tome cuidado ao inserir o seu diretório no arquivo! Certifique-se de não apagar os dois pontos (```:```) depois de ```your-courses```. Por exemplo:

- ✅ Faça isso: ```C:\Users\myuser\Downloads\courses:/courses:ro```
- ❌ Não faça isso:  ```C:\Users\myuser\Downloads\courses/courses:ro```

Não se preocupe. Caso você acidentalmente remova os dois pontos, seus arquivos **não** serão deletados ou modificados de nenhuma maneira, porém a plataforma não irá conseguir "enxergar" os cursos. Em outras palavras, você não conseguirá adicionar nada, mesmo que os arquivos existam no seu computador.

### 2. Executando
Após concluir as etapas acima, basta abrir um terminal (ou CMD no Windows) no mesmo diretório onde você criou o arquivo ```docker-compose.yml```.

Para verificar se você realmente está no mesmo diretório do arquivo, rode o seguinte comando (funciona para Windows, Linux e macOS): ```ls```

Após rodar o comando ```ls```, seu terminal irá exibir uma lista com nomes de vários arquivos. Caso você não veja o ```docker-compose.yml```, significa que você está no diretório errado. Abra o terminal no diretório correto e tente novamente.

Se você já estiver no diretório correto, basta rodar o seguinte comando (funciona para Windows, Linux e macOS): ```docker compose up -d```. Este é o único comando que você precisa para iniciar o sistema.

Caso você esteja executando o sistema pela primeira vez, o Docker irá baixar todas as dependências necessárias, e talvez este processo demore dependendo da sua velocidade de internet. Esse processo ocorre apenas uma vez, nas próximas vezes o sistema irá iniciar instantaneamente.

Quando todos os carregamentos finalizarem, o sistema terá iniciado com sucesso. Basta acessar ```http://localhost:5050``` no seu navegador para começar a utilizá-lo.