
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  HeartPulse, BookOpen, Camera, MapPin, AlertTriangle, CheckCircle,
  Upload, Send, Loader2, ChevronRight, X, Search, ChevronDown,
  ShoppingCart, Hospital, FileText, Stethoscope,
  School, ChevronLeft, Eye, EyeOff, Layers, Zap,
  Video, PlayCircle, MessageCircle, Sparkles, Plus,
  MessageSquare, ShieldCheck, Bell, TrendingUp, Clock,
  Heart, Star, Newspaper, UserPlus, LogIn, Info,
  Activity as ActivityIcon, Calendar, ThumbsUp, Filter,
  Clock3, ArrowUp, TrendingDown, User, Users, RefreshCw,
  ExternalLink, Award, Syringe, Pill, Wind, Bone, Brain, Eye as EyeIcon,
  Sun, Thermometer, Bug, Leaf, Droplets, Flame, Smile, Frown,
  Download, FileDown, XCircle, ShieldAlert, StarHalf
} from 'lucide-react';
import { ActivityPost, PostType, AuthorRole } from './types';

// API Base URL – dùng relative path để hoạt động trên cả dev & Vercel
const API_BASE = '';

// ═══════════════════════════════════════════════════════════════
// DỮ LIỆU CẨM NANG THƯ VIỆN SỨC KHỎE HỌC ĐƯỜNG
// Hình ảnh từ Wikimedia Commons (CC BY-SA 4.0)
// ═══════════════════════════════════════════════════════════════

// ACNE TYPES REFERENCE DATA
const ACNE_TYPES = [
  { id: 'at-1', name: 'Mụn đầu đen', latin: 'Open Comedo', icon: '⚫', color: '#64748b' },
  { id: 'at-2', name: 'Mụn đầu trắng', latin: 'Closed Comedo', icon: '⚪', color: '#94a3b8' },
  { id: 'at-3', name: 'Mụn sưng đỏ', latin: 'Papule', icon: '🔴', color: '#ef4444' },
  { id: 'at-4', name: 'Mụn có mủ', latin: 'Pustule', icon: '🟡', color: '#f59e0b' },
  { id: 'at-5', name: 'Mụn nang', latin: 'Nodule', icon: '🟣', color: '#8b5cf6' },
  { id: 'at-6', name: 'Mụn bọc', latin: 'Cyst', icon: '🔵', color: '#3b82f6' },
];

