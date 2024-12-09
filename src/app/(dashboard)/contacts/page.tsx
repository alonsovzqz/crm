'use client'

import { useTable } from '@refinedev/react-table'
import { ColumnDef, getCoreRowModel, Row } from '@tanstack/react-table'
import { useNavigation } from '@refinedev/core'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'

const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
]

export default function ContactsPage() {
  const { show, create } = useNavigation()

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      tableQuery: { data: tableData },
    },
  } = useTable<Contact>({
    columns,
    refineCoreProps: {
      resource: 'contacts',
    },
    getCoreRowModel: getCoreRowModel(),
  })

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      onRowClick: (row: Row<Contact>) => {
        show('contacts', row.original.id)
      },
    },
  }))

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Contacts</h1>
      <DataTable columns={columns} data={tableData?.data ?? []} />
      <Button
        className="mt-4"
        onClick={() => {
          create('contacts')
        }}
      >
        Create Contact
      </Button>
    </div>
  )
}
