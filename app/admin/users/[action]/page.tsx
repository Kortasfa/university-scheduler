'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from '@/lib/data'
import { addUser, updateUser, getUserById } from '@/lib/actions'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valaction email address.",
  }),
  role: z.enum(["Student", "Instructor", "Admin"], {
    required_error: "Please select a role.",
  }),
  courses: z.coerce.number().int().min(0, {
    message: "Number of courses must be 0 or greater.",
  }),
  avatar: z.string().url().optional(),
})

export default function UserForm({ params }: { params: { action: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Student",
      courses: 0,
      avatar: "",
    },
  })

  useEffect(() => {
    if (params.action !== 'add') {
        getUserById(parseInt(params.action, 10)).then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
          form.reset({
            name: fetchedUser.name,
            email: fetchedUser.email,
            role: fetchedUser.role as "Student" | "Instructor" | "Admin",
            courses: fetchedUser.courses,
            avatar: fetchedUser.avatar || "",
          })
        }
      })
    }
  }, [params.action, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (params.action === 'add') {
      await addUser(values)
    } else {
      await updateUser(parseInt(params.action, 10), values)
    }
    router.push('/admin/users')
    router.refresh()
  }

  return (
    <div className="mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{params.action === 'add' ? 'Add User' : 'Edit User'}</CardTitle>
          <CardDescription>
            {params.action === 'add' ? 'Create a add user profile.' : 'Update the user\'s information.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={form.watch('avatar')} alt="User avatar" />
                  <AvatarFallback>{form.watch('name').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Avatar URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/avatar.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the URL of the user's avatar image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the user's full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the user's email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Instructor">Instructor</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the user's role.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Courses</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the number of courses the user is enrolled in or teaching.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/admin/users')}>Cancel</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>{params.action === 'add' ? 'Add User' : 'Update User'}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}