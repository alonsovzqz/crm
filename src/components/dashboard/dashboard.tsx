'use client'

import { useList } from '@refinedev/core'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  const { data: companies } = useList({
    resource: 'companies',
    pagination: { pageSize: 5 },
  })

  const { data: contacts } = useList({
    resource: 'contacts',
    pagination: { pageSize: 5 },
  })

  const { data: tasks } = useList({
    resource: 'tasks',
    pagination: { pageSize: 5 },
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{companies?.total ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{contacts?.total ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tasks?.total ?? 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
