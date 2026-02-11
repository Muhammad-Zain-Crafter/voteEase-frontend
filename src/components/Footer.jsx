import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand / Logo */}
          <div>
            <img src={logo} alt="Voting Logo" className="h-12 mb-4" />
            <p className="text-sm text-gray-100">
              Your Voice, Your Choice, Your Vote. Secure and transparent online
              elections for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/candidates" className="hover:underline">
                  Candidates
                </a>
              </li>
              <li>
                <a href="/results" className="hover:underline">
                  Results
                </a>
              </li>
              <li>
                <a href="/login" className="hover:underline">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/help" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@onlinevoting.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +92 123 456 789
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Karachi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
      </footer>
      <div className="bg-gray-900 text-gray-300 text-center py-4 shadow-inner">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Online Voting System</span>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
