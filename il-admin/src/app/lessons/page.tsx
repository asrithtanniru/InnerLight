
"use client";
import Image from "next/image"
import { MoreHorizontal, PlusCircle, UploadCloud } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/page-header"
import { lessons, programs } from "@/lib/placeholder-data"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function LessonsPage() {
  const getProgramTitle = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    return program ? program.title : "N/A";
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <PageHeader title="Lessons">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Lesson
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Add Lesson</SheetTitle>
              <SheetDescription>
                Fill in the details for the new lesson.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Introduction to Mindfulness" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                            {programs.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content (Rich Text)</Label>
                    <Textarea id="content" placeholder="Start writing your lesson content here..." rows={6} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="order">Order</Label>
                        <Input id="order" type="number" placeholder="1" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Est. Time (min)</Label>
                        <Input id="time" type="number" placeholder="10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Media</Label>
                    <div className="flex items-center gap-4">
                        <Input id="videoUrl" placeholder="https://example.com/video.mp4" className="flex-1" />
                        <Button variant="outline" size="icon" asChild>
                            <label htmlFor="upload" className="cursor-pointer">
                                <UploadCloud className="h-4 w-4"/>
                                <input id="upload" type="file" className="sr-only" />
                            </label>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="active-status" defaultChecked />
                    <Label htmlFor="active-status">Active</Label>
                </div>
            </div>
            <div className="flex justify-end">
                <Button>Save Lesson</Button>
            </div>
          </SheetContent>
        </Sheet>
      </PageHeader>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Est. Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>{getProgramTitle(lesson.programId)}</TableCell>
                  <TableCell>{lesson.order}</TableCell>
                  <TableCell>{lesson.time}</TableCell>
                  <TableCell>
                    <Badge variant={lesson.active ? "default" : "outline"}>
                      {lesson.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{lessons.length}</strong> of <strong>{lessons.length}</strong> lessons
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
