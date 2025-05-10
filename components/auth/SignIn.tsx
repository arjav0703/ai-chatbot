import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Motiondiv from "../motion/div";
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Motiondiv>
        <Button type="submit">
          <Image src="/google.svg" alt="google-icon" width={20} height={20} />
          Sign in with Google
        </Button>
      </Motiondiv>
    </form>
  );
}
