import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeDollarSign,
  BookOpenCheck,
  CircleCheck,
  Coins,
  Gift,
  HandCoins,
  Megaphone,
  Search,
  TrendingUp,
} from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

export default function PricingYourServicesRight() {
  return (
    <div className="w-full bg-background">
      <section className="bg-ink py-14 text-center sm:py-20 lg:py-24">
        <div className={cn(container, "flex flex-col items-center")}>
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 text-success">
            <BadgeDollarSign className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-ice sm:text-4xl lg:text-6xl">
            Pricing Your Services Right
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-stat-muted sm:text-base lg:text-xl">
            Set competitive prices that win customers and grow your profit.
          </p>
        </div>
      </section>

      <section className="py-6">
        <div className={cn(container)}>
          <Link
            to="/business-tips"
            className="inline-flex items-center gap-2 text-sm font-medium text-body-secondary hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Business Tips
          </Link>
        </div>
      </section>

      <section className="pb-10 lg:pb-16">
        <div className={cn(container, "space-y-8 lg:space-y-12")}>
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Why Pricing Matters</h2>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-4 text-base leading-7 text-body-secondary">
                <p>
                  Pricing is more than just a number; it&apos;s a message to your customers. It
                  reflects the quality of your work, your brand position, and your respect for your
                  own time and expertise.
                </p>
                <p>
                  The goal is to find the “Sweet Spot” - the intersection where your customers feel
                  they are getting immense value while you maintain healthy margins for business
                  growth.
                </p>
              </div>
              <div className="rounded-r-xl border-l-4 border-success bg-success/10 p-5">
                <h3 className="text-base font-semibold text-ink">Nigerian Market Reality</h3>
                <p className="mt-2 text-sm italic leading-6 text-body-secondary">
                  “In the Nigerian market, price sensitivity is high, but trust is the ultimate
                  currency. If your price is too low, customers may question your quality. If
                  it&apos;s too high without visible proof of excellence, they&apos;ll choose a
                  competitor.”
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Research Your Market</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Audit Competitors",
                  text: "Look at 3-5 similar businesses in your area. What do they charge? What's included?",
                  icon: Search,
                },
                {
                  title: "Ask Your Network",
                  text: "Talk to past clients or fellow business owners about industry standards.",
                  icon: HandCoins,
                },
                {
                  title: "Check Benchmarks",
                  text: "Use professional associations or trade unions for regional rate guides.",
                  icon: BookOpenCheck,
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-muted p-6">
                  <item.icon className="h-5 w-5 text-brand" />
                  <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-body-secondary">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="rounded-2xl border border-success/20 bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-base font-semibold text-ink">
                <TrendingUp className="h-4 w-4 text-success" />
                Gidira Search Tip
              </p>
              <p className="mt-2 text-sm italic text-body-secondary">
                “Search for your specific service on Gidira and filter by Top Rated to see what the
                market leaders are charging.”
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Cost-Based Pricing</h2>
            <p className="text-base text-body-secondary">
              This is the most reliable way to ensure you never lose money. Calculate your true costs
              before setting your final price.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Materials - Cost of all physical items needed to complete service.",
                "Time - Calculate your hourly rate for the time required.",
                "Transport - Fuel, logistics, and commute cost where on-site work is involved.",
                "Overheads - Internet, electricity, subscriptions and tools.",
              ].map((item, idx) => (
                <div key={item} className="rounded-xl bg-muted p-4 text-sm font-medium text-ink">
                  <span className="mr-2 text-placeholder-text">{`0${idx + 1}`}</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-success/20 p-4 text-sm font-medium text-success">
              <span className="inline-flex items-center gap-2">
                <CircleCheck className="h-4 w-4" />
                Do Profit Margin
              </span>
              <p className="mt-2 text-success">
                Add 20-40% on top of your costs to create a sustainable for growth.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-ink p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ice">Value-Based Pricing</h2>
            <p className="mt-3 text-sm leading-6 text-stat-muted">
              Instead of charging for time, charge for the result. If your service saves a client
              NGN100,000 in a year, even if it only took you two hours, your expertise and execution
              are valuable.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
              Displaying Prices on Gidira
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Option 1: Exact Prices",
                  items: ["NGN 5,000 haircut (wash + style)", "NGN 8,000 full makeup", "NGN 10,000 home service"],
                },
                {
                  title: "Option 2: Price Ranges",
                  items: ["NGN 7,000-15,000 all-in event makeup", "Custom rates for special requests"],
                },
                {
                  title: "Option 3: Starting From",
                  items: ["From NGN 8,000 tailoring", "From NGN 15,000 website setup"],
                },
                {
                  title: "Option 4: Contact for Pricing",
                  items: ["Best for custom jobs and large projects", "Good for scope-heavy bespoke contracts"],
                },
              ].map((block) => (
                <article key={block.title} className="rounded-2xl bg-card p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-ink">{block.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-body-secondary">
                    {block.items.map((line) => (
                      <li key={line} className="rounded-md bg-surface-soft px-3 py-2">
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Discounts & Promotions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "First-Time Deals", icon: Gift, text: "Offer a small entry incentive to gain trust." },
                { title: "Seasonal Promos", icon: Megaphone, text: "Align discounts with festive periods and trends." },
                { title: "Loyalty Bonuses", icon: Coins, text: "Reward repeat customers with exclusive benefits." },
              ].map((promo) => (
                <article key={promo.title} className="rounded-2xl bg-muted p-5">
                  <promo.icon className="h-5 w-5 text-brand" />
                  <h3 className="mt-3 text-base font-semibold text-ink">{promo.title}</h3>
                  <p className="mt-1 text-sm text-body-secondary">{promo.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-muted p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Adjusting Your Prices</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-card p-4">
                <p className="font-semibold text-ink">When to raise</p>
                <p className="mt-2 text-sm text-body-secondary">
                  Higher demand, stronger reviews, rising costs, and increasing expertise.
                </p>
              </div>
              <div className="rounded-xl bg-card p-4">
                <p className="font-semibold text-ink">How to communicate</p>
                <p className="mt-2 text-sm text-body-secondary">
                  Notify customers ahead of time, explain value improvements, and keep your message
                  clear and respectful.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-red p-6 text-ice">
            <h2 className="text-xl font-bold">Key Takeaways</h2>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "Always cover your base costs.",
                "Benchmark before setting your rates.",
                "Promotion can attract leads, don’t devalue your brand.",
                "Review and adjust pricing every 3-6 months.",
              ].map((tip) => (
                <li key={tip} className="inline-flex items-start gap-2">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-surface-soft px-4 py-10 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Ready to update your listing?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-body-secondary sm:text-base">
              Optimized pricing leads to 30% more conversions. Start upgrading your prices today.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-medium text-ice hover:opacity-90 sm:text-base"
            >
              <CircleCheck className="h-4 w-4" />
              Go to Business Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
