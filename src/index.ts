import "reflect-metadata";

import { createConnection } from "typeorm";
import { createApp } from "./app";


const port = 3000;

async function main() {
  await createConnection();

  const expressApp = createApp();
  expressApp.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main()
  .then(() => console.error("Server was initialized"))
  .catch((err) => console.error(err));

process.on('unhandledRejection', function (reason, p) {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});