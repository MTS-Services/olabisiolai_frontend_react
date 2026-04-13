import type { ReactNode } from "react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-6 flex list-none flex-col gap-2 pl-0">
      {items.map((line) => (
        <li key={line} className="text-base leading-6 text-body-secondary">
          • {line}
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="lg:text-2xl text-xl font-bold leading-8 text-ink-heading">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <div className="w-full bg-muted">
      <div className={cn(container, "flex flex-col gap-6 py-16 sm:py-20")}>
        <header className="flex w-full flex-col gap-2">
          <h1 className="lg:text-4xl text-2xl font-bold leading-10 text-ink-heading">
            Terms &amp; Conditions
          </h1>
          <p className="text-base leading-6 text-body-secondary">
            Last updated: March 29, 2026
          </p>
        </header>

        <article
          className={cn(
            "flex w-full  flex-col gap-8 self-center rounded-2xl bg-card p-8 shadow-md",
          )}
        >
          <Section title="1. Acceptance of Terms">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              By accessing and using Gidira (&quot;the Platform&quot;), you accept
              and agree to be bound by the terms and provision of this agreement.
              If you do not agree to these Terms &amp; Conditions, please do not use
              the Platform.
            </p>
          </Section>

          <Section title="2. Businesses Description">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Gidira is a multi-service marketplace platform that connects
              customers with Business providers across Nigeria. We provide:
            </p>
            <BulletList
              items={[
                "Business directory and listing services",
                "Verification services for business authenticity",
                "Featured placement advertising options",
                "Direct communication facilitation via WhatsApp and phone",
                "Review and rating systems",
              ]}
            />
          </Section>

          <Section title="3. User Accounts">
            <p className="text-base leading-relaxed text-body-secondary">
              To access certain features of the Platform, you must create an
              account. You agree to:
            </p>
            <BulletList
              items={[
                "Provide accurate and complete information",
                "Maintain the security of your password and account",
                "Notify us immediately of any unauthorized use",
                "Accept responsibility for all activities under your account",
              ]}
            />
          </Section>

          <Section title="4. Business Listings">
            <p className="text-base leading-relaxed text-body-secondary">
              Service providers who list their businesses on Gidira agree to:
            </p>
            <BulletList
              items={[
                "Provide accurate business information",
                "Maintain valid contact details",
                "Comply with all applicable Nigerian laws and regulations",
                "Not engage in fraudulent or deceptive practices",
                "Respond to customer inquiries in a timely manner",
              ]}
            />
          </Section>

          <Section title="5. Verification Process">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Verified badges are awarded to businesses that have completed our
              verification process and paid the annual verification fee.
              Verification does not constitute an endorsement or guarantee of
              service quality. Gidira reserves the right to revoke verification
              status for businesses that violate our terms or engage in fraudulent
              activities.
            </p>
          </Section>

          <Section title="6. Featured Listings">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Featured listing placements are paid advertising positions. Payment
              must be made via Paystack. Featured positions do not guarantee
              customer engagement or business results. Refunds are not provided for
              featured placements once activated.
            </p>
          </Section>

          <Section title="7. User Conduct">
            <p className="text-base leading-relaxed text-body-secondary">
              Users agree not to:
            </p>
            <BulletList
              items={[
                "Post false, misleading, or fraudulent information",
                "Harass, abuse, or harm other users",
                "Violate any applicable laws or regulations",
                "Attempt to gain unauthorized access to the Platform",
                "Use automated systems to access the Platform",
                "Post spam or unsolicited promotional content",
              ]}
            />
          </Section>

          <Section title="8. Reviews and Ratings">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Reviews must be honest, genuine, and based on actual experiences.
              Gidira reserves the right to remove reviews that are fraudulent,
              abusive, or violate our community guidelines. Service providers may
              not incentivize or pay for positive reviews.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Gidira is a platform that connects customers with service providers.
              We do not provide the services listed on the Platform and are not
              responsible for the quality, legality, or safety of services
              provided by third-party vendors. Users engage with service providers
              at their own risk.
            </p>
          </Section>

          <Section title="10. Intellectual Property">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              All content on the Gidira Platform, including logos, designs, text,
              and software, is the property of Gidira and is protected by Nigerian
              and international copyright laws. Users may not reproduce, distribute,
              or create derivative works without express written permission.
            </p>
          </Section>

          <Section title="11. Termination">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Gidira reserves the right to suspend or terminate accounts that
              violate these Terms &amp; Conditions or engage in fraudulent
              activities. Users may close their accounts at any time by contacting
              support.
            </p>
          </Section>

          <Section title="12. Changes to Terms">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              Gidira reserves the right to modify these Terms &amp; Conditions at
              any time. Users will be notified of significant changes via email or
              platform notifications. Continued use of the Platform after changes
              constitutes acceptance of the new terms.
            </p>
          </Section>

          <Section title="13. Governing Law">
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
              These Terms &amp; Conditions are governed by the laws of the Federal
              Republic of Nigeria. Any disputes arising from the use of the
              Platform shall be resolved in Nigerian courts.
            </p>
          </Section>

          <Section title="14. Contact Information">
            <div className="flex flex-col gap-1 text-base leading-relaxed text-body-secondary">
              <p>
                For questions about these Terms &amp; Conditions, please contact
                us at:
              </p>
              <p>Email: hello@gidira.com</p>
              <p>Phone: +2349047858961</p>
            </div>
          </Section>
        </article>
      </div>
    </div>
  );
}
