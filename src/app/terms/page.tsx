import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Terms of Service — AppletPod",
  description: "Terms governing use of AppletPod services by Vamix Technologies Private Limited.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-charcoal/40 mb-10">Last updated: March 22, 2026</p>

        <div className="prose prose-sm max-w-none text-charcoal/70 space-y-10">

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Agreement to terms</h2>
            <p>
              By using AppletPod or engaging our services, you agree to be bound by these Terms of
              Service. AppletPod is operated by <strong>Vamix Technologies Private Limited</strong>{" "}
              (CIN: U62013KA2025PTC206643), a company registered in Bengaluru, India.
            </p>
            <p className="mt-3">
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Services</h2>
            <p>
              AppletPod builds custom interactive learning applets — React-based, offline-ready
              educational content — from client-supplied curriculum, raw notes, recordings, or
              storyboards.
            </p>
            <p className="mt-3">
              The specific scope, deliverables, and timeline for each engagement are confirmed
              before work begins. Any scope agreed in writing (email or messaging) forms part of
              the service agreement.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              AI-generated content
            </h2>
            <p>
              Our production process uses AI tools to assist with code generation, layout, and
              content structuring. Every applet is reviewed by an experienced instructional
              designer before delivery.
            </p>
            <p className="mt-3">
              AI-assisted content is provided for educational and informational purposes. It should
              not be taken as professional, medical, legal, or financial advice. We make no
              guarantee that AI-generated portions are error-free, and we recommend clients review
              all deliverables before deploying to learners.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Payments &amp; refunds
            </h2>
            <p>
              All payments are non-refundable once work has commenced, unless explicitly agreed
              otherwise in writing prior to project start.
            </p>
            <p className="mt-3">
              For projects with staged payments, each stage is non-refundable upon completion of
              that stage&apos;s deliverables. We include one round of revisions in every project.
              Additional revision rounds may be billed separately.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Intellectual property
            </h2>
            <p>
              Upon receipt of full payment, all intellectual property rights for the delivered
              applets — including source code, assets, and associated files — are transferred to
              the client, unless otherwise specified in writing.
            </p>
            <p className="mt-3">
              Vamix Technologies Private Limited retains ownership of its proprietary tools,
              frameworks, and internal workflows used to build applets. These are not transferred
              as part of any engagement.
            </p>
            <p className="mt-3">
              All content provided by the client (curriculum, materials, logos, brand assets)
              remains the property of the client.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Client responsibilities
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                Provide accurate, complete information needed to deliver the agreed scope
              </li>
              <li>
                Ensure you have the rights to any content, materials, or assets you provide to us
              </li>
              <li>
                Not use our services for any unlawful purpose or in violation of any applicable
                regulations
              </li>
              <li>
                Review and test delivered applets before deploying them to end users
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Limitation of liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Vamix Technologies Private
              Limited&apos;s total liability to you for any claim arising from or related to these
              terms or our services shall not exceed the total amounts paid by you to us in the
              twelve (12) months preceding the claim.
            </p>
            <p className="mt-3">
              We are not liable for any indirect, incidental, consequential, or punitive damages
              arising from use of our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Disclaimer</h2>
            <p>
              Our services are provided &quot;as is&quot; without warranties of any kind, express
              or implied, including but not limited to fitness for a particular purpose or
              non-infringement. We do not warrant that deliverables will be error-free or meet
              every specific learning outcome.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. When we do, we&apos;ll update the
              &quot;last updated&quot; date at the top of this page. Continued use of our services
              after any changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Governing law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India.
              Any disputes arising from these terms or our services shall be subject to the
              exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Contact</h2>
            <p>Questions about these terms? Reach us at:</p>
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
