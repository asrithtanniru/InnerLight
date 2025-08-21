"use client"
import React from "react";

import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"

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
import { programs } from "@/lib/placeholder-data"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function ProgramsPage() {
  // Edit modal state
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editProgram, setEditProgram] = React.useState<any | null>(null);
  const [editForm, setEditForm] = React.useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    difficulty: '',
    active: true,
  });
  const [editImageFile, setEditImageFile] = React.useState<File | null>(null);

  // Open edit modal and prefill form
  const openEditModal = (program: any) => {
    setEditProgram(program);
    setEditForm({
      title: program.title || '',
      description: program.description || '',
      category: program.category || '',
      duration: program.duration || '',
      difficulty: program.difficulty || '',
      active: !!program.active,
    });
    setEditImageFile(null);
    setEditModalOpen(true);
  };

  // Handle edit form input
  const handleEditChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };
  const handleEditDifficulty = (value: string) => setEditForm(prev => ({ ...prev, difficulty: value }));
  const handleEditImage = (e: any) => setEditImageFile(e.target.files[0]);

  // Submit edit
  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    if (!editProgram) return;
    const formData = new FormData();
    formData.append('id', editProgram._id);
    formData.append('title', editForm.title);
    formData.append('description', editForm.description);
    formData.append('category', editForm.category);
    formData.append('duration', editForm.duration);
    formData.append('difficulty', editForm.difficulty);
    formData.append('active', editForm.active ? 'true' : 'false');
    if (editImageFile) formData.append('image', editImageFile);
    setLoading(true);
    const res = await fetch('/api/programs', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    });
    const data = await res.json();
    setLoading(false);
    if (data.message === 'Program updated successfully') {
      setPrograms(prev => prev.map(p => p._id === editProgram._id ? { ...p, ...editForm, image: editImageFile ? URL.createObjectURL(editImageFile) : p.image } : p));
      setEditModalOpen(false);
      setEditProgram(null);
    }
  };
  // Edit handler
  const handleEdit = async (program: any) => {
    // For demo: prompt for new title
    const newTitle = window.prompt('Edit Program Title:', program.title);
    if (!newTitle || newTitle === program.title) return;
    setLoading(true);
    const res = await fetch('/api/programs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: program._id, title: newTitle }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.message === 'Program updated successfully') {
      setPrograms(prev => prev.map(p => p._id === program._id ? { ...p, title: newTitle } : p));
    }
  };

  // Delete handler
  const handleDelete = async (program: any) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    setLoading(true);
    const res = await fetch(`/api/programs?id=${program._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    setLoading(false);
    if (data.message === 'Program deleted successfully') {
      setPrograms(prev => prev.filter(p => p._id !== program._id));
    }
  };
  // --- Integration with API ---
  const [programs, setPrograms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    difficulty: '',
    image: null,
    active: true,
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [showSheet, setShowSheet] = React.useState(false);

  // Fetch programs from API
  React.useEffect(() => {
    setLoading(true);
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        setPrograms(data.programs || []);
        setLoading(false);
      });
  }, []);

  // Handle form input
  const handleChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };
  const handleDifficulty = (value: string) => setForm(prev => ({ ...prev, difficulty: value }));
  const handleImage = (e: any) => setImageFile(e.target.files[0]);

  // Handle form submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('duration', form.duration);
    formData.append('difficulty', form.difficulty);
    formData.append('active', form.active ? 'true' : 'false');
    if (imageFile) formData.append('image', imageFile);
    // lessons can be added as needed
    setLoading(true);
    const res = await fetch('/api/programs', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const data = await res.json();
    setLoading(false);
    if (data.program) {
      setPrograms(prev => [data.program, ...prev]);
      setShowSheet(false);
      setForm({ title: '', description: '', category: '', duration: '', difficulty: '', image: null, active: true });
      setImageFile(null);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <PageHeader title="Programs">
        <Sheet open={showSheet} onOpenChange={setShowSheet}>
          <SheetTrigger asChild>
            <Button size="sm" className="gap-1" onClick={() => setShowSheet(true)}>
              <PlusCircle className="h-4 w-4" />
              Add Program
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Add Program</SheetTitle>
              <SheetDescription>
                Create a new wellness program for your users.
              </SheetDescription>
            </SheetHeader>
            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Mindful Morning" value={form.title} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Start your day with calm and focus." value={form.description} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="Mindfulness" value={form.category} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="10 Days" value={form.duration} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={form.difficulty} onValueChange={handleDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <Input type="file" className="w-full" onChange={handleImage} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" checked={form.active} onCheckedChange={checked => setForm(prev => ({ ...prev, active: checked }))} />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Program'}</Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </PageHeader>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">
                  Difficulty
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Duration
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program._id}>
                  <TableCell className="hidden sm:table-cell">
                    {program.image && (
                      <Image
                        alt="Program image"
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        src={program.image}
                        width={64}
                        data-ai-hint="wellness nature"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {program.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={program.active ? "default" : "outline"}>
                      {program.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.category}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {program.difficulty}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {program.duration}
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
                        <DropdownMenuItem onClick={() => openEditModal(program)}>Edit</DropdownMenuItem>
                        {/* Edit Modal */}
                        {editModalOpen && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                              <h2 className="text-lg font-bold mb-4">Edit Program</h2>
                              <form className="grid gap-4" onSubmit={handleEditSubmit}>
                                <div className="space-y-2">
                                  <Label htmlFor="title">Title</Label>
                                  <Input id="title" value={editForm.title} onChange={handleEditChange} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="description">Description</Label>
                                  <Textarea id="description" value={editForm.description} onChange={handleEditChange} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input id="category" value={editForm.category} onChange={handleEditChange} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="duration">Duration</Label>
                                    <Input id="duration" value={editForm.duration} onChange={handleEditChange} />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="difficulty">Difficulty</Label>
                                  <Select value={editForm.difficulty} onValueChange={handleEditDifficulty}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="beginner">Beginner</SelectItem>
                                      <SelectItem value="intermediate">Intermediate</SelectItem>
                                      <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Image</Label>
                                  <Input type="file" className="w-full" onChange={handleEditImage} />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch id="active" checked={editForm.active} onCheckedChange={checked => setEditForm(prev => ({ ...prev, active: checked }))} />
                                  <Label htmlFor="active">Active</Label>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
                                  <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        <DropdownMenuItem onClick={() => handleDelete(program)}>Delete</DropdownMenuItem>
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
            Showing <strong>1-{programs.length}</strong> of <strong>{programs.length}</strong> programs
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
