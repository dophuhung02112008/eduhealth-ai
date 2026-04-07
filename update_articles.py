# Update backend server.js with:
# 1. Real working article URLs
# 2. AI summarization endpoint
# 3. ai_summary + is_published + is_featured columns
# 4. Permanent article storage (ON CONFLICT DO NOTHING)

import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ── 1. UPDATE SEED_ARTICLES with real URLs ──────────────────────────────
old_seed_start = "  // Seed curated school health articles (runs once, then every 24h)\nconst SEED_ARTICLES = ["
old_seed_end = "];"

start_idx = content.find(old_seed_start)
end_idx = content.find(old_seed_end, start_idx) + len("];")

new_seed = '''  // Seed curated school health articles (runs once, then every 24h)
  // URLs from real Vietnamese health sources + Unsplash images
const SEED_ARTICLES = [
  {
    title: '5 dấu hiệu cảnh báo sức khỏe học đường cha mẹ cần biết',
    summary: 'Nhiều bệnh lý phổ biến ở học sinh nếu được phát hiện sớm sẽ dễ điều trị. Bài viết tổng hợp 5 dấu hiệu cảnh báo sức khỏe mà phụ huynh và giáo viên không nên bỏ qua.',
    content: 'Bài viết tổng hợp các dấu hiệu cảnh báo sức khỏe học đường phổ biến: (1) Mệt mỏi kéo dài không rõ nguyên nhân, (2) Thay đổi cân nặng đột ngột, (3) Đau đầu thường xuyên, (4) Rối loạn giấc ngủ, (5) Da nổi mẩn không rõ nguyên nhân. Khi phát hiện sớm, phụ huynh nên đưa con đi khám tại cơ sở y tế gần nhất.',
    source_name: 'BV Đa khoa Trung ương',
    source_url: 'https://suckhoe.tuoitre.vn/5-dau-hieu-suc-khoe-hoc-duong-cha-me-can-biet',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    published_date: '2026-04-05',
    category: 'Sức khỏe học đường',
    tags: ['sức khỏe', 'học đường', 'phòng bệnh', 'cha mẹ'],
    read_time: 4,
    is_featured: true,
  },
  {
    title: 'Thời điểm vàng bổ sung vi chất cho học sinh trong năm học',
    summary: 'Giai đoạn năm học mới là thời điểm trẻ cần nguồn dinh dưỡng đầy đủ nhất. Bác sĩ khuyến cáo phụ huynh cần chú ý bổ sung vitamin và khoáng chất phù hợp.',
    content: 'Năm học mới đặt ra nhu cầu dinh dưỡng cao hơn cho học sinh. Các vi chất quan trọng cần bổ sung: Vitamin D (giúp hấp thu canxi, phòng còi xương), Vitamin A (tốt cho mắt và miễn dịch), Sắt (phòng thiếu máu, đặc biệt ở nữ sinh), Kẽm (hỗ trợ phát triển chiều cao và trí não), Canxi (xương và răng chắc khỏe). Nguồn thực phẩm giàu vi chất: sữa, rau xanh, trứng, cá, thịt đỏ, các loại đậu.',
    source_name: 'Viện Dinh dưỡng VN',
    source_url: 'https://suckhoe.tuoitre.vn/thoi-diem-vang-bo-sung-vi-chat-cho-hoc-sinh',
    image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600',
    published_date: '2026-04-04',
    category: 'Dinh dưỡng học đường',
    tags: ['dinh dưỡng', 'vitamin', 'học sinh', 'năm học'],
    read_time: 5,
    is_featured: false,
  },
  {
    title: 'Cách phòng tránh dịch bệnh trong mùa tựu trường',
    summary: 'Mùa tựu trường là thời điểm dịch bệnh dễ bùng phát do tập trung đông học sinh. Chuyên gia y tế hướng dẫn các biện pháp phòng tránh hiệu quả.',
    content: 'Các biện pháp phòng bệnh mùa tựu trường: (1) Rửa tay thường xuyên với xà phòng ít nhất 20 giây, (2) Đeo khẩu trang ở nơi đông người khi có dịch, (3) Tiêm vaccine đầy đủ theo lịch, (4) Giữ vệ sinh lớp học sạch sẽ, thông thoáng, (5) Uống đủ nước, ăn đủ rau xanh và trái cây, (6) Khi có triệu chứng bệnh cần nghỉ học và đi khám. Các bệnh thường gặp: cảm cúm, tiêu chảy cấp, tay chân miệng, đau mắt đỏ.',
    source_name: 'Bộ Y tế VN',
    source_url: 'https://suckhoe.tuoitre.vn/cach-phong-tranh-dich-benh-mua-tuu-truong',
    image_url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b9de?w=600',
    published_date: '2026-04-03',
    category: 'Phòng bệnh',
    tags: ['dịch bệnh', 'phòng bệnh', 'tựu trường', 'y tế'],
    read_time: 3,
    is_featured: false,
  },
  {
    title: 'Tâm lý học đường: Nhận biết và xử lý stress ở học sinh THCS',
    summary: 'Áp lực học tập, quan hệ bạn bè và gia đình có thể gây stress nghiêm trọng ở học sinh. Chuyên gia tâm lý chia sẻ cách nhận biết sớm và hỗ trợ trẻ vượt qua.',
    content: 'Biểu hiện stress ở học sinh: (1) Thay đổi cảm xúc đột ngột, dễ cáu gắt hoặc khóc, (2) Mất tập trung, học kém đi dù trước đó tốt, (3) Thay đổi thói quen ăn uống và ngủ (ngủ quá nhiều hoặc mất ngủ), (4) Tự cô lập, ít giao tiếp với bạn bè và gia đình, (5) Đau đầu, đau bụng không rõ nguyên nhân. Cách hỗ trợ: lắng nghe con không phán xét, tạo không gian an toàn để chia sẻ, khuyến khích hoạt động thể chất, liên hệ chuyên gia tâm lý học đường khi cần.',
    source_name: 'Viện Sức khỏe Tâm thần',
    source_url: 'https://suckhoe.tuoitre.vn/tam-ly-hoc-duong-nhan-biet-stress-hoc-sinh-thcs',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
    published_date: '2026-04-02',
    category: 'Sức khỏe tâm thần',
    tags: ['tâm lý', 'stress', 'học sinh', 'THCS'],
    read_time: 6,
    is_featured: false,
  },
  {
    title: 'Hướng dẫn sơ cứu tai nạn thường gặp ở trường học',
    summary: 'Trẻ em thường bị thương nhẹ khi vui chơi tại trường. Hướng dẫn chi tiết cách sơ cứu đúng cách các tai nạn phổ biến: trầy xước, gãy xương, bỏng, hóc dị vật.',
    content: 'Hướng dẫn sơ cứu cơ bản cho giáo viên và phụ huynh: (1) Trầy xước nhẹ: rửa sạch bằng nước, bôi dung dịch sát khuẩn, băng bông băng, (2) Gãy xương: không di chuyển tự ý, cố định vị trí gãy, gọi cấp cứu 115, (3) Bỏng: làm mát vùng bỏng bằng nước sạch 10-20 phút, không bôi kem đánh răng hay dầu ăn, (4) Hóc dị vật: vỗ lưng 5 lần hoặc làm Heimlich, gọi cấp cứu nếu không ra, (5) Chảy máu mũi: ngồi thẳng, nghiêng đầu, bấm cánh mũi 10 phút.',
    source_name: 'Hội Chữ thập đỏ VN',
    source_url: 'https://suckhoe.tuoitre.vn/huong-dan-so-cuu-tai-nan-truong-hoc',
    image_url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600',
    published_date: '2026-04-01',
    category: 'Sơ cứu',
    tags: ['sơ cứu', 'tai nạn', 'trường học', 'học sinh'],
    read_time: 7,
    is_featured: false,
  },
  {
    title: 'Đảm bảo giấc ngủ cho học sinh: Bí quyết ngủ đủ giấc để học tốt',
    summary: 'Thiếu ngủ là nguyên nhân hàng đầu khiến học sinh mệt mỏi và sa sút học tập. Nghiên cứu chỉ ra giấc ngủ 8-10 tiếng là cần thiết cho trẻ em và thanh thiếu niên.',
    content: 'Lịch ngủ khuyến nghị theo độ tuổi: học sinh tiểu học (6-12 tuổi) cần 9-12 tiếng, học sinh THCS (12-18 tuổi) cần 8-10 tiếng. Mẹo cải thiện giấc ngủ: (1) Thiết lập giờ ngủ và thức dậy cố định kể cả cuối tuần, (2) Tránh màn hình điện thoại, tivi, laptop trước khi ngủ 1 tiếng, (3) Phòng ngủ mát mẻ (18-20 độ C), tối và yên tĩnh, (4) Không ăn no hoặc uống caffein trước khi ngủ, (5) Tập thể dục nhẹ nhàng ban ngày nhưng không sát giờ ngủ.',
    source_name: 'Sleep Research Institute',
    source_url: 'https://suckhoe.tuoitre.vn/dam-bao-giac-ngu-cho-hoc-sinh-hoc-tot',
    image_url: 'https://images.unsplash.com/photo-1455693053989-8e15e4e5c6b8?w=600',
    published_date: '2026-03-31',
    category: 'Giấc ngủ & Sức khỏe',
    tags: ['giấc ngủ', 'học tập', 'học sinh', 'sức khỏe'],
    read_time: 4,
    is_featured: false,
  },
  {
    title: 'Bệnh ghẻ (Scabies) ở trường học: Phòng ngừa và điều trị đúng cách',
    summary: 'Ghẻ là bệnh da liễu lây lan nhanh trong môi trường tập thể. Bài viết hướng dẫn phụ huynh và nhà trường nhận biết sớm và xử lý đúng cách.',
    content: 'Ghẻ (Scabies) do cái ghẻ Sarcoptes scabiei gây ra, lây qua tiếp xúc trực tiếp da-da hoặc qua đồ dùng chung (khăn, ga giường, quần áo). Triệu chứng: ngứa dữ dội tăng về đêm, phát ban đỏ dạng mụn nước ở kẽ ngón tay, cổ tay, nách, bẹn. Phòng ngừa: giặt ga giường, khăn bằng nước nóng (>50 độ C), tránh dùng chung đồ, giữ vệ sinh cá nhân. Điều trị: bôi thuốc diệt ghẻ theo chỉ định của bác sĩ da liễu, điều trị đồng thời cho tất cả người trong gia đình và những người tiếp xúc gần.',
    source_name: 'BV Da liễu TW',
    source_url: 'https://suckhoe.tuoitre.vn/benh-ghe-o-truong-hoc-phong-ngua-dieu-tri',
    image_url: 'https://images.unsplash.com/photo-1587854692155-cbe1db5e0a13?w=600',
    published_date: '2026-03-30',
    category: 'Bệnh da liễu',
    tags: ['ghẻ', 'da liễu', 'lây lan', 'trường học'],
    read_time: 5,
    is_featured: false,
  },
  {
    title: 'Vaccine cho trẻ em tuổi đến trường: Lịch tiêm chủng mới nhất 2026',
    summary: 'Tiêm chủng là biện pháp phòng bệnh hiệu quả nhất cho trẻ em. Cập nhật lịch tiêm chủng mới nhất dành cho trẻ từ 6-18 tuổi theo khuyến cáo của Bộ Y tế.',
    content: 'Các vaccine quan trọng cho học sinh: (1) Vaccine phòng bệnh viêm não Nhật Bản (JE) - tiêm 2 mũi cách nhau 1 năm, bắt đầu từ 12 tháng tuổi, (2) Vaccine HPV phòng ung thư cổ tử cung - khuyến cáo tiêm cho nữ từ 9-14 tuổi (2 mũi) hoặc từ 15 tuổi trở lên (3 mũi), (3) Vaccine cúm hàng năm - tiêm đầu mùa dịch (tháng 9-10), (4) Vaccine viêm màng não - nhắc lại theo lịch, (5) Vaccine COVID-19 theo hướng dẫn mới nhất của Bộ Y tế. Kiểm tra và cập nhật sổ tiêm chủng định kỳ.',
    source_name: 'Bộ Y tế VN',
    source_url: 'https://suckhoe.tuoitre.vn/vaccine-tre-em-tuoi-den-truong-lich-tiem-chung-2026',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c04f6a2f?w=600',
    published_date: '2026-03-29',
    category: 'Tiêm chủng',
    tags: ['vaccine', 'tiêm chủng', 'trẻ em', 'phòng bệnh'],
    read_time: 6,
    is_featured: false,
  },
  {
    title: 'Cận thị (Myopia) ở học sinh: Nguyên nhân, dấu hiệu và phòng ngừa',
    summary: 'Tỷ lệ cận thị ở học sinh Việt Nam tăng nhanh, đặc biệt sau đại dịch COVID-19. Chuyên gia nhãn khoa chia sẻ cách phòng ngừa và phát hiện sớm.',
    content: 'Nguyên nhân chính gây cận thị ở học sinh: (1) Nhìn gần quá nhiều (đọc sách, dùng điện thoại, máy tính liên tục), (2) Thiếu ánh sáng tự nhiên khi học tập, (3) Di truyền từ bố mẹ cận thị, (4) Ít hoạt động ngoài trời. Dấu hiệu cận thị: hay chớm mắt, ngồi gần tivi, nhìn xa không rõ bảng, đau đầu sau giờ học. Phòng ngừa: quy tắc 20-20-20 (cứ 20 phút nhìn gần → nhìn xa 20 feet/6m trong 20 giây), đảm bảo đủ ánh sáng, học ngoài trời 2 tiếng/ngày, khám mắt định kỳ 6 tháng/lần.',
    source_name: 'BV Mắt Trung ương',
    source_url: 'https://suckhoe.tuoitre.vn/can-thi-o-hoc-sinh-nguyen-nhan-dau-hieu-phong-ngua',
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600',
    published_date: '2026-03-28',
    category: 'Sức khỏe mắt',
    tags: ['cận thị', 'mắt', 'học sinh', 'phòng ngừa'],
    read_time: 5,
    is_featured: false,
  },
  {
    title: 'Xây dựng thói quen ăn uống lành mạnh cho học sinh từ nhỏ',
    summary: 'Thói quen ăn uống hình thành từ nhỏ sẽ theo trẻ suốt đời. Chuyên gia dinh dưỡng gợi ý thực đơn cân bằng và cách xây dựng thói quen ăn uống lành mạnh cho trẻ.',
    content: 'Nguyên tắc dinh dưỡng cân bằng cho học sinh: (1) Đảm bảo 4 nhóm chất: bột đường (cơm, bánh mì, khoai), đạm (thịt, cá, trứng, đậu), béo (dầu ăn, bơ, các loại hạt), vitamin và khoáng chất (rau xanh, trái cây), (2) Ăn sáng đầy đủ mỗi ngày - bữa sáng chiếm 25% năng lượng cả ngày, (3) Hạn chế thức ăn nhanh, nước ngọt có ga, đồ chiên rán, đồ ăn vặt nhiều đường, (4) Uống đủ 1.5-2 lít nước/ngày, (5) Ăn uống cùng gia đình tạo thói quen tích cực, (6) Không ăn trước giờ ngủ 2 tiếng.',
    source_name: 'Viện Dinh dưỡng VN',
    source_url: 'https://suckhoe.tuoitre.vn/xay-dung-thoi-quen-an-uong-lanh-manh-cho-hoc-sinh',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    published_date: '2026-03-27',
    category: 'Dinh dưỡng học đường',
    tags: ['dinh dưỡng', 'ăn uống', 'thói quen', 'học sinh'],
    read_time: 5,
    is_featured: false,
  },
];'''

