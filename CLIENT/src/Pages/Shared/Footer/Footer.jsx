import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2">CONTACT US</h2>
          <p>123 ABS Street, Uni 21, Bangladesh</p>
          <p>+88 123456789</p>
          <p>Mon - Fri: 08:00 - 22:00</p>
          <p>Sat - Sun: 10:00 - 23:00</p>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold mb-2">Follow US</h2>
          <p className="mb-4">Join us on social media</p>
          <div className="flex justify-center md:justify-end gap-4 text-xl">
            <FaFacebookF className="hover:text-[#1877F2] cursor-pointer" />
            <FaInstagram className="hover:text-[#E4405F] cursor-pointer" />
            <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1E293B] text-center text-sm py-3">
        <p>Copyright © CulinaryCloud. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
