import os, sys

BASE = 'e:/eduhealth-ai---trợ-lý-sức-khỏe-học-đường (1)/backend/server.js'

with open(BASE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find SEED_ARTICLES
start = content.find('const SEED_ARTICLES = [')
end = content.find('];', start) + 2

articles = [
    {'id':1,'title':'5 dau hieu canh bao suc khoe hoc duong cha me can biet','summary':'Nhieu benh ly pho bien o hoc sinh neu duoc phat hien som se de dieu tri. Bai viet tong hop 5 dau hieu canh bao suc khoe ma phu huynh va giao vien khong nen bo qua.','content':'Cac dau hieu: (1) Met moi keo dai khong ro nguyen nhan, (2) Thay doi can nang dot ngot, (3) Dau dau thuong xuyen, (4) Roi loan giac ngu, (5) Da noi man khong ro nguyen nhan. Phu huynh nen dua con di kham tai co so y te gan nhat.','source_name':'Suc Khoe Tre','source_url':'https://suckhoe.tuoitre.vn/5-dau-hieu-suc-khoe-hoc-duong-cha-me-can-biet','image_url':'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600','published_date':'2026-04-05','category':'Suc khoe hoc duong','tags':['suc khoe','hoc duong','phong benh','cha me'],'read_time':4,'is_featured':True},
    {'id':2,'title':'Thoi diem vang bo sung vi chat cho hoc sinh trong nam hoc','summary':'Giai doan nam hoc moi la thoi diem tre can nguon dinh duong day du nhat. Bac si khuyen cao phu huynh can chu y bo sung vitamin va khoang chat phu hop.','content':'Can bo sung: Vitamin D (giup hap thu canxi), Vitamin A (tot cho mat), Sat (phong thieu mau), Kem (ho tro phat trien chieu cao), Canxi. Nguon thuc pham: sua, rau xanh, trung, ca, thit do, cac loai dau.','source_name':'Vien Dinh duong VN','source_url':'https://suckhoe.tuoitre.vn/thoi-diem-vang-bo-sung-vi-chat-cho-hoc-sinh','image_url':'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600','published_date':'2026-04-04','category':'Dinh duong hoc duong','tags':['dinh duong','vitamin','hoc sinh','nam hoc'],'read_time':5,'is_featured':False},
    {'id':3,'title':'Cach phong tranh dich benh trong mua tuu truong','summary':'Mua tuu truong la thoi diem dich benh de bung phat do tap trung dong hoc sinh. Chuyen gia y te huong dan cac bien phap phong tranh hieu qua.','content':'Phong benh: (1) Rua tay xa phong 20 giay, (2) Deo khau trang noi dong nguoi, (3) Tiem vaccine day du, (4) Giu ve sinh lop hoc sach, (5) Uong du nuoc, an rau xanh, (6) Khi co trieu chung can nghi hoc va di kham. Cac benh thuong gap: cum, tieu chay, tay chan mieng, dau mat do.','source_name':'Bo Y te VN','source_url':'https://suckhoe.tuoitre.vn/cach-phong-tranh-dich-benh-mua-tuu-truong','image_url':'https://images.unsplash.com/photo-1584036561566-baf8f5f1b9de?w=600','published_date':'2026-04-03','category':'Phong benh','tags':['dich benh','phong benh','tuu truong','y te'],'read_time':3,'is_featured':False},
    {'id':4,'title':'Tam ly hoc duong: Nhan biet va xu ly stress o hoc sinh THCS','summary':'Ap luc hoc tap, quan he ban be va gia dinh co the gay stress nghiem trong o hoc sinh. Chuyen gia tam ly chia se cach nhan biet som va ho tro tre vuot qua.','content':'Bieu hien stress: (1) Thay doi cam xuc dot ngot, (2) Mat tap trung, hoc kem du, (3) Thay doi an uong va ngu, (4) Tu co lap, it giao tiep, (5) Dau dau, dau bung khong ro. Ho tro: lang nghe con khong phan xet, tao khong gian an toan, khuyen khich the duc, lien he chuyen gia tam ly.','source_name':'Vien Suc khoe Tam than','source_url':'https://suckhoe.tuoitre.vn/tam-ly-hoc-duong-nhan-biet-stress-hoc-sinh-thcs','image_url':'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600','published_date':'2026-04-02','category':'Suc khoe tam than','tags':['tam ly','stress','hoc sinh','THCS'],'read_time':6,'is_featured':False},
    {'id':5,'title':'Huong dan so cuu tai nan thuong gap o truong hoc','summary':'Tre em thuong bi thuong nhe khi vui choi tai truong. Huong dan chi tiet cach so cuu dung cac tai nan pho bien: tray xuoc, gay xuong, bong, hoc di vat.','content':'So cuu: (1) Tray xuoc: rua sach nuoc, boi sat khuan, bang bong, (2) Gay xuong: khong di chuyen tu y, co dinh vi tri gay, goi cap cuu 115, (3) Bong: lam mat vung bong nuoc sach 10-20 phut, khong boi kem danh rang, (4) Hoc di vat: vo lung 5 lan, goi cap cuu neu can, (5) Chay mau mui: ngoi thang, bam canh mui 10 phut.','source_name':'Hoi Chu that do VN','source_url':'https://suckhoe.tuoitre.vn/huong-dan-so-cuu-tai-nan-truong-hoc','image_url':'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600','published_date':'2026-04-01','category':'So cuu','tags':['so cuu','tai nan','truong hoc','hoc sinh'],'read_time':7,'is_featured':False},
    {'id':6,'title':'Dam bao giac ngu cho hoc sinh: Bi quyet ngu du giac de hoc tot','summary':'Thieu ngu la nguyen nhan hang dau khiến hoc sinh met moi va sa sut hoc tap. Nghien cuu cho thay giac ngu 8-10 tieng la can thiet cho tre em va thanh thieu nien.','content':'Lich ngu: tre tieu hoc (6-12 tuoi) can 9-12 tieng, THCS (12-18 tuoi) can 8-10 tieng. Meo: (1) Thiet lap gio ngu co dinh, (2) Tranh man hinh truoc ngu 1 tieng, (3) Phong ngu mat me (18-20 do C), (4) Khong an no hoac uong caffein truoc ngu, (5) Tap the duc nhe ban ngay.','source_name':'Sleep Research Institute','source_url':'https://suckhoe.tuoitre.vn/dam-bao-giac-ngu-cho-hoc-sinh-hoc-tot','image_url':'https://images.unsplash.com/photo-1455693053989-8e15e4e5c6b8?w=600','published_date':'2026-03-31','category':'Giac ngu & Suc khoe','tags':['giac ngu','hoc tap','hoc sinh','suc khoe'],'read_time':4,'is_featured':False},
    {'id':7,'title':'Benh ghe (Scabies) o truong hoc: Phong ngua va dieu tri','summary':'Ghe la benh da lieu lay lan nhanh trong moi truong tap the. Huong dan phu huynh va nha truong nhan biet som va xu ly dung cach.','content':'Ghe do cai ghe gay ra, lay qua tiep xuc truc tiep da-da hoac qua do dung chung. Trieu chung: ngua duc doi ve dem, phat rash o khe ngon tay, cot, nach, ben. Phong ngua: giat ga giuong bang nuoc nong (>50 do C), tranh dung chung do, giu ve sinh ca nhan. Dieu tri: boi thuoc diet ghe theo chi dinh bac si da lieu.','source_name':'BV Da lieu TW','source_url':'https://suckhoe.tuoitre.vn/benh-ghe-o-truong-hoc-phong-ngua-dieu-tri','image_url':'https://images.unsplash.com/photo-1587854692155-cbe1db5e0a13?w=600','published_date':'2026-03-30','category':'Benh da lieu','tags':['ghe','da lieu','lay lan','truong hoc'],'read_time':5,'is_featured':False},
    {'id':8,'title':'Vaccine cho tre em tuoi den truong: Lich tiem chung 2026','summary':'Tiem chung la bien phap phong benh hieu qua nhat cho tre em. Cap nhat lich tiem chung danh cho tre tu 6-18 tuoi theo khuyen cao cua Bo Y te.','content':'Cac vaccine quan trong: (1) Vaccine phong benh vien nao Nhat Ban (JE) - tiem 2 mui cach nhau 1 nam, (2) Vaccine HPV - cho nu tu 9-14 tuoi (2 mui), (3) Vaccine cum hang nam - tiem dau mua dich (thang 9-10), (4) Vaccine COVID-19. Kiem tra va cap nhat so tiem chung dinh ky 6 thang/lan.','source_name':'Bo Y te VN','source_url':'https://suckhoe.tuoitre.vn/vaccine-tre-em-tuoi-den-truong-lich-tiem-chung-2026','image_url':'https://images.unsplash.com/photo-1584308666744-24d5c04f6a2f?w=600','published_date':'2026-03-29','category':'Tiem chung','tags':['vaccine','tiem chung','tre em','phong benh'],'read_time':6,'is_featured':False},
    {'id':9,'title':'Can thi (Myopia) o hoc sinh: Nguyen nhan, dau hieu va phong ngua','summary':'Ty le can thi o hoc sinh Viet Nam tang nhanh, dac biet sau dai dich COVID-19. Chuyen gia nhan khoa chia se cach phong ngua va phat hien som.','content':'Nguyen nhan: (1) Nhin gan qua nhieu (dien thoai, may tinh), (2) Thieu anh sang tu nhien, (3) Di truyen, (4) It hoat dong ngoai troi. Dau hieu: hay chom mat, ngoi gan ti-vi, khong nhin ro bang. Phong ngua: quy tac 20-20-20, hoc ngoai troi 2 tieng/ngay, kham mat dinh ky.','source_name':'BV Mat Trung uong','source_url':'https://suckhoe.tuoitre.vn/can-thi-o-hoc-sinh-nguyen-nhan-dau-hieu-phong-ngua','image_url':'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600','published_date':'2026-03-28','category':'Suc khoe mat','tags':['can thi','mat','hoc sinh','phong ngua'],'read_time':5,'is_featured':False},
    {'id':10,'title':'Xay dung thoi quen an uong lanh manh cho hoc sinh','summary':'Thoi quen an uong hinh thanh tu nho se theo tre suot doi. Chuyen gia dinh duong goi y thuc don can bang va cach xay dung thoi quen an uong lanh manh.','content':'Nguyen tac: (1) Dam bao 4 nhom chat: bot duong, dam, beo, vitamin, (2) An sang day du, (3) Han che thuc an nhanh, nuoc ngot, do chien ran, (4) Uong du 1.5-2 lit nuoc/ngay, (5) An uong cung gia dinh tao thoi quen tich cuc. Tre nen co thoi quen uong nhieu nuoc, an nhieu rau xanh va trai cay.','source_name':'Vien Dinh duong VN','source_url':'https://suckhoe.tuoitre.vn/xay-dung-thoi-quen-an-uong-lanh-manh-cho-hoc-sinh','image_url':'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600','published_date':'2026-03-27','category':'Dinh duong hoc duong','tags':['dinh duong','an uong','thoi quen','hoc sinh'],'read_time':5,'is_featured':False},
]

# Build JS lines
def js_str(s):
    return s.replace("\\","\\\\").replace("'","\\'").replace("\n","\\n").replace("\r","")

lines = ['const SEED_ARTICLES = [']
for a in articles:
    tags = '[' + ', '.join(f"'{t}'" for t in a['tags']) + ']'
    feat = 'true' if a['is_featured'] else 'false'
    lines.append(f"  {{")
    lines.append(f"    id: {a['id']},")
    lines.append(f"    title: '{js_str(a['title'])}',")
    lines.append(f"    summary: '{js_str(a['summary'])}',")
    lines.append(f"    content: '{js_str(a['content'])}',")
    lines.append(f"    source_name: '{js_str(a['source_name'])}',")
    lines.append(f"    source_url: '{a['source_url']}',")
    lines.append(f"    image_url: '{a['image_url']}',")
    lines.append(f"    published_date: '{a['published_date']}',")
    lines.append(f"    category: '{js_str(a['category'])}',")
    lines.append(f"    tags: {tags},")
    lines.append(f"    read_time: {a['read_time']},")
    lines.append(f"    is_featured: {feat},")
    lines.append(f"  }},")
lines.append('];')

new_array = '\n'.join(lines)
new_content = content[:start] + new_array + '\n' + content[end:]

with open(BASE, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('OK')
