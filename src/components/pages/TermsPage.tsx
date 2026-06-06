import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppRouterProps, WPPage } from '@/entities';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const data_terms = props.data_pages.find((a)=> a.slug['en'] === 'terms') as WPPage;
  return (
    <div className="min-h-screen bg-background overflow-clip">
      <Header {...props} />
        <main className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-primary">{data_terms.title[language]}</h1>
          <div className="space-y-12 article-content">
            <div className="prose max-w-none text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: data_terms.content[language] }} />
          </div>
        </div>
      </main>
      <Footer {...props} />
    </div>
  );
}
