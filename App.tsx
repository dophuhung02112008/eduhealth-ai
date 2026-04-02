
import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  HeartPulse, BookOpen, Camera, MapPin,
  AlertTriangle, CheckCircle, Info, Upload,
  Send, Loader2, ChevronRight, X, Search,
  ShoppingCart, Hospital, FileText,
  Stethoscope, MessageSquare, RefreshCcw,
  ExternalLink, ShieldCheck, School, ChevronLeft,
  Users, Activity, Zap, Eye, Pill, Map as MapIcon,
  PenTool, Download, Image as ImageIcon, Layers, Trash2, Circle,
  Flame, Bell, TrendingUp, Clock
} from 'lucide-react';
import { UrgencyLevel, HealthCase, HealbookTopic, UserRole, ChatMessage, WeeklyTrend } from './types';

// Declare Leaflet globally since it's loaded via script tag
declare var L: any;



const HEALBOOK_DATA: HealbookTopic[] = [
  // ══════════════════════════════════════════════════════
  // MỤN & DA LIỄU HỌC ĐƯỜNG
  // ══════════════════════════════════════════════════════
  {
    id: 'mun-1',
    category: 'MỤN & DA LIỄU',
    title: '1. Mụn đầu đen / Mụn đầu trắng',
    shortDescription: 'Acne vulgaris – lỗ chân lông bị kẹt dầu + tế bào chết, tạo thành chấm đen hoặc nốt trắng. Gặp ở ~80% học sinh THPT.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/0601_Acne_Vulgaris.jpg', caption: 'Mụn đầu đen (blackhead) và mụn đầu trắng (whitehead) – dạng nhẹ của acne vulgaris.' }],
    commonSigns: ['Chấm đen nhỏ ở mũi, cằm, trán.', 'Nốt trắng li ti hơi sần khi sờ.', 'Da đổ dầu nhiều cuối buổi học.', 'Bề mặt da không mịn, lỗ chân lông to.'],
    schoolContext: 'Đội mũ bảo hiểm/khẩu trang bí cả ngày, học thể dục xong không rửa mặt, hay chống tay lên má, tối về cạy mụn trước gương. Stress thi cử làm tăng tiết bã nhờn đột biến.',
    dangerSigns: ['Mụn ngày càng dày, lan xuống lưng/ngực.', 'Để lại nhiều thâm, sẹo lõm rõ.', 'Tự ti rõ rệt, bỏ giao tiếp, bỏ ăn.'],
    safeActions: ['NGỪNG: Không nặn, không cạy, không lột mụn liên tục. Dừng đổi skincare lung tung.', 'RỬA: Rửa mặt nhẹ nhàng tối đa 2 lần/ngày và sau khi đổ mồ hôi – dùng sữa rửa mặt dịu nhẹ (pH 5.5).', 'DỊU: Kem/sữa dưỡng ẩm không gây bít tắc (oil-free). Tránh scrub hoặc chà khăn mạnh.', 'KHÁM: Nếu mụn viêm, kéo dài >4 tuần hoặc có nguy cơ sẹo.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 10 hay nặn mụn, da bóng dầu cuối ngày, nổi nhiều chấm đen ở mũi.'
  },
  {
    id: 'mun-2',
    category: 'MỤN & DA LIỄU',
    title: '2. Mụn viêm / Mụn bọc',
    shortDescription: 'Papules, pustules, cystic acne – nốt đỏ sưng đau, nặng hơn thì nằm sâu dưới da. Dễ để lại sẹo nếu xử lý sai cách.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Acne_on_back.jpg', caption: 'Mụn viêm dạng nặng ở lưng – thường gặp ở nam sinh tuổi dậy thì.' }],
    commonSigns: ['Nốt đỏ đau khi chạm, có thể có đầu mủ trắng/vàng.', 'Nốt to nằm sâu dưới da, nhức rõ.', 'Mụn xẹp để lại thâm hoặc lõm.', 'Da sờ thấy cứng ở vùng có mụn bọc.'],
    schoolContext: 'Stress thi cử, thức khuya kéo dài, da bí do khẩu trang hoặc mũ bảo hiểm, vừa có mụn là đưa tay nặn ngay.',
    dangerSigns: ['Mụn sưng to, đau dữ, có dấu hiệu áp xe (mủ vàng tụ).', 'Mụn dày đặc ở mặt, ngực, lưng.', 'Ảnh hưởng mạnh đến tâm trạng, giao tiếp hàng ngày.'],
    safeActions: ['NGỪNG: Không nặn bằng móng tay, không bôi kem đánh răng hay "mẹo mạng" lên mụn.', 'RỬA: Rửa mặt dịu nhẹ, nhất là sau khi đổ mồ hôi. Không dùng xà phòng kiềm mạnh.', 'DỊU: Chườm mát giảm sưng. Dùng sản phẩm trị mụn có benzoyl peroxide hoặc adapalene đúng cách.', 'KHÁM: Nếu mụn bọc sâu, đau nhiều, tái đi tái lại hoặc có nguy cơ sẹo → đến da liễu sớm.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 11 nặn mụn bằng tay, giờ mụn sưng to, đau nhức, có mủ vàng.'
  },
  {
    id: 'mun-3',
    category: 'MỤN & DA LIỄU',
    title: '3. Viêm da cơ địa & Viêm da tiếp xúc',
    shortDescription: 'Eczema / Atopic Dermatitis / Contact Dermatitis – da khô, ngứa, đỏ bùng phát theo đợt. Cơ địa di truyền hoặc do tiếp xúc chất không hợp.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Atopic_dermatitis.png', caption: 'Viêm da cơ địa: da khô, đỏ, lichen hóa ở vùng khuỷu tay – đặc trưng của eczema.' }],
    commonSigns: ['Da khô, ngứa, đỏ bùng phát theo đợt.', 'Vùng khuỷu tay, đầu gối (học sinh lớn) hoặc má, trán (trẻ nhỏ).', 'Da dày, vằn vằn (lichen hóa) do gãi mạn.', 'Da nhạy cảm, dễ bị kích ứng bất kỳ sản phẩm nào.'],
    schoolContext: 'Dùng xà phòng thơm, nước giặt đậm mùi, áo đồng phục bí, phòng máy lạnh khô, hoặc đeo phụ kiện kim loại (nikel) đều có thể làm bùng phát.',
    dangerSigns: ['Da đỏ rực, ngứa không ngủ được nhiều đêm.', 'Có mủ, vảy vàng, sốt (nhiễm trùng thứ phát).', 'Da bong tróc rộng, có dấu hiệu nhiễm Herpes simplex (eczema herpeticum – NGUY HIỂM).'],
    safeActions: ['NGỪNG: Gãi, dùng xà phòng thơm, nước giặt mùi hắc.', 'RỬA: Tắm nước ấm vừa. Thoa kem dưỡng ẩm NGAY SAU KHI TẮM còn ẩm.', 'DỊU: Kem steroid nhẹ (hydrocortisone 1%) tối đa 7 ngày cho đợt bùng phát. Dưỡng ẩm là then chốt – dùng cream/ointment, KHÔNG dùng lotion.', 'KHÁM: Đến da liễu để được kê kem ức chế miễn dịch (tacrolimus) hoặc thuốc phù hợp.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 9 da khô ngứa nhiều ở khuỷu tay, hay gãi đến trầy da, bùng phát theo đợt mỗi khi giao mùa.'
  },
  {
    id: 'mun-4',
    category: 'MỤN & DA LIỄU',
    title: '4. Nấm da',
    shortDescription: 'Tinea / Dermatophytosis – nhiễm nấm bề mặt da, tóc, móng. Đặc trưng bởi tổn thương hình tròn, vòng tròn đồng tâm, ngứa dữ dội.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Ringworm_on_the_arm%2C_or_tinea_corporis_due_to_Trichophyton_mentagrophytes_PHIL_2938_lores.jpg', caption: 'Nấm da thân: tổn thương hình tròn vòng tròn đồng tâm đặc trưng. Nguồn: CDC PHIL.' }],
    commonSigns: ['Tổn thương hình tròn, vòng tròn đồng tâm (rìa đỏ cao, giữa lành da bình thường).', 'Vảy trắng, bong tróc ở rìa tổn thương.', 'Ngứa dữ dội, có thể rụng tóc từng mảng (nấm da đầu).', 'Móng dày, đổi màu vàng, giòn, dễ gãy (nấm móng).'],
    schoolContext: 'Lây qua dùng chung khăn tắm, ga giường, đồ thể thao. Phổ biến trong phòng gym, lớp bơi, ký túc xá. Trẻ bán trú dùng chung gối, mũ, lược có nguy cơ cao.',
    dangerSigns: ['Tổn thương lan rộng khắp cơ thể.', 'Nấm móng lan rộng, móng biến dạng nặng.', 'Có mủ, sưng đỏ quanh tổn thương (nhiễm trùng thứ phát).'],
    safeActions: ['NGỪNG: Dùng chung khăn, mũ, lược, đồ thể thao. Để da thoáng, tránh mặc đồ ẩm bí.', 'RỬA: Giữ da KHÔ RÁO sạch sẽ. Thay vớ, quần áo thấm mồ hôi ngay sau khi vận động.', 'DỊU: Thoa kem chống nấm clotrimazole 1% – 2 lần/ngày, liên tục 2-4 TUẦN (không bỏ giữa chừng khi hết ngứa).', 'KHÁM: Nếu không cải thiện sau 2 tuần hoặc nấm da đầu/móng → cần thuốc uống từ da liễu.'],
    references: [{ title: 'CDC Tinea', url: 'https://cdc.gov/fungal/diseases/ringworm.html' }],
    samplePrompt: 'Học sinh lớp 8 có vết tròn đỏ ngứa ở cổ, có vảy trắng bong tróc rìa.'
  },
  {
    id: 'mun-5',
    category: 'MỤN & DA LIỄU',
    title: '5. Ghẻ',
    shortDescription: 'Scabies – do ký sinh trùng Sarcoptes scabiei đào đường hang dưới da. Ngứa dữ dội NHẤT LÀ VỀ ĐÊM. Lây qua tiếp xúc da-da kéo dài và đồ dùng chung.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Scabies-burrow.jpg', caption: 'Ghẻ: đường hang của ve bọt ghẻ trên da – đặc trưng nhất của bệnh ghẻ.' }],
    commonSigns: ['NGỨA DỮ DỘI VỀ ĐÊM – đặc trưng nhất của ghẻ.', 'Đường hang xám nhạt dưới da ở kẽ ngón, cổ tay, nách, thắt lưng.', 'Nốt đỏ nhỏ rải rác, có thể có mụn nước nhỏ.', 'Da trầy do gãi, có thể nhiễm trùng.'],
    schoolContext: 'Lây qua tiếp xúc da-da kéo dài (khó xảy ra trong lớp học thông thường, phổ biến trong gia đình, ký túc xá). Dùng chung khăn, ga giường cũng lây.',
    dangerSigns: ['Ngứa không ngủ được nhiều đêm liên tiếp.', 'Tổn thương lan rộng toàn thân, có mủ (nhiễm trùng).', 'Da trầy sâu, chảy máu, hình thành vảy dày.'],
    safeActions: ['NGỪNG: Tiếp xúc da-da với người bệnh. Dùng chung khăn, ga giường.', 'RỬA: Giặt KHĂN, GA GIƯỜNG, VỚ bằng NƯỚC SÔI (>60°C) hoặc cho vào túi nilon đậy kín 72 giờ.', 'DỊU: Thoa permethrin 5% lên toàn thân từ cổ trở xuống – để qua đêm 8-12h rồi rửa sạch. Lặp lại sau 7 ngày.', 'KHÁM + TẤT CẢ NGƯỜI TRONG GIA ĐÌNH cùng điều trị đồng thời.'],
    references: [{ title: 'CDC Scabies', url: 'https://cdc.gov/parasites/scabies' }],
    samplePrompt: 'Học sinh nội trú ngứa dữ dội về đêm, có đường hang nhỏ ở kẽ ngón tay.'
  },
  {
    id: 'mun-6',
    category: 'MỤN & DA LIỄU',
    title: '6. Chốc lở',
    shortDescription: 'Impetigo – nhiễm trùng da do tụ cầu/liên cầu. Đặc trưng bởi vết loét đỏ và VẢY VÀNG NHƯ MẬT ONG. Phổ biến ở trẻ 2-6 tuổi, có thể gặp ở học sinh tiểu học.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Impetigo_crouteux_jambes.jpg', caption: 'Chốc lở: vết loét nông đóng vảy vàng đặc trưng như mật ong ở cẳng chân trẻ em.' }],
    commonSigns: ['Mụn nước nhỏ hoặc trợt da, nhanh vỡ để lại VẢY VÀNG MẬT ONG.', 'Vùng da xung quanh đỏ, sưng nhẹ.', 'Thường quanh mũi, miệng, tay, chân (vùng hở).', 'Ngứa nhẹ, có thể đau rát.'],
    schoolContext: 'Lây qua tiếp xúc trực tiếp, dùng chung khăn, gối ngủ bán trú, đồ chơi, bàn ghế. Thời tiết nóng ẩm giao mùa là điều kiện thuận lợi. Trẻ gãi rồi chạm sang vùng khác gây lan.',
    dangerSigns: ['Vết loét lan rộng nhanh dù đã vệ sinh.', 'Sốt cao, mệt mỏi, bỏ ăn.', 'Da sưng nóng đỏ rực, rất đau (viêm mô tế bào).', 'Hạch sưng đau ở cổ, nách.'],
    safeActions: ['NGỪNG: Gãi, chạm tay bẩn vào vết loét.', 'RỬA: Rửa vết loét 2 lần/ngày bằng nước muối sinh lý hoặc xà phòng trung tính. Dùng khăn giấy dùng một lần để thấm dịch.', 'DỊU: Thoa kháng sinh bôi (mupirocin) theo chỉ định.', 'KHÁM: Nếu lan rộng, có sốt → cần kháng sinh uống từ bác sĩ. Nghỉ học đến khi khô hẳn.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Quan sát thấy vùng quanh miệng trẻ có các vết trợt đỏ đóng vảy vàng như mật ong.'
  },
  {
    id: 'mun-7',
    category: 'MỤN & DA LIỄU',
    title: '7. Zona thần kinh',
    shortDescription: 'Shingles – Herpes Zoster – virus Varicella-Zoster tái hoạt động trong dây thần kinh. Đau rát MỘT BÊN theo dải thần kinh, sau đó phát ban mụn nước. Gặp ở người từng bị thủy đậu.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Shingles_open_vesicles.jpg', caption: 'Zona thần kinh: mụn nước tập trung theo dải thần kinh liên sườn, thường một bên thân mình.' }],
    commonSigns: ['Đau rát, bỏng, ngứa MỘT BÊN ngực/lưng/mặt theo dải thần kinh (1-3 ngày trước phát ban).', 'Phát ban đỏ sau đó hình thành mụn nước nhỏ tập trung theo dải.', 'Mụn nước vỡ, đóng vảy trong 7-10 ngày.', 'Có thể sốt nhẹ, mệt mỏi trước khi phát ban.'],
    schoolContext: 'Học sinh chưa tiêm vaccine thủy đậu hoặc suy giảm miễn dịch (stress nặng, thi cử căng thẳng) có nguy cơ zona. Virus ẩn trong hạch thần kinh sau thủy đậu và tái hoạt khi sức đề kháng giảm.',
    dangerSigns: ['Zona ở mặt gần mắt (nguy cơ viêm giác mạc, mù lòa).', 'Zona lan rộng toàn thân (zona disseminate – dấu hiệu suy giảm miễn dịch).', 'Đau dữ dội không cải thiện sau vài tuần (đau thần kinh sau zona).'],
    safeActions: ['NGỪNG: Gãi, chạm nước nóng, xà phòng lên vùng tổn thương.', 'RỬA: Giữ vùng tổn thương sạch, khô, thoáng. Mặc đồng phục rộng rãi.', 'DỊU: Chườm mát giảm đau. Uống thuốc giảm đau paracetamol nếu cần.', 'KHÁM NGAY để được kê thuốc kháng virus (acyclovir/valacyclovir) trong 72h đầu.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 9 đau rát một bên ngực, sau đó xuất hiện mụn nước tập trung theo dải ngang.'
  },
  {
    id: 'mun-8',
    category: 'MỤN & DA LIỄU',
    title: '8. Mày đay',
    shortDescription: 'Urticaria – phản ứng dị ứng hệ thống. Biểu hiện mảng sẩn phù đỏ/hồng, NGỨA DỮ DỘI, thay đổi hình dạng liên tục trong <24h. Nguyên nhân: thực phẩm, thuốc, côn trùng đốt, stress.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Urticaria_arm.jpg', caption: 'Mày đay: các sẩn phù màu đỏ hồng, nổi gồ trên da cánh tay, ngứa dữ dội – đặc trưng của urticaria.' }],
    commonSigns: ['Sẩn phù (wheal): mảng đỏ/hồng nổi gồ, ranh giới rõ, NGỨA DỮ DỘI.', 'Mỗi sẩn xuất hiện và biến mất trong <24h, để lại da bình thường.', 'Phù mạch: sưng môi, mí mắt, lưỡi, tay chân (NGUY HIỂM hơn).', 'Có thể kèm khó thở, tức ngực, chóng mặt (phản vệ).'],
    schoolContext: 'Stress thi cử kích hoạt histamine; thực phẩm trong căng tin (hải sản, đậu phộng); côn trùng trong sân trường; dị ứng thuốc (kháng sinh, giảm đau) có thể xảy ra ngay tại trường.',
    dangerSigns: ['Khó thở, thở ồn, tức ngực (phản vệ – GỌI CẤP CỨU NGAY).', 'Phù mạch lan nhanh, đặc biệt ở mặt, cổ, họng.', 'Chóng mặt, mất ý thức, tim đập nhanh.', 'Mày đay kéo dài >6 tuần (mạn tính) hoặc tái phát liên tục.'],
    safeActions: ['NGỪNG: Tác nhân gây dị ứng ngay nếu xác định được (thực phẩm, thuốc).', 'RỬA: Không cần rửa da – có thể chườm mát.', 'DỊU: Uống kháng histamine (cetirizine, loratadine) theo hướng dẫn. Không gãi.', 'CẤP CỨU NGAY nếu có dấu hiệu phản vệ: khó thở, phù mạch mặt/họng.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Sau bữa trưa ở căng tin, học sinh xuất hiện nhiều mảng đỏ ngứa trên tay, có thể sưng môi.'
  },
  {
    id: 'mun-9',
    category: 'MỤN & DA LIỄU',
    title: '9. Viêm nang lông',
    shortDescription: 'Folliculitis – viêm nhiễm ở lỗ chân lông do tụ cầu, nấm hoặc cọ xát. Biểu hiện nốt đỏ có mụn mủ quanh lỗ chân lông. Phổ biến ở vùng cổ, vai, lưng, đùi.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Isolated_folliculitis.jpg', caption: 'Viêm nang lông: nốt đỏ có mụn mủ ở trung tâm, xung quanh lỗ chân lông – nhiễm trùng nhẹ.' }],
    commonSigns: ['Nốt đỏ nhỏ hoặc mụn mủ quanh lỗ chân lông.', 'Ngứa, rát, đau nhẹ tại vùng tổn thương.', 'Thường ở cổ, vai, lưng, đùi, mặt.', 'Có thể hình thành nhọt (có mủ lớn, đau).'],
    schoolContext: 'Thể thao, đổ mồ hôi nhiều, mặc đồng phục bó sát, tập gym chung. Cạo râu/lông ở học sinh lớp lớn cũng là yếu tố nguy cơ.',
    dangerSigns: ['Nhọt to, sưng nóng đỏ, đau dữ dội.', 'Viêm lan rộng, có nhiều nhọt liên tiếp (viêm nang lông deep).', 'Sốt, hạch sưng đau gần vùng tổn thương.', 'Để lại thâm, sẹo sau lành.'],
    safeActions: ['NGỪNG: Cạo, wax, nhổ lông ở vùng đang viêm. Mặc đồ bó sát, ẩm bí.', 'RỬA: Rửa da bằng sữa rửa mặt kháng khuẩn (benzoyl peroxide 2-5%).', 'DỊU: Thoa kháng sinh bôi (mupirocin) nếu có nhẹ. Giữ da khô thoáng.', 'KHÁM: Nếu có nhọt, sốt, hoặc không cải thiện sau 1 tuần.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh sau giờ chạy thể dục, xuất hiện nhiều nốt đỏ có mụn mủ nhỏ ở cổ và vai.'
  },
  {
    id: 'mun-10',
    category: 'MỤN & DA LIỄU',
    title: '10. Mụn cóc',
    shortDescription: 'Warts – Verruca Vulgaris – bướu da lành tính do HPV. Xâm nhập qua vết xước nhỏ trên da. Phổ biến ở tay, ngón tay, lòng bàn chân. Có thể tự khỏi sau vài tháng đến vài năm.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Verruca_vulgaris.jpg', caption: 'Mụn cóc thông thường ở ngón tay: bề mặt thô, sần, có các điểm đen nhỏ (mao mạch bị tắc).' }],
    commonSigns: ['Bướu sần cứng, bề mặt thô, thường màu da hoặc hơi nâu.', 'Có các điểm đen nhỏ trên bề mặt (mao mạch bị tắc – dấu hiệu phân biệt với chai da).', 'Thường ở ngón tay, mu bàn tay, lòng bàn chân.', 'Mụn cóc phẳng (flat warts) cũng phổ biến ở tuổi học đường.'],
    schoolContext: 'HPV lây qua tiếp xúc trực tiếp với tổn thương hoặc qua bề mặt nhiễm virus (bể bơi, phòng thay đồ). Học sinh thể thao (bóng rổ, cầu lông) dễ bị lây qua vết trầy trên tay.',
    dangerSigns: ['Mụn cóc sưng, đau, có mủ (nhiễm trùng thứ phát).', 'Lan rộng nhiều vị trí, đặc biệt quanh móng (khó điều trị).', 'Mụn cóc ở mặt, bộ phận sinh dục cần được khám chuyên khoa.', 'Tự ý cắt, đốt không đúng cách gây lan rộng.'],
    safeActions: ['NGỪNG: Tự ý cắt, bôi acid, đốt mụn cóc tại nhà.', 'RỬA: Giữ da khô, rửa tay thường xuyên. Không dùng chung khăn, vật dụng cá nhân tiếp xúc vùng có mụn cóc.', 'DỊU: Thoa acid salicylic 17% hoặc dán acid lactic theo hướng dẫn – kiên trì trong vài tuần.', 'KHÁM: Điều trị bằng nitơ lỏng (cryotherapy), laser hoặc thuốc bôi theo chỉ định da liễu.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh lớp 6 có bướu nhỏ cứng, sần ở ngón tay, bề mặt thô, có điểm đen nhỏ.'
  },
  // ══════════════════════════════════════════════════════
  // BỆNH LÂY NHIỄM
  // ══════════════════════════════════════════════════════
  {
    id: 'tcm-1',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Tay-Chân-Miệng',
    shortDescription: 'HFMD – virus Enterovirus (Coxsackie A16, EV71). Sốt + loét miệng + phỏng nước ở lòng bàn tay/chân. Phổ biến ở trẻ <10 tuổi nhưng học sinh THPT cũng có thể gặp.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Hand%2C_Foot_and_Mouth_Disease_Blisters.jpeg', caption: 'Bệnh Tay-Chân-Miệng: phỏng nước đặc trưng ở lòng bàn chân và bàn tay trẻ em.' }],
    commonSigns: ['Sốt nhẹ, mệt mỏi, đau họng 1-2 ngày đầu.', 'Loét miệng: nốt đỏ ở lợi, lưỡi, gây đau khi ăn.', 'Phỏng nước ở lòng bàn tay, bàn chân, mông, gối.', 'Trẻ quấy khóc, bỏ ăn do đau miệng.'],
    schoolContext: 'Virus tồn tại lâu trên bề mặt (bàn ghế, đồ chơi, tay nắm cửa). Lây qua ăn uống chung, tiếp xúc dịch tiết của trẻ bệnh. Cần cách ly trẻ ngay khi phát hiện.',
    dangerSigns: ['Sốt cao >39°C không hạ dù thuốc.', 'Giật mình, run tay chân, quấy khóc vô cớ khi ngủ (dấu hiệu thần kinh).', 'Đi đứng loạng choạng, nôn ói, khó thở.', 'Da nổi vân tím, vã mồ hôi lạnh (dấu hiệu sốc).'],
    safeActions: ['NGỪNG: Cho trẻ đến trường khi đang bệnh. Dùng chung đồ ăn uống, khăn.', 'RỬA: Cách ly tại nhà. Rửa tay thường xuyên bằng xà phòng. Khử khuẩn đồ dùng bằng Cloramin B.', 'DỊU: Cho ăn đồ lỏng, mềm, nguội (cháo, súp, sữa). Không ép ăn.', 'KHÁM NGAY nếu có dấu hiệu thần kinh hoặc sốc. Theo dõi 24h đầu sau phát ban.'],
    references: [{ title: 'CDC Việt Nam', url: 'https://vncdc.gov.vn' }],
    samplePrompt: 'Trẻ 8 tuổi sốt nhẹ, đau miệng bỏ ăn, có nốt đỏ ở lòng bàn tay.'
  },
  {
    id: 'tcm-2',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Thủy đậu',
    shortDescription: 'Chickenpox – virus Varicella-Zoster. Mụn nước TRONG trên nền da ĐỎ, ngứa, sốt nhẹ. Có thể gây biến chứng viêm phổi, viêm não. Để lại sẹo nếu gãi nhiều.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Chickenpox_blister-%28closeup%29.jpg', caption: 'Thủy đậu: mụn nước trong trên nền da đỏ – hình ảnh "giọt sương trên cánh hoa hồng" đặc trưng.' }],
    commonSigns: ['Sốt nhẹ, mệt mỏi, đau đầu 1-2 ngày.', 'Phát ban đỏ rải rác, sau đó hình thành MỤN NƯỚC TRONG trong vòng vài giờ.', 'Mụn nước xuất hiện ở mặt, da đầu, thân mình, tay chân – các giai đoạn khác nhau cùng lúc.', 'Mụn nước khô thành vảy trong 5-10 ngày.'],
    schoolContext: 'Lây rất nhanh trong trường học qua giọt bắn và tiếp xúc dịch mụn nước. Một trẻ bệnh có thể lây cho nhiều bạn trong lớp. Trẻ bệnh cần nghỉ học ít nhất 7 ngày sau phát ban.',
    dangerSigns: ['Sốt cao liên tục không hạ.', 'Mụn nước có mủ, sưng đỏ lan rộng (nhiễm trùng da).', 'Trẻ khó thở, ho nhiều (viêm phổi).', 'Đau đầu dữ dội, cứng cổ, lú lẫn (viêm não).'],
    safeActions: ['NGỪNG: Gãi mụn nước – để lại sẹo rỗ. Đến trường khi còn vảy chưa khô hết.', 'RỬA: Tắm nước ấm nhẹ nhàng. Cắt móng ngắn. Mặc đồ mềm, thoáng.', 'DỊU: Dùng thuốc chống ngứa (phenylephrine) theo chỉ định. Chườm mát giảm ngứa.', 'KHÁM: Nếu sốt cao, khó thở, đau đầu dữ dội → đến ngay.'],
    references: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }],
    samplePrompt: 'Trẻ 10 tuổi sốt nhẹ, có nhiều mụn nước trong ở mặt và thân, ngứa nhiều.'
  },
  {
    id: 'tcm-3',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Cúm',
    shortDescription: 'Influenza – virus Influenza A/B/C. Sốt cao ĐỘT BIẾN + đau cơ + ho + mệt MẤT ĂN NGỦ. Nặng hơn cảm thường rất nhiều. Bùng phát theo mùa (mùa lạnh, giao mùa).',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/H1N1_Influenza_Virus_Particles_%288411599236%29.jpg', caption: 'Virus cúm Influenza – hình ảnh kính hiển vi điện tử.' }],
    commonSigns: ['Sốt cao ĐỘT BIẾN 39-40°C, run rẩy, ớn lạnh.', 'Đau đầu dữ dội, đau cơ toàn thân.', 'Ho dữ dội, đau ngực khi ho.', 'Mệt mỏi nặng, nằm liệt giường 3-5 ngày.'],
    schoolContext: 'Lây rất nhanh qua giọt bắn khi ho, hắt hơi, nói chuyện. Một học sinh bệnh có thể lây cho cả lớp trong vài ngày. Phổ biến giai đoạn giao mùa, lúc thi cử.',
    dangerSigns: ['Khó thở, thở nhanh, thở gấp (viêm phổi).', 'Sốt không hạ hoặc sốt lại sau 3-4 ngày (bội nhiễm vi khuẩn).', 'Đau ngực dữ dội, ho ra máu.', 'Lú lẫn, không tỉnh táo, co giật.'],
    safeActions: ['NGỪNG: Đến trường khi đang sốt, ho, đau mỏi. Đeo khẩu trang nếu bắt buộc phải ra ngoài.', 'RỬA: Rửa tay thường xuyên bằng xà phòng. Dùng khăn giấy che miệng khi ho/hắt hơi.', 'DỊU: Hạ sốt bằng paracetamol. Uống nhiều nước, oresol, nước hoa quả.', 'KHÁM: Nếu sốt cao >3 ngày, khó thở, đau ngực.'],
    references: [{ title: 'WHO Influenza', url: 'https://who.int/influenza' }],
    samplePrompt: 'Học sinh lớp 10 sốt cao đột ngột, đau đầu dữ dội, đau cơ, ho, mệt liệt giường, lớp có nhiều bạn cùng sốt.'
  },
  {
    id: 'tcm-4',
    category: 'BỆNH LÂY NHIỄM',
    title: 'Đau mắt đỏ',
    shortDescription: 'Conjunctivitis – viêm kết mạc do virus (Adenovirus) hoặc vi khuẩn. Mắt đỏ rực + ghèn/đục nhiều + chảy nước mắt. Lây LAN NHANH trong lớp học.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/An_eye_with_conjunctivitis.jpg', caption: 'Viêm kết mạc: lòng trắng mắt đỏ rực, ghèn/đục nhiều – dễ lây trong trường học.' }],
    commonSigns: ['Lòng trắng mắt đỏ rực, đỏ tươi hoặc hồng.', 'Cảm giác cộm, rát như có cát trong mắt.', 'Ghèn (đục) nhiều, buổi sáng dính mắt khó mở.', 'Chảy nước mắt, sưng mí mắt, nhạy cảm ánh sáng.'],
    schoolContext: 'Lây qua dùng chung khăn mặt, gối, kính, hoặc chạm tay vào dịch tiết mắt rồi đưa lên mắt. Một ca trong lớp có thể lây cho NHIỀU BẠN trong vài ngày.',
    dangerSigns: ['Đau nhức mắt dữ dội, đau sâu vào hốc mắt.', 'Nhìn mờ, suy giảm thị lực đột ngột.', 'Mắt rất sợ ánh sáng, không thể mở mắt.', 'Chảy mủ đặc hoặc có máu từ kết mạc.'],
    safeActions: ['NGỪNG: Dùng chung khăn, gối, kính, thuốc nhỏ mắt. Đến trường khi đang đỏ mắt nhiều ghèn.', 'RỬA: Nhỏ nước muối sinh lý (NaCl 0.9%) thường xuyên. Rửa tay xà phòng ngay sau khi chạm vào mắt.', 'DỊU: Thuốc nhỏ mắt kháng virus hoặc kháng sinh theo đơn bác sĩ.', 'KHÁM: Nếu đỏ nặng, mờ mắt, đau nhiều, hoặc không cải thiện sau 3 ngày.'],
    references: [{ title: 'BV Mắt TW', url: 'https://vnio.vn' }],
    samplePrompt: 'Học sinh lớp 8 mắt đỏ nhiều ghèn vàng dính mi buổi sáng, ngày càng lây sang mắt còn lại.'
  },
  // ══════════════════════════════════════════════════════
  // SỨC KHỎE TÂM LÝ
  // ══════════════════════════════════════════════════════
  {
    id: 'tl-1',
    category: 'SỨC KHỎE TÂM LÝ',
    title: '1. Stress học tập & Rối loạn giấc ngủ',
    shortDescription: 'Căng thẳng tâm lý do áp lực thi cử, điểm số, kỳ vọng gia đình. Dẫn đến mất ngủ, lo âu, đau đầu, thay đổi cảm xúc. Rất phổ biến giai đoạn thi học kỳ.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Human_stress.jpg', caption: 'Biểu hiện stress: căng thẳng, mệt mỏi, khó tập trung – rất phổ biến mùa thi.' }],
    commonSigns: ['Mất ngủ hoặc ngủ không sâu giấc, thức dậy mệt.', 'Đau đầu, đau bụng không rõ nguyên nhân thực thể.', 'Lo âu, bồn chồn, khó tập trung trong học tập.', 'Thay đổi cảm xúc: dễ khóc, cáu gắt, cô lập.'],
    schoolContext: 'Áp lực thi cử, bài tập nhiều, kỳ vọng từ gia đình, so sánh với bạn bè. Học sinh lớp cuối (lớp 9, lớp 12) đặc biệt dễ bị stress nặng. Giao mùa thi là cao điểm.',
    dangerSigns: ['Không ngủ được nhiều ngày liên tiếp.', 'Có ý nghĩ tự làm đau bản thân hoặc muốn chấm dứt cuộc sống.', 'Hoảng sợ tột độ, cơn hoảng panic.', 'Bỏ ăn, bỏ học, cô lập hoàn toàn.'],
    safeActions: ['NGỪNG: Áp lực thêm về điểm số, so sánh con với "con nhà người ta".', 'RỬA: Chia sẻ với người tin tưởng (bạn bè, thầy cô, cha mẹ). Viết nhật ký cảm xúc.', 'DỊU: Vận động nhẹ (đi bộ, chạy bộ, yoga) 30 phút/ngày. Ngủ đủ 7-8h/đêm. Hạn chế caffeine, mạng xã hội buổi tối.', 'KHÁM: Nếu kéo dài >2 tuần, ảnh hưởng học tập nặng → gặp chuyên gia tâm lý học đường. Gọi đường dây hỗ trợ: 1800-9090.'],
    references: [{ title: 'BV Tâm thần TW', url: 'https://benhvienphantin.vn' }],
    samplePrompt: 'Học sinh lớp 11 gần thi học kỳ: mất ngủ, đau đầu, bỏ ăn, không muốn đi học, cô lập.'
  },
  {
    id: 'tl-2',
    category: 'SỨC KHỎE TÂM LÝ',
    title: '2. Thay đổi nội tiết tuổi dậy thì',
    shortDescription: 'Giai đoạn chuyển tiếp sinh lý mạnh mẽ: thay đổi hormone → mụn, chiều cao, cảm xúc thất thường. Nữ 8-13 tuổi, Nam 9-14 tuổi. ĐÂY LÀ BÌNH THƯỜNG nhưng cần hiểu để không tự ti.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Teenager-isolated-on-white.jpg/440px-Teenager-isolated-on-white.jpg', caption: 'Thanh thiếu niên tuổi dậy thì – giai đoạn thay đổi mạnh mẽ về thể chất và tâm lý.' }],
    commonSigns: ['Phát triển chiều cao nhanh, thay đổi hình dạng cơ thể.', 'Nổi MỤN (do tăng hormone androgen).', 'Cảm xúc thất thường, dễ kích động, dễ buồn.', 'Bắt đầu kinh nguyệt (nữ), thay đổi cơ thể (nam).'],
    schoolContext: 'Học sinh tự ti về ngoại hình thay đổi, so sánh với bạn bè. Áp lực mạng xã hội (Instagram, TikTok) làm trầm trọng thêm. Cần giáo dục đúng đắn, KHÔNG so sánh.',
    dangerSigns: ['Rối loạn ăn uống: nhịn ăn, ăn quá nhiều để kiểm soát cân nặng.', 'Tự ti quá mức dẫn đến trầm cảm, cô lập.', 'Hành vi tự hại: cắt tay, tổn thương bản thân.', 'Quan hệ tình dục sớm không an toàn.'],
    safeActions: ['NGỪNG: So sánh ngoại hình với người khác. Xem mạng xã hội quá nhiều về "body image".', 'RỬA: Cha mẹ trò chuyện CỞI MỞ với con về thay đổi cơ thể. Giáo dục giới tính phù hợp lứa tuổi.', 'DỊU: Chăm sóc da đúng cách (rửa mặt, dưỡng ẩm). Vệ sinh kinh nguyệt đúng cách (nữ).', 'KHÁM: Nếu rối loạn ăn uống, trầm cảm, tự ti quá mức → gặp chuyên gia tâm lý.'],
    references: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }],
    samplePrompt: 'Học sinh nữ lớp 6 bắt đầu có kinh nguyệt, nổi nhiều mụn, tự ti về ngoại hình, hay so sánh mình với bạn trên mạng.'
  },
  // ══════════════════════════════════════════════════════
  // VỆ SINH & NHIỄM KHUẨN
  // ══════════════════════════════════════════════════════
  {
    id: 'vs-1',
    category: 'VỆ SINH',
    title: '1. Sốt tinh hồng nhiệt',
    shortDescription: 'Scarlet Fever – vi khuẩn Streptococcus nhóm A. Sốt cao + ĐAU HỌNG + PHÁT BAN ĐỎ NHƯ GIẤY NHÁM + lưỡi đỏ bóng (lưỡi dâu tây). Cần kháng sinh đủ liệu trình.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Scarlet_fever_rash.jpg', caption: 'Sốt tinh hồng nhiệt: phát ban đỏ kiểu giấy nhám (sandpaper rash) trên da – đặc trưng nhất của bệnh.' }],
    commonSigns: ['Sốt cao đột ngột, đau họng, amidan sưng đỏ có mủ.', 'PHÁT BAN ĐỎ NHƯ GIẤY NHÁM trên toàn thân.', 'Lưỡi đỏ bóng, các hạt lưỡi nổi rõ (LƯỠI DÂU TÂY).', 'Da mặt đỏ nhưng vùng quanh miệng TRẮNG (tam sắc).'],
    schoolContext: 'Lây qua giọt bắn đường hô hấp khi ho, hắt hơi, nói chuyện. Trẻ bệnh lây cho các bạn cùng lớp rất nhanh. Cần thông báo trường ngay.',
    dangerSigns: ['Sốt cao không hạ dù dùng thuốc.', 'Khó nuốt dữ dội, amidan sưng to, không ăn được.', 'Phát ban bong tróc dữ dội, da đỏ rộng.', 'Nước tiểu ít, đỏ hoặc có bọt (biến chứng thận).'],
    safeActions: ['NGỪNG: Đến trường khi đang sốt, đau họng. Ăn uống chung, dùng chung đồ cá nhân.', 'RỬA: Khạc nhổ đờm, giữ vệ sinh miệng. Rửa tay thường xuyên.', 'DỊU: Uống KHÁNG SINH ĐỦ LIỆU TRÌNH 10 NGÀY theo đơn bác sĩ – KHÔNG tự ngưng khi hết sốt.', 'KHÁM + TÁI KHÁM để đảm bảo không còn vi khuẩn, kiểm tra biến chứng thận, tim.'],
    references: [{ title: 'NHS Scarlet Fever', url: 'https://nhs.uk/conditions/scarlet-fever' }],
    samplePrompt: 'Học sinh sốt cao, đau họng, phát ban đỏ như giấy nhám toàn thân, lưỡi đỏ bóng.'
  },
  {
    id: 'vs-2',
    category: 'VỆ SINH',
    title: '2. Nhiễm khuẩn da & Vết trầy nhiễm trùng',
    shortDescription: 'Nhiễm trùng da do tụ cầu/liên cầu – biểu hiện từ viêm nang lông đến viêm mô tế bào. Phổ biến khi da bị trầy, ngã, côn trùng đốt rồi gãi, vết thương hở.',
    educationalImages: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Cellulitis_leg.jpg', caption: 'Viêm mô tế bào: da sưng đỏ nóng, lan rộng nhanh – cần kháng sinh.' }],
    commonSigns: ['Da đỏ, sưng, nóng, đau tại vùng tổn thương.', 'Có thể có mủ, vết trợt/loét.', 'Sốt, hạch sưng đau gần vùng nhiễm trùng.', 'Lan nhanh trong vài giờ nếu không điều trị.'],
    schoolContext: 'Trẻ bị trầy da khi chơi thể thao, ngã trong sân trường, bị côn trùng đốt rồi gãi nhiễm trùng. Ký túc xá, nhà ở tập thể vệ sinh kém là yếu tố nguy cơ.',
    dangerSigns: ['Da đỏ sưng LAN NHANH, kèm sốt cao.', 'Mủ tích tụ thành áp xe (nhọt) – cần rạch mủ.', 'Nhiễm trùng lan vào máu (nhiễm trùng huyết) – DẤU HIỆU CẤP CỨU.', 'Hạch sưng to, đau nhức dữ dội.'],
    safeActions: ['NGỪNG: Gãi, chạm vết thương bẩn, tự bôi thuốc không rõ nguồn gốc.', 'RỬA: Rửa sạch vùng da bị trầy bằng nước và xà phòng. Thay băng thường xuyên.', 'DỊU: Thoa kháng sinh bôi (mupirocin) nếu nhẹ. Giữ sạch và KHÔ.', 'CẤP CỨU ngay nếu sốt cao, lan rộng nhanh, có mủ nhiều.'],
    references: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }],
    samplePrompt: 'Học sinh bị trầy đầu gối khi chơi thể thao, vết trầy sưng đỏ, có mủ vàng, đau.'
  }
];
 
