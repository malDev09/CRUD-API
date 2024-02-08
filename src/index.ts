import { createServer } from "http";
import { router } from "./router/router";

const DEFAULT_PORT = 4000
const PORT = process.env.PORT || DEFAULT_PORT

const server = createServer(router);


server.listen(PORT, () => {
  console.log(`listen port ${PORT}`)
})