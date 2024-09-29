import { useState, useEffect } from 'react'
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { groups, streams, User, Student, years } from '@/lib/data'
import { getUserById } from '@/lib/actions'
import { Combobox } from '../ui/combobox'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["Student", "Instructor", "Admin"], {
    required_error: "Please select a role.",
  }),
  avatar: z.instanceof(File).optional(),
  stream: z.string().optional(),
  year: z.string().optional(),
  group: z.string().optional(),
})

interface UserFormProps {
  action: string;
  onClose: () => void;
  onSubmit: () => void;
}

export default function UserForm({ action, onClose, onSubmit }: UserFormProps) {
  const [user, setUser] = useState<User | Student | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [selectedStream, setSelectedStream] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Student",
      stream: "",
      year: "",
      group: "",
    },
  })

  useEffect(() => {
    if (action !== 'add') {
      getUserById(parseInt(action, 10)).then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
          form.reset({
            name: fetchedUser.name,
            email: fetchedUser.email,
            role: fetchedUser.role as "Student" | "Instructor" | "Admin",
            stream: (fetchedUser as Student).stream || "",
            year: (fetchedUser as Student).year?.toString() || "",
            group: (fetchedUser as Student).group || "",
          })
          setAvatarPreview(fetchedUser.avatar || null)
        }
      })
    }
  }, [action, form])

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onSubmit()
    onClose()
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const streamOptions = streams.map(stream => ({ value: stream.value, label: stream.label }))
  const yearOptions = years.map(year => ({ value: year.toString(), label: `Year ${year}` }))
  const groupOptions = selectedStream
    ? (groups[selectedStream as keyof typeof groups] || []).map(group => ({ value: group, label: group }))
    : []

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatarPreview || undefined} alt="User avatar" />
            <AvatarFallback>{form.watch('name').slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </FormControl>
                <FormDescription>
                  Upload avatar image.
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
        {form.watch('role') === 'Student' && (
          <div className='flex flex-row gap-10'>
            <FormField
              control={form.control}
              name="stream"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream</FormLabel>
                  <Combobox
                    options={streamOptions}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value)
                      setSelectedStream(value)
                      setSelectedYear("")
                      setSelectedGroup("")
                    }}
                    placeholder="Select stream..."
                  />
                  <FormDescription>
                    Select the student's stream.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Combobox
                    options={yearOptions}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value)
                      setSelectedYear(value)
                      setSelectedGroup("")
                    }}
                    placeholder="Select year..."
                    disabled={!selectedStream}
                  />
                  <FormDescription>
                    Select the student's year.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <Combobox
                    options={groupOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select group..."
                    disabled={!selectedYear}
                  />
                  <FormDescription>
                    Select the student's group.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button type="submit">
            {action === 'add' ? 'Add User' : 'Update User'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
