import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Refund Policy — AppletPod",
  description: "Refund policy for custom interactive learning applets built by AppletPod.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-2">
          Refund Policy
        </h1>
        <p className="text-sm text-charcoal/40 mb-10">Last updated: April 11, 2026</p>

        <div className="prose prose-sm max-w-none text-charcoal/70 space-y-10">

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">Overview</h2>
            <p>
              AppletPod, operated by <strong>Vamix Technologies Private Limited</strong>, builds
              custom interactive learning applets tailored to each client&apos;s specific curriculum
              and requirements. Because every applet is a bespoke digital product, our refund policy
              reflects the nature of that custom work.
            </p>
            <p className="mt-3">
              We are committed to delivering high-quality applets and will work with you to resolve
              any concerns. This policy explains what to expect if a project needs to be cancelled
              or disputed.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Cancellation before work begins
            </h2>
            <p>
              If you cancel your project <strong>before any work has started</strong> — before we
              have reviewed your materials, drafted structure, or written any code — you are
              eligible for a <strong>full refund</strong> of any amount paid.
            </p>
            <p className="mt-3">
              To cancel before work begins, notify us in writing at{" "}
              <a
                href="mailto:venkatesh@appletpod.com"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                venkatesh@appletpod.com
              </a>{" "}
              as soon as possible. Refunds will be processed within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Cancellation after work has started
            </h2>
            <p>
              If you cancel after work has commenced but <strong>before final delivery</strong>,
              you may be eligible for a partial refund based on the proportion of work not yet
              completed.
            </p>
            <p className="mt-3">
              We will provide a written breakdown of work completed at the time of cancellation.
              The refundable amount is calculated as the total fee minus the value of work already
              done. Partial refunds are issued at our discretion and based on a good-faith
              assessment of progress.
            </p>
            <p className="mt-3">
              Any deliverables completed up to the point of cancellation remain the property of
              Vamix Technologies Private Limited unless full payment for those deliverables has
              been received.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              No refunds after delivery and acceptance
            </h2>
            <p>
              Once a deliverable has been delivered and accepted — or once you have deployed,
              shared, or used the applet with learners — <strong>no refund will be issued</strong>.
            </p>
            <p className="mt-3">
              Acceptance is considered to have occurred if you do not raise a written objection
              within <strong>7 days</strong> of receiving the final deliverable.
            </p>
            <p className="mt-3">
              Every project includes one round of revisions. If the delivered applet does not
              meet the agreed scope, please raise a revision request rather than a refund request.
              We will address scope gaps promptly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Non-refundable situations
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Change of mind after work has begun</li>
              <li>Delays caused by incomplete or late content from the client</li>
              <li>Dissatisfaction with style or design choices that were agreed upon before work started</li>
              <li>Requests for features outside the originally agreed scope</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              Dispute resolution
            </h2>
            <p>
              If you have a concern about a delivery or payment, we ask that you contact us
              directly before escalating. Most issues can be resolved quickly.
            </p>
            <p className="mt-3">
              To raise a dispute, email{" "}
              <a
                href="mailto:venkatesh@appletpod.com"
                className="text-accent hover:text-accent-hover underline underline-offset-2"
              >
                venkatesh@appletpod.com
              </a>{" "}
              with the subject line <strong>&quot;Refund Request — [Project Name]&quot;</strong> and include:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>A description of the issue</li>
              <li>The deliverable or invoice in question</li>
              <li>What resolution you are seeking</li>
            </ul>
            <p className="mt-3">
              We will respond within 3 business days and work toward a fair resolution. Disputes
              that cannot be resolved amicably are subject to the jurisdiction of the courts in
              Bengaluru, Karnataka, India, in accordance with applicable Indian law.
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
                  href="mailto:venkatesh@appletpod.com"
                  className="text-accent hover:text-accent-hover underline underline-offset-2"
                >
                  venkatesh@appletpod.com
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
