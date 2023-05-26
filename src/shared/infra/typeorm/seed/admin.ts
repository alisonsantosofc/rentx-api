import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { postgresDataSource } from "..";

async function create() {
  const id = uuidV4();
  const hashedPassword = await hash("admin001", 8);

  await postgresDataSource
    .initialize()
    .then(async () => {
      await postgresDataSource.query(
        `INSERT INTO USERS(id, name, email, password, driver_license, admin, created_at)
          values('${id}', 'admin', 'admin@autorenter.com', '${hashedPassword}', 'driver_license', true, 'now()')
        `
      );
    })
    .catch((err) => {
      console.error("Error during postgres initialization", err);
    });
}

create().then(() => {
  console.log("Main admin created!");
  postgresDataSource.destroy();
});
