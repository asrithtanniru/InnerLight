
"use client"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
import { challenges } from "@/lib/placeholder-data"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/datepicker"

export default function ChallengesPage() {

  interface Challenge {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    expiry: string;
    image?: string;
    points?: number;
  }
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  interface ChallengeForm {
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    expiry: string;
    points: string;
    image: File | null;
  }
  const [form, setForm] = useState<ChallengeForm>({
    title: "",
    description: "",
    difficulty: "",
    duration: "",
    expiry: "",
    points: "",
    image: null
  });
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/challenges", {
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          }
        });
        if (!res.ok) throw new Error("Failed to fetch challenges");
        const data = await res.json();
        setChallenges(data.challenges || []);
      } catch (err) {
        setError("Could not load challenges");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev: ChallengeForm) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setForm((prev: ChallengeForm) => ({ ...prev, difficulty: value }));
  };

  const handleDateChange = (date: string) => {
    setForm((prev: ChallengeForm) => ({ ...prev, expiry: date }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("difficulty", form.difficulty);
      formData.append("duration", form.duration);
      formData.append("expiry", form.expiry);
      if (form.image) formData.append("image", form.image);
      // If you want to support points, add: formData.append("points", form.points)
      const res = await fetch("/api/challenges", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        },
        body: formData
      });
      if (!res.ok) throw new Error("Failed to create challenge");
      const data = await res.json();
      setChallenges((prev: Challenge[]) => [...prev, data.challenge]);
      setForm({ title: "", description: "", difficulty: "", duration: "", expiry: "", points: "", image: null });
    } catch (err) {
      setError("Could not create challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <PageHeader title="Challenges">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Challenge
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Challenge</SheetTitle>
              <SheetDescription>
                Create a new challenge for users to complete.
              </SheetDescription>
            </SheetHeader>
            <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={handleInputChange} placeholder="Meditate for 5 Days" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={form.description} onChange={handleInputChange} placeholder="Challenge description" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={form.difficulty} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" value={form.duration} onChange={handleInputChange} placeholder="5 days" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="expiry">Expiry Date</Label>
                <DatePicker onSelect={handleDateChange} />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              {/* Add points field if needed */}
              {/* <div className="flex flex-col gap-1">
                <Label htmlFor="points">Points</Label>
                <Input id="points" type="number" value={form.points} onChange={handleInputChange} placeholder="50" />
              </div> */}
              {error && <div className="text-red-500">{error}</div>}
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Challenge"}</Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </PageHeader>
      <Card>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challenges.map((challenge: Challenge) => (
                  <TableRow key={challenge._id}>
                    <TableCell>
                      {challenge.image && (
                        <img
                          src={challenge.image}
                          alt={challenge.title}
                          className="aspect-square rounded-md object-cover"
                          style={{ width: 64, height: 64 }}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{challenge.title}</TableCell>
                    <TableCell>
                      <Badge variant={
                        challenge.difficulty === 'Easy' ? 'default' : challenge.difficulty === 'Medium' ? 'secondary' : 'destructive'
                      }
                        className={
                          challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                        }
                      >{challenge.difficulty}</Badge>
                    </TableCell>
                    <TableCell>{challenge.duration}</TableCell>
                    <TableCell>{challenge.expiry}</TableCell>
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
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{challenges.length}</strong> of <strong>{challenges.length}</strong> challenges
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
