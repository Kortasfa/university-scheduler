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
  courses: number;
  avatar?: string;
}

export const courses: Course[] = [
  { id: 1, title: "Introduction to React", students: 1234, lessons: 12, duration: "6 weeks" },
  { id: 2, title: "Advanced JavaScript Concepts", students: 987, lessons: 15, duration: "8 weeks" },
  { id: 3, title: "UX/UI Design Fundamentals", students: 2345, lessons: 10, duration: "5 weeks" },
  { id: 4, title: "Python for Data Science", students: 3456, lessons: 20, duration: "10 weeks" },
  { id: 5, title: "Machine Learning Basics", students: 1567, lessons: 18, duration: "9 weeks" },
]

export const usersData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Student", courses: 3 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Instructor", courses: 2 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Student", courses: 1 },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin", courses: 0 },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Student", courses: 4 },
]