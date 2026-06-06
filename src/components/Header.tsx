import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';
import { AppRouterProps, Pages } from '@/entities';
import { handlePageLink } from './PageTransition';
import { getTranslation, getContent } from '@/lib/i18n';
import { useLanguage } from '@/lib/LanguageContext';

export default function Header(props: AppRouterProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { itemCount, actions } = useCart(language);
  let navItems = props.pages.filter((a: Pages) => { 
    if (!a.slug) return false;
    return a.lang === language && a.header == true;
  });
  const langs = [...new Set(props.pages.map((a: Pages) => a.lang))];
  const link_home = navItems.find((a:Pages)=> a.key === 'home' && a.lang === language && a.slug != undefined).slug;
  const link_contact = navItems.find((a:Pages)=> a.key === 'contact' && a.lang === language && a.slug != undefined).slug;

  const isActive = (page: Pages) => {
    let str:string = location.pathname.startsWith("/") ? location.pathname.substring(1) : location.pathname;
    str = str.endsWith("/") ? str.slice(0, -1) : str;
    let active = page.slug === str;
    if(!active) {
      const pageDT = props.pages.find((a:Pages)=> a.slugP === page.slug && a.slug == str);
      active = pageDT != null;
    }
    return active;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to={link_home} className="flex items-center">
              <span className="text-xl md:text-2xl font-heading font-bold text-primary">
                {getTranslation('footer.company', language, props)}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
              <Link
                key={item.slug}
                className={isActive(item) ? "text-base font-paragraph text-accent" : "text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"}
                onClick={(e) => handlePageLink(e, `/${item.slug}`, navigate)}
                to={item.slug}
              >
                {item.label}
              </Link>
              ))}
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
                onClick={() => navigate(`/${link_contact}`)}
              >
                <Phone className="h-4 w-4" />
                {getTranslation('header.contact', language, props)}
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
                {navItems.map((item) => (
                <Link
                  key={item.slug}
                  className="text-base font-paragraph text-primary hover:text-accent transition-colors duration-200"
                  onClick={(e) => {
                    setIsMenuOpen(false)
                    handlePageLink(e, `/${item.slug}`, navigate)
                  }}
                  to={item.slug}
                >
                  {item.label}
                </Link>
                ))}
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(`/${link_contact}`);
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {getTranslation('header.contact', language, props)}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
      <Cart {...props} />
    </>
  );
}
