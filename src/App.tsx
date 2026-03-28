import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Article from './pages/Article';
import BrandHub from './pages/BrandHub';
import Config from './pages/Config';
import Search from './pages/Search';
import Section from './pages/Section';
import About from './pages/About';
import Contact from './pages/Contact';
import Archive from './pages/Archive';
import Terms from './pages/Terms';
import ArticleEditor from './pages/ArticleEditor';
import { NewspaperProvider } from './context/NewspaperContext';

export default function App() {
  return (
    <NewspaperProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/hub" element={<BrandHub />} />
            <Route path="/config" element={<Config />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sections/:name" element={<Section />} />
            <Route path="/sections" element={<Section />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/editor/:brandId/:articleId" element={<ArticleEditor />} />
          </Routes>
        </Layout>
      </Router>
    </NewspaperProvider>
  );
}
