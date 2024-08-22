import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NewButton({title,href}:{title:string,href:string}) {
  return (
    <Button asChild className='text-sm'>
    <Link href={href}>
    <Plus/>
{title}
    </Link>

        </Button>
  )
}
