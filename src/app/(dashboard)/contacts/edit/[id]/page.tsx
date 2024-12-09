'use client'

import { ContactForm } from '@/components/contacts/contact-form'
import { useParams } from 'next/navigation'

export default function EditContactPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Contact</h1>
      <ContactForm type="edit" id={id} />
    </div>
  )
}
