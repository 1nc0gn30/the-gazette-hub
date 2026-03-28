import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import NewspaperHeader from '../components/NewspaperHeader';
import ArticleCard from '../components/ArticleCard';
import { motion } from 'motion/react';

interface HomeProps {
  brandIndex?: number;
}

export default function Home({ brandIndex = 0 }: HomeProps) {
  const { brands } = useNewspaper();
  const [email, setEmail] = React.useState('');
  const [subscriptionMessage, setSubscriptionMessage] = React.useState('');
  const brand = brands[brandIndex] || brands[0];
  const issue = brand.issues[0];
  const allArticles = issue?.sections.flatMap(s => s.articles) || [];
  const heroArticle = allArticles[0];
  const secondaryArticles = allArticles.slice(1, 4);
  const sidebarArticles = allArticles.slice(4, 10); // Show more in sidebar

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setSubscriptionMessage('Enter an email address to subscribe.');
      return;
    }
    setSubscriptionMessage(`Subscribed: ${email}`);
    setEmail('');
  };

  if (!brand || !issue) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto"
      key={brand.id}
    >
      <NewspaperHeader brand={brand} issue={issue} />


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-b border-black pb-12">
        {/* Left Column: Main Story */}
        <div className="lg:col-span-8 lg:border-r lg:border-black/10 lg:pr-12">
          {heroArticle && <ArticleCard article={heroArticle} variant="hero" />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            {secondaryArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar & Briefs */}
        <aside className="lg:col-span-4 flex flex-col mt-12 lg:mt-0">
          <div className="mb-12 flex-grow">
            <h3 className="font-serif font-black text-2xl uppercase border-b-2 border-black pb-2 mb-6">
              The Latest News
            </h3>
            <div className="space-y-8">
              {sidebarArticles.length > 0 ? sidebarArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="sidebar" />
              )) : (
                <p className="text-xs italic text-black/40">No additional updates at this time.</p>
              )}
            </div>
          </div>

          <div className="mt-8 border-t-2 border-black pt-8">
            <div className="bg-black text-white p-8 mb-8">
              <h4 className="font-serif font-bold text-2xl mb-4 leading-tight">Join the Hub</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-6 leading-relaxed">
                Get the morning edition delivered to your inbox every day at 6:00 AM.
              </p>
              <form className="flex flex-col gap-4" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b border-white/20 py-2 text-xs focus:outline-none focus:border-white"
                />
                <button className="bg-white text-black font-bold uppercase text-[9px] tracking-widest py-3 hover:bg-accent-color hover:text-white transition-colors">
                  Subscribe
                </button>
                {subscriptionMessage && (
                  <p className="text-[9px] uppercase tracking-widest text-white/70">{subscriptionMessage}</p>
                )}
              </form>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Section: Multi-column Briefs */}
      <div className="mt-12">
        <h2 className="font-serif font-black text-3xl uppercase mb-8 lg:mb-12 border-b-4 border-black pb-4">Inside Today's Issue</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {issue.sections.map(section => (
            <div key={section.id} className="md:border-r md:border-black/5 last:border-0 md:pr-4">
              <h3 className="font-serif font-bold text-xl border-b border-black pb-2 mb-6 uppercase tracking-tighter">
                {section.name}
              </h3>
              <div className="space-y-6">
                {section.articles.map(article => (
                  <ArticleCard key={article.id} article={article} variant="mini" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
