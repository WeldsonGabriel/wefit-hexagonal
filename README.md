# Wefit Hexagonal

## Estrutura do Projeto

- `src/`: Contém o código-fonte do projeto.
  - `adapters/`: Interface com o mundo externo (HTTP, CLI, etc.)
    - `controllers/`: Controladores que recebem requisições (ex: UserController.ts)
    - `routes/`: Rotas que expõem os endpoints (ex: UserRoutes.ts)
    - `mappers/`: Mapeadores para converter entidades de domínio em DTOs para resposta (ex: UserMapper.ts)
    - `validations/`: Validações específicas para adaptadores, se necessário (ex: validação de entrada nas rotas)
    - `middlewares/`: Middlewares para validação e outras funções (ex: validate.ts)
  - `core/`: Lógica de domínio (casos de uso, regras de negócio, entidades)
    - `entities/`: Entidades do domínio (ex: User.ts)
    - `useCases/`: Casos de uso específicos (ex: CreateUserUseCase.ts, FindUserUseCase.ts)
    - `services/`: Serviços de domínio reutilizáveis (ex: EmailService.ts)
    - `enums/`: Definição de enums utilizados no domínio (ex: UserType.ts, AddressRequestStatus.ts)
  - `ports/`: Definição dos contratos (interfaces) que conectam o domínio a recursos externos
    - `in/`: Interfaces de entrada (ex: ICreateUserUseCase.ts)
    - `out/`: Interfaces de saída (ex: IUserRepository.ts)
  - `infrastructures/`: Implementação concreta de recursos externos
    - `config/`: Configurações da conexão com o banco (ex: database.ts)
    - `models/`: Modelos definidos com Sequelize (ex: UserModel.ts)
    - `repositories/`: Implementações dos repositórios (ex: UserRepository.ts)
  - `app.ts`: Configuração e inicialização do servidor (Express, por exemplo)
  - `server.ts`: Ponto de entrada para a aplicação

## Lógica Principal

A aplicação segue a arquitetura hexagonal, onde a lógica de negócio é isolada das interfaces externas. A comunicação entre os componentes é feita através de interfaces, permitindo maior flexibilidade e testabilidade.

1. **Controladores**: Recebem as requisições e chamam os serviços apropriados.
2. **Serviços**: Contêm a lógica de negócio e interagem com os repositórios.
3. **Repositórios**: Responsáveis pela persistência dos dados.
4. **Modelos**: Definem a estrutura dos dados utilizados na aplicação.

## Explicação da Lógica e Relações

### Modelo User

- **Campos básicos**: `id_usuario`, `name_usuario`, `cpf`, `email`, etc.
- **Deleção Lógica**: O campo `isDeleted` permite marcar o usuário como excluído sem removê-lo fisicamente.
- **Relações**:
  - Relacionamento 1:1 com o modelo `Individual` (caso o usuário seja uma pessoa física).
  - Relacionamento 1:N com o modelo `Company` (um usuário pode ter várias empresas).

### Modelo Individual

- Representa os usuários do tipo pessoa física.
- Cada `Individual` possui um campo `userId` que referencia o `id_usuario` do `User`.
- Possui uma relação opcional com o modelo `Address` para armazenar o endereço do indivíduo.

### Modelo Company

- Representa as empresas associadas ao usuário.
- Cada `Company` tem um campo `userId` que referencia o `id_usuario` do `User`.
- Possui uma relação opcional com o modelo `Address` para armazenar o endereço da empresa.

### Modelo Address

- Armazena os dados de endereço (rua, número, bairro, cidade, estado, CEP).
- Campo `isCurrent`: Indica se o endereço é o atual (usado para manter histórico de alterações de endereço).
- **Deleção Lógica**: O campo `isDeleted` permite marcar um endereço como inativo sem removê-lo fisicamente.

### Modelo AddressRequest

- Usado para gerenciar as requisições de alteração de endereço.
- Contém os novos dados de endereço e um campo `status` que pode ser `PENDING`, `APPROVED` ou `REJECTED`.
- Está relacionado com o `User` que fez a requisição.

### Enums UserType e AddressRequestStatus

- **UserType**: Define se o usuário é `INDIVIDUAL` ou `COMPANY`.
- **AddressRequestStatus**: Indica o estado da requisição de endereço.

## Fluxo do Projeto

### Cadastro de Usuário

O usuário é cadastrado com informações básicas e, se for pessoa física, um registro em `Individual` é criado e vinculado ao usuário. Empresas podem ser associadas ao usuário conforme necessário.

### Gerenciamento de Endereços

Um endereço é criado e marcado como `isCurrent = true` para indicar que é o endereço atual. Quando o endereço for atualizado, o endereço antigo é marcado como `isCurrent = false` e um novo registro é criado. A atualização pode ser solicitada por meio de `AddressRequest`.

### Deleção Lógica

Tanto usuários quanto endereços utilizam o campo `isDeleted` para realizar a exclusão lógica, preservando os dados para histórico e auditoria.

### Requisição de Alteração de Endereço

Quando um usuário deseja alterar seu endereço, uma nova requisição é registrada em `AddressRequest` com status `PENDING` até ser aprovada, após o que o novo endereço se torna o endereço atual.

# Project Structure

```
wefit-hexagonal/
└── my-project/
    ├── src/
    │   ├── adapters/         # Interface com o mundo externo (HTTP, CLI, etc.)
    │   │   ├── controllers/  # Controladores que recebem requisições (ex: UserController.ts)
    │   │   ├── routes/       # Rotas que expõem os endpoints (ex: UserRoutes.ts)
    │   │   ├── mappers/      # Mapeadores para converter entidades de domínio em DTOs para resposta (ex: UserMapper.ts)
    │   │   ├── validations/  # Validações específicas para adaptadores, se necessário (ex: validação de entrada nas rotas)
    │   │   ├── middlewares/  # Middlewares para validação e outras funções (ex: validate.ts)
    │   │
    │   ├── core/             # Lógica de domínio (casos de uso, regras de negócio, entidades)
    │   │   ├── entities/     # Entidades do domínio (ex: User.ts)
    │   │   ├── useCases/     # Casos de uso específicos (ex: CreateUserUseCase.ts, FindUserUseCase.ts)
    │   │   ├── services/     # Serviços de domínio reutilizáveis (ex: EmailService.ts)
    │   │   └── enums/        # Definição de enums utilizados no domínio (ex: UserType.ts, AddressRequestStatus.ts)
    │   │
    │   ├── ports/            # Definição dos contratos (interfaces) que conectam o domínio a recursos externos
    │   │   ├── in/           # Interfaces de entrada (ex: ICreateUserUseCase.ts)
    │   │   └── out/          # Interfaces de saída (ex: IUserRepository.ts)
    │   │
    │   ├── infrastructures/  # Implementação concreta de recursos externos
    │   │   ├── config/       # Configurações da conexão com o banco (ex: database.ts)
    │   │   ├── models/       # Modelos definidos com Sequelize (ex: UserModel.ts)
    │   │   └── repositories/ # Implementações dos repositórios (ex: UserRepository.ts)
    │   │
    │   ├── app.ts            # Configuração e inicialização do servidor (Express, por exemplo)
    │   └── server.ts         # Ponto de entrada para a aplicação
    ├── .env                  # Variáveis de ambiente
    ├── docker-compose.yml    # Configuração dos containers (ex: MySQL)
    ├── package.json          # Dependências e scripts
    ├── tsconfig.json         # Configuração do TypeScript
```
