# Observações sobre o projeto

Projeto utilizando npm

A API está atribuída no arquivo next.config.js

Testes unitários e de integração feitos em JEST. Podem ser executados através do comando:

```
npm test
```

O app está online no link a seguir:

[Acessar App](https://teste-ferias-wm-1baa253b1825.herokuapp.com)

Aqui você pode ver um vídeo apresentando o projeto:

[Acessar Vídeo](https://1drv.ms/v/s!Arw6gFBgbC57ku5IT-J7ycbkfunxOQ)

Foi adicionada <span style="color: red;">Paginação</span>.

## Estrutura do Projeto

- pages
    - index.js (Página inicial na qual é listada os colaboradores)
    - new-collaborator.js (Página para adicionar um colaborador)
    - collaborators
        - [id].js (Página individual com um colaborador e na qual é listada os períodos)
        - new-period.js (Página para adicionar um período)
- components
    - Collaborator.js (Componente Collaborator)
    - Period.js (Componente Period)
    - Loading.js (Componente Loading)
    - tests (Testes de Integração)
- utils (Funções Úteis)
    - tests (Testes Unitários)
- lib
    - index.js (Configurações do Apollo Client)
    - queries
        - getCollaborators.js (Query para obter o colaboradores)
        - getCollaborator.js (Query para obter um colaborador)
        - addCollaborator.js (Mutation para adicionar um colaborador)
        - addPeriod.js (Mutation para adicionar um período)
        - updatePeriod.js (Mutation para atualizar um período)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
