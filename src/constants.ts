import { Article, NewspaperBrand } from './types';

const enrichArticleContent = (article: Article): Article => {
  if (article.content.length >= 700 || article.content.includes('\n## Editorial Analysis')) {
    return article;
  }

  const editorialAnalysis = `\n\n## Editorial Analysis\n\nBeyond today's headline, analysts say the long-term signal is institutional adaptation. Public agencies are changing procurement rules, private operators are rewriting risk models, and local communities are demanding measurable outcomes instead of one-off announcements. That shift is slow, but it is visible across policy memos, quarterly reports, and municipal hearings.\n\nField interviews also suggest an uneven transition. Larger organizations with access to capital can pilot changes faster, while smaller groups rely on partnerships and shared infrastructure to keep pace. Several experts warned that progress metrics should include reliability, affordability, and equity rather than headline growth alone.\n\n## Why This Matters\n\nThe immediate effect is operational: decision-makers must choose between short-term cost control and resilient long-term planning. In practical terms, that means clearer accountability, better data collection, and public reporting that can be audited. Readers should expect this story to evolve from a single event into a multi-year policy and market narrative.\n\n## What Happens Next\n\nIn the next 90 days, stakeholders are expected to publish implementation roadmaps and funding timelines. We will continue tracking commitments versus delivery, including whether announced targets are met and which regions lag behind. If early pilots hold, this development may become a template for adjacent sectors facing similar pressure.\n`;

  return {
    ...article,
    content: `${article.content.trim()}${editorialAnalysis}`.trim(),
  };
};

const enrichBrands = (brands: NewspaperBrand[]): NewspaperBrand[] =>
  brands.map((brand) => ({
    ...brand,
    issues: brand.issues.map((issue) => ({
      ...issue,
      sections: issue.sections.map((section) => ({
        ...section,
        articles: section.articles.map(enrichArticleContent),
      })),
    })),
  }));

