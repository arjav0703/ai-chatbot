import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/chat" });
      }}
    >
      <Button type="submit">Sign in with Google</Button>
    </form>
  );
}
