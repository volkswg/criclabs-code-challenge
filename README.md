## Getting Started
1. Install [Docker](https://www.docker.com/)

2. Run the development server:
```bash
docker-compose up
```

3. Copy `.env.example` and rename to `.env`

4. Run database migration (make sure `criclabs-db` is running)
```bash
yarn db:migrate
```

5. Run database seeder
```bash
yarn db:seed
```

### Test User

```text
email: test@mail.com
password: password
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.