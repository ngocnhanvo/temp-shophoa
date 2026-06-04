import { useState, useEffect, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { FloralProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<FloralProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FloralProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, [skip]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedOccasion]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<FloralProducts>('floralproducts', {}, { limit: 50, skip });
      setProducts(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedOccasion !== 'all') {
      filtered = filtered.filter(p => p.occasion === selectedOccasion);
    }

    setFilteredProducts(filtered);
  };

  const loadMore = () => {
    setSkip(skip + 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6">
              Sản phẩm của chúng tôi
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-secondary">
              Khám phá bộ sưu tập hoa tươi đa dạng cho mọi dịp đặc biệt
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-secondary/5 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1">
              <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                Danh mục
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="Hoa sinh nhật">Hoa sinh nhật</SelectItem>
                  <SelectItem value="Hoa khai trương">Hoa khai trương</SelectItem>
                  <SelectItem value="Hoa chia buồn">Hoa chia buồn</SelectItem>
                  <SelectItem value="Hoa chúc mừng">Hoa chúc mừng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-paragraph font-semibold text-primary mb-2">
                Dịp
              </label>
              <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả dịp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả dịp</SelectItem>
                  <SelectItem value="Sinh nhật">Sinh nhật</SelectItem>
                  <SelectItem value="Khai trương">Khai trương</SelectItem>
                  <SelectItem value="Chia buồn">Chia buồn</SelectItem>
                  <SelectItem value="Chúc mừng">Chúc mừng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div style={{ minHeight: '600px' }}>
            {isLoading ? null : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-xl font-paragraph text-secondary">
                      Không tìm thấy sản phẩm phù hợp
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                      <AnimatedElement key={product._id} delay={index * 50}>
                        <div className="bg-background rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                          <div className="relative overflow-hidden">
                            <Image
                              src={product.itemImage || 'https://static.wixstatic.com/media/73be94_7d7ea20908f84b50b91bd8b1c5c97686~mv2.png?originWidth=256&originHeight=256'}
                              alt={product.itemName || 'Sản phẩm'}
                              width={300}
                              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {product.category && (
                              <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-paragraph font-semibold">
                                {product.category}
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="text-base font-paragraph font-semibold text-primary mb-2 line-clamp-2 min-h-[3rem]">
                              {product.itemName}
                            </h3>
                            {product.itemDescription && (
                              <p className="text-sm font-paragraph text-secondary mb-3 line-clamp-2">
                                {product.itemDescription}
                              </p>
                            )}
                            <p className="text-xl font-heading font-bold text-accent mb-4">
                              {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                            </p>
                            <Button
                              className="w-full bg-accent hover:bg-accent/90 text-white transition-all duration-200 hover:scale-[1.02]"
                              disabled={addingItemId === product._id}
                              onClick={() => cartActions.addToCart({ 
                                collectionId: 'floralproducts', 
                                itemId: product._id 
                              })}
                            >
                              {addingItemId === product._id ? 'Đang thêm...' : 'Thêm vào giỏ'}
                            </Button>
                          </div>
                        </div>
                      </AnimatedElement>
                    ))}
                  </div>
                )}

                {hasNext && (
                  <div className="text-center mt-12">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 hover:scale-[1.02]"
                      onClick={loadMore}
                    >
                      Xem thêm sản phẩm
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
