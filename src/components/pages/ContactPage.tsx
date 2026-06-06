import { useState, useEffect, useRef, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { AppRouterProps } from '@/entities';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div 
      ref={ref} 
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

export default function ContactPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(getTranslation('contact.success', language, props));
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = useMemo(() => [
    {
      icon: Phone,
      title: getTranslation('contact.phoneLabel', language, props),
      details: [getTranslation('footer.phoneTxt', language, props)],
      action: `tel:${getTranslation('footer.phoneTxt', language, props)}`
    },
    {
      icon: Mail,
      title: getTranslation('contact.emailLabel', language, props),
      details: [getTranslation('footer.emailTxt', language, props)],
      action: `mailto:${getTranslation('footer.emailTxt', language, props)}`
    },
    {
      icon: MapPin,
      title: getTranslation('contact.addressLabel', language, props),
      details: [getTranslation('hp.flower.features.t4', language, props), getTranslation('hp.flower.features.d4', language, props)],
      action: null
    },
    {
      icon: Clock,
      title: getTranslation('contact.workingHours', language, props),
      details: [getTranslation('footer.working_days', language, props), getTranslation('footer.working_hours', language, props)],
      action: null
    }
  ], [language, props]);

  const deliveryAreas = useMemo(() => [
    {
      city: getTranslation('contact.area.hcm.city', language, props),
      time: getTranslation('contact.area.hcm.time', language, props),
      coverage: getTranslation('contact.area.hcm.coverage', language, props)
    },
    {
      city: getTranslation('contact.area.hn.city', language, props),
      time: getTranslation('contact.area.hn.time', language, props),
      coverage: getTranslation('contact.area.hn.coverage', language, props)
    },
    {
      city: 'Đà Nẵng',
      time: 'Giao trong 3 giờ',
      coverage: 'Khu vực nội thành'
    },
    {
      city: 'Các tỉnh thành khác',
      time: 'Giao trong ngày',
      coverage: 'Theo khu vực'
    }
  ], [language, props]);

  return (
    <div className="min-h-screen bg-background">
      <Header {...props} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-accent/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6">
              {getTranslation('contact.hero.shop_title', language, props)}
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-secondary">
              {getTranslation('contact.hero.shop_subtitle', language, props)}
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="text-center p-6 bg-secondary/5 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mb-4">
                    <info.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-3">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm font-paragraph text-secondary mb-1">
                      {detail}
                    </p>
                  ))}
                  {info.action && (
                    <a
                      href={info.action}
                      className="inline-block mt-3 text-sm font-paragraph text-accent hover:underline"
                    >
                      {getTranslation('contact.btn.contact_now', language, props)}
                    </a>
                  )}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <AnimatedElement>
              <div className="bg-background rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
                  {getTranslation('contact.form.send_msg', language, props)}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      {getTranslation('contact.formName', language, props)}
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={getTranslation('contact.placeholderName', language, props)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      {getTranslation('contact.formEmail', language, props)}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={getTranslation('contact.placeholderEmail', language, props)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      {getTranslation('contact.formPhone', language, props)}
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={getTranslation('contact.placeholderPhone', language, props)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      {getTranslation('contact.formMessage', language, props)}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={getTranslation('contact.placeholderMessage', language, props)}
                      rows={5}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-white transition-all duration-200 hover:scale-[1.02]"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {getTranslation('contact.sendButton', language, props)}
                  </Button>
                </form>
              </div>
            </AnimatedElement>

            {/* Delivery Info */}
            <AnimatedElement delay={100}>
              <div className="space-y-6">
                <div className="bg-background rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
                    {getTranslation('contact.delivery.title', language, props)}
                  </h2>
                  <div className="space-y-4">
                    {deliveryAreas.map((area, index) => (
                      <div
                        key={index}
                        className="p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                          {area.city}
                        </h3>
                        <div className="flex items-center gap-2 text-sm font-paragraph text-secondary mb-1">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{area.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-paragraph text-secondary">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{area.coverage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6">
                  <h3 className="text-lg font-heading font-bold text-primary mb-3">
                    {getTranslation('contact.commit.title', language, props)}
                  </h3>
                  <ul className="space-y-2 text-sm font-paragraph text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>{getTranslation('contact.commit.item1', language, props)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>{getTranslation('contact.commit.item2', language, props)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>{getTranslation('contact.commit.item3', language, props)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>{getTranslation('contact.commit.item4', language, props)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {getTranslation('contact.faq.title', language, props)}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </AnimatedElement>

          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedElement delay={100}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  {getTranslation('contact.faq.q1', language, props)}
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  {getTranslation('contact.faq.a1', language, props)}
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  {getTranslation('contact.faq.q2', language, props)}
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  {getTranslation('contact.faq.a2', language, props)}
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  {getTranslation('contact.faq.q3', language, props)}
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  {getTranslation('contact.faq.a3', language, props)}
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  {getTranslation('contact.faq.q4', language, props)}
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  {getTranslation('contact.faq.a4', language, props)}
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer {...props} />
    </div>
  );
}
