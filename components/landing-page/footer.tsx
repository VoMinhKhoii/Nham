export function Footer() {
  return (
    <footer className="relative border-t border-[#E8D5B5]/30 bg-[#FEFBF6]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-medium text-[#2C2416] mb-4" style={{ fontFamily: 'Lora, serif' }}>
              PrecisionTrack
            </div>
            <p className="text-[#6B5D4F] max-w-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              The macro tracker that learns your habits. 
              Track what you eat, not what you search.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-[#2C2416] font-medium mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[#2C2416] font-medium mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B5D4F] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8D5B5]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8B7355] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            © 2026 PrecisionTrack. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#8B7355] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Terms
            </a>
            <a href="#" className="text-[#8B7355] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Privacy
            </a>
            <a href="#" className="text-[#8B7355] hover:text-[#2C2416] transition-colors text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
