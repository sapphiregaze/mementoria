# Mementoria Server

## Development Setup

### PostgreSQL

Install PostgreSQL locally, start the service, and spawn a `psql` shell.

Create a new database and user with the below queries:

```sql
-- creates a new user and db with that user as the owner
CREATE USER <username> WITH ENCRYPTED PASSWORD '<password>';
CREATE DATABASE <database_name> OWNER <username>;

-- this is required as prisma needs the create db permission to create a new migration
ALTER ROLE <username> CREATEDB;
```

The database connection string will be (save this as `DATABASE_URL` in `.env`):

```
postgresql://<username>:<password>@<ip_address>:<port>/<database_name>?schema=public
```

### Prisma

Run the below to migrate the database to the current schema and generate the prisma client:

```
pnpm dlx prisma migrate dev
```

### Environment Variables

Create a `.env` file in the root of the `server` directory, and add the below configuration for the server:

```
PORT=<port>
BETTER_AUTH_SECRET=<betterauth_secret>
BETTER_AUTH_URL=<server_url>
DATABASE_URL=<database_url>
```
