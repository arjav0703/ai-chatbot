import SignIn from "@/components/auth/SignIn";
import { auth } from "@/auth";
import ClassSelector from "@/components/ClassSelector";
export default async function Home() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-wrap bg-zinc-900 h-screen justify-center items-center">
        <div className="text-center dark text-white">
          <h1 className="text-6xl mb-12">CBSE AI</h1>
          <SignIn />
        </div>
      </div>
    );
  return (
    <>
      <div className="flex flex-wrap bg-zinc-900 h-screen justify-center items-center">
        <div className="text-center dark text-white">
          <h1 className="text-6xl mb-12">CBSE AI</h1>
          <ClassSelector />
        </div>
      </div>
    </>
  );
}
