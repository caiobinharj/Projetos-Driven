# My Tickets
Aplicação de back-end utilizada para a administração de eventos e tickets.

## Testes

### Configuração

1. Crie um arquivo `.env.test` na raiz do projeto com a seguinte estrutura:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mytickets_test?schema=public"
PORT=5000
```

2. Execute o script de setup para criar as tabelas no banco de testes:
```bash
npm run test:setup
```

### Executando os Testes

- Executar todos os testes:
```bash
npm test
```

- Executar testes com relatório de cobertura:
```bash
npm run test:coverage
```

### Estrutura dos Testes

Os testes estão organizados em:
- `tests/integration/` - Testes de integração para cada recurso
- `tests/factories/` - Factories para criar dados de teste usando Faker
- `tests/setup.ts` - Configuração global dos testes (limpeza do banco, etc)

### Cobertura

O projeto está configurado para exigir pelo menos 90% de cobertura de código. Os testes cobrem todas as rotas e regras de negócio da aplicação.
