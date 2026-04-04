
import React, { useState, useRef, useEffect } from 'react';
import {
  HeartPulse, BookOpen, Camera, MapPin, AlertTriangle, CheckCircle,
  Upload, Send, Loader2, ChevronRight, X, Search, ChevronDown,
  ShoppingCart, Hospital, FileText, Stethoscope,
  School, ChevronLeft, Eye, EyeOff, Layers, Zap,
  Video, PlayCircle, MessageCircle, Sparkles, Plus,
  MessageSquare, ShieldCheck, Bell, TrendingUp, Clock,
  Heart, Star, Newspaper, UserPlus, LogIn, Info,
  Activity as ActivityIcon
} from 'lucide-react';
import { ActivityPost, PostType, AuthorRole } from './types';

// API Base URL
const API_BASE = 'https://eduhealth-proxy-production.up.railway.app';

// ═══════════════════════════════════════════════════════════════
// DỮ LIỆU CẨM NANG THƯ VIỆN SỨC KHỎE HỌC ĐƯỜNG
// Hình ảnh từ Wikimedia Commons (CC BY-SA 4.0)
// ═══════════════════════════════════════════════════════════════
const HEALTH_LIBRARY = [
  // ── MỤN & DA LIỄU ──
  {
    category: 'MỤN & DA LIỄU',
    icon: '🧴',
    color: 'rose',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-600',
    gradient: 'from-rose-500 to-pink-500',
    diseases: [
      {
        id: 'mun-1',
        name: 'Mụn đầu đen / Mụn đầu trắng',
        otherNames: 'Acne Vulgaris',
        description: 'Lỗ chân lông bị kẹt dầu + tế bào chết, tạo thành chấm đen hoặc nốt trắng. Gặp ở ~80% học sinh THPT.',
        causes: 'Hormone testosterone tăng tuổi dậy thì → tuyến bã nhờn hoạt động mạnh → lỗ chân lông bị bít tắc.',
        symptoms: ['Chấm đen nhỏ ở mũi, cằm, trán', 'Nốt trắng li ti hơi sần khi sờ', 'Da đổ dầu nhiều cuối buổi học', 'Lỗ chân lông to, bề mặt da không mịn'],
        schoolContext: 'Đội mũ bảo hiểm/khẩu trang bí cả ngày, học thể dục xong không rửa mặt, hay chống tay lên má, tối về cạy mụn trước gương, stress thi cử làm tăng tiết bã nhờn.',
        treatment: ['NGỪNG: Không nặn, không cạy, không lột mụn liên tục. Dừng đổi skincare lung tung.', 'RỬA: Rửa mặt nhẹ nhàng tối đa 2 lần/ngày và sau khi đổ mồ hôi – dùng sữa rửa mặt dịu nhẹ (pH 5.5).', 'DỊU: Kem/sữa dưỡng ẩm không gây bít tắc (oil-free). Tránh scrub hoặc chà khăn mạnh.', 'KHÁM: Nếu mụn viêm, kéo dài >4 tuần hoặc có nguy cơ sẹo → đến da liễu.'],
        dangerSigns: ['Mụn ngày càng dày, lan xuống lưng/ngực', 'Để lại nhiều thâm, sẹo lõm rõ', 'Tự ti rõ rệt, bỏ giao tiếp, bỏ ăn'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/0601_Acne_Vulgaris.jpg/600px-0601_Acne_Vulgaris.jpg', caption: 'Mụn trứng cá mức độ nhẹ trên da mặt', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/0602_Acne_Vulgaris.jpg/600px-0602_Acne_Vulgaris.jpg', caption: 'Mụn trứng cá mức độ trung bình với nốt viêm', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/0603_Acne_Vulgaris.jpg/600px-0603_Acne_Vulgaris.jpg', caption: 'Mụn trứng cá viêm sưng trên da', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }, { title: 'AAD', url: 'https://aad.org' }]
      },
      {
        id: 'mun-2',
        name: 'Mụn viêm / Mụn bọc',
        otherNames: 'Papules, Pustules, Cystic Acne',
        description: 'Nốt đỏ sưng đau, nặng hơn thì nằm sâu dưới da. Dễ để lại sẹo nếu xử lý sai cách.',
        causes: 'Mụn đầu đen/trắng không được xử lý → vi khuẩn P. acnes phát triển → viêm → mụn mủ, mụn bọc.',
        symptoms: ['Nốt đỏ đau khi chạm, có thể có đầu mủ trắng/vàng', 'Nốt to nằm sâu dưới da, nhức rõ', 'Mụn xẹp để lại thâm hoặc lõm', 'Da sờ thấy cứng ở vùng có mụn bọc'],
        schoolContext: 'Stress thi cử, thức khuya kéo dài, da bí do khẩu trang hoặc mũ bảo hiểm, vừa có mụn là đưa tay nặn ngay.',
        treatment: ['NGỪNG: Không nặn bằng móng tay, không bôi kem đánh răng hay "mẹo mạng" lên mụn.', 'RỬA: Rửa mặt dịu nhẹ, nhất là sau khi đổ mồ hôi.', 'DỊU: Chườm mát giảm sưng. Dùng benzoyl peroxide hoặc adapalene đúng cách.', 'KHÁM: Nếu mụn bọc sâu, đau nhiều → đến da liễu sớm.'],
        dangerSigns: ['Mụn sưng to, đau dữ, có dấu hiệu áp xe (mủ vàng tụ)', 'Mụn dày đặc ở mặt, ngực, lưng', 'Ảnh hưởng mạnh đến tâm trạng, giao tiếp'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/0601_Acne_Vulgaris.jpg/600px-0601_Acne_Vulgaris.jpg', caption: 'Mụn viêm đỏ trên bề mặt da mặt', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/0604_Acne_Vulgaris_on_the_chest.jpg/600px-0604_Acne_Vulgaris_on_the_chest.jpg', caption: 'Mụn viêm lan rộng trên vùng ngực', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Acne_vulgaris_2.jpg/600px-Acne_vulgaris_2.jpg', caption: 'Mụn trứng cá viêm nặng dưới da', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }]
      },
      {
        id: 'mun-3',
        name: 'Viêm da cơ địa',
        otherNames: 'Eczema, Atopic Dermatitis',
        description: 'Da khô, ngứa, đỏ bùng phát theo đợt. Cơ địa di truyền hoặc do tiếp xúc chất không hợp.',
        causes: 'Gen di truyền + rào cản da suy yếu → da khô, dễ kích ứng → viêm khi gặp tác nhân triggers.',
        symptoms: ['Da khô, ngứa, đỏ bùng phát theo đợt', 'Vùng khuỷu tay, đầu gối (học sinh lớn) hoặc má, trán (trẻ nhỏ)', 'Da dày, vằn vằn (lichen hóa) do gãi mạn', 'Da nhạy cảm, dễ bị kích ứng'],
        schoolContext: 'Dùng xà phòng thơm, nước giặt đậm mùi, áo đồng phục bí, phòng máy lạnh khô, hoặc đeo phụ kiện kim loại (niken) đều có thể làm bùng phát.',
        treatment: ['NGỪNG: Gãi, dùng xà phòng thơm, nước giặt mùi hắc.', 'RỬA: Tắm nước ấm vừa. Thoa kem dưỡng ẩm NGAY SAU KHI TẮM còn ẩm.', 'DỊU: Kem steroid nhẹ (hydrocortisone 1%) tối đa 7 ngày cho đợt bùng phát.', 'KHÁM: Đến da liễu để được kê kem ức chế miễn dịch.'],
        dangerSigns: ['Da đỏ rực, ngứa không ngủ được nhiều đêm', 'Có mủ, vảy vàng, sốt (nhiễm trùng thứ phát)', 'Da bong tróc rộng, có dấu hiệu nhiễm Herpes'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Atopic_dermatitis_child_1.jpg/600px-Atopic_dermatitis_child_1.jpg', caption: 'Trẻ bị viêm da cơ địa ở vùng mặt và cổ', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Atopic_dermatitis_ab.jpeg/600px-Atopic_dermatitis_ab.jpeg', caption: 'Tổn thương viêm da cơ địa trên da tay', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Dermatite_o_eczema_atopico_avambraccio_2015.jpg/600px-Dermatite_o_eczema_atopico_avambraccio_2015.jpg', caption: 'Viêm da cơ địa trên vùng cẳng tay', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }, { title: 'AAD', url: 'https://aad.org' }]
      },
      {
        id: 'mun-4',
        name: 'Nấm da',
        otherNames: 'Tinea, Ringworm, Dermatophytosis',
        description: 'Nhiễm nấm bề mặt da, tóc, móng. Đặc trưng bởi tổn thương hình tròn, vòng đồng tâm, ngứa dữ dội.',
        causes: 'Nấm Dermatophytes lây qua tiếp xúc da-da hoặc dùng chung đồ dùng cá nhân (khăn, mũ, lược, đồ thể thao).',
        symptoms: ['Tổn thương hình tròn, vòng đồng tâm (rìa đỏ cao, giữa lành)', 'Vảy trắng, bong tróc ở rìa tổn thương', 'Ngứa dữ dội', 'Có thể rụng tóc từng mảng (nấm da đầu)'],
        schoolContext: 'Lây qua dùng chung khăn tắm, ga giường, đồ thể thao. Phổ biến trong phòng gym, lớp bơi, ký túc xá. Trẻ bán trú dùng chung gối, mũ, lược.',
        treatment: ['NGỪNG: Dùng chung khăn, mũ, lược, đồ thể thao. Để da thoáng.', 'RỬA: Giữ da KHÔ RÁO sạch sẽ. Thay vớ, quần áo thấm mồ hôi ngay.', 'DỊU: Thoa kem chống nấm clotrimazole 1% – 2 lần/ngày, liên tục 2-4 tuần.', 'KHÁM: Nếu không cải thiện sau 2 tuần → cần thuốc uống từ da liễu.'],
        dangerSigns: ['Tổn thương lan rộng khắp cơ thể', 'Nấm móng lan rộng, móng biến dạng nặng', 'Có mủ, sưng đỏ quanh tổn thương'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dermatophytosis_20190815-02ASD.jpg/600px-Dermatophytosis_20190815-02ASD.jpg', caption: 'Tổn thương nấm da hình tròn với vòng đồng tâm đặc trưng', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Dermatophytose_cou.jpg/600px-Dermatophytose_cou.jpg', caption: 'Nấm da ở vùng cổ với tổn thương lan rộng', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Mycose_dermatophytose_dos.jpg/600px-Mycose_dermatophytose_dos.jpg', caption: 'Nấm da Dermatophytosis ở vùng lưng', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov/fungal/diseases/ringworm.html' }]
      },
      {
        id: 'mun-5',
        name: 'Ghẻ',
        otherNames: 'Scabies',
        description: 'Do ký sinh trùng Sarcoptes scabiei đào đường hang dưới da. Ngứa dữ dội NHẤT LÀ VỀ ĐÊM. Lây qua tiếp xúc da-da kéo dài.',
        causes: 'Ký sinh trùng ghẻ đào đường hang trong lớp sừng da, đẻ trứng. Lây qua tiếp xúc da-da kéo dài hoặc dùng chung khăn, ga giường.',
        symptoms: ['NGỨA DỮ DỘI VỀ ĐÊM – đặc trưng nhất của ghẻ', 'Đường hang xám nhạt dưới da ở kẽ ngón, cổ tay, nách, thắt lưng', 'Nốt đỏ nhỏ rải rác, có thể có mụn nước nhỏ', 'Da trầy do gãi, có thể nhiễm trùng'],
        schoolContext: 'Lây qua tiếp xúc da-da kéo dài (khó xảy ra trong lớp học thông thường, phổ biến trong gia đình, ký túc xá).',
        treatment: ['NGỪNG: Tiếp xúc da-da với người bệnh. Dùng chung khăn, ga giường.', 'RỬA: Giặt KHĂN, GA GIƯỜNG, VỚ bằng NƯỚC SÔI (>60°C) hoặc cho vào túi nilon đậy kín 72 giờ.', 'DỊU: Thoa permethrin 5% lên toàn thân từ cổ trở xuống – để qua đêm 8-12h rồi rửa sạch. Lặp lại sau 7 ngày.', 'KHÁM + TẤT CẢ NGƯỜI TRONG GIA ĐÌNH cùng điều trị đồng thời.'],
        dangerSigns: ['Ngứa không ngủ được nhiều đêm liên tiếp', 'Tổn thương lan rộng toàn thân, có mủ', 'Da trầy sâu, chảy máu, hình thành vảy dày'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sarcoptes_scabei_2.jpg/600px-Sarcoptes_scabei_2.jpg', caption: 'Ký sinh trùng ghẻ Sarcoptes scabiei dưới kính hiển vi', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/0901_Scabies.jpg/600px-0901_Scabies.jpg', caption: 'Tổn thương ghẻ trên da với đường hang đặc trưng', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Scabies-burrow.jpg/600px-Scabies-burrow.jpg', caption: 'Đường hang ghẻ dưới da tại vị trí kẽ ngón tay', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov/parasites/scabies' }]
      },
      {
        id: 'mun-6',
        name: 'Chốc lở',
        otherNames: 'Impetigo',
        description: 'Nhiễm trùng da do tụ cầu/liên cầu. Đặc trưng bởi vết loét đỏ và VẢY VÀNG NHƯ MẬT ONG. Phổ biến ở trẻ 2-6 tuổi, có thể gặp ở học sinh tiểu học.',
        causes: 'Vi khuẩn tụ cầu vàng (S. aureus) hoặc liên cầu (S. pyogenes) xâm nhập qua vết xước, muỗi đốt, chà xát.',
        symptoms: ['Mụn nước nhỏ hoặc trợt da, nhanh vỡ để lại VẢY VÀNG MẬT ONG', 'Vùng da xung quanh đỏ, sưng nhẹ', 'Thường quanh mũi, miệng, tay, chân', 'Ngứa nhẹ, có thể đau rát'],
        schoolContext: 'Lây qua tiếp xúc trực tiếp, dùng chung khăn, gối, bàn chải. Thời tiết nóng ẩm giao mùa là điều kiện thuận lợi. Trẻ gãi rồi chạm sang vùng khác gây lan.',
        treatment: ['NGỪNG: Gãi, chạm tay bẩn vào vết loét.', 'RỬA: Rửa vết loét 2 lần/ngày bằng nước muối sinh lý hoặc xà phòng trung tính.', 'DỊU: Thoa kháng sinh bôi (mupirocin) theo chỉ định.', 'KHÁM: Nếu lan rộng, có sốt → cần kháng sinh uống. Nghỉ học đến khi khô hẳn.'],
        dangerSigns: ['Vết loét lan rộng nhanh dù đã vệ sinh', 'Sốt cao, mệt mỏi, bỏ ăn', 'Da sưng nóng đỏ rực, rất đau'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/02_Impetigo.jpg/600px-02_Impetigo.jpg', caption: 'Tổn thương chốc lở Impetigo với vảy vàng đặc trưng', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Impetigo_elbow.jpg/600px-Impetigo_elbow.jpg', caption: 'Chốc lở ở vùng khuỷu tay với mụn nước và vảy vàng', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Impetigo_crouteux_jambes.jpg/600px-Impetigo_crouteux_jambes.jpg', caption: 'Chốc lở Impetigo trên da chân với vảy mật ong', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }]
      }
    ]
  },
  // ── BỆNH LÂY NHIỄM ──
  {
    category: 'BỆNH LÂY NHIỄM',
    icon: '🤒',
    color: 'orange',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textColor: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-500',
    diseases: [
      {
        id: 'tcm-1',
        name: 'Tay - Chân - Miệng',
        otherNames: 'Hand, Foot and Mouth Disease (HFMD)',
        description: 'Sốt + loét miệng + phỏng nước lòng bàn tay/chân. Phổ biến ở trẻ dưới 10 tuổi, đặc biệt tiểu học.',
        causes: 'Virus Coxsackie A (chủ yếu) và Enterovirus EV71. Lây qua giọt bắn, phân, nước bọt, dịch tiết từ mụn nước.',
        symptoms: ['Sốt nhẹ đến sốt cao 2-3 ngày', 'Loét miệng đau, khó ăn', 'Phỏng nước ở lòng bàn tay, bàn chân, đôi khi mông, đầu gối', 'Biếng ăn, quấy khóc ở trẻ nhỏ'],
        schoolContext: 'Virus tồn tại lâu trên bề mặt (bàn ghế, đồ chơi, tay nắm cửa). Lây qua ăn uống chung, tiếp xúc dịch tiết. Cần cách ly trẻ ngay khi phát hiện.',
        treatment: ['NGỪNG: Cho trẻ đến trường khi đang bệnh. Dùng chung đồ ăn uống, khăn.', 'RỬA: Cách ly tại nhà. Rửa tay thường xuyên bằng xà phòng.', 'DỊU: Cho ăn đồ lỏng, mềm, nguội (cháo, súp, sữa). Hạ sốt nếu cần.', 'KHÁM NGAY nếu sốt cao >39°C không hạ, co giật, biếng ăn dữ dội.'],
        dangerSigns: ['Sốt cao >39°C không hạ dù thuốc', 'Giật mình, run tay chân, quấy khóc vô cớ (dấu hiệu thần kinh)', 'Đi đứng loạng choạng, nôn ói, khó thở', 'Da nổi vân tím, vã mồ hôi lạnh (dấu hiệu sốc)'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Hand_Foot_Mouth_Disease.png/600px-Hand_Foot_Mouth_Disease.png', caption: 'Sơ đồ minh họa tổn thương bệnh Tay - Chân - Miệng trên da', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Characteristic_rash_of_hand%2C_foot%2C_and_mouth_disease%2C_on_a_human_foot.jpg/600px-Characteristic_rash_of_hand%2C_foot%2C_and_mouth_disease%2C_on_a_human_foot.jpg', caption: 'Phỏng nước đặc trưng của bệnh Tay - Chân - Miệng trên bàn chân', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Characteristic_rash_of_hand%2C_foot%2C_and_mouth_disease%2C_on_human_hands.jpg/600px-Characteristic_rash_of_hand%2C_foot%2C_and_mouth_disease%2C_on_human_hands.jpg', caption: 'Tổn thương phỏng nước trên lòng bàn tay do bệnh HFMD', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov' }, { title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }]
      },
      {
        id: 'tcm-2',
        name: 'Thủy đậu',
        otherNames: 'Chickenpox, Varicella',
        description: 'Virus Varicella-Zoster. Mụn nước TRONG trên nền da ĐỎ, ngứa, sốt nhẹ. Để lại sẹo nếu gãi nhiều.',
        causes: 'Virus Varicella-Zoster lây qua giọt bắn và tiếp xúc dịch mụn nước. Một trẻ bệnh có thể lây cho nhiều bạn trong lớp.',
        symptoms: ['Sốt nhẹ, mệt mỏi, đau đầu 1-2 ngày', 'Phát ban đỏ rải rác, sau đó hình thành MỤN NƯỚC TRONG trong vài giờ', 'Mụn xuất hiện ở mặt, da đầu, thân mình, tay chân', 'Mụn khô thành vảy trong 5-10 ngày'],
        schoolContext: 'Lây rất nhanh trong trường học. Một học sinh bệnh có thể lây cho cả lớp. Cần nghỉ học ít nhất 7 ngày sau phát ban.',
        treatment: ['NGỪNG: Gãi mụn nước – để lại sẹo. Đến trường khi còn vảy chưa khô hẳn.', 'RỬA: Tắm nước ấm nhẹ nhàng. Cắt móng ngắn. Mặc đồ mềm, thoáng.', 'DỊU: Thuốc chống ngứa theo chỉ định. Chườm mát giảm ngứa.', 'KHÁM NGAY nếu sốt cao liên tục, khó thở, đau đầu dữ dội.'],
        dangerSigns: ['Sốt cao liên tục không hạ', 'Mụn nước có mủ, sưng đỏ lan rộng (nhiễm trùng da)', 'Trẻ khó thở, ho nhiều (viêm phổi)', 'Đau đầu dữ dội, cứng cổ, lú lẫn (viêm não)'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Varicella_day_5.jpg/600px-Varicella_day_5.jpg', caption: 'Mụn nước thủy đậu Varicella ngày thứ 5 trên da', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Head_and_face_of_a_child_with_varicella_gangrenosa_Wellcome_L0062040.jpg/600px-Head_and_face_of_a_child_with_varicella_gangrenosa_Wellcome_L0062040.jpg', caption: 'Bệnh nhân thủy đậu nặng biến chứng varicella gangrenosa ở vùng mặt', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/VARIVAX.jpg/600px-VARIVAX.jpg', caption: 'Hình ảnh minh họa virus Varicella-Zoster gây thủy đậu', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }]
      },
      {
        id: 'tcm-3',
        name: 'Cúm',
        otherNames: 'Influenza',
        description: 'Virus Influenza A/B. Sốt cao ĐỘT BIẾN + đau cơ + ho + mệt MẤT ĂN NGỦ. Nặng hơn cảm thường rất nhiều.',
        causes: 'Virus Influenza lây qua giọt bắn khi ho, hắt hơi, nói chuyện. Bùng phát theo mùa (mùa lạnh, giao mùa, mùa thi).',
        symptoms: ['Sốt cao ĐỘT BIẾN 39-40°C, run rẩy, ớn lạnh', 'Đau đầu dữ dội, đau cơ toàn thân', 'Ho dữ dội, đau ngực khi ho', 'Mệt mỏi nặng, nằm liệt giường 3-5 ngày'],
        schoolContext: 'Một học sinh bệnh có thể lây cho cả lớp trong vài ngày. Phổ biến giai đoạn giao mùa, lúc thi cử.',
        treatment: ['NGỪNG: Đến trường khi đang sốt, ho, đau mỏi. Đeo khẩu trang nếu bắt buộc ra ngoài.', 'RỬA: Rửa tay thường xuyên. Dùng khăn giấy che miệng khi ho/hắt hơi.', 'DỊU: Hạ sốt bằng paracetamol. Uống nhiều nước, oresol, nước hoa quả.', 'KHÁM: Nếu sốt cao >3 ngày, khó thở, đau ngực.'],
        dangerSigns: ['Khó thở, thở nhanh, thở gấp (viêm phổi)', 'Sốt không hạ hoặc sốt lại sau 3-4 ngày', 'Đau ngực dữ dội, ho ra máu', 'Lú lẫn, không tỉnh táo, co giật'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/H1N1_Influenza_Virus_Particles_%288411599236%29.jpg/600px-H1N1_Influenza_Virus_Particles_%288411599236%29.jpg', caption: 'Hình ảnh virus cúm Influenza H1N1 qua kính hiển vi điện tử', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/A_family_threatened_by_influenza_is_prepared_for_a_large_sca_Wellcome_V0011966.jpg/600px-A_family_threatened_by_influenza_is_prepared_for_a_large_sca_Wellcome_V0011966.jpg', caption: 'Gia đình ốm bệnh do cúm Influenza', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Three_miserable_men_suffering_from_gout%2C_toothache_and_flu_Wellcome_V0012085.jpg/600px-Three_miserable_men_suffering_from_gout%2C_toothache_and_flu_Wellcome_V0012085.jpg', caption: 'Người bệnh cúm với các triệu chứng mệt mỏi, đau đầu', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'WHO', url: 'https://who.int/influenza' }]
      },
      {
        id: 'tcm-4',
        name: 'Đau mắt đỏ',
        otherNames: 'Viêm kết mạc, Conjunctivitis',
        description: 'Viêm kết mạc do virus (Adenovirus) hoặc vi khuẩn. Mắt đỏ rực + ghèn/đục nhiều + chảy nước mắt. Lây LAN NHANH trong lớp.',
        causes: 'Adenovirus (phổ biến nhất) hoặc vi khuẩn (Staph, Strep). Lây qua dùng chung khăn, gối, kính, hoặc chạm tay vào dịch tiết mắt.',
        symptoms: ['Lòng trắng mắt đỏ rực, đỏ tươi hoặc hồng', 'Cảm giác cộm, rát như có cát trong mắt', 'Ghèn (đục) nhiều, buổi sáng dính mắt khó mở', 'Chảy nước mắt, sưng mí mắt, nhạy cảm ánh sáng'],
        schoolContext: 'Một ca trong lớp có thể lây cho NHIỀU BẠN trong vài ngày. Dùng chung khăn mặt, gối, kính bơi là nguy cơ cao.',
        treatment: ['NGỪNG: Dùng chung khăn, gối, kính, thuốc nhỏ mắt. Đến trường khi đang đỏ mắt nhiều ghèn.', 'RỬA: Nhỏ nước muối sinh lý (NaCl 0.9%) thường xuyên. Rửa tay xà phòng ngay sau khi chạm vào mắt.', 'DỊU: Thuốc nhỏ mắt kháng virus hoặc kháng sinh theo đơn bác sĩ.', 'KHÁM: Nếu đỏ nặng, mờ mắt, đau nhiều, hoặc không cải thiện sau 3 ngày.'],
        dangerSigns: ['Đau nhức mắt dữ dội, đau sâu vào hốc mắt', 'Nhìn mờ, suy giảm thị lực đột ngột', 'Mắt rất sợ ánh sáng, không thể mở mắt', 'Chảy mủ đặc hoặc có máu từ kết mạc'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Conjunctivitis_5174.jpg/600px-Conjunctivitis_5174.jpg', caption: 'Viêm kết mạc đỏ rực – mắt đỏ đặc trưng của bệnh đau mắt đỏ', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/An_eye_with_conjunctivitis.jpg/600px-An_eye_with_conjunctivitis.jpg', caption: 'Mắt bị viêm kết mạc với lòng trắng đỏ hồng rải rác', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/ConjunctivitisRedEye.jpg/600px-ConjunctivitisRedEye.jpg', caption: 'Đau mắt đỏ do viêm kết mạc với mạch máu đỏ lan tỏa', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Mắt TW', url: 'https://vnio.vn' }]
      }
    ]
  },
  // ── SỨC KHỎE TÂM LÝ ──
  {
    category: 'SỨC KHỎE TÂM LÝ',
    icon: '🧠',
    color: 'purple',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textColor: 'text-purple-600',
    gradient: 'from-purple-500 to-violet-500',
    diseases: [
      {
        id: 'tl-1',
        name: 'Stress học tập & Rối loạn giấc ngủ',
        otherNames: 'Academic Stress, Sleep Disorder',
        description: 'Căng thẳng tâm lý do áp lực thi cử, điểm số, kỳ vọng gia đình. Dẫn đến mất ngủ, lo âu, đau đầu.',
        causes: 'Áp lực thi cử, bài tập nhiều, kỳ vọng từ gia đình, so sánh với bạn bè, stress mạng xã hội.',
        symptoms: ['Mất ngủ hoặc ngủ không sâu giấc, thức dậy mệt', 'Đau đầu, đau bụng không rõ nguyên nhân thực thể', 'Lo âu, bồn chồn, khó tập trung trong học tập', 'Thay đổi cảm xúc: dễ khóc, cáu gắt, cô lập'],
        schoolContext: 'Học sinh lớp cuối (lớp 9, lớp 12) đặc biệt dễ bị stress nặng. Giao mùa thi là cao điểm.',
        treatment: ['NGỪNG: Áp lực thêm về điểm số, so sánh con với "con nhà người ta".', 'RỬA: Chia sẻ với người tin tưởng (bạn bè, thầy cô, cha mẹ). Viết nhật ký cảm xúc.', 'DỊU: Vận động nhẹ 30 phút/ngày. Ngủ đủ 7-8h/đêm. Hạn chế caffeine, mạng xã hội buổi tối.', 'KHÁM: Nếu kéo dài >2 tuần → gặp chuyên gia tâm lý học đường. Gọi 1800-9090.'],
        dangerSigns: ['Không ngủ được nhiều ngày liên tiếp', 'Có ý nghĩ tự làm đau bản thân', 'Hoảng sợ tột độ, cơn hoảng panic', 'Bỏ ăn, bỏ học, cô lập hoàn toàn'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pediatric_polysomnogram.jpg/600px-Pediatric_polysomnogram.jpg', caption: 'Đo giấc ngủ Polysomnography – phát hiện rối loạn giấc ngủ ở trẻ', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Etapes_de_la_construction_de_l%27identit%C3%A9_sexuelle_d%27un_%C3%AAtre_humain_%28sch%C3%A9ma_non_titr%C3%A9_et_non_l%C3%A9gend%C3%A9%29.svg/600px-Etapes_de_la_construction_de_l%27identit%C3%A9_sexuelle_d%27un_%C3%AAtre_humain_%28sch%C3%A9ma_non_titr%C3%A9_et_non_l%C3%A9gend%C3%A9%29.svg.png', caption: 'Biểu đồ minh họa stress và các yếu tố ảnh hưởng đến tâm lý tuổi học đường', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Early_and_late_maturing_boys_11.5_to_14.6_and_early_and_late_maturing_girls_11.5_to_14.5_yo.png/600px-Early_and_late_maturing_boys_11.5_to_14.6_and_early_and_late_maturing_girls_11.5_to_14.5_yo.png', caption: 'Thay đổi tâm lý tuổi dậy thì ảnh hưởng đến giấc ngủ và học tập', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Tâm thần TW', url: 'https://benhvienphantin.vn' }, { title: 'Đường dây hỗ trợ 1800-9090', url: 'https://hoisongtructuyen.gov.vn' }]
      },
      {
        id: 'tl-2',
        name: 'Thay đổi nội tiết tuổi dậy thì',
        otherNames: 'Puberty Changes',
        description: 'Giai đoạn chuyển tiếp sinh lý mạnh mẽ: thay đổi hormone → mụn, chiều cao, cảm xúc thất thường. Nữ 8-13 tuổi, Nam 9-14 tuổi.',
        causes: 'Tuyến sinh dục bắt đầu hoạt động → hormone (estrogen, testosterone) tăng mạnh → thay đổi cơ thể và tâm lý.',
        symptoms: ['Phát triển chiều cao nhanh, thay đổi hình dạng cơ thể', 'Nổi MỤN (do tăng hormone androgen)', 'Cảm xúc thất thường, dễ kích động, dễ buồn', 'Bắt đầu kinh nguyệt (nữ), thay đổi cơ thể (nam)'],
        schoolContext: 'Học sinh tự ti về ngoại hình thay đổi, so sánh với bạn bè. Áp lực mạng xã hội làm trầm trọng thêm.',
        treatment: ['NGỪNG: So sánh ngoại hình với người khác. Xem mạng xã hội quá nhiều về body image.', 'RỬA: Cha mẹ trò chuyện CỞI MỞ với con về thay đổi cơ thể. Giáo dục giới tính phù hợp lứa tuổi.', 'DỊU: Chăm sóc da đúng cách (rửa mặt, dưỡng ẩm). Vệ sinh kinh nguyệt đúng cách (nữ).', 'KHÁM: Nếu rối loạn ăn uống, trầm cảm, tự ti quá mức → gặp chuyên gia tâm lý.'],
        dangerSigns: ['Rối loạn ăn uống: nhịn ăn, ăn quá nhiều để kiểm soát cân nặng', 'Tự ti quá mức dẫn đến trầm cảm, cô lập', 'Hành vi tự hại: cắt tay, tổn thương bản thân'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Early_and_late_maturing_boys_11.5_to_14.6_and_early_and_late_maturing_girls_11.5_to_14.5_yo.png/600px-Early_and_late_maturing_boys_11.5_to_14.6_and_early_and_late_maturing_girls_11.5_to_14.5_yo.png', caption: 'Sự phát triển thể chất khác nhau ở tuổi dậy thì sớm và muộn', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Estrogen_levels_in_the_Tanner_stages_during_normal_puberty_in_girls.png/600px-Estrogen_levels_in_the_Tanner_stages_during_normal_puberty_in_girls.png', caption: 'Biểu đồ mức hormone estrogen thay đổi qua các giai đoạn dậy thì ở nữ', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Axillary_Hair_in_Puberty.jpg/600px-Axillary_Hair_in_Puberty.jpg', caption: 'Dấu hiệu dậy thì – lông nách phát triển ở tuổi vị thành niên', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }]
      }
    ]
  },
  // ── VỆ SINH ──
  {
    category: 'VỆ SINH',
    icon: '🧼',
    color: 'teal',
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200',
    textColor: 'text-teal-600',
    gradient: 'from-teal-500 to-emerald-500',
    diseases: [
      {
        id: 'vs-1',
        name: 'Sốt tinh hồng nhiệt',
        otherNames: 'Scarlet Fever',
        description: 'Streptococcus nhóm A gây ra. Sốt cao + đau họng + phát ban đỏ như giấy nhám + lưỡi dâu tây.',
        causes: 'Streptococcus pyogenes (Strep A) lây qua giọt bắn. Phổ biến ở trẻ 5-15 tuổi, đặc biệt trong mùa lạnh.',
        symptoms: ['Sốt cao đột ngột', 'Đau họng, amidan đỏ, có mủ trắng', 'Phát ban đỏ như giấy nhám toàn thân', 'Lưỡi đỏ gồ ghề "lưỡi dâu tây"', 'Da bong tróc ở đầu ngón tay/chân sau 1-2 tuần'],
        schoolContext: 'Lây qua giọt bắn trong lớp học, nhất là khi trẻ ho, hắt hơi. Cần nghỉ học và điều trị kháng sinh đủ liệu trình.',
        treatment: ['NGỪNG: Đến trường khi đang sốt, đau họng. Dùng chung bát đũa, khăn.', 'RỬA: Rửa tay thường xuyên. Che miệng khi ho/hắt hơi.', 'DỊU: Hạ sốt bằng paracetamol. Uống nhiều nước.', 'KHÁM VÀ DÙNG KHÁNG SINH ĐỦ LIỆU TRÌNH (10-14 ngày) theo chỉ định.'],
        dangerSigns: ['Khó thở, thở nhanh (viêm phổi, viêm màng tim)', 'Sốt không hạ dù đã uống thuốc', 'Tiểu ít, môi khô, khóc không nước mắt (mất nước)', 'Cổ sưng to, nuốt khó (áp xe quanh amidan)'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Scarlet_fever_rash.jpg/600px-Scarlet_fever_rash.jpg', caption: 'Phát ban đỏ đặc trưng của sốt tinh hồng nhiệt Scarlet Fever toàn thân', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Scarlatina_tongue.JPG/600px-Scarlatina_tongue.JPG', caption: 'Lưỡi dâu tây – dấu hiệu đặc trưng của sốt tinh hồng nhiệt', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Child_with_scarlet_fever.jpg/600px-Child_with_scarlet_fever.jpg', caption: 'Trẻ em mắc sốt tinh hồng nhiệt với biểu hiện mệt mỏi', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov' }, { title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }]
      },
      {
        id: 'vs-2',
        name: 'Nhiễm khuẩn da',
        otherNames: 'Bacterial Skin Infection',
        description: 'Vi khuẩn (tụ cầu, liên cầu) xâm nhập qua vết xước, muỗi đốt, chà xát. Gây sốt, da đỏ sưng nóng, có mủ.',
        causes: 'Tụ cầu vàng (S. aureus) và liên cầu (S. pyogenes) xâm nhập qua vết trầy, muỗi đốt, viêm da tiếp xúc.',
        symptoms: ['Da đỏ, sưng nóng, đau nhức rõ', 'Có thể có mủ, áp xe', 'Sốt kèm theo', 'Hạch lympho sưng đau ở vùng gần tổn thương'],
        schoolContext: 'Trẻ hay cào, gãi vết trầy → vi khuẩn xâm nhập. Điều kiện nóng ẩm, mồ hôi nhiều, vệ sinh kém làm tăng nguy cơ.',
        treatment: ['NGỪNG: Gãi, chạm tay bẩn vào vết thương.', 'RỬA: Rửa sạch vết thương bằng nước muối sinh lý. Giữ khô ráo.', 'DỊU: Chườm mát nếu sưng nhẹ. Thoa kháng sinh bôi nếu có đơn.', 'KHÁM NGAY: Nếu sốt cao, mủ nhiều, lan rộng → cần kháng sinh uống/toàn thân.'],
        dangerSigns: ['Sốt cao kèm run rẩy, lạnh run', 'Mủ tụ lớn, sưng đỏ lan rộng nhanh', 'Da đỏ nóng bỏng, đau dữ dội (viêm mô tế bào)', 'Hạch sưng to, khó cử động'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Bullous_eruption_of_the_hands_due_to_streptococcus_infection_Wellcome_L0062919.jpg/600px-Bullous_eruption_of_the_hands_due_to_streptococcus_infection_Wellcome_L0062919.jpg', caption: 'Nhiễm khuẩn da do Streptococcus gây phồng rộp trên da tay', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/OSC_Microbio_21_02_impetigo.jpg/600px-OSC_Microbio_21_02_impetigo.jpg', caption: 'Hình minh họa vi khuẩn gây nhiễm khuẩn da Staphylococcus và Streptococcus', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Gaillard%27s_medical_journal_%281882%29_%2814792245183%29.jpg/600px-Gaillard%27s_medical_journal_%281882%29_%2814792245183%29.jpg', caption: 'Biểu hiện nhiễm khuẩn da nặng lan rộng trên cơ thể', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }]
      }
    ]
  }
];

// Reaction config
const REACTION_CONFIG = [
  { type: 'like', emoji: '👍', label: 'Thích', color: 'hover:bg-blue-50 hover:text-blue-600' },
  { type: 'love', emoji: '❤️', label: 'Yêu thích', color: 'hover:bg-red-50 hover:text-red-600' },
  { type: 'wow', emoji: '😮', label: 'Wow', color: 'hover:bg-yellow-50 hover:text-yellow-600' },
  { type: 'care', emoji: '🤗', label: 'Quan tâm', color: 'hover:bg-pink-50 hover:text-pink-600' },
  { type: 'fire', emoji: '🔥', label: 'Hot', color: 'hover:bg-orange-50 hover:text-orange-600' },
];

// YouTube embed helper
const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const reg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(reg);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0` : null;
};

const formatTimeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Vừa xong';
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} giờ trước`;
  return `${Math.floor(h / 24)} ngày trước`;
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
const PostCard: React.FC<{ post: ActivityPost; onOpen: () => void }> = ({ post, onOpen }) => {
  const total = post.reactions.reduce((s, r) => s + r.count, 0);
  return (
    <div onClick={onOpen} className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-slate-100">
      <div className="relative aspect-video overflow-hidden">
        {post.type === 'video' && getYouTubeEmbedUrl(post.content) ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <img src={`https://img.youtube.com/vi/${post.content.match(/youtu\.be\/([^?]+)/)?.[1] || ''}/mqdefault.jpg`} alt="" className="w-full h-full object-cover opacity-80" onError={(e: any) => e.target.style.display = 'none'} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 shadow-lg"><PlayCircle size={32} className="text-rose-600" /></div>
            </div>
          </div>
        ) : post.type === 'infographic' && post.content ? (
          <img src={post.content} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <FileText size={48} className="text-purple-300" />
          </div>
        )}
        <div className={`absolute top-2 left-2 ${post.type === 'video' ? 'bg-red-100 text-red-600' : post.type === 'article' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase`}>
          {post.type === 'video' ? '🎬 Video' : post.type === 'article' ? '📝 Bài viết' : '🖼️ Infographic'}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${post.authorRole === 'Cán bộ y tế' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
            {post.authorName[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">{post.authorName}</p>
            <p className={`text-[10px] ${post.authorRole === 'Cán bộ y tế' ? 'text-blue-500' : 'text-purple-500'}`}>{post.authorRole}</p>
          </div>
          <span className="ml-auto text-[10px] text-slate-400">{formatTimeAgo(post.createdAt)}</span>
        </div>
        <h3 className="font-bold text-slate-800 line-clamp-2 group-hover:text-rose-500 transition-colors">{post.title}</h3>
        {post.description && <p className="text-xs text-slate-500 line-clamp-2">{post.description}</p>}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Eye size={12} />{post.views}</span>
          <span className="flex items-center gap-1"><MessageCircle size={12} />{post.comments?.length || 0}</span>
          {total > 0 && <span>{post.reactions.find(r => r.count > 0)?.type && REACTION_CONFIG.find(r => r.type === post.reactions.find(pr => pr.count > 0)?.type)?.emoji} {total}</span>}
        </div>
      </div>
    </div>
  );
};

const PostDetail: React.FC<{ post: ActivityPost; onClose: () => void }> = ({ post, onClose }) => {
  const [localPost, setLocalPost] = useState(post);
  const [cmtText, setCmtText] = useState('');
  const [cmtName, setCmtName] = useState('');
  const [cmtRole, setCmtRole] = useState<'Học sinh' | 'Phụ huynh' | 'Khách'>('Khách');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/activity/${post.id}/view`, { method: 'POST' }).catch(() => {});
  }, [post.id]);

  const handleReact = async (type: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/activity/${post.id}/react`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: type }),
      });
      if (res.ok) {
        const data = await res.json();
        setLocalPost((p: any) => ({ ...p, reactions: data.reactions }));
      }
    } catch {}
  };

  const handleComment = async () => {
    if (!cmtText.trim() || !cmtName.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/activity/${post.id}/comment`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName: cmtName.trim(), authorRole: cmtRole, content: cmtText.trim() }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setLocalPost((p: any) => ({ ...p, comments: [...p.comments, newComment] }));
        setCmtText('');
      }
    } catch {}
    setSubmitting(false);
  };

  const total = localPost.reactions.reduce((s: number, r: any) => s + r.count, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[95vh] overflow-y-auto rounded-t-2xl">
        <div className={`p-4 sm:p-6 text-white ${post.type === 'video' ? 'bg-gradient-to-r from-slate-800 to-slate-900' : post.type === 'article' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-orange-500 to-pink-500'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">{post.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm opacity-80">
                <span>{post.authorName} · {post.authorRole}</span>
                <span>·</span>
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full"><X size={20} /></button>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-4">
          {post.type === 'video' && getYouTubeEmbedUrl(post.content) && (
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe src={getYouTubeEmbedUrl(post.content)!} className="w-full h-full" allowFullScreen title="video" />
            </div>
          )}
          {post.type === 'infographic' && post.content && (
            <img src={post.content} alt="" className="w-full rounded-xl" />
          )}
          {post.description && <p className="text-slate-600">{post.description}</p>}
          {post.content && post.type === 'article' && <p className="text-slate-700 whitespace-pre-wrap">{post.content}</p>}
          <div className="flex gap-1 flex-wrap">
            {REACTION_CONFIG.map(r => (
              <button key={r.type} onClick={() => handleReact(r.type)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${r.color} transition-all`}>
                <span>{r.emoji}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-slate-400">
            <span><Eye size={12} className="inline" /> {localPost.views} lượt xem</span>
            <span><MessageCircle size={12} className="inline" /> {localPost.comments?.length || 0} bình luận</span>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm">Bình luận</h4>
            <div className="flex gap-2">
              <input value={cmtName} onChange={(e: any) => setCmtName(e.target.value)} placeholder="Tên..." className="flex-1 border rounded-lg px-3 py-2 text-sm" />
              <select value={cmtRole} onChange={(e: any) => setCmtRole(e.target.value)} className="border rounded-lg px-2 text-sm">
                <option>Khách</option><option>Học sinh</option><option>Phụ huynh</option>
              </select>
            </div>
            <textarea value={cmtText} onChange={(e: any) => setCmtText(e.target.value)} placeholder="Viết bình luận..." rows={2} className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
            <button onClick={handleComment} disabled={submitting || !cmtText.trim() || !cmtName.trim()}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50">
              {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>
          </div>
          <div className="space-y-2">
            {localPost.comments?.map((c: any) => (
              <div key={c.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: c.avatarColor || '#6366f1' }}>{c.authorName[0]?.toUpperCase()}</div>
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold">{c.authorName}</span>
                    <span className="text-slate-400">{c.authorRole}</span>
                  </div>
                  <p className="text-sm text-slate-600">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PostForm: React.FC<{ onClose: () => void; onSuccess: (p: ActivityPost) => void }> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<'role' | 'pwd' | 'name' | 'form'>('role');
  const [role, setRole] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [postType, setPostType] = useState<PostType>('video');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePwd = () => {
    if (pwd === (role === 'Cán bộ y tế' ? '02112008' : '19122008')) { setStep('name'); setPwdErr(''); }
    else setPwdErr('Sai mật khẩu');
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) { setError('Tiêu đề và nội dung bắt buộc'); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/activity`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: postType, title: title.trim(), description: desc.trim(), content: content.trim(), authorName: authorName.trim(), authorRole: role, tags: tags.split(',').map(t => t.trim()).filter(Boolean) }),
      });
      if (res.ok) onSuccess(await res.json());
      else setError((await res.json()).error || 'Lỗi');
    } catch { setError('Không kết nối được server'); }
    setSubmitting(false);
  };

  const gradient = role === 'Cán bộ y tế' ? 'from-blue-600 to-cyan-500' : 'from-purple-600 to-pink-500';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className={`bg-gradient-to-r ${step === 'form' ? gradient : 'from-rose-500 to-purple-500'} p-4 text-white relative`}>
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full"><X size={18} /></button>
          <h3 className="font-bold text-lg">
            {step === 'role' && 'Chọn vai trò'}
            {step === 'pwd' && 'Nhập mật khẩu'}
            {step === 'name' && 'Nhập tên'}
            {step === 'form' && `${role === 'Cán bộ y tế' ? '🩺' : '👩‍🏫'} Đăng bài`}
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {step === 'role' && (
            <>
              <button onClick={() => { setRole('Cán bộ y tế'); setStep('pwd'); }} className="w-full flex items-center gap-3 p-4 border-2 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all">
                <span className="text-3xl">🩺</span><div className="text-left"><p className="font-bold">Cán bộ y tế</p><p className="text-xs text-slate-400">Y tá | Bác sĩ</p></div>
              </button>
              <button onClick={() => { setRole('Giáo viên'); setStep('pwd'); }} className="w-full flex items-center gap-3 p-4 border-2 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all">
                <span className="text-3xl">👩‍🏫</span><div className="text-left"><p className="font-bold">Giáo viên</p><p className="text-xs text-slate-400">Giáo viên | CTV</p></div>
              </button>
            </>
          )}
          {step === 'pwd' && (
            <>
              <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === 'Enter' && handlePwd()}
                placeholder="Mật khẩu..." className="w-full border-2 rounded-xl px-4 py-3 text-center text-xl tracking-widest" autoFocus />
              {pwdErr && <p className="text-red-500 text-sm text-center">{pwdErr}</p>}
              <button onClick={handlePwd} className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-3 rounded-xl font-bold">Xác nhận</button>
            </>
          )}
          {step === 'name' && (
            <>
              <input value={authorName} onChange={e => setAuthorName(e.target.value)} onKeyDown={e => e.key === 'Enter' && authorName.length >= 2 && setStep('form')}
                placeholder="Tên của bạn..." className="w-full border-2 rounded-xl px-4 py-3" autoFocus />
              <button onClick={() => authorName.length >= 2 && setStep('form')} disabled={authorName.length < 2}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">Tiếp tục</button>
            </>
          )}
          {step === 'form' && (
            <>
              <div className="flex gap-2">
                {(['video', 'article', 'infographic'] as PostType[]).map(t => (
                  <button key={t} onClick={() => setPostType(t)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${postType === t ? 'border-rose-400 bg-rose-50' : 'border-slate-200'}`}>
                    {t === 'video' ? '🎬' : t === 'article' ? '📝' : '🖼️'} {t === 'video' ? 'Video' : t === 'article' ? 'Bài viết' : 'Infographic'}
                  </button>
                ))}
              </div>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề..." className="w-full border rounded-xl px-3 py-2 text-sm" />
              <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Mô tả..." rows={2} className="w-full border rounded-xl px-3 py-2 text-sm resize-none" />
              {postType === 'video' && <input value={content} onChange={e => setContent(e.target.value)} placeholder="Link YouTube..." className="w-full border rounded-xl px-3 py-2 text-sm" />}
              {postType === 'article' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung bài viết..." rows={4} className="w-full border rounded-xl px-3 py-2 text-sm resize-none" />}
              {postType === 'infographic' && <input value={content} onChange={e => setContent(e.target.value)} placeholder="Link ảnh..." className="w-full border rounded-xl px-3 py-2 text-sm" />}
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags: phòng chống, dinh dưỡng..." className="w-full border rounded-xl px-3 py-2 text-sm" />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button onClick={handleSubmit} disabled={submitting} className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">
                {submitting ? 'Đang đăng...' : 'Đăng bài ngay'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
const App: React.FC = () => {
  const [tab, setTab] = useState<'library' | 'aiscan' | 'news' | 'findcare'>('library');
  const [catOpen, setCatOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [detailPost, setDetailPost] = useState<ActivityPost | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tab === 'news') {
      setLoadingPosts(true);
      fetch(`${API_BASE}/api/activity`).then(r => r.json()).then(d => { if (Array.isArray(d)) setPosts(d); }).finally(() => setLoadingPosts(false));
    }
  }, [tab]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredLibrary = search ? HEALTH_LIBRARY.map((cat: any) => ({
    ...cat,
    diseases: cat.diseases.filter((d: any) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.symptoms.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
    )
  })).filter((cat: any) => cat.diseases.length > 0) : HEALTH_LIBRARY;

  const totalDiseases = HEALTH_LIBRARY.reduce((sum: number, cat: any) => sum + cat.diseases.length, 0);

  // Get current category data
  const currentCat = selectedCat
    ? HEALTH_LIBRARY.find((c: any) => c.category === selectedCat)
    : null;

  const getCategoryGradient = (cat: any) => {
    const gradients: Record<string, string> = {
      'MỤN & DA LIỄU': 'from-rose-500 to-pink-500',
      'BỆNH LÂY NHIỄM': 'from-orange-500 to-amber-500',
      'SỨC KHỎE TÂM LÝ': 'from-purple-500 to-violet-500',
      'VỆ SINH': 'from-teal-500 to-emerald-500',
    };
    return gradients[cat.category] || 'from-blue-500 to-purple-500';
  };

  const getCategoryIconBg = (cat: any) => {
    const bgs: Record<string, string> = {
      'MỤN & DA LIỄU': 'bg-rose-100 text-rose-600',
      'BỆNH LÂY NHIỄM': 'bg-orange-100 text-orange-600',
      'SỨC KHỎE TÂM LÝ': 'bg-purple-100 text-purple-600',
      'VỆ SINH': 'bg-teal-100 text-teal-600',
    };
    return bgs[cat.category] || 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"><HeartPulse size={24} /></div>
            <div><h1 className="font-black text-lg leading-tight">EduHealth AI</h1><p className="text-white/70 text-[10px]">Trợ lý sức khỏe học đường</p></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12} />Sẵn sàng</div>
          </div>
        </div>
      </header>

      {/* SEARCH + NAV */}
      <div className="bg-white/80 backdrop-blur-md sticky top-[60px] z-40 shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
          {/* SEARCH */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm bệnh, triệu chứng..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-rose-400 transition-colors" />
          </div>
          {/* NAV TABS */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            <button onClick={() => { setTab('library'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'library' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
              <BookOpen size={18} />Cẩm nang thư viện{selectedCat && ` › ${selectedCat}`}
            </button>
            <button onClick={() => { setTab('aiscan'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'aiscan' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Zap size={18} />AI Sàng lọc
            </button>
            <button onClick={() => { setTab('news'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'news' ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Newspaper size={18} />Bản tin
            </button>
            <button onClick={() => { setTab('findcare'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'findcare' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
              <MapPin size={18} />Cơ sở y tế
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* ══ LIBRARY – HOME (no category selected) ══ */}
        {tab === 'library' && !selectedCat && !selectedDisease && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Hero + Category Dropdown */}
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20"><School size={160} /></div>
                <div className="relative">
                  <h2 className="text-2xl font-black mb-2">📚 Cẩm nang thư viện học đường</h2>
                  <p className="text-white/80 max-w-xl">Thông tin y khoa cập nhật giúp học sinh và phụ huynh nhận biết, phòng ngừa và xử lý các vấn đề sức khỏe thường gặp trong môi trường học đường.</p>
                  <p className="text-white/60 text-sm mt-1">{totalDiseases} bài viết · 4 danh mục</p>
                </div>
              </div>

              {/* Category Dropdown Button */}
              <div className="mt-4" ref={dropdownRef}>
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between hover:border-rose-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
                      📋
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-800 text-lg">Cẩm nang thư viện học đường</p>
                      <p className="text-slate-400 text-sm">Chọn danh mục bệnh để xem chi tiết</p>
                    </div>
                  </div>
                  <ChevronDown size={24} className={`text-slate-400 transition-transform duration-300 ${catOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {catOpen && (
                  <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 relative">
                    {HEALTH_LIBRARY.map((cat: any) => (
                      <button
                        key={cat.category}
                        onClick={() => {
                          setSelectedCat(cat.category);
                          setCatOpen(false);
                          setSelectedDisease(null);
                        }}
                        className={`w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-all duration-200 border-b border-slate-50 last:border-0 group`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getCategoryIconBg(cat)}`}>
                          {cat.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-slate-800 group-hover:text-rose-500 transition-colors">{cat.category}</p>
                          <p className="text-xs text-slate-400">{cat.diseases.length} bài viết</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getCategoryGradient(cat)} flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                          →
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Cards Grid (when no search, show all) */}
            {!search && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HEALTH_LIBRARY.map((cat: any) => (
                  <button
                    key={cat.category}
                    onClick={() => { setSelectedCat(cat.category); setSelectedDisease(null); }}
                    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1 text-left group`}
                  >
                    <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(cat)}`} />
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${getCategoryIconBg(cat)}`}>
                          {cat.icon}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base group-hover:text-rose-500 transition-colors">{cat.category}</p>
                          <p className="text-xs text-slate-400">{cat.diseases.length} bài viết</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {cat.diseases.map((d: any) => (
                          <p key={d.id} className="text-sm text-slate-500 hover:text-rose-500 transition-colors truncate">
                            • {d.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Search Results */}
            {search && filteredLibrary.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-slate-500 font-medium">
                  Tìm thấy {filteredLibrary.reduce((s: number, c: any) => s + c.diseases.length, 0)} kết quả cho "<span className="text-rose-500 font-bold">{search}</span>"
                </p>
                {filteredLibrary.map((cat: any) => (
                  <div key={cat.category} className="space-y-3">
                    <h3 className="text-base font-black text-slate-700 flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span> {cat.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cat.diseases.map((d: any) => (
                        <div key={d.id} onClick={() => { setSelectedCat(cat.category); setSelectedDisease(d); }}
                          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden border border-slate-100 group">
                          <div className="aspect-video overflow-hidden">
                            <img src={d.images[0]?.url} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e: any) => e.target.style.display = 'none'} />
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-rose-500 transition-colors line-clamp-1">{d.name}</h4>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{d.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {search && filteredLibrary.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-bold text-slate-400">Không tìm thấy kết quả cho "{search}"</p>
                <p className="text-sm text-slate-400 mt-1">Thử tìm với từ khóa khác</p>
              </div>
            )}
          </div>
        )}

        {/* ══ LIBRARY – CATEGORY SELECTED (show disease list) ══ */}
        {tab === 'library' && selectedCat && !selectedDisease && currentCat && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Category Header */}
            <button onClick={() => { setSelectedCat(null); setSelectedDisease(null); }}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium">
              <ChevronLeft size={20} /> Quay lại Cẩm nang thư viện
            </button>

            <div className={`bg-gradient-to-r ${getCategoryGradient(currentCat)} rounded-2xl p-5 text-white relative overflow-hidden`}>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20"><BookOpen size={120} /></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{currentCat.icon}</span>
                  <div>
                    <h2 className="text-xl font-black">{currentCat.category}</h2>
                    <p className="text-white/80 text-sm">{currentCat.diseases.length} bài viết</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disease Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCat.diseases.map((d: any) => (
                <div key={d.id} onClick={() => setSelectedDisease(d)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-slate-100 hover:-translate-y-1 group">
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img src={d.images[0]?.url} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e: any) => e.target.style.display = 'none'} />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-800 group-hover:text-rose-500 transition-colors">{d.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{d.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Xem chi tiết <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ DISEASE DETAIL ══ */}
        {tab === 'library' && selectedDisease && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <button onClick={() => setSelectedDisease(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium">
              <ChevronLeft size={20} /> Quay lại {selectedCat}
            </button>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Images Gallery */}
              <div className="grid grid-cols-3 gap-2 p-2 bg-slate-100">
                {selectedDisease.images.map((img: any, i: number) => (
                  <div key={i} className={`relative overflow-hidden rounded-xl ${i === 0 ? 'col-span-3 md:col-span-2 aspect-video' : 'aspect-square'}`}>
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" onError={(e: any) => e.target.style.display = 'none'} />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-[10px]">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">{selectedDisease.name}</h2>
                  {selectedDisease.otherNames && <p className="text-slate-400 text-sm italic">{selectedDisease.otherNames}</p>}
                </div>
                <div className="prose max-w-none">
                  <p className="text-slate-600">{selectedDisease.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2"><AlertTriangle size={16} />Nguyên nhân</h4>
                    <p className="text-sm text-slate-600">{selectedDisease.causes}</p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-4">
                    <h4 className="font-bold text-rose-600 mb-2 flex items-center gap-2"><ActivityIcon size={16} />Triệu chứng</h4>
                    <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                      {selectedDisease.symptoms.map((s: string, i: number) => (<li key={i}>{s}</li>))}
                    </ul>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <h4 className="font-bold text-amber-600 mb-2 flex items-center gap-2"><School size={16} />Bối cảnh học đường</h4>
                  <p className="text-sm text-slate-600">{selectedDisease.schoolContext}</p>
                </div>
                <div>
                  <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2"><ShieldCheck size={16} />Xử lý & Điều trị</h4>
                  <div className="space-y-2">
                    {selectedDisease.treatment.map((t: string, i: number) => (
                      <div key={i} className="flex gap-2"><span className="font-bold text-green-500 shrink-0">{i + 1}.</span><p className="text-sm text-slate-600">{t}</p></div>
                    ))}
                  </div>
                </div>
                {selectedDisease.dangerSigns?.length > 0 && (
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2"><AlertTriangle size={16} />Dấu hiệu nguy hiểm – Cần đi khám ngay</h4>
                    <ul className="text-sm text-red-700 list-disc pl-4 space-y-1">
                      {selectedDisease.dangerSigns.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-600 mb-2">Nguồn tham khảo</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisease.sources?.map((s: any, i: number) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs hover:bg-slate-200 transition-colors">
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ AI SCAN ══ */}
        {tab === 'aiscan' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl overflow-hidden">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-black flex items-center gap-3"><Camera size={28} />Sàng lọc AI thông minh</h2>
                <p className="text-white/80 mt-2">Tăng cường khả năng chẩn đoán bằng AI Multimodal, kết hợp bản đồ nhiệt để thấu hiểu rõ hơn tình trạng sức khỏe của bạn.</p>
              </div>
            </div>
            <div className="bg-white rounded-b-2xl -mt-4 mx-4 p-6 shadow-xl">
              <div className="text-center py-12 text-slate-400">
                <Stethoscope size={64} className="mx-auto mb-4 opacity-30" />
                <p className="font-bold">Tính năng AI Sàng lọc đang được cập nhật...</p>
                <p className="text-sm mt-1">Vui lòng quay lại sau!</p>
              </div>
            </div>
          </div>
        )}

        {/* ══ NEWSFEED ══ */}
        {tab === 'news' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl p-4 text-white flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg">📣 Bản tin sức khỏe học đường</h2>
                <p className="text-white/80 text-sm">Tin tức realtime từ cán bộ y tế & giáo viên</p>
              </div>
              <button onClick={() => setShowForm(true)} className="bg-white text-rose-600 px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                <Plus size={16} />Đăng bài
              </button>
            </div>
            {loadingPosts ? (
              <div className="flex justify-center py-12"><div className="animate-spin w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full" /></div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow">
                <p className="text-4xl mb-2">📭</p>
                <p className="font-bold text-slate-400">Chưa có bài đăng nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(p => <PostCard key={p.id} post={p} onOpen={() => setDetailPost(p)} />)}
              </div>
            )}
          </div>
        )}

        {/* ══ FIND CARE ══ */}
        {tab === 'findcare' && (
          <div className="animate-in fade-in duration-300 space-y-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white text-center">
              <h2 className="text-xl font-bold flex items-center justify-center gap-2"><MapPin size={24} />Tìm trạm y tế gần nhất</h2>
              <p className="text-white/80 text-sm mt-1">Dựa trên vị trí của bạn, EduHealth AI đã tìm thấy các điểm hỗ trợ y tế tin cậy quanh đây.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-red-100 hover:border-red-300">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3"><Hospital size={32} /></div>
                <p className="font-bold text-slate-800">Bệnh viện & Phòng khám</p>
                <p className="text-xs text-slate-400 mt-1">Ưu tiên cấp cứu & chuyên khoa</p>
              </button>
              <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-100 hover:border-emerald-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3"><ShoppingCart size={32} /></div>
                <p className="font-bold text-slate-800">Nhà thuốc & Hiệu thuốc</p>
                <p className="text-xs text-slate-400 mt-1">Vật tư y tế & Thuốc không kê đơn</p>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      {detailPost && <PostDetail post={detailPost} onClose={() => setDetailPost(null)} />}
      {showForm && <PostForm onClose={() => setShowForm(false)} onSuccess={p => { setPosts(prev => [p, ...prev]); setShowForm(false); }} />}
    </div>
  );
};

export default App;
