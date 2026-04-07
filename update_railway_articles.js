/**
 * Update Railway PostgreSQL articles with Vietnamese content
 * Run: cd backend && npm install pg && node update_railway_articles.js
 *
 * ⚠️  Nếu chạy BÊN NGOÀI Railway (máy tính local):
 *    1. Vào Railway Dashboard → PostgreSQL → Connection String
 *    2. Thay Railway internal URL bằng public URL (postgresql://...)
 *    3. Chạy: node update_railway_articles.js
 *
 * ⚠️  Nếu chạy TRONG Railway (private network):
 *    Giữ nguyên DATABASE_URL trong .env và deploy script lên Railway
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.EDUHEALTH_DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

const ARTICLES = [
  {
    source_url: 'https://bvdkhv.vn/5-dau-hieu-suc-khoe-hoc-duong',
    title: '5 Dấu hiệu cảnh báo sức khỏe học đường cha mẹ cần biết',
    summary: 'Nhiều bệnh lý phổ biến ở học sinh nếu được phát hiện sớm sẽ dễ điều trị. Bài viết tổng hợp 5 dấu hiệu cảnh báo sức khỏe mà phụ huynh và giáo viên không nên bỏ qua.',
    content: 'Các dấu hiệu cần lưu ý: (1) Mệt mỏi kéo dài không rõ nguyên nhân kéo dài trên 2 tuần, (2) Thay đổi cân nặng đột ngột (tăng hoặc giảm nhanh), (3) Đau đầu thường xuyên, (4) Rối loạn giấc ngủ (mất ngủ hoặc ngủ quá nhiều), (5) Da nổi mẩn không rõ nguyên nhân. Phụ huynh nên đưa con đi khám tại cơ sở y tế gần nhất nếu thấy các dấu hiệu trên kéo dài trên 2 tuần.',
    source_name: 'BV Đa khoa Hùng Vương',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    published_date: '2026-04-05',
    category: 'Sức khỏe học đường',
    tags: ['sức khỏe', 'học đường', 'phòng bệnh', 'cha mẹ'],
    read_time: 4,
    is_featured: true,
  },
  {
    source_url: 'https://bvdkhv.vn/thoi-diem-vang-bo-sung-vi-chat-cho-hoc-sinh',
    title: 'Thời điểm vàng bổ sung vi chất cho học sinh trong năm học',
    summary: 'Giai đoạn năm học mới là thời điểm trẻ cần nguồn dinh dưỡng đầy đủ nhất. Bác sĩ khuyến cáo phụ huynh cần chú ý bổ sung vitamin và khoáng chất phù hợp.',
    content: 'Năm học mới đặt ra nhu cầu dinh dưỡng cao hơn cho học sinh. Các vi chất quan trọng cần bổ sung: Vitamin D (giúp hấp thu canxi, phòng còi xương), Vitamin A (tốt cho mắt và miễn dịch), Sắt (phòng thiếu máu, đặc biệt ở nữ sinh), Kẽm (hỗ trợ phát triển chiều cao và trí não), Canxi (xương và răng chắc khỏe). Nguồn thực phẩm giàu vi chất: sữa, rau xanh, trứng, cá, thịt đỏ, các loại đậu. Nên bổ sung đa vi chất theo hướng dẫn của bác sĩ, không tự ý dùng liều cao.',
    source_name: 'Viện Dinh dưỡng VN',
    image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600',
    published_date: '2026-04-04',
    category: 'Dinh dưỡng học đường',
    tags: ['dinh dưỡng', 'vitamin', 'học sinh', 'năm học'],
    read_time: 5,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/cach-phong-tranh-dich-benh-mua-tuu-truong',
    title: 'Cách phòng tránh dịch bệnh trong mùa tựu trường',
    summary: 'Mùa tựu trường là thời điểm dịch bệnh dễ bùng phát do tập trung đông học sinh. Chuyên gia y tế hướng dẫn các biện pháp phòng tránh hiệu quả.',
    content: 'Các biện pháp phòng bệnh mùa tựu trường: (1) Rửa tay thường xuyên với xà phòng ít nhất 20 giây, (2) Đeo khẩu trang ở nơi đông người khi có dịch, (3) Tiêm vaccine đầy đủ theo lịch, (4) Giữ vệ sinh lớp học sạch sẽ, thông thoáng, (5) Uống đủ nước, ăn đủ rau xanh và trái cây, (6) Khi có triệu chứng bệnh cần nghỉ học và đi khám. Các bệnh thường gặp: cảm cúm, tiêu chảy cấp, tay chân miệng, đau mắt đỏ.',
    source_name: 'BV Đa khoa Hùng Vương',
    image_url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b9de?w=600',
    published_date: '2026-04-03',
    category: 'Phòng bệnh',
    tags: ['dịch bệnh', 'phòng bệnh', 'tựu trường', 'y tế'],
    read_time: 3,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/tam-ly-hoc-duong-nhan-biet-stress-hoc-sinh-thcs',
    title: 'Tâm lý học đường: Nhận biết và xử lý stress ở học sinh THCS',
    summary: 'Áp lực học tập, quan hệ bạn bè và gia đình có thể gây stress nghiêm trọng ở học sinh. Chuyên gia tâm lý chia sẻ cách nhận biết sớm và hỗ trợ trẻ vượt qua.',
    content: 'Biểu hiện stress ở học sinh cần nhận biết: (1) Thay đổi cảm xúc đột ngột, dễ cáu gắt hoặc khóc mà không rõ lý do, (2) Mất tập trung, học kém đi dù trước đó tốt, (3) Thay đổi thói quen ăn uống và ngủ (ngủ quá nhiều hoặc mất ngủ), (4) Tự cô lập, ít giao tiếp với bạn bè và gia đình, (5) Đau đầu, đau bụng không rõ nguyên nhân y học. Cách hỗ trợ trẻ: lắng nghe con không phán xét, tạo không gian an toàn để chia sẻ, khuyến khích hoạt động thể chất, liên hệ chuyên gia tâm lý học đường khi cần.',
    source_name: 'Viện Sức khỏe Tâm thần',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
    published_date: '2026-04-02',
    category: 'Sức khỏe tâm thần',
    tags: ['tâm lý', 'stress', 'học sinh', 'THCS'],
    read_time: 6,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/huong-dan-so-cuu-tai-nan-truong-hoc',
    title: 'Hướng dẫn sơ cứu tai nạn thường gặp ở trường học',
    summary: 'Trẻ em thường bị thương nhẹ khi vui chơi tại trường. Hướng dẫn chi tiết cách sơ cứu đúng cách các tai nạn phổ biến: trầy xước, gãy xương, bỏng, hóc dị vật.',
    content: 'Hướng dẫn sơ cứu cơ bản cho giáo viên và phụ huynh tại trường học: (1) Trầy xước nhẹ: rửa sạch bằng nước, bôi dung dịch sát khuẩn, băng bông băng, (2) Gãy xương: không di chuyển tự ý, cố định vị trí gãy, gọi cấp cứu 115, (3) Bỏng: làm mát vùng bỏng bằng nước sạch 10-20 phút, không bôi kem đánh răng hay dầu ăn, (4) Hóc dị vật: vỗ lưng 5 lần hoặc làm Heimlich, gọi cấp cứu nếu không ra, (5) Chảy máu mũi: ngồi thẳng, nghiêng đầu, bấm cánh mũi 10 phút.',
    source_name: 'Hội Chữ thập đỏ VN',
    image_url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600',
    published_date: '2026-04-01',
    category: 'Sơ cứu',
    tags: ['sơ cứu', 'tai nạn', 'trường học', 'học sinh'],
    read_time: 7,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/dam-bao-giac-ngu-cho-hoc-sinh-hoc-tot',
    title: 'Đảm bảo giấc ngủ cho học sinh: Bí quyết ngủ đủ giấc để học tốt',
    summary: 'Thiếu ngủ là nguyên nhân hàng đầu khiến học sinh mệt mỏi và sa sút học tập. Nghiên cứu cho thấy giấc ngủ 8-10 tiếng là cần thiết cho trẻ em và thanh thiếu niên.',
    content: 'Lịch ngủ khuyến nghị theo độ tuổi: trẻ tiểu học (6-12 tuổi) cần 9-12 tiếng, học sinh THCS (12-18 tuổi) cần 8-10 tiếng mỗi đêm. Các mẹo cải thiện giấc ngủ: (1) Thiết lập giờ ngủ và giờ thức cố định mỗi ngày, kể cả cuối tuần, (2) Tránh màn hình điện thoại, máy tính, tivi trước khi ngủ ít nhất 1 tiếng, (3) Phòng ngủ mát mẻ (18-20°C), tối và yên tĩnh, (4) Không ăn no hoặc uống đồ có caffein (cà phê, nước tăng lực) trước khi ngủ, (5) Tập thể dục nhẹ nhàng ban ngày giúp ngủ sâu hơn. Giấc ngủ chất lượng giúp trẻ ghi nhớ bài vở tốt hơn.',
    source_name: 'Viện Nghiên cứu Giấc ngủ',
    image_url: 'https://images.unsplash.com/photo-1455693053989-8e15e4e5c6b8?w=600',
    published_date: '2026-03-31',
    category: 'Giấc ngủ & Sức khỏe',
    tags: ['giấc ngủ', 'học tập', 'học sinh', 'sức khỏe'],
    read_time: 4,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/benh-ghe-o-truong-hoc-phong-ngua-dieu-tri',
    title: 'Bệnh ghẻ (Scabies) ở trường học: Phòng ngừa và điều trị',
    summary: 'Ghẻ là bệnh da liễu lây lan nhanh trong môi trường tập thể. Hướng dẫn phụ huynh và nhà trường nhận biết sớm và xử lý đúng cách.',
    content: 'Bệnh ghẻ (Scabies) do cái ghẻ (Sarcoptes scabiei) gây ra, lây qua tiếp xúc trực tiếp da-da hoặc qua đồ dùng chung (khăn, ga giường, quần áo). Triệu chứng đặc trưng: ngứa dữ dội ngày đêm, đặc biệt tăng về đêm, phát ban dạng sẩn, mụn nước nhỏ ở khe ngón tay, cổ tay, nách, khuỷu, bẹn. Biện pháp phòng ngừa: giặt ga giường, khăn, quần áo bằng nước nóng (>50°C), tránh dùng chung đồ cá nhân, giữ vệ sinh cá nhân sạch sẽ. Điều trị: bôi thuốc diệt ghẻ (permethrin 5%) theo đúng chỉ định của bác sĩ da liễu, tất cả thành viên trong gia đình cùng điều trị phòng lây lan.',
    source_name: 'BV Da liễu TW',
    image_url: 'https://images.unsplash.com/photo-1587854692155-cbe1db5e0a13?w=600',
    published_date: '2026-03-30',
    category: 'Bệnh da liễu',
    tags: ['ghẻ', 'da liễu', 'lây lan', 'trường học'],
    read_time: 5,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/vaccine-tre-em-tuoi-den-truong-lich-tiem-chung-2026',
    title: 'Vaccine cho trẻ em tuổi đến trường: Lịch tiêm chủng 2026',
    summary: 'Tiêm chủng là biện pháp phòng bệnh hiệu quả nhất cho trẻ em. Cập nhật lịch tiêm chủng dành cho trẻ từ 6-18 tuổi theo khuyến cáo của Bộ Y tế.',
    content: 'Các vaccine quan trọng cần tiêm đầy đủ cho trẻ tuổi học đường: (1) Vaccine phòng viêm não Nhật Bản (JE) - tiêm 2 mũi cách nhau 1 năm, bắt đầu từ 12 tháng tuổi, (2) Vaccine HPV - cho nữ từ 9-14 tuổi (2 mũi cách 6 tháng), phòng ung thư cổ tử cung, (3) Vaccine cúm mùa - tiêm hàng năm vào đầu mùa dịch (tháng 9-10), (4) Vaccine COVID-19 theo hướng dẫn mới nhất của Bộ Y tế. Kiểm tra và cập nhật sổ tiêm chủng định kỳ 6 tháng/lần tại trạm y tế xã/phường hoặc bệnh viện.',
    source_name: 'BV Đa khoa Hùng Vương',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c04f6a2f?w=600',
    published_date: '2026-03-29',
    category: 'Tiêm chủng',
    tags: ['vaccine', 'tiêm chủng', 'trẻ em', 'phòng bệnh'],
    read_time: 6,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/can-thi-o-hoc-sinh-nguyen-nhan-dau-hieu-phong-ngua',
    title: 'Cận thị (Myopia) ở học sinh: Nguyên nhân, dấu hiệu và phòng ngừa',
    summary: 'Tỷ lệ cận thị ở học sinh Việt Nam tăng nhanh, đặc biệt sau đại dịch COVID-19. Chuyên gia nhãn khoa chia sẻ cách phòng ngừa và phát hiện sớm.',
    content: 'Nguyên nhân chính gây cận thị ở học sinh: (1) Nhìn gần quá nhiều (điện thoại, máy tính, đọc sách liên tục), (2) Thiếu ánh sáng tự nhiên do ít ra ngoài trời, (3) Yếu tố di truyền từ bố mẹ cận thị, (4) Ít hoạt động ngoài trời. Dấu hiệu cận thị sớm: hay chớm mắt, ngồi gần ti-vi, không nhìn rõ bảng từ xa, nhìn xa thường nheo mắt. Biện pháp phòng ngừa: áp dụng quy tắc 20-20-20 (mỗi 20 phút nhìn xa 20 feet = 6m trong 20 giây), học tập và hoạt động ngoài trời ít nhất 2 tiếng mỗi ngày, khám mắt định kỳ 6 tháng/lần.',
    source_name: 'BV Mắt Trung ương',
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600',
    published_date: '2026-03-28',
    category: 'Sức khỏe mắt',
    tags: ['cận thị', 'mắt', 'học sinh', 'phòng ngừa'],
    read_time: 5,
    is_featured: false,
  },
  {
    source_url: 'https://bvdkhv.vn/xay-dung-thoi-quen-an-uong-lanh-manh-cho-hoc-sinh',
    title: 'Xây dựng thói quen ăn uống lành mạnh cho học sinh',
    summary: 'Thói quen ăn uống hình thành từ nhỏ sẽ theo trẻ suốt đời. Chuyên gia dinh dưỡng gợi ý thực đơn cân bằng và cách xây dựng thói quen ăn uống lành mạnh.',
    content: 'Nguyên tắc dinh dưỡng học đường: (1) Đảm bảo đủ 4 nhóm chất: bột đường (cơm, bánh mì), đạm (thịt, cá, trứng, đậu), béo (dầu ăn, mỡ), vitamin và khoáng chất (rau xanh, trái cây), (2) Ăn sáng đầy đủ mỗi ngày giúp tập trung học tập, (3) Hạn chế thức ăn nhanh, nước ngọt, đồ chiên rán, snack nhiều đường, (4) Uống đủ 1.5-2 lít nước mỗi ngày, (5) Ăn uống cùng gia đình tạo thói quen tích cực. Trẻ nên có thói quen uống nhiều nước, ăn nhiều rau xanh và trái cây mỗi ngày, hạn chế đồ ăn vặt không có giá trị dinh dưỡng.',
    source_name: 'Viện Dinh dưỡng VN',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    published_date: '2026-03-27',
    category: 'Dinh dưỡng học đường',
    tags: ['dinh dưỡng', 'ăn uống', 'thói quen', 'học sinh'],
    read_time: 5,
    is_featured: false,
  },
];

async function updateArticles() {
  let client;
  try {
    console.log('🔌 Connecting to Railway PostgreSQL...');
    console.log('   URL:', (process.env.DATABASE_URL || '').replace(/:[^:@]+@/, ':***@'));
    client = await pool.connect();
    console.log('✅ Connected!');

    // Ensure columns exist
    console.log('\n📋 Ensuring columns exist...');
    try {
      await client.query(`ALTER TABLE health_articles ADD COLUMN IF NOT EXISTS content TEXT`); } catch (e) {}
    try {
      await client.query(`ALTER TABLE health_articles ADD COLUMN IF NOT EXISTS ai_summary TEXT`); } catch (e) {}
    try {
      await client.query(`ALTER TABLE health_articles ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE`); } catch (e) {}
    try {
      await client.query(`ALTER TABLE health_articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE`); } catch (e) {}
    try {
      await client.query(`ALTER TABLE health_articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()`); } catch (e) {}
    console.log('   ✅ Columns ready');

    // Show current articles
    const before = await client.query('SELECT id, title, source_url FROM health_articles ORDER BY id');
    console.log(`\n📊 Current articles in DB: ${before.rows.length}`);
    before.rows.forEach(r => console.log(`   [${r.id}] ${r.title.substring(0, 60)}`));

    // Update articles by source_url (UPSERT)
    console.log('\n📝 Updating articles...');
    for (const art of ARTICLES) {
      const result = await client.query(`
        UPDATE health_articles
        SET title = $1, summary = $2, content = $3, source_name = $4,
            image_url = $5, published_date = $6, category = $7, tags = $8,
            read_time = $9, is_featured = $10, updated_at = NOW()
        WHERE source_url = $11
        RETURNING id, title`,
        [art.title, art.summary, art.content, art.source_name, art.image_url,
         art.published_date, art.category, art.tags, art.read_time, art.is_featured, art.source_url]
      );

      if (result.rowCount > 0) {
        console.log(`   ✅ Updated [${result.rows[0].id}]: ${result.rows[0].title.substring(0, 50)}`);
      } else {
        // Insert if not exists
        const insert = await client.query(`
          INSERT INTO health_articles (title, summary, content, source_name, source_url, image_url, published_date, category, tags, read_time, is_published, is_featured)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          RETURNING id`,
          [art.title, art.summary, art.content, art.source_name, art.source_url, art.image_url,
           art.published_date, art.category, art.tags, art.read_time, true, art.is_featured]
        );
        console.log(`   🆕 Inserted: ${art.title.substring(0, 50)}`);
      }
    }

    // Verify
    const after = await client.query('SELECT id, title, source_url, is_featured FROM health_articles ORDER BY published_date DESC');
    console.log(`\n📊 Articles in DB after update: ${after.rows.length}`);
    after.rows.forEach(r => console.log(`   [${r.id}] ${r.is_featured ? '⭐' : '  '} ${r.title.substring(0, 60)}`));
    console.log(`\n✅ Update complete! ${after.rows.length} articles total.`);

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.error('   Hint: If using Railway internal URL, deploy this script to Railway');
    console.error('   Or use a public PostgreSQL URL from Railway Dashboard → PostgreSQL → Connection');
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

updateArticles();
