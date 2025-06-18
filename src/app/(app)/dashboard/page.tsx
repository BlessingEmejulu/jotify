import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PATHS } from "@/lib/constants";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const mockNotes = [
    { id: "1", title: "Introduction to AI", date: "2024-07-20", summary: "Covered basic concepts of AI, machine learning, and neural networks..." },
    { id: "2", title: "Advanced JavaScript", date: "2024-07-18", summary: "Deep dive into closures, promises, and async/await..." },
    { id: "3", title: "Project Management", date: "2024-07-15", summary: "Discussed Agile methodologies and sprint planning..." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your recent notes and activity.</p>
        </div>
        <Link href={PATHS.NEW_NOTE}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Note
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search all notes..." 
          className="pl-10 w-full sm:w-1/2 lg:w-1/3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockNotes.map(note => (
          <Card key={note.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{note.title}</CardTitle>
              <CardDescription>{note.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">{note.summary}</p>
              <Link href={PATHS.NOTE(note.id)} className="mt-4 block">
                <Button variant="outline" size="sm" className="w-full">View Note</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
       {mockNotes.length === 0 && (
        <div className="text-center py-12">
            <img src="https://placehold.co/300x200.png" alt="No notes illustration" data-ai-hint="empty state notes" className="mx-auto mb-4 rounded-md" />
            <h2 className="text-xl font-semibold mb-2">No notes yet!</h2>
            <p className="text-muted-foreground mb-4">Start by creating your first note.</p>
            <Link href={PATHS.NEW_NOTE}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Note
              </Button>
            </Link>
          </div>
        )}
    </div>
  );
}
