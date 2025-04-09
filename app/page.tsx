import SignIn from "@/components/auth/SignIn";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap bg-zinc-900 h-screen justify-center items-center">
        <div className="text-center dark">
          <h1 className="text-white text-6xl mb-12">CBSE AI</h1>
          <SignIn />
        </div>
      </div>
    </>
  );
}