export const MOCK_BRANDS: NewspaperBrand[] = enrichBrands([
  {
    id: 'the-daily-chronicle',
    name: 'The Daily Chronicle',
    tagline: 'Truth in Every Word, Since 1892',
    primaryColor: '#1a1a1a',
    fontFamily: 'serif',
    theme: 'classic',
    establishedDate: 'Est. 1892',
    issues: [
      {
        id: 'issue-101',
        issueNumber: 101,
        date: '2026-03-28',
        sections: [
          {
            id: 'world',
            name: 'World News',
            articles: [
              {
                id: 'art-1',
                title: 'The Future of Urban Living: A Green Revolution',
                subtitle: 'How cities are adapting to a changing climate through vertical forests and sustainable transit.',
                author: 'Elena Vance',
                date: '2026-03-28',
                category: 'World',
                excerpt: 'As global temperatures rise, urban planners are looking to nature for solutions. From Singapore to Milan, the concept of the "Vertical Forest" is taking root...',
                content: '# The Future of Urban Living\n\nAs global temperatures rise, urban planners are looking to nature for solutions. From Singapore to Milan, the concept of the "Vertical Forest" is taking root.\n\n## The Rise of Vertical Forests\n\nArchitects are now designing buildings that act as living organisms. These structures are covered in thousands of trees and shrubs, which help to filter air, reduce noise, and regulate temperature.\n\n> "We are not just building houses; we are building ecosystems," says lead architect Marco Rossi.\n\n### Impact on Transit\n\nAlongside green architecture, cities are reimagining transit. The goal is a "15-minute city" where everything a resident needs is within a short walk or bike ride.',
                image: 'https://picsum.photos/seed/city/1200/800',
                isBreaking: true,
                readTime: '6 min read'
              },
              {
                id: 'art-2',
                title: 'Global Markets React to New Tech Regulations',
                author: 'Julian Thorne',
                date: '2026-03-28',
                category: 'Business',
                excerpt: 'Tech giants face new scrutiny as international bodies agree on a unified framework for AI ethics and data privacy.',
                content: 'Global markets saw a slight dip today as news of the "Unified AI Framework" broke. Investors are cautious about the implications for growth...',
                image: 'https://picsum.photos/seed/tech/800/600',
                readTime: '4 min read'
              },
              {
                id: 'art-4',
                title: 'The Arctic Melt: A Warning from the North',
                author: 'Dr. Sarah Frost',
                date: '2026-03-28',
                category: 'World',
                excerpt: 'New satellite data shows ice sheets melting at twice the predicted rate, threatening coastal cities worldwide.',
                content: 'The Arctic is warming four times faster than the rest of the planet. This is not just a local issue; it is a global emergency...',
                image: 'https://picsum.photos/seed/arctic/800/600',
                readTime: '8 min read'
              },
              {
                id: 'art-6',
                title: 'New Mars Colony Successfully Deploys First Habitat',
                subtitle: 'Ares-1 mission marks a new era in human space exploration',
                excerpt: 'The first permanent human structure on the Martian surface was pressurized this morning, marking a major milestone for the international mission.',
                content: 'MARS BASE ALPHA — The Ares-1 mission reached a critical milestone today as the first modular habitat was successfully deployed and pressurized on the Martian surface. The crew of six, led by Commander Sarah Jenkins, entered the structure at 09:00 UTC, marking the beginning of permanent human presence on the Red Planet.',
                author: 'Dr. Arthur Vance',
                date: '2026-03-27',
                category: 'Science',
                image: 'https://picsum.photos/seed/mars/1200/800',
                readTime: '4 min read'
              },
              {
                id: 'art-7',
                title: 'Tensions Rise in Southeast Asia Trade Dispute',
                subtitle: 'New tariffs spark concerns of global supply chain disruption',
                excerpt: 'A sudden escalation in trade barriers between major manufacturing hubs has sent shockwaves through global markets.',
                content: 'SINGAPORE — Markets across Asia tumbled today as new trade restrictions were announced, threatening to disrupt the delicate balance of global electronics manufacturing.',
                author: 'Chen Wei',
                date: '2026-03-28',
                category: 'Economy',
                image: 'https://picsum.photos/seed/trade/1200/800',
                readTime: '5 min read'
              }
            ]
          },
          {
            id: 'politics',
            name: 'Politics',
            articles: [
              {
                id: 'p1',
                title: 'Senate Passes Landmark Infrastructure Bill',
                excerpt: 'The $2.5 trillion package aims to modernize the nation\'s power grid and high-speed rail network.',
                content: 'WASHINGTON — In a rare show of bipartisanship, the Senate voted 72-28 to pass the "Future Forward Act," the largest investment in national infrastructure since the 1950s.',
                author: 'James Sterling',
                date: '2026-03-28',
                category: 'Politics',
                image: 'https://picsum.photos/seed/politics/1200/800',
                readTime: '5 min read'
              },
              {
                id: 'p2',
                title: 'New Election Laws Spark Nationwide Debate',
                excerpt: 'Proposed changes to voting procedures have led to protests in several state capitals.',
                content: 'Protests erupted today as several states moved to implement new digital voting verification systems, with critics citing privacy concerns.',
                author: 'Sarah Jenkins',
                date: '2026-03-27',
                category: 'Politics',
                image: 'https://picsum.photos/seed/vote/1200/800',
                readTime: '4 min read'
              },
              {
                id: 'p3',
                title: 'Diplomatic Mission to North Africa Announced',
                excerpt: 'The State Department seeks to strengthen ties with emerging economic powers.',
                content: 'CAIRO — High-level talks are scheduled for next week as a diplomatic delegation arrives to discuss regional security and trade.',
                author: 'Robert Miller',
                date: '2026-03-28',
                category: 'Politics',
                image: 'https://picsum.photos/seed/diplomacy/1200/800',
                readTime: '3 min read'
              }
            ]
          },
          {
            id: 'culture',
            name: 'Culture & Arts',
            articles: [
              {
                id: 'art-3',
                title: 'The Renaissance of Analog: Why Vinyl is Back',
                author: 'Sarah Jenkins',
                date: '2026-03-27',
                category: 'Culture',
                excerpt: 'In an increasingly digital world, the tactile experience of vinyl records is capturing the hearts of a new generation.',
                content: 'There is something about the crackle of a needle on a record that digital simply cannot replicate...',
                image: 'https://picsum.photos/seed/vinyl/800/600',
                readTime: '5 min read'
              },
              {
                id: 'art-5',
                title: 'The Lost Art of Letter Writing',
                author: 'Thomas Penman',
                date: '2026-03-26',
                category: 'Culture',
                excerpt: 'In the age of instant messaging, the slow, deliberate act of writing a letter is becoming a radical act of connection.',
                content: 'Ink on paper, the smell of an envelope, the wait for the postman. These are experiences we are losing to the screen...',
                image: 'https://picsum.photos/seed/letter/800/600',
                readTime: '7 min read'
              },
              {
                id: 'art-8',
                title: 'The Renaissance of Physical Books',
                excerpt: 'Why Gen Z is leading a surprising return to print media.',
                content: 'LONDON — Despite the digital age, independent bookstores are reporting record sales as young readers rediscover the tactile joy of paper.',
                author: 'Emily Blunt',
                date: '2026-03-28',
                category: 'Culture',
                image: 'https://picsum.photos/seed/books/1200/800',
                readTime: '4 min read'
              },
              {
                id: 'art-9',
                title: 'Virtual Reality Art Gallery Opens in Paris',
                excerpt: 'A new immersive experience blends classical masterpieces with digital innovation.',
                content: 'PARIS — The Louvre has launched its first fully immersive VR wing, allowing visitors to "step inside" famous paintings.',
                author: 'Pierre Dubois',
                date: '2026-03-27',
                category: 'Arts',
                image: 'https://picsum.photos/seed/art/1200/800',
                readTime: '5 min read'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'financial-ledger',
    name: 'The Financial Ledger',
    tagline: 'The Global Authority on Markets and Policy',
    primaryColor: '#8b0000',
    fontFamily: 'serif',
    theme: 'financial',
    establishedDate: 'Est. 1921',
    issues: [
      {
        id: 'issue-f1',
        issueNumber: 1,
        date: '2026-03-28',
        sections: [
          {
            id: 'markets',
            name: 'Markets',
            articles: [
              {
                id: 'art-f1',
                title: 'Interest Rates Hold Steady Amid Inflation Concerns',
                author: 'David Sterling',
                date: '2026-03-28',
                category: 'Markets',
                excerpt: 'The Central Bank announced today that interest rates will remain unchanged for the third consecutive quarter.',
                content: 'The decision, while expected by most analysts, comes at a time of increasing uncertainty in the global economy...',
                image: 'https://picsum.photos/seed/finance/800/600',
                readTime: '5 min read'
              },
              {
                id: 'art-f2',
                title: 'Tech Stocks Rally Amidst Interest Rate Stability',
                excerpt: 'The NASDAQ hits a new all-time high as investors gain confidence in the central bank\'s strategy.',
                content: 'NEW YORK — Wall Street saw a significant surge today as the Federal Reserve signaled a pause in its rate-hiking cycle.',
                author: 'David Goldman',
                date: '2026-03-28',
                category: 'Finance',
                image: 'https://picsum.photos/seed/stocks/1200/800',
                readTime: '4 min read'
              },
              {
                id: 'art-f3',
                title: 'Crypto Regulation Bill Headed to President\'s Desk',
                excerpt: 'New framework aims to provide clarity for digital asset markets.',
                content: 'WASHINGTON — The comprehensive Digital Assets Act passed the House today, promising a new era of regulated crypto trading.',
                author: 'Sophie Reed',
                date: '2026-03-28',
                category: 'Crypto',
                image: 'https://picsum.photos/seed/crypto/1200/800',
                readTime: '6 min read'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'the-daily-echo',
    name: 'The Daily Echo',
    tagline: 'Bigger, Bolder, Better News',
    primaryColor: '#ff0000',
    fontFamily: 'sans',
    theme: 'tabloid',
    establishedDate: 'Est. 1955',
    issues: [
      {
        id: 'issue-e1',
        issueNumber: 1,
        date: '2026-03-28',
        sections: [
          {
            id: 'gossip',
            name: 'Gossip',
            articles: [
              {
                id: 'art-e1',
                title: 'STARS IN SCANDAL: WHO WAS CAUGHT AT THE GALA?',
                author: 'Rita Skeeter',
                date: '2026-03-28',
                category: 'Entertainment',
                excerpt: 'Exclusive photos from the Midnight Gala reveal a secret romance between the city\'s biggest stars.',
                content: 'You won\'t believe who was seen together! Our sources say they\'ve been dating for months...',
                image: 'https://picsum.photos/seed/gossip/800/600',
                readTime: '3 min read'
              },
              {
                id: 'art-e2',
                title: 'Hollywood Icon Announces Surprise Retirement',
                excerpt: 'The legendary actor says it\'s time to "step away from the spotlight" after 50 years.',
                content: 'LOS ANGELES — In a shocking announcement, Jack Nicholson revealed he is retiring from acting effective immediately.',
                author: 'Gossip Greg',
                date: '2026-03-28',
                category: 'Celebrity',
                image: 'https://picsum.photos/seed/hollywood/1200/800',
                readTime: '3 min read'
              },
              {
                id: 'art-e3',
                title: 'Mystery Celebrity Spotted in Small Town Diner',
                excerpt: 'Locals are buzzing after a world-famous singer was seen eating pancakes in rural Ohio.',
                content: 'CHILLICOTHE — Residents of this quiet town were stunned when Taylor Swift walked into a local diner for breakfast.',
                author: 'Penny Prazzi',
                date: '2026-03-28',
                category: 'Gossip',
                image: 'https://picsum.photos/seed/diner/1200/800',
                readTime: '2 min read'
              }
            ]
          }
        ]
      }
    ]
  }
]);
