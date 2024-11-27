'use server'

import { Student, User, usersData } from './data'

let users: User[] = usersData

export async function getUsers(): Promise<User[]> {
  return users
}

export async function getUserById(id: number): Promise<User | Student | undefined> {
  return users.find(user => user.id === id)
}

export async function addUser(userData: Omit<User, 'id'>): Promise<User> {
  const newUser = { ...userData, id: users.length + 1 }
  users.push(newUser)
  return newUser
}

export async function updateUser(id: number, userData: Omit<User, 'id'>): Promise<User | undefined> {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    users[index] = { ...userData, id }
    return users[index]
  }
  return undefined
}

export async function deleteUser(id: number): Promise<boolean> {
  const initialLength = users.length
  users = users.filter(user => user.id !== id)
  return users.length < initialLength
}