const HEALTH_LIBRARY = [
  // ── MỤN & DA LIỄU ──
  {
    category: 'MỤN & DA LIỄU HỌC ĐƯỜNG',
    icon: '🧴',
    color: 'rose',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-600',
    gradient: 'from-rose-500 to-pink-500',
    diseases: [
      {
        id: 'mun-1',
        name: 'Kẻ chấm đen lì lợm - Mụn đầu đen / Mụn đầu trắng',
        otherNames: 'Acne Vulgaris.',
        description: 'Nó là gì thế? Là tình trạng lỗ chân lông bị kẹt dầu và tế bào chết, tạo thành các chấm đen hoặc nốt trắng nhỏ khiến da sần và dễ mất tự tin.',
        causes: 'Hormone testosterone tăng tuổi dậy thì → tuyến bã nhờn hoạt động mạnh → lỗ chân lông bị bít tắc.',
        symptoms: ['Chấm đen nhỏ ở mũi, cằm, trán', 'Nốt trắng li ti hơi sần khi sờ', 'Da đổ dầu nhiều cuối buổi học', 'Lỗ chân lông to, bề mặt da không mịn'],
        schoolContext: 'Đội mũ bảo hiểm/khẩu trang bí cả ngày, học thể dục xong không rửa mặt, hay chống tay lên má, tối về cạy mụn trước gương, stress thi cử làm tăng tiết bã nhờn.',
        treatment: ['NGỪNG: Không nặn, không cạy, không lột mụn liên tục. Dừng đổi skincare lung tung.', 'RỬA: Rửa mặt nhẹ nhàng tối đa 2 lần/ngày và sau khi đổ mồ hôi – dùng sữa rửa mặt dịu nhẹ (pH 5.5).', 'DỊU: Kem/sữa dưỡng ẩm không gây bít tắc (oil-free). Tránh scrub hoặc chà khăn mạnh.', 'KHÁM: Nếu mụn viêm, kéo dài >4 tuần hoặc có nguy cơ sẹo → đến da liễu.'],
        dangerSigns: ['Mụn ngày càng dày, lan xuống lưng/ngực', 'Để lại nhiều thâm, sẹo lõm rõ', 'Tự ti rõ rệt, bỏ giao tiếp, bỏ ăn'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-03-31%20200846.png', caption: 'Mụn đầu đen – lỗ chân lông bị tắc chứa dầu và tế bào chết', source: 'Hình ảnh minh họa da có mụn đầu đen' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-03-31%20201049.png', caption: 'Mụn đầu trắng – nốt trắng li ti ở vùng mũi và má', source: 'Hình ảnh minh họa da có mụn đầu trắng' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-03-31%20203754.png', caption: 'Mụn đầu đen tập trung ở vùng mũi – lỗ chân lông to, bề mặt da sần', source: 'Hình ảnh minh họa vùng mũi có mụn đầu đen' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }, { title: 'AAD', url: 'https://aad.org' }]
      },
      {
        id: 'mun-2',
        name: 'Cục đau khó ưa- Mụn viêm / Mụn bọc',
        otherNames: 'Papules, Pustules, Cystic Acne',
        description: 'Nốt đỏ sưng đau, nặng hơn thì nằm sâu dưới da. Dễ để lại sẹo nếu xử lý sai cách.',
        causes: 'Mụn đầu đen/trắng không được xử lý → vi khuẩn P. acnes phát triển → viêm → mụn mủ, mụn bọc.',
        symptoms: ['Nốt đỏ đau khi chạm, có thể có đầu mủ trắng/vàng', 'Nốt to nằm sâu dưới da, nhức rõ', 'Mụn xẹp để lại thâm hoặc lõm', 'Da sờ thấy cứng ở vùng có mụn bọc'],
        schoolContext: 'Stress thi cử, thức khuya kéo dài, da bí do khẩu trang hoặc mũ bảo hiểm, vừa có mụn là đưa tay nặn ngay.',
        treatment: ['NGỪNG: Không nặn bằng móng tay, không bôi kem đánh răng hay "mẹo mạng" lên mụn.', 'RỬA: Rửa mặt dịu nhẹ, nhất là sau khi đổ mồ hôi.', 'DỊU: Chườm mát giảm sưng. Dùng benzoyl peroxide hoặc adapalene đúng cách.', 'KHÁM: Nếu mụn bọc sâu, đau nhiều → đến da liễu sớm.'],
        dangerSigns: ['Mụn sưng to, đau dữ, có dấu hiệu áp xe (mủ vàng tụ)', 'Mụn dày đặc ở mặt, ngực, lưng', 'Ảnh hưởng mạnh đến tâm trạng, giao tiếp'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/20210726_nguyen-nhan-gay-mun-boc-2.jpg', caption: 'Mụn viêm đỏ sưng to trên da – dạng papule có đầu mủ', source: 'Hình ảnh minh họa mụn viêm bọc trên da mặt' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-01%20084300.png', caption: 'Mụn viêm đỏ có mủ ở vùng má – mụn bọc nông dưới da', source: 'Hình ảnh minh họa mụn viêm có mủ trên má' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-02%20153833.png', caption: 'Mụn mủ nhiều điểm trên da mặt – cần được khám da liễu', source: 'Hình ảnh minh họa mụn mủ lan rộng' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }]
      },
      {
        id: 'mun-3',
        name: 'Chiếc áo ngứa phiền phức- Viêm da cơ địa',
        otherNames: 'Eczema, Atopic Dermatitis',
        description: 'Da khô, ngứa, đỏ bùng phát theo đợt. Cơ địa di truyền hoặc do tiếp xúc chất không hợp.',
        causes: 'Gen di truyền + rào cản da suy yếu → da khô, dễ kích ứng → viêm khi gặp tác nhân triggers.',
        symptoms: ['Da khô, ngứa, đỏ bùng phát theo đợt', 'Vùng khuỷu tay, đầu gối (học sinh lớn) hoặc má, trán (trẻ nhỏ)', 'Da dày, vằn vằn (lichen hóa) do gãi mạn', 'Da nhạy cảm, dễ bị kích ứng'],
        schoolContext: 'Dùng xà phòng thơm, nước giặt đậm mùi, áo đồng phục bí, phòng máy lạnh khô, hoặc đeo phụ kiện kim loại (niken) đều có thể làm bùng phát.',
        treatment: ['NGỪNG: Gãi, dùng xà phòng thơm, nước giặt mùi hắc.', 'RỬA: Tắm nước ấm vừa. Thoa kem dưỡng ẩm NGAY SAU KHI TẮM còn ẩm.', 'DỊU: Kem steroid nhẹ (hydrocortisone 1%) tối đa 7 ngày cho đợt bùng phát.', 'KHÁM: Đến da liễu để được kê kem ức chế miễn dịch.'],
        dangerSigns: ['Da đỏ rực, ngứa không ngủ được nhiều đêm', 'Có mủ, vảy vàng, sốt (nhiễm trùng thứ phát)', 'Da bong tróc rộng, có dấu hiệu nhiễm Herpes'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-02%20155359.png', caption: 'Da khô đỏ bùng phát viêm da cơ địa ở vùng má', source: 'Hình ảnh minh họa viêm da cơ địa trên da' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-02%20172402.png', caption: 'Tổn thương viêm da cơ địa – da đỏ ngứa, khô bong tróc', source: 'Hình ảnh minh họa viêm da cơ địa bùng phát' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-02%20175216.png', caption: 'Viêm da cơ địa ở vùng cổ – da đỏ rực và khô rát', source: 'Hình ảnh minh họa viêm da cơ địa ở cổ' }
        ],
        sources: [{ title: 'BV Da liễu TW', url: 'https://dalieu.vn' }, { title: 'AAD', url: 'https://aad.org' }]
      },
      {
        id: 'mun-4',
        name: 'Vòng tròn đáng ghét- Nấm da',
        otherNames: 'Tinea, Ringworm, Dermatophytosis',
        description: 'Nhiễm nấm bề mặt da, tóc, móng. Đặc trưng bởi tổn thương hình tròn, vòng đồng tâm, ngứa dữ dội.',
        causes: 'Nấm Dermatophytes lây qua tiếp xúc da-da hoặc dùng chung đồ dùng cá nhân (khăn, mũ, lược, đồ thể thao).',
        symptoms: ['Tổn thương hình tròn, vòng đồng tâm (rìa đỏ cao, giữa lành)', 'Vảy trắng, bong tróc ở rìa tổn thương', 'Ngứa dữ dội', 'Có thể rụng tóc từng mảng (nấm da đầu)'],
        schoolContext: 'Lây qua dùng chung khăn tắm, ga giường, đồ thể thao. Phổ biến trong phòng gym, lớp bơi, ký túc xá. Trẻ bán trú dùng chung gối, mũ, lược.',
        treatment: ['NGỪNG: Dùng chung khăn, mũ, lược, đồ thể thao. Để da thoáng.', 'RỬA: Giữ da KHÔ RÁO sạch sẽ. Thay vớ, quần áo thấm mồ hôi ngay.', 'DỊU: Thoa kem chống nấm clotrimazole 1% – 2 lần/ngày, liên tục 2-4 tuần.', 'KHÁM: Nếu không cải thiện sau 2 tuần → cần thuốc uống từ da liễu.'],
        dangerSigns: ['Tổn thương lan rộng khắp cơ thể', 'Nấm móng lan rộng, móng biến dạng nặng', 'Có mủ, sưng đỏ quanh tổn thương'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/hinh-anh-benh-nam-aspergillus.jpg', caption: 'Tổn thương nấm da hình tròn với vòng đồng tâm đặc trưng', source: 'Hình ảnh minh họa nấm da Dermatophytosis' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/hinh-anh-benh-nam-da-o-nguoi-do-nam-candida.jpg', caption: 'Nấm da ở vùng mặt – tổn thương đỏ có vảy trắng', source: 'Hình ảnh minh họa nấm da Candida trên da người' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-01%20084536.png', caption: 'Nấm da ở vùng cổ với tổn thương đỏ ngứa, có vảy', source: 'Hình ảnh minh họa nấm da ở cổ' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov/fungal/diseases/ringworm.html' }]
      },
      {
        id: 'mun-5',
        name: 'Con ngứa về đêm-Ghẻ',
        otherNames: 'Scabies',
        description: 'Do ký sinh trùng Sarcoptes scabiei đào đường hang dưới da. Ngứa dữ dội NHẤT LÀ VỀ ĐÊM. Lây qua tiếp xúc da-da kéo dài.',
        causes: 'Ký sinh trùng ghẻ đào đường hang trong lớp sừng da, đẻ trứng. Lây qua tiếp xúc da-da kéo dài hoặc dùng chung khăn, ga giường.',
        symptoms: ['NGỨA DỮ DỘI VỀ ĐÊM – đặc trưng nhất của ghẻ', 'Đường hang xám nhạt dưới da ở kẽ ngón, cổ tay, nách, thắt lưng', 'Nốt đỏ nhỏ rải rác, có thể có mụn nước nhỏ', 'Da trầy do gãi, có thể nhiễm trùng'],
        schoolContext: 'Lây qua tiếp xúc da-da kéo dài (khó xảy ra trong lớp học thông thường, phổ biến trong gia đình, ký túc xá).',
        treatment: ['NGỪNG: Tiếp xúc da-da với người bệnh. Dùng chung khăn, ga giường.', 'RỬA: Giặt KHĂN, GA GIƯỜNG, VỚ bằng NƯỚC SÔI (>60°C) hoặc cho vào túi nilon đậy kín 72 giờ.', 'DỊU: Thoa permethrin 5% lên toàn thân từ cổ trở xuống – để qua đêm 8-12h rồi rửa sạch. Lặp lại sau 7 ngày.', 'KHÁM + TẤT CẢ NGƯỜI TRONG GIA ĐÌNH cùng điều trị đồng thời.'],
        dangerSigns: ['Ngứa không ngủ được nhiều đêm liên tiếp', 'Tổn thương lan rộng toàn thân, có mủ', 'Da trầy sâu, chảy máu, hình thành vảy dày'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/mun-boc-la-gi.png', caption: 'Ký sinh trùng ghẻ Sarcoptes scabiei dưới kính hiển vi', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-02%20175223.png', caption: 'Tổn thương ghẻ trên da với đường hang đặc trưng', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-04-02%20183232.png', caption: 'Đường hang ghẻ dưới da tại vị trí kẽ ngón tay', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov/parasites/scabies' }]
      },
      {
        id: 'mun-7',
        name: 'Nốt đỏ quanh sợi lông – Viêm nang lông',
        otherNames: 'Folliculitis',
        description: 'Viêm nang lông là tình trạng viêm nhiễm ở phần gốc (nang) sợi lông, tạo ra các nốt đỏ nhỏ hoặc mụn mủ quanh lỗ chân lông. Phổ biến ở vùng da đầu gối, cẳng chân, mặt và lưng.',
        causes: 'Vi khuẩn tụ cầu vàng (S. aureus) xâm nhập vào nang lông qua vết xước nhỏ, cạo râu, hoặc do cọ xát quần áo. Tình trạng bít tắc nang lông + mồ hôi + vệ sinh kém cũng là yếu tố.',
        symptoms: ['Nốt đỏ nhỏ hoặc mụn mủ quanh lỗ chân lông', 'Sợi lông mọc xoắn ốc hoặc không mọc được (lông quặn)', 'Vùng da quanh nang lông sưng đỏ, có thể ngứa hoặc đau nhẹ', 'Mủ trắng ở đầu nốt, vỡ ra khi gãi hoặc cạy', 'Có thể lan rộng thành nhiều nốt liên tiếp'],
        schoolContext: 'Học sinh mặc đồng phục bó sát, đạp xe, chơi thể thao → cọ xát da đầu gối, cẳng chân. Tắm muộn sau giờ sinh hoạt thể chất, mồ hôi tích tụ → vi khuẩn theo mồ hôi vào nang lông. Học sinh hay cạy mụn ở chân.',
        treatment: ['NGỪNG: Cạy, nặn, gãi vùng viêm nang lông. Mặc đồ bó sát gây cọ xát.', 'RỬA: Rửa sạch vùng da bị viêm bằng xà phòng diệt khuẩn 2 lần/ngày. Giữ da khô ráo, thay vớ sau khi đổ mồ hôi.', 'DỊU: Thoa dung dịch sát khuẩn (povidone iodine) hoặc kem kháng sinh (mupirocin) lên nốt viêm. Tránh cạo râu/lông vùng bị viêm.', 'KHÁM: Nếu viêm lan rộng, có nhiều mủ, sốt → đến da liễu cần kháng sinh uống.'],
        dangerSigns: ['Nốt đỏ lan rộng thành mảng lớn trên da đầu hoặc lưng', 'Có mủ vàng, sưng đỏ nóng quanh vùng viêm', 'Sốt kèm theo viêm nang lông', 'Lông quặn sâu dưới da, tạo u nhọt (boil/carbuncle)'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/mun-viem-o-tran-acc-1.webp', caption: 'Nốt đỏ viêm nang lông quanh sợi lông trên da – tổn thương Folliculitis', source: 'Hình ảnh minh họa bệnh Viêm nang lông' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/bat_mi_nhung_cach_tri_mun_boc_sung_do_don_gian_va_hieu_qua_1_a290bd216b.jpg', caption: 'Viêm nang lông trên da vùng cẳng chân – nốt đỏ và mụn mủ quanh nang lông', source: 'Hình ảnh minh họa viêm nang lông ở cẳng chân' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/20210726_nguyen-nhan-gay-mun-boc-2.jpg', caption: 'Viêm nang lông mãn tính – da sần, nốt đỏ li ti rải rác quanh chân lông', source: 'Hình ảnh minh họa viêm nang lông mãn tính trên da' }
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
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/20200727_071459_231570_tcm_max_1800x1800_png_96162025f3.png', caption: 'Sơ đồ minh họa tổn thương bệnh Tay - Chân - Miệng trên da', source: 'Hình ảnh minh họa bệnh Tay Chân Miệng' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/20220604_125430_223335_tre_bi_tay_chan_mie_max_1800x1800_png_174dcc6bc8.png', caption: 'Phỏng nước đặc trưng của bệnh Tay - Chân - Miệng trên bàn chân', source: 'Hình ảnh minh họa bệnh Tay Chân Miệng ở trẻ em' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/benh-tay-chan-mieng_0003301_710.jpeg', caption: 'Tổn thương phỏng nước trên lòng bàn tay do bệnh HFMD', source: 'Hình ảnh minh họa bệnh Tay Chân Miệng trên tay' }
        ],
        sources: [{ title: 'CDC', url: 'https://cdc.gov' }, { title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }]
      },
      {
        id: 'tcm-2',
        name: 'Nốt nước lắm drama-Thủy đậu',
        otherNames: 'Chickenpox, Varicella',
        description: 'Virus Varicella-Zoster. Mụn nước TRONG trên nền da ĐỎ, ngứa, sốt nhẹ. Để lại sẹo nếu gãi nhiều.',
        causes: 'Virus Varicella-Zoster lây qua giọt bắn và tiếp xúc dịch mụn nước. Một trẻ bệnh có thể lây cho nhiều bạn trong lớp.',
        symptoms: ['Sốt nhẹ, mệt mỏi, đau đầu 1-2 ngày', 'Phát ban đỏ rải rác, sau đó hình thành MỤN NƯỚC TRONG trong vài giờ', 'Mụn xuất hiện ở mặt, da đầu, thân mình, tay chân', 'Mụn khô thành vảy trong 5-10 ngày'],
        schoolContext: 'Lây rất nhanh trong trường học. Một học sinh bệnh có thể lây cho cả lớp. Cần nghỉ học ít nhất 7 ngày sau phát ban.',
        treatment: ['NGỪNG: Gãi mụn nước – để lại sẹo. Đến trường khi còn vảy chưa khô hẳn.', 'RỬA: Tắm nước ấm nhẹ nhàng. Cắt móng ngắn. Mặc đồ mềm, thoáng.', 'DỊU: Thuốc chống ngứa theo chỉ định. Chườm mát giảm ngứa.', 'KHÁM NGAY nếu sốt cao liên tục, khó thở, đau đầu dữ dội.'],
        dangerSigns: ['Sốt cao liên tục không hạ', 'Mụn nước có mủ, sưng đỏ lan rộng (nhiễm trùng da)', 'Trẻ khó thở, ho nhiều (viêm phổi)', 'Đau đầu dữ dội, cứng cổ, lú lẫn (viêm não)'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/benh-thuy-dau-2-1427963655144-484x360.jpg', caption: 'Mụn nước trong suốt đặc trưng thủy đậu trên da', source: 'Hình ảnh minh họa bệnh Thủy đậu trên da' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/benh-thuy-dau-3.webp', caption: 'Mụn nước thủy đậu chickenpox trên thân mình với nhiều vết phồng rộp', source: 'Hình ảnh minh họa bệnh Thủy đậu trên cơ thể' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/z4694962895999_7f09f119c9ab64b0374672e34e8f4b1e.jpg', caption: 'Mụn nước đặc trưng thủy đậu varicella trên da vai bệnh nhân', source: 'Hình ảnh minh họa bệnh Thủy đậu varicella' }
        ],
        sources: [{ title: 'BV Nhi TW', url: 'https://benhviennhitrunguong.vn' }]
      },
      {
        id: 'tcm-3',
        name: 'Cơn sốt nhập trường-Cúm',
        otherNames: 'Influenza',
        description: 'Virus Influenza A/B. Sốt cao ĐỘT BIẾN + đau cơ + ho + mệt MẤT ĂN NGỦ. Nặng hơn cảm thường rất nhiều.',
        causes: 'Virus Influenza lây qua giọt bắn khi ho, hắt hơi, nói chuyện. Bùng phát theo mùa (mùa lạnh, giao mùa, mùa thi).',
        symptoms: ['Sốt cao ĐỘT BIẾN 39-40°C, run rẩy, ớn lạnh', 'Đau đầu dữ dội, đau cơ toàn thân', 'Ho dữ dội, đau ngực khi ho', 'Mệt mỏi nặng, nằm liệt giường 3-5 ngày'],
        schoolContext: 'Một học sinh bệnh có thể lây cho cả lớp trong vài ngày. Phổ biến giai đoạn giao mùa, lúc thi cử.',
        treatment: ['NGỪNG: Đến trường khi đang sốt, ho, đau mỏi. Đeo khẩu trang nếu bắt buộc ra ngoài.', 'RỬA: Rửa tay thường xuyên. Dùng khăn giấy che miệng khi ho/hắt hơi.', 'DỊU: Hạ sốt bằng paracetamol. Uống nhiều nước, oresol, nước hoa quả.', 'KHÁM: Nếu sốt cao >3 ngày, khó thở, đau ngực.'],
        dangerSigns: ['Khó thở, thở nhanh, thở gấp (viêm phổi)', 'Sốt không hạ hoặc sốt lại sau 3-4 ngày', 'Đau ngực dữ dội, ho ra máu', 'Lú lẫn, không tỉnh táo, co giật'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/viruscum1-crop-1738918501629.webp', caption: 'Virus cúm Influenza H1N1 qua kính hiển vi điện tử', source: 'Hình ảnh minh họa virus cúm Influenza' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/benh-cum-mua-do-virus-cum-influenza-chung-a-va-b-gay-ra.webp', caption: 'Virus cúm Influenza A và B gây bệnh cúm mùa', source: 'Hình ảnh minh họa bệnh cúm Influenza' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/cum-01-1.png', caption: 'Người bệnh cúm Influenza với các triệu chứng mệt mỏi đau đầu toàn thân', source: 'Hình ảnh minh họa bệnh cúm mùa' }
        ],
        sources: [{ title: 'WHO', url: 'https://who.int/influenza' }]
      },
      {
        id: 'tcm-4',
        name: 'Mắt hồng hờn dỗi-Đau mắt đỏ',
        otherNames: 'Viêm kết mạc, Conjunctivitis',
        description: 'Viêm kết mạc do virus (Adenovirus) hoặc vi khuẩn. Mắt đỏ rực + ghèn/đục nhiều + chảy nước mắt. Lây LAN NHANH trong lớp.',
        causes: 'Adenovirus (phổ biến nhất) hoặc vi khuẩn (Staph, Strep). Lây qua dùng chung khăn, gối, kính, hoặc chạm tay vào dịch tiết mắt.',
        symptoms: ['Lòng trắng mắt đỏ rực, đỏ tươi hoặc hồng', 'Cảm giác cộm, rát như có cát trong mắt', 'Ghèn (đục) nhiều, buổi sáng dính mắt khó mở', 'Chảy nước mắt, sưng mí mắt, nhạy cảm ánh sáng'],
        schoolContext: 'Một ca trong lớp có thể lây cho NHIỀU BẠN trong vài ngày. Dùng chung khăn mặt, gối, kính bơi là nguy cơ cao.',
        treatment: ['NGỪNG: Dùng chung khăn, gối, kính, thuốc nhỏ mắt. Đến trường khi đang đỏ mắt nhiều ghèn.', 'RỬA: Nhỏ nước muối sinh lý (NaCl 0.9%) thường xuyên. Rửa tay xà phòng ngay sau khi chạm vào mắt.', 'DỊU: Thuốc nhỏ mắt kháng virus hoặc kháng sinh theo đơn bác sĩ.', 'KHÁM: Nếu đỏ nặng, mờ mắt, đau nhiều, hoặc không cải thiện sau 3 ngày.'],
        dangerSigns: ['Đau nhức mắt dữ dội, đau sâu vào hốc mắt', 'Nhìn mờ, suy giảm thị lực đột ngột', 'Mắt rất sợ ánh sáng, không thể mở mắt', 'Chảy mủ đặc hoặc có máu từ kết mạc'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/benh-dau-mat-do4-min.jpg', caption: 'Viêm kết mạc đỏ rực – mắt đỏ đặc trưng của bệnh đau mắt đỏ', source: 'Hình ảnh minh họa bệnh Đau mắt đỏ' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/mat-do.webp', caption: 'Mắt bị viêm kết mạc hồng đỏ từng vùng trên lòng trắng mắt', source: 'Hình ảnh minh họa mắt đỏ do viêm kết mạc' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/bi_dau_mat_do_bao_lau_thi_khoi_nhung_luu_y_can_biet_de_phuc_hoi_nhanh_4_b381ff7e32.png', caption: 'Đau mắt đỏ kết mạc với mạch máu đỏ tập trung quanh giác mạc', source: 'Hình ảnh minh họa đau mắt đỏ kết mạc' }
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
        name: 'Kẻ cướp đêm – Rối loạn giấc ngủ',
        otherNames: 'Sleep Disorder, Insomnia',
        description: 'Rối loạn giấc ngủ là tình trạng khó ngủ, ngủ không sâu giấc, hoặc thức dậy quá sớm/quá muộn. Ngủ không đủ giấc khiến học sinh mệt mỏi, khó tập trung, giảm hiệu quả học tập.',
        causes: 'Áp lực học tập, thi cử, sử dụng điện thoại/máy tính trước giờ ngủ, môi trường ồn ào, chế độ ăn uống không đều đặn, căng thẳng tâm lý.',
        symptoms: ['Khó chìm vào giấc ngủ, thức giấc nhiều lần trong đêm', 'Ngủ không sâu giấc, thức dậy vẫn mệt mỏi', 'Ngủ quá ít (<7h) hoặc quá nhiều (>10h)', 'Buồn ngủ vào giờ học, khó tập trung, nhớ kém', 'Cáu gắt, lo âu, đau đầu vào buổi sáng'],
        schoolContext: 'Học sinh thức khuya ôn bài, lướt mạng xã hội trước giờ ngủ, uống trà/cà phê buổi chiều. Áp lực thi cử khiến stress → mất ngủ. Ngủ muộn dậy sớm → thiếu ngủ mãn tính.',
        treatment: ['NGỪNG: Dùng điện thoại, xem phim, chơi game trước giờ ngủ 1 tiếng. Ăn no trước giờ ngủ.', 'RỬA: Tắt đèn, giữ phòng yên tĩnh, mát mẻ (20-22°C). Tập thở sâu hoặc thiền 5-10 phút trước khi ngủ.', 'DỊU: Ngủ đúng giờ cố định mỗi ngày (kể cả cuối tuần). Hạn chế caffeine sau 14h. Đọc sách giấy nhẹ nhàng.', 'KHÁM: Ngủ không được >3 lần/tuần kéo dài >2 tuần → gặp bác sĩ. Gọi 1800-9090 nếu cần hỗ trợ tâm lý.'],
        dangerSigns: ['Không ngủ được >3 đêm liên tiếp mà không có lý do', 'Ngủ nói mê, hoảng sợ tột độ về đêm (night terror)', 'Buồn ngủ gục trong giờ học, ngủ gật liên tục (có thể là narcolepsy)', 'Có ý nghĩ tự hại do mất ngủ kéo dài'],
        images: [
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pediatric_polysomnogram.jpg/600px-Pediatric_polysomnogram.jpg', caption: 'Đo giấc ngủ Polysomnography – phát hiện rối loạn giấc ngủ ở trẻ', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Etapes_de_la_construction_de_l%27identit%C3%A9_sexuelle_d%27un_%C3%AAtre_humain_%28sch%C3%A9ma_non_titr%C3%A9_et_non_l%C3%A9gend%C3%A9%29.svg/600px-Etapes_de_la_construction_de_l%27identit%C3%A9_sexuelle_d%27un_%C3%AAtre_humain_%28sch%C3%A9ma_non_titr%C3%A9_et_non_l%C3%A9gend%C3%A9%29.svg.png', caption: 'Biểu đồ minh họa stress và các yếu tố ảnh hưởng đến giấc ngủ tuổi học đường', source: 'Wikimedia Commons / CC BY-SA 4.0' },
          { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Early_and_late_maturing_boys_11.5_to_14.6_and_early_and_late_maturing_girls_11.5_to_14.5_yo.png/600px-Early_and_late_maturing_boys_11.5_to_14.6_and_early_and_late_maturing_girls_11.5_to_14.5_yo.png', caption: 'Thay đổi giấc ngủ và học tập ở tuổi vị thành niên do rối loạn giấc ngủ', source: 'Wikimedia Commons / CC BY-SA 4.0' }
        ],
        sources: [{ title: 'BV Tâm thần TW', url: 'https://benhvienphantin.vn' }, { title: 'Đường dây hỗ trợ 1800-9090', url: 'https://hoisongtructuyen.gov.vn' }]
      },
      {
        id: 'tl-2',
        name: 'Cơn bão hormone-dậy thì/thay đổi nội tiết',
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
        name: 'Nhiễm trùng da do tụ cầu/nhọt',
        otherNames: 'Impetigo (Staphylococcal)',
        description: 'Nhiễm trùng da do tụ cầu vàng và liên cầu. Đặc trưng bởi viêm tróc da và VÀNG NHẠT MỦ NẶNG. Phổ biến ở trẻ 2–6 tuổi, có thể tiếp tục bị ở học sinh tiểu học.',
        causes: 'Vi khuẩn tụ cầu vàng (Staphylococcus aureus) hoặc liên cầu (Streptococcus pyogenes) xâm nhập qua vết xước, mẩn đỏ, da ướt.',
        symptoms: ['Mụn nước nhỏ phát triển, vỡ dễ tạo VÀNG NHẠT MỦ nặng', 'Vi sinh vật quanh quanh mụn, ẩm nhẹ', 'Thường quanh mặt, miệng', 'Những cụm đỏ nổi, mụn, sẩn', 'Ngứa nhẹ, nổi mẩn ngứa'],
        schoolContext: 'Lây qua tiếp xúc trực tiếp trong lớp học, dùng chung khăn, gối, vật dụng cá nhân. Thời tiết nóng ẩm, mùa hè là điều kiện thuận lợi. Trẻ hay cào gãi vết thương → lan rộng.',
        treatment: ['NGỪNG: Chạm tay bẩn vào vết loét. Dùng chung khăn, gối, vật dụng.', 'RỬA: Rửa tay sạch sạch sày bằng xà phòng diệt khuẩn. Rửa vết loét 2 lần/ngày bằng nước muối sinh lý hoặc dung dịch phòng ngừa trùng.', 'DỊU: Thoa kháng sinh bôi (mupirocin) theo chỉ định. Giữ da khô ráo.', 'KHÁM: Nếu lan rộng, có sốt → cần kháng sinh uống. Nghỉ học nếu cần.'],
        dangerSigns: ['Vết loét ăn rộng nhanh, có da đen hoại tử', 'Sốt cao, mệt mỏi, đau ỉa', 'Da đỏ nóng rực, phồng rộp lớn', 'Nhiễm trùng lan rộng toàn thân ở trẻ em, da đầu'],
        images: [
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/20210607_022440_259276_nhiem_khuan_da_tu_c_max_1800x1800_jpg_766b1ed24d.jpg', caption: 'Tổn thương nhiễm trùng da do tụ cầu với vảy vàng đặc trưng', source: 'Hình ảnh minh họa bệnh Nhiễm khuẩn da' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/choc-lo-1448202947970.webp', caption: 'Nhiễm trùng da ở vùng khuỷu tay với mụn nước và vảy vàng', source: 'Hình ảnh minh họa bệnh Nhiễm khuẩn da do tụ cầu' },
          { url: 'https://raw.githubusercontent.com/dophuhung02112008/eduhealth-ai/main/public/images/articles/Screenshot%202026-03-31%20201436.png', caption: 'Nhiễm trùng da do tụ cầu trên da chân với vảy mật ong', source: 'Hình ảnh minh họa bệnh Nhiễm khuẩn da ở chân' }
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

const formatCountdown = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
const PostCard: React.FC<{ post: ActivityPost; onOpen: () => void; darkMode?: boolean }> = ({ post, onOpen, darkMode = false }) => {
  const total = post.reactions.reduce((s, r) => s + r.count, 0);
  const textPrimary = darkMode ? 'text-slate-100' : 'text-slate-800';
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-500';
  const borderColor = darkMode ? 'border-slate-700' : 'border-slate-100';
  const placeholderBg = darkMode ? 'from-slate-700 to-slate-800' : 'from-purple-100 to-pink-100';
  const typeColors = { video: 'bg-red-500', article: 'bg-blue-500', infographic: 'bg-orange-500' };
  const typeIcons = { video: '🎬', article: '📝', infographic: '🖼️' };
  return (
    <div
      onClick={onOpen}
      className={`pill-card rounded-2xl overflow-hidden cursor-pointer group transition-all duration-400 ${darkMode ? 'pill-card-dark' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {post.type === 'video' && getYouTubeEmbedUrl(post.content) ? (
          <>
            <img src={`https://img.youtube.com/vi/${post.content.match(/youtu\.be\/([^?]+)/)?.[1] || ''}/mqdefault.jpg`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e: any) => e.target.style.display = 'none'} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <PlayCircle size={28} className="text-rose-600 ml-0.5" />
              </div>
            </div>
          </>
        ) : post.type === 'infographic' && post.content ? (
          <img src={post.content} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${placeholderBg} flex items-center justify-center`}>
            <FileText size={48} className={darkMode ? 'text-slate-500' : 'text-purple-300'} />
          </div>
        )}
        {/* Pill type badge */}
        <div className={`absolute top-2 left-2 ${typeColors[post.type]} text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide shadow-lg flex items-center gap-1`}>
          <span>{typeIcons[post.type]}</span>
          <span>{post.type === 'video' ? 'Video' : post.type === 'article' ? 'Bài viết' : 'Infographic'}</span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 space-y-3 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        {/* Author */}
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md ${post.authorRole === 'Cán bộ y tế' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
            {post.authorName[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-bold truncate ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{post.authorName}</p>
            <p className={`text-[10px] ${post.authorRole === 'Cán bộ y tế' ? 'text-blue-400' : 'text-purple-400'}`}>{post.authorRole}</p>
          </div>
          <span className={`text-[10px] shrink-0 ${textSecondary} flex items-center gap-0.5`}>
            <Clock3 size={9} />
            {formatTimeAgo(post.createdAt)}
          </span>
        </div>
        {/* Title */}
        <h3 className={`font-black line-clamp-2 group-hover:text-rose-400 transition-colors duration-300 leading-snug ${textPrimary}`}>{post.title}</h3>
        {post.description && <p className={`text-xs ${textSecondary} line-clamp-2 leading-relaxed`}>{post.description}</p>}
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-rose-50 text-rose-400'}`}>#{tag}</span>
            ))}
          </div>
        )}
        {/* Stats */}
        <div className={`flex items-center gap-3 pt-2 border-t ${borderColor} text-xs ${textSecondary}`}>
          <span className="flex items-center gap-1 hover:text-rose-500 transition-colors"><Eye size={12} />{post.views}</span>
          <span className="flex items-center gap-1 hover:text-rose-500 transition-colors"><MessageCircle size={12} />{post.comments?.length || 0}</span>
          {total > 0 && (
            <span className="ml-auto flex items-center gap-1">
              {REACTION_CONFIG.filter(r => (post.reactions.find(pr => pr.type === r.type)?.count || 0) > 0).slice(0, 2).map(r => (
                <span key={r.type}>{r.emoji}</span>
              ))}
              <span className="font-bold">{total}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const PostDetail: React.FC<{ post: ActivityPost; onClose: () => void; darkMode?: boolean }> = ({ post, onClose, darkMode = false }) => {
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
          {post.description && <p className={`${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{post.description}</p>}
          {post.content && post.type === 'article' && <p className={`whitespace-pre-wrap ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{post.content}</p>}
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

const PostForm: React.FC<{ onClose: () => void; onSuccess: (p: ActivityPost) => void; darkMode?: boolean }> = ({ onClose, onSuccess, darkMode = false }) => {
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
// AI SCAN VIEW — Multimodal Dermatology Screening with Heatmap
// ═══════════════════════════════════════════════════════════════

interface ScanAnnotation {
  x: number; y: number; w: number; h: number;
  label: string;
  severity: 'high' | 'medium' | 'low';
}

interface ScanResult {
  title: string;
  category: string;
  analysis: string[];
  causes: string[];
  urgency: string;
  dangerSigns: string[];
  safetyAdvice: string[];
  confidence: 'low' | 'moderate' | 'high';
  confidence_score: number;
  confidence_note: string;
  severity: 'mild' | 'moderate' | 'severe';
  image_findings: string[];
  history_flags: string[];
  annotations: ScanAnnotation[];
  alternatives: { name: string; reason_against: string }[];
  seek_care: string;
  teen_message: string;
  // Extended analysis fields
  analysis_steps?: {
    dataQuality: { status: string; issues: string[] };
    morphology: string[];
    distribution: string[];
    symptoms: string[];
    triggers: string[];
    exclusion: string[];
    conclusion: string;
  };
}

interface SeverityConfig { bg: string; border: string; label: string; text: string; }
const SEVERITY_COLORS: Record<string, SeverityConfig> = {
  high: { bg: 'rgba(239,68,68,0.45)', border: '#ef4444', label: 'Nặng', text: 'text-red-500' },
  medium: { bg: 'rgba(245,158,11,0.45)', border: '#f59e0b', label: 'Trung bình', text: 'text-amber-500' },
  low: { bg: 'rgba(34,197,94,0.35)', border: '#22c55e', label: 'Nhẹ', text: 'text-green-500' },
};

const URGENCY_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  'self-care': { label: 'Tự chăm sóc tại nhà', color: 'text-green-600', bg: 'bg-green-50 border-green-200', icon: <CheckCircle size={16} /> },
  'routine-visit': { label: 'Nên tham vấn Y tế học đường', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', icon: <Stethoscope size={16} /> },
  'soon': { label: 'Cần đi khám chuyên khoa', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: <AlertTriangle size={16} /> },
  'urgent': { label: 'Khẩn cấp — Đi khám ngay', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', icon: <ShieldAlert size={16} /> },
  'emergency': { label: 'Cấp cứu — Gọi cấp cứu ngay!', color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: <XCircle size={16} /> },
};

const HeatmapCanvas: React.FC<{ imageSrc: string; annotations: ScanAnnotation[]; darkMode: boolean }> = ({ imageSrc, annotations, darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const drawHeatmap = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    annotations.forEach((ann, idx) => {
      const x = ann.x * canvas.width;
      const y = ann.y * canvas.height;
      const w = ann.w * canvas.width;
      const h = ann.h * canvas.height;
      const cfg = SEVERITY_COLORS[ann.severity] || SEVERITY_COLORS.low;

      // Fill
      ctx.fillStyle = cfg.bg;
      ctx.fillRect(x, y, w, h);

      // Border
      ctx.strokeStyle = cfg.border;
      ctx.lineWidth = Math.max(2, img.naturalWidth / 400);
      ctx.strokeRect(x, y, w, h);

      // Corner markers
      const corner = Math.min(w, h) * 0.1;
      ctx.lineWidth = Math.max(2, img.naturalWidth / 300);
      const corners = [[x, y, corner, corner], [x + w, y, -corner, corner], [x, y + h, corner, -corner], [x + w, y + h, -corner, -corner]];
      corners.forEach(([cx2, cy2, cw2, ch2]) => {
        ctx.beginPath();
        ctx.moveTo(cx2, cy2 + ch2);
        ctx.lineTo(cx2, cy2);
        ctx.lineTo(cx2 + cw2, cy2);
        ctx.stroke();
      });

      // Label background
      const fontSize = Math.max(12, img.naturalWidth / 45);
      ctx.font = `bold ${fontSize}px sans-serif`;
      const text = `${idx + 1}. ${ann.label}`;
      const metrics = ctx.measureText(text);
      const pad = fontSize * 0.5;
      const labelY = y - fontSize * 0.3;
      ctx.fillStyle = cfg.border;
      ctx.beginPath();
      ctx.roundRect(x, labelY - fontSize - pad, Math.min(metrics.width + pad * 2, canvas.width * 0.6), fontSize + pad * 1.2, fontSize * 0.3);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x + pad, labelY - pad);
    });
  }, [annotations]);

  useEffect(() => {
    if (imgRef.current?.complete) drawHeatmap();
  }, [drawHeatmap, imageSrc]);

  return (
    <div className="relative inline-block w-full">
      <img ref={imgRef} src={imageSrc} alt="Ảnh phân tích" className="w-full rounded-xl" onLoad={drawHeatmap} />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none" style={{ mixBlendMode: 'multiply' }} />
    </div>
  );
};

const ImageWithBoxes: React.FC<{ imageSrc: string; annotations: ScanAnnotation[] }> = ({ imageSrc, annotations }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      for (const e of entries) { setDims({ w: e.contentRect.width, h: e.contentRect.height }); }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <img src={imageSrc} alt="Ảnh phân tích" className="w-full rounded-xl" onLoad={e => { const r = e.currentTarget.getBoundingClientRect(); setDims({ w: r.width, h: r.height }); }} />
      {annotations.map((ann, idx) => {
        const cfg = SEVERITY_COLORS[ann.severity] || SEVERITY_COLORS.low;
        return (
          <div key={idx} style={{ position: 'absolute', left: `${ann.x * 100}%`, top: `${ann.y * 100}%`, width: `${ann.w * 100}%`, height: `${ann.h * 100}%`, border: `3px solid ${cfg.border}`, background: cfg.bg, borderRadius: 8 }}>
            <div style={{ position: 'absolute', bottom: '100%', left: 0, background: cfg.border, color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: '6px 6px 6px 0', whiteSpace: 'nowrap', marginBottom: 2 }}>
              {idx + 1}. {ann.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const downloadResultImage = (imageSrc: string, annotations: ScanAnnotation[], result: ScanResult) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = new window.Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    annotations.forEach((ann, idx) => {
      const x = ann.x * canvas.width, y = ann.y * canvas.height;
      const w = ann.w * canvas.width, h = ann.h * canvas.height;
      const cfg = SEVERITY_COLORS[ann.severity] || SEVERITY_COLORS.low;
      ctx.fillStyle = cfg.bg;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = cfg.border;
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = cfg.border;
      ctx.fillRect(x, y - 36, Math.min(ctx.measureText(`${idx + 1}. ${ann.label}`).width + 20, canvas.width * 0.5), 32);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${idx + 1}. ${ann.label}`, x + 10, y - 13);
    });
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, canvas.height - 70, canvas.width, 70);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`EduHealth AI: ${result.title} | Độ chắc chắn: ${result.confidence}`, 16, canvas.height - 35);
    const link = document.createElement('a');
    link.download = `eduhealth-scan-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  img.src = imageSrc;
};

// ── Checklist definitions (25 questions, 6 groups) ───────────────
const CHECKLIST_ITEMS = [
  // Nhóm 1: Ăn uống
  { key: 'q1_sugar_drinks', label: '🍦 Uống trà sữa, nước ngọt gần như mỗi ngày', group: 'food' },
  { key: 'q2_junk_food', label: '🍔 Fast food / mì tôm / snack ≥3 lần/tuần', group: 'food' },
  { key: 'q3_dairy_intake', label: '🥛 Uống sữa bò / whey / đồ nền sữa nhiều tuần này', group: 'food' },
  { key: 'q4_spicy_oily', label: '🌶️ Ăn đồ cay/nóng xong thấy mặt đỏ hoặc nổi lấm tấm', group: 'food' },
  // Nhóm 2: Giấc ngủ
  { key: 'q5_late_sleep', label: '🌙 Ngủ sau 11h30 từ 3 ngày trở lên/tuần', group: 'sleep' },
  { key: 'q6_short_sleep', label: '😴 Ngủ dưới 6-7 tiếng mỗi ngày trong tuần', group: 'sleep' },
  { key: 'q7_phone_before_sleep', label: '📱 Nằm lướt điện thoại tới lúc ngủ quên', group: 'sleep' },
  // Nhóm 3: Căng thẳng
  { key: 'q8_academic_stress', label: '😰 Căng não vì thi cử / deadline / chuyện cá nhân ≥2 tuần', group: 'stress' },
  { key: 'q9_stress_acne_link', label: '📈 Mỗi lần stress mạnh thấy mụn lên rõ hơn sau vài ngày', group: 'stress' },
  { key: 'q10_sleep_disturbed', label: '😟 Ngủ không sâu, tỉnh giấc hoặc mơ nhiều vì căng thẳng', group: 'stress' },
  // Nhóm 4: Skincare & làm sạch
  { key: 'q11_over_wash', label: '🧼 Rửa mặt >2 lần/ngày hoặc chà kỳ mạnh để "sạch mụn"', group: 'routine' },
  { key: 'q12_sleep_without_cleansing', label: '😴 Đi ngủ chưa tẩy trang hoặc rửa mặt kỹ', group: 'routine' },
  { key: 'q13_new_skincare', label: '🧴 Đổi sữa rửa mặt / kem chống nắng / serum mới trong 2 tuần', group: 'routine' },
  { key: 'q14_too_many_products', label: '💊 Bôi nhiều món trị mụn cùng lúc để "đánh nhanh"', group: 'routine' },
  { key: 'q15_heavy_products', label: '💧 Dùng kem nền / kem chống nắng / kem dưỡng khá dày, không rõ có bí da không', group: 'routine' },
  { key: 'q16_hair_fringe', label: '💇 Để tóc mái hoặc tóc bết chạm trán gần như cả ngày', group: 'routine' },
  { key: 'q17_hair_products_skin', label: '💈 Dùng sáp / gel / dầu dưỡng tóc hay xịt tóc chạm trán hoặc gáy', group: 'routine' },
  // Nhóm 5: Tay chạm mặt
  { key: 'q18_resting_hand_face', label: '✋ Hay chống cằm, sờ mặt hoặc tì má vào tay khi học', group: 'touch' },
  { key: 'q19_picking_acne', label: '🔴 Hay nặn mụn vì "nhìn ngứa mắt"', group: 'touch' },
  { key: 'q20_picking_skin', label: '🩹 Hay bóc da, cạy mụn hoặc sờ nốt mụn liên tục', group: 'touch' },
  // Nhóm 6: Mồ hôi & môi trường
  { key: 'q21_sweat_not_rinse', label: '💧 Đổ mồ hôi sau thể thao / đi đường mà để khô luôn trên da', group: 'sweat' },
  { key: 'q22_helmet_mask', label: '⏱️ Đội mũ bảo hiểm / khẩu trang / quai cặp cọ da ≥4h/ngày', group: 'sweat' },
  { key: 'q23_dirty_gear', label: '🧼 Ít giặt nón / mũ bảo hiểm / headband hoặc thay gối khi tóc dầu', group: 'sweat' },
  { key: 'q24_hot_humid_env', label: '🌡️ Chỗ học/ngủ nóng bí, ẩm hoặc bụi nhiều', group: 'sweat' },
  { key: 'q25_ac_on_face', label: '❄️ Ngồi điều hòa thổi thẳng vào mặt lâu, da hay căng rít hoặc châm chích', group: 'sweat' },
];

const SYMPTOM_ITEMS = [
  { key: 'itchy', label: '🌙 Ngứa (nhất là về đêm)', severity: 'symptom' },
  { key: 'painful', label: '🤕 Đau / Nhức', severity: 'symptom' },
  { key: 'burning', label: '🔥 Nóng rát / Châm chích', severity: 'symptom' },
  { key: 'pustular', label: '💛 Có mủ / Mụn mủ', severity: 'symptom' },
  { key: 'spreading', label: '📈 Đang lan rộng nhanh', severity: 'symptom' },
  { key: 'fever', label: '🌡️ Có sốt / Mệt mỏi', severity: 'symptom' },
  { key: 'recurring', label: '🔄 Tái đi tái lỡ nhiều lần', severity: 'symptom' },
];

// ── Main AIScanView Component ──────────────────────────────────
const AIScanView: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({});
  const [textDescription, setTextDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeTab, setActiveTab] = useState<'input' | 'result'>('input');
  const [dataQuality, setDataQuality] = useState<{ status: string; issues: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textColor = darkMode ? 'text-slate-100' : 'text-slate-800';
  const bgCard = darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-100';
  const bgCardAlt = darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setImageSrc(src);
      setImageBase64(src);
      setResult(null);
      setError(null);
      setActiveTab('input');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setImageSrc(src);
      setImageBase64(src);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!imageSrc && !textDescription.trim()) {
      setError('Vui lòng tải lên ảnh hoặc nhập mô tả triệu chứng.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload: any = {
        checklist,
        symptoms: { ...symptoms, description: textDescription, duration },
      };
      if (imageBase64) payload.imageBase64 = imageBase64;

      const res = await fetch(`${API_BASE}/api/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Lỗi server (${res.status})`);
      }
      const data = await res.json();
      const parsed: ScanResult = {
        title: data.title || 'Cần khám để xác định',
        category: data.category || 'MỤN & DA LIỄU',
        analysis: Array.isArray(data.analysis) ? data.analysis : [],
        causes: Array.isArray(data.causes) ? data.causes : [],
        urgency: data.urgency || 'Nên tham vấn Y tế học đường',
        dangerSigns: Array.isArray(data.dangerSigns) ? data.dangerSigns : [],
        safetyAdvice: Array.isArray(data.safetyAdvice) ? data.safetyAdvice : [],
        confidence: data.confidence || 'low',
        confidence_score: typeof data.confidence_score === 'number' ? data.confidence_score : (data.confidence === 'high' ? 8 : data.confidence === 'moderate' ? 6 : 3),
        confidence_note: data.confidence_note || 'Dữ liệu hạn chế, cần thêm thông tin để tăng độ chắc chắn.',
        severity: data.severity || 'moderate',
        image_findings: Array.isArray(data.image_findings) && data.image_findings.length > 0
          ? data.image_findings
          : ['Chưa phát hiện tổn thương đặc trưng rõ ràng — nên khám trực tiếp tại cơ sở y tế'],
        history_flags: Array.isArray(data.history_flags) ? data.history_flags : [],
        annotations: Array.isArray(data.annotations) && data.annotations.length > 0
          ? data.annotations
          : imageSrc ? [{ x: 0.05, y: 0.05, w: 0.90, h: 0.90, label: 'Vùng cần quan sát thêm', severity: 'medium' as const }]
          : [],
        alternatives: Array.isArray(data.alternatives) ? data.alternatives : [],
        seek_care: data.seek_care || 'routine-visit',
        teen_message: data.teen_message || 'Đừng lo, EduHealth AI đang giúp cậu khoanh vùng bước đầu.',
        analysis_steps: data.analysis_steps || null,
      };
      setResult(parsed);
      if (data.data_quality) setDataQuality(data.data_quality);
      setActiveTab('result');
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setImageBase64(null);
    setResult(null);
    setError(null);
    setChecklist({});
    setSymptoms({});
    setTextDescription('');
    setDuration('');
    setActiveTab('input');
    setDataQuality(null);
  };

  const handleDownload = () => {
    if (imageSrc && result) downloadResultImage(imageSrc, result.annotations, result);
  };

  const cfg = result ? (URGENCY_CONFIG[result.seek_care] || URGENCY_CONFIG['routine-visit']) : null;
  const confColor = result?.confidence === 'high' ? 'text-green-500' : result?.confidence === 'moderate' ? 'text-amber-500' : 'text-red-500';
  const sevColor = result?.severity === 'severe' ? 'text-red-500' : result?.severity === 'moderate' ? 'text-amber-500' : 'text-green-500';

  return (
    <div className="animate-in fade-in duration-300 space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 text-white">
          <h2 className="text-2xl font-black flex items-center gap-3"><Camera size={28} />Sàng lọc AI Thông minh</h2>
          <p className="text-white/80 mt-1 text-sm">Phân tích đa phương thức: Ảnh + Checklist + Triệu chứng → Heatmap + Khoanh vùng chẩn đoán</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {['🔍 Phân tích 7 bước', '🗺️ Heatmap đa màu', '📦 Khoanh vùng thông minh', '⬇️ Tải ảnh kết quả'].map((tag, i) => (
              <span key={i} className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className={`${bgCard} rounded-2xl p-1 flex gap-1 shadow-lg border`}>
        <button onClick={() => setActiveTab('input')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'input' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : `${textColor} opacity-60 hover:opacity-100`}`}>
          📋 Nhập dữ liệu
        </button>
        <button onClick={() => result && setActiveTab('result')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'result' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : `${textColor} opacity-60 hover:opacity-100`} ${!result ? 'cursor-not-allowed' : ''}`}>
          📊 Kết quả {result ? `(${result.confidence})` : ''}
        </button>
      </div>

      {/* ── INPUT TAB ── */}
      {activeTab === 'input' && (
        <div className="space-y-4">
          {/* Upload Zone */}
          <div
            className={`${bgCard} rounded-2xl p-6 border-2 border-dashed transition-all cursor-pointer relative overflow-hidden`}
            style={{ borderColor: imageSrc ? '#a855f7' : undefined }}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {imageSrc ? (
              <div className="relative">
                {showHeatmap && result && result.annotations.length > 0 ? (
                  <ImageWithBoxes imageSrc={imageSrc} annotations={result.annotations} />
                ) : (
                  <img src={imageSrc} alt="Preview" className="w-full rounded-xl max-h-80 object-contain" />
                )}
                <button onClick={e => { e.stopPropagation(); handleReset(); }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload size={36} />
                </div>
                <p className={`font-bold ${textColor}`}>Kéo & thả ảnh vào đây</p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>Hoặc nhấn để chọn file (JPG, PNG, WEBP)</p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-slate-500' : 'text-slate-300'}`}>Hỗ trợ chụp close-up vùng tổn thương da</p>
              </div>
            )}
          </div>

          {/* Checklist - 25 questions in 6 groups */}
          <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
            <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}><Layers size={16} />Yếu tố nguy cơ (Checklist)</h3>
            {/* Group 1: Ăn uống */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1.5">🍽️ Chuyện ăn uống</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CHECKLIST_ITEMS.filter(i => i.group === 'food').map(item => (
                  <label key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-xs ${checklist[item.key] ? (darkMode ? 'bg-amber-900/30 border border-amber-500/60' : 'bg-amber-50 border border-amber-200') : (darkMode ? 'bg-slate-700/50 border border-transparent hover:border-slate-600' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                    <input type="checkbox" checked={!!checklist[item.key]} onChange={e => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))} className="w-3.5 h-3.5 accent-amber-500 rounded" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Group 2: Giấc ngủ */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1.5">😴 Chuyện ngủ nghỉ</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CHECKLIST_ITEMS.filter(i => i.group === 'sleep').map(item => (
                  <label key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-xs ${checklist[item.key] ? (darkMode ? 'bg-blue-900/30 border border-blue-500/60' : 'bg-blue-50 border border-blue-200') : (darkMode ? 'bg-slate-700/50 border border-transparent hover:border-slate-600' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                    <input type="checkbox" checked={!!checklist[item.key]} onChange={e => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))} className="w-3.5 h-3.5 accent-blue-500 rounded" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Group 3: Căng thẳng */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mb-1.5">😰 Chuyện căng não</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CHECKLIST_ITEMS.filter(i => i.group === 'stress').map(item => (
                  <label key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-xs ${checklist[item.key] ? (darkMode ? 'bg-rose-900/30 border border-rose-500/60' : 'bg-rose-50 border border-rose-200') : (darkMode ? 'bg-slate-700/50 border border-transparent hover:border-slate-600' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                    <input type="checkbox" checked={!!checklist[item.key]} onChange={e => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))} className="w-3.5 h-3.5 accent-rose-500 rounded" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Group 4: Skincare & làm sạch */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-500 mb-1.5">🧴 Skincare & làm sạch</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CHECKLIST_ITEMS.filter(i => i.group === 'routine').map(item => (
                  <label key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-xs ${checklist[item.key] ? (darkMode ? 'bg-teal-900/30 border border-teal-500/60' : 'bg-teal-50 border border-teal-200') : (darkMode ? 'bg-slate-700/50 border border-transparent hover:border-slate-600' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                    <input type="checkbox" checked={!!checklist[item.key]} onChange={e => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))} className="w-3.5 h-3.5 accent-teal-500 rounded" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Group 5: Tay chạm mặt */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-1.5">✋ Chuyện tay chân với mặt</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CHECKLIST_ITEMS.filter(i => i.group === 'touch').map(item => (
                  <label key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-xs ${checklist[item.key] ? (darkMode ? 'bg-orange-900/30 border border-orange-500/60' : 'bg-orange-50 border border-orange-200') : (darkMode ? 'bg-slate-700/50 border border-transparent hover:border-slate-600' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                    <input type="checkbox" checked={!!checklist[item.key]} onChange={e => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))} className="w-3.5 h-3.5 accent-orange-500 rounded" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Group 6: Mồ hôi & môi trường */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 mb-1.5">💧 Mồ hôi & môi trường</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CHECKLIST_ITEMS.filter(i => i.group === 'sweat').map(item => (
                  <label key={item.key} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-xs ${checklist[item.key] ? (darkMode ? 'bg-cyan-900/30 border border-cyan-500/60' : 'bg-cyan-50 border border-cyan-200') : (darkMode ? 'bg-slate-700/50 border border-transparent hover:border-slate-600' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                    <input type="checkbox" checked={!!checklist[item.key]} onChange={e => setChecklist(p => ({ ...p, [item.key]: e.target.checked }))} className="w-3.5 h-3.5 accent-cyan-500 rounded" />
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
            <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}><ActivityIcon size={16} />Triệu chứng</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SYMPTOM_ITEMS.map(item => (
                <label key={item.key} className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all text-sm ${symptoms[item.key] ? (darkMode ? 'bg-rose-900/40 border border-rose-500' : 'bg-rose-50 border border-rose-200') : (darkMode ? 'bg-slate-700 border border-transparent' : 'bg-slate-50 border border-transparent hover:border-slate-200')}`}>
                  <input type="checkbox" checked={!!symptoms[item.key]} onChange={e => setSymptoms(p => ({ ...p, [item.key]: e.target.checked }))} className="w-4 h-4 accent-rose-500 rounded" />
                  <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Text description */}
          <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
            <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}><MessageSquare size={16} />Mô tả thêm (tùy chọn)</h3>
            <textarea
              value={textDescription}
              onChange={e => setTextDescription(e.target.value)}
              placeholder="Mô tả chi tiết tình trạng: vị trí, hình dạng, thay đổi theo thời gian, đã dùng thuốc gì chưa..."
              rows={4}
              className={`w-full rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${darkMode ? 'bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400'}`}
            />
            <input
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="Thời gian xuất hiện: ví dụ '3 ngày', '2 tuần', 'từ tháng trước'..."
              className={`w-full mt-2 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${darkMode ? 'bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400'}`}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-2">
              <XCircle size={16} /> {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleScan}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]'}`}
          >
            {loading ? (
              <><div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /><span>Đang phân tích 7 bước...</span></>
            ) : (
              <><Zap size={22} /><span>Phân tích ngay với AI</span></>
            )}
          </button>
          <p className={`text-center text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>⚠️ Kết quả chỉ mang tính tham khảo, KHÔNG thay thế chẩn đoán y khoa. Luôn tham vấn bác sĩ.</p>
        </div>
      )}

      {/* ── RESULT TAB ── */}
      {activeTab === 'result' && result && (
        <div className="space-y-4">
          {/* Urgency Banner */}
          {cfg && (
            <div className={`${cfg.bg} border-2 rounded-2xl p-4 flex items-center gap-3`}>
              <div className={`${cfg.color}`}>{cfg.icon}</div>
              <div>
                <p className={`font-black text-sm ${cfg.color}`}>{cfg.label}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>Hành động khuyến nghị từ EduHealth AI</p>
              </div>
            </div>
          )}

          {/* Main Diagnosis Card */}
          <div className={`${bgCard} rounded-2xl p-5 shadow-xl border-2 border-purple-200`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>{result.category}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sevColor} ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>Mức độ: {result.severity === 'severe' ? 'Nặng' : result.severity === 'moderate' ? 'Trung bình' : 'Nhẹ'}</span>
                </div>
                <h2 className={`text-xl font-black ${textColor}`}>{result.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`flex items-center gap-1 font-bold text-sm ${confColor}`}>
                    <StarHalf size={14} />Độ chắc chắn: {result.confidence === 'high' ? 'Cao' : result.confidence === 'moderate' ? 'Trung bình' : 'Thấp'} ({result.confidence_score}/10)
                  </div>
                </div>
                {result.confidence_note && <p className={`text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>{result.confidence_note}</p>}
              </div>
            </div>
            {result.teen_message && (
              <div className={`mt-3 p-3 rounded-xl text-sm ${darkMode ? 'bg-purple-900/40 text-purple-200' : 'bg-purple-50 text-purple-700'} border border-purple-200`}>
                💬 {result.teen_message}
              </div>
            )}
          </div>

          {/* ── Heatmap / Image ── */}
          {imageSrc && (
            <div className={`${bgCard} rounded-2xl p-4 shadow-xl border`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers size={16} className={darkMode ? 'text-rose-400' : 'text-rose-600'} />
                  <h3 className={`font-black text-sm ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>Bản đồ nhiệt & Khoanh vùng</h3>
                  {result.annotations.length === 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                      Cần thêm dữ liệu
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowHeatmap(!showHeatmap)} className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${showHeatmap ? 'bg-purple-500 text-white' : (darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500')}`}>
                    {showHeatmap ? '🔍 Đang hiện heatmap' : '👁️ Ẩn heatmap'}
                  </button>
                  <button onClick={handleDownload} className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    <Download size={12} />Tải ảnh
                  </button>
                </div>
              </div>

              {/* Color Legend */}
              <div className="flex gap-3 mb-3 flex-wrap">
                {(['high', 'medium', 'low'] as const).map(sev => (
                  <div key={sev} className="flex items-center gap-1.5 text-xs font-bold">
                    <div className="w-4 h-4 rounded border-2" style={{ background: SEVERITY_COLORS[sev].bg, borderColor: SEVERITY_COLORS[sev].border }} />
                    <span className={SEVERITY_COLORS[sev].text}>{SEVERITY_COLORS[sev].label}</span>
                  </div>
                ))}
              </div>

              {/* Image with or without heatmap boxes */}
              <div className="relative rounded-xl overflow-hidden">
                {showHeatmap && result.annotations.length > 0 ? (
                  <ImageWithBoxes imageSrc={imageSrc} annotations={result.annotations} />
                ) : (
                  <img src={imageSrc} alt="Ảnh phân tích" className="w-full rounded-xl" />
                )}
                {/* Overlay warning when no detailed annotations */}
                {result.annotations.length > 0 && result.annotations[0]?.label === 'Vùng cần quan sát thêm' && (
                  <div className={`absolute bottom-2 left-2 right-2 text-center py-1.5 px-3 rounded-xl text-xs font-bold ${darkMode ? 'bg-amber-900/80 text-amber-200' : 'bg-amber-100/90 text-amber-700'} backdrop-blur-sm`}>
                    ⚡ Ảnh chưa đủ rõ để khoanh chi tiết — vùng trên là ước lượng. Hãy cung cấp thêm mô tả triệu chứng để tăng độ chính xác.
                  </div>
                )}
              </div>

              {/* Annotation List */}
              <div className="mt-3 space-y-2">
                {result.annotations.map((ann, idx) => {
                  const c = SEVERITY_COLORS[ann.severity] || SEVERITY_COLORS.low;
                  return (
                    <div key={idx} className={`flex items-start gap-3 p-2.5 rounded-xl border ${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5" style={{ background: c.border }}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <span className={`font-bold text-sm ${c.text}`}>{ann.label}</span>
                        <span className={`text-xs ml-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>({c.label})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Image Findings */}
          {result.image_findings.length > 0 && (
            <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
              <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}><Eye size={16} />Phát hiện từ ảnh</h3>
              <div className="flex flex-wrap gap-2">
                {result.image_findings.map((f, i) => (
                  <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-full ${darkMode ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-700' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'}`}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Steps */}
          {result.analysis.length > 0 && (
            <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
              <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}><ActivityIcon size={16} />Phân tích chi tiết (7 bước)</h3>
              <div className="space-y-3">
                {result.analysis.map((step, idx) => (
                  <div key={idx} className={`flex gap-3 p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ${darkMode ? 'bg-amber-600' : 'bg-amber-500'}`}>{idx + 1}</div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Causes & Triggers */}
          {result.causes.length > 0 && (
            <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
              <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}><Bug size={16} />Nguyên nhân & Yếu tố khởi phát</h3>
              <ul className="space-y-2">
                {result.causes.map((c, i) => (
                  <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    <span className={darkMode ? 'text-orange-400 mt-0.5' : 'text-orange-500 mt-0.5'}>▸</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety Advice */}
          {result.safetyAdvice.length > 0 && (
            <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
              <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}><ShieldCheck size={16} />Hướng dẫn an toàn</h3>
              <ul className="space-y-2">
                {result.safetyAdvice.map((a, i) => (
                  <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    <span className={darkMode ? 'text-green-400 mt-0.5' : 'text-green-500 mt-0.5'}>✓</span>{a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Danger Signs */}
          {result.dangerSigns.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 shadow-lg">
              <h3 className="font-black text-sm flex items-center gap-2 mb-3 text-red-600"><ShieldAlert size={16} />Dấu hiệu nguy hiểm — Cần đi khám ngay!</h3>
              <ul className="space-y-2">
                {result.dangerSigns.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <span className="text-red-500 mt-0.5">⚠</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternatives */}
          {result.alternatives.length > 0 && (
            <div className={`${bgCard} rounded-2xl p-4 shadow-lg border`}>
              <h3 className={`font-black text-sm flex items-center gap-2 mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}><ChevronRight size={16} />Chẩn đoán phân biệt khác</h3>
              <div className="space-y-2">
                {result.alternatives.map((alt, i) => (
                  <div key={i} className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                    <span className={`font-bold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{alt.name}</span>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>Lý do ít phù hợp: {alt.reason_against}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Quality Warning */}
          {dataQuality && dataQuality.status !== 'adequate' && (
            <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
              <p className={`font-bold text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>⚡ Chất lượng dữ liệu: {dataQuality.status}</p>
              {dataQuality.issues.map((issue, i) => (
                <p key={i} className={`text-xs mt-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>• {issue}</p>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleReset} className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${darkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              <RefreshCw size={16} />Phân tích mới
            </button>
            <button onClick={handleDownload} disabled={!imageSrc} className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${imageSrc ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
              <FileDown size={16} />Tải ảnh kết quả
            </button>
          </div>

          {/* Find Care Button */}
          <button
            onClick={() => (window as any).__openFindCare?.()}
            className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] animate-pulse-ring"
            style={{ animation: 'glowPulse 2.5s ease-in-out infinite, pulseRing 2s ease-in-out infinite' }}
          >
            <MapPin size={22} />
            🏥 Tìm cơ sở y tế gần bạn
          </button>
        </div>
      )}

      {activeTab === 'result' && !result && (
        <div className={`${bgCard} rounded-2xl p-12 text-center shadow-lg border`}>
          <Stethoscope size={56} className={`mx-auto mb-3 opacity-30 ${textColor}`} />
          <p className={`font-bold ${textColor}`}>Chưa có kết quả phân tích</p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>Vui lòng nhập dữ liệu và nhấn "Phân tích ngay với AI"</p>
          <button onClick={() => setActiveTab('input')} className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
            ← Quay lại nhập dữ liệu
          </button>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FIND CARE MODAL — Interactive Map with Hospitals & Pharmacies
// ═══════════════════════════════════════════════════════════════

interface Facility {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance?: string;
  rating: number;
  type: 'hospital' | 'pharmacy';
  lat: number;
  lng: number;
  specialty?: string;
  openHours: string;
  badge?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: string;
  navUrl: string;
}

// Facilities across 5 major cities — sorted by GPS distance from user
const SAMPLE_FACILITIES: Facility[] = [
  // HÀ NỘI
  { id: 'h1-hn', name: 'Bệnh viện Da liễu Trung ương', address: '29 Hà Kỳ Martina, Quang Trung, Đống Đa, Hà Nội', phone: '024 3852 4326', rating: 4.7, type: 'hospital', lat: 21.0038, lng: 105.8253, specialty: 'Da liễu', openHours: '07:00–17:00 (T2–T7)', badge: 'Chuyên khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0061,105.8256' },
  { id: 'h2-hn', name: 'Bệnh viện Bạch Mai', address: '78 Đường Giải Phóng, Phương Đình, Đống Đa, Hà Nội', phone: '024 3869 3731', rating: 4.8, type: 'hospital', lat: 21.0033, lng: 105.8417, specialty: 'Đa khoa – Cấp cứu', openHours: '06:30–17:00 (T2–CN)', badge: 'Tuyến TW', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0033,105.8417' },
  { id: 'h3-hn', name: 'Bệnh viện Nhi Trung ương', address: '18/879 Đường La Thành, Đống Đa, Hà Nội', phone: '024 6273 8537', rating: 4.6, type: 'hospital', lat: 21.0289, lng: 105.8203, specialty: 'Nhi khoa', openHours: '07:00–16:30 (T2–T6)', badge: 'Chuyên khoa Nhi', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0289,105.8203' },
  { id: 'h4-hn', name: 'Bệnh viện Đại học Y Hà Nội', address: '1 Tôn Thất Tùng, Đống Đa, Hà Nội', phone: '024 3857 4238', rating: 4.5, type: 'hospital', lat: 21.0022, lng: 105.8167, specialty: 'Đa khoa – Giảng dạy', openHours: '07:30–16:30 (T2–T6)', badge: 'Đa khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0022,105.8167' },
  { id: 'h5-hn', name: 'Viện Y học Cổ truyền Trung ương', address: '168 Nguyễn Lương Bằng, Đống Đa, Hà Nội', phone: '024 3577 5827', rating: 4.4, type: 'hospital', lat: 21.0122, lng: 105.8092, specialty: 'Y học cổ truyền – Da liễu', openHours: '07:00–17:00 (T2–T6)', badge: 'Y học cổ truyền', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0122,105.8092' },
  { id: 'p1-hn', name: 'Nhà thuốc Long Châu Hà Nội', address: '140 Cầu Giấy, Phường Dịch Vọng, Cầu Giấy, Hà Nội', phone: '028 3848 2002', rating: 4.6, type: 'pharmacy', lat: 21.0383, lng: 105.7917, specialty: 'Thuốc không kê đơn, Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0383,105.7917' },
  { id: 'p2-hn', name: 'Nhà thuốc Pharmacity Hà Nội', address: '56 Tôn Thất Thuyết, Mỹ Đình 2, Nam Từ Liêm, Hà Nội', phone: '028 3848 2002', rating: 4.5, type: 'pharmacy', lat: 21.0278, lng: 105.7750, specialty: 'Dược phẩm – Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0278,105.7750' },
  { id: 'p3-hn', name: 'Hiệu thuốc 89 Hà Tây', address: '89 Trần Duy Hưng, Cầu Giấy, Hà Nội', phone: '024 3562 8901', rating: 4.7, type: 'pharmacy', lat: 21.0100, lng: 105.7833, specialty: 'Thuốc da liễu, Y học cổ truyền', openHours: '07:30–21:30 (T2–CN)', badge: 'Chuyên da liễu', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0100,105.7833' },
  { id: 'p4-hn', name: 'Nhà thuốc Phúc An Hà Nội', address: '32 Thái Hà, Trung Liệt, Đống Đa, Hà Nội', phone: '024 3512 5678', rating: 4.4, type: 'pharmacy', lat: 21.0150, lng: 105.8150, specialty: 'Thuốc da liễu, Dược mỹ phẩm', openHours: '08:00–21:00 (T2–T7)', badge: 'Chuyên da liễu', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0150,105.8150' },
  { id: 'p5-hn', name: 'Nhà thuốc Đông Y Tuệ Tĩnh Hà Nội', address: '16 Lê Văn Hưu, Nam Từ Liêm, Hà Nội', phone: '024 3789 1234', rating: 4.8, type: 'pharmacy', lat: 21.0233, lng: 105.7633, specialty: 'Thuốc Đông Y, Y học cổ truyền', openHours: '07:00–20:00 (T2–CN)', badge: 'Đông Y', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0233,105.7633' },
  // ĐÀ NẴNG
  { id: 'h1-dn', name: 'Bệnh viện Da liễu TP Đà Nẵng', address: '121 Lê Lợi, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3821 678', rating: 4.5, type: 'hospital', lat: 16.0544, lng: 108.2022, specialty: 'Da liễu', openHours: '07:00–17:00 (T2–T7)', badge: 'Chuyên khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0544,108.2022' },
  { id: 'h2-dn', name: 'Bệnh viện Đa khoa Đà Nẵng', address: '124 Hùng Vương, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3821 234', rating: 4.6, type: 'hospital', lat: 16.0678, lng: 108.2130, specialty: 'Đa khoa – Cấp cứu', openHours: '06:00–22:00 (Mở hàng ngày)', badge: 'Tuyến TW', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0678,108.2130' },
  { id: 'h3-dn', name: 'Bệnh viện Phụ sản – Nhi Đà Nẵng', address: '402 Lê Đình Dương, Quận Thanh Khê, TP Đà Nẵng', phone: '0236 3715 879', rating: 4.7, type: 'hospital', lat: 16.0689, lng: 108.1876, specialty: 'Nhi khoa, Sản', openHours: '07:00–17:00 (T2–T7)', badge: 'Chuyên khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0689,108.1876' },
  { id: 'h4-dn', name: 'Bệnh viện Y học Cổ truyền Đà Nẵng', address: '33 Lê Doãn Nhạc, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3565 234', rating: 4.3, type: 'hospital', lat: 16.0595, lng: 108.2156, specialty: 'Y học cổ truyền, Da liễu', openHours: '07:00–17:00 (T2–T6)', badge: 'Y học cổ truyền', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0595,108.2156' },
  { id: 'h5-dn', name: 'Bệnh viện Hoàn Mỹ Đà Nẵng', address: '96 Ngô Quyền, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3889 999', rating: 4.8, type: 'hospital', lat: 16.0522, lng: 108.2210, specialty: 'Đa khoa, Chuyên khoa', openHours: '07:00–21:00 (Mở hàng ngày)', badge: 'Tư nhân', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0522,108.2210' },
  { id: 'p1-dn', name: 'Nhà thuốc Long Châu Đà Nẵng', address: '234 Nguyễn Văn Linh, Quận Thanh Khê, TP Đà Nẵng', phone: '0236 3689 000', rating: 4.6, type: 'pharmacy', lat: 16.0623, lng: 108.1956, specialty: 'Thuốc không kê đơn, Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0623,108.1956' },
  { id: 'p2-dn', name: 'Nhà thuốc Pharmacity Đà Nẵng', address: '89 Trần Phú, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3899 000', rating: 4.5, type: 'pharmacy', lat: 16.0712, lng: 108.2218, specialty: 'Dược phẩm – Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0712,108.2218' },
  { id: 'p3-dn', name: 'Hiệu thuốc Đông Y An Khê Đà Nẵng', address: '45 Đống Đa, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3823 456', rating: 4.7, type: 'pharmacy', lat: 16.0670, lng: 108.2090, specialty: 'Thuốc Đông Y, Y học cổ truyền', openHours: '07:30–21:00 (T2–CN)', badge: 'Đông Y', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0670,108.2090' },
  { id: 'p4-dn', name: 'Nhà thuốc Gia Phú Đà Nẵng', address: '12 Trần Quốc Toản, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3890 123', rating: 4.4, type: 'pharmacy', lat: 16.0548, lng: 108.2170, specialty: 'Thuốc da liễu, Dược mỹ phẩm', openHours: '07:00–21:00 (T2–CN)', badge: 'Chuyên da liễu', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0548,108.2170' },
  { id: 'p5-dn', name: 'Nhà thuốc Phúc An Đà Nẵng', address: '168 Lê Duẩn, Quận Hải Châu, TP Đà Nẵng', phone: '0236 3888 999', rating: 4.5, type: 'pharmacy', lat: 16.0600, lng: 108.2070, specialty: 'Thuốc da liễu, Y tế', openHours: '07:00–21:30 (Mở hàng ngày)', badge: 'Chuyên da liễu', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.0600,108.2070' },
  // TP.HCM
  { id: 'h1-hcm', name: 'Bệnh viện Da liễu TP.HCM', address: '2 Nguyễn Thông, Phường 6, Quận 3, TP.HCM', phone: '028 3930 8131', rating: 4.7, type: 'hospital', lat: 10.7835, lng: 106.6880, specialty: 'Da liễu', openHours: '07:00–17:00 (T2–T7)', badge: 'Chuyên khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7835,106.6880' },
  { id: 'h2-hcm', name: 'Bệnh viện Chợ Rẫy', address: '201B Nguyễn Chí Thanh, Quận 5, TP.HCM', phone: '028 3855 4138', rating: 4.8, type: 'hospital', lat: 10.7549, lng: 106.6869, specialty: 'Đa khoa – Cấp cứu', openHours: '06:00–16:00 (T2–T7)', badge: 'Tuyến TW', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7549,106.6869' },
  { id: 'h3-hcm', name: 'Bệnh viện Nhi đồng 1', address: '341 Điện Biên Phủ, Quận 3, TP.HCM', phone: '028 3927 1123', rating: 4.6, type: 'hospital', lat: 10.7806, lng: 106.6849, specialty: 'Nhi khoa', openHours: '07:00–16:30 (T2–T6)', badge: 'Chuyên khoa Nhi', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7806,106.6849' },
  { id: 'h4-hcm', name: 'Bệnh viện Đại học Y Dược TP.HCM', address: '215 Hồng Bàng, Quận 5, TP.HCM', phone: '028 3923 4567', rating: 4.5, type: 'hospital', lat: 10.7509, lng: 106.6854, specialty: 'Đa khoa – Giảng dạy', openHours: '07:30–16:30 (T2–T6)', badge: 'Đa khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7509,106.6854' },
  { id: 'h5-hcm', name: 'Viện Y học Cổ truyền TP.HCM', address: '179 Nguyễn Chí Thanh, Quận 5, TP.HCM', phone: '028 3927 8901', rating: 4.4, type: 'hospital', lat: 10.7562, lng: 106.6848, specialty: 'Y học cổ truyền – Da liễu', openHours: '07:00–17:00 (T2–T6)', badge: 'Y học cổ truyền', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7562,106.6848' },
  { id: 'p1-hcm', name: 'Nhà thuốc Long Châu TP.HCM', address: '700 Trần Hưng Đạo, Quận 5, TP.HCM', phone: '028 3927 8900', rating: 4.6, type: 'pharmacy', lat: 10.7538, lng: 106.6890, specialty: 'Thuốc không kê đơn, Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7538,106.6890' },
  { id: 'p2-hcm', name: 'Nhà thuốc Pharmacity Quận 3 TP.HCM', address: '200 Cách Mạng Tháng 8, Quận 3, TP.HCM', phone: '028 3930 9000', rating: 4.5, type: 'pharmacy', lat: 10.7845, lng: 106.6855, specialty: 'Dược phẩm – Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7845,106.6855' },
  { id: 'p3-hcm', name: 'Nhà thuốc Đông Y Sài Gòn', address: '45 Lê Quang Định, Quận Bình Thạnh, TP.HCM', phone: '028 3512 8901', rating: 4.7, type: 'pharmacy', lat: 10.8035, lng: 106.7089, specialty: 'Thuốc Đông Y, Y học cổ truyền', openHours: '07:30–21:00 (T2–CN)', badge: 'Đông Y', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.8035,106.7089' },
  { id: 'p4-hcm', name: 'Nhà thuốc Phúc An TP.HCM', address: '33 Nguyễn Trãi, Quận 1, TP.HCM', phone: '028 3923 4567', rating: 4.4, type: 'pharmacy', lat: 10.7725, lng: 106.6956, specialty: 'Thuốc da liễu, Dược mỹ phẩm', openHours: '07:00–21:00 (Mở hàng ngày)', badge: 'Chuyên da liễu', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7725,106.6956' },
  { id: 'p5-hcm', name: 'Nhà thuốc Gia Phú TP.HCM', address: '88 Lê Lai, Quận 1, TP.HCM', phone: '028 3923 1234', rating: 4.5, type: 'pharmacy', lat: 10.7728, lng: 106.6888, specialty: 'Thuốc da liễu, Y tế', openHours: '07:00–21:30 (Mở hàng ngày)', badge: 'Chuyên da liễu', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.7728,106.6888' },
  // HUẾ
  { id: 'h1-hue', name: 'Bệnh viện Da liễu Huế', address: '78 Đường Lê Lợi, TP Huế', phone: '0234 3822 456', rating: 4.4, type: 'hospital', lat: 16.4678, lng: 107.5890, specialty: 'Da liễu', openHours: '07:00–17:00 (T2–T7)', badge: 'Chuyên khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.4678,107.5890' },
  { id: 'h2-hue', name: 'Bệnh viện Trung ương Huế', address: '16 Lê Lợi, TP Huế', phone: '0234 3823 123', rating: 4.7, type: 'hospital', lat: 16.4623, lng: 107.5834, specialty: 'Đa khoa – Tuyến TW', openHours: '06:30–17:00 (T2–CN)', badge: 'Tuyến TW', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.4623,107.5834' },
  { id: 'p1-hue', name: 'Nhà thuốc Đông Y Huế', address: '34 Đường Lê Lợi, TP Huế', phone: '0234 3889 000', rating: 4.6, type: 'pharmacy', lat: 16.4645, lng: 107.5850, specialty: 'Thuốc Đông Y, Y học cổ truyền', openHours: '07:00–21:00 (Mở hàng ngày)', badge: 'Đông Y', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.4645,107.5850' },
  { id: 'p2-hue', name: 'Nhà thuốc Pharmacity Huế', address: '12 Nguyễn Huệ, TP Huế', phone: '0234 3900 000', rating: 4.5, type: 'pharmacy', lat: 16.4689, lng: 107.5900, specialty: 'Dược phẩm – Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.4689,107.5900' },
  // CẦN THƠ
  { id: 'h1-ct', name: 'Bệnh viện Da liễu Cần Thơ', address: '56 Đường 3 Tháng 2, Quận Ninh Kiều, Cần Thơ', phone: '0292 3823 456', rating: 4.3, type: 'hospital', lat: 10.0345, lng: 105.7878, specialty: 'Da liễu', openHours: '07:00–17:00 (T2–T7)', badge: 'Chuyên khoa', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.0345,105.7878' },
  { id: 'h2-ct', name: 'Bệnh viện Đa khoa Trung ương Cần Thơ', address: '315 Đường Nguyễn Văn Linh, Cần Thơ', phone: '0292 3829 000', rating: 4.6, type: 'hospital', lat: 10.0321, lng: 105.7834, specialty: 'Đa khoa – Tuyến TW', openHours: '06:30–17:00 (T2–CN)', badge: 'Tuyến TW', color: '#ef4444', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', icon: '🏥', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.0321,105.7834' },
  { id: 'p1-ct', name: 'Nhà thuốc Long Châu Cần Thơ', address: '89 Đường 30 Tháng 4, Quận Ninh Kiều, Cần Thơ', phone: '0292 3890 000', rating: 4.5, type: 'pharmacy', lat: 10.0378, lng: 105.7867, specialty: 'Thuốc không kê đơn, Y tế', openHours: '07:00–22:00 (Mở hàng ngày)', badge: 'Chuỗi nhà thuốc', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.0378,105.7867' },
  { id: 'p2-ct', name: 'Nhà thuốc Đông Y Cần Thơ', address: '34 Đường Hai Bà Trưng, Quận Ninh Kiều, Cần Thơ', phone: '0292 3899 123', rating: 4.6, type: 'pharmacy', lat: 10.0322, lng: 105.7900, specialty: 'Thuốc Đông Y, Y học cổ truyền', openHours: '07:00–21:00 (T2–CN)', badge: 'Đông Y', color: '#10b981', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600', icon: '💊', navUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.0322,105.7900' },
];

// ── City detection map (city name → approximate center coords) ──
const CITY_MAP: Record<string, { lat: number; lng: number; label: string }> = {
  'Hà Nội':    { lat: 21.0285, lng: 105.8020, label: 'Hà Nội' },
  'Đà Nẵng':   { lat: 16.0544, lng: 108.2022, label: 'Đà Nẵng' },
  'TP.HCM':    { lat: 10.7769, lng: 106.7009, label: 'TP.HCM' },
  'Huế':       { lat: 16.4623, lng: 107.5834, label: 'Huế' },
  'Cần Thơ':   { lat: 10.0345, lng: 105.7878, label: 'Cần Thơ' },
};

function detectCity(lat: number, lng: number): string {
  let best = 'Hà Nội';
  let minDist = Infinity;
  for (const [city, c] of Object.entries(CITY_MAP)) {
    const dist = Math.sqrt((lat - c.lat) ** 2 + (lng - c.lng) ** 2);
    if (dist < minDist) { minDist = dist; best = city; }
  }
  return best;
}

const FindCareModal: React.FC<{ darkMode: boolean; onClose: () => void; initialTab?: 'hospital' | 'pharmacy' }> = ({ darkMode, onClose, initialTab }) => {
  const [activeTab, setActiveTab] = useState<'hospital' | 'pharmacy'>(initialTab || 'hospital');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState<string>('Hà Nội');
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const [facilities, setFacilities] = useState<Facility[]>(SAMPLE_FACILITIES);
  const textColor = darkMode ? 'text-slate-100' : 'text-slate-800';
  const bgCard = darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-100';
  const bgCardAlt = darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100';

  // ── Haversine distance ──────────────────────────────────────
  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // ── Geolocation + sort + city-filter facilities ───────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Trình duyệt không hỗ trợ định vị.');
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const loc = { lat, lng };
        setUserLocation(loc);

        // Detect nearest city
        const nearestCity = detectCity(lat, lng);
        setCurrentCity(nearestCity);

        // Filter facilities to nearest city only + sort by distance
        const cityFacilities = SAMPLE_FACILITIES.filter(f => {
          const facilityCity = CITY_MAP['Hà Nội'].label; // fallback
          // Match by checking which city center is closest to facility coords
          let best = 'Hà Nội';
          let bestDist = Infinity;
          for (const [, c] of Object.entries(CITY_MAP)) {
            const d = Math.sqrt((f.lat - c.lat) ** 2 + (f.lng - c.lng) ** 2);
            if (d < bestDist) { bestDist = d; best = CITY_MAP[Object.keys(CITY_MAP).find(k => CITY_MAP[k] === c)!]?.label || best; }
          }
          const fc = detectCity(f.lat, f.lng);
          return fc === nearestCity;
        });

        const sorted = cityFacilities.map(f => ({
          ...f,
          distance: getDistance(lat, lng, f.lat, f.lng).toFixed(1) + ' km',
        })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        // If no facilities in nearest city, fall back to all sorted
        setFacilities(sorted.length > 0 ? sorted : SAMPLE_FACILITIES.map(f => ({
          ...f,
          distance: getDistance(lat, lng, f.lat, f.lng).toFixed(1) + ' km',
        })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)));
      },
      (err) => {
        setGeoError('Không lấy được vị trí. Đang dùng vị trí mặc định Hà Nội.');
        setUserLocation({ lat: 21.0285, lng: 105.8020 });
        setCurrentCity('Hà Nội');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const hospitals = facilities.filter(f => f.type === 'hospital');
  const pharmacies = facilities.filter(f => f.type === 'pharmacy');
  const activeFacilities = activeTab === 'hospital' ? hospitals : pharmacies;

  // Init Leaflet map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;
    if (typeof (window as any).L === 'undefined') return;

    const L = (window as any).L;
    const defaultCenter: [number, number] = [21.0285, 105.8020];

    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CartoDB',
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Add user marker + facility markers when location is ready ──
  useEffect(() => {
    if (!leafletMapRef.current || !userLocation || typeof (window as any).L === 'undefined') return;
    const L = (window as any).L;
    const map = leafletMapRef.current;

    // Remove old user marker
    if (userMarkerRef.current) { userMarkerRef.current.remove(); userMarkerRef.current = null; }
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // User marker (blue pulsing dot)
    const userHtml = `
      <div style="
        background: #3b82f6;
        border: 4px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 6px rgba(59,130,246,0.3), 0 4px 16px rgba(59,130,246,0.5);
        width: 20px; height: 20px;
        animation: userPulse 2s infinite;
      "></div>`;
    const userIcon = L.divIcon({ html: userHtml, className: '', iconSize: [20, 20], iconAnchor: [10, 10] });
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(`<div style="font-family:Inter,sans-serif;text-align:center;"><strong style="font-size:12px;">📍 Vị trí của bạn</strong></div>`);

    // Add facility markers
    const activeF = activeTab === 'hospital' ? hospitals : pharmacies;
    activeF.forEach(facility => {
      const isSelected = facility.id === selectedId;
      const size = isSelected ? 44 : 36;
      const fontSize2 = isSelected ? 18 : 14;
      const markerHtml = `
        <div style="
          background: ${facility.color};
          border: ${isSelected ? '4px' : '3px'} solid white;
          border-radius: 50%;
          box-shadow: 0 ${isSelected ? '8' : '4'}px ${isSelected ? '24' : '16'}px ${facility.color}${isSelected ? 'cc' : '80'};
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${fontSize2}px;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          z-index: ${isSelected ? 1000 : 1};
          animation: ${!isSelected ? 'markerPulse 2s infinite' : 'none'};
        ">${facility.icon}</div>`;

      const icon = L.divIcon({
        html: markerHtml,
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
      });

      const marker = L.marker([facility.lat, facility.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width:220px; font-family:Inter,sans-serif;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="font-size:20px;">${facility.icon}</span>
              <strong style="font-size:13px;color:#1e293b;">${facility.name}</strong>
            </div>
            <div style="font-size:11px;color:#64748b;margin-bottom:4px;">📍 ${facility.address}</div>
            <div style="font-size:11px;color:#64748b;margin-bottom:4px;">📞 ${facility.phone}</div>
            <div style="font-size:11px;color:#64748b;margin-bottom:4px;">⏰ ${facility.openHours}</div>
            ${facility.specialty ? `<div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">🏷️ ${facility.specialty}</div>` : ''}
            <a href="${facility.navUrl}" target="_blank" rel="noopener noreferrer"
              style="display:inline-flex;align-items:center;gap:4px;background:${facility.color};color:white;padding:6px 12px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none;margin-top:4px;">
              🧭 Chỉ đường
            </a>
          </div>
        `, { maxWidth: 280 });

      marker.on('click', () => setSelectedId(facility.id));
      markersRef.current.push(marker);
    });

    // Pan map to show user + all active facilities
    if (activeF.length > 0) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        ...activeF.map(f => [f.lat, f.lng] as [number, number])
      ]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    } else {
      map.panTo([userLocation.lat, userLocation.lng], { animate: true, duration: 0.8 });
    }
  }, [userLocation, activeTab]);

  const selectedFacility = selectedId
    ? (activeTab === 'hospital' ? hospitals : pharmacies).find(f => f.id === selectedId)
    : null;

  // ── Pan to selected facility on map ──
  useEffect(() => {
    if (!leafletMapRef.current || !selectedId || typeof (window as any).L === 'undefined') return;
    const target = facilities.find(f => f.id === selectedId);
    if (!target) return;
    leafletMapRef.current.panTo(
      [target.lat, target.lng],
      { animate: true, duration: 0.6 }
    );
  }, [selectedId]); // NOT selectedFacility — read facilities directly to avoid stale closure

  const handleNavigate = (facility: Facility) => {
    const encodedAddr = encodeURIComponent(facility.address + ', ' + facility.name);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddr}`, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xs ${i < full ? 'text-amber-400' : i === full && half ? 'text-amber-300' : 'text-slate-300'}`}>
            ★
          </span>
        ))}
        <span className={`text-xs font-bold ml-1 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{rating}</span>
      </div>
    );
  };

  return (
    <div className="findcare-modal-overlay" onClick={onClose}>
      <div className="findcare-modal" onClick={e => e.stopPropagation()}>
        <div className={`${bgCard} w-full max-w-5xl mx-4 mb-4 md:mb-0 rounded-3xl shadow-2xl overflow-hidden border-2 ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
          style={{ maxHeight: '95vh', display: 'flex', flexDirection: 'column' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0"
            style={{ background: darkMode ? 'linear-gradient(135deg,#1e293b,#334155)' : 'linear-gradient(135deg,#065f46,#059669)' }}>
            <div className="flex items-center gap-3 text-white">
              <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-xl shadow-lg">
                🗺️
              </div>
              <div>
                <h2 className="text-lg font-black">Tìm cơ sở y tế gần bạn</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  {geoLoading ? (
                    <span className="flex items-center gap-1 text-white/70 text-xs">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang lấy vị trí...
                    </span>
                  ) : geoError ? (
                    <span className="flex items-center gap-1 text-amber-300 text-xs">⚠️ {geoError}</span>
                  ) : userLocation ? (
                    <span className="flex items-center gap-1 text-white/80 text-xs">
                      📍 Đã xác định vị trí của bạn
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all shadow-lg">
              <X size={20} />
            </button>
          </div>

          {/* Body: Map + List */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden" style={{ minHeight: 0 }}>

            {/* Map */}
            <div className="relative md:w-3/5 h-64 md:h-auto">
              <div ref={mapRef} className="w-full h-full" style={{ minHeight: '320px' }} />

              {/* Tab overlay */}
              <div className="absolute top-3 left-3 right-3 z-[400] flex gap-1">
                <button
                  onClick={() => { setActiveTab('hospital'); setSelectedId(null); }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg transition-all ${activeTab === 'hospital' ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-white'}`}
                >
                  🏥 Bệnh viện
                </button>
                <button
                  onClick={() => { setActiveTab('pharmacy'); setSelectedId(null); }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg transition-all ${activeTab === 'pharmacy' ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-white'}`}
                >
                  💊 Hiệu thuốc
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-3 left-3 z-[400] flex flex-col gap-1.5 bg-white/90 backdrop-blur rounded-xl px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 ${activeTab === 'hospital' ? 'bg-red-500' : 'bg-slate-300'} rounded-full border-2 border-white shadow flex items-center justify-center text-[10px] text-white`}>🏥</div>
                  <span className={`text-xs font-bold ${activeTab === 'hospital' ? 'text-slate-800' : 'text-slate-400'}`}>Bệnh viện</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 ${activeTab === 'pharmacy' ? 'bg-emerald-500' : 'bg-slate-300'} rounded-full border-2 border-white shadow flex items-center justify-center text-[10px] text-white`}>💊</div>
                  <span className={`text-xs font-bold ${activeTab === 'pharmacy' ? 'text-slate-800' : 'text-slate-400'}`}>Hiệu thuốc</span>
                </div>
              </div>
            </div>

            {/* Facility List */}
            <div className={`md:w-2/5 flex flex-col overflow-hidden border-t md:border-t-0 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className={`px-4 py-3 flex items-center justify-between border-b shrink-0 ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black ${activeTab === 'hospital' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    {activeTab === 'hospital' ? '🏥' : '💊'}
                  </span>
                  <div>
                    <p className={`font-black text-sm ${textColor}`}>
                      {activeTab === 'hospital' ? `${hospitals.length} Bệnh viện` : `${pharmacies.length} Hiệu thuốc`}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>Gần vị trí của bạn</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>📍 {currentCity}</p>
                  <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-300'}`}>Việt Nam</p>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(95vh - 280px)' }}>
                {activeFacilities.map((facility, idx) => (
                  <div
                    key={facility.id}
                    onClick={() => setSelectedId(facility.id)}
                    className={`mx-3 my-2 rounded-2xl p-3.5 border-2 cursor-pointer transition-all duration-200 ${selectedId === facility.id
                        ? `${facility.borderColor} ${facility.bgColor} shadow-lg`
                        : darkMode ? 'bg-slate-700/50 border-transparent hover:border-slate-600 hover:bg-slate-700' : 'bg-slate-50 border-transparent hover:border-slate-200 hover:bg-white'
                      }`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${selectedId === facility.id ? facility.bgColor : darkMode ? 'bg-slate-600' : 'bg-slate-200'}`}
                        style={{ border: selectedId === facility.id ? `2px solid ${facility.color}` : 'none' }}>
                        {facility.icon}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className={`font-black text-sm leading-tight truncate ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{facility.name}</h4>
                          <span className={`text-xs font-bold shrink-0 ${facility.textColor}`}>{facility.distance}</span>
                        </div>

                        {facility.specialty && (
                          <p className={`text-xs mt-0.5 truncate ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>🏷️ {facility.specialty}</p>
                        )}
                        <p className={`text-xs mt-0.5 truncate ${darkMode ? 'text-slate-500' : 'text-slate-300'}`}>📍 {facility.address}</p>

                        <div className="flex items-center justify-between gap-2 mt-2">
                          {renderStars(facility.rating)}
                          <div className="flex gap-1">
                            {facility.badge && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-500'}`}>
                                {facility.badge}
                              </span>
                            )}
                            <button
                              onClick={e => { e.stopPropagation(); handleNavigate(facility); }}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white transition-all hover:scale-105 active:scale-95"
                              style={{ background: facility.color }}
                            >
                              🧭 Chỉ đường
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {selectedId === facility.id && (
                      <div className={`mt-3 pt-3 border-t space-y-1.5 ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                        style={{ animation: 'fadeInUp 0.3s ease' }}>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>📞</span>
                          <a href={`tel:${facility.phone}`} className={`font-bold hover:underline ${facility.textColor}`}>{facility.phone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>⏰</span>
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{facility.openHours}</span>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); handleNavigate(facility); }}
                          className="w-full mt-2 py-2.5 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-xl active:scale-95"
                          style={{ background: facility.color }}
                        >
                          <MapPin size={16} />Mở chỉ đường Google Maps
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  const [newsOpen, setNewsOpen] = useState(true);
  const [newsFilter, setNewsFilter] = useState<string | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showFindCare, setShowFindCare] = useState(false);
  // Health articles state
  const [healthArticles, setHealthArticles] = useState<any[]>([]);
  const [olderArticles, setOlderArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(true);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // show first 3, rest via scroll/button
  // Countdown to next article
  const openArticleModal = (article: any) => {
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
  const [countdown, setCountdown] = useState(0); // seconds until next Vietnam midnight
  // Article detail modal
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Expose FindCare opener to window for AIScanView button
  useEffect(() => {
    (window as any).__openFindCare = () => setShowFindCare(true);
    return () => { delete (window as any).__openFindCare; };
  }, []);

  // Floating background elements (medical icons)
  const floatingIcons = ['💊', '💉', '🩺', '🫀', '🧠', '🩻', '💊', '🩹', '🧬', '🦠', '🫁', '💜', '🩶', '🫧'];
  const [floatingEls] = useState(() =>
    [...Array(18)].map((_, i) => ({
      id: i,
      icon: floatingIcons[i % floatingIcons.length],
      left: `${Math.random() * 95}%`,
      size: `${1.2 + Math.random() * 2}rem`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 8}s`,
      opacity: 0.08 + Math.random() * 0.12,
    }))
  );

  // Filtered + sorted news (memoized)
  const filteredNews = useMemo(() => {
    let result = [...posts];
    if (newsFilter) result = result.filter((p: any) => p.type === newsFilter);
    return result.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [posts, newsFilter]);

  useEffect(() => {
    // Fetch news whenever library tab is active
    if (tab === 'library' || tab === 'news') {
      setLoadingPosts(true);
      fetch(`${API_BASE}/api/activity`).then(r => r.json()).then(d => {
        if (Array.isArray(d)) setPosts(d);
      }).catch(() => {}).finally(() => setLoadingPosts(false));
    }
  }, [tab]);

  // ── Fetch health articles ──
  useEffect(() => {
    if (tab !== 'library') return;
    setLoadingArticles(true);
    fetch(`${API_BASE}/api/articles`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.articles)) setHealthArticles(d.articles); })
      .catch(() => {})
      .finally(() => setLoadingArticles(false));

    // Also fetch older articles for scroll/load-more
    setLoadingOlder(true);
    fetch(`${API_BASE}/api/articles/older`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.articles)) setOlderArticles(d.articles); })
      .catch(() => {})
      .finally(() => setLoadingOlder(false));
  }, [tab]);

  // ── Countdown timer: countdown to next Vietnam midnight (GMT+7) ──
  // Vietnam = UTC+7, so midnight VN = 17:00 UTC the previous day
  const getVietnamMidnightMs = (): number => {
    const now = new Date();
    const nowTs = now.getTime(); // ms since epoch (local/browser TZ)
    const vnTs = nowTs + 7 * 3600000; // shift to Vietnam time
    const vn = new Date(vnTs);
    const vnDay = vn.getUTCDate();
    const vnMon = vn.getUTCMonth();
    const vnYr = vn.getUTCFullYear();
    const vnMidnightTs = Date.UTC(vnYr, vnMon, vnDay, 0, 0, 0, 0); // today's midnight VN
    const nextVnMidnight = vnMidnightTs + 24 * 3600000; // tomorrow midnight VN
    return nextVnMidnight - nowTs;
  };

  // Format countdown HH:MM:SS
  const formatCountdown = (seconds: number) => {
    if (seconds <= 0) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Get next article date formatted (DD/MM/YYYY Vietnam time)
  const getNextArticleDate = (): string => {
    const now = new Date();
    const vnTs = now.getTime() + 7 * 3600000;
    const vn = new Date(vnTs);
    const vnDay = vn.getUTCDate();
    const vnMon = vn.getUTCMonth();
    const vnYr = vn.getUTCFullYear();
    const vnMidnightTs = Date.UTC(vnYr, vnMon, vnDay, 0, 0, 0, 0);
    const nextVn = new Date(vnMidnightTs + 24 * 3600000);
    const day = nextVn.getUTCDate();
    const month = nextVn.getUTCMonth() + 1;
    const year = nextVn.getUTCFullYear();
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Trigger refresh — fetch new articles from backend
          Promise.all([
            fetch(`${API_BASE}/api/articles`).then(r => r.json()).catch(() => ({})),
            fetch(`${API_BASE}/api/articles/older`).then(r => r.json()).catch(() => ({})),
          ]).then(([a, b]) => {
            if (Array.isArray(a.articles)) setHealthArticles(a.articles);
            if (Array.isArray(b.articles)) setOlderArticles(b.articles);
          });
          return Math.floor(getVietnamMidnightMs() / 1000);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set initial countdown to Vietnam midnight
  useEffect(() => {
    setCountdown(Math.floor(getVietnamMidnightMs() / 1000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (darkMode) {
      const darkBgs: Record<string, string> = {
        'MỤN & DA LIỄU': 'bg-rose-500/20 text-rose-400',
        'BỆNH LÂY NHIỄM': 'bg-orange-500/20 text-orange-400',
        'SỨC KHỎE TÂM LÝ': 'bg-purple-500/20 text-purple-400',
        'VỆ SINH': 'bg-teal-500/20 text-teal-400',
      };
      return darkBgs[cat.category] || 'bg-blue-500/20 text-blue-400';
    }
    const lightBgs: Record<string, string> = {
      'MỤN & DA LIỄU': 'bg-rose-100 text-rose-600',
      'BỆNH LÂY NHIỄM': 'bg-orange-100 text-orange-600',
      'SỨC KHỎE TÂM LÝ': 'bg-purple-100 text-purple-600',
      'VỆ SINH': 'bg-teal-100 text-teal-600',
    };
    return lightBgs[cat.category] || 'bg-blue-100 text-blue-600';
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>

      {/* ═══ FLOATING BACKGROUND ICONS ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingEls.map((el: any) => (
          <div
            key={el.id}
            className="absolute animate-float"
            style={{
              left: el.left,
              top: `${Math.random() * 100}%`,
              fontSize: el.size,
              opacity: el.opacity,
              animationDuration: el.duration,
              animationDelay: el.delay,
              filter: darkMode ? 'brightness(0.5)' : 'none',
            }}
          >
            {el.icon}
          </div>
        ))}

        {/* Animated gradient orbs */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-slow-pulse ${darkMode ? 'bg-blue-900/20' : 'bg-blue-400/20'}`} />
        <div className={`absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-3xl animate-slow-pulse ${darkMode ? 'bg-purple-900/20' : 'bg-pink-400/20'}`} style={{ animationDelay: '3s' }} />
        <div className={`absolute -bottom-40 left-1/3 w-72 h-72 rounded-full blur-3xl animate-slow-pulse ${darkMode ? 'bg-rose-900/20' : 'bg-purple-400/20'}`} style={{ animationDelay: '6s' }} />
      </div>

      {/* HEADER */}
      <header className={`backdrop-blur-md sticky top-0 z-50 shadow-xl transition-all duration-500 ${darkMode ? 'bg-slate-900/90 border-b border-slate-700' : 'bg-white/95 border-b border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-logo-pulse">
              <HeartPulse size={26} className="text-white" />
            </div>
            <div>
              <p className={`text-[9px] font-bold tracking-widest uppercase mb-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>43TPU(CHACHA AI)_EDUHEALTH AI</p>
              <h1 className={`font-black text-xl tracking-wide ${darkMode ? 'text-white' : 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent font-black'}`}>EduHealth AI</h1>
              <p className={`text-[10px] ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>Hỗ trợ chăm sóc & chẩn đoán sức khỏe học đường · Không thay thế bác sĩ y khoa</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Dark/Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 active:scale-95 ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
              title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="bg-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <CheckCircle size={12} />Sẵn sàng
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH + NAV */}
      <div className={`backdrop-blur-md sticky top-[60px] z-40 shadow-sm transition-all duration-500 ${darkMode ? 'bg-slate-900/80 border-b border-slate-700' : 'bg-white/80 border-b border-slate-100'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
          {/* SEARCH */}
          <div className="relative">
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-300' : 'text-slate-400'}`} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm bệnh, triệu chứng..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:border-rose-400 transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-800'}`} />
          </div>
          {/* NAV TABS */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            <button onClick={() => { setTab('library'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'library' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
              <BookOpen size={18} />Cẩm nang thư viện{selectedCat && ` › ${selectedCat}`}
            </button>
            <button onClick={() => { setTab('aiscan'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'aiscan' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Zap size={18} />AI Sàng lọc
            </button>
            <button onClick={() => { setTab('news'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'news' ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg' : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Newspaper size={18} />HOẠT ĐỘNG
            </button>
            <button onClick={() => { setTab('findcare'); setCatOpen(false); setSelectedCat(null); setSelectedDisease(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${tab === 'findcare' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
              <MapPin size={18} />Cơ sở y tế
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className={`max-w-6xl mx-auto px-4 py-6 relative z-10 ${darkMode ? 'text-white' : ''}`}>

        {/* ══ LIBRARY – HOME (no category selected) ══ */}
        {tab === 'library' && !selectedCat && !selectedDisease && (
          <div className="space-y-6 animate-in fade-in duration-300">

            {/* ── 2-COLUMN LAYOUT ── */}
            <div className="flex flex-col lg:flex-row gap-5">

              {/* ════ LEFT: CẨM NANG THƯ VIỆN ════ */}
              <div className="lg:w-1/2 space-y-4">

                {/* Cẩm nang header */}
                <div className={`rounded-2xl p-4 text-white relative overflow-hidden ${darkMode ? '' : ''}`}
                  style={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                      : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #db2777 100%)',
                    boxShadow: darkMode ? '' : '0 0 30px rgba(99,102,241,0.3)',
                  }}
                >
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shadow">📚</div>
                      <div>
                        <h2 className="text-base font-black tracking-tight">Cẩm nang thư viện học đường</h2>
                        <p className="text-white/70 text-[10px]">{totalDiseases} bài viết · 4 danh mục · 30+ bệnh lý</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed mt-2">Thông tin y khoa cập nhật giúp nhận biết, phòng ngừa và xử lý các vấn đề sức khỏe thường gặp trong môi trường học đường.</p>
                  </div>
                </div>

                {/* Category Dropdown */}
                <div ref={dropdownRef}>
                  <button
                    onClick={() => setCatOpen(!catOpen)}
                    className={`w-full border-2 rounded-2xl p-3.5 flex items-center justify-between hover:shadow-lg transition-all duration-300 group active:scale-[0.99] ${darkMode ? 'bg-slate-800 border-slate-600 hover:border-purple-400' : 'bg-white border-slate-200 hover:border-purple-400'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow group-hover:scale-110 transition-transform duration-300">📋</div>
                      <div className="text-left">
                        <p className={`font-black text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>Danh mục bệnh</p>
                        <p className="text-slate-400 text-xs">Chọn để xem chi tiết</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 hidden sm:block">4 danh mục</span>
                      <div className={`w-8 h-8 ${darkMode ? 'bg-slate-700' : 'bg-purple-50'} rounded-lg flex items-center justify-center transition-all duration-300 ${catOpen ? 'rotate-180 bg-purple-100' : ''}`}>
                        <ChevronDown size={18} className={darkMode ? 'text-slate-300' : 'text-purple-500'} />
                      </div>
                    </div>
                  </button>

                  {catOpen && (
                    <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 relative animate-in slide-in-from-top-2 duration-200">
                      {HEALTH_LIBRARY.map((cat: any, idx: number) => (
                        <button
                          key={cat.category}
                          onClick={() => { setSelectedCat(cat.category); setCatOpen(false); setSelectedDisease(null); }}
                          className={`w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 transition-all duration-200 border-b border-slate-50 last:border-0 group`}
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${getCategoryIconBg(cat)} group-hover:scale-110 transition-transform duration-300`}>{cat.icon}</div>
                          <div className="flex-1 text-left">
                            <p className={`font-bold text-sm group-hover:text-purple-500 transition-colors ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cat.category}</p>
                            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-400'}`}>{cat.diseases.length} bài viết</p>
                          </div>
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getCategoryGradient(cat)} flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300`}>→</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Cards Grid */}
                {!search && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HEALTH_LIBRARY.map((cat: any, idx: number) => (
                      <button
                        key={cat.category}
                        onClick={() => { setSelectedCat(cat.category); setSelectedDisease(null); }}
                        className={`rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border text-left group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 hover:-translate-y-0.5'}`}
                        style={{ animationDelay: `${idx * 80}ms` }}
                      >
                        <div className={`h-1 bg-gradient-to-r ${getCategoryGradient(cat)}`} />
                        <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-2">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${getCategoryIconBg(cat)}`}>{cat.icon}</div>
                          <div className="min-w-0 flex-1">
                            <p className={`font-black text-xs leading-tight line-clamp-1 group-hover:text-purple-500 transition-colors ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cat.category}</p>
                            <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>{cat.diseases.length} bài viết</p>
                          </div>
                        </div>
                        <div className="px-3.5 pb-2.5">
                          <div className="space-y-1">
                            {cat.diseases.slice(0, 4).map((d: any) => (
                              <p key={d.id} className={`text-[11px] leading-relaxed truncate flex items-start gap-1.5 ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                                <span className={`shrink-0 mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-300'}`}>•</span>
                                <span className="truncate">{d.name}</span>
                              </p>
                            ))}
                          </div>
                          {cat.diseases.length > 4 && (
                            <p className={`text-[10px] mt-1 font-bold ${darkMode ? 'text-slate-500' : 'text-slate-300'}`}>+{cat.diseases.length - 4} bài khác</p>
                          )}
                        </div>
                        <div className="px-3.5 pb-2.5">
                          <div className={`flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
                            Xem tất cả <ChevronRight size={10} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Results */}
                {search && filteredLibrary.length > 0 && (
                  <div className="space-y-3">
                    <div className={`pill-card rounded-xl p-3 border flex items-center gap-2 ${darkMode ? 'border-slate-700' : 'border-purple-100'}`}>
                      <Search size={16} className={darkMode ? 'text-slate-400' : 'text-purple-500'} />
                      <p className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Tìm thấy <span className="text-purple-500">{filteredLibrary.reduce((s: number, c: any) => s + c.diseases.length, 0)}</span> kết quả cho "{search}"</p>
                    </div>
                    {filteredLibrary.map((cat: any) => (
                      <div key={cat.category}>
                        <h3 className={`text-sm font-black flex items-center gap-1.5 mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}><span className="text-base">{cat.icon}</span> {cat.category}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.diseases.map((d: any) => (
                            <div key={d.id} onClick={() => { setSelectedCat(cat.category); setSelectedDisease(d); }}
                              className={`rounded-xl overflow-hidden cursor-pointer group border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                              <div className="aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                <img src={d.images[0]?.url} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e: any) => { e.target.style.display = 'none'; }} />
                              </div>
                              <div className="p-2.5">
                                <h4 className={`font-bold text-xs group-hover:text-purple-500 transition-colors line-clamp-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{d.name}</h4>
                                <p className={`text-[10px] line-clamp-2 mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{d.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {search && filteredLibrary.length === 0 && (
                  <div className={`text-center py-10 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow border'}`}>
                    <div className="text-4xl mb-2">🔍</div>
                    <p className={`font-bold text-sm ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>Không tìm thấy "{search}"</p>
                  </div>
                )}
              </div>

              {/* ════ RIGHT: TIN Y TẾ HỌC ĐƯỜNG ════ */}
              <div className="lg:w-1/2 space-y-3">

                {/* Header Banner */}
                <div
                  onClick={() => setArticlesOpen(!articlesOpen)}
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-4 text-white cursor-pointer relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ boxShadow: '0 0 20px rgba(59,130,246,0.35)' }}
                >
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" />
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-0 rounded-2xl border border-white/20" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow">
                        <BookOpen size={24} />
                        {healthArticles.length > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center text-[10px] font-black animate-bounce shadow-lg">
                            {healthArticles.length > 9 ? '9+' : healthArticles.length}
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-lg font-black flex items-center gap-2 tracking-tight">
                          📖 Tin y tế học đường
                          <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse">AUTO</span>
                        </h2>
                        <p className="text-white/80 text-xs flex items-center gap-1.5 flex-wrap">
                          <Clock3 size={11} />{healthArticles.length} bài báo y tế · Mỗi ngày 1 bài mới
                          {loadingArticles && <span className="ml-1 flex items-center gap-1"><RefreshCw size={10} className="animate-spin" /></span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="bg-white/20 rounded-xl px-2.5 py-1 text-center">
                        <p className="text-[9px] text-white/60 font-medium">Ngày cập nhật</p>
                        <p className="font-black text-[10px] font-mono">{getNextArticleDate()}</p>
                        <p className="text-[9px] text-white/50">⏰ {formatCountdown(countdown)}</p>
                      </div>
                      <div className={`w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center transition-transform duration-300 ${articlesOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {articlesOpen && (
                    <div className="mt-3 flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {['Sức khỏe học đường','Dinh dưỡng','Phòng bệnh','Tâm thần','Da liễu','Sơ cứu','Tiêm chủng','Mắt'].map(cat => {
                        const count = healthArticles.filter((a: any) => a.category === cat).length;
                        return count > 0 && (
                          <button key={cat} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white hover:bg-white/30 transition-all">
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Articles list */}
                {articlesOpen && (
                  <div className="space-y-2.5">
                    {loadingArticles ? (
                      <div className={`flex flex-col items-center justify-center py-12 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow'}`}>
                        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
                        <p className={`text-sm font-medium animate-pulse ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>Đang tải bài báo y tế...</p>
                      </div>
                    ) : healthArticles.length === 0 && olderArticles.length === 0 ? (
                      <div className={`text-center py-12 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow border border-slate-100'}`}>
                        <div className="text-5xl mb-3">📰</div>
                        <p className="font-bold text-slate-400 text-sm">Chưa có bài báo nào</p>
                        <p className="text-xs text-slate-400 mt-1">Hệ thống sẽ tự động cập nhật sớm</p>
                      </div>
                    ) : (
                      <>
                        {healthArticles.slice(0, visibleCount).map((article: any, idx: number) => (
                          <div
                            key={article.id || idx}
                            onClick={() => openArticleModal(article)}
                            className={`rounded-xl overflow-hidden cursor-pointer group flex gap-0 transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white shadow border border-slate-100 hover:-translate-y-0.5'}`}
                            style={{ animationDelay: `${idx * 60}ms` }}
                          >
                            {article.image_url && (
                              <div className="w-28 h-28 shrink-0 overflow-hidden bg-slate-100">
                                <img src={article.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  onError={(e: any) => { e.target.style.display = 'none'; }} />
                              </div>
                            )}
                            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                              {article.category && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full w-fit mb-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>{article.category}</span>
                              )}
                              <h3 className={`font-black text-xs line-clamp-2 group-hover:text-blue-500 transition-colors leading-snug ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{article.title}</h3>
                              <div className="flex items-center justify-between mt-1 flex-wrap gap-1">
                                <span className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>📰 {article.source_name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                                  Xem <ChevronRight size={8} />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {healthArticles.length > visibleCount && (
                          <button onClick={() => setVisibleCount(prev => Math.min(prev + 3, healthArticles.length))}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold text-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2 border ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-blue-100 bg-white'}`}>
                            <ChevronDown size={14} />Xem thêm {Math.min(3, healthArticles.length - visibleCount)} bài
                            <span className="text-slate-400 font-normal">({visibleCount}/{healthArticles.length})</span>
                          </button>
                        )}

                        {olderArticles.length > 0 && (
                          <details className={`rounded-xl overflow-hidden ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow border border-slate-100'}`}>
                            <summary className="flex items-center justify-between p-3 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-xs font-bold">
                              <span className={`${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>📚 Bài báo trước đó ({olderArticles.length} bài)</span>
                              <ChevronDown size={14} className="text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                              {olderArticles.map((article: any, idx: number) => (
                                <div key={article.id || idx} onClick={() => openArticleModal(article)}
                                  className={`p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border-b last:border-0 ${darkMode ? 'border-slate-700' : 'border-slate-50'}`}>
                                  <div className="flex items-start gap-2">
                                    {article.image_url && (
                                      <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                                        <img src={article.image_url} alt="" className="w-full h-full object-cover" onError={(e: any) => e.target.style.display = 'none'} />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-[11px] font-bold line-clamp-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{article.title}</p>
                                      <p className={`text-[9px] mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>📰 {article.source_name}</p>
                                    </div>
                                    <ChevronRight size={10} className="text-slate-300 shrink-0 mt-0.5" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </details>
                        )}

                        {loadingOlder && (
                          <div className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400">
                            <RefreshCw size={12} className="animate-spin" />Đang tải thêm...
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ LIBRARY – CATEGORY SELECTED (show disease list) ══ */}
        {tab === 'library' && selectedCat && !selectedDisease && currentCat && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Category Header - Pill style */}
            <button onClick={() => { setSelectedCat(null); setSelectedDisease(null); }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-rose-400 border border-slate-700' : 'bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-500 border border-slate-200'} shadow-md`}>
              <ChevronLeft size={16} className="animate-rotate-in" />
              <span>Quay lại Cẩm nang thư viện</span>
            </button>

            <div className={`rounded-3xl p-5 text-white relative overflow-hidden transition-all duration-500 ${darkMode ? 'shadow-2xl border border-slate-700' : 'shadow-2xl'}`}
              style={{ background: darkMode ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' : `linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #f97316 100%)`, boxShadow: darkMode ? '0 0 40px rgba(0,0,0,0.5)' : '0 0 40px rgba(244,63,94,0.3)' }}>
              {/* Animated glow orbs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                    style={{ left: `${20 + i * 22}%`, top: `${15 + i * 20}%`, animationDuration: `${3.5 + i * 0.8}s`, animationDelay: `${i * 0.5}s` }} />
                ))}
              </div>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-xl border border-white/20 animate-bounce-in">
                    {currentCat.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                      {currentCat.category}
                      <span className="pill-tag bg-white/20 text-white text-xs animate-blink">LIVE</span>
                    </h2>
                    <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                      <BookOpen size={12} />
                      {currentCat.diseases.length} bài viết được cập nhật
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disease Cards - Pill Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentCat.diseases.map((d: any, idx: number) => (
                <div key={d.id} onClick={() => setSelectedDisease(d)}
                  className={`pill-card rounded-2xl overflow-hidden cursor-pointer group text-left transition-all duration-400 hover:shadow-2xl ${darkMode ? 'pill-card-dark' : 'pill-card'} ${darkMode ? '' : ''}`}
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
                >
                  {/* Image with ribbon pill */}
                  <div className="pill-image-wrap aspect-video">
                    <img src={d.images[0]?.url} alt={d.name}
                      className="w-full h-full object-cover"
                      onError={(e: any) => { e.target.style.display = 'none'; e.target.parentElement.style.background = darkMode ? '#1e293b' : '#f1f5f9'; }} />
                    {/* Animated ribbon */}
                    <div className="pill-ribbon animate-bounce-in" style={{ animationDelay: `${idx * 60 + 200}ms` }}>
                      {currentCat.icon} {currentCat.category.split(' ')[0]}
                    </div>
                    {/* Hover overlay with icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Xem chi tiết <ChevronRight size={12} />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h4 className={`font-black text-sm leading-tight group-hover:text-rose-500 transition-colors duration-300 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {d.name}
                    </h4>
                    <p className={`text-xs leading-relaxed line-clamp-3 ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                      {d.description}
                    </p>
                    {/* Quick tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {d.symptoms?.slice(0, 2).map((s: string, si: number) => (
                        <span key={si} className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-rose-50 text-rose-500'}`}>
                          • {s.substring(0, 20)}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Bottom hover arrow */}
                  <div className={`px-4 pb-3 flex items-center justify-between ${darkMode ? 'text-slate-500' : 'text-slate-300'} text-xs`}>
                    <span className="flex items-center gap-1">
                      <FileText size={10} />
                      {d.images?.length || 3} ảnh minh họa
                    </span>
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-rose-400 font-bold">
                      Chi tiết <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ DISEASE DETAIL ══ */}
        {tab === 'library' && selectedDisease && (
          <div className="space-y-5 animate-in fade-in duration-400">
            {/* Back button with pill style */}
            <button
              onClick={() => setSelectedDisease(null)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-rose-400' : 'bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-500'} shadow-md border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <ChevronLeft size={16} className="animate-rotate-in" />
              <span>Quay lại {selectedCat}</span>
            </button>

            {/* Main Disease Card - Pill style */}
            <div className={`rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 ${darkMode ? 'bg-slate-800/90 border-slate-700 backdrop-blur-xl' : 'bg-white/95 border-slate-200 backdrop-blur-xl'}`}
              style={{ boxShadow: darkMode ? '0 0 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,63,94,0.1)' : '0 0 40px rgba(244,63,94,0.1), 0 0 0 1px rgba(244,63,94,0.05)' }}>

              {/* Header Banner */}
              <div className={`relative p-6 ${darkMode ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500'} overflow-hidden`}>
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute w-3 h-3 bg-white/10 rounded-full animate-float"
                      style={{ left: `${20 + i * 18}%`, top: `${15 + (i % 3) * 30}%`, animationDuration: `${3 + i}s`, animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse-ring" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-xl animate-bounce-in border border-white/20">
                      {HEALTH_LIBRARY.find(c => c.diseases.some((d: any) => d.id === selectedDisease.id))?.icon || '🧴'}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{selectedDisease.name}</h2>
                      {selectedDisease.otherNames && <p className="text-white/70 text-sm mt-1 italic">{selectedDisease.otherNames}</p>}
                    </div>
                  </div>
                  {/* Animated pill badge */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="pill-tag bg-white/20 text-white backdrop-blur-sm border border-white/20 animate-blink">⚠️ Cần biết</span>
                    {selectedDisease.dangerSigns?.length > 0 && <span className="pill-tag bg-red-500/30 text-white animate-pulse">🔴 Nguy hiểm</span>}
                  </div>
                </div>
              </div>

              {/* Images Gallery - Pill style with zoom */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900">
                <div className="grid grid-cols-3 gap-2">
                  {selectedDisease.images.map((img: any, i: number) => (
                    <div
                      key={i}
                      className={`img-gallery-item group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? 'col-span-3 md:col-span-2 aspect-video' : 'aspect-square'}`}
                      onClick={() => window.open(img.url, '_blank')}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                        onError={(e: any) => e.target.style.display = 'none'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-[10px] font-medium leading-tight line-clamp-2 drop-shadow-lg">{img.caption}</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ExternalLink size={12} className="text-white" />
                      </div>
                      {/* Loading shimmer */}
                      <div className="absolute inset-0 skeleton hidden" id={`img-skeleton-${i}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-5">

                {/* Description with pill style */}
                <div className={`rounded-2xl p-4 border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-rose-50/50 border-rose-100'}`}>
                  <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                    {selectedDisease.description}
                  </p>
                </div>

                {/* Info Grid - 2 columns with pill cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Causes */}
                  <div className={`pill-card rounded-2xl p-4 border transition-all duration-300 ${darkMode ? 'border-slate-700' : 'border-rose-100'}`}
                    onMouseEnter={(e: any) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(244,63,94,0.15)'; }}
                    onMouseLeave={(e: any) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-500">
                        <AlertTriangle size={18} />
                      </div>
                      <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Nguyên nhân</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{selectedDisease.causes}</p>
                  </div>

                  {/* Symptoms */}
                  <div className={`pill-card rounded-2xl p-4 border transition-all duration-300 ${darkMode ? 'border-slate-700' : 'border-rose-100'}`}
                    onMouseEnter={(e: any) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(244,63,94,0.15)'; }}
                    onMouseLeave={(e: any) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center text-rose-500">
                        <ActivityIcon size={18} />
                      </div>
                      <h4 className="font-bold text-rose-600 dark:text-rose-400 text-sm">Triệu chứng</h4>
                    </div>
                    <ul className={`text-sm space-y-2 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                      {selectedDisease.symptoms.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 mt-0.5 shrink-0">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* School Context */}
                <div className={`step-pill rounded-2xl border ${darkMode ? 'bg-amber-900/20 border-amber-700/50' : 'bg-amber-50 border-amber-100'}`}
                  onMouseEnter={(e: any) => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e: any) => { e.currentTarget.style.transform = ''; }}>
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                    <School size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-1">Bối cảnh học đường</h4>
                    <p className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{selectedDisease.schoolContext}</p>
                  </div>
                </div>

                {/* Treatment Steps - Pill style */}
                <div>
                  <h4 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                      <ShieldCheck size={16} />
                    </div>
                    Xử lý & Điều trị
                  </h4>
                  <div className="space-y-3">
                    {selectedDisease.treatment.map((t: string, i: number) => (
                      <div
                        key={i}
                        className={`step-pill rounded-2xl border transition-all duration-300 group ${darkMode ? 'bg-slate-700/50 border-slate-600 hover:border-green-600' : 'bg-green-50/50 border-green-100 hover:border-green-300'} hover:shadow-md`}
                        onMouseEnter={(e: any) => { e.currentTarget.style.transform = 'translateX(6px)'; }}
                        onMouseLeave={(e: any) => { e.currentTarget.style.transform = ''; }}
                        style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                      >
                        {/* Step number pill */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300 ${i === 0 ? 'bg-gradient-to-br from-rose-500 to-pink-500' : i === 1 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : i === 2 ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-green-500 to-emerald-500'}`}>
                          {i + 1}
                        </div>
                        <p className={`text-sm flex-1 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Signs - Emergency pill */}
                {selectedDisease.dangerSigns?.length > 0 && (
                  <div className={`rounded-2xl p-5 border-2 border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 transition-all duration-300 hover:shadow-lg`}
                    style={{ animation: 'glowPulse 3s ease-in-out infinite' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="notif-dot" />
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center text-red-500 animate-heartbeat">
                        <AlertTriangle size={18} />
                      </div>
                      <h4 className="font-black text-red-600 dark:text-red-400 text-sm">Dấu hiệu nguy hiểm – Cần đi khám ngay</h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedDisease.dangerSigns.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-red-700 dark:text-red-300 text-sm">
                          <span className="text-red-500 mt-0.5 shrink-0 animate-blink">⚠️</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sources - Pill tags */}
                <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-slate-700/30 border-slate-600' : 'bg-slate-50 border-slate-100'}`}>
                  <h4 className={`font-bold text-sm mb-3 flex items-center gap-2 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                    <ExternalLink size={14} />
                    Nguồn tham khảo y khoa
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisease.sources?.map((s: any, i: number) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`pill-tag transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-white' : 'bg-slate-200 text-slate-600 hover:bg-rose-200 hover:text-rose-700'}`}
                      >
                        <ExternalLink size={10} />
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related diseases pill carousel */}
            {(() => {
              const currentCat = HEALTH_LIBRARY.find((c: any) => c.category === selectedCat);
              const related = currentCat?.diseases.filter((d: any) => d.id !== selectedDisease.id) || [];
              if (related.length === 0) return null;
              return (
                <div className="space-y-3">
                  <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                    <span className="text-xl">📋</span> Các bệnh liên quan trong {selectedCat}
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {related.map((d: any) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDisease(d)}
                        className={`pill-card shrink-0 w-48 rounded-2xl overflow-hidden border group text-left transition-all duration-300 hover:shadow-xl ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
                      >
                        <div className="aspect-video overflow-hidden rounded-none">
                          <img src={d.images[0]?.url} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e: any) => e.target.style.display = 'none'} />
                        </div>
                        <div className="p-3">
                          <p className={`font-bold text-xs line-clamp-2 group-hover:text-rose-400 transition-colors ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{d.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{d.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ══ AI SCAN ══ */}
        {tab === 'aiscan' && (
          <AIScanView darkMode={darkMode} />
        )}

        {/* ══ NEWSFEED ══ */}
        {tab === 'news' && (
          <div className="space-y-4 animate-in fade-in duration-300">

            {/* ── Banner Hero ── */}
            <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 rounded-2xl overflow-hidden p-6 flex items-center justify-between shadow-xl">

              {/* Left content */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  <Video size={10} /> KHO VIDEO GIÁO DỤC
                </div>
                <h2 className="font-black text-white text-2xl leading-tight mb-2">Hoạt động sức khỏe</h2>
                <p className="text-white/80 text-xs leading-relaxed max-w-[260px]">
                  Video phòng chống bệnh, bài giảng sức khoẻ từ các bác sĩ y tế và giáo viên. Cảm ơn ý kiến đóng góp để chúng tôi cải thiện!
                </p>
              </div>

              {/* Right icon */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center rotate-6 shadow-lg">
                  <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                    <rect x="6" y="10" width="36" height="28" rx="4" stroke="white" strokeWidth="2.5" fill="white/20"/>
                    <polygon points="20,18 20,30 30,24" fill="white"/>
                    <path d="M6 14 L6 10 L12 10 L12 14" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Filter Pills ── */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { key: null, label: 'TẤT CẢ', icon: '🔖' },
                { key: 'video', label: 'VIDEO', icon: '🎬' },
                { key: 'article', label: 'BÀI VIẾT', icon: '📝' },
                { key: 'infographic', label: 'INFOGRAPHIC', icon: '🖼️' },
              ].map(f => (
                <button
                  key={f.key ?? 'all'}
                  onClick={() => setNewsFilter(f.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    newsFilter === f.key
                      ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-lg shadow-rose-200'
                      : darkMode
                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      : 'bg-white text-slate-500 shadow-sm hover:shadow-md'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            {/* ── Post Grid ── */}
            {loadingPosts ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full" />
              </div>
            ) : filteredNews.length === 0 ? (
              <div className={`text-center py-16 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                <p className="text-5xl mb-3">📭</p>
                <p className={`font-bold text-base ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>Chưa có bài đăng nào</p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Hãy là người đầu tiên đăng bài!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNews.map(p => (
                  <PostCard key={p.id} post={p} onOpen={() => setDetailPost(p)} darkMode={darkMode} />
                ))}
              </div>
            )}

            {/* ── FAB: Đăng bài mới ── */}
            <button
              onClick={() => setShowForm(true)}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-rose-300/60 font-black text-sm hover:shadow-rose-400/80 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={20} />
              Đăng bài mới
            </button>
          </div>
        )}

        {/* ══ FIND CARE ══ */}
        {tab === 'findcare' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center text-slate-400 text-sm py-2">📍 Nhấn nút bên dưới để mở bản đồ tìm cơ sở y tế</div>
            <button
              onClick={() => setShowFindCare(true)}
              className="w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
            >
              <MapPin size={22} />
              🗺️ Mở bản đồ tìm cơ sở y tế
            </button>
          </div>
        )}
      </main>

      {/* MODALS */}
      {detailPost && <PostDetail post={detailPost} onClose={() => setDetailPost(null)} darkMode={darkMode} />}
      {showForm && <PostForm onClose={() => setShowForm(false)} onSuccess={p => { setPosts(prev => [p, ...prev]); setShowForm(false); }} darkMode={darkMode} />}
      {showFindCare && <FindCareModal darkMode={darkMode} onClose={() => setShowFindCare(false)} />}

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
};

export default App;
