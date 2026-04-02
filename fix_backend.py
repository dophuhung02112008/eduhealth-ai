path = r"e:\eduhealth-ai---trợ-lý-sức-khỏe-học-đường (1)\backend\server.js"
with open(path, 'r', encoding='utf-8') as f:
    t = f.read()

# Fix categories list
t = t.replace(
    '"category": "MỤN & DA LIỄU | BỆNH LÂY NHIỄM | THỊ LỰC | SỨC KHỎE TÂM LÝ | TIÊU HÓA | VỆ SINH",',
    '"category": "MỤN & DA LIỄU | BỆNH LÂY NHIỄM | SỨC KHỎE TÂM LÝ | VỆ SINH",'
)
t = t.replace(
    "category: result.category || 'MỤN & DA LIỄU',",
    "category: result.category || 'MỤN & DA LIỄU',"
)
t = t.replace(
    "category: result.category || 'TRUYỀN NHIỄM',",
    "category: result.category || 'MỤN & DA LIỄU',"
)

# Remove THỊ LỰC section entirely
t = t.replace(
    """
### THỊ LỰC:
1. Viêm kết mạc (Đau mắt đỏ): Mắt đỏ rực + ghèn nhiều + chảy nước mắt, lây qua tiếp xúc.

""",
    ""
)

# Remove TIÊU HÓA section entirely
t = t.replace(
    """
### TIÊU HÓA:
1. Tiêu chảy nhiễm trùng (Rotavirus): Nôn ói + tiêu chảy nhiều + sốt, thường mùa đông.

""",
    ""
)

# Update VỆ SINH section
t = t.replace(
    "### VỆ SINH:\n1. Chấy rận (Head Lice): Ngứa da đầu dữ dội, thấy chấy/rận bám tóc, lây qua tiếp xúc đầu.",
    "### VỆ SINH:\n1. Sốt tinh hồng nhiệt: Sốt cao + đau họng + phát ban đỏ như giấy nhám + lưỡi dâu tây.\n2. Nhiễm khuẩn da: Da đỏ sưng nóng, có mủ, sốt do vi khuẩn (tụ cầu, liên cầu)."
)

# Remove chấy rận from QUY TẮC PHÂN TÍCH
t = t.replace(
    "- Nếu có MẮT ĐỎ + GHÈN nhiều → Viêm kết mạc\n   ",
    ""
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(t)

print("Backend fixed!")
