# **Brain Agriculture - Teste Técnico**

Olá! Bem-vindo(a) ao nosso teste técnico. Estamos muito animados para conhecer mais sobre você, suas habilidades técnicas e sua forma de resolver problemas. Este teste foi pensado para ser um reflexo do que valorizamos em nosso time, e esperamos que você se sinta confortável e confiante durante o processo.

## **O que queremos avaliar?**

Nosso objetivo com este teste é entender melhor como você:

- Resolve problemas relacionados à lógica de programação e orientação a objetos.
- Interpreta requisitos de negócio e os transforma em soluções técnicas.
- Aplica boas práticas de desenvolvimento, com foco em código limpo, testável, de fácil manutenção e observável.
- Garante que o sistema seja escalável e confiável, principalmente ao lidar com grande volume de dados.
- Escreve documentações claras para facilitar a integração e manutenção por outros desenvolvedores ou clientes.

**Dica:** Imagine que você está criando uma aplicação que será utilizada por clientes, parceiros ou até mesmo por outros desenvolvedores. Queremos ver sua atenção aos detalhes!

## **O que você precisa desenvolver?**

A proposta é criar uma aplicação para gerenciar o cadastro de produtores rurais, com os seguintes dados:

- CPF ou CNPJ
- Nome do produtor
- Nome da fazenda
- Cidade
- Estado
- Área total da fazenda (em hectares)
- Área agricultável (em hectares)
- Área de vegetação (em hectares)
- Culturas plantadas (ex.: Soja, Milho, Café)

### **Requisitos de negócio**

1. Permitir o cadastro, edição e exclusão de produtores rurais.
2. Validar o CPF ou CNPJ fornecido pelo usuário.
3. Garantir que a soma das áreas agricultável e de vegetação não ultrapasse a área total da fazenda.
4. Permitir o registro de várias culturas por fazenda do produtor.
5. Exibir um dashboard com:
   - Total de fazendas cadastradas (quantidade).
   - Total de hectares registrados (área total).
   - Gráficos de pizza:
     - Por estado.
     - Por cultura plantada.
     - Por uso do solo (área agricultável e vegetação).

---

## **Tecnologias sugeridas**

Sabemos que você pode ter seu próprio estilo, mas aqui estão algumas tecnologias e boas práticas que valorizamos:

- **Conceitos**: SOLID, KISS, Clean Code, API Contracts, Testes, Arquitetura em camadas.
- **Documentações**: Para facilitar o entendimento do funcionamento do sistema, é importante incluir um README claro, uma especificação OpenAPI e, caso necessário, diagramas que ajudem a visualizar a arquitetura ou os processos.
- **Bônus**: Se conseguir disponibilizar a aplicação na nuvem e acessível via internet, será um diferencial!

### **Se você for desenvolvedor FRONTEND:**

- Utilize **TypeScript**.
- Utilize **ReactJS**.
- Use **Redux** para gerenciar o estado da aplicação.
  - Se preferir, você pode usar **Context API** como alternativa ou complemento ao Redux (opcional).
- Crie pelo menos um teste unitário por componente (opcional).
- Estruture dados "mockados" para simular cenários.

### **Se você for desenvolvedor BACKEND:**

- Utilize **TypeScript**.
- Utilize **Node.js**.
- Utilize **Docker** para distribuir a aplicação.
- Desenvolva uma **API REST**.
- Utilize **Postgres** como banco de dados.
- Crie os endpoints necessários para atender os requisitos de negócio.
- Desenvolva testes unitários e integrados.
- Estruture dados "mockados" para testes.
- Inclua logs para garantir a observabilidade do sistema, facilitando o monitoramento e a identificação de possíveis problemas.

### **Se você for desenvolvedor FULLSTACK:**

- Conclua tanto o FRONTEND quanto o BACKEND, garantindo a integração entre eles.

---

## **Como enviar seu projeto?**

Ao concluir o desenvolvimento, suba o código-fonte para um repositório no **GitHub** (ou outro provedor de sua escolha). Certifique-se de que o repositório seja público ou que possamos acessá-lo, e nos envie o link.

---

**Nota final:** Queremos que você aproveite esse desafio para mostrar suas habilidades, mas também para aprender e se divertir. Se tiver dúvidas ou precisar de alguma orientação durante o processo, estamos aqui para ajudar! Boa sorte! 🌟
