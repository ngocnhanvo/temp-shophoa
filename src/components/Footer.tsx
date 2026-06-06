import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { AppRouterProps, Pages } from '@/entities';
import { useLanguage } from '@/lib/LanguageContext';
import { getContent, getTranslation } from '@/lib/i18n';

export default function Footer(props: AppRouterProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const home_slug = getContent(props.pages, 'home', language) || '/';
  const products_slug = getContent(props.pages, 'products', language) || '/products';
  const about_slug = getContent(props.pages, 'about', language) || '/about';
  const contact_slug = getContent(props.pages, 'contact', language) || '/contact';
  const terms_slug = getContent(props.pages, 'terms', language) || '/terms';
  const privacy_slug = getContent(props.pages, 'privacy', language) || '/privacy';

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/40">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link to={home_slug} className="inline-block mb-4">
              <span className="text-xl md:text-2xl font-heading font-bold text-primary">
                {getTranslation('footer.company', language, props).toUpperCase()}
              </span>
            </Link>
            <p className="text-sm text-secondary font-paragraph leading-relaxed">
              {getTranslation('footer.flower_desc', language, props)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-heading font-bold text-primary mb-4">
              {getTranslation('footer.quickLinks', language, props)}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={home_slug} 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  {getTranslation('footer.home', language, props)}
                </Link>
              </li>
              <li>
                <Link 
                  to={products_slug} 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  {getTranslation('footer.products', language, props)}
                </Link>
              </li>
              <li>
                <Link 
                  to={about_slug} 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  {getTranslation('footer.about', language, props)}
                </Link>
              </li>
              <li>
                <Link 
                  to={contact_slug} 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  {getTranslation('footer.contact', language, props)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-heading font-bold text-primary mb-4">
              {getTranslation('contact.infoTitle', language, props)}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-secondary font-paragraph">
                  {getTranslation('footer.phoneTxt', language, props)}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-secondary font-paragraph">
                  {getTranslation('footer.emailTxt', language, props)}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-secondary font-paragraph">
                  {getTranslation('hp.flower.features.t4', language, props)}
                </span>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h3 className="text-base font-heading font-bold text-primary mb-4">
              {getTranslation('contact.workingHours', language, props)}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-secondary font-paragraph">
                  <p>{getTranslation('footer.working_days', language, props)}</p>
                  <p>{getTranslation('footer.working_hours', language, props)}</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-accent/10 rounded-lg w-fit">
              <p className="text-xs text-accent font-paragraph font-semibold">
                {getTranslation('footer.delivery_fast', language, props)}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary font-paragraph text-center md:text-left">
              {getTranslation('footer.copyright', language, props)}
            </p>
            <div className="flex gap-6">
              <a 
                href={privacy_slug} 
                className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
              >
                {getTranslation('footer.privacy', language, props)}
              </a>
              <a 
                href={terms_slug} 
                className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
              >
                {getTranslation('footer.terms', language, props)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
