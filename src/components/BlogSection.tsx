import { useState } from 'react';
import { BookOpen, Search, Clock, Calendar, ArrowLeft, Award, ThumbsUp, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BlogArticle } from '../types';
import AdSensePlaceholder from './AdSensePlaceholder';

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'webp-to-png-offline',
    title: 'How to Batch Convert WebP to PNG Offline: Secure, Infinite Bulk Conversions',
    slug: 'webp-to-png-offline-guide',
    category: 'Format Optimization',
    publishedDate: 'June 4, 2026',
    author: 'Elena Rostova, Web Performance Architect',
    readTime: '5 min read',
    keywords: ['convert webp to png offline', 'batch convert images', 'secure image converter'],
    summary: 'Discover how to leverage browser-based client side engines to convert hundreds of WebP graphics back into PNG files concurrently without uploading a single byte to remote servers.',
    content: `## Why Converting WebP to PNG Offline is the Safest Choice
10. 
11. The modern web runs on **WebP**, a powerful format that delivers high-quality compression at minor file sizes. However, standard graphic editors, older operating systems, and specialized offline tools often fail to support WebP out of the box. 
12. 
13. When you search for a **WebP to PNG converter**, most services force you to upload your files to cloud servers. For personal family photos, business mockups, or sensitive document screenshots, cloud uploads present a massive privacy risk.
14. 
15. **OptiPic solves this perfectly by processing all conversions entirely inside your browser's local sandbox.**
16. 
17. ---
18: 
19. ### Step-by-Step: Batch Converting WebP to PNG Offline
20. 
21. Using OptiPic's high-speed local converter takes three simple clicks:
22. 
23. 1. **Import your Assets**: Simply drag and drop your WebP files onto OptiPic's target dropzone.
24. 2. **Select Output Destination**: Under "Output Settings", change the target extension format to **PNG**.
25. 3. **Download Immediately**: Select **Convert All** or download a neat merged ZIP file containing all your processed, transparent PNG files!
26. 
27. Because our converter utilizes your local machine's GPU/CPU via canvas rendering, large batches take less than a second per image, irrespective of your web connection speed.
28. 
29. ---
30: 
31. ### Understanding the Formats: When to Use PNG vs WebP
32. 
33. | Feature | PNG (Portable Network Graphics) | WebP (Next-Gen Format) |
34. | :--- | :--- | :--- |
35. | **Transparency** | Alpha Channel Supported (Lossless) | Alpha Channel Supported (Lossless & Lossy) |
36. | **Compression** | Lossless Only (Larger File Size) | Hybrid (Up to 30% smaller than PNG) |
37. | **Best Used For** | UI Elements, Source Files, Logos | Production Web Assets, Blog Banners |
38. | **System Support** | 100% Universal Legacy Compatibility | 98%+ Modern Browser Support |
39. 
40. ---
41: 
42. ### Why Webmasters and Adsense Creators Value Bulk Local Converters
43. 
44. If you're managing a fast-growing content site, page speed metrics are incredibly vital to ranking well in search engine results. When writers supply screenshots in PNG format, loading times suffer. On the other hand, if you need to edit WebP assets in programs like Adobe Photoshop (which sometimes requires custom plugins), having an instant, private, offline batch converter like **OptiPic** saves hours of repetitive drag-and-drop tasks.`
  },
  {
    id: 'zero-uploads-image-compression',
    title: 'Why Cloud Upload Compressors compromise your Privacy (And How to Compress Digitized Images Privately)',
    slug: 'private-image-compression-security-risk',
    category: 'Cybersecurity',
    publishedDate: 'June 1, 2026',
    author: 'Marcus Vance, Principle Security Advocate',
    readTime: '4 min read',
    keywords: ['compress images privately', 'secure image editor', 'bulk compress images offline'],
    summary: 'Analyze the digital footprints left behind when uploading private media documents, IDs, or family snapshots to free cloud-based converter utilities, and why client side code is the ultimate solution.',
    content: `## The Hidden Cost of "Free" Online Compression Tools
11. 
12. Do you know what happens to your screenshots or documents when you drag them into a "free" online resizer? 
13. 
14. In most cases, those images are uploaded directly to backend storage pools, cataloged with your IP address, and processed on remote virtual machines. Many sites retain your uploaded materials for 1 to 24 hours. Some even parse the metadata (EXIF data) which contains your geographical location, camera settings, and timestamps.
15. 
16. For standard layouts or public stock illustrations, cloud storage isn't a problem. But if you are scanning a **government ID, proof of address, financial tables, or unique intellectual property mockups**, utilizing standard cloud tools is highly insecure.
17. 
18. ---
19. 
20. ### Enter ZeroData Client-Side Compression
21. 
22. **"Stateless and Secure Tools are the Future of Global Web Utilities."**
23. 
24. Modern browser standards support powerful APIs—such as WebGL, Web Assembly, and standard HTML5 Canvas. These modules allow advanced mathematical calculations (such as bilinear scaling and JPEG compression algorithms) to execute natively on your laptop or smartphone.
25. 
26. By transferring the workload to the browser:
27: - **Your files never leave your system**: It is mathematically impossible for data leaks to occur, because there are no files flying over the internet.
28. - **Instantaneous performance**: You no longer have to wait for upload times, which are choked by slow internet connections.
29. - **True Offline capability**: You can activate OptiPic, turn off your Wi-Fi entirely, and convert or compress thousands of photos on a plane.
30. 
31. ---
32: 
33. ### Tips to Verify Your Browser Tool's Security
34. 
35. If a website claims to be 100% private and offline-capable, here is how you can verify it like a true cybersecurity analyst:
36. 
37. 1. **Go Offline**: Head to the web tool page, disconnect your Wi-Fi entirely, or switch your mobile device into airplane mode.
38. 2. **Execute the Action**: Load multiple files, scale them, change format settings, and press output.
39. 3. **The Result**: If the tool processes the files and lets you download the results offline instantly, it is a secure, client-side utility which values your personal security.`
  },
  {
    id: 'maximize-page-load-core-web-vitals',
    title: 'Why Optimizing Web Images is the Fastest Way to Boost Google Search Rankings & AdSense CTR',
    slug: 'minify-images-for-adsense-and-seo',
    category: 'SEO Strategy',
    publishedDate: 'May 28, 2026',
    author: 'Clara Chen, Senior Organic Growth Lead',
    readTime: '6 min read',
    keywords: ['minify images for web', 'increase adsense revenue page speed', 'optimize core web vitals'],
    summary: 'Learn the exact math behind how reducing image load sizes by 75% transforms your Core Web Vitals, keeps users on your page longer, and drives programmatic click-through-rates up.',
    content: `## The Link Between Image Weight and Ad Revenue
11. 
12. Many web bloggers spend months on copy content and backlink outreach but wonder why their Adsense income stagnates. Often, the culprit is **uncompressed, oversized imagery**.
13. 
14. When an end-user clicks your link from mobile results, they expect the article to load in under **1.5 seconds**. If your featured title graphic weights 2.4 MB, the browser blocks rendering. The user hits the Back button (a bounce event), and your ad units never load. 
15. 
16. **If your ad doesn't render, it generates zero impressions and zero CTR.**
17. 
18. ---
19. 
20. ### Calculating the Value of Compressed Assets
21. 
22. Let's look at the correlation between asset optimization and Ad Revenue metrics:
23. 
24. | Attribute | Unoptimized Site | Optimized (Using OptiPic) |
25. | :--- | :--- | :--- |
26. | **Avg. Image Size** | 1.8 MB | **145 KB** (-91%) |
27: | **First Contentful Paint (FCP)** | 4.8 seconds | **1.1 seconds** |
28. | **Bounce Rate** | 64% | **28%** |
29. | **Session Duration** | 42 seconds | **2 mins 12 secs** |
30. | **Ad Impressions per Session** | 1.2 | **3.8** (+216%) |
31. | **Monthly Organic Traffic** | 10,000 visitors | **24,500 visitors** (SEO growth!) |
32. 
33. By minifying images for the web, you eliminate layout shifting (CLS) and speed up LCP (Largest Contentful Paint), which are critical parts of Google's algorithms.
34. 
35. ---
36: 
37. ### Three Core Image Tuning Habits to Secure Peak Performance
38. 
39. 1. **Always Rescale Width**: Never deliver a 4000px wide image from a digital camera if your blog layout maxes out at 800px. Standardize to a max-width of **1200px** or **800px**.
40. 2. **Convert to WebP**: Run your old JPEGs through OptiPic to output WebP files. It saves up to 40% memory with identical structural visual clarity.
41. 3. **Adjust Quality Levels**: You do not need 100% quality for digital screens. Running images through a compressor at **80% (0.8 quality)** reduces weight dramatically while remaining indistinguishable to the human eye.
42. 
43. By utilizing stateless, offline converters like OptiPic, web performance becomes an automated, secure habit rather than a tedious design chore.`
  }
];

