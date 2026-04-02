path = r"e:\eduhealth-ai---trợ-lý-sức-khỏe-học-đường (1)\App.tsx"
with open(path, 'r', encoding='utf-8') as f:
    t = f.read()

# 1. Fix WEEKLY_TRENDS - replace with new Bản tin sức khỏe học đường
old_trends = """const WEEKLY_TRENDS: WeeklyTrend[] = [
  {
    id: 'trend-1',
    icon: '🌡️',
    title: 'Giao mùa – Mụn dị ứng bùng phát',
    description: 'Thời tiết giao mùa khiến 40% học sinh trường X gặp phát ban, mụn đỏ dị ứng. Xem ngay cách phòng tránh và xử lý tại nhà.',
    category: 'MỤN & DA LIỄU',
    alertLevel: 'hot',
    relatedTopicId: 'mun-1',
    relatedTopicTitle: 'Mụn trứng cá (Acne Vulgaris)',
  },
  {
    id: 'trend-2',
    icon: '🦟',
    title: 'Muỗi Aedes hoành hành – Cảnh giác sốt xuất huyết',
    description: 'Mùa mưa bắt đầu, số ca sốt xuất huyết nhập viện tăng 25%. Kiểm tra lớp học ngay: lọ hoa, vũng nước, vỏ lon đều là ổ muỗi.',
    category: 'BỆNH LÂY NHIỄM',
    alertLevel: 'warn',
    relatedTopicId: 'tcm-6',
    relatedTopicTitle: 'Sốt xuất huyết (Dengue)',
  },
  {
    id: 'trend-3',
    icon: '📱',
    title: 'Học online tăng – Mỏi mắt ở học sinh',
    description: 'Sau kỳ thi, thời gian nhìn màn hình tăng vọt. 1/3 học sinh THCS than phiền đau đầu, mờ mắt cuối ngày.',
    category: 'BỆNH LÂY NHIỄM',
    alertLevel: 'warn',
    relatedTopicId: 'tl-1',
    relatedTopicTitle: 'Cận thị & Mỏi mắt',
  },
  {
    id: 'trend-4',
    icon: '🍜',
    title: 'Ký túc xá – Ngộ độc thực phẩm',
    description: 'Trường nội trú phát hiện 12 ca đau bụng, tiêu chảy trong tuần. Nguồn thức ăn ngoài cổng trường là đối tượng nghi ngờ hàng đầu.',
    category: 'TIÊU HÓA',
    alertLevel: 'warn',
    relatedTopicId: 'th-1',
    relatedTopicTitle: 'Tiêu chảy nhiễm trùng (Rotavirus)',
  },
  {
    id: 'trend-5',
    icon: '💤',
    title: 'Thi cử – Stress & Rối loạn giấc ngủ',
    description: 'Giai đoạn thi học kỳ, phòng y tế ghi nhận nhiều học sinh đến vì đau đầu, mất ngủ, lo âu. Đây là tín hiệu cần quan tâm.',
    category: 'SỨC KHỎE TÂM LÝ',
    alertLevel: 'info',
    relatedTopicId: 'tl-1',
    relatedTopicTitle: 'Rối loạn giấc ngủ & Stress học tập',
  },
];"""

