import React from "react";
import {
  Card,
  CardContent,
  //  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function DeveloperNote() {
  return (
    <section className="mt-10 max-w-5xl backdrop-brightness-75">
      <Card>
        <CardHeader>
          <CardTitle>Developer`s Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/arjav.png" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              I am Arjav Jain, the creater of this project. Please do not use
              this project for fun as it actually costs money to run an AI
              model. If you have any feedbacks this project, feel free to reach
              out to me via{" "}
              <div className="flex gap-2">
                <Mail />
                <Link
                  href="mailto:arjav@hackclub.app"
                  className="hover:underline"
                >
                  arjav@hackclub.app
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Thank you for choosing CBSE AI</p>
        </CardFooter>
      </Card>
    </section>
  );
}
