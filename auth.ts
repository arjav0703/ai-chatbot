import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { SupabaseAdapter } from "@auth/supabase-adapter"
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
 
export const authOptions = NextAuth({
  adapter: SupabaseAdapter({
    url: supabaseUrl,
    secret: supabaseKey,
  }),
  // session: {strategy: "jwt"},
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
})
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
//# TODO https://www.perplexity.ai/search/https-authjs-dev-getting-start-xfAUhKPIQnqfeJTDnzCjAA
