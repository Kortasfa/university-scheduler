import { useState, useEffect } from 'react'
import { getUsersAction } from '@/app/actions'
import { useToast } from '@/hooks/use-toast'
import { UserTableView } from '@/components/users/users-table'

export function useUsers() {
  const [users, setUsers] = useState<UserTableView[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsersAction()
      if (result.error) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive"
        })
      } else if (result.users) {
        setUsers(result.users)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [toast])

  return { users, setUsers, loading }
}
