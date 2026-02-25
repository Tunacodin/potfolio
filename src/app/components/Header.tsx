import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-gray-900/95 backdrop-blur-md border-b border-gray-700/30">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-light text-2xl text-white hover:text-gray-300 transition-colors">
          T.B
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <a href="#work" className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-wide">
            Work
          </a>
          <a href="#about" className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-wide">
            About
          </a>
          <a href="#contact" className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-wide">
            Contact
          </a>
          <a
            href="#contact"
            className="px-6 py-2 border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white rounded-lg text-sm font-light transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-md border-b border-gray-700/30 md:hidden">
            <div className="flex flex-col gap-4 p-6">
              <a
                href="#work"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-light text-gray-300 hover:text-white transition-colors py-2 tracking-wide"
              >
                Work
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-light text-gray-300 hover:text-white transition-colors py-2 tracking-wide"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-light text-gray-300 hover:text-white transition-colors py-2 tracking-wide"
              >
                Contact
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white rounded-lg text-sm font-light transition-all duration-300 text-center"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}