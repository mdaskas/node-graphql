import "dotenv/config";
import httpServer from "./server";

const port = parseInt(process.env.PORT || "4000");

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
