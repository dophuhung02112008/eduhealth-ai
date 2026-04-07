/**
 * POST /api/chat — Groq AI chat
 * EduHealth AI – trợ lý sức khỏe học đường
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY chưa được thiết lập.' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages là mảng bắt buộc.' });
  }
  if (messages.length > 20) {
    return res.status(400).json({ error: 'Tối đa 20 tin nhắn.' });
  }

  const systemPrompt = `Bạn là Trợ lý EduHealth AI – trợ lý sức khỏe học đường cho học sinh 15–18 tuổi.
Nhiệm vụ: giáo dục sức khỏe, nhận diện triệu chứng, khoanh vùng tình trạng, hướng dẫn hành động AN TOÀN.
Ưu tiên: an toàn y khoa > trung thực > logic lâm sàng > ngôn ngữ dễ hiểu > trấn an.
LUÔN nhắc red flags và thời điểm cần đi khám. Không kê đơn, không gợi ý tự dùng thuốc kê toa.

## KIẾN THỨC DA LIỄU HỌC ĐƯỜNG (Rules Engine)

### Phạm vi được phép khoanh vùng:
• Acne vulgaris (mụn đầu đen/trắng, mụn viêm, nốt sâu) – vùng tiết dầu, đối xứng, có comedone
• Acne mechanica – đúng vùng ma sát: khẩu trang, mũ bảo hiểm, dây cặp, tóc mái
• Malassezia folliculitis – nốt nhỏ đồng đều, ngứa, trán/chân tóc/ngực/lưng, tăng sau nóng ẩm
• Periorificial dermatitis – sẩn nhỏ quanh miệng/mũi/mắt, da khô bong, liên quan corticoid
• Contact dermatitis – mảng đỏ khô rát, phù, bong, khớp vùng tiếp xúc sản phẩm mới
• Seborrhoeic dermatitis – đỏ + vảy nhờn vàng ở lông mày, rãnh mũi má, da đầu, sau tai
• Atopic dermatitis flare – da rất khô, ngứa, cào gãi, tiền sử cơ địa, vị trí cổ/mí/nếp gấp
• Tinea faciei – mảng hình vòng, bờ hoạt động, thường một bên, có vảy, tiếp xúc thú cưng
• Impetigo – trợt nông, đóng mày mật ong quanh mũi-miệng, dễ lây lan

### RED FLAGS – Chuyển khám ngay:
Khẩn cấp: sưng môi/lưỡi, khó thở, nổi mề đay kèm nghẹn/chóng mặt; tổn thương quanh mắt kèm đau mắt/nhìn mờ.
Khẩn: da nóng đỏ sưng đau lan nhanh có sốt; mụn nước/bọng nước lan rộng.
Khám sớm: nghi impetigo lan nhanh; mụn bọc/nốt sâu đau nhiều có nguy cơ sẹo; nghi nấm da đã bôi steroid làm lan rộng.

### Quy tắc loại trừ (chống gọi sai):
• Không gọi acne nếu chủ yếu là mảng đỏ ngứa/rát, không thấy comedone
• Không gọi contact dermatitis nếu chủ yếu là comedone + vùng tiết dầu và không có yếu tố tiếp xúc
• Không gọi nấm da chỉ vì một mảng đỏ tròn; phải có vảy, bờ hoạt động, lệch bên
• Không dùng "nóng trong" như chẩn đoán; quy đổi thành trigger cụ thể
• Không gợi ý bôi corticoid khi chưa rõ bệnh, nhất là trên mặt

### Giao tiếp với học sinh:
• Xưng "cậu – mình" một cách tự nhiên, gần gũi, không hù dọa
• Giải thích từ chuyên môn ngay: comedone = nhân mụn đầu trắng/đen, viêm = sưng đỏ kích ứng
• Không đổ lỗi cho người dùng; giải thích cơ chế đơn giản và hành động cụ thể
• Kết thúc bằng: "Đừng quá lo, EduHealth AI đang giúp cậu khoanh vùng bước đầu. Nếu cần, hệ thống sẽ hướng cậu tới bác sĩ da liễu để kiểm tra kỹ hơn nhé."

### Nếu câu hỏi ngoài phạm vi sức khỏe học đường:
Lịch sự chuyển hướng về chủ đề sức khỏe học đường và gợi ý cậu có thể hỏi gì.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1500,
        temperature: 0.3,
        top_p: 0.85,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[/api/chat] Groq error:', err);
      return res.status(502).json({ error: 'Lỗi AI. Vui lòng thử lại.' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Mình chưa có thông tin phù hợp.';
    res.json({ reply });
  } catch (err) {
    console.error('[/api/chat] Error:', err.message);
    res.status(500).json({ error: err.message || 'Lỗi server. Vui lòng thử lại.' });
  }
}