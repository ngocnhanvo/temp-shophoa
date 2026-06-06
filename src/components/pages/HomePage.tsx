// WI-HPI
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AppRouterProps, FloralProducts, Products, WPPage } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  ArrowRight, 
  Clock, 
  FileText, 
  Award, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  ShoppingBag,
  Star,
  Quote
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { getContent, getTranslation } from '@/lib/i18n';
import { formatCurrency } from '@/lib/stringUtils';

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function HomePage(props: AppRouterProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart(language);
  const { currency } = useCurrency();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const link_products = getContent(props.pages, 'products', language);
  const link_contact = getContent(props.pages, 'contact', language);
  const link_about = getContent(props.pages, 'about', language);
  const handleAddToCart = async (product: Products) => {
    product.collectionId = 'products';
    product.quantity = 1;
    await actions.addToCart(product);
  };
  
  const dt_products = props.data_products;
  const sampleProducts: Products[] = useMemo(() => dt_products, [language, props]);
  const [products, setProducts] = useState<Products[]>(sampleProducts);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);

      const totalItems = sampleProducts.length;
      const skip = 0, limit = 12;
      const currentSlice = sampleProducts.slice(skip, skip + limit);

      if (skip === 0) {
        setProducts(currentSlice);
      } else {
        setProducts(prev => [...prev, ...currentSlice]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Static Data based on scraped markdown
  const features = useMemo(() => [
    { icon: Clock, title: getTranslation('hp.flower.features.t1', language, props), description: getTranslation('hp.flower.features.d1', language, props) },
    { icon: FileText, title: getTranslation('hp.flower.features.t2', language, props), description: getTranslation('hp.flower.features.d2', language, props) },
    { icon: Award, title: getTranslation('hp.flower.features.t3', language, props), description: getTranslation('hp.flower.features.d3', language, props) },
    { icon: MapPin, title: getTranslation('hp.flower.features.t4', language, props), description: getTranslation('hp.flower.features.d4', language, props) }
  ], [language, props]);

  const categories = useMemo(() => [
    { key: 'cat.birthday', name: getTranslation('cat.birthday', language, props), image: 'https://static.wixstatic.com/media/73be94_9672fa64e49d4f608a805e2f11963890~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.opening', name: getTranslation('cat.opening', language, props), image: 'https://static.wixstatic.com/media/73be94_69d5984737ec42df9fce925d48c9694b~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.funeral', name: getTranslation('cat.funeral', language, props), image: 'https://static.wixstatic.com/media/73be94_8dbfa42b182f4fbf9d3f669bc91fb123~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.congrats', name: getTranslation('cat.congrats', language, props), image: 'https://static.wixstatic.com/media/73be94_4ae9b4bdcda549f19170c56f60bbb996~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.school', name: getTranslation('cat.school', language, props), image: 'https://static.wixstatic.com/media/73be94_f26811735fec479ca2a3496d6f3eea03~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.mother', name: getTranslation('cat.mother', language, props), image: 'https://static.wixstatic.com/media/73be94_0e18476fc10349eb961f78dd6d5f18cb~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.bouquet', name: getTranslation('cat.bouquet', language, props), image: 'https://static.wixstatic.com/media/73be94_145bb6ba0a7d4e78adb30dd28143442e~mv2.png?originWidth=384&originHeight=384' },
    { key: 'cat.basket', name: getTranslation('cat.basket', language, props), image: 'https://static.wixstatic.com/media/73be94_5ee133c53b75426582ae1effdf0320de~mv2.png?originWidth=384&originHeight=384' },
  ], [language, props]);

  const testimonials = useMemo(() => [
    { name: getTranslation('testi.name.a', language, props), text: getTranslation('testi.text.a', language, props), rating: 5 },
    { name: getTranslation('testi.name.b', language, props), text: getTranslation('testi.text.b', language, props), rating: 5 },
    { name: getTranslation('testi.name.c', language, props), text: getTranslation('testi.text.c', language, props), rating: 5 },
  ], [language, props]);

  // Carousel Logic
  const itemsPerSlide = 4;
  const maxIndex = Math.max(0, products.length - itemsPerSlide);
  const visibleProducts = products.slice(carouselIndex, carouselIndex + itemsPerSlide);
  
  const handleNext = () => setCarouselIndex(prev => Math.min(prev + itemsPerSlide, maxIndex));
  const handlePrev = () => setCarouselIndex(prev => Math.max(prev - itemsPerSlide, 0));

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary overflow-x-hidden">
      <Header {...props}/>

      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center bg-accent/5 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-accent font-semibold text-sm tracking-wide uppercase">{getTranslation('hp.flower.hero.badge', language, props)}</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary mb-6 leading-[1.1]">
                {getTranslation('hp.flower.hero.title1', language, props)} <br/>
                <span className="text-accent">{getTranslation('hp.flower.hero.title2', language, props)}</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-heading font-medium text-secondary mb-6">
                {getTranslation('hp.flower.hero.promo', language, props)}
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-secondary/80 mb-10 leading-relaxed max-w-lg">
                {getTranslation('hp.flower.hero.desc', language, props)}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => navigate(link_products)}
                >
                  {getTranslation('hp.flower.hero.btn1', language, props)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-accent/20 text-primary hover:bg-accent/5 transition-all duration-300"
                  onClick={() => navigate(link_contact)}
                >
                  <Phone className="mr-2 h-5 w-5 text-accent" />
                  {getTranslation('hp.flower.hero.btn2', language, props)}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-accent/10 aspect-[4/5]">
                <Image
                  src="https://static.wixstatic.com/media/73be94_c8260cab1e5644ebbe88feb8d4b664fa~mv2.png?originWidth=768&originHeight=960"
                  alt="Hoa tươi mỗi ngày"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-accent/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">{getTranslation('hp.flower.hero.speed', language, props)}</p>
                    <p className="text-sm text-secondary">{getTranslation('hp.flower.hero.time', language, props)}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Seamless transition to next section */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://static.wixstatic.com/media/73be94_c5943a77e5d6421fa3047af4780a170f~mv2.png?originWidth=1024&originHeight=640"
                  alt="Shop hoa"
                  className="w-full h-64 object-cover rounded-3xl shadow-lg"
                />
                <Image
                  src="https://static.wixstatic.com/media/73be94_7b1b97ebd742475281e490af79a65eb9~mv2.png?originWidth=1024&originHeight=640"
                  alt="Shop hoa"
                  className="w-full h-64 object-cover rounded-3xl shadow-lg mt-12"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl" />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider">{getTranslation('hp.flower.about.label', language, props)}</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight">
                {getTranslation('hp.flower.about.title', language, props)}
              </h3>
              <div className="w-20 h-1 bg-accent rounded-full" />
              <p className="text-lg text-secondary leading-relaxed">
                {getTranslation('hp.flower.about.p1', language, props)}
              </p>
              <p className="text-lg text-secondary leading-relaxed">
                {getTranslation('hp.flower.about.p2', language, props)}
              </p>
              <Button 
                variant="outline"
                className="rounded-full border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 mt-4"
                onClick={() => navigate(link_about)}
              >
                {getTranslation('hp.flower.about.btn', language, props)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/5 rounded-full mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {getTranslation('hp.flower.cats.title', language, props)}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {categories.map((category) => (
              <motion.div key={category.key} variants={fadeInUp}>
                <Link 
                  to={link_products} 
                  className="block group text-center"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-sm mb-4 aspect-square bg-accent/5">
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="rounded-full border-accent/30 text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
              onClick={() => navigate(link_products)}
            >
              {getTranslation('hp.flower.cats.btn', language, props)}
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCTS CAROUSEL SECTION */}
      <section className="py-24 bg-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent -z-10" />
        
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {getTranslation('hp.flower.prods.title', language, props)}
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              {getTranslation('hp.flower.prods.desc', language, props)}
            </p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto min-h-[450px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner className="w-10 h-10 text-accent" />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnimatePresence mode="wait">
                    {visibleProducts.map((product, index) => (
                      <motion.div 
                        key={`${product._id}-${carouselIndex}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full overflow-hidden border border-transparent hover:border-accent/10"
                      >
                        <Link to={getContent(props.pages, 'product', language, Number(product._id))} className="relative overflow-hidden aspect-[4/5] block">
                          <Image
                            src={product.itemImage[language].src || 'https://static.wixstatic.com/media/73be94_fda7a7c59bd14b8fb6c203bdc05d574a~mv2.png?originWidth=768&originHeight=960'}
                            alt={product.itemName[language] || 'Sản phẩm'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Quick add overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white text-primary px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                              {getTranslation('hp.flower.prods.view', language, props)}
                            </div>
                          </div>
                        </Link>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          <Link to={getContent(props.pages, 'products', language, Number(product._id))} className="hover:underline">
                            <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                              {product.itemName[language]}
                            </h3>
                          </Link>
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <p className="text-xl font-bold text-accent">
                              {formatCurrency(product.itemPrice[language] || 0, product.itemCurrency[language] || DEFAULT_CURRENCY)}
                            </p>
                            <Button
                              size="icon"
                              className="rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
                              disabled={addingItemId === product._id}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product);
                              }}
                            >
                              {addingItemId === product._id ? <LoadingSpinner className="w-4 h-4" /> : <ShoppingBag className="w-5 h-5" />}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Carousel Controls */}
                <div className="flex justify-center items-center gap-4 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    disabled={carouselIndex === 0}
                    className="rounded-full border-accent/20 text-primary hover:bg-accent hover:text-white hover:border-accent disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex gap-2">
                    {Array.from({ length: Math.ceil(products.length / itemsPerSlide) }).map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          Math.floor(carouselIndex / itemsPerSlide) === idx 
                            ? 'w-8 bg-accent' 
                            : 'w-2 bg-accent/20'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={carouselIndex >= maxIndex}
                    className="rounded-full border-accent/20 text-primary hover:bg-accent hover:text-white hover:border-accent disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-secondary py-12">
                {getTranslation('prods.noProducts', language, props)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {getTranslation('hp.flower.deal.title', language, props)}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              {getTranslation('hp.flower.deal.desc', language, props)}
            </p>
            <Button 
              size="lg"
              className="bg-white text-accent hover:bg-white/90 rounded-full px-10 py-6 text-lg font-bold shadow-xl transition-transform hover:scale-105"
              onClick={() => navigate(link_products)}
            >
              {getTranslation('hp.flower.deal.btn', language, props)}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {getTranslation('hp.flower.testi.title', language, props)}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-accent/5 p-8 rounded-3xl relative"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-accent/10" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-secondary text-lg mb-6 italic relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-primary">{testimonial.name}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-accent/5 p-10 md:p-16 text-center border border-accent/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              {getTranslation('hp.flower.bottom.title', language, props)}
            </h2>
            <p className="text-lg text-secondary mb-10 max-w-2xl mx-auto">
              {getTranslation('hp.flower.bottom.desc', language, props)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-full px-8 py-6 text-lg transition-transform hover:scale-105"
                onClick={() => window.open('https://m.me/shophoacomay', '_blank')}
              >
                {getTranslation('hp.flower.bottom.btn1', language, props)}
              </Button>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 shadow-lg shadow-accent/20"
                onClick={() => navigate(link_products)}
              >
                {getTranslation('hp.flower.bottom.btn2', language, props)}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer {...props} />
    </div>
  );
}