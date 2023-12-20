# Feedback Backend
This repo contains the source code for the backend of the [Feedback App](https://github.com/utkarsh1311/feedback-app). The backend is built using following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation for local development

To get started with the project, perform the following steps:

1. Clone the repo

```bash
git clone git@github.com:utkarsh1311/feedback-app.git # using SSH 
```

2. Install dependencies

```bash
cd feedback-backend
npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database-name>?schema=public"
JWT_SECRET="<secret>"
PORT=<port>
```

4. Run the migrations

```bash
npx prisma migrate dev --name init
```

5. Run the development server

```bash
npm run dev
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any suggestions.

## License

[MIT](https://choosealicense.com/licenses/mit/)
