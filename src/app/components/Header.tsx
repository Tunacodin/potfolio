import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          TB
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm hover:text-purple-400 transition-colors">
            Work
          </a>
          <a href="#about" className="text-sm hover:text-purple-400 transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm hover:text-purple-400 transition-colors">
            Contact
          </a>
          <a
            href="#contact"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 md:hidden">
            <div className="flex flex-col gap-4 p-6">
              <a
                href="#work"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm hover:text-purple-400 transition-colors py-2"
              >
                Work
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm hover:text-purple-400 transition-colors py-2"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm hover:text-purple-400 transition-colors py-2"
              >
                Contact
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors text-center"
              >
                Book a Call
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}