new_trends = """const WEEKLY_TRENDS: WeeklyTrend[] = [
  {
    id: 'trend-1',
    icon: '🌡️',
    title: 'Giao mùa – Mụn dị ứng bùng phát',
    description: 'Thời tiết giao mùa khiến 40% học sinh trường X gặp phát ban, mụn đỏ dị ứng. Xem ngay cách phòng tránh và xử lý tại nhà.',
    category: 'MỤN & DA LIỄU',
    alertLevel: 'hot',
    relatedTopicId: 'mun-1',
    relatedTopicTitle: 'Mụn trứng cá (Acne Vulgaris)',
  },
  {
    id: 'trend-2',
    icon: '🦟',
    title: 'Muỗi Aedes hoành hành – Cảnh giác sốt xuất huyết',
    description: 'Mùa mưa bắt đầu, số ca sốt xuất huyết nhập viện tăng 25%. Kiểm tra lớp học ngay: lọ hoa, vũng nước, vỏ lon đều là ổ muỗi.',
    category: 'BỆNH LÂY NHIỄM',
    alertLevel: 'warn',
    relatedTopicId: 'tcm-3',
    relatedTopicTitle: 'Cúm (Influenza)',
  },
  {
    id: 'trend-3',
    icon: '📱',
    title: 'Mùa thi – Stress học tập bùng phát',
    description: 'Giai đoạn thi học kỳ, phòng y tế ghi nhận nhiều học sinh đến vì đau đầu, mất ngủ, lo âu. Đây là tín hiệu cần quan tâm.',
    category: 'SỨC KHỎE TÂM LÝ',
    alertLevel: 'warn',
    relatedTopicId: 'tl-1',
    relatedTopicTitle: 'Stress học tập & Rối loạn giấc ngủ',
  },
  {
    id: 'trend-4',
    icon: '🧴',
    title: 'Bướu nước bùng phát ở học sinh',
    description: 'Nhiều trường ghi nhận ca mụn cóc (warts) lây lan qua bể bơi, phòng thay đồ. Hướng dẫn học sinh không dùng chung đồ bơi.',
    category: 'MỤN & DA LIỄU',
    alertLevel: 'warn',
    relatedTopicId: 'mun-10',
    relatedTopicTitle: 'Mụn cóc (Warts)',
  },
  {
    id: 'trend-5',
    icon: '🧼',
    title: 'Cách rửa mặt đúng cho học sinh tuổi dậy thì',
    description: 'Sai lầm phổ biến: rửa mặt bằng xà phòng tắm, dùng khăn bông chung, nặn mụn. Gây viêm nhiễm và sẹo lâu dài. Xem ngay hướng dẫn đúng cách.',
    category: 'MỤN & DA LIỄU',
    alertLevel: 'info',
    relatedTopicId: 'mun-1',
    relatedTopicTitle: 'Mụn trứng cá (Acne Vulgaris)',
  },
];"""

t = t.replace(old_trends, new_trends)

# 2. Fix CATEGORY_COLORS - remove THỊ LỰC and TIÊU HÓA, keep only 4 categories
old_cat_block = """  const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hover: string; chip: string }> = {
    'MỤN & DA LIỄU':    { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', hover: 'hover:bg-red-50 hover:shadow-red-100', chip: 'bg-red-500 text-white' },
    'BỆNH LÂY NHIỄM':   { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', hover: 'hover:bg-orange-50 hover:shadow-orange-100', chip: 'bg-orange-500 text-white' },
    'THỊ LỰC':           { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', hover: 'hover:bg-violet-50 hover:shadow-violet-100', chip: 'bg-violet-500 text-white' },
    'SỨC KHỎE TÂM LÝ':  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', hover: 'hover:bg-pink-50 hover:shadow-pink-100', chip: 'bg-pink-500 text-white' },
    'TIÊU HÓA':          { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', hover: 'hover:bg-green-50 hover:shadow-green-100', chip: 'bg-green-500 text-white' },
    'VỆ SINH':           { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', hover: 'hover:bg-cyan-50 hover:shadow-cyan-100', chip: 'bg-cyan-500 text-white' },
  };

  const allCategories = ['MỤN & DA LIỄU', 'BỆNH LÂY NHIỄM', 'THỊ LỰC', 'SỨC KHỎE TÂM LÝ', 'TIÊU HÓA', 'VỆ SINH'];"""

new_cat_block = """  const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hover: string; chip: string }> = {
    'MỤN & DA LIỄU':    { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', hover: 'hover:bg-red-50 hover:shadow-red-100', chip: 'bg-red-500 text-white' },
    'BỆNH LÂY NHIỄM':   { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', hover: 'hover:bg-orange-50 hover:shadow-orange-100', chip: 'bg-orange-500 text-white' },
    'SỨC KHỎE TÂM LÝ':  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', hover: 'hover:bg-pink-50 hover:shadow-pink-100', chip: 'bg-pink-500 text-white' },
    'VỆ SINH':           { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', hover: 'hover:bg-cyan-50 hover:shadow-cyan-100', chip: 'bg-cyan-500 text-white' },
  };

  const allCategories = ['MỤN & DA LIỄU', 'BỆNH LÂY NHIỄM', 'SỨC KHỎE TÂM LÝ', 'VỆ SINH'];"""

t = t.replace(old_cat_block, new_cat_block)

# 3. Update UI label: "Xu hướng sức khỏe học đường tuần này" → "Bản tin sức khỏe học đường"
t = t.replace(
    'Xu hướng sức khỏe học đường tuần này',
    'Bản tin sức khỏe học đường'
)

# 4. Update the header text to mention "Bản tin sức khỏe"
t = t.replace(
    'Thư viện EduHealth',
    'Bản tin sức khỏe học đường'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(t)

print("All fixes applied!")
print(f"File size: {len(t)} chars")
