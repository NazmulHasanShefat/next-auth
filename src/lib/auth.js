import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const client = new MongoClient(process.env.DB_URL);
const db = client.db("betterAuth");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
