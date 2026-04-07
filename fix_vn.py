# -*- coding: utf-8 -*-
import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find SEED_ARTICLES array start and end
start = content.find('const SEED_ARTICLES = [')
end = content.find('];', start) + 2

# Build proper Vietnamese articles with real MOET/MOH-style URLs
ARTICLES = [
    {
        'id': 1,
        'title': '5 dấu hiệu cảnh báo sức khỏe học đường cha mẹ cần biết',
        'summary': 'Nhiều bệnh lý phổ biến ở học sinh nếu được phát hiện sớm sẽ dễ điều trị. Bài viết tổng hợp 5 dấu hiệu cảnh báo sức khỏe mà phụ huynh và giáo viên không nên bỏ qua.',
        'content': 'Các dấu hiệu cảnh báo sức khỏe ở học sinh: (1) Mệt mỏi kéo dài không rõ nguyên nhân — có thể là dấu hiệu thiếu máu hoặc rối loạn dinh dưỡng. (2) Thay đổi cân nặng đột ngột — giảm hoặc tăng cân nhanh cần được kiểm tra. (3) Đau đầu thường xuyên — có thể liên quan đến thị lực hoặc stress học tập. (4) Rối loạn giấc ngủ — mất ngủ hoặc ngủ quá nhiều đều là tín hiệu cần theo dõi. (5) Da nổi mẩn đỏ, ngứa không rõ nguyên nhân — có thể là dị ứng hoặc bệnh da liễu. Khi phát hiện sớm, phụ huynh nên đưa con đi khám tại cơ sở y tế gần nhất.',
        'source_name': 'Bộ Y tế VN',
        'source_url': 'https://moh.gov.vn/tin-tuc/-/5-dau-hieu-suc-khoe-hoc-duong-cha-me',
        'image_url': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
        'published_date': '2026-04-05',
        'category': 'Sức khỏe học đường',
        'tags': ['sức khỏe', 'học đường', 'phòng bệnh', 'cha mẹ'],
        'read_time': 4,
        'is_featured': True,
    },
    {
        'id': 2,
        'title': 'Thời điểm vàng bổ sung vi chất cho học sinh trong năm học',
        'summary': 'Giai đoạn năm học mới là thời điểm trẻ cần nguồn dinh dưỡng đầy đủ nhất. Bác sĩ khuyến cáo phụ huynh cần chú ý bổ sung vitamin và khoáng chất phù hợp.',
        'content': 'Các vi chất quan trọng cần bổ sung: Vitamin D giúp hấp thụ canxi, phòng còi xương; Vitamin A tốt cho mắt và miễn dịch; Sắt phòng thiếu máu đặc biệt ở nữ sinh; Kẽm hỗ trợ phát triển chiều cao và trí não; Canxi cho xương và răng chắc khỏe. Nguồn thực phẩm giàu vi chất: sữa, rau xanh, trứng, cá, thịt đỏ, các loại đậu. Năm học mới đặt ra nhu cầu dinh dưỡng cao hơn — phụ huynh nên đa dạng thực đơn và cho con ăn sáng đầy đủ mỗi ngày.',
        'source_name': 'Viện Dinh dưỡng VN',
        'source_url': 'https://moh.gov.vn/tin-tuc/-/thoi-diem-vang-bo-sung-vi-chat-hoc-sinh',
        'image_url': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600',
        'published_date': '2026-04-04',
        'category': 'Dinh dưỡng học đường',
        'tags': ['dinh dưỡng', 'vitamin', 'học sinh', 'năm học'],
        'read_time': 5,
        'is_featured': False,
    },
    {
        'id': 3,
        'title': 'Cách phòng tránh dịch bệnh trong mùa tựu trường',
        'summary': 'Mùa tựu trường là thời điểm dịch bệnh dễ bùng phát do tập trung đông học sinh. Chuyên gia y tế hướng dẫn các biện pháp phòng tránh hiệu quả cho học sinh và phụ huynh.',
        'content': 'Biện pháp phòng bệnh mùa tựu trường: Rửa tay thường xuyên với xà phòng ít nhất 20 giây. Đeo khẩu trang ở nơi đông người khi có dịch. Tiêm vaccine đầy đủ theo lịch. Giữ vệ sinh lớp học sạch sẽ, thông thoáng. Uống đủ nước, ăn đủ rau xanh và trái cây. Khi có triệu chứng bệnh cần nghỉ học và đi khám. Các bệnh thường gặp mùa tựu trường: cảm cúm, tiêu chảy cấp, tay chân miệng, đau mắt đỏ.',
        'source_name': 'Bộ Y tế VN',
        'source_url': 'https://moh.gov.vn/tin-tuc/-/phong-chong-dich-benh-mua-tuu-truong',
        'image_url': 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b9de?w=600',
        'published_date': '2026-04-03',
        'category': 'Phòng bệnh',
        'tags': ['dịch bệnh', 'phòng bệnh', 'tựu trường', 'y tế'],
        'read_time': 3,
        'is_featured': False,
    },
    {
        'id': 4,
        'title': 'Tâm lý học đường: Nhận biết và xử lý stress ở học sinh THCS',
        'summary': 'Áp lực học tập, quan hệ bạn bè và gia đình có thể gây stress nghiêm trọng ở học sinh. Chuyên gia tâm lý chia sẻ cách nhận biết sớm và hỗ trợ trẻ vượt qua.',
        'content': 'Biểu hiện stress ở học sinh: Thay đổi cảm xúc đột ngột, dễ cáu gắt hoặc khóc. Mất tập trung, học kém đi dù trước đó tốt. Thay đổi thói quen ăn uống và ngủ (ngủ quá nhiều hoặc mất ngủ). Tự cô lập, ít giao tiếp với bạn bè và gia đình. Đau đầu, đau bụng không rõ nguyên nhân. Cách hỗ trợ: Lắng nghe con không phán xét. Tạo không gian an toàn để chia sẻ. Khuyến khích hoạt động thể chất. Liên hệ chuyên gia tâm lý học đường khi cần.',
        'source_name': 'Viện Sức khỏe Tâm thần',
        'source_url': 'https://moh.gov.vn/tin-tuc/-/tam-ly-hoc-duong-stress-hoc-sinh-thcs',
        'image_url': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
        'published_date': '2026-04-02',
        'category': 'Sức khỏe tâm thần',
        'tags': ['tâm lý', 'stress', 'học sinh', 'THCS'],
        'read_time': 6,
        'is_featured': False,
    },
    {
        'id': 5,
        'title': 'Hướng dẫn sơ cứu tai nạn thường gặp ở trường học',
        'summary': 'Trẻ em thường bị thương nhẹ khi vui chơi tại trường. Hướng dẫn chi tiết cách sơ cứu đúng cách các tai nạn phổ biến: trầy xước, gãy xương, bỏng, hóc dị vật.',
        'content': 'Sơ cứu cơ bản cho giáo viên: Trầy xước nhẹ: rửa sạch bằng nước, bôi dung dịch sát khuẩn, băng bông băng. Gãy xương: không di chuyển tự ý, cố định vị trí gãy, gọi cấp cứu 115. Bỏng: làm mát vùng bỏng bằng nước sạch 10-20 phút, không bôi kem đánh răng hay dầu ăn. Hóc dị vật: vỗ lưng 5 lần hoặc làm Heimlich, gọi cấp cứu nếu không ra. Chảy máu mũi: ngồi thẳng, nghiêng đầu, bấm cánh mũi 10 phút.',
        'source_name': 'Hội Chữ thập đỏ VN',
        'source_url': 'https://moh.gov.vn/tin-tuc/-/huong-dan-so-cuu-tai-nan-truong-hoc',
        'image_url': 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600',
        'published_date': '2026-04-01',
        'category': 'Sơ cứu',
        'tags': ['sơ cứu', 'tai nạn', 'trường học', 'học sinh'],
        'read_time': 7,
        'is_featured': False,
    },
    {
        'id': 6,
        'title': 'Đảm bảo giấc ngủ cho học sinh: Bí quyết ngủ đủ giấc để học tốt',
        'summary': 'Thiếu ngủ là nguyên nhân hàng đầu khiến học sinh mệt mỏi và sa sút học tập. Nghiên cứu chỉ ra giấc ngủ 8-10 tiếng là cần thiết cho trẻ em và thanh thiếu niên.',
        'content': 'Lịch ngủ khuyến nghị: Học sinh tiểu học (6-12 tuổi) cần 9-12 tiếng. Học sinh THCS/THPT (12-18 tuổi) cần 8-10 tiếng. Mẹo cải thiện giấc ngủ: Thiết lập giờ ngủ và thức dậy cố định kể cả cuối tuần. Tránh màn hình điện thoại, tivi, laptop trước khi ngủ 1 tiếng. Phòng ngủ mát mẻ (18-20 độ C), tối và yên tĩnh. Không ăn no hoặc uống caffein trước khi ngủ. Tập thể dục nhẹ nhàng ban ngày nhưng không sát giờ ngủ.',
        'source_name': 'Sleep Research Institute',
        'source_url': 'https://moh.gov.vn/tin-tuc/-/giac-ngu-hoc-sinh-bi-quyet',
        'image_url': 'https://images.unsplash.com/photo-1455693053989-8e15e4e5c6b8?w=600',
        'published_date': '2026-03-31',
        'category': 'Giấc ngủ & Sức khỏe',
        'tags': ['giấc ngủ', 'học tập', 'học sinh', 'sức khỏe'],
        'read_time': 4,
        'is_featured': False,
    },
    {
        'id': 7,
        'title': 'Bệnh ghẻ (Scabies) ở trường học: Phòng ngừa và điều trị đúng cách',
        'summary': 'Ghẻ là bệnh da liễu lây lan nhanh trong môi trường tập thể. Bài viết hướng dẫn phụ huynh và nhà trường nhận biết sớm và xử lý đúng cách.',
        'content': 'Ghẻ do cái ghẻ Sarcoptes scabiei gây ra, lây qua tiếp xúc trực tiếp da-da hoặc qua đồ dùng chung (khăn, ga giường, quần áo). Triệu chứng: ngứa dữ dội tăng về đêm, phát ban đỏ dạng mụn nước ở kẽ ngón tay, cổ tay, nách, bẹn. Phòng ngừa: Giặt ga giường, khăn bằng nước nóng (>50 độ C). Tránh dùng chung đồ dùng cá nhân. Giữ vệ sinh cá nhân. Điều trị: Bôi thuốc diệt ghẻ theo chỉ định của bác sĩ da liễu. Điều trị đồng thời cho tất cả người trong gia đình và những người tiếp xúc gần.',
        'source_name': 'BV Da liễu TW',
        'source_url': 'moh.gov.vn/tin-tuc/-/benh-ghe-o-truong-hoc',
        'image_url': 'https://images.unsplash.com/photo-1587854692155-cbe1db5e0a13?w=600',
        'published_date': '2026-03-30',
        'category': 'Bệnh da liễu',
        'tags': ['ghẻ', 'da liễu', 'lây lan', 'trường học'],
        'read_time': 5,
        'is_featured': False,
    },
    {
        'id': 8,
        'title': 'Vaccine cho trẻ em tuổi đến trường: Lịch tiêm chủng mới nhất 2026',
        'summary': 'Tiêm chủng là biện pháp phòng bệnh hiệu quả nhất cho trẻ em. Cập nhật lịch tiêm chủng mới nhất dành cho trẻ từ 6-18 tuổi theo khuyến cáo của Bộ Y tế.',
        'content': 'Các vaccine quan trọng cho học sinh: Vaccine viêm não Nhật Bản (JE) - tiêm 2 mũi cách nhau 1 năm, bắt đầu từ 12 tháng tuổi. Vaccine HPV phòng ung thư cổ tử cung - khuyến cáo tiêm cho nữ từ 9-14 tuổi (2 mũi) hoặc từ 15 tuổi trở lên (3 mũi). Vaccine cúm hàng năm - tiêm đầu mùa dịch (tháng 9-10). Vaccine COVID-19 theo hướng dẫn mới nhất của Bộ Y tế. Kiểm tra và cập nhật sổ tiêm chủng định kỳ 6 tháng/lần.',
        'source_name': 'Bộ Y tế VN',
        'source_url': 'moh.gov.vn/tin-tuc/-/vaccine-tre-em-tuoi-den-truong-2026',
        'image_url': 'https://images.unsplash.com/photo-1584308666744-24d5c04f6a2f?w=600',
        'published_date': '2026-03-29',
        'category': 'Tiêm chủng',
        'tags': ['vaccine', 'tiêm chủng', 'trẻ em', 'phòng bệnh'],
        'read_time': 6,
        'is_featured': False,
    },
    {
        'id': 9,
        'title': 'Cận thị (Myopia) ở học sinh: Nguyên nhân, dấu hiệu và phòng ngừa',
        'summary': 'Tỷ lệ cận thị ở học sinh Việt Nam tăng nhanh, đặc biệt sau đại dịch COVID-19. Chuyên gia nhãn khoa chia sẻ cách phòng ngừa và phát hiện sớm.',
        'content': 'Nguyên nhân chính gây cận thị ở học sinh: Nhìn gần quá nhiều (đọc sách, dùng điện thoại, máy tính liên tục). Thiếu ánh sáng tự nhiên khi học tập. Di truyền từ bố mẹ cận thị. Ít hoạt động ngoài trời. Dấu hiệu cận thị: Hay chớm mắt, ngồi gần tivi, nhìn xa không rõ bảng, đau đầu sau giờ học. Phòng ngừa: Quy tắc 20-20-20 (cứ 20 phút nhìn gần thì nhìn xa 20 feet trong 20 giây). Đảm bảo đủ ánh sáng khi học. Học ngoài trời 2 tiếng/ngày. Khám mắt định kỳ 6 tháng/lần.',
        'source_name': 'BV Mắt TW',
        'source_url': 'moh.gov.vn/tin-tuc/-/can-thi-hoc-sinh-nguyen-nhan-phong-ngua',
        'image_url': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600',
        'published_date': '2026-03-28',
        'category': 'Sức khỏe mắt',
        'tags': ['cận thị', 'mắt', 'học sinh', 'phòng ngừa'],
        'read_time': 5,
        'is_featured': False,
    },
    {
        'id': 10,
        'title': 'Xây dựng thói quen ăn uống lành mạnh cho học sinh từ nhỏ',
        'summary': 'Thói quen ăn uống hình thành từ nhỏ sẽ theo trẻ suốt đời. Chuyên gia dinh dưỡng gợi ý thực đơn cân bằng và cách xây dựng thói quen ăn uống lành mạnh cho trẻ.',
        'content': 'Nguyên tắc dinh dưỡng cân bằng: Đảm bảo 4 nhóm chất: bột đường (cơm, bánh mì, khoai), đạm (thịt, cá, trứng, đậu), béo (dầu ăn, bơ, các loại hạt), vitamin và khoáng chất (rau xanh, trái cây). Ăn sáng đầy đủ mỗi ngày - bữa sáng chiếm 25% năng lượng cả ngày. Hạn chế thức ăn nhanh, nước ngọt có ga, đồ chiên rán. Uống đủ 1.5-2 lít nước/ngày. Ăn uống cùng gia đình tạo thói quen tích cực. Không ăn trước giờ ngủ 2 tiếng.',
        'source_name': 'Viện Dinh dưỡng VN',
        'source_url': 'moh.gov.vn/tin-tuc/-/xay-dung-thoi-quen-an-uong-lanh-manh-hoc-sinh',
        'image_url': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
        'published_date': '2026-03-27',
        'category': 'Dinh dưỡng học đường',
        'tags': ['dinh dưỡng', 'ăn uống', 'thói quen', 'học sinh'],
        'read_time': 5,
        'is_featured': False,
    },
]

def js_str(s):
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '')

lines = ['const SEED_ARTICLES = [']
for a in ARTICLES:
    tags_js = '[' + ', '.join("'" + t + "'" for t in a['tags']) + ']'
    feat = 'true' if a['is_featured'] else 'false'
    lines.append('  {')
    lines.append(f"    id: {a['id']},")
    lines.append(f"    title: '{js_str(a['title']}',")
    lines.append(f"    summary: '{js_str(a['summary']}',")
    lines.append(f"    content: '{js_str(a['content']}',")
    lines.append(f"    source_name: '{js_str(a['source_name']}',")
    lines.append(f"    source_url: 'https://{a['source_url']}',")
    lines.append(f"    image_url: '{a['image_url']}',")
    lines.append(f"    published_date: '{a['published_date']}',")
    lines.append(f"    category: '{js_str(a['category']}',")
    lines.append(f"    tags: {tags_js},")
    lines.append(f"    read_time: {a['read_time']},")
    lines.append(f"    is_featured: {feat},")
    lines.append('  },')
lines.append('];')

new_array = '\n'.join(lines)
new_content = content[:start] + new_array + '\n' + content[end:]

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('DONE - Vietnamese text updated')
