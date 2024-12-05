import { redirect } from 'next/navigation'

export default function AdminPage() {
  redirect('/protected/admin/resources')
}
