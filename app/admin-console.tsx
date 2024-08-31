import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ExecuteConsole } from './execute-console'
import { SignConsole } from './sign-console'

export const AdminConsole = () => {
  return (
    <Tabs defaultValue="sign" className="p-8 bg-zinc-100 border-2 border-white rounded-md w-[500px]">
      <TabsList>
        <TabsTrigger value="sign">Sign</TabsTrigger>
        <TabsTrigger value="execute">Execute</TabsTrigger>
      </TabsList>
      <TabsContent value="sign">
        <SignConsole />
      </TabsContent>
      <TabsContent value="execute">
        <ExecuteConsole />
      </TabsContent>
    </Tabs>
  )
}
