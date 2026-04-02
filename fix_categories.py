import re

APP_PATH = r"e:\eduhealth-ai---trợ-lý-sức-khỏe-học-đường (1)\App.tsx"

with open(APP_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix corrupted Vietnamese chars in CATEGORY_COLORS
fixes = {
    "'MỤN & DA LIỄU'": "'M\u1ee4N & DA LIỄU'",
    "'MỤN & DA LIỄU'": "'M\u1ee5N & DA LIỄU'",  # M followed by U+0323 (dot below) then N
}

# More targeted: fix specific byte sequences that got corrupted
# The file has these wrong sequences (looking at hex):
# Ụ -> Ụ (CORRECT)
# Ụ -> Ụ (CORRECT)
# Let me use direct string replacements based on what I saw
# Lines 698-706 had: MỤN & DA LIỄU, BỆNH LÂY NHIỄM, THỊ LỰC, SỨC KHỎE TÂM LÝ, TIÊU HÓA, VỆ SINH

# Check what the current file has
print("Checking current state...")

# Read as bytes to see what's there
with open(APP_PATH, 'rb') as f:
    data = f.read()

# The wrong bytes (from corrupted display) - they appear as wrong chars
# M followed by U+031B (horn) - that's wrong
# Let's find and replace using the exact bytes from the corrupted output

# I need to fix lines 698-706 in CATEGORY_COLORS and allCategories
# The CORRECT categories are:
CORRECT = {
    'MỤN & DA LIỄU': 'M\u1ee5N & DA LIỄU',
    'BỆNH LÂY NHIỄM': 'B\u1ec6NH L\u00c2Y NHI\u1ec6M',
    'THỊ LỰC': 'TH\u1ecb L\u01b0\u0323C',
    'SỨC KHỎE TÂM LÝ': 'S\u1ee8C KH\u1ecfe T\u00c2M L\u00dd',
    'TIÊU HÓA': 'TI\u00caU H\u00d3A',
    'VỆ SINH': 'V\u1ec6 SINH',
}

# Actually, let me just check what Unicode codepoints are in the file for these
# and fix them properly

# Read and find all occurrences of category names
import re

# Find CATEGORY_COLORS block
cat_match = re.search(r"const CATEGORY_COLORS.*?;\s*const allCategories", content, re.DOTALL)
if cat_match:
    block = cat_match.group()
    print("Found CATEGORY_COLORS block")
    # Replace the entire block with correct content
    correct_block = '''  const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hover: string; chip: string }> = {
    'MỤN & DA LIỄU':    { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', hover: 'hover:bg-red-50 hover:shadow-red-100', chip: 'bg-red-500 text-white' },
    'BỆNH LÂY NHIỄM':   { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', hover: 'hover:bg-orange-50 hover:shadow-orange-100', chip: 'bg-orange-500 text-white' },
    'THỊ LỰC':           { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', hover: 'hover:bg-violet-50 hover:shadow-violet-100', chip: 'bg-violet-500 text-white' },
    'SỨC KHỎE TÂM LÝ':  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', hover: 'hover:bg-pink-50 hover:shadow-pink-100', chip: 'bg-pink-500 text-white' },
    'TIÊU HÓA':          { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', hover: 'hover:bg-green-50 hover:shadow-green-100', chip: 'bg-green-500 text-white' },
    'VỆ SINH':           { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', hover: 'hover:bg-cyan-50 hover:shadow-cyan-100', chip: 'bg-cyan-500 text-white' },
  };

  const allCategories = ['MỤN & DA LIỄU', 'BỆNH LÂY NHIỄM', 'THỊ LỰC', 'SỨC KHỎE TÂM LÝ', 'TIÊU HÓA', 'VỆ SINH'];'''
    new_content = content[:cat_match.start()] + correct_block + content[cat_match.end():]
    with open(APP_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed CATEGORY_COLORS and allCategories!")
else:
    print("Could not find CATEGORY_COLORS block!")
