import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { AppRouterProps, FloralProducts, Products } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/LanguageContext';
import { formatCurrency } from '@/lib/stringUtils';
import { getTranslation } from '@/lib/i18n';
import { handlePageLink } from '../PageTransition';
import { useNavigate, Link } from 'react-router-dom';

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

export default function ProductsPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const { addingItemId, actions } = useCart(language);
  const navigate = useNavigate();
  
  const dt_products = props.data_products;
  const sampleProducts: Products[] = useMemo(() => dt_products, [language, props]);
  const [products, setProducts] = useState<Products[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const limit = 12;
  useEffect(() => {
    loadProducts();
  }, [skip]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedOccasion, searchQuery]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);

      const totalItems = sampleProducts.length;
      // Cắt mảng dữ liệu mẫu dựa trên phân trang
      const currentSlice = sampleProducts.slice(skip, skip + limit);

      if (skip === 0) {
        setProducts(currentSlice);
        extractCategories(sampleProducts); // Lấy category từ toàn bộ list để filter đầy đủ
      } else {
        setProducts(prev => [...prev, ...currentSlice]);
      }
      
      // Nếu tổng số item lớn hơn vị trí hiện tại thì vẫn còn trang kế tiếp
      setHasNext(skip + limit < totalItems);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractCategories = (items: Products[]) => {
    const cats = new Set<string>();
    items.forEach(item => {
      if (item.category) cats.add(item.category[language]);
    });
    const sortedCats = Array.from(cats).sort((a, b) => a.localeCompare(b, language));
    setCategories(sortedCats);
  };

  const handleAddToCart = async (product: Products) => {
    product.collectionId = 'products';
    product.quantity = 1;

    await actions.addToCart(product);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.itemName[language]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.itemDescriptionShort[language]?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category[language] === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const loadMore = () => {
    setSkip(skip + 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header {...props} />

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
      <section className="w-full top-[80px] z-30">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-3 lg:py-6">
          {/* Mobile Layout (up to lg breakpoint) - Combined Search and Filter in one row */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                type="text"
                placeholder={getTranslation('prods.search.placeholder', language, props)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-background text-foreground font-paragraph text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="relative shrink-0">
              <div className={`flex items-center justify-center w-[42px] h-[42px] border transition-all ${
                selectedCategory !== 'all' 
                  ? 'bg-foreground border-foreground text-primary-foreground'
                  : 'bg-background border-gray-200 text-foreground'
              }`}>
                <Filter className="w-5 h-5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
              >
                <option value="all">{getTranslation('prods.filter.all', language, props)}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Layout (lg breakpoint and up) */}
          <div className="hidden lg:flex flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Input for Desktop */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="text"
                placeholder={getTranslation('prods.search.placeholder', language, props)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-background text-foreground font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Filter Buttons for Desktop */}
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-5 h-5 text-primary" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 font-paragraph text-base transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-foreground text-white'
                    : 'border border-gray-200 text-foreground hover:bg-gray-50 hover:text-foreground'
                }`}
              >
                {getTranslation('prods.filter.all', language, props)}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 font-paragraph text-base transition-colors ${
                    selectedCategory === cat
                      ? 'bg-foreground text-white'
                      : 'border border-gray-200 text-foreground hover:bg-gray-50 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
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
                      {getTranslation('prods.notFound', language, props)}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                      <AnimatedElement key={product._id} delay={index * 50}>
                        <div className="bg-background rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group flex flex-col h-full border border-transparent hover:border-accent/10">
                          <Link 
                            to={`/${product.slug?.[language] || product._id}`}
                            onClick={(e) => handlePageLink(e, `/${product.slug?.[language] || product._id}`, navigate)}
                            className="flex-grow"
                          >
                            <div className="relative overflow-hidden">
                              <Image
                                src={product.itemImage[language].src || 'https://static.wixstatic.com/media/73be94_7d7ea20908f84b50b91bd8b1c5c97686~mv2.png?originWidth=256&originHeight=256'}
                                alt={product.itemName[language] || 'Sản phẩm'}
                                width={300}
                                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              {product.category && (
                                <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-paragraph font-semibold">
                                  {product.category[language]}
                                </div>
                              )}
                            </div>
                            <div className="p-5 pb-0">
                              <h3 className="text-base font-paragraph font-semibold text-primary mb-2 line-clamp-2 min-h-[3rem] group-hover:text-accent transition-colors">
                                {product.itemName[language]}
                              </h3>
                              {product.itemDescriptionShort && (
                                <p className="text-sm font-paragraph text-secondary mb-3 line-clamp-2">
                                  {product.itemDescriptionShort[language]}
                                </p>
                              )}
                            </div>
                          </Link>
                          
                          <div className="p-5 pt-2 mt-auto">
                            <p className="text-xl font-heading font-bold text-accent mb-4">
                              {formatCurrency(product.itemPrice[language] || 0, product.itemCurrency[language] || DEFAULT_CURRENCY)}
                            </p>
                            <Button
                              className="w-full bg-accent hover:bg-accent/90 text-white transition-all duration-200 hover:scale-[1.02]"
                              disabled={addingItemId === product._id}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product);
                              }}
                            >
                              {addingItemId === product._id ? getTranslation('prod.btn.buying', language, props) : getTranslation('prod.btn.buy', language, props)}
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
                      {getTranslation('prod.btn.loadMore', language, props)}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer {...props} />
    </div>
  );
}
