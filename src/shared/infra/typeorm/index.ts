import { DataSource } from "typeorm";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? "localhost" : "database",
  port: 5432,
  username: "docker",
  password: "rentx",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
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
