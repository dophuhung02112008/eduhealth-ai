path = r"e:\eduhealth-ai---trợ-lý-sức-khỏe-học-đường (1)\App.tsx"
with open(path, 'r', encoding='utf-8') as f:
    t = f.read()

# Find and replace the CATEGORY_COLORS block (lines ~751-760) and allCategories (~760)
# The block starts with "const CATEGORY_COLORS" and ends with "allCategories = [..."
# Find it via regex
import re

# Replace CATEGORY_COLORS block
old_block = re.search(r"  const CATEGORY_COLORS.*?allCategories = \[.*?\];", t, re.DOTALL)
if old_block:
    new_block = """  const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hover: string; chip: string }> = {
    'MỤN & DA LIỄU':    { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', hover: 'hover:bg-red-50 hover:shadow-red-100', chip: 'bg-red-500 text-white' },
    'BỆNH LÂY NHIỄM':   { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', hover: 'hover:bg-orange-50 hover:shadow-orange-100', chip: 'bg-orange-500 text-white' },
    'THỊ LỰC':           { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', hover: 'hover:bg-violet-50 hover:shadow-violet-100', chip: 'bg-violet-500 text-white' },
    'SỨC KHỎE TÂM LÝ':  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', hover: 'hover:bg-pink-50 hover:shadow-pink-100', chip: 'bg-pink-500 text-white' },
    'TIÊU HÓA':          { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', hover: 'hover:bg-green-50 hover:shadow-green-100', chip: 'bg-green-500 text-white' },
    'VỆ SINH':           { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', hover: 'hover:bg-cyan-50 hover:shadow-cyan-100', chip: 'bg-cyan-500 text-white' },
  };

  const allCategories = ['MỤN & DA LIỄU', 'BỆNH LÂY NHIỄM', 'THỊ LỰC', 'SỨC KHỎE TÂM LÝ', 'TIÊU HÓA', 'VỆ SINH'];"""
    t = t[:old_block.start()] + new_block + t[old_block.end():]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(t)
    print("Fixed CATEGORY_COLORS!")
else:
    print("Block not found - might already be correct")
