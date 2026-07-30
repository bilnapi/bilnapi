import React, { useState } from 'react';
import { X, BookOpen, Globe, Code, Cloud, Github, ExternalLink, CheckCircle, Sparkles, Copy, Check } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-rose-100 max-h-[92vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-serif-display text-slate-800">
              Hướng Dẫn Tạo Web Kỷ Niệm Miễn Phí 100% Từ A - Z
            </h3>
            <p className="text-xs md:text-sm text-slate-500">
              Dành cho hai vợ chồng muốn tự tạo website riêng không mất chi phí duy trì
            </p>
          </div>
        </div>

        <div className="my-6 space-y-6 text-sm text-slate-700">
          {/* Intro Box */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm leading-relaxed text-slate-700">
              Bạn hoàn toàn có thể sở hữu một trang web đếm ngày yêu, lưu giữ album ảnh và kỷ niệm
              của hai vợ chồng với <strong>tên miền riêng hoàn toàn miễn phí</strong>. Dưới đây là 4 bước thực hiện đơn giản nhất!
            </p>
          </div>

          {/* Step 1 */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-slate-800 text-base">
                Tải Mã Nguồn / Xuất Web (Export / Deploy)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Trang web bạn đang xem đã được tích hợp đầy đủ tính năng: Đếm ngày yêu, Album ảnh, Nhật ký thư tình, Bucket list ước mơ.
            </p>
            <ul className="text-xs space-y-2 text-slate-600 list-disc list-inside bg-slate-50 p-3 rounded-xl">
              <li>
                Bạn có thể nhấn nút <strong>Export / Share</strong> ở menu trên cùng của AI Studio để tải toàn bộ source code ZIP hoặc đẩy trực tiếp lên <strong>GitHub</strong>.
              </li>
              <li>Tất cả dữ liệu hình ảnh, ghi chú được lưu trực tiếp trong bộ nhớ thiết bị (localStorage) nên hoàn toàn bảo mật và miễn phí.</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-slate-800 text-base">
                Đưa Web Lên Mạng Với Netlify hoặc Vercel (Free 100%)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Netlify & Vercel là hai nền tảng hosting miễn phí tốt nhất hiện nay, tự động phát HTTPS (khóa bảo mật) cho website.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <Globe className="w-4 h-4 text-sky-500" /> Cách 1: Đưa lên Netlify (Không cần viết code)
                </p>
                <p className="text-slate-600">
                  1. Truy cập <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-rose-600 underline font-medium">app.netlify.com</a> và đăng ký tài khoản miễn phí.
                </p>
                <p className="text-slate-600">
                  2. Chạy câu lệnh <code>npm run build</code> để tạo thư mục <code>dist</code>.
                </p>
                <p className="text-slate-600">
                  3. Kéo thả thư mục <code>dist</code> vào mục <strong>Sites / Deploy manually</strong> trên Netlify. Thế là xong!
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <Github className="w-4 h-4 text-slate-800" /> Cách 2: Đẩy code lên GitHub + Vercel
                </p>
                <p className="text-slate-600">
                  1. Đẩy mã nguồn lên repository GitHub riêng tư hoặc công khai.
                </p>
                <p className="text-slate-600">
                  2. Kết nối tài khoản GitHub với <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-rose-600 underline font-medium">Vercel.com</a>.
                </p>
                <p className="text-slate-600">
                  3. Bấm <strong>Import Project</strong>, Vercel sẽ tự động build và cấp đường dẫn như <code>chong-yeu-vo-2025.vercel.app</code>!
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-slate-800 text-base">
                Lưu Trữ Hình Ảnh Lâu Dài Miễn Phí (Cloud Storage)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Để trang web không bị nặng và chứa được hàng ngàn bức ảnh chất lượng cao:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-600 list-disc list-inside bg-slate-50 p-3 rounded-xl">
              <li>
                <strong>Imgur / Cloudinary / Google Photos / PostImages:</strong> Bạn có thể upload ảnh lên các trang miễn phí này và dán đường dẫn (URL) vào mục "Tải ảnh" của web.
              </li>
              <li>Hoặc chọn ảnh trực tiếp từ bộ nhớ máy, trang web sẽ lưu trực tiếp trên trình duyệt của bạn.</li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h4 className="font-bold text-slate-800 text-base">
                Tạo Tên Miền Đẹp & Đặt Làm Hình Nền Điên Thoại
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              • Bạn có thể đổi tên trang web thành <code>tenchong-tenvo.netlify.app</code> hoặc mua tên miền <code>.com</code> giá ~200k/năm nếu thích.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              • Trên iPhone / Android, hãy bấm <strong>"Thêm vào Màn hình chính" (Add to Home Screen)</strong> để tạo biểu tượng ứng dụng kỷ niệm ngay trên điện thoại!
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">Chúc hai vợ chồng luôn hạnh phúc & đong đầy kỷ niệm! ❤️</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 transition-all"
          >
            Đã Hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