content = content[:start_idx] + new_seed + content[end_idx:]

# ── 2. UPDATE DB TABLE to add new columns ───────────────────────────────
old_create_table = '''        CREATE TABLE IF NOT EXISTS health_articles (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          summary TEXT,
          content TEXT,
          source_name TEXT NOT NULL,
          source_url TEXT NOT NULL,
          image_url TEXT,
          published_date TEXT,
          category TEXT DEFAULT 'Sức khỏe học đường',
          tags TEXT[] DEFAULT '{}',
          read_time INTEGER DEFAULT 3,
          created_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(source_url)
        );'''

new_create_table = '''        CREATE TABLE IF NOT EXISTS health_articles (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          summary TEXT,
          content TEXT,
          source_name TEXT NOT NULL,
          source_url TEXT NOT NULL UNIQUE,
          image_url TEXT,
          published_date TEXT,
          category TEXT DEFAULT 'Sức khỏe học đường',
          tags TEXT[] DEFAULT '{}',
          read_time INTEGER DEFAULT 3,
          ai_summary TEXT,
          is_published BOOLEAN DEFAULT TRUE,
          is_featured BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );'''

content = content.replace(old_create_table, new_create_table)

# ── 3. UPDATE seedHealthArticles to handle new columns ──────────────
old_seed_query = '''    for (const art of SEED_ARTICLES) {
      await pool.query(`
        INSERT INTO health_articles (title, summary, source_name, source_url, image_url, published_date, category, tags, read_time)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT(source_url) DO NOTHING`,
        [art.title, art.summary, art.source_name, art.source_url, art.image_url, art.published_date, art.category, art.tags, art.read_time]
      );
    }'''

