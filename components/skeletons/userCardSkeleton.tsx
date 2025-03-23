import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const UserCardSkeleton = () => {
  return (
    <div className="block">
      <Card className="text-white transition-all duration-300 ease-in-out">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 bg-gray-300" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-2/3 bg-gray-300" />
        </CardContent>
      </Card>
    </div>
  )
}

export default UserCardSkeleton