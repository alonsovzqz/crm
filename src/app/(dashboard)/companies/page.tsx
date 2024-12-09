'use client'

import { useTable } from '@refinedev/react-table'
import { ColumnDef, getCoreRowModel, Row } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useGo } from '@refinedev/core'

const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
]

export default function CompaniesPage() {
  const go = useGo()

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      tableQuery: { data: tableData },
    },
  } = useTable<Company>({
    columns,
    refineCoreProps: {
      resource: 'companies',
    },
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        onRowClick: (row: Row<Company>) => {
          go({
            to: {
              resource: 'companies',
              action: 'edit',
              id: row.original.id,
            },
          })
        },
      },
    }))
  }, [setOptions, go])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Companies</h1>
      <DataTable columns={columns} data={tableData?.data ?? []} />
      <Button
        className="mt-4"
        onClick={() => {
          go({
            to: {
              resource: 'companies',
              action: 'create',
            },
          })
        }}
      >
        Create Company
      </Button>
    </div>
  )
}
