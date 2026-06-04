import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Điện thoại',
      details: ['1900 xxxx', 'Hotline: 0909 xxx xxx'],
      action: 'tel:1900xxxx'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@shophoacomay.vn', 'support@shophoacomay.vn'],
      action: 'mailto:info@shophoacomay.vn'
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      details: ['Hệ thống cửa hàng toàn quốc', '63 tỉnh thành'],
      action: null
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      details: ['Thứ 2 - Chủ nhật', '8:00 - 22:00'],
      action: null
    }
  ];

  const deliveryAreas = [
    {
      city: 'TP. Hồ Chí Minh',
      time: 'Giao trong 2 giờ',
      coverage: 'Tất cả quận huyện'
    },
    {
      city: 'Hà Nội',
      time: 'Giao trong 2 giờ',
      coverage: 'Tất cả quận huyện'
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
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-accent/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-secondary">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7
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
                      Liên hệ ngay
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
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      Họ và tên *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      Số điện thoại *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0909 xxx xxx"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                      Nội dung *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Nhập nội dung tin nhắn của bạn..."
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
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
            </AnimatedElement>

            {/* Delivery Info */}
            <AnimatedElement delay={100}>
              <div className="space-y-6">
                <div className="bg-background rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
                    Khu vực giao hàng
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
                    Cam kết giao hàng
                  </h3>
                  <ul className="space-y-2 text-sm font-paragraph text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Giao hàng đúng giờ theo yêu cầu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Hoa tươi 100%, không héo úa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Miễn phí thiết kế thiệp chúc mừng</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Hỗ trợ 24/7 qua hotline</span>
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
              Câu hỏi thường gặp
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </AnimatedElement>

          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedElement delay={100}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  Thời gian giao hàng là bao lâu?
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  Chúng tôi cam kết giao hàng trong vòng 2 giờ tại TP.HCM và Hà Nội. Các tỉnh thành khác sẽ được giao trong ngày hoặc theo thỏa thuận.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  Có thể đặt hoa vào giờ nào?
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  Chúng tôi nhận đặt hàng 24/7 qua website và hotline. Thời gian làm việc của cửa hàng là từ 8:00 đến 22:00 hàng ngày.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  Có được thiết kế thiệp miễn phí không?
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  Có, chúng tôi cung cấp dịch vụ thiết kế thiệp chúc mừng hoàn toàn miễn phí cho mọi đơn hàng. Bạn chỉ cần cung cấp nội dung lời chúc.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-secondary/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-paragraph font-bold text-primary mb-2">
                  Làm sao để đảm bảo hoa tươi?
                </h3>
                <p className="text-sm font-paragraph text-secondary leading-relaxed">
                  Hoa của chúng tôi được nhập khẩu và chọn lọc kỹ càng mỗi ngày. Chúng tôi cam kết 100% hoa tươi, không héo úa khi giao đến tay khách hàng.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
