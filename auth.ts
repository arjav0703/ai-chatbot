import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from '@supabase/supabase-js';
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
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: SupabaseAdapter({
    url: supabaseUrl,
    secret: supabaseKey,
  }),
  secret: process.env.NEXT_AUTH_SEC
})