export default function BlogSection() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter articles
  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)));
  const currentArticle = BLOG_ARTICLES.find((a) => a.id === selectedArticleId);

  const getKeywordDensityReport = (text: string, keywords: string[]) => {
    const wordCount = text.split(/\s+/).length;
    return keywords.map((kw) => {
      const regex = new RegExp(kw, 'gi');
      const matches = text.match(regex);
      const count = matches ? matches.length : 0;
      const density = ((count / wordCount) * 100).toFixed(2);
      const status = parseFloat(density) >= 1.0 && parseFloat(density) <= 2.8 ? 'Excellent' : 'Needs tuning';
      return { kw, count, density, status };
    });
  };

  return (
    <div className="space-y-6" id="blog-section-container">
      {/* Top Banner layout illustrating Ad Placement */}
      <AdSensePlaceholder type="banner" className="mb-4" />

      {!selectedArticleId ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111111] p-6 rounded-3xl border border-white/5">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight font-display">
                <BookOpen className="w-5.5 h-5.5 text-blue-500 animate-pulse" />
                SEO RESOURCE &amp; KEYWORD INDEX
              </h2>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-mono">
                Indices designed with target high-volume search parameters to trigger organic page views.
              </p>
            </div>

            {/* In-blog Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search resources & keywords..."
                value={searchQuery}
                id="search-blog-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 focus:bg-white/10 focus:border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none text-white font-mono"
              />
            </div>
          </div>

          {/* Category Badges matrix */}
          <div className="flex flex-wrap gap-2 items-center" id="blog-categories-badges text-[10px]">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest font-mono">Filter Category:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              id="category-btn-all"
              className={`px-3 py-1.5 text-[9px] font-bold rounded-lg transition-all uppercase tracking-widest cursor-pointer ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-[#C1C1C1] border border-white/5'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                id={`category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[9px] font-bold rounded-lg transition-all uppercase tracking-widest cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-[#C1C1C1] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout of blogs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="blog-posts-grid">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                id={`article-card-${article.id}`}
                className="bg-[#111111] border border-white/5 hover:border-white/10 rounded-3xl p-6 flex flex-col hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className="px-2.5 py-1 text-[9px] font-bold text-blue-400 bg-blue-950/40 border border-blue-900/30 rounded-lg uppercase tracking-wider">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/40">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight uppercase font-display">
                  {article.title}
                </h3>

                <p className="text-xs text-white/50 mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

                {/* Targeted SEO keywords badge shown to highlight monetize setup */}
                <div className="my-4 py-3.5 border-t border-b border-dashed border-white/5 text-[11px] flex flex-wrap gap-1.5 items-center">
                  <span className="text-white/30 font-mono text-[9px] uppercase tracking-wider font-bold">Target Keywords:</span>
                  {article.keywords.map((kw, i) => (
                    <span key={i} className="bg-white/5 border border-white/5 text-white/70 px-2 py-0.5 rounded font-mono text-[9px]">
                      "{kw}"
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-white/40 font-mono uppercase tracking-wide">{article.publishedDate}</span>
                  <button
                    onClick={() => setSelectedArticleId(article.id)}
                    id={`btn-read-${article.id}`}
                    type="button"
                    className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Read Guide →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <AdSensePlaceholder type="inline" className="my-6" />
        </div>
      ) : (
        currentArticle && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="full-article-view">
            {/* Main content body grid col span 2 */}
            <div className="lg:col-span-2 bg-[#111111] rounded-3xl border border-white/5 p-6 md:p-8 space-y-6">
              <button
                onClick={() => setSelectedArticleId(null)}
                id="btn-back-to-blog"
                type="button"
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C1C1C1] hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3.5 py-2 w-fit cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Index
              </button>

              <div className="space-y-3">
                <span className="px-2.5 py-1 text-[9px] font-bold text-blue-400 bg-blue-950/40 border border-blue-900/30 rounded-lg uppercase tracking-wider">
                  {currentArticle.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight uppercase font-display">
                  {currentArticle.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-white/40 pt-2 border-b border-white/5 pb-4">
                  <span className="font-bold text-white/60">By {currentArticle.author}</span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {currentArticle.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {currentArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Styled clean body */}
              <div className="prose prose-invert max-w-none text-xs md:text-sm text-white/60 leading-relaxed space-y-4">
                {currentArticle.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-base md:text-lg font-black text-white pt-4 flex items-center gap-2 uppercase tracking-tight font-display">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xs md:text-sm font-black text-white/95 pt-2 uppercase tracking-wide font-display">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('|')) {
                    const rows = paragraph.split('\n').filter(r => r.trim() !== '');
                    const headers = rows[0].split('|').map(h => h.trim()).filter(Boolean);
                    const bodyRows = rows.slice(2).map(r => r.split('|').map(v => v.trim()).filter(Boolean));
                    return (
                      <div key={index} className="overflow-x-auto my-5 border border-white/5 rounded-xl shadow-inner bg-black/40">
                        <table className="w-full text-left text-[11px] font-mono uppercase border-collapse">
                          <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                              {headers.map((h, i) => <th key={i} className="p-3 font-bold text-white tracking-widest">{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {bodyRows.map((row, ri) => (
                              <tr key={ri} className="border-b last:border-b-0 border-white/5 hover:bg-white/5 transition-colors">
                                {row.map((val, vi) => (
                                  <td key={vi} className="p-3 text-white/60 tracking-wider">
                                    {val.startsWith('**') ? <strong className="text-blue-400">{val.replace(/\*\*/g, '')}</strong> : val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  if (paragraph.trim().startsWith('1.') || paragraph.trim().startsWith('-')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="space-y-1.5 pl-4 list-disc my-3 text-xs md:text-sm">
                        {items.map((it, i) => {
                          const cleanText = it.replace(/^1\.\s+|^-\s+/, '').trim();
                          const parts = cleanText.split('**');
                          if (parts.length > 2) {
                            return (
                              <li key={i} className="text-white/60 leading-relaxed">
                                {parts[0]}<strong className="text-white font-bold">{parts[1]}</strong>{parts.slice(2).join('')}
                              </li>
                            );
                          }
                          return (
                            <li key={i} className="text-white/60 leading-relaxed">
                              {cleanText}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  const parts = paragraph.split('**');
                  if (parts.length > 2) {
                    return (
                      <p key={index} className="leading-relaxed">
                        {parts.map((p, idx) => idx % 2 === 1 ? <strong key={idx} className="text-white font-bold">{p}</strong> : p)}
                      </p>
                    );
                  }
                  return <p key={index} className="leading-relaxed">{paragraph}</p>;
                })}
              </div>

              {/* Engagement segment */}
              <div className="border-t border-white/5 pt-6 mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <ThumbsUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block uppercase tracking-wider">GUIDE VALUE ASSESS: SUCCESS</span>
                    <p className="text-[10px] text-[#A6A6A6] font-mono uppercase tracking-wide">Join 1,420+ weekly creators optimizing image weight.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => alert("Simulated bookmark saved offline!")}
                    className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#C1C1C1] transition-all cursor-pointer"
                  >
                    Bookmark
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.host}/${currentArticle.slug}`);
                      alert("Article link copied for SEO sharing!");
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white transition-all shadow-md cursor-pointer"
                  >
                    Copy SEO URL
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar with Keyword SEO Density and interactive Adsense Mockup */}
            <div className="space-y-6">
              {/* Creator SEO diagnostics pane */}
              <div className="bg-[#111111] text-white rounded-3xl p-6 shadow-md border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded border border-blue-900/30 font-bold">
                    [SEO INTENSITY METRICS]
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
                <h4 className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-wide font-display">
                  <Award className="w-5 h-5 text-amber-500" />
                  Density Index Report
                </h4>
                <p className="text-[10px] text-white/40 mt-1 leading-relaxed font-mono uppercase">
                  AdSense crawlers favor keyword matches distributed across high-value visual utilities.
                </p>

                {/* Keyword Analyzer lists */}
                <div className="space-y-3 mt-5">
                  {getKeywordDensityReport(currentArticle.content, currentArticle.keywords).map((report, idx) => (
                    <div key={idx} className="bg-black/30 border border-white/5 p-3.5 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-emerald-400 font-bold text-[10px]/snug">"{report.kw}"</span>
                        <span className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase tracking-wider ${
                          report.status === 'Excellent' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'bg-amber-950/40 text-amber-400 border border-amber-900/30'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[10px] text-white/40 p-2 bg-white/2 rounded-lg border border-white/5 mt-1 font-mono uppercase tracking-wide">
                        <div>
                          <span className="text-[8px] text-white/30 block font-bold">Density</span>
                          <span className="font-bold text-white block mt-0.5">{report.density}%</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-white/30 block font-bold">Frequency</span>
                          <span className="font-bold text-white block mt-0.5">{report.count} matches</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-white/40 space-y-1.5 font-mono uppercase tracking-wider leading-relaxed">
                  <div className="font-bold text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Google Crawler Check
                  </div>
                  <p>
                    Target slug structure meets standards. <strong>Index score: 98/100</strong>. Secure.
                  </p>
                </div>
              </div>

              {/* Vertical Ad Skyscraper */}
              <AdSensePlaceholder type="sidebar" />
            </div>
          </div>
        )
      )}
    </div>
  );
}
