export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/[0.06] py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/30">
        <p className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="#E87B35" />
            <circle cx="14" cy="14" r="5" fill="#FFF" />
          </svg>
          AppletPod — AI-Powered Interactive Learning Studio
        </p>
        <p>&copy; 2026 AppletPod</p>
      </div>
    </footer>
  );
}
