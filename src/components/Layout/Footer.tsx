import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // ✅ WhatsApp icon


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-pink-500 mr-2" />
              <span className="text-xl font-bold">Mohini Undergarments</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted destination for comfortable, elegant, and high-quality intimate wear.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/mohini_undergarment?igsh=bnI3ampzaTI0Y3h4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a
                href="https://wa.me/919924738720"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
          </div>

        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Products</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Care Instructions</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-pink-500 mr-2" />
              <span className="text-gray-400">+91 99247 38720</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-pink-500 mr-2" />
              <span className="text-gray-400">info@mohini.com</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-pink-500 mr-2 mt-1" />
              <span className="text-gray-400">
                Kubernagar,<br />
                Katargaam Darwaja, Surat 395004
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 Mohini Undergarments. All rights reserved. Made with ❤️ for comfort and confidence.
        </p>
      </div>
    </div>
    </footer >
  );
};

export default Footer;