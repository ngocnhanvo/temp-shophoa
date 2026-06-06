import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppRouterProps } from '@/entities';
import { formatCurrency, formatCurrencyValue, removeUnicode } from '@/lib/stringUtils';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Wrench, Award, Gift, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Products } from '@/entities';
import { useCart } from '@/integrations';
import { getTranslation, getContent } from '@/lib/i18n';
import { Image } from '@/components/ui/image';
import { handlePageLink } from '@/components/PageTransition';
import { Button } from '../ui/button';

export default function ProductDetailPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { addingItemId, actions } = useCart(language);
  
  let path = window.location.pathname.startsWith("/") ? window.location.pathname.substring(1) : window.location.pathname;
  path = path.endsWith("/") ? path.slice(0, -1) : path;
  const dt_products = props.data_products;
  const product = dt_products.find(p => p.slug?.[language] === path);
  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground font-paragraph">
        <Header {...props} />
        <main className="pt-40 pb-20 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">{getTranslation('blog.detail.notFound', language, props)}</h1>
            <button onClick={() => navigate(-1)} className="text-linkcolor hover:underline underline-offset-4 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> {getTranslation('blog.detail.back', language, props)}
            </button>
        </main>
        <Footer {...props} />
      </div>
    );
  }

  const link_products = getContent(props.pages, 'products', language);
  const link_home = getContent(props.pages, 'home', language);
  
  const currentIndex = dt_products.findIndex(p => p._id === product._id);
  const prevProduct = dt_products[currentIndex - 1];
  const nextProduct = dt_products[currentIndex + 1];

  const handleAddToCart = async (product: Products) => {
    product.collectionId = 'products';
    product.quantity = 1;

    await actions.addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header {...props} />
      
      <main className="pt-20 pb-20">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          {/* Product Header Navigation Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-primary/10 pb-8"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 font-paragraph text-[10px] uppercase tracking-[0.2em] text-foreground/50">
              <button onClick={() => navigate(link_home)} className="hover:text-primary transition-colors">
                {getTranslation('footer.home', language, props)}
              </button>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <button onClick={() => navigate(link_products)} className="hover:text-primary transition-colors">
                {getTranslation('footer.products', language, props)}
              </button>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span className="text-foreground truncate max-w-[150px] md:max-w-none">
                {product.itemName[language]}
              </span>
            </nav>

            {/* Prev/Next Actions */}
            <div className="flex items-center gap-8 font-paragraph text-[10px] uppercase tracking-[0.2em]">
              <button
                onClick={() => navigate(link_products)}
                className="text-foreground/70 hover:text-primary transition-colors font-bold"
              >
                {getTranslation('prod.btn.back', language, props)}
              </button>

              <button 
                onClick={() => prevProduct && navigate(`/${prevProduct.slug?.[language] || prevProduct._id}`)}
                disabled={!prevProduct}
                className={`group flex items-center gap-2 transition-colors ${!prevProduct ? 'opacity-20 cursor-not-allowed' : 'text-foreground/60 hover:text-primary'}`}
              >
                <ArrowLeft className={`w-3 h-3 ${prevProduct ? 'group-hover:-translate-x-1' : ''} transition-transform`} />
                <span>{getTranslation('prod.btn.prev', language, props)}</span>
              </button>
              
              <button 
                onClick={() => nextProduct && navigate(`/${nextProduct.slug?.[language] || nextProduct._id}`)}
                disabled={!nextProduct}
                className={`group flex items-center gap-2 transition-colors ${!nextProduct ? 'opacity-20 cursor-not-allowed' : 'text-foreground/60 hover:text-primary'}`}
              >
                <span>{getTranslation('prod.btn.next', language, props)}</span>
                <motion.div
                  animate={nextProduct ? { x: [0, 4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </motion.div>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] bg-gray-50 lg:sticky lg:top-20 rounded-[3rem] overflow-hidden group flex items-center justify-center md:p-12 p-4"
            >
              {/* Depth effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-1/6 bg-primary/10 blur-[100px] rounded-full" />

              {product.itemImage && (
                <picture className="relative z-10 w-full h-full">
                <source 
                  srcSet={product.itemImage[language].srcSet} type="image/webp" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                <img 
                  src={product.itemImage[language].src}
                  alt={product.itemName[language]} 
                  className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                />
              </picture>
              )}
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col space-y-8"
            >
              <div className="space-y-4">
                {product.category && (
                  <span className="text-xs uppercase tracking-[0.3em] text-foreground/50 block">
                    {product.category[language]}
                  </span>
                )}
                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground font-bold leading-tight">
                  {product.itemName[language]}
                </h1>
                <div className="flex items-baseline gap-2 px-4 py-2">
                  <span className="font-heading text-3xl font-extrabold text-primary">
                    {formatCurrency(product.itemPrice[language], product.itemCurrency[language])}
                  </span>
                </div>
              </div>

              <div className="w-12 h-[1px] bg-primary/20" />

              <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: product.itemDescription[language] }}>
                
              </div>

              <div className="pt-8 space-y-12">
                <Button
                  className="w-full py-5 bg-accent text-white font-heading font-bold text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  disabled={addingItemId === product._id}
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  {addingItemId === product._id ? getTranslation('prod.btn.buying', language, props) : getTranslation('prod.btn.buy', language, props)}
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-primary/10">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Award className="w-6 h-6 text-foreground/40" />
                    <span className="text-[10px] uppercase tracking-widest text-foreground/60 font-semibold">
                      {getTranslation('prod.badge.warranty', language, props)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <Gift className="w-6 h-6 text-foreground/40" />
                    <span className="text-[10px] uppercase tracking-widest text-foreground/60 font-semibold">
                      {getTranslation('prod.badge.service', language, props)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <Clock className="h-6 w-6 text-foreground/40" />
                    <span className="text-[10px] uppercase tracking-widest text-foreground/60 font-semibold">
                      {getTranslation('prod.badge.delivery', language, props)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer {...props} />
    </div>
  );
}
