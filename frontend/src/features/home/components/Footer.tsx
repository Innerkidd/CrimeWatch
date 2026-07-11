import { Shield, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Interactive Map', href: '/map' },
  { label: 'Report Crime', href: '/reports' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Reports', href: '/my-reports' },
];

const emergencyNumbers = [
  { label: 'Police', number: '100' },
  { label: 'Ambulance', number: '108' },
  { label: 'Fire', number: '101' },
  { label: 'Women Helpline', number: '1091' },
  { label: 'Cyber Crime', number: '1930' },
];

export const Footer = () => {
  return (
    <footer id="footer" className="relative border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Shield className="w-7 h-7 text-blue-500" />
              <span className="text-lg font-bold tracking-wider">
                <span className="text-white">CRIME</span>
                <span className="text-blue-400">WATCH</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Empowering citizens to report crimes, track trends, and build
              safer communities through real-time collaboration with law
              enforcement.
            </p>
            <div className="flex items-center gap-3">
              {/* Social Icons */}
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                    aria-label={platform}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Emergency Numbers
            </h4>
            <ul className="space-y-3">
              {emergencyNumbers.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    {item.label}:{' '}
                    <span className="font-semibold text-white">
                      {item.number}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">
                  123 Safety Avenue, Tech City, TC 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:info@crimewatch.gov"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  info@crimewatch.gov
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+1800123456"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  +1 (800) 123-456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} CrimeWatch. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
