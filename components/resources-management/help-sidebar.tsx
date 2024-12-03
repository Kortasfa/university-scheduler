import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import StudentsConfiguration from "./users/configuration";

interface SidebarProps {
  url: string,
  title: string,
}

export function HelpSidebar({ url, title }: SidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      <StudentsConfiguration />
      <Card>
        <CardHeader>
          <CardTitle>Need help?</CardTitle>
          <CardDescription className="text-wrap">
            Read our documentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={url}>
            <Button size="sm" variant="secondary">
              {title}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}