import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { SupabaseAdapter } from "@auth/supabase-adapter";
// import { MongoClient } from "mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// const client = new MongoClient(process.env.MONGODB_URI!);

// export const { handlers, auth, signIn, signOut } = NextAuth({
// adapter: MongoDBAdapter(client),
// session: { strategy: "jwt" },
// ...authConfig,
// });

// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_KEY,
  }),
  ...authConfig,
});
