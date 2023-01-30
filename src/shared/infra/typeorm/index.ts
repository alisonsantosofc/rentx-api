import { DataSource } from "typeorm";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "postgresdb",
  database: "autorenter_db",
  entities: ["./src/modules/*/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

postgresDataSource
  .initialize()
  .then(() => {
    console.log("Postgres has been initialized!");
  })
  .catch((err) => {
    console.error("Error during postgres initialization", err);
  });
