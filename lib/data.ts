export interface Course {
  id: number;
  title: string;
  students: number;
  lessons: number;
  duration: string;
}
  
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Student extends User {
  stream: string,
  year: number,
  group: string,
}

export const courses: Course[] = [
  { id: 1, title: "Introduction to React", students: 1234, lessons: 12, duration: "6 weeks" },
  { id: 2, title: "Advanced JavaScript Concepts", students: 987, lessons: 15, duration: "8 weeks" },
  { id: 3, title: "UX/UI Design Fundamentals", students: 2345, lessons: 10, duration: "5 weeks" },
  { id: 4, title: "Python for Data Science", students: 3456, lessons: 20, duration: "10 weeks" },
  { id: 5, title: "Machine Learning Basics", students: 1567, lessons: 18, duration: "9 weeks" },
]

export const usersData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Student" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Instructor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Student" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Student" },
]

export const streams = [
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" },
]

export const years = [1, 2, 3, 4, 5, 6]

export const groups = {
  programming: ["Bears", "Wolves", "Lions"],
  design: ["Eagles", "Foxes", "Owls"],
}