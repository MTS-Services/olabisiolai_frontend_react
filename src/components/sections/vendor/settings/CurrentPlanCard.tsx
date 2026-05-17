import { Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import type { VendorSettingsSubscription } from '@/api/vendorSettings'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  subscription: VendorSettingsSubscription
}

export function CurrentPlanCard({ subscription }: Props) {
  const navigate = useNavigate()
  const isPremium = subscription.plan === 'premium'

  return (
    <Card className="relative rounded-xl border-border-light shadow-sm">
      <Badge className="absolute -left-3 -top-3 z-50! bg-[#005E8D] px-8 py-1 text-base! font-semibold uppercase text-primary-foreground hover:bg-primary">
        {isPremium ? 'Premium' : 'Free'}
      </Badge>
      <CardContent className="px-6 pb-6 pt-14">
        <div className="flex gap-4">
          <div className="mb-3 flex size-14 items-center justify-center rounded-xl bg-tint-red bg-[#FF6B35]/10 text-brand-red">
            <Award className="size-7" aria-hidden />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-inter">Current Plan</p>
            <p className="text-xl font-bold text-foreground font-manrope">{subscription.plan_label}</p>
          </div>
        </div>
        <Button
          type="button"
          onClick={() => navigate('/vendor/boost')}
          className="mt-6 w-full cursor-pointer bg-sky-100 font-inter font-semibold text-foreground shadow-none hover:bg-sky-100/80"
        >
          Manage subscription
        </Button>
      </CardContent>
    </Card>
  )
}
