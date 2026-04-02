
export enum UrgencyLevel {
  HOME_MONITOR = 'Theo dõi & Vệ sinh tại nhà',
  SEE_SCHOOL_HEALTH = 'Nên tham vấn Y tế học đường',
  URGENT_DOCTOR = 'Cần đi khám chuyên khoa ngay'
}

export interface EducationalImage {
  url: string;
  caption: string;
}

export type HealbookCategory =
  | 'MỤN & DA LIỄU' | 'BỆNH LÂY NHIỄM' | 'SỨC KHỎE TÂM LÝ' | 'VỆ SINH';

export interface HealbookTopic {
  id: string;
  category: HealbookCategory;
  title: string;
  shortDescription: string;
  educationalImages: EducationalImage[];
  commonSigns: string[];
  schoolContext: string; // Lý do lây lan trong môi trường học tập
  dangerSigns: string[];
  safeActions: string[];
  references: { title: string; url: string }[];
  samplePrompt: string;
}

export interface WeeklyTrend {
  id: string;
  icon: string;       // emoji
  title: string;
  description: string;
  category: HealbookCategory | 'TẤT CẢ';
  alertLevel: 'hot' | 'warn' | 'info'; // hot = số ca tăng, warn = cảnh báo, info = thông tin
  relatedTopicId?: string; // link đến bài trong HEALBOOK_DATA
  relatedTopicTitle?: string;
}

export interface HealthCase {
  id: string;
  title: string;
  category: string;
  analysis: string[];
  causes: string[];        // Nguyên nhân có thể gây ra tình trạng này
  urgency: UrgencyLevel;
  dangerSigns: string[];
  safetyAdvice: string[];
  annotations?: HeatmapAnnotation[]; // Tọa độ vùng tổn thương trên ảnh
}

export interface HeatmapAnnotation {
  x: number;        // Tọa độ X (0-1, normalized)
  y: number;        // Tọa độ Y (0-1, normalized)
  w: number;        // Chiều rộng vùng (0-1)
  h: number;        // Chiều cao vùng (0-1)
  label: string;    // Nhãn: "Vùng viêm", "Vùng nguy hiểm", etc.
  severity: 'high' | 'medium' | 'low';
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  label: string;
  intensity: number;
}

export type UserRole = 'Học sinh' | 'Phụ huynh' | 'Cán bộ y tế';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
