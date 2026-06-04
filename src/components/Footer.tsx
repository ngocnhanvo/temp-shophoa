import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 border-t border-border/40">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl md:text-2xl font-heading font-bold text-primary">
                shophoacomay.vn
              </span>
            </Link>
            <p className="text-sm text-secondary font-paragraph leading-relaxed">
              Hệ thống hoa tươi trên toàn quốc. Giao hoa nhanh trong 2 giờ, cam kết chất lượng và dịch vụ tận tâm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-heading font-bold text-primary mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-heading font-bold text-primary mb-4">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-secondary font-paragraph">
                  1900 xxxx
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-secondary font-paragraph">
                  info@shophoacomay.vn
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-secondary font-paragraph">
                  Hệ thống toàn quốc
                </span>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h3 className="text-base font-heading font-bold text-primary mb-4">
              Giờ làm việc
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-secondary font-paragraph">
                  <p>Thứ 2 - Chủ nhật</p>
                  <p>8:00 - 22:00</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <p className="text-xs text-accent font-paragraph font-semibold">
                Giao hàng nhanh trong 2 giờ
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary font-paragraph text-center md:text-left">
              © 2026 shophoacomay.vn. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
              >
                Chính sách bảo mật
              </a>
              <a 
                href="#" 
                className="text-sm text-secondary hover:text-accent transition-colors duration-200 font-paragraph"
              >
                Điều khoản dịch vụ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
