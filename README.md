# **Brain Agriculture - Teste Técnico v2**

Olá! Bem-vindo(a) ao nosso teste técnico. Estamos muito animados para conhecer
mais sobre você, suas habilidades técnicas e sua forma de resolver problemas.
Este teste foi pensado para ser um reflexo do que valorizamos em nosso time, e
esperamos que você se sinta confortável e confiante durante o processo.

## **🚀 Quick Start**

Para começar rapidamente com o projeto:

### **Opção 1: Scripts Automáticos (Recomendado)**

```bash
# Linux/macOS
./start.sh

# Windows
start.bat
```

### **Opção 2: Comandos Manuais**

```bash
# Instalar dependências e configurar banco de dados
deno task setup

# Executar em modo desenvolvimento
deno task dev

# Ou executar tudo em uma única linha
deno task full-dev
```

### **Pré-requisitos**

- [Deno](https://deno.land/#installation) instalado
- PostgreSQL rodando
- Arquivo `.env` configurado em `api/.env` com `DATABASE_URL`

## **📋 Available Tasks**

### **Development**

- `deno task dev` - Executa o backend em modo desenvolvimento com hot reload
- `deno task start` - Executa o backend em modo produção
- `deno task full-dev` - Configura o banco e executa em modo desenvolvimento

### **Database Operations**

- `deno task db:generate` - Gera o cliente Prisma
- `deno task db:push` - Sincroniza o schema com o banco de dados
- `deno task db:migrate` - Executa migrações do banco
- `deno task db:seed` - Popula o banco com dados de exemplo
- `deno task db:studio` - Abre o Prisma Studio para visualizar dados
- `deno task db:reset` - Reseta o banco de dados
- `deno task db:deploy` - Deploy das migrações em produção

### **Code Quality**

- `deno task test` - Executa testes
- `deno task test:watch` - Executa testes em modo watch
- `deno task lint` - Verifica qualidade do código
- `deno task fmt` - Formata o código
- `deno task validate` - Executa todas as validações (fmt, lint, typecheck,
  test)

### **Build & Deploy**

- `deno task build` - Compila a aplicação
- `deno task docker:build` - Constrói a imagem Docker
- `deno task docker:run` - Executa o container Docker

### **Setup**

- `deno task setup` - Configuração inicial (generate + push + seed)

## **🌐 API Endpoints**

Após executar o backend, a API estará disponível em `http://localhost:3000`:

- `GET /` - Informações da API
- `GET /health` - Status de saúde
- `GET /producer` - Listar produtores
- `POST /producer` - Criar produtor
- `GET /producer/:id` - Buscar produtor
- `PUT /producer/:id` - Atualizar produtor
- `DELETE /producer/:id` - Deletar produtor
- `GET /farm` - Listar fazendas
- `POST /farm` - Criar fazenda
- `GET /farm/:id` - Buscar fazenda
- `PUT /farm/:id` - Atualizar fazenda
- `DELETE /farm/:id` - Deletar fazenda
- `GET /harvest` - Listar safras
- `POST /harvest` - Criar safra
- `GET /harvest/:id` - Buscar safra
- `PUT /harvest/:id` - Atualizar safra
- `DELETE /harvest/:id` - Deletar safra
- `GET /crop` - Listar culturas
- `POST /crop` - Criar cultura
- `GET /crop/:id` - Buscar cultura
- `PUT /crop/:id` - Atualizar cultura
- `DELETE /crop/:id` - Deletar cultura
- `GET /dashboard` - Dashboard com analytics

## **O que queremos avaliar?**

Nosso objetivo com este teste é entender melhor como você:

- Resolve problemas relacionados à lógica de programação e orientação a objetos.
- Interpreta requisitos de negócio e os transforma em soluções técnicas.
- Aplica boas práticas de desenvolvimento, com foco em código limpo, testável,
  de fácil manutenção e observável.
- Garante que o sistema seja escalável e confiável, principalmente ao lidar com
  grande volume de dados.
- Escreve documentações claras para facilitar a integração e manutenção por
  outros desenvolvedores ou clientes.

**Dica:** Imagine que você está criando uma aplicação que será utilizada por
clientes, parceiros ou até mesmo por outros desenvolvedores. Queremos ver sua
atenção aos detalhes!

## **O que você precisa desenvolver?**

A proposta é criar uma aplicação para gerenciar o cadastro de produtores rurais,
com os seguintes dados:

- CPF ou CNPJ
- Nome do produtor
- Nome da fazenda (propriedade)
- Cidade
- Estado
- Área total da fazenda (em hectares)
- Área agricultável (em hectares)
- Área de vegetação (em hectares)
- Safras (ex: Safra 2021, Safra 2022)
- Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café na
  Safra 2022)

