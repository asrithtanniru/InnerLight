"use client"
import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent,
    SidebarFooter, SidebarTrigger, SidebarInset
} from '@/components/ui/sidebar'
import { InnerLightIcon } from './icons'
import { AdminNav } from './admin-nav'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bell, Search } from 'lucide-react'
import { Input } from './ui/input'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const [userEmail, setUserEmail] = React.useState<string>("")
    const router = useRouter()

    const getDetails = async () => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include', // Include cookies
            })

            if (response.ok) {
                const data = await response.json()
                setUserEmail(data.user.email)
            } else {
                // If auth fails, redirect to login
                router.push('/login')
            }
        } catch (err) {
            console.error("Error fetching user details:", err)
            router.push('/login')
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            // Clear localStorage
            localStorage.removeItem('token')
            localStorage.removeItem('userId')

            // Redirect to login
            router.push('/login')
        } catch (err) {
            console.error("Error during logout:", err)
            // Even if logout fails, clear local data and redirect
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            router.push('/login')
        }
    }

    React.useEffect(() => {
        getDetails()
    }, [])

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <InnerLightIcon className="w-8 h-8 text-primary" />
                        <span className="text-lg font-semibold">InnerLight</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <AdminNav />
                </SidebarContent>
                <SidebarFooter>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start w-full gap-2 p-2 h-11">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="@shadcn" />
                                    <AvatarFallback>{userEmail ? userEmail.charAt(0).toUpperCase() : "A"}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col items-start'>
                                    <span className="font-medium">{userEmail}</span>
                                    <span className="text-xs text-muted-foreground">{userEmail}</span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{userEmail}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {userEmail}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <SidebarTrigger className="md:hidden" />
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
