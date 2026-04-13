import type { ReactNode } from "react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold leading-7 text-ink-heading">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 flex list-disc flex-col gap-1 text-sm leading-6 text-body-secondary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-muted">
      <div className={cn(container, "flex flex-col gap-5 py-10 sm:py-14")}>
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold leading-10 text-ink-heading">Privacy Policy</h1>
          <p className="text-sm text-body-secondary">Last updated: March 29, 2026</p>
        </header>

        <article className="flex w-full flex-col gap-7 rounded-2xl border border-border-gray bg-card p-6 shadow-sm sm:p-8">
          <Section title="1. Introduction">
            <p className="text-sm leading-6 text-body-secondary">
              Gidira (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting
              your privacy. This policy explains how we collect, use, disclose, and safeguard your
              information when you use our platform.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <BulletList
              items={[
                "Account information: name, email, address, phone number, and password.",
                "Business information: business name, category, location, services, and contact details.",
                "Payment information: payment records processed through secure providers.",
                "User content: reviews, ratings, messages, and profile updates.",
                "Communication data: interactions with customer support.",
              ]}
            />
          </Section>

          <Section title="3. Automatically Collected Information">
            <BulletList
              items={[
                "Device information: device type, operating system, browser, IP address.",
                "Usage data: pages viewed, time spent, clicks, and interactions.",
                "Location data: general region from network and device settings.",
                "Cookies and similar technologies for functionality and analytics.",
              ]}
            />
          </Section>

          <Section title="4. How We Use Your Information">
            <BulletList
              items={[
                "Provide, maintain, and improve our services.",
                "Process transactions and send related notifications.",
                "Verify business identities and prevent fraud.",
                "Send service updates, support messages, and important alerts.",
                "Personalize your experience on the platform.",
                "Comply with legal obligations.",
              ]}
            />
          </Section>

          <Section title="5. Information Sharing and Disclosure">
            <BulletList
              items={[
                "Public listings: profile details visible to users who browse the marketplace.",
                "Service providers: trusted third parties who assist with operations.",
                "Payment processors: secure processors for subscription and listing payments.",
                "Legal requirements: when required by law or to protect our rights.",
                "Business transfers: in connection with mergers, sales, or restructures.",
              ]}
            />
          </Section>

          <Section title="6. Contact Information Visibility">
            <p className="text-sm leading-6 text-body-secondary">
              To connect users and service providers, certain contact details may appear on public
              listings (for example business phone number, WhatsApp link, and location details).
            </p>
          </Section>

          <Section title="7. Data Security">
            <p className="text-sm leading-6 text-body-secondary">
              We apply appropriate technical and organizational safeguards to protect personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </Section>

          <Section title="8. Data Retention">
            <p className="text-sm leading-6 text-body-secondary">
              We retain data only as long as needed for legitimate business purposes, legal
              requirements, and service quality obligations.
            </p>
          </Section>

          <Section title="9. Your Rights and Choices">
            <BulletList
              items={[
                "Access and request correction of personal information.",
                "Request account deletion and restriction where applicable.",
                "Manage communication preferences and notifications.",
                "Request data portability where applicable.",
              ]}
            />
          </Section>

          <Section title="10. Contact Us">
            <div className="text-sm leading-6 text-body-secondary">
              <p>Email: privacy@gidira.ng</p>
              <p>Phone: +234 803 123 4567</p>
              <p>Address: Lagos, Nigeria</p>
            </div>
          </Section>
        </article>
      </div>
    </div>
  );
}
