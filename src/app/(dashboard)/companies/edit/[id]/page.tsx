'use client'

import { CompanyForm } from '@/components/companies/company-form'
import { useParams } from 'next/navigation'

export default function EditCompanyPage() {
  const { id } = useParams()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Company</h1>
      <CompanyForm type="edit" id={id as string} />
    </div>
  )
}