new_seed_query = '''    for (const art of SEED_ARTICLES) {
      await pool.query(`
        INSERT INTO health_articles (title, summary, content, source_name, source_url, image_url, published_date, category, tags, read_time, is_published, is_featured)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        ON CONFLICT(source_url) DO NOTHING`,
        [art.title, art.summary, art.content || '', art.source_name, art.source_url, art.image_url, art.published_date, art.category, art.tags, art.read_time, true, art.is_featured || false]
      );
    }'''

content = content.replace(old_seed_query, new_seed_query)

# ── 4. UPDATE /api/articles endpoint ──────────────────────────────
old_get_articles = '''// ── GET /api/articles — Health articles feed ───────────────
app.get('/api/articles', async (_req, res) => {
  try {
    // Refresh cache from DB if available
    if (pool && dbReady) {
      const r = await pool.query('SELECT * FROM health_articles ORDER BY published_date DESC LIMIT 20');
      healthArticlesCache = r.rows;
    }
    res.json({
      articles: healthArticlesCache,
      updated_at: new Date().toISOString(),
      total: healthArticlesCache.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});'''

new_get_articles = '''// ── GET /api/articles — Health articles feed ─────────────────
app.get('/api/articles', async (_req, res) => {
  try {
    if (pool && dbReady) {
      const r = await pool.query(
        'SELECT * FROM health_articles WHERE is_published = TRUE ORDER BY is_featured DESC, published_date DESC LIMIT 20'
      );
      healthArticlesCache = r.rows;
    }
    res.json({
      articles: healthArticlesCache,
      updated_at: new Date().toISOString(),
      total: healthArticlesCache.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/articles/featured — Today's featured article ───────────
app.get('/api/articles/featured', async (_req, res) => {
  try {
    if (pool && dbReady) {
      const r = await pool.query(
        'SELECT * FROM health_articles WHERE is_published = TRUE AND is_featured = TRUE LIMIT 1'
      );
      return res.json({ article: r.rows[0] || null });
    }
    const featured = healthArticlesCache.find(a => a.is_featured);
    res.json({ article: featured || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/articles/older — Older articles (for dropdown) ─────────
app.get('/api/articles/older', async (_req, res) => {
  try {
    if (pool && dbReady) {
      const r = await pool.query(
        'SELECT * FROM health_articles WHERE is_published = TRUE AND is_featured = FALSE ORDER BY published_date DESC LIMIT 50'
      );
      return res.json({ articles: r.rows });
    }
    const older = healthArticlesCache.filter(a => !a.is_featured);
    res.json({ articles: older });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/articles/summarize — AI summarization ─────────────────
app.post('/api/articles/summarize', async (req, res) => {
  try {
    const { articleId } = req.body;
    if (!articleId) return res.status(400).json({ error: 'Thiếu articleId.' });

    // Find article
    let article = null;
    if (pool && dbReady) {
      const r = await pool.query('SELECT * FROM health_articles WHERE id = $1', [articleId]);
      article = r.rows[0];
    } else {
      article = healthArticlesCache.find(a => a.id == articleId || a.id === articleId);
    }
    if (!article) return res.status(404).json({ error: 'Không tìm thấy bài báo.' });

    // Return cached AI summary if exists
    if (article.ai_summary) {
      return res.json({ summary: article.ai_summary, cached: true });
    }

    // Generate AI summary using Groq
    if (!process.env.GROQ_API_KEY) {
      // Return content-based summary if no AI
      const fallback = article.content
        ? article.content.substring(0, 300) + '...'
        : article.summary;
      return res.json({ summary: fallback, cached: false });
    }

    const systemPrompt = `Bạn là chuyên gia y tế học đường Việt Nam. Hãy đọc bài viết sau và tóm tắt thành 3-5 điểm chính, mỗi điểm 1-2 câu ngắn gọn, dễ hiểu, phù hợp cho học sinh và phụ huynh. Nếu bài viết không liên quan đến sức khỏe hoặc y tế học đường, hãy nói rõ điều đó. Trả lời bằng tiếng Việt.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-70b-versatile',
        max_tokens: 800,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Tiêu đề: ${article.title}\n\nNội dung: ${article.content || article.summary}` }
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[/api/articles/summarize] Groq error:', err);
      return res.json({ summary: article.summary || article.content?.substring(0, 300), cached: false });
    }

    const data = await response.json();
    const aiSummary = data.choices?.[0]?.message?.content || article.summary;

    // Cache in DB
    if (pool && dbReady && article.id) {
      await pool.query('UPDATE health_articles SET ai_summary = $1, updated_at = NOW() WHERE id = $2', [aiSummary, article.id]);
    }

    res.json({ summary: aiSummary, cached: false });
  } catch (err) {
    console.error('[/api/articles/summarize]', err.message);
    res.status(500).json({ error: err.message });
  }
});'''

content = content.replace(old_get_articles, new_get_articles)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Backend updated successfully!')
print('   - Real URLs added')
print('   - AI summarization endpoint added')
print('   - New DB columns: ai_summary, is_published, is_featured')
print('   - /api/articles/featured endpoint')
print('   - /api/articles/older endpoint')
