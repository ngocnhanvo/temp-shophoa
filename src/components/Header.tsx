import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-heading font-bold text-primary">
                shophoacomay.vn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
              >
                Trang chủ
              </Link>
              <Link 
                to="/products" 
                className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
              >
                Sản phẩm
              </Link>
              <Link 
                to="/about" 
                className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
              >
                Về chúng tôi
              </Link>
              <Link 
                to="/contact" 
                className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
              >
                Liên hệ
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/10 transition-colors duration-200"
                onClick={actions.toggleCart}
              >
                <ShoppingCart className="h-5 w-5 text-primary" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>

              <Button
                className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent/90 text-white transition-all duration-200 hover:scale-[1.02]"
                onClick={() => navigate('/contact')}
              >
                <Phone className="h-4 w-4" />
                Liên hệ ngay
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-primary" />
                ) : (
                  <Menu className="h-6 w-6 text-primary" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border/40">
              <div className="flex flex-col gap-4">
                <Link 
                  to="/" 
                  className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trang chủ
                </Link>
                <Link 
                  to="/products" 
                  className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sản phẩm
                </Link>
                <Link 
                  to="/about" 
                  className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Về chúng tôi
                </Link>
                <Link 
                  to="/contact" 
                  className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liên hệ
                </Link>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/contact');
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Liên hệ ngay
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
      <Cart />
    </>
  );
}
