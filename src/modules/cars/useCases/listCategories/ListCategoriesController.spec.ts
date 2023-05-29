import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { postgresDataSource } from "@shared/infra/typeorm";

describe("List Categories Controller", () => {
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

  it("should be able to list all categories", async () => {
    const sessionResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin001",
    });

    const { token } = sessionResponse.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category supertest description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const categoriesResponse = await request(app).get("/categories");

    const categories = Array(categoriesResponse.text);

    expect(categoriesResponse.status).toBe(200);
    expect(categories).toHaveLength(1);
  });
});
