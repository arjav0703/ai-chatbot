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

export default function ClassSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="backdrop-brightness-80">
          Select Class
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark bg-transparent backdrop-blur-lg backdrop-brightness-60">
        <DropdownMenuLabel>CBSE</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/chat-9"}>
            <DropdownMenuItem>Class 9</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Class 10</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
