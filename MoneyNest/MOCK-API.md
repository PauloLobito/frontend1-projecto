# Mock API - MoneyNest

## O que é?

O Mock API simula uma REST API real para o projeto. Permite que o código funcione como se tivesse um backend de verdade.

## Como Usar

### Opção 1: Apenas com localStorage (já funciona)
O código já tem fallback automático:
```js
const USE_MOCK_API = false; // Uses localStorage
```

### Opção 2: json-server (API real)
1. Instalar json-server:
```bash
npm install -g json-server
```

2. Criar ficheiro `db.json` com os dados:
```json
{
  "records": [],
  "settings": {}
}
```

3. Executar o servidor:
```bash
json-server --watch db.json --port 3000
```

4. Ativar no código:
```js
const USE_MOCK_API = true;
```

## Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|----------|
| GET | `/api/records` | Listar todos os registos |
| POST | `/api/records` | Criar novo registo |
| PUT | `/api/records/:id` | Atualizar registo |
| DELETE | `/api/records/:id` | Eliminar registo |
| GET | `/api/settings` | Obter definições |
| PUT | `/api/settings` | Atualizar definições |

## Estrutura do Dados

### Record
```json
{
  "id": 1,
  "type": "income",
  "amount": 900,
  "description": "Salário",
  "category": "Salário",
  "date": "2026-04-01"
}
```

### Settings
```json
{
  "currency": "BRL",
  "language": "pt-PT",
  "theme": "dark",
  "monthlyGoals": {}
}
```

## Nota

Para o projeto académico, pode只用 o modo localStorage (fallback automático). Para mostrar como funciona uma API real, usa o json-server.