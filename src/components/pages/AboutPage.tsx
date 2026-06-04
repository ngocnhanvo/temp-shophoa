import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Clock, Award, MapPin, Heart, Truck, Gift } from 'lucide-react';

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

export default function AboutPage() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: 'Tận tâm',
      description: 'Chúng tôi đặt trái tim vào từng bó hoa, mang đến sự chăm sóc tận tình cho khách hàng'
    },
    {
      icon: Award,
      title: 'Chất lượng',
      description: 'Cam kết hoa tươi mỗi ngày, không héo úa, luôn đảm bảo chất lượng cao nhất'
    },
    {
      icon: Truck,
      title: 'Giao nhanh',
      description: 'Giao hàng trong vòng 2 giờ, đúng giờ, đúng địa điểm theo yêu cầu'
    },
    {
      icon: Gift,
      title: 'Miễn phí thiệp',
      description: 'Thiết kế thiệp chúc mừng miễn phí, giúp lời chúc thêm ý nghĩa'
    }
  ];

  const stats = [
    { number: '10+', label: 'Năm kinh nghiệm' },
    { number: '50K+', label: 'Khách hàng hài lòng' },
    { number: '63', label: 'Tỉnh thành phủ sóng' },
    { number: '100%', label: 'Hoa tươi mỗi ngày' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-accent/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6">
              Về Shop Hoa Cỏ May
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-secondary leading-relaxed">
              Hệ thống hoa tươi uy tín trên toàn quốc, mang đến những bó hoa tươi đẹp nhất cho mọi dịp đặc biệt trong cuộc sống
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimatedElement>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  Câu chuyện của chúng tôi
                </h2>
                <p className="text-base md:text-lg font-paragraph text-secondary leading-relaxed">
                  Tại Shop Hoa Cỏ May, mỗi bông hoa đều mang trong mình một câu chuyện, một lời chúc và cảm xúc riêng biệt. Chúng tôi tin rằng hoa không chỉ để ngắm, mà còn là cách trao đi yêu thương một cách tinh tế nhất.
                </p>
                <p className="text-base md:text-lg font-paragraph text-secondary leading-relaxed">
                  Với hơn 10 năm kinh nghiệm trong ngành hoa tươi, chúng tôi tự hào là đối tác tin cậy của hàng ngàn khách hàng trên toàn quốc. Từ những dịp sinh nhật, khai trương, đến những khoảnh khắc đặc biệt trong cuộc sống, Hoa Cỏ May luôn đồng hành cùng bạn.
                </p>
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => navigate('/products')}
                >
                  Khám phá sản phẩm
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://static.wixstatic.com/media/73be94_63df44e96c6c48349c7719faf2775daf~mv2.png?originWidth=256&originHeight=256"
                  alt="Shop hoa"
                  width={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                />
                <Image
                  src="https://static.wixstatic.com/media/73be94_824ba47bbe454e37b07a3f83525dc61d~mv2.png?originWidth=256&originHeight=256"
                  alt="Shop hoa"
                  width={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 mt-8"
                />
                <Image
                  src="https://static.wixstatic.com/media/73be94_415502effb0b4cb19b343017c70d8fc2~mv2.png?originWidth=256&originHeight=256"
                  alt="Shop hoa"
                  width={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 -mt-8"
                />
                <Image
                  src="https://static.wixstatic.com/media/73be94_2ab8354984844be18158500458514161~mv2.png?originWidth=256&originHeight=256"
                  alt="Shop hoa"
                  width={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Giá trị cốt lõi
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="text-center p-8 bg-background rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm font-paragraph text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-paragraph text-secondary">
                    {stat.label}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Cam kết của chúng tôi
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </AnimatedElement>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedElement delay={100}>
                <div className="p-6 bg-secondary/5 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-primary mb-2">
                        Giao hàng đúng giờ
                      </h3>
                      <p className="text-sm font-paragraph text-secondary leading-relaxed">
                        Cam kết giao hoa trong vòng 2 giờ tại TP.HCM và Hà Nội, đúng giờ theo yêu cầu của khách hàng
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="p-6 bg-secondary/5 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-primary mb-2">
                        Hoa tươi 100%
                      </h3>
                      <p className="text-sm font-paragraph text-secondary leading-relaxed">
                        Hoa được nhập khẩu và chọn lọc kỹ càng mỗi ngày, đảm bảo độ tươi và chất lượng cao nhất
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <div className="p-6 bg-secondary/5 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-primary mb-2">
                        Phủ sóng toàn quốc
                      </h3>
                      <p className="text-sm font-paragraph text-secondary leading-relaxed">
                        Hệ thống cửa hàng và đối tác trải dài 63 tỉnh thành, sẵn sàng phục vụ mọi lúc mọi nơi
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="p-6 bg-secondary/5 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Gift className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-primary mb-2">
                        Thiệp miễn phí
                      </h3>
                      <p className="text-sm font-paragraph text-secondary leading-relaxed">
                        Thiết kế thiệp chúc mừng miễn phí theo yêu cầu, giúp lời chúc thêm ý nghĩa và cảm động
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center bg-background rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Sẵn sàng đặt hoa?
              </h2>
              <p className="text-base md:text-lg font-paragraph text-secondary mb-8">
                Hãy để chúng tôi giúp bạn trao đi yêu thương qua những bó hoa tươi đẹp nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => navigate('/products')}
                >
                  Xem sản phẩm
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => navigate('/contact')}
                >
                  Liên hệ ngay
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
