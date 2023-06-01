import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { postgresDataSource } from "@shared/infra/typeorm";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    await postgresDataSource.initialize();

    await postgresDataSource.runMigrations();

    const id = uuidV4();
    const hashedPassword = await hash("admin001", 8);

    await postgresDataSource.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, admin, created_at)
        values('${id}', 'admin', 'admin@rentx.com', '${hashedPassword}', 'driver_license', true, 'now()')
      `
    );
  });

  afterAll(async () => {
    await postgresDataSource.dropDatabase();
    await postgresDataSource.destroy();
  });

  it("should be able to create a new category", async () => {
    const sessionResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin001",
    });

    const { refresh_token } = sessionResponse.body;

    const categoryResponse = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category supertest description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(categoryResponse.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const sessionResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin001",
    });

    const { refresh_token } = sessionResponse.body;

    const categoryResponse = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category supertest description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(categoryResponse.status).toBe(400);
  });
});
