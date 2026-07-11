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
  { label: 'Police Department', number: '100' },
  { label: 'Ambulance Services', number: '108' },
  { label: 'Fire Department', number: '101' },
  { label: 'Women Helpline', number: '1091' },
  { label: 'Cyber Crime Desk', number: '1930' },
];

export const Footer = () => {
  return (
    <footer id="footer" className="relative border-t border-cyber-cyan/15 bg-cyber-void overflow-hidden">
      {/* Grid background layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 font-orbitron">
              <Shield className="w-7 h-7 text-cyber-cyan glow-cyan" />
              <span className="text-lg font-black tracking-widest">
                <span className="text-white">CRIME</span>
                <span className="text-cyber-cyan glow-cyan">WATCH</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-tech uppercase tracking-wide mb-6">
              // Sentinel network securing city grids. Collaborating citizens and law enforcement nodes.
            </p>
            <div className="flex items-center gap-3">
              {/* Social Icons */}
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-9 h-9 border border-cyber-cyan/15 bg-cyber-cyan/5 flex items-center justify-center text-cyber-cyan hover:text-white hover:bg-cyber-cyan/20 hover:border-cyber-cyan/30 transition-all duration-200"
                    aria-label={platform}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-cyber-cyan glow-cyan uppercase tracking-widest mb-4 font-orbitron">
              // INDEX_MENU
            </h4>
            <ul className="space-y-3 font-tech text-xs tracking-wider uppercase">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h4 className="text-xs font-bold text-cyber-pink glow-pink uppercase tracking-widest mb-4 font-orbitron">
              // DANGER_UPLINK
            </h4>
            <ul className="space-y-3 font-tech text-xs tracking-wider uppercase">
              {emergencyNumbers.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyber-pink glow-pink flex-shrink-0 animate-pulse" />
                  <span className="text-slate-400">
                    {item.label}:{' '}
                    <span className="font-bold text-cyber-pink glow-pink">
                      {item.number}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-cyber-cyan glow-cyan uppercase tracking-widest mb-4 font-orbitron">
              // CONTACT_NODES
            </h4>
            <ul className="space-y-3 font-tech text-xs tracking-wider uppercase">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyber-cyan glow-cyan mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">
                  123 SAFETY AVE, TECH SECTOR, NOD_10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyber-cyan glow-cyan flex-shrink-0" />
                <a
                  href="mailto:info@crimewatch.gov"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  INFO@CRIMEWATCH.GOV
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyber-cyan glow-cyan flex-shrink-0" />
                <a
                  href="tel:+1800123456"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +1 (800) 123-456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cyber-cyan/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-[10px] tracking-widest uppercase">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} CRIMEWATCH_MAIN. SYS_VER_2.10
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
            >
              PRIV_POLICY
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
            >
              TERMS_CONDITIONS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
