/**
 * POST /api/scan — Groq Vision + structured AI analysis
 * EduHealth AI Dermatology Screening
 */
export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, imageBase64, checklist, symptoms } = req.body;

  if (!text && !imageBase64) {
    return res.status(400).json({ error: 'Cần có text hoặc imageBase64.' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY chưa được thiết lập.' });
  }

  try {
    // ── Build image block ──
    let imageBlock = null;
    if (imageBase64) {
      const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      imageBlock = { type: 'image_url', image_url: { url: `data:${mime};base64,${base64Data}` } };
    }

    // ── Build checklist flags ──
    const groupFlags = { food: [], sleep: [], stress: [], routine: [], touch: [], sweat: [] };
    const addFlag = (group, label) => groupFlags[group]?.push(label);

    if (checklist?.q1_sugar_drinks) addFlag('food', 'Uống trà sữa/nước ngọt gần như mỗi ngày');
    if (checklist?.q2_junk_food) addFlag('food', 'Fast food/mì tôm/snack ≥3 lần/tuần');
    if (checklist?.q3_dairy_intake) addFlag('food', 'Uống sữa bò/whey nhiều tuần này');
    if (checklist?.q4_spicy_oily) addFlag('food', 'Ăn đồ cay/nóng xong mặt đỏ hoặc nổi lấm tấm');
    if (checklist?.q5_late_sleep) addFlag('sleep', 'Ngủ sau 11h30 từ 3 ngày+/tuần');
    if (checklist?.q6_short_sleep) addFlag('sleep', 'Ngủ dưới 6-7 tiếng/ngày');
    if (checklist?.q7_phone_before_sleep) addFlag('sleep', 'Nằm lướt điện thoại tới lúc ngủ quên');
    if (checklist?.q8_academic_stress) addFlag('stress', 'Căng não vì thi cử/deadline/chuyện cá nhân ≥2 tuần');
    if (checklist?.q9_stress_acne_link) addFlag('stress', 'Mỗi lần stress mạnh thấy mụn lên rõ hơn sau vài ngày');
    if (checklist?.q10_sleep_disturbed) addFlag('stress', 'Ngủ không sâu, tỉnh giấc hoặc mơ nhiều vì căng thẳng');
    if (checklist?.q11_over_wash) addFlag('routine', 'Rửa mặt >2 lần/ngày hoặc chà kỳ mạnh');
    if (checklist?.q12_sleep_without_cleansing) addFlag('routine', 'Đi ngủ chưa tẩy trang hoặc rửa mặt kỹ');
    if (checklist?.q13_new_skincare) addFlag('routine', 'Đổi sữa rửa mặt/kem chống nắng/serum mới trong 2 tuần');
    if (checklist?.q14_too_many_products) addFlag('routine', 'Bôi nhiều món trị mụn cùng lúc để đánh nhanh');
    if (checklist?.q15_heavy_products) addFlag('routine', 'Dùng kem nền/kem chống nắng/kem dưỡng khá dày');
    if (checklist?.q16_hair_fringe) addFlag('routine', 'Để tóc mái/bết chạm trán gần như cả ngày');
    if (checklist?.q17_hair_products_skin) addFlag('routine', 'Dùng sáp/gel/dầu dưỡng tóc chạm trán hoặc gáy');
    if (checklist?.q18_resting_hand_face) addFlag('touch', 'Hay chống cằm, sờ mặt, tì má khi học');
    if (checklist?.q19_picking_acne) addFlag('touch', 'Hay nặn mụn vì nhìn ngứa mắt');
    if (checklist?.q20_picking_skin) addFlag('touch', 'Hay bóc da, cạy mụn hoặc sờ nốt mụn liên tục');
    if (checklist?.q21_sweat_not_rinse) addFlag('sweat', 'Đổ mồ hôi mà để khô luôn trên da');
    if (checklist?.q22_helmet_mask) addFlag('sweat', 'Đội mũ/khẩu trang/quai cặp cọ da ≥4h/ngày');
    if (checklist?.q23_dirty_gear) addFlag('sweat', 'Ít giặt nón/mũ/gối khi tóc dầu hoặc sản phẩm tóc dính');
    if (checklist?.q24_hot_humid_env) addFlag('sweat', 'Chỗ học/ngủ nóng bí, ẩm hoặc bụi nhiều');
    if (checklist?.q25_ac_on_face) addFlag('sweat', 'Ngồi điều hòa thổi thẳng vào mặt lâu, da căng rít/châm chích');

    const checklistGroups = [
      groupFlags.food.length > 0 ? `[ĂN UỐNG] ${groupFlags.food.join(', ')}` : null,
      groupFlags.sleep.length > 0 ? `[GIẤC NGỦ] ${groupFlags.sleep.join(', ')}` : null,
      groupFlags.stress.length > 0 ? `[CĂNG THẲNG] ${groupFlags.stress.join(', ')}` : null,
      groupFlags.routine.length > 0 ? `[SKINCARE & LÀM SẠCH] ${groupFlags.routine.join(', ')}` : null,
      groupFlags.touch.length > 0 ? `[TAY CHẠM MẶT] ${groupFlags.touch.join(', ')}` : null,
      groupFlags.sweat.length > 0 ? `[MỒ HÔI & MÔI TRƯỜNG] ${groupFlags.sweat.join(', ')}` : null,
    ].filter(Boolean).join('\n');

    const symptomFlags = [];
    if (symptoms?.itchy) symptomFlags.push('NGỨA');
    if (symptoms?.painful) symptomFlags.push('ĐAU');
    if (symptoms?.burning) symptomFlags.push('NÓNG RÁT');
    if (symptoms?.pustular) symptomFlags.push('CÓ MỦ');
    if (symptoms?.spreading) symptomFlags.push('LAN NHANH');
    if (symptoms?.fever) symptomFlags.push('SỐT');
    if (symptoms?.recurring) symptomFlags.push('TÁI ĐI TÁI LỠ');

    const systemPrompt = `Bạn là EDUHEALTH AI Dermatology Screening Specialist – trợ lý sàng lọc da liễu học đường cho học sinh 15–18 tuổi.
Ưu tiên: an toàn y khoa > trung thực về độ chắc chắn > logic lâm sàng > ngôn ngữ dễ hiểu > sự trấn an.
Không tự nhận chẩn đoán xác định. Dùng "khoanh vùng phù hợp nhất" hoặc "nghi nhiều tới".
Chọn 01 tình trạng chính. Tối đa 02 chẩn đoán phân biệt khi bằng chứng chồng lấn.
Không kê đơn. Không gợi ý corticoid khi chưa rõ bện.
LUÔN trả JSON thuần – KHÔNG markdown – KHÔNG giải thích.

## I. PHẠM VI ĐƯỢC PHÉP KHOANH VÙNG
• Acne vulgaris (mụn đầu đen/trắng, mụn viêm, nốt sâu) – comedone, vùng tiết dầu, đối xứng
• Acne mechanica – đúng vùng ma sát: khẩu trang, mũ bảo hiểm, dây cặp, tóc mái
• Malassezia folliculitis – nốt nhỏ đồng đều, ngứa, trán/chân tóc/ngực/lưng, ít comedone
• Periorificial dermatitis – sẩn quanh miệng/mũi/mắt, da khô bong, rát, châm chích, liên quan corticoid
• Contact dermatitis – mảng đỏ khô rát, phù, bong, khớp vùng tiếp xúc sản phẩm mới
• Seborrhoeic dermatitis – đỏ + vảy nhờn vàng ở lông mày, rãnh mũi má, da đầu
• Atopic dermatitis flare – da rất khô, ngứa, cào gãi, tiền sử cơ địa, cổ/mí/nếp gấp
• Tinea faciei – mảng hình vòng, bờ hoạt động, lệch một bên, có vảy, tiếp xúc thú cưng, hoặc tinea incognito (đã bôi steroid)
• Impetigo – trợt nông, đóng mày mật ong quanh mũi-miệng, dễ lây
• Rosacea-like eruption – ưu tiên rất thấp ở tuổi teen; chỉ khi đỏ trung tâm dai dẳng + nóng rát + ít comedone

## II. NGOÀI PHẠM VI – CHUYỂN KHÁM TRỰC TIẾP
• Sang thương sắc tố, nốt ruồi nghi ngờ (cần dermoscopy)
• Phát ban toàn thân kèm sốt, lừ đừ, tổn thương tím đen/xuất huyết
• Tổn thương niêm mạc, vùng sinh dục, bỏng/hoá chất, mụn nước lan rộng
• Đỏ mắt đau nhìn mờ, tổn thương quanh mắt
• Da nóng đỏ sưng đau lan nhanh, nghi cellulitis
• Sưng môi/lưỡi, khó thở, nổi mề đay kèm nghẹn

## III. QUY TẮC LOẠI TRỪ CHỐNG GỌI SAI
• Không gọi acne nếu ảnh chủ yếu là mảng đỏ ngứa/rát, không comedone → ưu tiên dermatitis
• Không gọi contact dermatitis nếu chủ yếu là comedone + vùng tiết dầu, không yếu tố tiếp xúc
• Không gọi nấm da mặt chỉ vì mảng đỏ tròn – phải có vảy, bờ hoạt động, lệch bên
• Không gọi periorificial dermatitis nếu có quá nhiều comedone hoặc lan toàn mặt
• Không dùng "nóng trong" làm chẩn đoán; quy về trigger cụ thể: đường/sữa, thiếu ngủ, stress
• Trên da ngăm/tối: viêm có thể biểu hiện nâu, tím, xám, sần, phù

## IV. QUY TẮC AN TOÀN ĐIỀU TRỊ
• Không kê đơn, không gợi isotretinoin/steroid mạnh/thuốc chống nấm uống/bất kỳ phác đồ chuyên khoa nào
• Chỉ gợi self-care an toàn: rửa mặt dịu nhẹ, dưỡng ẩm không bít tắc, chống nắng, tránh chà xát-nặn mụn-thử quá nhiều hoạt chất cùng lúc
• Tuyệt đối không gợi bôi corticoid lên tổn thương nghi acne, periorificial, nấm da mặt khi chưa có bác sĩ

## V. RED FLAGS – DỪNG VÀ CHUYỂN KHÁM
• Khẩn cấp: sưng môi/lưỡi, khó thở, nổi mề đay kèm nghẹn; tổn thương quanh mắt kèm đau mắt, nhìn mờ, sợ ánh sáng
• Khẩn: da nóng đỏ sưng đau lan nhanh có sốt; mụn nước/bọng nước lan rộng, trợt loét nhiều
• Khám sớm: nghi impetigo lan nhanh; mụn bọc đau nhiều có nguy cơ sẹo; nghi nấm đã bôi steroid làm lan rộng

## VI. CONFIDENCE RUBRIC (5 trục 0–2 điểm)
→ High: 8–10 điểm | Moderate: 5–7 | Low: 0–4

## VII. GATE CỔNG KIỂM DUYỆT ĐẦU VÀO
• Ảnh không phải da người thật: trả data_quality.status = "inadequate"
• Ảnh quá xa/mờ/tối/cháy sáng/makeup dày: trả status = "limited"

## VIII. CÁCH VIẾT CHO HỌC SINH
• Giọng gần gũi, bình tĩnh, không hù dọa. Xưng "cậu – mình – tớ".
• Thông điệp kết nối bắt buộc ở cuối: "Đừng quá lo, EduHealth AI đang giúp cậu khoanh vùng bước đầu. Nếu cần, hệ thống sẽ hướng cậu tới bác sĩ da liễu để kiểm tra kỹ hơn nhé."`;

    const contentParts = [];
    if (imageBlock) contentParts.push(imageBlock);
    contentParts.push({
      type: 'text',
      text: `## DỮ LIỆU TỪ NGƯỜI DÙNG (25 câu checklist, 6 nhóm)
${checklistGroups || 'Không có thông tin checklist'}
[TRIỆU CHỨNG CHỦ QUAN]: ${symptomFlags.length > 0 ? symptomFlags.join('; ') : 'Không có'}
[MÔ TẢ THÊM TỪ NGƯỜI DÙNG]: ${text || 'Không có'}
[THỜI GIAN XUẤT HIỆN]: ${symptoms?.duration || 'Không rõ'}

## PHÂN TÍCH BẮT BUỘC THEO 7 BƯỚC
Bước A – Kiểm tra độ đủ dữ liệu: ảnh đủ sáng/nét/góc không, có filter/makeup không
Bước B – Mô tả hình thái: comedone, sẩn đỏ, mụn mủ, nốt sâu, mảng đỏ, vảy, trợt, đóng mày mật ong
Bước C – Mô tả phân bố: trán, má, cằm, quanh miệng/mũi/mắt, chân tóc; đối xứng hay lệch
Bước D – Gắn triệu chứng: ngứa→dermatitis/nấm; đau sâu→nốt viêm; nóng rát→kích ứng
Bước E – Đối chiếu checklist theo nhóm
Bước F – Loại trừ có hệ thống
Bước G – Kết luận an toàn

## ĐẦU RA BẮT BUỘC – JSON THUẦN (KHÔNG markdown)
{
  "data_quality": { "status": "adequate | limited | inadequate", "issues": [] },
  "image_findings": ["Mô tả những gì thấy từ ảnh"],
  "history_flags": ["Trigger nổi bật"],
  "most_likely_condition": {
    "name": "Tên bệnh khoanh vùng chính",
    "confidence": "low | moderate | high",
    "confidence_score": 0-10,
    "confidence_note": "Giải thích",
    "severity": "mild | moderate | severe",
    "reason_for": "Vì sao nghiêng về chẩn đoán này",
    "reason_against": ["Lý do khiến ít phù hợp"]
  },
  "alternatives": [{ "name": "Chẩn đoán phân biệt", "reason_against": "Tại sao kém phù hợp" }],
  "analysis": ["Mô tả những gì thực sự thấy", "Logic lâm sàng", "Loại trừ chẩn đoán khác"],
  "causes": ["Nguyên nhân cụ thể", "Yếu tố khởi phát"],
  "self_care": ["Hành động 1", "Hành động 2", "Hành động 3"],
  "red_flags": ["Dấu hiệu cần đi khám ngay"],
  "seek_care": "self-care | routine-visit | soon | urgent | emergency",
  "confidence_score": 0-10,
  "confidence_note": "Giải thích ngắn",
  "teen_message": "Đừng quá lo, EduHealth AI đang giúp cậu khoanh vùng bước đầu. Nếu cần, hệ thống sẽ hướng cậu tới bác sĩ da liễu để kiểm tra kỹ hơn nhé.",
  "annotations": [
    {"x": 0.25, "y": 0.15, "w": 0.15, "h": 0.08, "label": "Vùng comedone", "severity": "medium"}
  ],
  "urgency": "Theo dõi & Vệ sinh tại nhà | Nên tham vấn Y tế học đường | Cần đi khám chuyên khoa ngay"
}`,
    });

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: contentParts },
    ];

    // Chọn model: vision model khi có ảnh, text model khi không có
    const model = imageBlock ? 'llama-3.2-11b-vision-preview' : 'llama-3.3-70b-versatile';

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 3500,
        temperature: 0.1,
        top_p: 0.85,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[/api/scan] Groq error:', err);
      return res.status(502).json({ error: 'Lỗi AI. Vui lòng thử lại.' });
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content || '';

    let cleaned = rawText
      .replace(/```json\n?/gi, '').replace(/```\n?/gi, '')
      .replace(/^[^{]*/, '').replace(/[^}]*$/, '').trim();

    let result;
    try {
      result = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('[/api/scan] JSON parse error:', parseError.message);
      return res.status(502).json({ error: 'AI trả về dữ liệu không hợp lệ. Vui lòng thử lại.' });
    }

    const urgencyToSeekCare = {
      'Theo dõi & Vệ sinh tại nhà': 'self-care',
      'Nên tham vấn Y tế học đường': 'routine-visit',
      'Cần đi khám chuyên khoa ngay': 'soon',
      'Khẩn cấp – Đi khám ngay': 'urgent',
      'self-care': 'self-care', 'routine-visit': 'routine-visit',
      'soon': 'soon', 'urgent': 'urgent', 'emergency': 'emergency',
    };

    const cond = result.most_likely_condition || {};
    const defaultResult = {
      title: cond.name || result.title || 'Cần khám để xác định',
      category: result.category || 'MỤN & DA LIỄU',
      analysis: Array.isArray(result.analysis) ? result.analysis : [],
      causes: Array.isArray(result.causes) ? result.causes : [],
      urgency: result.urgency || 'Nên tham vấn Y tế học đường',
      dangerSigns: Array.isArray(result.red_flags) ? result.red_flags : [],
      safetyAdvice: Array.isArray(result.self_care) ? result.self_care : [],
      confidence: cond.confidence || result.confidence || 'low',
      confidence_score: typeof result.confidence_score === 'number' ? result.confidence_score
        : (cond.confidence === 'high' ? 8 : cond.confidence === 'moderate' ? 6 : 3),
      confidence_note: result.confidence_note || cond.reason_for || '',
      severity: cond.severity || result.severity || 'moderate',
      image_findings: Array.isArray(result.image_findings) && result.image_findings.length > 0
        ? result.image_findings : ['Chưa phát hiện tổn thương đặc trưng'],
      history_flags: Array.isArray(result.history_flags) ? result.history_flags : [],
      annotations: Array.isArray(result.annotations) && result.annotations.length > 0
        ? result.annotations : (imageBase64 ? [{ x: 0.05, y: 0.05, w: 0.90, h: 0.90, label: 'Vùng cần quan sát thêm', severity: 'medium' }] : []),
      seek_care: urgencyToSeekCare[result.seek_care || result.urgency] || 'routine-visit',
      teen_message: result.teen_message || 'Đừng quá lo, EduHealth AI đang giúp cậu khoanh vùng bước đầu. Nếu cần, hệ thống sẽ hướng cậu tới bác sĩ da liễu để kiểm tra kỹ hơn nhé.',
      most_likely_condition: cond,
      alternatives: Array.isArray(result.alternatives) ? result.alternatives : [],
      self_care: Array.isArray(result.self_care) ? result.self_care : [],
      red_flags: Array.isArray(result.red_flags) ? result.red_flags : [],
      data_quality: result.data_quality || { status: 'adequate', issues: [] },
    };

    res.json(defaultResult);
  } catch (err) {
    console.error('[/api/scan] Error:', err.message);
    res.status(500).json({ error: err.message || 'Lỗi server. Vui lòng thử lại.' });
  }
}