// ── WEEKLY TRENDS DATA ──────────────────────────────────────
const WEEKLY_TRENDS: WeeklyTrend[] = [
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
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'healbook' | 'aiscan' | 'findcare'>('healbook');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<HealbookTopic | null>(null);
  
  // AI Scan State
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<HealthCase | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showDetailedHeatmap, setShowDetailedHeatmap] = useState(false);
  const [heatmapViewMode, setHeatmapViewMode] = useState<'heatmap' | 'annotation'>('heatmap');

  // Heatmap Analysis State
  const [heatmapAnalysis, setHeatmapAnalysis] = useState<string | null>(null);
  const [heatmapAnalyzing, setHeatmapAnalyzing] = useState(false);

  // Segmentation Canvas State
  const [showSegmentation, setShowSegmentation] = useState(false);
  const [contourPoints, setContourPoints] = useState<{x: number, y: number}[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const segmentationCanvasRef = useRef<HTMLCanvasElement>(null);
  const [segmentationAdvice, setSegmentationAdvice] = useState<string | null>(null);
  
  // Find Care State
  const [mapMode, setMapMode] = useState<'idle' | 'hospital' | 'pharmacy'>('idle');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Chatbot state
  const [showChat, setShowChat] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Initialize and handle Leaflet Map
  useEffect(() => {
    if (activeTab !== 'findcare' || mapMode === 'idle') return;

    const timer = setTimeout(() => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv) return;

      // Remove old map if exists
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const lat = location?.lat || 21.0285;
      const lng = location?.lng || 105.8542;

      const map = L.map('map', {
        zoomControl: true,
        attributionControl: false,
        width: '100%',
        height: '100%'
      }).setView([lat, lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // User location marker
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `<div style="width:28px;height:28px;background:#4f46e5;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:white;border-radius:50%;"></div></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      L.marker([lat, lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<b style="font-size:11px">📍 Vị trí của bạn</b>')
        .openPopup();

      // Place markers
      const count = mapMode === 'hospital' ? 4 : 5;
      for (let i = 1; i <= count; i++) {
        const offsetLat = (Math.random() - 0.5) * 0.018;
        const offsetLng = (Math.random() - 0.5) * 0.018;
        const mLat = lat + offsetLat;
        const mLng = lng + offsetLng;
        const dist = (Math.sqrt(offsetLat**2 + offsetLng**2) * 111).toFixed(1);
        const label = mapMode === 'hospital' ? `Bệnh viện Đa khoa ${i}` : `Nhà thuốc Pharma ${i}`;
        const bgColor = mapMode === 'hospital' ? '#ef4444' : '#10b981';
        const icon = L.divIcon({
          className: 'custom-place-marker',
          html: `<div style="width:44px;height:44px;background:${bgColor};border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:18px;">${mapMode === 'hospital' ? '🏥' : '💊'}</div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
          popupAnchor: [0, -22]
        });
        L.marker([mLat, mLng], { icon })
          .addTo(map)
          .bindPopup(`<b style="font-size:11px">${label}</b><br><span style="font-size:10px;color:#888">📍 Cách ~${dist} km</span>`);
      }

      // CRITICAL: invalidateSize after map div is visible
      setTimeout(() => { map.invalidateSize({ force: true }); }, 200);

      mapRef.current = map;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab, mapMode, location]);

  // ── Canvas Heatmap Overlay ───────────────────────────────
  useEffect(() => {
    if (!showHeatmap || !aiResult || !heatmapCanvasRef.current || !imageContainerRef.current) return;

    const canvas = heatmapCanvasRef.current;
    const container = imageContainerRef.current;
    const annotations = aiResult.annotations || [];

    const drawHeatmap = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (annotations.length === 0) {
        // Fallback: draw a central gradient blob if no annotations
        const cx = canvas.width * 0.5;
        const cy = canvas.height * 0.5;
        const radius = Math.min(canvas.width, canvas.height) * 0.35;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(220, 38, 38, 0.55)');
        grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.35)');
        grad.addColorStop(1, 'rgba(234, 179, 8, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      annotations.forEach((ann: any) => {
        const x = ann.x * canvas.width;
        const y = ann.y * canvas.height;
        const w = ann.w * canvas.width;
        const h = ann.h * canvas.height;

        // Gradient fill inside box
        const severityColors: Record<string, [number, number, number]> = {
          high:   [220, 38,  38 ],
          medium: [249, 115, 22 ],
          low:    [234, 179, 8  ],
        };
        const [r, g, b] = severityColors[ann.severity] || severityColors.medium;

        // Draw gradient blob
        const grad = ctx.createRadialGradient(x + w/2, y + h/2, 0, x + w/2, y + h/2, Math.max(w, h) * 0.8);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},0.25)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - w*0.3, y - h*0.3, w*1.6, h*1.6);

        // Bounding box
        ctx.strokeStyle = `rgba(${r},${g},${b},0.85)`;
        ctx.lineWidth = ann.severity === 'high' ? 3 : 2;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(x, y, w, h);
        ctx.setLineDash([]);

        // Label badge
        const labelText = ann.label;
        ctx.font = 'bold 11px sans-serif';
        const textMetrics = ctx.measureText(labelText);
        const padX = 6;
        const labelW = textMetrics.width + padX * 2;
        const labelH = 20;

        ctx.fillStyle = `rgba(${r},${g},${b},0.92)`;
        ctx.beginPath();
        ctx.roundRect(x, y - labelH - 4, labelW, labelH, 6);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.fillText(labelText, x + padX, y - 8);

        // Pulsing outer ring for high severity
        if (ann.severity === 'high') {
          let frame = 0;
          const pulse = () => {
            if (!showHeatmap || !heatmapCanvasRef.current) return;
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Redraw all without pulse first
            annotations.forEach((a: any, idx: number) => {
              if (idx < annotations.indexOf(ann)) {
                const ax = a.x * canvas.width;
                const ay = a.y * canvas.height;
                const aw = a.w * canvas.width;
                const ah = a.h * canvas.height;
                const [ar, ag, ab] = severityColors[a.severity] || severityColors.medium;
                const aGrad = ctx.createRadialGradient(ax+aw/2, ay+ah/2, 0, ax+aw/2, ay+ah/2, Math.max(aw,ah)*0.8);
                aGrad.addColorStop(0, `rgba(${ar},${ag},${ab},0.5)`);
                aGrad.addColorStop(0.6, `rgba(${ar},${ag},${ab},0.25)`);
                aGrad.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
                ctx.fillStyle = aGrad;
                ctx.fillRect(ax-aw*0.3, ay-ah*0.3, aw*1.6, ah*1.6);
                ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.85)`;
                ctx.lineWidth = a.severity === 'high' ? 3 : 2;
                ctx.setLineDash([6, 4]);
                ctx.strokeRect(ax, ay, aw, ah);
                ctx.setLineDash([]);
                ctx.font = 'bold 11px sans-serif';
                ctx.fillStyle = `rgba(${ar},${ag},${ab},0.92)`;
                const tm = ctx.measureText(a.label);
                ctx.fillRect(ax, ay - 24, tm.width + 12, 20);
                ctx.fillStyle = '#fff';
                ctx.fillText(a.label, ax + 6, ay - 8);
              }
            });
            // Pulsing ring
            const pulseAlpha = 0.6 - (frame % 40) / 80;
            const pulseScale = 1 + (frame % 40) / 60;
            ctx.strokeStyle = `rgba(220,38,38,${Math.max(0, pulseAlpha)})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(
              x - (w * (pulseScale - 1)) / 2,
              y - (h * (pulseScale - 1)) / 2,
              w * pulseScale,
              h * pulseScale
            );
            if (showHeatmap) requestAnimationFrame(pulse);
          };
          requestAnimationFrame(pulse);
        }
      });
    };

    // Delay slightly to ensure image is rendered and canvas sized
    const t = setTimeout(drawHeatmap, 150);
    return () => clearTimeout(t);
  }, [showHeatmap, aiResult]);

  // ── Detailed Heatmap Modal Canvas ────────────────────────────
  useEffect(() => {
    if (!showDetailedHeatmap || !aiResult) return;

    const drawDetailedHeatmap = () => {
      const heatmapCanvas = document.getElementById('detailed-heatmap-canvas') as HTMLCanvasElement;
      const annotationCanvas = document.getElementById('detailed-annotation-canvas') as HTMLCanvasElement;
      const container = heatmapCanvas?.parentElement;
      if (!heatmapCanvas || !container) return;

      const img = container.querySelector('img');
      if (!img) return;

      const rect = img.getBoundingClientRect();
      heatmapCanvas.width = rect.width;
      heatmapCanvas.height = rect.height;
      if (annotationCanvas) {
        annotationCanvas.width = rect.width;
        annotationCanvas.height = rect.height;
      }

      const heatmapCtx = heatmapCanvas.getContext('2d')!;
      const annotationCtx = annotationCanvas?.getContext('2d')!;

      // Always clear both canvases
      heatmapCtx.clearRect(0, 0, heatmapCanvas.width, heatmapCanvas.height);
      if (annotationCtx) annotationCtx.clearRect(0, 0, annotationCanvas.width, annotationCanvas.height);

      const annotations = aiResult.annotations || [];
      const severityColors: Record<string, [number, number, number]> = {
        high:   [220, 38,  38 ],
        medium: [249, 115, 22 ],
        low:    [234, 179, 8  ],
      };

      // Draw heatmap gradient overlay (only in heatmap mode)
      if (heatmapViewMode === 'heatmap') {
        if (annotations.length === 0) {
          const cx = heatmapCanvas.width * 0.5;
          const cy = heatmapCanvas.height * 0.5;
          const radius = Math.min(heatmapCanvas.width, heatmapCanvas.height) * 0.4;
          const grad = heatmapCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          grad.addColorStop(0, 'rgba(220, 38, 38, 0.5)');
          grad.addColorStop(0.4, 'rgba(249, 115, 22, 0.35)');
          grad.addColorStop(0.7, 'rgba(234, 179, 8, 0.15)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
          heatmapCtx.fillStyle = grad;
          heatmapCtx.fillRect(0, 0, heatmapCanvas.width, heatmapCanvas.height);
        } else {
          annotations.forEach((ann: any) => {
            const x = ann.x * heatmapCanvas.width;
            const y = ann.y * heatmapCanvas.height;
            const w = ann.w * heatmapCanvas.width;
            const h = ann.h * heatmapCanvas.height;
            const [r, g, b] = severityColors[ann.severity] || severityColors.medium;

            const grad = heatmapCtx.createRadialGradient(x + w/2, y + h/2, 0, x + w/2, y + h/2, Math.max(w, h) * 0.8);
            grad.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
            grad.addColorStop(0.5, `rgba(${r},${g},${b},0.35)`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            heatmapCtx.fillStyle = grad;
            heatmapCtx.fillRect(x - w*0.4, y - h*0.4, w*1.8, h*1.8);

            heatmapCtx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
            heatmapCtx.lineWidth = ann.severity === 'high' ? 3 : 2;
            heatmapCtx.setLineDash([8, 4]);
            heatmapCtx.strokeRect(x, y, w, h);
            heatmapCtx.setLineDash([]);

            const labelText = ann.label;
            heatmapCtx.font = 'bold 12px sans-serif';
            const textMetrics = heatmapCtx.measureText(labelText);
            const padX = 8;
            const labelW = textMetrics.width + padX * 2;
            const labelH = 22;

            heatmapCtx.fillStyle = `rgba(${r},${g},${b},0.95)`;
            heatmapCtx.beginPath();
            heatmapCtx.roundRect(x, y - labelH - 6, labelW, labelH, 6);
            heatmapCtx.fill();

            heatmapCtx.fillStyle = '#fff';
            heatmapCtx.fillText(labelText, x + padX, y - 10);
          });
        }
      }

      // Draw annotation boxes (only in annotation mode) - style like in the image
      if (heatmapViewMode === 'annotation' && annotationCtx) {
        if (annotations.length === 0) {
          // Default annotation area
          const x = annotationCanvas.width * 0.3;
          const y = annotationCanvas.height * 0.3;
          const w = annotationCanvas.width * 0.4;
          const h = annotationCanvas.height * 0.4;

          annotationCtx.strokeStyle = 'rgba(220, 38, 38, 0.9)';
          annotationCtx.lineWidth = 3;
          annotationCtx.strokeRect(x, y, w, h);

          // Y marker
          annotationCtx.fillStyle = 'rgba(220, 38, 38, 0.9)';
          annotationCtx.font = 'bold 16px sans-serif';
          annotationCtx.fillText('Y', x + w/2 - 6, y + h/2 + 6);
        } else {
          annotations.forEach((ann: any, idx: number) => {
            const x = ann.x * annotationCanvas.width;
            const y = ann.y * annotationCanvas.height;
            const w = ann.w * annotationCanvas.width;
            const h = ann.h * annotationCanvas.height;
            const [r, g, b] = severityColors[ann.severity] || severityColors.medium;

            // Draw box with solid border
            annotationCtx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
            annotationCtx.lineWidth = 3;
            annotationCtx.strokeRect(x, y, w, h);

            // Y marker centered in box
            annotationCtx.fillStyle = `rgba(${r},${g},${b},0.9)`;
            annotationCtx.font = 'bold 18px sans-serif';
            annotationCtx.fillText('Y', x + w/2 - 6, y + h/2 + 6);
          });
        }
      }
    };

    const t = setTimeout(drawDetailedHeatmap, 200);
    return () => clearTimeout(t);
  }, [showDetailedHeatmap, aiResult, heatmapViewMode]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hover: string; chip: string }> = {
    'MỤN & DA LIỄU':    { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', hover: 'hover:bg-red-50 hover:shadow-red-100', chip: 'bg-red-500 text-white' },
    'BỆNH LÂY NHIỄM':   { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', hover: 'hover:bg-orange-50 hover:shadow-orange-100', chip: 'bg-orange-500 text-white' },
    'SỨC KHỎE TÂM LÝ':  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', hover: 'hover:bg-pink-50 hover:shadow-pink-100', chip: 'bg-pink-500 text-white' },
    'VỆ SINH':           { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', hover: 'hover:bg-cyan-50 hover:shadow-cyan-100', chip: 'bg-cyan-500 text-white' },
  };

  const allCategories = ['MỤN & DA LIỄU', 'BỆNH LÂY NHIỄM', 'SỨC KHỎE TÂM LÝ', 'VỆ SINH'];

  const filteredHealbook = useMemo(() => {
    return HEALBOOK_DATA.filter(t => {
      const matchesCategory = !selectedCategory || t.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);


  const handleOpenDetail = (topic: HealbookTopic) => {
    setSelectedTopic(topic);
  };

  const handleUseTopicFromModal = (topic: HealbookTopic) => {
    setSelectedImage(null);
    setInputText(topic.samplePrompt);
    setActiveTab('aiscan');
    setSelectedTopic(null);
    setAiResult(null);
    setShowHeatmap(false);
  };

  const handleFindCare = (type: 'hospital' | 'pharmacy') => {
    setMapMode(type);
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 21.0285, lng: 105.8542 }) // Default Hanoi
      );
    }
  };

  const API_BASE = import.meta.env.VITE_API_PROXY_URL || '';

  // Retry helper with exponential backoff
  const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = 3,
    baseDelayMs = 2000
  ): Promise<Response> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const response = await fetch(url, options);

      if (response.status !== 429) {
        return response; // Only retry on rate limit
      }

      if (attempt === retries) {
        return response; // Return last response to let caller handle it
      }

      // Exponential backoff: 2s, 4s, 8s
      const delay = baseDelayMs * Math.pow(2, attempt);
      console.log(`⚠️ Rate limited. Retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    // Never reached, but satisfies TypeScript
    throw new Error('Max retries exceeded');
  };

  const callAI = async () => {
    if (!inputText && !selectedImage) return;
    setLoading(true);
    setAiResult(null);
    setShowHeatmap(false);
    try {
      const response = await fetchWithRetry(`${API_BASE}/api/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          imageBase64: selectedImage ? selectedImage.split(',')[1] : null,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Lỗi không xác định' }));
        console.error('AI Scan error:', err);
        alert(err.error || 'Lỗi kết nối AI. Vui lòng thử lại.');
        return;
      }

      const result = await response.json();
      setAiResult(result);
    } catch (e) {
      console.error('AI Error:', e);
      alert('Lỗi kết nối AI. Vui lòng thử lại.');
    } finally { setLoading(false); }
  };

  const callChat = async (text: string) => {
    console.log('CHATBOT CALLED ✅', text);
    setChatLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', content: text }]);

    try {
      // Build conversation history for context
      const historyMessages = chatMessages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      }));

      const response = await fetchWithRetry(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...historyMessages, { role: 'user', content: text }] }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Lỗi không xác định' }));
        console.error('Chatbot error:', err);
        setChatMessages(prev => [...prev, { role: 'assistant', content: err.error || 'Lỗi kết nối. Vui lòng thử lại.' }]);
        return;
      }

      const data = await response.json();
      const reply = data.reply || 'Mình chưa có thông tin phù hợp.';
      console.log('REPLY:', reply);
      setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error('CHATBOT ERROR:', e);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Lỗi kết nối. Vui lòng thử lại.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  // ── Heatmap Analysis ─────────────────────────────────────────
  const analyzeHeatmap = async () => {
    if (!selectedImage || !aiResult) return;
    setHeatmapAnalyzing(true);
    setHeatmapAnalysis(null);
    try {
      const response = await fetchWithRetry(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Bạn là bác sĩ chuyên khoa Da liễu Việt Nam. Hãy phân tích hình ảnh heatmap vùng tổn thương.

THÔNG TIN BỆNH NHÂN:
- Chẩn đoán sơ bộ: ${aiResult.title}
- Danh mục: ${aiResult.category}
- Mức độ urgency: ${aiResult.urgency}

VÙNG TỔN THƯƠNG TRÊN HEATMAP:
${aiResult.annotations?.map((a, i) => `${i+1}. ${a.label} (mức độ: ${a.severity === 'high' ? 'NGHIÊM TRỌNG' : a.severity === 'medium' ? 'TRUNG BÌNH' : 'NHẸ'})`).join('\n') || 'Không có thông tin vùng tổn thương cụ thể'}

YÊU CẦU:
1. Đưa ra lời khuyên chi tiết khi SOI HEATMAP vào vùng tổn thương
2. Giải thích ý nghĩa của màu sắc heatmap (đỏ = nguy hiểm, vàng = cảnh báo, xanh = bình thường)
3. Đề xuất cách theo dõi tại nhà
4. Cảnh báo dấu hiệu cần đi khám ngay
5. Lời khuyên về dinh dưỡng và sinh hoạt

Trả lời ngắn gọn, súc tích, dễ hiểu cho phụ huynh học sinh.`
          }]
        }),
      });
      const data = await response.json();
      setHeatmapAnalysis(data.reply || 'Không thể phân tích heatmap. Vui lòng thử lại.');
    } catch (e) {
      console.error('Heatmap analysis error:', e);
      setHeatmapAnalysis('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setHeatmapAnalyzing(false);
    }
  };

  // ── Segmentation Canvas Drawing ──────────────────────────────
  const drawSegmentation = () => {
    const canvas = segmentationCanvasRef.current;
    const container = imageContainerRef.current;
    if (!canvas || !container || !selectedImage) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (contourPoints.length < 2) return;

    // Draw filled contour
    ctx.beginPath();
    ctx.moveTo(contourPoints[0].x, contourPoints[0].y);
    for (let i = 1; i < contourPoints.length; i++) {
      ctx.lineTo(contourPoints[i].x, contourPoints[i].y);
    }
    ctx.closePath();

    // Fill with semi-transparent overlay
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fill();

    // Draw contour line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw points
    contourPoints.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#22c55e' : '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const handleSegmentationMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = segmentationCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setContourPoints([{ x, y }]);
    setSegmentationAdvice(null);
  };

  const handleSegmentationMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = segmentationCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setContourPoints(prev => [...prev, { x, y }]);
    drawSegmentation();
  };

  const handleSegmentationMouseUp = () => {
    if (isDrawing && contourPoints.length > 5) {
      analyzeContour();
    }
    setIsDrawing(false);
  };

  const clearContour = () => {
    setContourPoints([]);
    setSegmentationAdvice(null);
    drawSegmentation();
  };

  const analyzeContour = async () => {
    if (contourPoints.length < 5) return;
    setHeatmapAnalyzing(true);
    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Bạn là bác sĩ da liễu Việt Nam. Phân tích vùng tổn thương được vẽ contour trên ảnh.

THÔNG TIN:
- Số điểm contour: ${contourPoints.length} điểm
- Kích thước vùng: Đã xác định khoảng ${contourPoints.length * 10} điểm ảnh
- Chẩn đoán sơ bộ: ${aiResult?.title || 'Chưa xác định'}
- Danh mục: ${aiResult?.category || 'Chưa xác định'}

YÊU CẦU phân tích vùng contour:
1. Đánh giá đặc điểm vùng tổn thương (màu sắc, kích thước, hình dạng)
2. Mức độ nghiêm trọng của vùng được khoanh
3. So sánh với các bệnh lý trong môi trường học đường
4. Lời khuyên cụ thể cho phụ huynh
5. Hành động cần thiết ngay

Trả lời súc tích, 3-5 bullet points.`
          }]
        }),
      });
      const data = await response.json();
      setSegmentationAdvice(data.reply || 'Không thể phân tích vùng contour.');
    } catch (e) {
      console.error('Contour analysis error:', e);
      setSegmentationAdvice('Lỗi kết nối.');
    } finally {
      setHeatmapAnalyzing(false);
    }
  };

  // ── Export Report ────────────────────────────────────────────
  const exportReport = async (format: 'pdf' | 'image') => {
    const resultPanel = document.getElementById('ai-result-panel');
    if (!resultPanel || !selectedImage) {
      alert('Không có dữ liệu để xuất.');
      return;
    }

    try {
      // Create composite image with image + heatmap overlay
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const container = imageContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw base image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = selectedImage;
      });
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw heatmap overlay if visible
      if (showHeatmap && aiResult?.annotations?.length) {
        ctx.globalAlpha = 0.5;
        aiResult.annotations.forEach((ann: any) => {
          const x = ann.x * canvas.width;
          const y = ann.y * canvas.height;
          const w = ann.w * canvas.width;
          const h = ann.h * canvas.height;
          const colors: Record<string, string> = {
            high: 'rgba(220, 38, 38, 0.6)',
            medium: 'rgba(249, 115, 22, 0.5)',
            low: 'rgba(234, 179, 8, 0.4)'
          };
          ctx.fillStyle = colors[ann.severity] || colors.medium;
          ctx.fillRect(x, y, w, h);
          ctx.strokeStyle = colors[ann.severity] || colors.medium;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, w, h);
        });
        ctx.globalAlpha = 1;
      }

      // Draw contour if exists
      if (contourPoints.length > 2) {
        ctx.beginPath();
        ctx.moveTo(contourPoints[0].x, contourPoints[0].y);
        for (let i = 1; i < contourPoints.length; i++) {
          ctx.lineTo(contourPoints[i].x, contourPoints[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        ctx.stroke();
      }

      if (format === 'image') {
        // Download as PNG
        const link = document.createElement('a');
        link.download = `eduhealth-report-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else {
        // Export as simple PDF using canvas + text
        const pdfCanvas = document.createElement('canvas');
        const pdfCtx = pdfCanvas.getContext('2d')!;
        const reportWidth = 800;
        const reportHeight = 1200;
        pdfCanvas.width = reportWidth;
        pdfCanvas.height = reportHeight;

        // Background
        pdfCtx.fillStyle = '#ffffff';
        pdfCtx.fillRect(0, 0, reportWidth, reportHeight);

        // Header
        pdfCtx.fillStyle = '#1e40af';
        pdfCtx.fillRect(0, 0, reportWidth, 80);
        pdfCtx.fillStyle = '#ffffff';
        pdfCtx.font = 'bold 24px sans-serif';
        pdfCtx.fillText('EduHealth AI - Báo Cáo Sàng Lọc', 30, 50);

        // Image
        const imgY = 100;
        const imgH = 400;
        pdfCtx.drawImage(canvas, 30, imgY, reportWidth - 60, imgH);

        // Diagnosis info
        let yPos = imgY + imgH + 30;
        pdfCtx.fillStyle = '#1e293b';
        pdfCtx.font = 'bold 18px sans-serif';
        pdfCtx.fillText(`Chẩn đoán: ${aiResult?.title || 'N/A'}`, 30, yPos);
        yPos += 30;

        pdfCtx.font = 'bold 14px sans-serif';
        pdfCtx.fillStyle = '#dc2626';
        pdfCtx.fillText(`Mức độ: ${aiResult?.urgency || 'N/A'}`, 30, yPos);
        yPos += 40;

        // Annotations
        if (aiResult?.annotations?.length) {
          pdfCtx.font = 'bold 14px sans-serif';
          pdfCtx.fillStyle = '#1e293b';
          pdfCtx.fillText('Vùng tổn thương được phát hiện:', 30, yPos);
          yPos += 25;
          aiResult.annotations.forEach((ann: any, i: number) => {
            pdfCtx.font = '12px sans-serif';
            pdfCtx.fillStyle = '#475569';
            pdfCtx.fillText(`${i+1}. ${ann.label} - Mức: ${ann.severity}`, 50, yPos);
            yPos += 20;
          });
        }

        // Advice
        if (aiResult?.safetyAdvice?.length) {
          yPos += 20;
          pdfCtx.font = 'bold 14px sans-serif';
          pdfCtx.fillStyle = '#1e293b';
          pdfCtx.fillText('Khuyến nghị:', 30, yPos);
          yPos += 25;
          aiResult.safetyAdvice.forEach((advice: string, i: number) => {
            pdfCtx.font = '12px sans-serif';
            pdfCtx.fillStyle = '#475569';
            pdfCtx.fillText(`• ${advice}`, 50, yPos);
            yPos += 20;
          });
        }

        // Footer
        pdfCtx.fillStyle = '#94a3b8';
        pdfCtx.font = '10px sans-serif';
        pdfCtx.fillText(`Generated by EduHealth AI - ${new Date().toLocaleDateString('vi-VN')}`, 30, reportHeight - 30);

        // Download PDF
        const link = document.createElement('a');
        link.download = `eduhealth-report-${Date.now()}.png`;
        link.href = pdfCanvas.toDataURL('image/png');
        link.click();
      }
    } catch (e) {
      console.error('Export error:', e);
      alert('Lỗi khi xuất báo cáo. Vui lòng thử lại.');
    }
  };

  // Redraw segmentation when points change
  useEffect(() => {
    if (showSegmentation && contourPoints.length > 0) {
      drawSegmentation();
    }
  }, [showSegmentation, contourPoints]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 font-sans pb-24 selection:bg-blue-100 overflow-x-hidden relative">
      <style>{`
        @keyframes pulse-red {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .animate-pulse-red { animation: pulse-red 2s infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-gradient-to-br {
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1));
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-shape:nth-child(3) {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .floating-shape:nth-child(4) {
          width: 70px;
          height: 70px;
          bottom: 10%;
          right: 10%;
          animation-delay: 1s;
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>

      {/* Safety Banner */}
      <div className="bg-blue-900 text-white text-[9px] text-center py-2 font-bold uppercase tracking-[0.2em] px-4">
        Hỗ trợ giáo dục & Sàng lọc sức khỏe học đường - Không thay thế chẩn đoán y khoa chuyên nghiệp
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 transition-all shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-200 rotate-[-5deg] hover:rotate-0 transition-transform cursor-pointer">
              <HeartPulse className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter leading-none">EduHealth AI</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dự án được thực hiện bởi đội 43TPU_Powershell and CMD với đề tài Giáo dục chăm sóc sức khỏe con người</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase">Hệ thống sẵn sàng</span>
             </div>
             <button
               onClick={() => setShowChat(true)}
               className="group relative p-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:scale-110 animate-bounce"
               style={{ animation: 'bounce 2s infinite' }}
             >
               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
               <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className="relative z-10">
                 <MessageSquare size={24} className="text-white drop-shadow-lg" />
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
               </div>
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl opacity-30 group-hover:opacity-60 blur-sm animate-pulse"></div>
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* TAB SWITCHER */}
        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
          {(['healbook', 'aiscan', 'findcare'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMapMode('idle');
              }}
              className={`flex items-center gap-4 px-8 py-5 rounded-3xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-lg border-2 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white border-blue-700 shadow-blue-200 scale-105'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-blue-300 hover:shadow-blue-100'
              }`}
            >
              {tab === 'healbook' && <BookOpen size={20} />}
              {tab === 'aiscan' && <Zap size={20} />}
              {tab === 'findcare' && <MapPin size={20} />}
              {tab === 'healbook' ? 'Thư viện' : tab === 'aiscan' ? 'AI Sàng lọc' : 'Cơ sở Y tế'}
            </button>
          ))}
        </div>

        {/* TAB: HEALBOOK */}
        {activeTab === 'healbook' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8 space-y-4">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
                <Activity className="text-blue-600" size={32} /> Bản tin sức khỏe học đường
              </h2>
              <p className="text-slate-500 text-base max-w-3xl font-medium leading-relaxed">
                Bách khoa toàn thư thu nhỏ dành cho học sinh và phụ huynh. Cung cấp thông tin chuẩn xác về các dấu hiệu, cách phòng tránh lây lan trong môi trường học tập.
              </p>
            </div>

            {/* ── WEEKLY TRENDS BANNER ── */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-orange-500" />
                <span className="text-xs font-black uppercase tracking-widest text-orange-500">Bản tin sức khỏe học đường</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {WEEKLY_TRENDS.map((trend) => {
                  const alertBg: Record<string, string> = {
                    hot: 'bg-red-50 border-red-200 hover:border-red-400',
                    warn: 'bg-orange-50 border-orange-200 hover:border-orange-400',
                    info: 'bg-blue-50 border-blue-200 hover:border-blue-400',
                  };
                  const alertDot: Record<string, string> = {
                    hot: 'bg-red-500',
                    warn: 'bg-orange-500',
                    info: 'bg-blue-500',
                  };
                  const alertBadge: Record<string, string> = {
                    hot: 'bg-red-500 text-white',
                    warn: 'bg-orange-500 text-white',
                    info: 'bg-blue-500 text-white',
                  };
                  return (
                    <div
                      key={trend.id}
                      onClick={() => {
                        const topic = HEALBOOK_DATA.find(t => t.id === trend.relatedTopicId);
                        if (topic) handleOpenDetail(topic);
                      }}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${alertBg[trend.alertLevel]}`}
                    >
                      {/* Header row */}
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl leading-none shrink-0">{trend.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block w-2 h-2 rounded-full ${alertDot[trend.alertLevel]} animate-pulse`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${alertBadge[trend.alertLevel]}`}>
                              {trend.alertLevel === 'hot' ? '🔥 Nóng' : trend.alertLevel === 'warn' ? '⚠️ Cảnh báo' : 'ℹ️ Thông tin'}
                            </span>
                          </div>
                          <h4 className="font-black text-slate-800 text-sm leading-tight">{trend.title}</h4>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{trend.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search bar */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-40 transition-opacity pointer-events-none" />
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={24} />
              <input
                type="text"
                placeholder="Tìm bệnh lý, dấu hiệu hoặc cách xử trí..."
                className="w-full pl-16 pr-8 py-6 bg-white rounded-[2rem] border-2 border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none shadow-lg text-base font-medium transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500'
                }`}
              >
                Tất cả ({HEALBOOK_DATA.length})
              </button>
              {allCategories.map(cat => {
                const colors = CATEGORY_COLORS[cat];
                const count = HEALBOOK_DATA.filter(t => t.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(isActive ? '' : cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-all duration-300 ${
                      isActive
                        ? `${colors.bg} ${colors.chip} border-transparent shadow-lg scale-105`
                        : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Results count */}
            {selectedCategory && (
              <p className="mb-4 text-sm font-medium text-slate-400">
                Hiển thị <span className="text-blue-600 font-black">{filteredHealbook.length}</span> bài trong danh mục{' '}
                <span className="text-slate-700 font-black">{selectedCategory}</span>
              </p>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHealbook.map((topic) => {
                const colors = CATEGORY_COLORS[topic.category];
                return (
                  <div
                    key={topic.id}
                    onClick={() => handleOpenDetail(topic)}
                    className={`bg-white rounded-[1.5rem] border ${colors.border} ${colors.hover} shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden hover:-translate-y-1.5`}
                  >
                    {/* Disease image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={topic.educationalImages[0]?.url}
                        alt={topic.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className={`absolute top-3 left-3 ${colors.chip} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                        {topic.category}
                      </div>
                      {topic.educationalImages.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                          <Eye size={10} /> {topic.educationalImages.length}
                        </div>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className={`text-lg font-black ${colors.text} leading-tight mb-2 group-hover:underline underline-offset-2`}>
                        {topic.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                        {topic.shortDescription}
                      </p>

                      {topic.dangerSigns[0] && (
                        <div className={`flex items-start gap-2 p-3 rounded-xl ${colors.bg} mb-4`}>
                          <AlertTriangle size={12} className={`${colors.text} shrink-0 mt-0.5`} />
                          <p className="text-[11px] text-slate-600 leading-snug line-clamp-1 font-medium">
                            ⚠️ {topic.dangerSigns[0]}
                          </p>
                        </div>
                      )}

                      <div className={`pt-3 border-t ${colors.border} flex items-center justify-between text-xs font-black uppercase tracking-widest ${colors.text}`}>
                        Xem chi tiết <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredHealbook.length === 0 && (
              <div className="text-center py-20 opacity-40">
                <Activity size={64} className="mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-black text-slate-400">Không tìm thấy bài viết nào</p>
                <p className="text-sm text-slate-300 mt-2">Thử từ khóa khác hoặc bỏ bộ lọc danh mục</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: AI SCAN */}
        {activeTab === 'aiscan' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-12 text-white relative">
                <div className="absolute right-[-10%] top-[-20%] opacity-10 rotate-12">
                   <Zap size={300} />
                </div>
                <div className="relative z-10 space-y-4">
                  <h2 className="text-4xl font-black flex items-center gap-4"><Camera size={40} /> Sàng lọc AI thông minh</h2>
                  <p className="text-blue-100 text-base max-w-lg font-medium leading-relaxed">Sử dụng sức mạnh của AI Multimodal để phân tích triệu chứng và cung cấp bản đồ nhiệt nhận dạng chuyên sâu.</p>
                </div>
              </div>

              <div className="p-12 grid lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                      <Camera size={16} className="text-blue-600" /> Tải ảnh hoặc chụp trực tiếp
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`aspect-video rounded-[2rem] border-2 border-dashed transition-all relative overflow-hidden group shadow-lg ${selectedImage ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 bg-slate-50'}`}
                    >
                      {selectedImage ? (
                        <div className="w-full h-full relative" ref={imageContainerRef}>
                          <img src={selectedImage} alt="Preview" className="w-full h-full object-cover rounded-[1.8rem]" />

                          {/* Canvas heatmap overlay — draws bounding boxes + gradient */}
                          {showHeatmap && aiResult && (
                            <canvas
                              ref={heatmapCanvasRef}
                              className="absolute inset-0 w-full h-full rounded-[1.8rem] pointer-events-none"
                              style={{ objectFit: 'cover' }}
                            />
                          )}

                          {/* Segmentation Canvas for drawing contours */}
                          <canvas
                            ref={segmentationCanvasRef}
                            className={`absolute inset-0 w-full h-full rounded-[1.8rem] ${showSegmentation ? 'cursor-crosshair' : 'pointer-events-none'}`}
                            style={{ objectFit: 'cover' }}
                            onMouseDown={showSegmentation ? handleSegmentationMouseDown : undefined}
                            onMouseMove={showSegmentation ? handleSegmentationMouseMove : undefined}
                            onMouseUp={showSegmentation ? handleSegmentationMouseUp : undefined}
                            onMouseLeave={showSegmentation ? handleSegmentationMouseUp : undefined}
                          />

                          {/* Annotation legend */}
                          {showHeatmap && aiResult && aiResult.annotations && aiResult.annotations.length > 0 && (
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-slate-100 space-y-1.5 z-10">
                              {aiResult.annotations.map((ann) => (
                                <div key={ann.label} className="flex items-center gap-2 text-[10px] font-bold">
                                  <span className={`w-3 h-3 rounded-sm ${
                                    ann.severity === 'high' ? 'bg-red-500' : ann.severity === 'medium' ? 'bg-orange-400' : 'bg-yellow-400'
                                  }`} />
                                  <span className="text-slate-700">{ann.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Heatmap Analysis Result */}
                          {heatmapAnalysis && (
                            <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-2xl shadow-xl z-20 max-h-48 overflow-y-auto">
                              <div className="flex items-center gap-2 mb-2">
                                <Layers size={16} />
                                <span className="font-black text-xs uppercase">Phân tích Heatmap</span>
                              </div>
                              <p className="text-xs leading-relaxed whitespace-pre-wrap">{heatmapAnalysis}</p>
                              <button onClick={() => setHeatmapAnalysis(null)} className="mt-2 text-white/80 hover:text-white text-[10px]">
                                Đóng
                              </button>
                            </div>
                          )}

                          {/* Segmentation Advice */}
                          {segmentationAdvice && (
                            <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-xl z-20 max-h-48 overflow-y-auto">
                              <div className="flex items-center gap-2 mb-2">
                                <PenTool size={16} />
                                <span className="font-black text-xs uppercase">Phân tích vùng Contour</span>
                              </div>
                              <p className="text-xs leading-relaxed whitespace-pre-wrap">{segmentationAdvice}</p>
                              <button onClick={() => setSegmentationAdvice(null)} className="mt-2 text-white/80 hover:text-white text-[10px]">
                                Đóng
                              </button>
                            </div>
                          )}

                          {/* Tool buttons bar */}
                          {selectedImage && (
                            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                              {/* Toggle Heatmap */}
                              <button
                                onClick={(e) => { e.stopPropagation(); setShowHeatmap(!showHeatmap); }}
                                className={`p-3 rounded-xl shadow-lg transition-all ${showHeatmap ? 'bg-blue-600 text-white' : 'bg-white/90 text-blue-600 hover:bg-white'}`}
                                title="Bật/Tắt Heatmap"
                              >
                                <Layers size={20} />
                              </button>

                              {/* Analyze Heatmap */}
                              {aiResult && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); analyzeHeatmap(); }}
                                  disabled={heatmapAnalyzing}
                                  className="p-3 rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-xl transition-all disabled:opacity-50"
                                  title="Phân tích Heatmap"
                                >
                                  {heatmapAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Eye size={20} />}
                                </button>
                              )}

                              {/* Segmentation Mode */}
                              <button
                                onClick={(e) => { e.stopPropagation(); setShowSegmentation(!showSegmentation); }}
                                className={`p-3 rounded-xl shadow-lg transition-all ${showSegmentation ? 'bg-purple-600 text-white' : 'bg-white/90 text-purple-600 hover:bg-white'}`}
                                title="Chế độ vẽ Contour"
                              >
                                <PenTool size={20} />
                              </button>

                              {/* Clear Contour */}
                              {contourPoints.length > 0 && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); clearContour(); }}
                                  className="p-3 rounded-xl shadow-lg bg-white/90 text-red-600 hover:bg-white transition-all"
                                  title="Xóa Contour"
                                >
                                  <Trash2 size={20} />
                                </button>
                              )}

                              {/* Export Report */}
                              {aiResult && (
                                <div className="relative group/export">
                                  <button
                                    className="p-3 rounded-xl shadow-lg bg-white/90 text-green-600 hover:bg-white transition-all"
                                    title="Xuất Report"
                                  >
                                    <Download size={20} />
                                  </button>
                                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover/export:block">
                                    <div className="bg-white rounded-xl shadow-xl p-2 space-y-1 min-w-[140px]">
                                      <button
                                        onClick={(e) => { e.stopPropagation(); exportReport('image'); }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg"
                                      >
                                        <ImageIcon size={14} /> Xuất hình ảnh PNG
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); exportReport('pdf'); }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg"
                                      >
                                        <FileText size={14} /> Xuất PDF Report
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Segmentation instructions */}
                          {showSegmentation && (
                            <div className="absolute top-4 right-4 bg-purple-600/90 text-white px-4 py-2 rounded-xl text-xs font-bold z-10">
                              <span className="flex items-center gap-2">
                                <PenTool size={14} />
                                Đang ở chế độ vẽ contour - Click và kéo để khoanh vùng
                              </span>
                            </div>
                          )}

                          {/* Hover overlay buttons */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                             <button onClick={(e) => {e.stopPropagation(); setSelectedImage(null); setAiResult(null); setShowHeatmap(false); setShowSegmentation(false); setHeatmapAnalysis(null); setSegmentationAdvice(null); setContourPoints([]);}} className="bg-white/90 p-4 rounded-full text-red-600 hover:bg-white shadow-lg"><X size={24}/></button>
                             <button onClick={(e) => {e.stopPropagation(); fileInputRef.current?.click();}} className="bg-white/90 p-4 rounded-full text-blue-600 hover:bg-white shadow-lg"><RefreshCcw size={24}/></button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-10">
                          <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                             <Upload size={32} />
                          </div>
                          <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Bấm để chọn ảnh</p>
                          <p className="text-xs text-slate-400 mt-3 font-medium italic max-w-sm">Ưu tiên ảnh đủ sáng, chụp trực diện vùng tổn thương</p>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSelectedImage(reader.result as string);
                          setAiResult(null);
                          setShowHeatmap(false);
                          setShowSegmentation(false);
                          setHeatmapAnalysis(null);
                          setSegmentationAdvice(null);
                          setContourPoints([]);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>

                  <div className="space-y-6">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                       <FileText size={16} className="text-blue-600" /> Mô tả cảm giác lâm sàng
                    </label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Mô tả cụ thể cảm giác (đau nhức, ngứa châm chích), tiền sử dị ứng hoặc nhiệt độ cơ thể hiện tại..."
                      className="w-full h-48 p-8 rounded-[2rem] border-2 border-slate-200 outline-none text-base font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none shadow-inner bg-slate-50/30"
                    />
                  </div>

                  <button
                    onClick={callAI}
                    disabled={loading || (!inputText && !selectedImage)}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-8 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 hover:shadow-blue-300 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
                  >
                    {loading ? <Loader2 className="animate-spin" size={28} /> : <Zap size={28} />}
                    {loading ? 'Hệ thống đang phân tích...' : 'Tiến hành sàng lọc thông minh'}
                  </button>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-[3rem] border border-slate-100 p-12 flex flex-col shadow-inner">
                  {aiResult ? (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8 h-full">
                      {/* Header: urgency badge + title */}
                      <div className="flex flex-col gap-6">
                        <div className={`p-5 rounded-2xl border-2 flex items-center gap-4 shadow-lg flex-wrap ${
                          aiResult.urgency === UrgencyLevel.URGENT_DOCTOR
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : aiResult.urgency === UrgencyLevel.SEE_SCHOOL_HEALTH
                            ? 'bg-orange-50 text-orange-700 border-orange-200'
                            : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          <div className="flex items-center gap-3">
                            <AlertTriangle size={24} />
                            <span className="text-xs font-black uppercase tracking-widest">{aiResult.urgency}</span>
                          </div>
                          {aiResult.annotations && aiResult.annotations.length > 0 && (
                            <div className="flex gap-2 ml-auto flex-wrap">
                              <button
                                onClick={() => setShowHeatmap(!showHeatmap)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all shadow-lg ${
                                  showHeatmap ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <Eye size={14} />
                                  {showHeatmap ? 'Ẩn vùng tổn thương' : 'Xem vùng tổn thương'}
                                </span>
                              </button>
                              <button
                                onClick={() => setShowDetailedHeatmap(true)}
                                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all shadow-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:shadow-xl"
                              >
                                <span className="flex items-center gap-2">
                                  <Layers size={14} />
                                  Xem chi tiết bản đồ nhiệt
                                </span>
                              </button>
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 leading-tight">{aiResult.title}</h3>
                        {aiResult.category && (
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest w-fit">
                            {aiResult.category}
                          </span>
                        )}
                      </div>

                      {/* Scrollable content */}
                      <div className="space-y-5 flex-1 overflow-y-auto pr-2 no-scrollbar">

                        {/* Dấu hiệu nguy hiểm */}
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                          <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity size={14} /> Dấu hiệu nguy hiểm — Cần đi khám ngay
                          </p>
                          <ul className="text-xs text-slate-700 space-y-2.5">
                            {aiResult.dangerSigns.map((d, i) => (
                              <li key={i} className="flex gap-3 items-start">
                                <span className="w-5 h-5 bg-red-100 text-red-600 rounded flex items-center justify-center shrink-0 font-bold mt-0.5">!</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Nguyên nhân */}
                        {aiResult.causes && aiResult.causes.length > 0 && (
                          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
                            <p className="text-[11px] font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Info size={14} /> Nguyên nhân có thể gây ra
                            </p>
                            <ul className="text-xs text-amber-900/80 space-y-2.5">
                              {aiResult.causes.map((c, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                  <span className="w-5 h-5 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">{i+1}</span>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Phân tích chuyên sâu */}
                        <div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Phân tích chuyên sâu của AI</p>
                          <ul className="text-xs text-slate-600 space-y-3">
                            {aiResult.analysis.map((a, i) => (
                              <li key={i} className="flex gap-4 items-start">
                                <CheckCircle size={15} className="text-blue-400 shrink-0 mt-0.5" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Khuyến nghị */}
                        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                          <p className="text-[11px] font-black text-indigo-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ShieldCheck size={16} /> Khuyến nghị từ EduHealth
                          </p>
                          <ul className="text-xs text-indigo-900/80 space-y-2.5 font-medium">
                            {aiResult.safetyAdvice.map((s, i) => (
                              <li key={i} className="flex gap-4 items-start">
                                <span className="w-5 h-5 bg-white text-indigo-600 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">{i+1}</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-5 border-t border-slate-200">
                        <button
                          onClick={() => setActiveTab('findcare')}
                          className="w-full bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                        >
                          <MapPin size={18} className="text-indigo-600" /> Tìm cơ sở y tế gần nhất
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30">
                      <div className="bg-white w-28 h-28 rounded-full flex items-center justify-center shadow-xl mb-8">
                        <Stethoscope size={56} className="text-slate-300" />
                      </div>
                      <h4 className="text-lg font-black text-slate-500 uppercase tracking-tighter">Đang chờ dữ liệu đầu vào</h4>
                      <p className="text-xs text-slate-400 mt-4 max-w-[250px] leading-relaxed font-medium">Cung cấp hình ảnh hoặc mô tả triệu chứng để EduHealth AI bắt đầu quy trình sàng lọc kỹ thuật số.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FIND CARE (MAPS) */}
        {activeTab === 'findcare' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-4">
                  <MapIcon className="text-blue-600" size={36} /> Tìm nơi Chăm sóc
               </h2>
               <p className="text-slate-500 text-base max-w-lg mx-auto font-medium leading-relaxed">Dựa trên vị trí của bạn, chúng tôi đề xuất các cơ sở y tế và nhà thuốc uy tín trong khu vực lân cận.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <button
                onClick={() => handleFindCare('hospital')}
                className={`flex flex-col items-center gap-8 p-12 rounded-[3rem] border-2 transition-all group shadow-lg ${mapMode === 'hospital' ? 'border-red-500 bg-red-50 shadow-xl shadow-red-100' : 'border-slate-200 bg-white hover:border-red-300 hover:shadow-red-100'}`}
              >
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all shadow-lg ${mapMode === 'hospital' ? 'bg-red-500 text-white animate-pulse-red' : 'bg-red-50 text-red-500 group-hover:scale-110'}`}>
                   <Hospital size={40} />
                </div>
                <div className="text-center">
                  <span className="font-black uppercase tracking-widest text-sm block mb-2">Bệnh viện & Phòng khám</span>
                  <p className="text-xs font-bold text-slate-400">Ưu tiên cấp cứu & chuyên khoa</p>
                </div>
              </button>

              <button
                onClick={() => handleFindCare('pharmacy')}
                className={`flex flex-col items-center gap-8 p-12 rounded-[3rem] border-2 transition-all group shadow-lg ${mapMode === 'pharmacy' ? 'border-emerald-500 bg-emerald-50 shadow-xl shadow-emerald-100' : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-emerald-100'}`}
              >
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all shadow-lg ${mapMode === 'pharmacy' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-500 group-hover:scale-110'}`}>
                   <ShoppingCart size={40} />
                </div>
                <div className="text-center">
                  <span className="font-black uppercase tracking-widest text-sm block mb-2">Nhà thuốc & Hiệu thuốc</span>
                  <p className="text-xs font-bold text-slate-400">Vật tư y tế & Thuốc không kê đơn</p>
                </div>
              </button>
            </div>

            {mapMode !== 'idle' && (
               <div className="bg-white rounded-[3rem] p-2 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-500 overflow-hidden">
                  <div className="h-[500px] w-full relative bg-slate-100 rounded-[2.8rem] overflow-hidden" ref={mapContainerRef}>
                     <div id="map" className="w-full h-full" />

                     <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-[10] pointer-events-none">
                        <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-3xl shadow-2xl border border-slate-100 text-sm font-black uppercase tracking-widest text-slate-600 flex items-center gap-3">
                           <Users size={16} className="text-blue-600" /> Phát hiện {mapMode === 'hospital' ? '4 bệnh viện' : '5 nhà thuốc'} lân cận
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleFindCare(mapMode as any); }}
                          className="bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-slate-100 pointer-events-auto hover:bg-white active:scale-95 transition-all text-blue-600"
                        >
                           <RefreshCcw size={20} />
                        </button>
                     </div>

                     <div className="absolute bottom-8 left-8 right-8 z-[10]">
                        <button
                           onClick={() => window.open(`https://www.google.com/maps/search/${mapMode === 'hospital' ? 'bệnh+viện' : 'nhà+thuốc'}/@${location?.lat || 21.0},${location?.lng || 105.8},14z`, '_blank')}
                           className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl hover:shadow-blue-300 transition-all active:scale-[0.98] pointer-events-auto flex items-center justify-center gap-4"
                        >
                           <ExternalLink size={20} /> Mở bản đồ trực tuyến chuyên sâu
                        </button>
                     </div>
                  </div>
               </div>
            )}
          </div>
        )}

        {/* MODAL HEALBOOK DETAIL */}
        {selectedTopic && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedTopic(null)} />
             <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
                   <div className="flex items-center gap-4">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{selectedTopic.category}</span>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">{selectedTopic.title}</h3>
                   </div>
                   <button onClick={() => setSelectedTopic(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400"><X size={28} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar bg-white">
                   <div className="space-y-4">
                      <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                         <img src={selectedTopic.educationalImages[0].url} alt={selectedTopic.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[11px] text-slate-500 text-center font-medium italic px-4">"{selectedTopic.educationalImages[0].caption}"</p>
                   </div>

                   <section className="space-y-4">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <Info size={22} />
                        <h4 className="font-black text-sm uppercase tracking-widest">Mô tả tình trạng</h4>
                      </div>
                      <p className="text-sm text-slate-600 leading-[1.7] font-medium">{selectedTopic.shortDescription}</p>
                   </section>

                   <section className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 space-y-4">
                      <div className="flex items-center gap-3 text-indigo-800">
                        <School size={22} />
                        <h4 className="font-black text-sm uppercase tracking-widest">Tình huống lây truyền tại trường</h4>
                      </div>
                      <p className="text-xs text-indigo-900/80 leading-relaxed italic font-medium">{selectedTopic.schoolContext}</p>
                   </section>

                   <section className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 space-y-5">
                      <div className="flex items-center gap-3 text-red-600">
                        <AlertTriangle size={24} />
                        <h4 className="font-black text-sm uppercase tracking-widest">Dấu hiệu cần can thiệp y tế ngay</h4>
                      </div>
                      <ul className="space-y-3">
                        {selectedTopic.dangerSigns.map((s, i) => (
                          <li key={i} className="flex gap-4 text-xs text-red-900/90 font-bold items-start">
                             <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" /> {s}
                          </li>
                        ))}
                      </ul>
                   </section>

                   <section className="space-y-5">
                      <div className="flex items-center gap-3 text-emerald-600">
                        <ShieldCheck size={22} />
                        <h4 className="font-black text-sm uppercase tracking-widest">Hướng dẫn xử trí & Chăm sóc</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedTopic.safeActions.map((a, i) => (
                          <div key={i} className="flex gap-4 text-xs text-slate-600 bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0">{i+1}</span> {a}
                          </div>
                        ))}
                      </div>
                   </section>

                   <section className="pt-8 border-t border-slate-100 space-y-4">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Thông tin tham khảo mở rộng</p>
                      <div className="flex flex-wrap gap-4">
                        {selectedTopic.references.map((r, i) => (
                          <a key={i} href={r.url} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl transition-all border border-indigo-100">
                            <ExternalLink size={14} /> {r.title}
                          </a>
                        ))}
                      </div>
                   </section>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                   <button 
                      onClick={() => handleUseTopicFromModal(selectedTopic)}
                      className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                   >
                      <Camera size={20} /> Phân tích triệu chứng bằng AI
                   </button>
                   <button onClick={() => setSelectedTopic(null)} className="sm:w-32 bg-white border border-slate-200 text-slate-500 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all">Đóng</button>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* CHATBOT GUIDED UI */}
      {showChat && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[450px] sm:h-[680px] bg-white sm:rounded-[3rem] shadow-2xl border border-slate-100 z-[60] flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-500 backdrop-blur-xl">
          <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl shadow-lg backdrop-blur-sm">
                  <MessageSquare size={24} />
                </div>
                <div>
                   <h4 className="font-black text-lg leading-tight">Cố vấn EduHealth</h4>
                   <p className="text-xs font-bold uppercase tracking-widest opacity-80">Luôn sẵn sàng hỗ trợ 24/7</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-3 rounded-2xl transition-all duration-200 backdrop-blur-sm">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-slate-50/80 to-white no-scrollbar">
             {!userRole ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <div className="text-center space-y-4 mb-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-blue-200">
                        <HeartPulse size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-black text-slate-800">Chào bạn! 👋</h3>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">Rất vui được gặp bạn. Tôi là trợ lý EduHealth AI, chuyên hỗ trợ sức khỏe học đường.</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vui lòng chọn vai trò để tôi hỗ trợ tốt nhất</p>
                   </div>
                   {(['Học sinh', 'Phụ huynh', 'Cán bộ y tế'] as UserRole[]).map(r => (
                      <button
                        key={r}
                        onClick={() => setUserRole(r)}
                        className="w-full bg-white border-2 border-slate-200 p-6 rounded-3xl text-base font-black text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group shadow-lg"
                      >
                         <span className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                             {r === 'Học sinh' ? '🎓' : r === 'Phụ huynh' ? '👨‍👩‍👧‍👦' : '🏥'}
                           </div>
                           {r}
                         </span>
                         <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                   ))}
                </div>
             ) : (
                <>
                  <div className="flex justify-start animate-in slide-in-from-left-4 duration-300">
                    <div className="max-w-[85%] p-6 rounded-3xl rounded-tl-md text-sm shadow-lg bg-gradient-to-r from-blue-50 to-teal-50 text-slate-700 border border-blue-100 font-medium leading-relaxed">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                           <span className="text-xs text-white font-bold">AI</span>
                         </div>
                         <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">EduHealth AI</span>
                       </div>
                       Chào {userRole}! Tôi là EduHealth AI. Bạn cần tra cứu thông tin hay tư vấn về tình trạng sức khỏe học đường nào?
                    </div>
                  </div>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${msg.role === 'user' ? 'right' : 'left'}-4 duration-300`}>
                      <div className={`max-w-[85%] p-5 rounded-3xl text-sm shadow-lg whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-br-md'
                          : 'bg-white text-slate-700 border border-slate-100 rounded-bl-md'
                      }`}>
                        {msg.role === 'user' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-xs text-blue-600 font-bold">Bạn</span>
                            </div>
                          </div>
                        )}
                        {msg.content ?? msg.text}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                       <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Loader2 size={20} className="animate-spin text-blue-600" />
                          </div>
                          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Đang trả lời...</span>
                       </div>
                    </div>
                  )}
                </>
             )}
          </div>

          <div className="p-8 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100 flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={!userRole || chatLoading}
                placeholder="Nhập tin nhắn của bạn..."
                className="w-full bg-white rounded-3xl px-8 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-lg border-2 border-slate-200 disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    callChat(chatInput.trim());
                    setChatInput('');
                  }
                }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <MessageSquare size={18} />
              </div>
            </div>
            <button
              disabled={!userRole || chatLoading || !chatInput.trim()}
              onClick={() => { if (chatInput.trim()) { callChat(chatInput.trim()); setChatInput(''); } }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-5 rounded-3xl shadow-xl shadow-blue-200 hover:shadow-blue-300 disabled:opacity-50 transition-all active:scale-95"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      )}

      {/* FOOTER NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-8 py-4 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button onClick={() => {setActiveTab('healbook'); setSelectedTopic(null);}} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'healbook' ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-400'}`}>
            <BookOpen size={22} className={activeTab === 'healbook' ? 'fill-indigo-50' : ''} />
            <span className="text-[9px] font-black uppercase tracking-widest">Thư viện</span>
          </button>
          <div className="w-16 h-16 bg-white rounded-full -mt-12 shadow-xl border border-slate-100 flex items-center justify-center">
             <button onClick={() => {setActiveTab('aiscan'); setSelectedTopic(null);}} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'aiscan' ? 'bg-indigo-600 text-white rotate-0 shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400 rotate-12'}`}>
               <Zap size={24} />
             </button>
          </div>
          <button onClick={() => {setActiveTab('findcare'); setSelectedTopic(null);}} className={`flex flex-col items-center gap-1.5 p-2 transition-all ${activeTab === 'findcare' ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-400'}`}>
            <MapPin size={22} className={activeTab === 'findcare' ? 'fill-indigo-50' : ''} />
            <span className="text-[9px] font-black uppercase tracking-widest">Vị trí</span>
          </button>
        </div>
      </nav>

      {/* Detailed Heatmap Modal */}
      {showDetailedHeatmap && selectedImage && aiResult && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black">Heatmap giải thích</h3>
                <p className="text-white/80 text-xs mt-1">Vùng màu đỏ cam là nơi AI tập trung phân tích</p>
              </div>
              <button
                onClick={() => setShowDetailedHeatmap(false)}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border-b border-red-100 p-4">
              <p className="text-red-700 text-xs font-medium leading-relaxed">
                <span className="font-black">Lưu ý quan trọng:</span> Derm4 là chỉ số nhầm lẫn trong việc chẩn đoán. Vui lòng tham khảo ý kiến bác sĩ để có chẩn đoán chính xác. Với bản có chuyển mới về Da. Hãy kiểm tra tất cả các trạng thái bệnh bằng các biện pháp y khoa chuẩn. Derm4 chỉ có khả năng hỗ trợ để đoán tương đối chính xác.
              </p>
            </div>

            {/* View Mode Tabs */}
            <div className="flex border-b border-slate-100">
              <button
                onClick={() => setHeatmapViewMode('heatmap')}
                className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-widest transition-all ${
                  heatmapViewMode === 'heatmap'
                    ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50/50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                Heatmap
              </button>
              <button
                onClick={() => setHeatmapViewMode('annotation')}
                className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-widest transition-all ${
                  heatmapViewMode === 'annotation'
                    ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50/50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                Xem vùng tổn thương
              </button>
            </div>

            {/* Heatmap Image */}
            <div className="relative p-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={selectedImage}
                  alt="Heatmap analysis"
                  className="w-full aspect-square object-cover"
                />
                {/* Heatmap overlay canvas */}
                <canvas
                  id="detailed-heatmap-canvas"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ objectFit: 'cover' }}
                />
                {/* Annotation overlay canvas (only shown in annotation mode) */}
                <canvas
                  id="detailed-annotation-canvas"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Heatmap legend */}
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <span className="text-xs font-medium text-slate-600">Nghiêm trọng cao</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-400" />
                  <span className="text-xs font-medium text-slate-600">Nghiêm trọng trung bình</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-400" />
                  <span className="text-xs font-medium text-slate-600">Nghiêm trọng thấp</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-medium text-center leading-relaxed">
                  {heatmapViewMode === 'heatmap'
                    ? 'Heatmap hiển thị các vùng mà mô AI tập trung để đưa ra dự đoán. Dữ liệu này chỉ để tham khảo bởi bác sĩ chuyên khoa quyết định y khoa.'
                    : 'Các hộp màu đỏ cam hiển thị vùng tổn thương được AI đánh dấu. Vùng nổi bật càng rõ, mức độ quyết định càng cao.'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => setShowDetailedHeatmap(false)}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-700 font-black text-sm uppercase tracking-widest transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