### **Requisitos de negócio**

1. Permitir o cadastro, edição e exclusão de produtores rurais.
2. Validar o CPF ou CNPJ fornecido pelo usuário.
3. Garantir que a soma das áreas agricultável e de vegetação não ultrapasse a
   área total da fazenda.
4. Permitir o registro de várias culturas plantadas por fazenda do produtor.
5. Um produtor pode estar associado a 0, 1 ou mais propriedades rurais.
6. Uma propriedade rural pode ter 0, 1 ou mais culturas plantadas por safra.
7. Exibir um dashboard com:
   - Total de fazendas cadastradas (quantidade).
   - Total de hectares registrados (área total).
   - Gráficos de pizza:
     - Por estado.
     - Por cultura plantada.
     - Por uso do solo (área agricultável e vegetação).

---

## **Tecnologias sugeridas**

Sabemos que você pode ter seu próprio estilo, mas aqui estão algumas tecnologias
e boas práticas que valorizamos:

- **Conceitos**: SOLID, KISS, Clean Code, API Contracts, Testes, Arquitetura em
  camadas.
- **Documentações**: Para facilitar o entendimento do funcionamento do sistema,
  é importante incluir um README claro, uma especificação OpenAPI e, caso
  necessário, diagramas que ajudem a visualizar a arquitetura ou os processos.
- **Bônus**: Se conseguir disponibilizar a aplicação na nuvem e acessível via
  internet, será um diferencial!

### **Se você for desenvolvedor FRONTEND:**

- Utilize **TypeScript**.
- Utilize **ReactJS**.
- Use **Redux** para gerenciar o estado da aplicação.
  - Se preferir, você pode usar **Context API** como alternativa ou complemento
    ao Redux (opcional).
- Estruture dados "mockados" para simular cenários.
- Desenvolva testes unitários com **Jest** e **React Testing Library**.
- Estruture os componentes utilizando atomic design patterns.
- Utilize css in js com bibliotecas como **Styled Components** ou **Emotion**.
- Estruture o projeto como um microfrontend (opcional);

### **Se você for desenvolvedor BACKEND:**

- Desenvolva uma **API REST**.
- Utilize **Docker** para distribuir a aplicação.
- Utilize **Postgres** como banco de dados.
- Crie os endpoints necessários para atender os requisitos de negócio.
- Desenvolva testes unitários e integrados.
- Estruture dados "mockados" para testes.
- Inclua logs para garantir a observabilidade do sistema, facilitando o
  monitoramento e a identificação de possíveis problemas.
- Utilize um framework de ORM.

#### **Se você for desenvolvedor BACKEND Node:**

- Utilize **TypeScript**.
- Utilize **NestJS** ou **AdonisJS**

#### **Se você for desenvolvedor BACKEND Python:**

- Utilize **Python 3**.
- Utilize **Django**, **Flask** ou **FastAPI**.

### **Se você for desenvolvedor FULLSTACK:**

- Conclua tanto o FRONTEND quanto o BACKEND, garantindo a integração entre eles.

---

## **Como enviar seu projeto?**

Ao concluir o desenvolvimento, suba o código-fonte para um repositório no
**GitHub** (ou outro provedor de sua escolha). Certifique-se de que o
repositório seja público ou que possamos acessá-lo, e nos envie o link.

---

**Nota final:** Queremos que você aproveite esse desafio para mostrar suas
habilidades, mas também para aprender e se divertir. Se tiver dúvidas ou
precisar de alguma orientação durante o processo, estamos aqui para ajudar! Boa
sorte! 🌟
