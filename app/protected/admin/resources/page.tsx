import { redirect } from 'next/navigation'

export default function ResourcesPage() {
  redirect('/protected/admin/resources/users')
}
