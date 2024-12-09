'use client'

import { ContactForm } from '@/components/contacts/contact-form'

export default function CreateContactPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create Contact</h1>
      <ContactForm type="create" />
    </div>
  )
}
