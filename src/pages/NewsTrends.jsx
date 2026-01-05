import React from "react";
import { Tag, ExternalLink } from "lucide-react";

const NewsTrends = () => {
  const [activeTab, setActiveTab] = React.useState('news');
  const [news, setNews] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'news') {
          if (news.length > 0) { setLoading(false); return; } // Cache hit
          const response = await fetch('http://localhost:3001/api/news?category=technology');
          if (!response.ok) throw new Error('Failed to fetch news');
          const data = await response.json();
          setNews(data.map((article, index) => ({
            id: index,
            title: article.title,
            domain: article.source.name || "Tech",
            why: article.description || "No description available.",
            date: new Date(article.publishedAt).toLocaleDateString(),
            url: article.url
          })));
        } else {
          if (jobs.length > 0) { setLoading(false); return; } // Cache hit
          const response = await fetch('http://localhost:3001/api/jobs');
          if (!response.ok) throw new Error('Failed to fetch jobs');
          const data = await response.json();
          setJobs(data);
        }
      } catch (err) {
        setError(activeTab === 'news'
          ? 'Could not load news. Please check if the server is running.'
          : 'Could not load jobs. Please check if the server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, news.length, jobs.length]); // Added dependencies for caching logic

  return (
    <div className="max-w-4xl py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Updates
      </h1>
      <p className="text-gray-500 dark:text-slate-400 mb-8">
        Stay informed with the latest news and job opportunities.
      </p>

      {/* Tab Switcher */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('news')}
          className={`pb - 2 px - 1 font - medium text - sm transition - colors ${activeTab === 'news'
            ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
            } `}
        >
          News & Trends
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb - 2 px - 1 font - medium text - sm transition - colors ${activeTab === 'jobs'
            ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
            } `}
        >
          Jobs Updates
        </button>
      </div>

      {loading && <div className="p-10 text-center text-gray-500">Loading {activeTab}...</div>}
      {error && <div className="p-10 text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="space-y-6">
          {activeTab === 'news' ? (
            news.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-slate-700/50 hover:border-gray-300 dark:hover:bg-slate-800/60 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-500/20">
                        {item.domain}
                      </span>
                      <span className="text-gray-500 dark:text-slate-500 text-xs">
                        • {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">
                      {item.title}
                    </h3>
                    <div className="bg-yellow-50 dark:bg-yellow-500/5 border-l-2 border-yellow-500/50 p-3 rounded-r-lg">
                      <p className="text-sm text-gray-600 dark:text-slate-300">
                        <span className="font-semibold text-yellow-600 dark:text-yellow-500 uppercase text-xs block mb-1">
                          Why this matters
                        </span>
                        {item.why}
                      </p>
                    </div>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-slate-700/50 hover:border-gray-300 dark:hover:bg-slate-800/60 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-500/20">
                        {job.category || "Remote"}
                      </span>
                      <span className="text-gray-500 dark:text-slate-500 text-xs">
                        • {new Date(job.publication_date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 mb-3 text-sm font-medium">
                      {job.company_name} • {job.candidate_required_location}
                    </p>
                  </div>
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                    Apply <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NewsTrends;
