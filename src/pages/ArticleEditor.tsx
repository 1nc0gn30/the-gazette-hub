import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useNewspaper } from '../context/NewspaperContext';
import { Article } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

interface EditorFormState {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  isBreaking: boolean;
  content: string;
  sectionId: string;
}

export default function ArticleEditor() {
  const { brandId, articleId } = useParams();
  const navigate = useNavigate();
  const { brands, updateBrand } = useNewspaper();
  const [status, setStatus] = React.useState('');

  const brand = brands.find((item) => item.id === brandId) || brands[0];
  const issue = brand?.issues[0];

  const target = React.useMemo(() => {
    if (!issue || !articleId) return null;
    for (const section of issue.sections) {
      const article = section.articles.find((candidate) => candidate.id === articleId);
      if (article) {
        return { section, article };
      }
    }
    return null;
  }, [articleId, issue]);

  const [form, setForm] = React.useState<EditorFormState | null>(null);

  React.useEffect(() => {
    if (!target) return;
    setForm({
      title: target.article.title,
      subtitle: target.article.subtitle || '',
      author: target.article.author,
      date: target.article.date,
      category: target.article.category,
      excerpt: target.article.excerpt,
      image: target.article.image || '',
      readTime: target.article.readTime,
      isBreaking: Boolean(target.article.isBreaking),
      content: target.article.content,
      sectionId: target.section.id,
    });
  }, [target]);

  if (!brand || !issue || !target || !form) {
    return (
      <div className="text-center py-20">
        <h2 className="font-serif font-bold text-4xl mb-4">Article Not Found</h2>
        <Link to="/config" className="text-accent-color hover:underline">Return to Config</Link>
      </div>
    );
  }

  const handleChange = (key: keyof EditorFormState, value: string | boolean) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = () => {
    const updatedArticle: Article = {
      ...target.article,
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || undefined,
      author: form.author.trim(),
      date: form.date,
      category: form.category.trim(),
      excerpt: form.excerpt.trim(),
      image: form.image.trim() || undefined,
      readTime: form.readTime.trim(),
      isBreaking: form.isBreaking,
      content: form.content,
    };

    const updatedIssues = brand.issues.map((brandIssue, issueIndex) => {
      if (issueIndex !== 0) return brandIssue;

      return {
        ...brandIssue,
        sections: brandIssue.sections.map((section) => {
          const filtered = section.articles.filter((article) => article.id !== target.article.id);
          if (section.id === form.sectionId) {
            return { ...section, articles: [updatedArticle, ...filtered] };
          }
          return { ...section, articles: filtered };
        }),
      };
    });

    updateBrand(brand.id, { issues: updatedIssues });
    setStatus('Saved locally.');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <header className="mb-8 md:mb-12 border-b-2 border-black pb-6 md:pb-8">
        <Link to="/config" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black mb-4 transition-colors">
          <ArrowLeft size={14} />
          Back to Config
        </Link>
        <h1 className="font-serif font-black text-4xl md:text-6xl uppercase tracking-tighter">Article Editor</h1>
        <p className="text-black/60 text-xs uppercase tracking-widest mt-2">{brand.name} • Full Control</p>
      </header>

      <div className="bg-white/60 newspaper-border p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Title</span>
            <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Subtitle</span>
            <input value={form.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Author</span>
            <input value={form.author} onChange={(e) => handleChange('author', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Date</span>
            <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Category</span>
            <input value={form.category} onChange={(e) => handleChange('category', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Read Time</span>
            <input value={form.readTime} onChange={(e) => handleChange('readTime', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Image URL</span>
            <input value={form.image} onChange={(e) => handleChange('image', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Section</span>
            <select value={form.sectionId} onChange={(e) => handleChange('sectionId', e.target.value)} className="border-b-2 border-black/20 bg-transparent p-2 focus:outline-none focus:border-accent-color">
              {issue.sections.map((section) => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={form.isBreaking} onChange={(e) => handleChange('isBreaking', e.target.checked)} />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Breaking Story</span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Excerpt</span>
          <textarea rows={3} value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} className="border border-black/20 bg-transparent p-3 focus:outline-none focus:border-accent-color resize-none" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Article Content (Markdown)</span>
          <textarea rows={18} value={form.content} onChange={(e) => handleChange('content', e.target.value)} className="border border-black/20 bg-[#f4f1ea] p-3 font-mono text-sm leading-relaxed focus:outline-none focus:border-accent-color resize-y" />
        </label>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs font-bold uppercase tracking-widest opacity-50">{status || 'Changes are local until saved.'}</div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button onClick={handleSave} className="flex-1 sm:flex-none bg-black text-white px-6 py-3 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-accent-color transition-colors">
              <Save size={14} />
              Save Locally
            </button>
            <button onClick={() => navigate(`/article/${target.article.id}`)} className="flex-1 sm:flex-none border border-black px-6 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors">
              View Article
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
