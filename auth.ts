import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const client = new MongoClient(process.env.MONGODB_URI!);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
});
