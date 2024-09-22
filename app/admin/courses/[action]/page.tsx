'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Minus } from "lucide-react"
import Image from 'next/image'

interface Step {
  title: string
  content: string
}

interface Course {
  title: string
  description: string
  students: number
  deadlineDate: string
  deadlineTime: string
  image: File | null
  steps: Step[]
}

export default function CourseFormPage({ params }: { params: { action: string } }) {
  const router = useRouter()
  const isEditing = params.action === 'edit'

  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    students: 0,
    deadlineDate: new Date().toISOString(),
    deadlineTime: '12:00',
    image: null,
    steps: [{ title: '', content: '' }]
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (isEditing) {
      setCourse({
        title: 'Example Course',
        description: 'This is an example course description.',
        students: 50,
        deadlineDate: new Date().toISOString(),
        deadlineTime: '14:00',
        image: null,
        steps: [
          { title: 'Introduction', content: 'Welcome to the course!' },
          { title: 'Chapter 1', content: 'This is the content of chapter 1.' }
        ]
      })
    }
  }, [isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Course data:', course)
    router.push('/admin/courses')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCourse({ ...course, image: file })
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const addStep = () => {
    setCourse({ ...course, steps: [...course.steps, { title: '', content: '' }] })
  }

  const removeStep = (index: number) => {
    const newSteps = course.steps.filter((_, i) => i !== index)
    setCourse({ ...course, steps: newSteps })
  }

  const updateStep = (index: number, field: keyof Step, value: string) => {
    const newSteps = course.steps.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    )
    setCourse({ ...course, steps: newSteps })
  }

  return (
    <div>
      <Tabs defaultValue="form">
        <TabsList className="mb-4">
          <TabsTrigger value="form">Course Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={course.title}
                      onChange={(e) => setCourse({ ...course, title: e.target.value })}
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="students">Number of Students</Label>
                    <Input
                      id="students"
                      type="number"
                      value={course.students}
                      onChange={(e) => setCourse({ ...course, students: parseInt(e.target.value) })}
                      placeholder="Enter number of students"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    placeholder="Enter course description"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Course Deadline</Label>
                    <div className="flex space-x-2">
                      <Input
                        type='date'
                        value={course.deadlineDate}
                        onChange={(e) => setCourse({ ...course, deadlineDate: e.target.value })}
                      />
                      <Input
                      id="deadlineTime"
                      type="time"
                      value={course.deadlineTime}
                      onChange={(e) => setCourse({ ...course, deadlineTime: e.target.value })}
                    />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Course Image</Label>
                  <div className="flex items-center">
                    <Input
                      id="image"
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="image">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </label>
                    </Button>
                    {course.image && <span className="text-sm text-muted-foreground">{course.image.name}</span>}
                  </div>
                  {previewImage && (
                    <div className="mt-2">
                      <Image src={previewImage} alt="Preview" width={200} height={200} className="rounded-md" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.steps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Step {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStep(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Step Title"
                      value={step.title}
                      onChange={(e) => updateStep(index, 'title', e.target.value)}
                    />
                    <Textarea
                      placeholder="Step Content"
                      value={step.content}
                      onChange={(e) => updateStep(index, 'content', e.target.value)}
                      rows={4}
                    />
                  </div>
                ))}
                <Button type="button" onClick={addStep} variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Step
                </Button>
              </CardContent>
            </Card>
            <Button type="submit">{isEditing ? 'Update' : 'Create'} Course</Button>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{course.title || 'Course Title'}</CardTitle>
            </CardHeader>
            <CardContent>
              {previewImage && (
                <Image src={previewImage} alt="Course Preview" width={400} height={200} className="rounded-md mb-4" />
              )}
              <p className="text-muted-foreground mb-4">{course.description || 'Course description'}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>Number of Students:</strong> {course.students}
                </div>
                <div>
                  <strong>Deadline:</strong> {course.deadlineDate} at {course.deadlineTime}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Content</h3>
              {course.steps.map((step, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-medium">{step.title || `Step ${index + 1}`}</h4>
                  <p>{step.content || 'Step content'}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}