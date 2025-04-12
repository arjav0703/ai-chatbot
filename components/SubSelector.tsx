import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  //  DropdownMenuPortal,
  DropdownMenuSeparator,
  //  DropdownMenuShortcut,
  //  DropdownMenuSub,
  //  DropdownMenuSubContent,
  //  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function SubSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="backdrop-brightness-80">
          Select Subject
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark bg-transparent backdrop-blur-lg backdrop-brightness-60">
        <DropdownMenuLabel>CBSE</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/science"}>
            <DropdownMenuItem>Science</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Coming soon!</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
