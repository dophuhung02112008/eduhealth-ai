with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace article card from <a> to <div with onClick
old_card = """                  (showAllArticles ? healthArticles : healthArticles.slice(0, 3)).map((article: any, idx: number) => (
                      <a
                        key={article.id || idx}
                        href={article.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`pill-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${darkMode ? 'pill-card-dark' : ''}`}
                        style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
                      >"""

new_card = """                  (showAllArticles ? healthArticles : healthArticles.slice(0, 3)).map((article: any, idx: number) => (
                      <div
                        key={article.id || idx}
                        onClick={() => openArticleModal(article)}
                        className={`pill-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${darkMode ? 'pill-card-dark' : ''}`}
                        style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
                      >"""

content = content.replace(old_card, new_card)

# Close </a> tag
content = content.replace(
    """                        </a>
                    ))
                  )}

                  {healthArticles.length > 3 && (""",
    """                        </div>
                    ))
                  )}

                  {healthArticles.length > 3 && ("""
)

# Replace "Đọc bài →" link button inside card with expand icon
content = content.replace(
    """                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                              Đọc bài → <ExternalLink size={8} />
                            </span>""",
    """                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                              Xem chi tiết <ChevronRight size={8} />
                            </span>"""
)

# Add openArticleModal function before "Countdown timer"
# Find the line "const [countdown" and add function before it
old_countdown = "  const [countdown, setCountdown] = useState(24 * 60 * 60); // seconds until next refresh"
new_countdown = """  const openArticleModal = (article: any) => {
    setSelectedArticle(article);
    setAiSummary(null);
    setLoadingSummary(true);
    fetch(`${API_BASE}/api/articles/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId: article.id }),
    })
      .then(r => r.json())
      .then(d => { if (d.summary) setAiSummary(d.summary); })
      .catch(() => setAiSummary(article.content || article.summary))
      .finally(() => setLoadingSummary(false));
  };

  // Countdown: simulate 1 new article per day on homepage
  const [countdown, setCountdown] = useState(24 * 60 * 60); // seconds until next refresh"""

content = content.replace(old_countdown, new_countdown)

# Add ArticleDetailModal after "showFindCare && <FindCareModal" and before closing </div> of App
# Find the showFindCare line
content = content.replace(
    """      {showFindCare && <FindCareModal darkMode={darkMode} onClose={() => setShowFindCare(false)} />}
    </div>
  );
};""",
    """      {showFindCare && <FindCareModal darkMode={darkMode} onClose={() => setShowFindCare(false)} />}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedArticle(null)} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white rounded-t-2xl flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">📰</div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs font-medium">{selectedArticle.category}</p>
                <h2 className="font-black text-base leading-tight mt-0.5">{selectedArticle.title}</h2>
                <p className="text-white/70 text-xs mt-1">📰 {selectedArticle.source_name} · ⏱ {selectedArticle.read_time} phút đọc</p>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center shrink-0 transition-all"><X size={18} /></button>
            </div>
            {/* Body */}
            <div className="p-5 space-y-4">
              {/* Thumbnail */}
              {selectedArticle.image_url && (
                <img src={selectedArticle.image_url} alt="" className="w-full h-48 object-cover rounded-xl" />
              )}
              {/* AI Summary */}
              <div className={`rounded-xl p-4 ${darkMode ? 'bg-indigo-900/30 border border-indigo-700' : 'bg-indigo-50 border border-indigo-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xs font-black">🤖</div>
                  <span className={`font-black text-xs ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>TÓM TẮT NỘI DUNG BÀI VIẾT</span>
                  {loadingSummary && <RefreshCw size={12} className="animate-spin ml-auto" />}
                </div>
                {loadingSummary ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400"><div className="w-4 h-4 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />Đang tải tóm tắt từ AI...</div>
                ) : aiSummary ? (
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{aiSummary}</p>
                ) : (
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{selectedArticle.summary || selectedArticle.content || 'Chưa có tóm tắt.'}</p>
                )}
              </div>
              {/* Key info bullets */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.tags.map((tag: string) => (
                    <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-medium ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>#{tag}</span>
                  ))}
                </div>
              )}
              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <a
                  href={selectedArticle.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl font-black text-sm text-center text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg transition-all"
                >
                  🔗 Đọc bài gốc
                </a>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${darkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};"""
)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK - modal added')
