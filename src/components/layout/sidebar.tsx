'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Settings } from 'lucide-react'
import { useGetIdentity, useLogout, useMenu } from '@refinedev/core'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet'
import { LucideIcon } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()
  const { menuItems } = useMenu() as { 
    menuItems: Array<{
      icon?: LucideIcon
      label: string
      route?: string
      key: string
    }>
  }
  const { data: user } = useGetIdentity<{
    name: string
    email: string
    avatar?: string
  }>()
  const { mutate: logout } = useLogout()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted/50">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.route ?? ""}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === item.route ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              )}
            >
              <div className="flex items-center flex-1">
                {item.icon && <item.icon className={cn('h-5 w-5 mr-3')} />}
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {user && (
        <div className="border-t p-3">
          <div className="flex items-center gap-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={() => logout()}
            variant="ghost"
            className="w-full mt-4 justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <LayoutDashboard className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
