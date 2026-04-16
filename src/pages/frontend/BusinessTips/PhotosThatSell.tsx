import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Icon,
  Shirt,
  Sparkles,
  Sun,
  Upload,
  User,
  Utensils,
  Wrench,
} from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/images/feature/1-2.jpg";
const PRODUCT_IN_USE_IMAGE = "/images/feature/1-4.jpg";

export default function PhotosThatSell() {
  return (
    <div className="w-full bg-background">
      <section className="relative overflow-hidden bg-ink py-14 sm:py-20 lg:py-28">
        <div className={cn(container, "relative z-10 flex flex-col items-center text-center")}>
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 text-success">
            <Camera className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-ice sm:text-4xl lg:text-6xl">Photos That Sell</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-stat-muted sm:text-base sm:leading-7 lg:text-2xl lg:leading-10">
            Learn how to take professional-quality photos that attract more customers and
            build trust for your Nigerian business.
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Why Photos Matter</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <div className="space-y-4 text-base leading-7 text-body-secondary sm:text-lg sm:leading-8">
                <p>
                  In today&apos;s digital marketplace, your photos are your first impression.
                  High-quality imagery doesn&apos;t just show what you sell; it communicates
                  professionalism, reliability, and attention to detail.
                </p>
                <p>
                  Studies show that businesses with professional imagery on Gidira see up to{" "}
                  <span className="font-semibold text-success">40% more inquiries</span> than those
                  with low-quality or missing photos.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-2 shadow-md">
                <img
                  src={HERO_IMAGE}
                  alt="Interior of a modern boutique with curated products"
                  className="h-56 w-full rounded-xl object-cover sm:h-72"
                />
              </div>
            </div>
            <div className="rounded-r-xl border-l-4 border-success bg-success/10 p-5 sm:p-6">
              <p className="text-sm font-semibold text-ink">Gidira Insight</p>
              <p className="mt-1 text-sm italic leading-6 text-body-secondary sm:text-base">
                &quot;Customers in Nigeria value authenticity. Avoid stock photos whenever possible;
                real photos of your workspace or products build immediate rapport.&quot;
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Equipment You Already Have</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Back Camera",
                  text: "Always use the main rear camera. It has significantly higher resolution than the selfie camera.",
                },
                {
                  title: "Clean Lenses",
                  text: "A simple wipe with a soft cloth removes fingerprints that cause hazy or blurry photos.",
                },
                {
                  title: "Multiple Angles",
                  text: "Don’t just take one shot. Capture close-ups, wide views, and the product being used.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-muted p-6">
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-body-secondary">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">Mastering Light</h2>
              <div className="h-px flex-1 bg-border-gray" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-ink">
                  <Sun className="h-5 w-5 text-brand" />
                  Natural vs. Artificial
                </h3>
                <p className="text-base leading-7 text-body-secondary">
                  Natural daylight is your best friend. It provides accurate color
                  representation and soft shadows. Artificial indoor lighting often creates a
                  yellow or green tint that makes products look unappealing.
                </p>
                <div className="rounded-2xl bg-success/10 p-5">
                  <p className="text-sm font-semibold text-success">Lagos Tip</p>
                  <p className="mt-2 text-sm leading-6 text-success">
                    The best light in Lagos is between <span className="font-semibold">7-9am</span>{" "}
                    and <span className="font-semibold">4-6pm</span>. Avoid mid-day sun (12-2pm) as
                    it creates harsh, dark shadows on faces and products.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-card p-6 shadow-md">
                  <h4 className="text-lg font-semibold text-ink">Window Light Technique</h4>
                  <p className="mt-2 text-sm leading-6 text-body-secondary">
                    Place your subject near a window, but not in direct sunlight. Use a white
                    piece of cardboard on the opposite side to bounce light back and fill in
                    shadows.
                  </p>
                </div>
                <div className="rounded-2xl bg-card p-6 shadow-md">
                  <h4 className="text-lg font-semibold text-ink">Avoid Harsh Shadows</h4>
                  <p className="mt-2 text-sm leading-6 text-body-secondary">
                    Never use your phone&apos;s built-in flash. It flattens the image and creates
                    distracting reflections on shiny surfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-ink p-8 text-ice">
              <h3 className="text-2xl font-bold">Composition Basics</h3>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-stat-muted sm:text-base">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span>
                    <span className="font-semibold">Rule of Thirds:</span> Place your main subject
                    slightly off-center for a more dynamic look.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span>
                    <span className="font-semibold">Clean Backgrounds:</span> Ensure there is no
                    clutter (trash, cables, busy patterns) behind your subject.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border-2 border-border-gray bg-card p-8">
              <h3 className="text-2xl font-bold text-ink">Show Products in Use</h3>
              <p className="mt-3 text-base leading-7 text-body-secondary">
                Help customers visualize your product in their lives. Instead of just a shoe,
                show someone walking in it.
              </p>
              <img
                src={PRODUCT_IN_USE_IMAGE}
                alt="Lifestyle shot of a wristwatch while working on a laptop"
                className="mt-5 h-32 w-full rounded-xl object-cover sm:h-40"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-muted p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Editing on Your Phone</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-ink">Recommended Free Apps</h3>
                <div className="mt-4 space-y-3">
                  {["Snapseed", "Lightroom Mobile", "Adobe Express"].map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm"
                    >
                      <div className="h-9 w-9 rounded-lg bg-surface-soft" />
                      <p className="font-medium text-ink">{app}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-ink">Basic Adjustments</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Brightness: Fix underexposed shots.",
                    "Contrast: Make colors pop.",
                    "Saturation: Enhance natural tones.",
                    "Sharpness: Define fine details.",
                    "Crop: Remove distracting edges.",
                  ].map((line) => (
                    <div
                      key={line}
                      className="rounded-lg bg-card/70 p-3 text-sm font-medium text-ink"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Industry Specific Tips Section */}
            <div className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Industry Specific Tips
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Food & Restaurants */}
                <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-emerald-600">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Food & Restaurants</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Shoot from directly above (flat lay) or a 45-degree angle. Garnish for color.
                    </p>
                  </div>
                </div>

                {/* Fashion & Clothing */}
                <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-emerald-600">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 16C0.716667 16 0.479167 15.9042 0.2875 15.7125C0.0958333 15.5208 0 15.2833 0 15C0 14.8333 0.0333333 14.6792 0.1 14.5375C0.166667 14.3958 0.266667 14.2833 0.4 14.2L9 7.75V6C9 5.71667 9.1 5.47917 9.3 5.2875C9.5 5.09583 9.74167 5 10.025 5C10.4417 5 10.7917 4.85 11.075 4.55C11.3583 4.25 11.5 3.89167 11.5 3.475C11.5 3.05833 11.3542 2.70833 11.0625 2.425C10.7708 2.14167 10.4167 2 10 2C9.58333 2 9.22917 2.14583 8.9375 2.4375C8.64583 2.72917 8.5 3.08333 8.5 3.5H6.5C6.5 2.53333 6.84167 1.70833 7.525 1.025C8.20833 0.341667 9.03333 0 10 0C10.9667 0 11.7917 0.3375 12.475 1.0125C13.1583 1.6875 13.5 2.50833 13.5 3.475C13.5 4.25833 13.2708 4.95833 12.8125 5.575C12.3542 6.19167 11.75 6.61667 11 6.85V7.75L19.6 14.2C19.7333 14.2833 19.8333 14.3958 19.9 14.5375C19.9667 14.6792 20 14.8333 20 15C20 15.2833 19.9042 15.5208 19.7125 15.7125C19.5208 15.9042 19.2833 16 19 16H1ZM4 14H16L10 9.5L4 14Z" fill="#006D36"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Fashion & Clothing</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Show texture details. Use models or high-quality mannequins.
                    </p>
                  </div>
                </div>

                {/* Beauty & Salon */}
                <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-emerald-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Beauty & Salon</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Focus on "Before & After" shots with consistent lighting.
                    </p>
                  </div>
                </div>

                {/* Tech & Repair */}
                <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-emerald-600">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Tech & Repair</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Show the internal components and the precision of your tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          <div className="rounded-3xl bg-ink p-6 sm:p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-ice">Uploading to Gidira</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                {[
                  ["Cover Photo", "1200 x 400px"],
                  ["Profile Image", "400 x 400px"],
                  ["Gallery Photos", "Min 800 x 800px"],
                ].map(([label, size]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-white/10 pb-3"
                  >
                    <span className="text-base text-ice">{label}</span>
                    <span className="font-mono text-sm text-success">{size}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                <p className="flex items-center gap-2 text-base font-semibold text-surface-soft">
                  <Sparkles className="h-4 w-4" />
                  Pro Tip: Gallery Organization
                </p>
                <p className="mt-3 text-sm leading-6 text-stat-muted">
                  Group your photos logically. Customers usually look at the first 3 photos in
                  your gallery. Make them your absolute best hero shots.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-success/20 bg-surface-soft px-4 py-10 text-center sm:px-6 lg:px-8 lg:py-14">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl lg:text-5xl">
              Ready to Level Up Your Gidira Profile?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-body-secondary sm:text-lg sm:leading-8">
              Start implementing these tips today and watch your engagement grow. A better profile
              means better business.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-medium text-ice hover:opacity-90 sm:text-base"
            >
              <Upload className="h-4 w-4" />
              Upgrade Your Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
