'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Editor from '@/components/course-editor'
import { JSONContent } from 'novel'

export default function CourseEditorPage() {
  const [courseContent, setCourseContent] = useState<JSONContent | undefined>(undefined)

  const handleSave = () => {
    console.log('Course content:', courseContent)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Content Editor</h1>
      <div className="mb-4">
        <Editor 
          initialValue={courseContent}
          onChange={setCourseContent}
        />
      </div>
      <Button onClick={handleSave}>Save Course Content</Button>
    </div>
  )
}