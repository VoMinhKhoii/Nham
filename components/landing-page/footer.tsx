export function Footer() {
  return (
    <footer className="relative border-[#E8D5B5]/30 border-t bg-[#FEFBF6]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="mb-4 font-medium text-2xl text-[#2C2416]"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Nham
            </div>
            <p
              className="max-w-sm text-[#6B5D4F] leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              The macro tracker that learns your habits. Track what you eat, not
              what you search.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4
              className="mb-4 font-medium text-[#2C2416]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4
              className="mb-4 font-medium text-[#2C2416]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B5D4F] text-sm transition-colors hover:text-[#2C2416]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-[#E8D5B5]/30 border-t pt-8 md:flex-row">
          <p
            className="text-[#8B7355] text-sm"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            © 2026 PrecisionTrack. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[#8B7355] text-sm transition-colors hover:text-[#2C2416]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Terms
            </a>
            <a
              href="#"
              className="text-[#8B7355] text-sm transition-colors hover:text-[#2C2416]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[#8B7355] text-sm transition-colors hover:text-[#2C2416]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
