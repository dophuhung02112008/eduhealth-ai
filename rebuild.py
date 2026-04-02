import os

APP_PATH = r"e:\eduhealth-ai---trợ-lý-sức-khỏe-học-đường (1)\App.tsx"

with open(APP_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

before = ''.join(lines[:18])
after = ''.join(lines[313:])

HEALBOOK_DATA = r"""const HEALBOOK_DATA: HealbookTopic[] = [
  // ── MỤN & DA LIỄU ──
  {
    id: 'mun-1',
    category: 'MỤN & DA LIỄU',
    title: 'Mụn trứng cá (Acne Vulgaris)',
    shortDescription: 'Bệnh da phổ biến nhất ở tuổi dậy thì, do tuyến bã nhờn hoạt động quá mức, vi khuẩn C. acnes và tắc nghẽn lỗ chân lông. Gặp ở 80% học sinh THPT.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Acne_underarm.jpg', caption: 'Mụn trứng cá viêm ở vùng da thân mình - có nốt sần đỏ và mụn mủ.' }, { url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Acne_on_back.jpg', caption: 'Mụn trứng cá ở lưng - dạng nặng thường gặp ở nam sinh tuổi dậy thì.' }],
    commonSigns: ['Comedone (mụn đầu đen, đầu trắng) trên mặt, trán, ngực, lưng.', 'Papule (sẩn) và pustule (mụn mủ) đỏ sưng.', 'Nốt cứng (nodule) và u nang (cyst) ở thể nặng.', 'Da bóng, tiết nhiều dầu, lỗ chân lông to.'],
    schoolContext: 'Stress học tập, thức khuya, ăn nhiều đồ chiên rán, đồ ngọt làm tăng tiết bã nhờn. Dùng chung khăn mặt, gối ôm nhau có thể lây vi khuẩn C. acnes.',
    dangerSigns: ['Mụn viêm lan rộng, có nhiều u nang dưới da.', 'Sẹo lồi, sẹo lõm sau mụn.', 'Mụn mọc quanh mũi, rãnh mũi má (có thể viêm não).', 'Trẻ tự ti nặng, bỏ ăn, cô lập với bạn bè.'],
    safeActions: ['Rửa mặt 2 lần/ngày bằng sữa rửa mặt dịu nhẹ (không xà phòng kiềm).', 'KHÔNG nặn mụn tại nhà (nguy cơ nhiễm trùng, sẹo).', 'Thoa kem/sữa dưỡng ẩm không gây bít tắc (oil-free).', 'Đi khám da liễu nếu mụn viêm nặng hoặc để lại sẹo.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }, { title: 'Hướng dẫn AAD', url: 'https://aad.org' }],
    samplePrompt: 'Trẻ 14 tuổi có nhiều mụn đầu đen ở trán, mụn mủ ở má, da bóng dầu, đỏ khi đến kỳ thi.'
  },
  {
    id: 'mun-2',
    category: 'MỤN & DA LIỄU',
    title: 'Viêm da dị ứng tiếp xúc (Contact Dermatitis)',
    shortDescription: 'Phản ứng viêm da do tiếp xúc trực tiếp với chất gây dị ứng hoặc kích ứng. Phổ biến khi giao mùa, tiếp xúc hóa chất trong phòng thí nghiệm, hoặc dị ứng kim loại (nikel trong đồng hồ, khuyên tai).',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Allergic_contact_dermatitis_on_neck.jpg', caption: 'Viêm da dị ứng dạng ban đỏ, phồng rộp trên cổ do tiếp xúc với hóa chất.' }],
    commonSigns: ['Da đỏ, sưng, ngứa dữ dội tại vùng tiếp xúc.', 'Phồng rộp (vesicle), nổi mụn nước nhỏ.', 'Da khô, bong tróc, có thể chảy dịch.', 'Giới hạn rõ vùng tổn thương theo hình dạng chất tiếp xúc.'],
    schoolContext: 'Tiếp xúc hóa chất trong phòng thí nghiệm, nhựa cây (cây cảnh trong sân trường), keo xịt tóc, dung dịch tẩy rửa. Giao mùa lạnh-ẩm làm da khô, dễ kích ứng hơn.',
    dangerSigns: ['Phồng rộp lan rộng, da tấy nề, chảy dịch nhiều.', 'Nhiễm trùng da thứ phát (mủ, sốt).', 'Khó thở, phù mặt, họng (phản vệ – cần cấp cứu ngay).', 'Tổn thương quanh mắt, miệng, bộ phận sinh dục.'],
    safeActions: ['Ngừng tiếp xúc với chất gây dị ứng ngay.', 'Rửa vùng da bằng nước sạch 15-20 phút.', 'Chườm lạnh giảm ngứa, sưng.', 'Thoa kem hydrocortisone 1% (tối đa 7 ngày) hoặc đi khám.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Sau giờ thí nghiệm hóa, học sinh xuất hiện da đỏ ngứa dữ dội ở hai tay, có nổi mụn nước.'
  },
  {
    id: 'mun-3',
    category: 'MỤN & DA LIỄU',
    title: 'Nấm da (Tinea / Dermatophytosis)',
    shortDescription: 'Nhiễm nấm bề mặt da, tóc, móng do các loài Dermatophytes. Có thể xuất hiện ở thân, bẹn, da đầu, chân (bàn chân vận động viên). Lây qua tiếp xúc trực tiếp hoặc qua vật dụng chung.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tinea_corporis_on_infant.jpg', caption: 'Nấm thân: tổn thương hình tròn với rìa đỏ cao, giữa lành da bình thường - dạng đồng tâm đặc trưng.' }, { url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tinea_capitis.jpg', caption: 'Nấm da đầu: tổn thương tròn, vảy trắng, rụng tóc từng mảng đặc trưng.' }],
    commonSigns: ['Tổn thương hình tròn, vòng tròn đồng tâm (rìa đỏ cao, giữa lành).', 'Vảy trắng, bong tróc ở rìa tổn thương.', 'Ngứa dữ dội, có thể rụng tóc từng mảng (nấm da đầu).', 'Móng dày, đổi màu vàng, giòn, dễ gãy (nấm móng).'],
    schoolContext: 'Lây qua dùng chung khăn tắm, ga giường, đồ thể thao trong phòng tập gym của trường, lớp bơi. Trẻ bán trú dùng chung gối, mũ, lược có nguy cơ cao.',
    dangerSigns: ['Tổn thương lan rộng khắp cơ thể.', 'Nấm móng lan rộng, móng biến dạng nặng.', 'Có mủ, sưng đỏ quanh tổn thương (nhiễm trùng thứ phát).', 'Trẻ sốt kèm theo.'],
    safeActions: ['Giữ da khô ráo, sạch sẽ, mặc quần áo thoáng.', 'Không dùng chung khăn, mũ, lược, đồ thể thao.', 'Thoa kem chống nấm (clotrimazole 1%) 2 lần/ngày trong 2-4 tuần.', 'Đi khám da liễu để được kê thuốc uống nếu nặng.'],
    references: [{ title: 'CDC Tinea', url: 'https://cdc.gov/fungal/diseases/ringworm.html' }],
    samplePrompt: 'Trẻ có vết tròn trên da đầu, vảy trắng bám chân tóc, rụng tóc từng mảng nhỏ.'
  },
  {
    id: 'mun-4',
    category: 'MỤN & DA LIỄU',
    title: 'Ghẻ (Scabies)',
    shortDescription: 'Bệnh do ký sinh trùng Sarcoptes scabiei (con ghẻ) đào hang dưới da, gây ngứa dữ dội về đêm. Lây qua tiếp xúc da-da kéo dài hoặc qua vật dụng chung (khăn, ga giường).',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Scabies_on_hand.jpg', caption: 'Ghẻ: các đường hang màu xám nhạt đào dưới da, thường ở kẽ ngón tay, cổ tay.' }, { url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Scabies-feet.jpg', caption: 'Tổn thương ghẻ ở bàn chân trẻ em - đặc biệt ở kẽ ngón chân và lòng bàn chân.' }],
    commonSigns: ['Ngứa dữ dội, đặc biệt vào ban đêm.', 'Đường hang xám nhạt dưới da (đặc trưng nhất), thường ở kẽ ngón, cổ tay, nách, thắt lưng.', 'Nốt đỏ nhỏ rải rác, có thể có mụn nước.', 'Da bào mòn, trầy do gãi, có thể nhiễm trùng.'],
    schoolContext: 'Lây qua tiếp xúc da-da kéo dài (khó xảy ra trong lớp học thông thường nhưng phổ biến trong ký túc xá, nhà trẻ, hoặc gia đình). Dùng chung khăn, ga giường cũng là con đường lây.',
    dangerSigns: ['Ngứa không ngủ được, ảnh hưởng học tập nghiêm trọng.', 'Tổn thương lan rộng toàn thân, có mủ (nhiễm trùng).', 'Da trầy sâu, chảy máu, hình thành vảy dày.', 'Trẻ sốt, hạch sưng.'],
    safeActions: ['Cách ly trẻ bệnh, không dùng chung khăn ga giường.', 'Giặt khăn, ga giường, quần áo bằng nước sôi.', 'Bôi thuốc diệt ghẻ (permethrin 5%) theo hướng dẫn bác sĩ.', 'Tất cả người trong gia đình cùng điều trị.'],
    references: [{ title: 'CDC Scabies', url: 'https://cdc.gov/parasites/scabies' }],
    samplePrompt: 'Trẻ ngứa dữ dội về đêm, có đường hang nhỏ màu xám ở kẽ ngón tay, cổ tay.'
  },
  {
    id: 'mun-5',
    category: 'MỤN & DA LIỄU',
    title: 'Viêm nang lông (Folliculitis)',
    shortDescription: 'Viêm nhiễm ở lỗ chân lông do vi khuẩn (thường là tụ cầu), nấm hoặc viêm do cọ xát. Gặp nhiều ở vùng da có nhiều mồ hôi, ma sát (cổ, vai, lưng, đùi).',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Folliculitis.jpg', caption: 'Viêm nang lông: các nốt đỏ có mụn mủ ở trung tâm, xung quanh lỗ chân lông.' }],
    commonSigns: ['Nốt đỏ nhỏ hoặc mụn mủ quanh lỗ chân lông.', 'Ngứa, rát, đau nhẹ tại vùng tổn thương.', 'Thường xuất hiện ở cổ, vai, lưng, đùi, mặt.', 'Có thể hình thành nhọt (có mủ lớn, đau).'],
    schoolContext: 'Thể thao, đổ mồ hôi nhiều, mặc đồng phục bó sát, tập gym chung. Lông mọc ở vùng ma sát (lưng ghế) hoặc sau khi cạo râu/lông ở học sinh lớp lớn.',
    dangerSigns: ['Nhọt to, sưng nóng đỏ, đau dữ dội.', 'Viêm lan rộng, có nhiều nhọt liên tiếp (viêm nang lông deep).', 'Sốt, hạch sưng đau gần vùng tổn thương.', 'Để lại thâm, sẹo sau lành.'],
    safeActions: ['Giữ da sạch, khô, rửa bằng sữa rửa mặt kháng khuẩn.', 'Mặc quần áo rộng rãi, thoáng mát, thấm mồ hôi.', 'KHÔNG cạo, wax hoặc nhổ lông ở vùng đang viêm.', 'Đi khám nếu có nhọt, sốt, hoặc không cải thiện sau 1 tuần.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh sau giờ chạy thể dục, xuất hiện nhiều nốt đỏ có mụn mủ nhỏ ở cổ và vai.'
  },
  {
    id: 'mun-6',
    category: 'MỤN & DA LIỄU',
    title: 'Chốc lở (Impetigo)',
    shortDescription: 'Nhiễm trùng da do vi khuẩn (tụ cầu Staphylococcus aureus và/hoặc liên cầu Streptococcus pyogenes). Phổ biến nhất ở trẻ 2-6 tuổi, đặc trưng bởi vết loét và vảy vàng như mật ong.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Impetigo_crouteux_jambes.jpg', caption: 'Chốc lở: vết loét nông đóng vảy vàng đặc trưng như mật ong ở cẳng chân trẻ em.' }],
    commonSigns: ['Mụn nước nhỏ hoặc trợt da, nhanh vỡ để lại vảy vàng mật ong.', 'Vùng da xung quanh đỏ, sưng nhẹ.', 'Thường quanh mũi, miệng, tay, chân (vùng hở).', 'Ngứa nhẹ, có thể đau rát.'],
    schoolContext: 'Lây qua tiếp xúc trực tiếp, dùng chung khăn, gối ngủ bán trú, đồ chơi, bàn ghế. Thời tiết nóng ẩm giao mùa là điều kiện thuận lợi. Trẻ gãi rồi chạm sang vùng khác gây lan.',
    dangerSigns: ['Vết loét lan rộng nhanh dù đã vệ sinh.', 'Sốt cao, mệt mỏi, bỏ ăn.', 'Da sưng nóng đỏ rực, rất đau (viêm mô tế bào).', 'Hạch sưng đau ở cổ, nách.'],
    safeActions: ['Rửa vết loét 2 lần/ngày bằng nước muối sinh lý hoặc xà phòng trung tính.', 'Dùng khăn giấy dùng một lần để thấm dịch.', 'Cắt ngắn móng tay trẻ để tránh gãi làm lan.', 'Nghỉ học đến khi vết loét khô hẳn hoặc đã dùng kháng sinh 24h.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Quan sát thấy vùng quanh miệng trẻ có các vết trợt đỏ đóng vảy vàng như mật ong.'
  },
  {
    id: 'mun-7',
    category: 'MỤN & DA LIỄU',
    title: 'Zona thần kinh (Shingles - Herpes Zoster)',
    shortDescription: 'Bệnh do virus Varicella-Zoster (cùng virus gây thủy đậu) tái hoạt động trong dây thần kinh cảm giác. Gặp ở người đã từng bị thủy đậu. Triệu chứng đặc trưng: đau rát một bên theo dải thần kinh, sau đó phát ban mụn nước.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Zoster_neuroder18.jpg', caption: 'Zona: mụn nước tập trung theo dải thần kinh liên sườn, thường một bên thân mình.' }],
    commonSigns: ['Đau rát, bỏng, ngứa một bên ngực/lưng/mặt theo dải thần kinh (1-3 ngày trước phát ban).', 'Phát ban đỏ sau đó hình thành mụn nước nhỏ tập trung theo dải.', 'Mụn nước vỡ, đóng vảy trong 7-10 ngày.', 'Có thể sốt nhẹ, mệt mỏi trước khi phát ban.'],
    schoolContext: 'Học sinh chưa tiêm vaccine thủy đậu có nguy cơ lây virus Varicella. Sau khi khỏi thủy đậu, virus ẩn trong hạch thần kinh và có thể tái hoạt thành zona nhiều năm sau.',
    dangerSigns: ['Zona ở mặt gần mắt (nguy cơ viêm giác mạc, mù lòa).', 'Zona lan rộng toàn thân (zona disseminate – dấu hiệu suy giảm miễn dịch).', 'Đau dữ dội không cải thiện sau vài tuần (đau thần kinh sau zona).', 'Trẻ suy giảm miễn dịch, sốt cao kèm zona.'],
    safeActions: ['Đi khám ngay để được kê thuốc kháng virus (acyclovir).', 'Giữ vùng tổn thương sạch, khô, không che kín.', 'Mặc đồng phục rộng, không cọ xát vùng tổn thương.', 'Tránh tiếp xúc với trẻ chưa tiêm thủy đậu khi có mụn nước.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 9 đau rát một bên ngực, sau đó xuất hiện mụn nước tập trung theo dải ngang.'
  },
  {
    id: 'mun-8',
    category: 'MỤN & DA LIỄU',
    title: 'Mày đay (Urticaria)',
    shortDescription: 'Phản ứng dị ứng hệ thống biểu hiện bằng những mảng sẩn phù màu đỏ hoặc hồng, ngứa dữ dội, có thể kèm phù mạch (sưng môi, mí mắt, tay chân). Nguyên nhân đa dạng: thực phẩm, thuốc, côn trùng đốt, stress.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Urticaria_01.jpg', caption: 'Mày đay cấp: các sẩn phù màu đỏ hồng, nổi gồ trên mặt da, ngứa dữ dội, thay đổi hình dạng liên tục.' }],
    commonSigns: ['Sẩn phù (wheal): mảng đỏ/hồng nổi gồ, ranh giới rõ, ngứa dữ dội.', 'Mỗi sẩn xuất hiện và biến mất trong <24h, để lại da bình thường.', 'Phù mạch: sưng môi, mí mắt, lưỡi, tay chân (nguy hiểm hơn).', 'Có thể kèm khó thở, tức ngực, chóng mặt (phản vệ).'],
    schoolContext: 'Stress thi cử kích hoạt giải phóng histamine; thực phẩm trong căng tin trường (hải sản, đậu phộng); côn trùng trong sân trường; phấn hoa cây cảnh. Dị ứng thuốc (kháng sinh, giảm đau) có thể xảy ra ngay tại trường.',
    dangerSigns: ['Khó thở, thở ồn, tức ngực (phản vệ – GỌI CẤP CỨU NGAY).', 'Phù mạch lan nhanh, đặc biệt ở mặt, cổ, họng.', 'Chóng mặt, mất ý thức, tim đập nhanh.', 'Mày đay kéo dài >6 tuần (mạn tính) hoặc tái phát liên tục.'],
    safeActions: ['Loại bỏ tác nhân gây dị ứng ngay nếu xác định được.', 'Uống thuốc kháng histamine (cetirizine, loratadine) theo hướng dẫn.', 'Chườm mát giảm ngứa, không gãi.', 'Đi cấp cứu ngay nếu có dấu hiệu phản vệ.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Sau bữa trưa ở căng tin, học sinh xuất hiện nhiều mảng đỏ ngứa trên tay, có thể sưng môi.'
  },
  {
    id: 'mun-9',
    category: 'MỤN & DA LIỄU',
    title: 'Viêm da cơ địa (Eczema / Atopic Dermatitis)',
    shortDescription: 'Bệnh viêm da mạn tính do cơ địa dị ứng, thường xuất hiện từ nhỏ, diễn tiến từng đợt với triệu chứng đỏ, ngứa, khô da điển hình. Yếu tố di truyền mạnh, bùng phát bởi stress, thời tiết, thực phẩm.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Atopic_dermatitis.jpg', caption: 'Eczema ở trẻ: da đỏ, khô, bong tróc ở vùng khuỷu tay, đặc trưng của viêm da cơ địa.' }, { url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Atopic_dermatitis_child.jpg', caption: 'Viêm da cơ địa ở trẻ nhũ nhi: tổn thương ở má, trán với da đỏ ửng, khô, có vảy.' }],
    commonSigns: ['Da khô, đỏ, ngứa dữ dội, đặc biệt về đêm và giao mùa.', 'Vị trí đặc trưng: khuỷu tay, đầu gối (trẻ lớn); má, trán (trẻ nhũ nhi).', 'Da dày, lichen hóa (da vằn vằn) do gãi mạn.', 'Tiền sử gia đình có hen, viêm mũi dị ứng, dị ứng thực phẩm.'],
    schoolContext: 'Stress thi cử, thời tiết lạnh-khô, tiếp xúc hóa chất trong phòng thí nghiệm, phấn hoa cây cảnh trường học đều có thể làm bùng phát. Gãi trong lớp gây mất tập trung, ảnh hưởng học tập.',
    dangerSigns: ['Tổn thương lan rộng toàn thân, da đỏ rực, ngứa không ngủ được.', 'Nhiễm trùng da thứ phát (mủ, vảy vàng, sốt).', 'Da bào mòn, chảy máu, có thể nhiễm Herpes simplex (eczema herpeticum – NGUY HIỂM).', 'Ảnh hưởng nặng tâm lý: tự ti, cô lập, trầm cảm.'],
    safeActions: ['Dưỡng ẩm da ngay sau khi tắm (cream/ointment, không lotion).', 'Mặc đồ cotton rộng rãi, trán len, nylon tiếp xúc da.', 'Cắt móng ngắn, đeo găng tay cotton ban đêm nếu gãi khi ngủ.', 'Đi khám da liễu để được kê kem steroid, thuốc ức chế miễn dịch.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Trẻ 10 tuổi da khô, đỏ, ngứa nhiều ở khuỷu tay và đầu gối, đặc biệt tệ về đêm, hay tái phát giao mùa.'
  },
  {
    id: 'mun-10',
    category: 'MỤN & DA LIỄU',
    title: 'Mụn cóc (Warts - Verruca Vulgaris)',
    shortDescription: 'Bướu da lành tính do virus HPV (Human Papillomavirus) gây ra. Xâm nhập qua các vết xước nhỏ trên da. Phổ biến ở học sinh, đặc biệt ở tay, ngón tay, lòng bàn chân. Có thể tự khỏi sau vài tháng đến vài năm.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Common_warts.jpg', caption: 'Mụn cóc thông thường ở ngón tay: bề mặt thô, sần, có các điểm đen nhỏ (mao mạch bị tắc).' }, { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Plantar_wart.jpg', caption: 'Mụn cóc lòng bàn chân: bề mặt phẳng do bị đè nén, đau khi đi lại.' }],
    commonSigns: ['Bướu sần cứng, bề mặt thô, thường màu da hoặc hơi nâu.', 'Có các điểm đen nhỏ trên bề mặt (mao mạch bị tắc – dấu hiệu phân biệt với chai).', 'Thường ở ngón tay, mu bàn tay, lòng bàn chân.', 'Mụn cóc phẳng (flat warts) cũng phổ biến ở tuổi học đường.'],
    schoolContext: 'HPV lây qua tiếp xúc trực tiếp với tổn thương hoặc qua bề mặt nhiễm virus (bể bơi, phòng thay đồ). Học sinh thể thao (bóng rổ, cầu lông) dễ bị lây qua vết trầy trên tay.',
    dangerSigns: ['Mụn cóc sưng, đau, có mủ (nhiễm trùng thứ phát).', 'Lan rộng nhiều vị trí, đặc biệt quanh móng (khó điều trị).', 'Mụn cóc ở mặt, bộ phận sinh dục cần được khám chuyên khoa.', 'Tự ý cắt, đốt không đúng cách gây lan rộng.'],
    safeActions: ['Không tự ý cắt, bôi acid, hoặc đốt mụn cóc tại nhà.', 'Giữ da khô, rửa tay thường xuyên.', 'Không dùng chung khăn, vật dụng cá nhân tiếp xúc vùng có mụn cóc.', 'Đi khám da liễu: điều trị bằng nitơ lỏng (cryotherapy), acid salicylic, hoặc laser.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 6 có bướu nhỏ cứng, sần ở ngón tay, bề mặt thô, có điểm đen nhỏ.'
  },
  // ── BỆNH LÂY NHIỄM ──
  {
    id: 'tcm-1',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Tay-Chân-Miệng (HFMD)',
    shortDescription: 'Bệnh truyền nhiễm cấp tính do virus Enterovirus (Coxsackie A16, EV71). Lây qua đường tiêu hóa và tiếp xúc. Nguy cơ biến chứng thần kinh, tim mạch.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Hand_foot_and_mouth_disease_on_child_feet.jpg', caption: 'Các nốt phỏng nước đặc trưng của bệnh Tay-Chân-Miệng ở lòng bàn chân trẻ em.' }],
    commonSigns: ['Sốt nhẹ, mệt mỏi, đau họng 1-2 ngày đầu.', 'Loét miệng: nốt đỏ ở lợi, lưỡi, gây đau khi ăn.', 'Phỏng nước ở lòng bàn tay, bàn chân, mông, gối.', 'Trẻ quấy khóc, bỏ ăn do đau miệng.'],
    schoolContext: 'Virus tồn tại lâu trên bề mặt (bàn ghế, đồ chơi, tay nắm cửa). Lây qua ăn uống chung, tiếp xúc dịch tiết của trẻ bệnh.',
    dangerSigns: ['Sốt cao >39°C không hạ dù thuốc.', 'Giật mình, run tay chân, quấy khóc vô cớ khi ngủ.', 'Đi đứng loạng choạng, nôn ói, khó thở.', 'Da nổi vân tím, vã mồ hôi lạnh.'],
    safeActions: ['Cách ly trẻ tại nhà ngay khi nghi ngờ.', 'Ăn đồ lỏng, mềm, nguội (cháo, súp).', 'Vệ sinh tay thường xuyên cho trẻ và người chăm.', 'Khử khuẩn đồ dùng bằng Cloramin B.'],
    references: [{ title: 'CDC Việt Nam', url: 'https://vncdc.gov.vn' }],
    samplePrompt: 'Trẻ sốt nhẹ, đau miệng bỏ ăn, có nốt đỏ ở lòng bàn tay.'
  },
  {
    id: 'tcm-2',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Thủy đậu (Chickenpox)',
    shortDescription: 'Bệnh do virus Varicella-Zoster, lây qua đường hô hấp và tiếp xúc. Biểu hiện mụn nước trên nền da đỏ, ngứa, sốt nhẹ. Có thể gây biến chứng viêm da nhiễm trùng, viêm phổi.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Chickenpox_blister-%28closeup%29.jpg', caption: 'Mụn nước chứa dịch trong đặc trưng của bệnh thủy đậu trên nền da đỏ.' }],
    commonSigns: ['Sốt nhẹ, mệt mỏi, đau đầu.', 'Phát ban đỏ rải rác, sau đó hình thành mụn nước trong.', 'Mụn nước xuất hiện ở mặt, da đầu, thân mình, tay chân.', 'Mụn nước khô thành vảy trong 5-7 ngày.'],
    schoolContext: 'Lây rất nhanh trong trường học qua giọt bắn và tiếp xúc với dịch mụn nước. Trẻ bệnh cần nghỉ học ít nhất 7 ngày sau khi phát ban.',
    dangerSigns: ['Sốt cao liên tục không hạ.', 'Mụn nước có mủ, sưng đỏ lan rộng (nhiễm trùng da).', 'Trẻ khó thở, ho nhiều (có thể viêm phổi).', 'Đau đầu dữ dội, cứng cổ, lú lẫn.'],
    safeActions: ['Cách ly trẻ tại nhà, nghỉ học 7-10 ngày.', 'Cắt ngắn móng tay, mặc quần áo mềm để tránh gãi.', 'Tắm rửa nhẹ nhàng bằng nước ấm, không làm vỡ mụn.', 'Dùng thuốc chống ngứa theo chỉ định bác sĩ.'],
    references: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }],
    samplePrompt: 'Trẻ sốt nhẹ, có nhiều mụn nước trong ở mặt và thân.'
  },
  {
    id: 'tcm-3',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Cúm (Influenza)',
    shortDescription: 'Bệnh hô hấp cấp do virus Influenza (A, B, C). Lây qua đường hô hấp, bùng phát theo mùa (mùa lạnh, giao mùa). Triệu chứng nặng hơn cảm thường, có thể gây biến chứng viêm phổi.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/H1N1_Influenza_Virus_Particles_%288411599236%29.jpg/250px-H1N1_Influenza_Virus_Particles_%288411599236%29.jpg', caption: 'Virus Influenza H1N1 qua kính hiển vi điện tử - có các gai protein bề mặt.' }],
    commonSigns: ['Sốt cao đột ngột 39-40°C, run rẩy, ớn lạnh.', 'Đau đầu dữ dội, đau cơ toàn thân.', 'Ho dữ dội, đau ngực khi ho.', 'Mệt mỏi nặng, nằm liệt giường 3-5 ngày.'],
    schoolContext: 'Lây rất nhanh qua giọt bắn khi ho, hắt hơi, nói chuyện. Học sinh có thể lây cho nhau trong lớp học thông thoáng kém. Vaccine cúm hàng năm giúp giảm nguy cơ 40-60%.',
    dangerSigns: ['Khó thở, thở nhanh, thở gấp.', 'Sốt không hạ hoặc sốt lại sau 3-4 ngày.', 'Đau ngực dữ dội, ho ra máu.', 'Lú lẫn, không tỉnh táo, co giật.'],
    safeActions: ['Cách ly trẻ tại nhà khi có triệu chứng.', 'Hạ sốt bằng paracetamol, uống nhiều nước.', 'Nghỉ ngơi đầy đủ, ăn thức ăn dễ tiêu.', 'Đeo khẩu trang khi chăm sóc trẻ.'],
    references: [{ title: 'WHO Influenza', url: 'https://who.int/influenza' }],
    samplePrompt: 'Trẻ sốt cao đột ngột, đau đầu dữ dội, ho, đau cơ, mệt liệt giường.'
  },
  {
    id: 'tcm-4',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Đau mắt đỏ (Viêm kết mạc - Conjunctivitis)',
    shortDescription: 'Viêm lớp màng bao phủ lòng trắng mắt và mặt trong mi mắt. Do virus (Adenovirus) hoặc vi khuẩn. Rất dễ lây lan trong trường học qua tiếp xúc.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Conjunctivitis_5174.jpg', caption: 'Lòng trắng mắt đỏ rực do viêm kết mạc - các mạch máu giãn nở rõ rệt.' }],
    commonSigns: ['Lòng trắng mắt đỏ rực, đỏ tươi hoặc hồng.', 'Cảm giác cộm, rát như có cát trong mắt.', 'Ghèn (dử) mắt nhiều, trắng trong hoặc vàng xanh.', 'Chảy nước mắt, sưng mí mắt, nhạy cảm ánh sáng.'],
    schoolContext: 'Lây qua dùng chung khăn mặt, gối, kính, hoặc chạm tay vào dịch tiết mắt rồi đưa lên mắt. Một ca trong lớp có thể lây cho nhiều bạn trong vài ngày.',
    dangerSigns: ['Đau nhức mắt dữ dội, đau sâu vào hốc mắt.', 'Nhìn mờ, suy giảm thị lực đột ngột.', 'Mắt rất sợ ánh sáng, không thể mở mắt.', 'Chảy mủ đặc hoặc có máu từ kết mạc.'],
    safeActions: ['Nhỏ nước muối sinh lý (NaCl 0.9%) thường xuyên.', 'Rửa tay xà phòng ngay sau khi chạm vào mắt.', 'Không dùng chung khăn, gối, thuốc nhỏ mắt.', 'Đeo kính mát giảm kích ứng, hạn chế trẻ dụi mắt.'],
    references: [{ title: 'BV Mắt TW', url: 'https://vnio.vn' }],
    samplePrompt: 'Mắt bị đỏ rực, chảy nước mắt, có nhiều ghèn vàng dính mi.'
  },
  // ── SỨC KHỎE TÂM LÝ ──
  {
    id: 'tl-1',
    category: 'SỨC KHỎE TÂM LÝ',
    title: 'Stress học tập & Rối loạn giấc ngủ',
    shortDescription: 'Tình trạng căng thẳng tâm lý do áp lực học tập (thi cử, bài tập nhiều), dẫn đến mất ngủ, lo âu, đau đầu, thay đổi cảm xúc. Rất phổ biến ở học sinh THCS và THPT, đặc biệt giai đoạn thi học kỳ.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Stress.jpg', caption: 'Biểu hiện stress: căng thẳng, mệt mỏi, khó tập trung do áp lực học tập.' }],
    commonSigns: ['Mất ngủ hoặc ngủ không sâu giấc, thức dậy mệt.', 'Đau đầu, đau bụng không rõ nguyên nhân thực thể.', 'Lo âu, bồn chồn, khó tập trung trong học tập.', 'Thay đổi cảm xúc: dễ khóc, cáu gắt, cô lập.'],
    schoolContext: 'Áp lực thi cử, điểm số, kỳ vọng từ gia đình, bài tập về nhà quá nhiều. Học sinh lớp cuối (lớp 9, lớp 12) đặc biệt dễ bị stress nặng. Giao mùa thi (cuối học kỳ) là thời điểm cao điểm.',
    dangerSigns: ['Không ngủ được nhiều ngày liên tiếp.', 'Có ý nghĩ tự làm đau bản thân hoặc muốn chấm dứt cuộc sống.', 'Hoảng sợ tột độ, cơn hoảng panic.', 'Bỏ ăn, bỏ học, cô lập hoàn toàn.'],
    safeActions: ['Tạo không gian để trẻ chia sẻ, lắng nghe KHÔNG phán xét.', 'Sắp xếp thời gian biểu học tập và nghỉ ngơi hợp lý.', 'Khuyến khích vận động nhẹ: đi bộ, yoga, thể thao.', 'Đưa trẻ gặp chuyên gia tâm lý học đường nếu kéo dài trên 2 tuần.'],
    references: [{ title: 'BV Tâm thần TW', url: 'https://benhvienphantin.vn' }],
    samplePrompt: 'Học sinh lớp 11 gần thi học kỳ: mất ngủ, đau đầu, bỏ ăn, không muốn đi học.'
  },
  {
    id: 'tl-2',
    category: 'SỨC KHỎE TÂM LÝ',
    title: 'Thay đổi nội tiết tuổi dậy thì',
    shortDescription: 'Giai đoạn chuyển tiếp sinh lý từ trẻ em sang người lớn, đánh dấu bởi sự thay đổi hormone nội tiết mạnh mẽ. Ở nữ bắt đầu 8-13 tuổi, ở nam 9-14 tuổi. Gây ra nhiều thay đổi về thể chất và tâm lý.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Teenager-isolated-on-white.jpg/440px-Teenager-isolated-on-white.jpg', caption: 'Thanh thiếu niên tuổi dậy thì - giai đoạn thay đổi mạnh mẽ về thể chất và tâm lý.' }],
    commonSigns: ['Phát triển chiều cao nhanh, thay đổi hình dạng cơ thể.', 'Nổi mụn trứng cá (do tăng hormone androgen).', 'Thay đổi cảm xúc thất thường, dễ kích động.', 'Bắt đầu có kinh nguyệt (nữ), tăng ham muốn tình dục (nam/nữ).'],
    schoolContext: 'Học sinh cảm thấy tự ti về ngoại hình thay đổi, so sánh với bạn bè. Áp lực từ mạng xã hội (Instagram, TikTok) làm trầm trọng thêm lo âu ngoại hình. Cần giáo dục sức khỏe sinh sản phù hợp lứa tuổi.',
    dangerSigns: ['Rối loạn ăn uống: nhịn ăn, ăn quá nhiều để kiểm soát cân nặng.', 'Tự ti quá mức dẫn đến trầm cảm, cô lập.', 'Hành vi tự hại: cắt tay, tổn thương bản thân.', 'Quan hệ tình dục sớm không an toàn.'],
    safeActions: ['Giáo dục kiến thức dậy thì phù hợp lứa tuổi cho cả phụ huynh và học sinh.', 'Khuyến khích cha mẹ trò chuyện cởi mở với con về thay đổi cơ thể.', 'Hướng dẫn vệ sinh cá nhân: rửa mặt, chăm sóc da, vệ sinh lúc kinh nguyệt.', 'Đưa trẻ đi khám nếu dậy thì quá sớm hoặc quá muộn.'],
    references: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }],
    samplePrompt: 'Học sinh nữ lớp 6 bắt đầu có kinh nguyệt, nổi nhiều mụn, tự ti về ngoại hình.'
  },
  // ── VỆ SINH ──
  {
    id: 'vs-1',
    category: 'VỆ SINH',
    title: 'Sốt tinh hồng nhiệt (Scarlet Fever)',
    shortDescription: 'Bệnh do vi khuẩn Streptococcus nhóm A, lây qua đường hô hấp. Biểu hiện sốt cao, phát ban đỏ như giấy nhám, lưỡi dâu tây. Có thể gây biến chứng thận, tim nếu không điều trị kịp thời.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Scharlach.JPG', caption: 'Lưỡi dâu tây đặc trưng của bệnh sốt tinh hồng nhiệt - lưỡi đỏ bóng với các hạt nổi rõ.' }],
    commonSigns: ['Sốt cao đột ngột, đau họng, amidan sưng đỏ có mủ.', 'Phát ban đỏ như giấy nhám trên toàn thân.', 'Lưỡi đỏ bóng, các hạt lưỡi nổi rõ (lưỡi dâu tây).', 'Da mặt đỏ nhưng vùng quanh miệng trắng (tam sắc).'],
    schoolContext: 'Lây qua giọt bắn đường hô hấp khi ho, hắt hơi, nói chuyện. Vi khuẩn Streptococcus tồn tại trong mũi họng trẻ bệnh từ vài ngày trước đến vài tuần sau khi khỏi.',
    dangerSigns: ['Sốt cao không hạ dù dùng thuốc.', 'Khó nuốt dữ dội, amidan sưng to, không ăn được.', 'Phát ban lan rộng, da bong tróc dữ dội.', 'Nước tiểu ít, nước tiểu đỏ hoặc có bọt (biến chứng thận).'],
    safeActions: ['Đưa trẻ khám để được kê kháng sinh (penicillin/amoxicillin).', 'Uống kháng sinh đủ liệu trình 10 ngày.', 'Nghỉ học ít nhất 24h sau khi hết sốt và đang dùng kháng sinh.', 'Hạ sốt, uống nhiều nước, ăn đồ mềm.'],
    references: [{ title: 'NHS Scarlet Fever', url: 'https://nhs.uk/conditions/scarlet-fever' }],
    samplePrompt: 'Trẻ sốt cao, đau họng, phát ban đỏ như giấy nhám toàn thân, lưỡi đỏ bóng.'
  },
  {
    id: 'vs-2',
    category: 'VỆ SINH',
    title: 'Nhiễm khuẩn da (Bacterial Skin Infection)',
    shortDescription: 'Nhiễm trùng da do vi khuẩn (thường là tụ cầu và liên cầu), biểu hiện từ viêm nang lông đơn giản đến viêm mô tế bào nặng. Phổ biến khi da bị tổn thương (gãi, trầy, vết cắn côn trùng) và vệ sinh kém.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Cellulitis_leg.jpg', caption: 'Viêm mô tế bào: da sưng đỏ nóng, lan rộng nhanh trên chân - cần điều trị kháng sinh.' }],
    commonSigns: ['Da đỏ, sưng, nóng, đau tại vùng tổn thương.', 'Có thể có mủ, vết trợt, vết loét.', 'Sốt, hạch sưng đau gần vùng nhiễm trùng.', 'Lan nhanh trong vài giờ nếu không điều trị.'],
    schoolContext: 'Trẻ bị trầy da khi chơi thể thao, ngã trong sân trường, hoặc bị côn trùng đốt rồi gãi nhiễm trùng. Điều kiện vệ sinh kém trong ký túc xá, nhà ở tập thể là yếu tố nguy cơ.',
    dangerSigns: ['Da đỏ sưng lan nhanh, kèm sốt cao.', 'Mủ tích tụ thành áp xe (nhọt), cần rạch mủ.', 'Nhiễm trùng lan vào máu (nhiễm trùng huyết) – DẤU HIỆU CẤP CỨU.', 'Hạch sưng to, đau nhức dữ dội.'],
    safeActions: ['Rửa sạch vùng da bị tổn thương bằng nước và xà phòng.', 'Thoa kem kháng sinh (mupirocin) nếu có nhẹ.', 'Giữ sạch và khô, không băng kín quá lâu.', 'Đi khám ngay nếu có sốt, lan rộng nhanh.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh bị trầy da khi chơi thể thao, vết trầy sưng đỏ, có mủ vàng, đau.'
  }
]; """

new_content = before + '\n' + HEALBOOK_DATA + '\n' + after

with open(APP_PATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done! Written', len(new_content), 'chars to App.tsx')
