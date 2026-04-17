import {
  ArrowUpRight,
  CheckCircle2,
  Heart,
  ListFilter,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import { FrontendHeader } from "@/components/partials/frontend/FrontendHeader";
import { UserSidebar } from "@/components/partials/user/UserSidebar";
import { Button } from "@/components/ui/button";

const LOGO_FOOTER = "/images/landing/gidira-logo-footer.svg";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Gidira", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Cookies Policy", to: "/cookies-policy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Business Tips", to: "/business-tips" },
      { label: "FAQs", to: "/faq" },
    ],
  },
] as const;

const favorites = [
  {
    title: "Premium Plumbing Services",
    category: "Plumbing",
    location: "Lagos, Ikeja",
    rating: "4.8",
    reviews: 127,
    description:
      "Professional plumbing services for residential and commercial properties. Available 24/7 for emergencies.",
    image: "/images/favorites/premium-plumbing.jpg",
  },
  {
    title: "Sparkle Clean Services",
    category: "Cleaning",
    location: "Lagos, Surulere",
    rating: "4.6",
    reviews: 207,
    description:
      "Professional cleaning services for homes and offices. Eco-friendly products available.",
    image: "/images/favorites/sparkle-clean.jpg",
  },
  {
    title: "PremiumElite Electrical SolutionsPlumbing Services",
    category: "Plumbing Electrical",
    location: "Lagos, Victoria Island",
    rating: "4.8",
    reviews: 207,
    description:
      "Certified electricians providing safe and reliable electrical installations and repairs.",
    image: "/images/favorites/elite-electrical.jpg",
  },
  {
    title: "Glamour Beauty Spa",
    category: "Beauty & Spa",
    location: "Lagos, Lekki",
    rating: "4.8",
    reviews: 127,
    description: "Luxury spa and beauty treatments in a relaxing environment.",
    image: "/images/favorites/glamour-spa.jpg",
  },
] as const;

function FavoriteCard({
  item,
}: {
  item: (typeof favorites)[number];
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border-light bg-card shadow-sm">
      <div className="relative h-48 bg-muted">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3">
          <Heart className="size-5 fill-chat-accent text-chat-accent" aria-hidden />
        </div>
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-footer-bar px-3 py-1 text-[11px] font-semibold text-ice">
          <CheckCircle2 className="size-3.5" aria-hidden />
          VERIFIED
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 text-lg font-semibold leading-7 text-ink-heading">{item.title}</h3>
        <div className="space-y-1">
          <p className="text-sm font-medium text-footer-bar">{item.category}</p>
          <p className="inline-flex items-center gap-1 text-sm text-body-secondary">
            <MapPin className="size-3.5" aria-hidden />
            {item.location}
          </p>
        </div>
        <p className="inline-flex items-center gap-1 text-sm">
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          <span className="font-medium text-ink-heading">{item.rating}</span>
          <span className="text-chat-meta">({item.reviews})</span>
        </p>
        <p className="line-clamp-2 text-sm leading-5 text-body-secondary">{item.description}</p>

        <div className="space-y-2 pt-1">
          <Button className="h-11 w-full rounded-xl bg-brand-red text-base font-medium text-ice hover:bg-brand-red/90">
            <Phone className="size-4" aria-hidden />
            Show phone number
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full rounded-xl border-brand bg-surface-soft text-base font-medium text-brand hover:bg-surface-wash"
          >
            <MessageCircle className="size-4" aria-hidden />
            Direct Message
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function Favorites() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <FrontendHeader />

      <main className="bg-auth-bg">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row">
          <UserSidebar active="favorites" />

          <section className="min-h-screen flex-1 bg-chat-surface p-4 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-black text-ink">Favorites</h1>
                <p className="mt-2 text-base font-medium text-body-secondary">
                  Manage and book your curated list of preferred service providers.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-14 items-center gap-3 self-start rounded-full bg-surface-soft px-6 text-sm font-semibold leading-none text-chat-accent shadow-none"
              >
                <ListFilter className="size-5 text-chat-accent" strokeWidth={2.2} aria-hidden />
                All Services
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
              {favorites.map((item) => (
                <FavoriteCard key={item.title} item={item} />
              ))}
            </div>

            <section className="mt-8 flex flex-col gap-5 rounded-3xl border border-success/10 bg-brand p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-ice">Want to discover more?</h2>
                <p className="mt-2 max-w-xl text-base font-medium leading-6 text-ice">
                  Based on your favorites, we think you&apos;ll love these personalized recommendations
                  in your area.
                </p>
              </div>
              <Button className="h-14 rounded-full bg-brand-red px-8 text-base font-semibold text-ice hover:bg-brand-red/90">
                Explore More Services
                <ArrowUpRight className="size-5" aria-hidden />
              </Button>
            </section>
          </section>
        </div>
      </main>

      <footer className="bg-footer-bar">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-14 xl:px-12">
          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            <div>
              <img src={LOGO_FOOTER} alt="Gidira" className="h-8 w-auto" />
              <p className="mt-4 text-sm text-white">FIND BETTER | CONNECT FASTER</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-base font-semibold text-white">{column.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to} className="text-sm text-footer-muted hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-footer-muted">
              © 2026 GIDIRA. All rights reserved. Built for Nigeria&apos;s Digital Economy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
