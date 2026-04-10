import { ArrowRight, CirclePlay, Grid2x2Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFeaturedProducts } from "@/features/products/useFeaturedProducts";
import { Category } from "@/components/sections/home/Category";
import { Hero } from "@/components/sections/home/hero";
import Featured from "@/components/sections/home/Featured";

export default function Home() {
  const { data: products = [] } = useFeaturedProducts();

  return (
    <div className="min-h-dvh">
      <Hero />
      <Category />
      <Featured />


      {/* <section className=" bg-[#253143] py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center text-center mb-6">
            <p className="text-text-white text-sm font-inter text-center bg-muted/20 px-4 py-2 rounded-full">✨ Join 12,000+ vendors already on Gidira</p>
          </div>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="font-inter font-semibold text-6xl">
              Turn Your Skills Into a{" "}
              <span className="text-primary">Thriving Business</span>{" "}
            </h2>
          </div>
          <div className="my-6">
            <p className="max-w-xl text-popover font-normal text-lg mt-6 mx-auto flex flex-col items-center text-center">
              List your business on Nigeria's fastest-growing marketplace.
              Connect with millions of customers actively searching for your
              services.
            </p>
          </div>
          <div className="mt-4 mb-14">
            <div className="flex justify-center gap-6">
              <div className="">
                <Link
                  to="/"
                  className="bg-primary text-text-white hover:bg-muted font-medium text-base font-inter px-8 py-4 flex items-center gap-2 rounded-lg"
                >
                  <Grid2x2Plus />
                  Start Trading Now
                </Link>
              </div>
              <div className="">
                <Link
                  to="/"
                  className="bg-muted/20 text-text-white hover:bg-primary font-medium text-base font-inter px-8 py-4 flex items-center gap-2 rounded-lg"
                >
                  <CirclePlay />
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto flex justify-between items-center text-center mt-12">
            <div className="">
              <h3 className="font-inter font-semibold text-3xl">12,400+</h3>
              <p className="text-text-secondary text-sm font-inter font-normal mt-2">Active Vendors</p>
            </div>
            <div className="">
              <h3 className="font-inter font-semibold text-3xl">2.1M</h3>
              <p className="text-text-secondary text-sm font-inter font-normal mt-2">Monthly Searches</p>
            </div>
            <div className="">
              <h3 className="font-inter font-semibold text-3xl">98%</h3>
              <p className="text-text-secondary text-sm font-inter font-normal mt-2">Satisfaction Rate</p>
            </div>
            <div className="">
              <h3 className="font-inter font-semibold text-3xl">36</h3>
              <p className="text-text-secondary text-sm font-inter font-normal mt-2">States Covered</p>
            </div>
          </div>
        </div>
      </section> */}
      {/* <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsla(var(--primary)/0.18),transparent_55%)]" />
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">New season</Badge>
                <span className="text-sm text-muted-foreground">
                  Fast delivery • Easy returns • Secure checkout
                </span>
              </div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Everything you need for a modern lifestyle.
              </h1>
              <p className="max-w-prose text-pretty text-muted-foreground">
                Discover curated essentials, trending picks, and deals that feel
                too good to be true. Built for speed, designed for trust.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" className="gap-2">
                  Shop featured <ArrowRight className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline">
                  Browse categories
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2 text-sm">
                <div className="rounded-lg border bg-card p-3">
                  <div className="text-lg font-semibold">24h</div>
                  <div className="text-muted-foreground">Dispatch</div>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <div className="text-lg font-semibold">7d</div>
                  <div className="text-muted-foreground">Returns</div>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <div className="text-lg font-semibold">100%</div>
                  <div className="text-muted-foreground">Secure</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {products.slice(0, 4).map((p) => (
                <Card key={p.id} className="overflow-hidden">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {p.subtitle ?? "Limited stock available"}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 rounded-md bg-[linear-gradient(135deg,hsla(var(--primary)/0.15),transparent_60%)]" />
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-sm font-semibold">
                      ${p.price.amount}
                    </span>
                    <Button size="sm" variant="secondary" type="button">
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Shop by category
              </h2>
              <p className="text-sm text-muted-foreground">
                Find what you love, faster.
              </p>
            </div>
            <Button variant="ghost" type="button">
              View all
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Men", "Women", "Accessories", "Home"].map((c) => (
              <a
                key={c}
                href="#featured"
                className="group rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="mb-4 h-10 w-10 rounded-lg bg-[hsla(var(--primary)/0.12)]" />
                <div className="font-semibold">{c}</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground/80">
                  Explore →
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured products
            </h2>
            <p className="text-sm text-muted-foreground">
              Popular right now. Updated daily.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 h-36 rounded-lg bg-[linear-gradient(135deg,hsla(var(--primary)/0.18),transparent_65%)]" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {p.subtitle ?? "Best seller"}
                      </div>
                    </div>
                    {p.badge ? <Badge>{p.badge}</Badge> : null}
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-sm font-semibold">
                    ${p.price.amount}
                  </span>
                  <Button size="sm" type="button">
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main> */}



      {/* <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} React + Vite + Laravel. All rights
            reserved.
          </div>
          <div className="flex gap-4">
            <a className="hover:text-foreground" href="#">
              Privacy
            </a>
            <a className="hover:text-foreground" href="#">
              Terms
            </a>
            <a className="hover:text-foreground" href="#">
              Support
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
