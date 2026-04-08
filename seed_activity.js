/**
 * Seed activity posts to Railway backend
 * Run: node seed_activity.js
 */
const BASE = 'https://eduhealth-ai-backend-production.up.railway.app';

const posts = [
  {
    type: 'video',
    title: 'Hướng dẫn sơ cứu tai nạn thường gặp ở trường học',
    description: 'Video hướng dẫn các bước sơ cứu cơ bản: trầy xước, bong gân, gãy xương, chảy máu mũi — dành cho giáo viên và học sinh.',
    content: 'Video hướng dẫn chi tiết cách xử lý các tai nạn thường gặp tại trường học. Phần 1: Sơ cứu trầy xước — rửa sạch nước, bôi sát khuẩn, băng bó nhẹ. Phần 2: Bong gân — chườm lạnh, nghỉ ngơi, không xoa bóp mạnh. Phần 3: Gãy xương — cố định, không di chuyển nạn nhân, gọi cấp cứu 115. Phần 4: Chảy máu mũi — ngồi thẳng, nghiêng đầu, bịt mũi 10 phút.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600',
    author_name: 'BS. Trần Minh Tuấn',
    author_role: 'Bác sĩ Y học cổ truyền',
    tags: ['sơ cứu', 'tai nạn', 'y tế trường học', 'học đường'],
    reactions: { like: 142, love: 38, wow: 12, care: 5, fire: 3 }
  },
  {
    type: 'article',
    title: '5 thói quen giúp học sinh THPT ngủ đủ giấc mỗi ngày',
    description: 'Tại sao ngủ đủ 8 tiếng lại quan trọng với sức khỏe và điểm số? Khoa học nói gì về giấc ngủ của tuổi học trò?',
    content: 'Nghiên cứu cho thấy ngủ đủ 8–10 tiếng/đêm giúp học sinh THPT tập trung gấp 3 lần so với ngủ thiếu. (1) Tắt điện thoại 1 tiếng trước giờ ngủ. (2) Giữ phòng mát 24–26°C. (3) Không học trên giường. (4) Uống sữa ấm trước khi ngủ. (5) Thức dậy cùng giờ mỗi ngày kể cả cuối tuần.',
    thumbnail_url: 'https://images.unsplash.com/photo-1455693053989-8a15e5e0e5f6?w=600',
    author_name: 'ThS. Lê Thị Hương Giang',
    author_role: 'Chuyên gia Tâm lý học đường',
    tags: ['giấc ngủ', 'sức khỏe tinh thần', 'học tập hiệu quả', 'tuổi teen'],
    reactions: { like: 98, love: 45, wow: 20, care: 8, fire: 6 }
  },
  {
    type: 'article',
    title: 'Bí quyết ăn sáng đúng cách giúp sáng tỏ cả ngày',
    description: 'Bữa sáng bỏ qua là lỗi phổ biến nhất ở học sinh. Vậy ăn sáng thế nào cho đủ dinh dưỡng trong 15 phút?',
    content: 'Bữa sáng lành mạnh gồm: (1) Tinh bột phức hợp (bánh mì nguyên cám, yến mạch, khoai lang) — cung cấp năng lượng bền vững. (2) Đạm (trứng, sữa, đậu) — giúp no lâu, tập trung học. (3) Chất xơ / vitamin (hoa quả, rau) — hỗ trợ tiêu hóa và miễn dịch. Tránh bánh ngọt, nước ngọt buổi sáng — gây đường huyết tăng nhanh rồi sụt nhanh, khiến buổi trưa mệt lỳ.',
    thumbnail_url: 'https://images.unsplash.com/photo-1504674900247-0877df8cc8a5?w=600',
    author_name: 'TS. Nguyễn Thị Lan Hương',
    author_role: 'Chuyên gia Dinh dưỡng học đường',
    tags: ['dinh dưỡng', 'bữa sáng', 'sức khỏe học đường', 'teen'],
    reactions: { like: 87, love: 33, wow: 15, care: 7, fire: 4 }
  },
  {
    type: 'infographic',
    title: 'So sánh: Cận thị vs Viễn thị — Phân biệt trong 30 giây',
    description: 'Infographic trực quan giúp học sinh tự nhận biết mình có thể đang cận hay viễn thị, khi nào cần đi khám mắt ngay.',
    content: 'CẬN THỊ: Nhìn xa mờ, nhìn gần rõ — phải nheo mắt khi nhìn bảng. VIỄN THỊ: Nhìn gần mờ, đau mắt khi đọc sách — thường đau đầu sau giờ học. LOẠN THỊ: Hình ảnh nhòe, méo — mắt phải điều tiết liên tục. KHI NÀO KHÁM NGAY: Thị lực giảm đột ngột, đau mắt dữ dội, nhìn đôi.',
    thumbnail_url: 'https://images.unsplash.com/photo-1516733968668-dad1c4d1d6f5?w=600',
    author_name: 'ThS. Phạm Văn Đức',
    author_role: 'Bác sĩ Nhãn khoa',
    tags: ['cận thị', 'viễn thị', 'loạn thị', 'sức khỏe mắt', 'infographic'],
    reactions: { like: 156, love: 42, wow: 28, care: 11, fire: 9 }
  },
  {
    type: 'video',
    title: 'Yoga 10 phút giảm căng thẳng giữa giờ học — Không cần mat',
    description: 'Thực hiện ngay tại bàn học: 5 động tác yoga nhẹ nhàng giúp học sinh hạ nhịp tim, tăng tập trung sau giờ ra chơi hoặc trước thi.',
    content: 'Động tác 1: Hít thở bụng 4-7-8 (hít 4s, giữ 7s, thở 8s) × 3 lần. Động tác 2: Quay vai xoay vai trước-ra-sau 10 lần mỗi hướng. Động tác 3: Ngồi thẳng lưng, cúi đầu về vai phải-giữa-trái 30s mỗi bên. Động tác 4: Đứng ôm ngực, thở sâu 5 lần. Động tác 5: Đứng giơ tay lên cao, duỗi người, thở ra từ từ.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2c2aa8c89b?w=600',
    author_name: 'Huấn luyện viên Yoga Minh An',
    author_role: 'Chuyên gia Thể chất & Sức khỏe tinh thần',
    tags: ['yoga', 'giảm stress', 'thể chất', 'học sinh', 'thiết bị số'],
    reactions: { like: 203, love: 67, wow: 34, care: 18, fire: 15 }
  }
];

async function seed() {
  let seeded = 0;
  for (const post of posts) {
    try {
      const res = await fetch(`${BASE}/api/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Seeded: ${post.title}`);
        seeded++;
      } else {
        console.log(`❌ Failed (${res.status}): ${post.title} — ${JSON.stringify(data)}`);
      }
    } catch (e) {
      console.log(`❌ Error: ${post.title} — ${e.message}`);
    }
  }
  console.log(`\nTotal seeded: ${seeded}/${posts.length}`);

  // Verify
  const verify = await fetch(`${BASE}/api/activity`).then(r => r.json()).catch(() => []);
  console.log(`Activity posts total: ${verify.length}`);
}

seed();
