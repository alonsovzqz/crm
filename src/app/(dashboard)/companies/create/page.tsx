'use client'

import { CompanyForm } from '@/components/companies/company-form'

export default function CreateCompanyPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create Company</h1>
      <CompanyForm type="create" />
    </div>
  )
}
