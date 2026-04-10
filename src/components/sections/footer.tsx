import Image from "next/image";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/[0.06] py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-white/30">
        <p className="flex items-center gap-2">
          <Image src="/logo.png" alt="AppletPod" width={16} height={16} />
          AppletPod
        </p>
        <div className="flex items-center gap-5">
          <a
            href="/privacy"
            className="hover:text-white/60 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-white/60 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/refund-policy"
            className="hover:text-white/60 transition-colors duration-200"
          >
            Refund Policy
          </a>
          <a
            href="https://www.linkedin.com/company/appletpod"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors duration-200"
            aria-label="AppletPod on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
        <p>&copy; 2026 VAMIX Technologies Pvt Ltd</p>
      </div>
    </footer>
  );
}
