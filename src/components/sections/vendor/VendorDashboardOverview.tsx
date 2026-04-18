import type { LucideIcon } from 'lucide-react'
import {
    BadgeCheck,
    ChartNoAxesCombined,
    Check,
    ChevronRight,
    Circle,
    Crown,
    Eye,
    Gauge,
    Headset,
    MessageCircle,
    Plus,
    ShieldCheck,
    Star,
    Zap,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type ActivityItem = {
    title: string
    subtitle: string
    icon: LucideIcon
}

const recentActivities: ActivityItem[] = [
    { title: 'Profile viewed by a potential buyer', subtitle: '20 minutes ago', icon: Eye },
    { title: 'New inquiry about your listing', subtitle: '2 hours ago', icon: MessageCircle },
    { title: '5-star review published on your profile', subtitle: 'Yesterday', icon: Star },
]

const portfolioPreviewImages: { id: string; src: string; alt: string }[] = [
    { id: '1', src: '/src/assets/protfolio_image/Property Image 1.png', alt: 'Portfolio image 1' },
    { id: '2', src: '/src/assets/protfolio_image/Property Image 2.png', alt: 'Portfolio image 2' },
    { id: '3', src: '/src/assets/protfolio_image/Property Image 3.png', alt: 'Portfolio image 3' },
]

function StatPill({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-lg border bg-white/80 px-3 py-3 text-center">
            <p className="text-lg font-semibold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
        </div>
    )
}

export function VendorDashboardOverview() {
    return (
        <div className="space-y-4 md:space-y-5">
            <Card className="border-border-light bg-card">
                <CardContent className="flex items-start justify-between gap-4 px-10 py-16">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-extrabold  text-foreground font-manrope">Welcome, Zenith Real Estate</h2>
                        <p className="max-w-2xl text-lg font-normal text-muted-foreground font-inter">
                            Your agency performance is up this month. Keep your profile updated to attract high-intent leads.
                        </p>
                    </div>
                    <div className="hidden bg-[#B700111A] p-3 sm:block shadow-2xl rounded-lg">
                        <img src="/src/assets/Icon.png" alt="vendor-dashboard-avatar" />
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                    <div className="space-y-3 p-8">

                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground font-manrope">Profile Completion</h2>
                            <h2 className="text-xl font-bold text-brand-red font-manrope">75%</h2>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-blue-100/70">
                            <div className="h-full w-[75%] rounded-full bg-brand-red" />
                        </div>
                        <div className="grid gap-2 text-xs text-muted-foreground">
                            <p className="inline-flex items-center text-base font-normal text-foreground font-inter gap-1.5">
                                <Check className="size-4 text-success-foreground bg-success rounded-full" />
                                Business Info
                            </p>
                            <p className="inline-flex items-center text-base font-normal text-foreground font-inter gap-1.5">
                                <Check className="size-4 text-success-foreground bg-success rounded-full" />
                                Verified ID
                            </p>
                            <p className="inline-flex items-center text-base font-normal text-foreground font-inter gap-1.5">
                                <Check className="size-4 text-success-foreground bg-success rounded-full" />
                                Bank Linked
                            </p>
                            <p className="inline-flex items-center text-base font-normal text-foreground font-inter gap-1.5">
                                <Circle className="size-3.5 text-muted-foreground" />
                                Profile Photo
                            </p>
                        </div>
                        <Button variant="secondary" className="w-full bg-blue-100 text-base font-semibold text-foreground font-inter py-3 hover:bg-blue-100/80">
                            Complete Next Step
                        </Button>
                    </div>
                </Card>

                <Card>
                    <div className="space-y-3 p-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground font-manrope">Portfolio Images</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            {portfolioPreviewImages.map((img) => (
                                <div
                                    key={img.id}
                                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                            <label
                                className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#E6BDB8] text-muted-foreground transition-colors hover:bg-muted"
                                aria-label="Upload portfolio photo"
                            >
                                <input type="file" accept="image/*" className="sr-only" />
                                <Plus className="size-5" aria-hidden />
                            </label>
                            <label
                                className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#E6BDB8] text-muted-foreground transition-colors hover:bg-muted"
                                aria-label="Upload portfolio photo"
                            >
                                <input type="file" accept="image/*" className="sr-only" />
                                <Plus className="size-5" aria-hidden />
                            </label>
                        </div>
                        <p className="font-inter text-sm font-normal italic text-muted-foreground">
                            Add high-resolution photos of your previous work to boost trust.
                        </p>
                    </div>
                </Card>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                    <div className="space-y-3 p-8">
                        <div className="flex gap-2 items-center">
                            <Zap className="text-brand-red" />
                            <p className="font-inter text-sm font-bold text-brand-red">
                                Authority Boost
                            </p>
                        </div>
                        <div className="">
                            <h2 className="text-xl font-bold text-foreground font-manrope">Visibility Boost</h2>
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase">Inactive</Badge>
                        <p className="text-sm text-muted-foreground">
                            Boosted vendors appear 5x more often in search results.
                        </p>
                        <Button size="sm" className="bg-sky-600 text-white hover:bg-sky-600/90">Explore Boosts</Button>

                    </div>
                </Card>

                <Card>
                    <div className="space-y-3 p-8">
                        <div className="">
                            <h2 className="text-xl font-bold text-foreground font-manrope">Verification Status</h2>
                        </div>
                        <div className="space-y-3">
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                                <BadgeCheck className="mr-1 size-3.5" />
                                In Review
                            </Badge>
                            <div className="w-xl">
                                <p >Our curation team is currently reviewing your licensing and identity
                                    documents. This typically takes 24-48 hours.</p>
                            </div>

                            <Button variant="outline" size="sm" className="w-full font-inter text-base font-bold">
                                View Status
                            </Button>
                        </div>

                    </div>
                </Card>
            </div>

            <Card className="relative overflow-hidden">
                <CardContent className="p-5 md:p-6">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Analytics Overview</p>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        <StatPill value="1,249" label="Profile Views" />
                        <StatPill value="342" label="Lead Clicks" />
                        <StatPill value="4.8" label="Rating" />
                        <StatPill value="2.3%" label="Conversion" />
                    </div>
                    <div className="absolute inset-x-4 bottom-4 top-4 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-[2px]">
                        <div className="text-center">
                            <p className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
                                <Crown className="size-5 text-brand-red" />
                                Upgrade to Premium
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Unlock analytics, competitor tracking, and priority placement.
                            </p>
                            <Button className="mt-3 bg-brand-red text-white hover:bg-brand-red/90">Get Premium Access</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
                <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
                    <div className="space-y-4 p-6 md:p-8">
                        <div className="flex gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
                                <Gauge className="size-5" aria-hidden />
                            </div>
                            <div className="min-w-0 space-y-1">
                                <h3 className="text-xl font-bold text-foreground font-manrope">Dedicated Support</h3>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                    Avg response: 2 hours
                                </p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground font-inter">
                            Need help optimizing your profile or managing your listings? Our experts are here for you.
                        </p>
                        <Button
                            type="button"
                            size="sm"
                            className="gap-2 rounded-lg border-0 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-950 shadow-none hover:bg-sky-200/90"
                        >
                            <Headset className="size-4" aria-hidden />
                            Contact Support
                        </Button>
                    </div>
                </Card>

                <Card className="flex flex-col overflow-hidden rounded-xl border-border-light shadow-sm">
                    <div className="border-b border-border px-6 pb-4 pt-6 md:px-8 md:pb-5 md:pt-8">
                        <h3 className="text-xl font-bold text-foreground font-manrope">Recent Activity</h3>
                    </div>
                    <div className="flex-1 divide-y divide-border">
                        {recentActivities.map((activity) => {
                            const ActivityIcon = activity.icon
                            return (
                                <button
                                    key={activity.title}
                                    type="button"
                                    className="flex w-full items-center gap-3 px-6 py-3.5 text-left transition-colors hover:bg-muted/40 md:px-8 md:py-4"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center text-brand-red">
                                        <ActivityIcon className="size-5 shrink-0" strokeWidth={2} aria-hidden />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                                    </div>
                                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                                </button>
                            )
                        })}
                    </div>
                    <div className="border-t border-border bg-indigo-50/90 px-4 py-3 dark:bg-indigo-950/40">
                        <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-foreground">
                            Showing last 3 activities
                        </p>
                    </div>
                </Card>
            </div>

            <Card className={cn('border-brand-red/30 bg-brand-red text-white')}>
                <CardContent className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
                    <p className="inline-flex items-center gap-2 text-sm font-medium sm:text-base">
                        Grow your business faster with Premium
                    </p>
                    <Button variant="secondary" className="bg-white text-brand-red hover:bg-white/90">
                        Upgrade Now
                    </Button>
                </CardContent>
            </Card>

            <p className="inline-flex w-full items-center justify-center gap-2 text-xs text-muted-foreground">
                <ChartNoAxesCombined className="size-4" />
                Dashboard metrics refresh every few hours.
            </p>
        </div>
    )
}

