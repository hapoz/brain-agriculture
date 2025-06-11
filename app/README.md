# 🌾 Brain Agriculture - Sistema de Gestão Agrícola

Sistema completo para gerenciamento de produtores rurais, fazendas e culturas
agrícolas, desenvolvido com Deno Fresh.

## 🚀 Funcionalidades

### Dashboard Principal

- **Visão Geral**: Estatísticas em tempo real do sistema
- **Métricas Principais**:
  - Total de fazendas cadastradas
  - Total de hectares registrados
  - Número de estados atendidos
  - Quantidade de culturas diferentes
- **Gráficos Interativos**:
  - Distribuição por estado (gráfico de pizza)
  - Culturas plantadas (gráfico de pizza)
  - Uso do solo - área agricultável vs vegetação (gráfico de pizza)

### Gestão de Produtores

- **Cadastro Completo**: Nome, CPF/CNPJ com validação
- **Múltiplas Fazendas**: Um produtor pode ter várias propriedades
- **Validações de Negócio**:
  - Validação de CPF/CNPJ com algoritmo oficial
  - Verificação de áreas (arable + vegetação ≤ total)
  - Formatação automática de documentos
- **CRUD Completo**: Criar, visualizar, editar e excluir produtores

### Gestão de Fazendas

- **Informações Detalhadas**:
  - Nome da fazenda, cidade, estado
  - Área total, agricultável e de vegetação
  - Relacionamento com produtor
- **Sistema de Culturas**:
  - Múltiplas culturas por fazenda
  - Registro por safra
  - Controle de hectares por cultura
- **Filtros Avançados**:
  - Filtro por estado
  - Busca por cultura
  - Estatísticas filtradas

### API REST

- **Endpoints Completos**:
  - `GET /api/producers` - Listar produtores
  - `POST /api/producers` - Criar produtor
  - `PUT /api/producers?id={id}` - Atualizar produtor
  - `DELETE /api/producers?id={id}` - Excluir produtor
  - `GET /api/dashboard` - Estatísticas do dashboard
- **Validações de API**:
  - Validação de dados obrigatórios
  - Verificação de CPF/CNPJ
  - Controle de áreas de fazenda
  - Tratamento de erros

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Deno Fresh](https://fresh.deno.dev/) - Framework web moderno
  para Deno
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: Preact (JSX)
- **Estado**: Preact Signals
- **Validação**: Algoritmos customizados para CPF/CNPJ
- **Gráficos**: SVG customizado para visualizações

## 📋 Pré-requisitos

- [Deno](https://deno.land/) versão 1.40.0 ou superior
- Navegador web moderno

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd brain-agriculture
```

### 2. Navegue para o diretório da aplicação

```bash
cd app
```

### 3. Execute a aplicação

```bash
deno task start
```

### 4. Acesse a aplicação

Abra seu navegador e acesse: `http://localhost:8000`

## 📁 Estrutura do Projeto

```
app/
├── components/           # Componentes reutilizáveis
│   ├── DashboardStats.tsx    # Estatísticas do dashboard
│   ├── FarmChart.tsx         # Componente de gráficos
│   ├── ProducerForm.tsx      # Formulário de produtores
│   └── ProducerList.tsx      # Lista de produtores
├── routes/              # Páginas da aplicação
│   ├── index.tsx        # Dashboard principal
│   ├── producers.tsx    # Gestão de produtores
│   ├── farms.tsx        # Gestão de fazendas
│   └── api/             # Endpoints da API
│       ├── producers.ts # API de produtores
│       └── dashboard.ts # API de estatísticas
├── static/              # Arquivos estáticos
├── islands/             # Componentes interativos
└── deno.json           # Configuração do Deno
```

## 🔧 Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
deno task start

# Verificar código (formatação e linting)
deno task check

# Gerar manifest
deno task manifest

# Build para produção
deno task build

# Preview da build
deno task preview

# Atualizar Fresh
deno task update
```

## 📊 API Documentation

### Endpoints de Produtores

#### GET /api/producers

Lista todos os produtores cadastrados.

**Resposta:**

```json
[
  {
    "id": "1",
    "document": "123.456.789-00",
    "name": "João Silva",
    "farms": [...]
  }
]
```

#### GET /api/producers?id={id}

Retorna um produtor específico.

#### POST /api/producers

Cria um novo produtor.

**Body:**

```json
{
  "name": "Nome do Produtor",
  "document": "123.456.789-00",
  "farms": [...]
}
```

#### PUT /api/producers?id={id}

Atualiza um produtor existente.

#### DELETE /api/producers?id={id}

Remove um produtor.

### Endpoint de Dashboard

#### GET /api/dashboard

Retorna estatísticas para o dashboard.

**Resposta:**

```json
{
  "totalFarms": 156,
  "totalHectares": 45230,
  "stateDistribution": [...],
  "cropDistribution": [...],
  "landUseDistribution": [...]
}
```

## 🎯 Validações Implementadas

### CPF/CNPJ

- Validação completa com algoritmo oficial
- Formatação automática (000.000.000-00 / 00.000.000/0000-00)
- Verificação de dígitos verificadores

### Áreas de Fazenda

- Soma das áreas agricultável e vegetação não pode ultrapassar área total
- Validação em tempo real no formulário
- Feedback visual para o usuário

### Dados Obrigatórios

- Nome do produtor
- Documento (CPF/CNPJ)
- Informações básicas da fazenda

## 🎨 Interface do Usuário

### Design System

- **Cores**: Paleta verde agrícola
- **Tipografia**: Sistema hierárquico claro
- **Componentes**: Cards, tabelas, formulários responsivos
- **Gráficos**: SVG customizado com cores temáticas

### Responsividade

- Layout adaptável para desktop, tablet e mobile
- Grid system flexível
- Navegação otimizada para diferentes dispositivos

## 🔍 Funcionalidades de Busca e Filtro

### Filtros Disponíveis

- **Por Estado**: Filtra fazendas por estado brasileiro
- **Por Cultura**: Busca fazendas que plantam determinada cultura
- **Estatísticas Dinâmicas**: Métricas atualizadas conforme filtros

### Visualizações

- **Tabela**: Lista detalhada com ações
- **Cards**: Visualização em grid
- **Gráficos**: Distribuições em pizza

## 🚀 Próximos Passos

### Melhorias Planejadas

- [ ] Integração com banco de dados PostgreSQL
- [ ] Sistema de autenticação e autorização
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Notificações em tempo real
- [ ] Mapa interativo das fazendas
- [ ] Sistema de backup automático

### Funcionalidades Avançadas

- [ ] Análise preditiva de safras
- [ ] Integração com APIs meteorológicas
- [ ] Sistema de alertas para condições climáticas
- [ ] Dashboard executivo com KPIs avançados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais
detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais oficiais da Brain
Agriculture.

---

**Desenvolvido com ❤️ para o agronegócio brasileiro**
