import useSWR from 'swr'
import { supabase } from '@/lib/supabase'

export function useContacts() {
  const fetcher = async () => {
    const { data, error } = await supabase.from('contacts').select('*')
    if (error) throw error
    return data
  }

  const { data, error, mutate } = useSWR('contacts', fetcher)

  return {
    contacts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
