import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Privacy Policy — AppletPod",
  description: "How Vamix Technologies Private Limited collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-charcoal/40 mb-10">Last updated: March 22, 2026</p>

        <div className="prose prose-sm max-w-none text-charcoal/70 space-y-10">

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Who we are</h2>
            <p>
              AppletPod is operated by <strong>Vamix Technologies Private Limited</strong> (CIN:
              U62013KA2025PTC206643), a company registered in Bengaluru, India. When this policy
              says "we", "us", or "our", it refers to Vamix Technologies Private Limited.
            </p>
            <p className="mt-3">
              We build custom interactive learning applets for educational institutions, edtech
              companies, and training teams.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">What we collect</h2>
            <p>We collect information in two ways:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong>Information you give us directly</strong> — your name, email address,
                company name, and project details when you fill out a contact form, book a call,
                or send us an email.
              </li>
              <li>
                <strong>Information collected automatically</strong> — anonymous usage data via
                Google Analytics 4 (pages visited, time on site, device type). This data does not
                identify you personally.
              </li>
            </ul>
            <p className="mt-3">
              We do not collect payment details directly. Any payments are processed through
              third-party platforms under their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">How we use it</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To respond to your enquiries and deliver the services you've requested</li>
              <li>To communicate project updates, timelines, and deliverables</li>
              <li>To improve our website and understand how visitors use it</li>
              <li>To send occasional service-related updates (not marketing spam)</li>
            </ul>
            <p className="mt-3">We do not sell your data to anyone, ever.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Third parties</h2>
            <p>
              We use a small number of trusted tools to run our business. Your information may
              pass through:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong>Cal.com</strong> — for scheduling calls. Governed by Cal.com&apos;s own
                privacy policy.
              </li>
              <li>
                <strong>Google Analytics 4</strong> — for anonymous site analytics.
              </li>
              <li>
                <strong>Email providers</strong> — for responding to your messages.
              </li>
            </ul>
            <p className="mt-3">
              We do not share your personal information with any third party for marketing
              purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Your rights</h2>
            <p>
              Under India&apos;s Digital Personal Data Protection Act (DPDPA) and the EU&apos;s
              General Data Protection Regulation (GDPR), you have the right to:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for processing at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:Venkatesh@appletpod.com"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                Venkatesh@appletpod.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Cookies</h2>
            <p>
              We use cookies for anonymous analytics only (Google Analytics 4). We do not use
              advertising or tracking cookies.
            </p>
            <p className="mt-3">
              You can disable cookies in your browser settings at any time. This will not affect
              your ability to use our site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Data retention</h2>
            <p>
              We keep your information for as long as is necessary to deliver the services you
              requested or to meet our legal obligations. Project-related communications are
              retained for a minimum of 3 years for accounting and compliance purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. When we do, we&apos;ll update the
              &quot;last updated&quot; date at the top of this page. Continued use of our services
              after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Contact</h2>
            <p>Questions about this policy? Reach us at:</p>
            <div className="mt-3 space-y-1">
              <p>
                <strong>Vamix Technologies Private Limited</strong>
              </p>
              <p>Bengaluru, Karnataka, India</p>
              <p>
                <a
                  href="mailto:Venkatesh@appletpod.com"
                  className="text-accent hover:text-accent-hover underline underline-offset-2"
                >
                  Venkatesh@appletpod.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
