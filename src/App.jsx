import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
  Camera,
  Edit3,
  Check,
  Maximize2,
} from 'lucide-react';

// ============================================================================
// 1. CỐ ĐỊNH 3 THÀNH VIÊN & LỜI NHẮN RIÊNG (Bạn tự sửa chữ trực tiếp ở đây)
// ============================================================================
const MEMBERS_DATA = [
  {
    id: 'bich-ngoc',
    fullName: 'Phan Thị Bích Ngọc',
    shortName: 'Bích Ngọc',
    roleTag: 'Chị cả tận tâm',
    caption: 'Phan Thị Bích Ngọc — Luôn rạng rỡ, bình an và ngập tràn niềm vui nhé! ♡',
    photo: '/Nu.png',
    fallbackPhoto:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'thu-huong',
    fullName: 'Phạm Thị Thu Hường',
    shortName: 'Thu Hường',
    roleTag: 'Năng lượng tích cực',
    caption: 'Phạm Thị Thu Hường — Luôn tươi tắn, yêu đời và đạt mọi điều mong ước! ♡',
    photo: '/Huong.png',
    fallbackPhoto:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ngoc-tran',
    fullName: 'Lý Huỳnh Ngọc Trân',
    shortName: 'Ngọc Trân',
    roleTag: 'Em út của tiệm',
    caption: 'Lý Huỳnh Ngọc Trân — Luôn hồn nhiên, hạnh phúc và gặp thật nhiều may mắn! ♡',
    photo: '/Tran.png',
    fallbackPhoto:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
  },
];

// ============================================================================
// 2. CỐ ĐỊNH NỘI DUNG BỨC THƯ CHÚC MỪNG TẬP THỂ (Bạn tự sửa trực tiếp ở đây)
// ============================================================================
const CARD_DATA = {
  shopName: 'TIỆM HOA NHÀ MÌNH',
  shopSub: 'FLOWERS & LITTLE GOOD WISHES',
  dateBadge: '20 THÁNG 10 • MỘT NGÀY THẬT ĐẶC BIỆT',
  tagGreeting: 'Gửi 3 chị em làm chung mình quý ♡',
  letterTitle: 'Gửi Tập Thể Của Mình,',
  letterSubTitle: 'Một bó hoa nhỏ gửi đến ba chị em làm chung tuyệt vời',
  paragraphs: [
    'Chúc mừng một ngày thật đẹp gửi đến ba chị em làm chung tuyệt vời: chị Bích Ngọc, Thu Hường và em út Ngọc Trân!',
    'Mình muốn gửi tặng cả nhà một bó hoa nhỏ đặc biệt, biết rằng mỗi ca làm việc có mọi người đồng hành đều tràn ngập tiếng cười, sự sẻ chia và nguồn năng lượng tích cực.',
    'Cảm ơn chị Bích Ngọc luôn chu đáo, cảm ơn Thu Hường luôn nhiệt huyết rạng rỡ, và cảm ơn Ngọc Trân luôn hồn nhiên đáng mến. Nhờ có ba chị em mà những giờ làm việc bận rộn nhất cũng trở nên nhẹ nhàng và đáng nhớ.',
    'Chúc cả ba luôn giữ mãi nụ cười tươi tắn trên môi, thật nhiều sức khỏe, bình an, may mắn và luôn tự do làm những điều mình yêu thích nhé!',
  ],
  closingLine: 'Quý mến cả nhà mình rất nhiều. ♡',
  signature: 'Thương Cả Nhà Mình ♡',
};

// ============================================================================
// 3. DANH SÁCH 5 LOÀI HOA & BỐ CỤC CẮM HOA TRONG BÓ
// ============================================================================
const FLOWERS = [
  {
    id: 'tulip',
    name: 'Tulip',
    placements: [
      { x: 108, y: 106, rotate: -22, scale: 0.96, layer: 'front' },
      { x: 132, y: 84, rotate: -9, scale: 0.78, layer: 'back' },
    ],
  },
  {
    id: 'sunflower',
    name: 'Hướng Dương',
    placements: [{ x: 188, y: 112, rotate: 16, scale: 0.98, layer: 'front' }],
  },
  {
    id: 'rose',
    name: 'Hồng',
    placements: [
      { x: 152, y: 98, rotate: -2, scale: 1.02, layer: 'front' },
      { x: 96, y: 128, rotate: -28, scale: 0.76, layer: 'back' },
    ],
  },
  {
    id: 'daisy',
    name: 'Cúc Hoạ Mi',
    placements: [
      { x: 128, y: 128, rotate: -12, scale: 0.92, layer: 'front' },
      { x: 204, y: 132, rotate: 24, scale: 0.8, layer: 'front' },
    ],
  },
  {
    id: 'baby',
    name: 'Baby Trắng',
    placements: [
      { x: 174, y: 86, rotate: 12, scale: 0.96, layer: 'back' },
      { x: 116, y: 92, rotate: -16, scale: 0.85, layer: 'back' },
    ],
  },
];

const STORAGE_KEY_PHOTOS = 'tiem_hoa_nha_minh_photos_v5';

// ============================================================================
// HÌNH VẼ NGHỆ THUẬT TỪNG LOÀI HOA
// ============================================================================
function FlowerShape({ type, showStem = true }) {
  switch (type) {
    case 'tulip':
      return (
        <g>
          {showStem && (
            <>
              <path d="M40 54 Q39 88 40 124" stroke="#528A42" strokeWidth="4.2" strokeLinecap="round" fill="none" />
              <path d="M39 112 Q18 92 19 62 Q33 76 39 102 Z" fill="#67A455" />
              <path d="M41 116 Q62 96 61 66 Q47 80 41 106 Z" fill="#528A42" />
            </>
          )}
          <path d="M35 55 Q40 60 45 55" stroke="#528A42" strokeWidth="3" fill="none" />
          <path d="M28 34 Q28 14 40 11 Q52 14 52 34 Q52 54 40 55 Q28 54 28 34 Z" fill="#E0486B" />
          <path d="M40 56 Q21 55 21 33 Q21 16 30 14 Q37 24 41 44 Z" fill="#F46B8A" />
          <path d="M40 56 Q59 55 59 33 Q59 16 50 14 Q43 24 39 44 Z" fill="#EC5778" />
          <path d="M26 24 Q25 38 33 49" stroke="#FFA6BA" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.75" />
          <path d="M53 24 Q54 38 46 49" stroke="#FFA6BA" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
        </g>
      );

    case 'sunflower':
      return (
        <g>
          {showStem && (
            <>
              <path d="M40 54 Q41 88 40 124" stroke="#4F873F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M39 94 Q15 84 18 65 Q34 69 39 88 Z" fill="#66A154" />
              <path d="M41 104 Q65 94 62 75 Q46 79 41 98 Z" fill="#4F873F" />
            </>
          )}
          <g transform="translate(40, 34)">
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
              <path
                key={`back-${deg}`}
                d="M0 -8 C-4.5 -15 -4 -23 0 -26 C4 -23 4.5 -15 0 -8 Z"
                fill="#F59E0B"
                transform={`rotate(${deg})`}
              />
            ))}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={`front-${deg}`}
                d="M0 -7 C-5 -14 -4.5 -22 0 -25 C4.5 -22 5 -14 0 -7 Z"
                fill="#FACC15"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle cx="0" cy="0" r="11.5" fill="#6B3410" />
            <circle cx="0" cy="0" r="9.2" fill="#4E2408" />
            <circle cx="0" cy="0" r="7.2" fill="none" stroke="#D97706" strokeWidth="1.4" strokeDasharray="2 2.2" />
            <circle cx="-3" cy="-2.5" r="1.2" fill="#FBBF24" />
            <circle cx="3" cy="-2" r="1.2" fill="#FBBF24" />
            <circle cx="0" cy="3" r="1.2" fill="#FBBF24" />
          </g>
        </g>
      );

    case 'rose':
      return (
        <g>
          {showStem && (
            <>
              <path d="M40 54 Q39 88 40 124" stroke="#437B35" strokeWidth="4.2" strokeLinecap="round" fill="none" />
              <path d="M39 88 Q19 78 21 62 Q35 67 39 83 Z" fill="#589647" />
              <path d="M41 100 Q61 90 59 74 Q45 79 41 95 Z" fill="#437B35" />
              <path d="M30 50 Q23 55 21 48 Q28 45 34 48 Z" fill="#437B35" />
              <path d="M50 50 Q57 55 59 48 Q52 45 46 48 Z" fill="#437B35" />
            </>
          )}
          <g transform="translate(40, 34)">
            <circle cx="-8" cy="-4" r="12" fill="#D43359" />
            <circle cx="8" cy="-4" r="12" fill="#D43359" />
            <circle cx="0" cy="-10" r="12" fill="#C8284E" />
            <circle cx="-7" cy="6" r="11.5" fill="#E04268" />
            <circle cx="7" cy="6" r="11.5" fill="#E04268" />
            <path d="M-14 -2 C-14 -14 14 -14 14 -2 C14 10 0 14 0 14 C0 14 -14 10 -14 -2 Z" fill="#EE5A7E" />
            <circle cx="-4" cy="-3" r="9.5" fill="#F67898" />
            <circle cx="5" cy="-2" r="9" fill="#F26689" />
            <ellipse cx="0" cy="-3" rx="7" ry="5.5" fill="#FDA4BA" />
            <path d="M-4 -4 C-1 -8 5 -6 4 -2 C3 2 -4 3 -6 -1 C-8 -5 -1 -10 6 -6" fill="none" stroke="#C8284E" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M-11 5 Q0 13 11 5" fill="none" stroke="#FFB8C9" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      );

    case 'daisy':
      return (
        <g>
          {showStem && (
            <>
              <path d="M40 52 Q41 88 40 124" stroke="#5B984A" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              <path d="M39 92 Q22 82 24 67 Q35 74 39 88 Z" fill="#70AE5E" />
              <path d="M41 104 Q57 95 55 81 Q45 87 41 100 Z" fill="#5B984A" />
            </>
          )}
          <g transform="translate(40, 34)">
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
              <ellipse
                key={deg}
                cx="0"
                cy="-14"
                rx="3.7"
                ry="11"
                fill="#FFFFFF"
                stroke="#E6DFD5"
                strokeWidth="0.8"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle cx="0" cy="0" r="8" fill="#F59E0B" />
            <circle cx="0" cy="0" r="6.2" fill="#FACC15" />
            <circle cx="-2" cy="-2" r="0.9" fill="#D97706" />
            <circle cx="2" cy="-1.5" r="0.9" fill="#D97706" />
            <circle cx="0" cy="2" r="0.9" fill="#D97706" />
          </g>
        </g>
      );

    case 'baby':
    default: {
      const blossoms = [
        { cx: 22, cy: 40, s: 1 },
        { cx: 17, cy: 27, s: 0.9 },
        { cx: 29, cy: 29, s: 0.95 },
        { cx: 40, cy: 21, s: 1.05 },
        { cx: 50, cy: 29, s: 0.95 },
        { cx: 62, cy: 27, s: 0.9 },
        { cx: 58, cy: 40, s: 1 },
        { cx: 34, cy: 43, s: 0.95 },
        { cx: 46, cy: 43, s: 0.95 },
        { cx: 27, cy: 18, s: 0.85 },
        { cx: 53, cy: 18, s: 0.85 },
      ];
      return (
        <g>
          {showStem && (
            <>
              <path d="M40 58 L40 124" stroke="#629B52" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M40 82 Q29 60 22 40" stroke="#629B52" strokeWidth="2" fill="none" />
              <path d="M40 76 Q51 58 58 40" stroke="#629B52" strokeWidth="2" fill="none" />
              <path d="M40 70 L40 22" stroke="#629B52" strokeWidth="2" fill="none" />
              <path d="M31 60 Q22 44 17 28" stroke="#629B52" strokeWidth="1.6" fill="none" />
              <path d="M49 60 Q58 44 62 28" stroke="#629B52" strokeWidth="1.6" fill="none" />
              <path d="M35 50 L28 20" stroke="#629B52" strokeWidth="1.4" fill="none" />
              <path d="M45 50 L52 20" stroke="#629B52" strokeWidth="1.4" fill="none" />
            </>
          )}
          {blossoms.map((b, idx) => (
            <g key={idx} transform={`translate(${b.cx}, ${b.cy}) scale(${b.s})`}>
              <circle cx="0" cy="-3.2" r="2.8" fill="#FFFFFF" stroke="#E5DDD3" strokeWidth="0.5" />
              <circle cx="3.1" cy="-1" r="2.8" fill="#FFFFFF" stroke="#E5DDD3" strokeWidth="0.5" />
              <circle cx="1.9" cy="2.6" r="2.8" fill="#FFFFFF" stroke="#E5DDD3" strokeWidth="0.5" />
              <circle cx="-1.9" cy="2.6" r="2.8" fill="#FFFFFF" stroke="#E5DDD3" strokeWidth="0.5" />
              <circle cx="-3.1" cy="-1" r="2.8" fill="#FFFFFF" stroke="#E5DDD3" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="2" fill="#FDE047" />
            </g>
          ))}
        </g>
      );
    }
  }
}

function FlowerSvg({ type, className = 'w-14 h-22 sm:w-20 sm:h-32', showStem = true }) {
  return (
    <svg viewBox="0 0 80 130" className={className}>
      <FlowerShape type={type} showStem={showStem} />
    </svg>
  );
}

// ============================================================================
// LÁ KHUYNH DIỆP & HOA PHỤ TRANG TRÍ BÓ HOA
// ============================================================================
function BouquetFoliage({ flowerCount }) {
  if (flowerCount === 0) return null;

  return (
    <g>
      <g opacity="0.9">
        <path d="M135 190 Q102 145 78 96" stroke="#5F9456" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="104" cy="142" rx="9" ry="5.5" fill="#7FB075" transform="rotate(-35 104 142)" />
        <ellipse cx="92" cy="122" rx="8.5" ry="5" fill="#6D9F63" transform="rotate(-40 92 122)" />
        <ellipse cx="83" cy="105" rx="7.5" ry="4.5" fill="#88B87E" transform="rotate(-45 83 105)" />
        <ellipse cx="110" cy="128" rx="8" ry="4.8" fill="#88B87E" transform="rotate(15 110 128)" />
        <ellipse cx="98" cy="110" rx="7.5" ry="4.5" fill="#7FB075" transform="rotate(10 98 110)" />
      </g>
      <g opacity="0.9">
        <path d="M165 190 Q198 145 222 96" stroke="#5F9456" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="196" cy="142" rx="9" ry="5.5" fill="#7FB075" transform="rotate(35 196 142)" />
        <ellipse cx="208" cy="122" rx="8.5" ry="5" fill="#6D9F63" transform="rotate(40 208 122)" />
        <ellipse cx="217" cy="105" rx="7.5" ry="4.5" fill="#88B87E" transform="rotate(45 217 105)" />
        <ellipse cx="190" cy="128" rx="8" ry="4.8" fill="#88B87E" transform="rotate(-15 190 128)" />
        <ellipse cx="202" cy="110" rx="7.5" ry="4.5" fill="#7FB075" transform="rotate(-10 202 110)" />
      </g>
      {flowerCount >= 2 && (
        <g opacity="0.92">
          <circle cx="88" cy="92" r="3.5" fill="#FFFFFF" stroke="#E6DFD5" strokeWidth="0.8" />
          <circle cx="88" cy="92" r="1.2" fill="#FACC15" />
          <circle cx="76" cy="102" r="3" fill="#FFD1DC" />
          <circle cx="212" cy="92" r="3.5" fill="#FFFFFF" stroke="#E6DFD5" strokeWidth="0.8" />
          <circle cx="212" cy="92" r="1.2" fill="#FACC15" />
          <circle cx="224" cy="102" r="3" fill="#FFD1DC" />
        </g>
      )}
      {flowerCount >= 3 && (
        <g opacity="0.88">
          <path d="M150 175 L150 68" stroke="#6BA35B" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="144" cy="76" rx="6" ry="3.2" fill="#84B876" transform="rotate(-30 144 76)" />
          <ellipse cx="156" cy="76" rx="6" ry="3.2" fill="#84B876" transform="rotate(30 156 76)" />
          <circle cx="150" cy="65" r="3.5" fill="#FFFDF9" stroke="#E6DFD5" strokeWidth="0.8" />
          <circle cx="150" cy="65" r="1.3" fill="#FACC15" />
        </g>
      )}
    </g>
  );
}

// ============================================================================
// COMPONENT BÓ HOA NGHỆ THUẬT
// ============================================================================
function BouquetGraphic({
  selectedFlowers,
  hasBow,
  showBowTarget,
  onTieBow,
  showGiftTag,
  tagGreeting,
  onOpenCard,
}) {
  const isEmpty = selectedFlowers.length === 0;

  const backPlacements = [];
  const frontPlacements = [];

  selectedFlowers.forEach((flowerId) => {
    const flower = FLOWERS.find((f) => f.id === flowerId);
    if (!flower) return;
    flower.placements.forEach((pos, idx) => {
      const item = { key: `${flowerId}-${idx}`, flowerId, ...pos };
      if (pos.layer === 'back') {
        backPlacements.push(item);
      } else {
        frontPlacements.push(item);
      }
    });
  });

  return (
    <div className="relative w-[260px] sm:w-[325px] h-[260px] sm:h-[325px] mx-auto select-none flex items-center justify-center">
      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible drop-shadow-sm">
        <defs>
          <clipPath id="bouquetConeClip">
            <path d="M5 0 L295 0 L252 135 L192 232 L108 232 L48 135 Z" />
          </clipPath>
          <linearGradient id="paperBackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6E5B6" />
            <stop offset="100%" stopColor="#EBD292" />
          </linearGradient>
          <linearGradient id="paperFrontGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBF0CE" />
            <stop offset="50%" stopColor="#F6E3AE" />
            <stop offset="100%" stopColor="#EDD393" />
          </linearGradient>
        </defs>

        <path
          d="M44 122 Q95 78 150 86 Q205 78 256 122 L194 234 Q150 246 106 234 Z"
          fill="url(#paperBackGrad)"
          stroke="#DCBF7C"
          strokeWidth="2"
        />

        <path
          d="M64 112 Q108 82 150 92 Q192 82 236 112 L188 226 L112 226 Z"
          fill="#FFFDF8"
          stroke="#F3E8D2"
          strokeWidth="1.2"
          opacity="0.95"
        />

        <g clipPath="url(#bouquetConeClip)">
          <BouquetFoliage flowerCount={selectedFlowers.length} />
          {backPlacements.map((item) => (
            <g
              key={item.key}
              transform={`translate(${item.x}, ${item.y}) rotate(${item.rotate}) scale(${item.scale}) translate(-40, -50)`}
            >
              <FlowerShape type={item.flowerId} showStem={true} />
            </g>
          ))}
          {frontPlacements.map((item) => (
            <g
              key={item.key}
              transform={`translate(${item.x}, ${item.y}) rotate(${item.rotate}) scale(${item.scale}) translate(-40, -50)`}
            >
              <FlowerShape type={item.flowerId} showStem={true} />
            </g>
          ))}
        </g>

        <path
          d="M48 126 Q102 176 150 174 Q198 176 252 126 L193 234 Q150 248 107 234 Z"
          fill="url(#paperFrontGrad)"
          stroke="#DCBF7C"
          strokeWidth="2"
        />
        <path
          d="M107 234 L150 174 L193 234"
          fill="none"
          stroke="#E5CA8A"
          strokeWidth="1.4"
          opacity="0.7"
        />

        <path
          d="M51 127 Q102 173 150 171 Q198 173 249 127"
          fill="none"
          stroke="#F294AA"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.85"
        />

        <path
          d="M113 232 L187 232 L205 276 Q150 287 95 276 Z"
          fill="#F1DA9B"
          stroke="#D9BC76"
          strokeWidth="2"
        />

        <rect x="111" y="225" width="78" height="13" rx="6.5" fill="#E44D6E" />
        <rect x="114" y="227" width="72" height="3" rx="1.5" fill="#F78DA5" opacity="0.5" />

        {hasBow && (
          <g transform="translate(150, 232)">
            <path d="M-5 4 Q-16 28 -28 48 L-13 45 Q-6 27 -2 6 Z" fill="#D13658" />
            <path d="M5 4 Q16 28 28 48 L13 45 Q6 27 2 6 Z" fill="#D13658" />
            <path d="M0 0 C-30 -24 -40 15 0 7 Z" fill="#F46484" stroke="#C42B4E" strokeWidth="1.5" />
            <path d="M0 0 C30 -24 40 15 0 7 Z" fill="#F46484" stroke="#C42B4E" strokeWidth="1.5" />
            <path d="M-6 -1 Q-16 -6 -20 1" stroke="#C42B4E" strokeWidth="1.4" fill="none" />
            <path d="M6 -1 Q16 -6 20 1" stroke="#C42B4E" strokeWidth="1.4" fill="none" />
            <ellipse cx="0" cy="1" rx="7" ry="6" fill="#C42B4E" />
            <ellipse cx="-1.5" cy="-1" rx="2.5" ry="1.5" fill="#FF9EBB" opacity="0.6" />
          </g>
        )}
      </svg>

      {isEmpty && (
        <div className="absolute inset-x-10 top-[35%] text-center pointer-events-none">
          <p className="font-serif-display italic text-[#A69382] text-sm sm:text-base leading-snug">
            Bó hoa của cả nhà
            <br />
            đang chờ những điều dịu dàng
          </p>
        </div>
      )}

      {showBowTarget && !hasBow && (
        <button
          type="button"
          onClick={onTieBow}
          aria-label="Chạm để thắt nơ"
          className="absolute left-1/2 top-[77%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-dashed border-[#E13D63] bg-[#FFF0F3]/85 flex items-center justify-center shadow-lg animate-pulse-soft cursor-pointer active:scale-90 transition-transform"
        >
          <span className="w-4 h-4 rounded-full bg-[#E13D63]" />
        </button>
      )}

      {showGiftTag && (
        <div
          onClick={onOpenCard}
          className="absolute right-0 sm:-right-3 bottom-5 sm:bottom-7 bg-white border border-[#F2CFD8] rounded-xl p-3 sm:p-3.5 shadow-xl rotate-[-5deg] hover:rotate-0 transition-all duration-300 cursor-pointer max-w-[170px] sm:max-w-[185px] animate-stage-enter"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#E6BCC7] mx-auto mb-1.5 shadow-inner" />
          <p className="font-handwriting text-[#3A2429] text-base sm:text-lg leading-tight text-center mb-2.5">
            {tagGreeting}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCard();
            }}
            className="w-full py-1.5 px-3 rounded-full bg-[#E13D63] hover:bg-[#C8294E] active:scale-95 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm transition-all"
          >
            MỞ THIỆP NHÉ
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT CHÍNH (APP)
// ============================================================================
export default function App() {
  const [stage, setStage] = useState(1);
  const [doorOpen, setDoorOpen] = useState(false);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [hasBow, setHasBow] = useState(false);

  const [memberPhotos, setMemberPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTOS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return MEMBERS_DATA.map((m) => m.photo);
  });

  const [activeMemberIdx, setActiveMemberIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(memberPhotos));
    } catch (e) {
      console.warn(e);
    }
  }, [memberPhotos]);

  const handleOpenDoor = () => {
    if (doorOpen) return;
    setDoorOpen(true);
    setTimeout(() => {
      setStage(2);
    }, 1600);
  };

  const handleSelectFlower = (flowerId) => {
    if (selectedFlowers.includes(flowerId)) return;
    const updated = [...selectedFlowers, flowerId];
    setSelectedFlowers(updated);

    if (updated.length === FLOWERS.length) {
      setTimeout(() => {
        setStage(3);
      }, 950);
    }
  };

  const handleTieBow = () => {
    if (hasBow) return;
    setHasBow(true);
    setTimeout(() => {
      setStage(4);
    }, 1050);
  };

  const handleUploadPhoto = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMemberPhotos((prev) => prev.map((p, idx) => (idx === index ? reader.result : p)));
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhotos = () => {
    localStorage.removeItem(STORAGE_KEY_PHOTOS);
    setMemberPhotos(MEMBERS_DATA.map((m) => m.photo));
  };

  const handleReplay = () => {
    setDoorOpen(false);
    setSelectedFlowers([]);
    setHasBow(false);
    setStage(1);
  };

  const members = MEMBERS_DATA.map((m, idx) => ({
    ...m,
    photo: memberPhotos[idx] || m.photo,
  }));

  const activeMember = members[activeMemberIdx] || members[0];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden">
      {/* Họa tiết cánh hoa bay nhẹ làm nền */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <span className="absolute top-[9%] left-[7%] text-sm opacity-45 animate-float-slow select-none">🌸</span>
        <span className="absolute top-[20%] right-[9%] text-xs opacity-40 animate-float-slow select-none" style={{ animationDelay: '1.5s' }} />
        <span className="absolute bottom-[15%] left-[10%] text-xs opacity-40 animate-float-slow select-none" style={{ animationDelay: '2.5s' }}>💮</span>
        <span className="absolute bottom-[22%] right-[12%] text-sm opacity-45 animate-float-slow select-none" style={{ animationDelay: '0.8s' }}>🌼</span>
      </div>

      {/* Thanh công cụ nhỏ trên cùng */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 pt-3.5 pb-1 flex items-center justify-between text-xs text-[#6E5A4F]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E13D63]" />
          <span className="font-bold tracking-wider uppercase text-[11px] text-[#4E3D35]">
            {CARD_DATA.shopName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {stage > 1 && (
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#FFF8F9] border border-[#E2D6C8] text-[#4E3D35] font-medium text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#E13D63]" />
              <span>Xem lại từ đầu</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleResetPhotos}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#FFF8F9] border border-[#E2D6C8] text-[#4E3D35] font-medium text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer"
            title="Đưa ảnh về mặc định trong thư mục public"
          >
            <Camera className="w-3 h-3 text-[#E13D63]" />
            <span>Khôi phục ảnh mặc định</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          MÀN HÌNH 1: CỬA TIỆM HOA ("TIỆM HOA NHÀ MÌNH")
      ===================================================================== */}
      {stage === 1 && (
        <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-5 py-4 sm:py-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 animate-stage-enter">
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#F4EAE0] border border-[#E2D3C1] text-[#69564A] text-[10px] sm:text-xs tracking-[0.16em] uppercase font-bold mb-4 sm:mb-6">
              {CARD_DATA.dateBadge}
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#2B211E] leading-[1.15] tracking-tight">
              Tiệm hoa
              <br />
              chỉ mở
              <br />
              <span className="relative inline-block italic font-bold text-[#E13D63] mt-1">
                một ngày
                <span className="absolute left-0 -bottom-1 w-full h-3 bg-[#F9C6D3]/75 -z-10 rounded-full" />
              </span>
              <br />
              trong năm.
            </h1>

            <p className="mt-5 sm:mt-6 text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#7D6B5D] font-semibold">
              MỘT CHÚT HOA, MỘT CHÚT HƯƠNG, THẬT NHIỀU YÊU.
            </p>

            <div className="mt-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              {members.map((m) => (
                <span
                  key={m.id}
                  className="px-3 py-1 rounded-full bg-[#FCE8EE] border border-[#F5C6D3] text-[#C42B4E] font-semibold"
                >
                  {m.shortName}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col items-center">
            <div className="relative w-full max-w-[390px] sm:max-w-[440px] flex flex-col items-center">
              <div className="z-20 bg-[#FFFDF9] border-2 border-[#CEBFA8] rounded-xl px-5 py-2 shadow-sm text-center mb-[-6px]">
                <div className="font-serif-display font-bold tracking-[0.14em] text-sm sm:text-base text-[#42322B]">
                  {CARD_DATA.shopName}
                </div>
                <div className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#8C7A6B] font-semibold uppercase mt-0.5">
                  {CARD_DATA.shopSub}
                </div>
              </div>

              <div className="z-10 w-[94%] flex flex-col">
                <div className="h-9 sm:h-11 w-full grid grid-cols-9 overflow-hidden rounded-t-lg shadow-sm">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className={i % 2 === 0 ? 'bg-[#E65C7B]' : 'bg-[#FDE4EA]'} />
                  ))}
                </div>
                <div className="grid grid-cols-9 w-full">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 sm:h-3.5 rounded-b-full shadow-sm ${
                        i % 2 === 0 ? 'bg-[#D14766]' : 'bg-[#F7CCD8]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative w-[86%] bg-[#C5DB9F] border-x-4 border-t-2 border-[#9FB973] pt-5 pb-4 px-5 sm:px-7 grid grid-cols-12 gap-4 items-end shadow-md">
                <div className="col-span-7 bg-[#FFFDF8] border-4 border-[#8CA960] rounded-lg p-2.5 shadow-inner">
                  <div className="grid grid-cols-2 gap-2 h-28 sm:h-32 bg-[#F4F9EC] rounded p-2 items-end relative overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 h-1.5 bg-[#8CA960]/50" />
                    <div className="absolute inset-y-0 left-1/2 w-1.5 bg-[#8CA960]/50" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-end -mb-2">
                        <FlowerSvg type="tulip" className="w-7 h-10" showStem={false} />
                        <FlowerSvg type="daisy" className="w-7 h-10 -ml-2" showStem={false} />
                      </div>
                      <div className="w-9 h-5 bg-[#E07A5F] rounded-b-md border-t-2 border-[#C86045]" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-end -mb-2">
                        <FlowerSvg type="rose" className="w-7 h-10" showStem={false} />
                        <FlowerSvg type="sunflower" className="w-7 h-10 -ml-2" showStem={false} />
                      </div>
                      <div className="w-9 h-5 bg-[#D97757] rounded-b-md border-t-2 border-[#BD5D3E]" />
                    </div>
                  </div>
                </div>

                <div
                  className="col-span-5 relative h-40 sm:h-44 rounded-t-lg bg-[#FFF2C2] border-4 border-[#829E57] overflow-hidden shadow-inner"
                  style={{ perspective: '900px' }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-b from-[#FFEA9F] to-[#FCD977]">
                    <Heart className="w-6 h-6 text-[#E13D63] fill-[#E13D63] animate-bounce mb-1" />
                    <span className="font-serif-display italic text-[11px] text-[#693F1E] font-bold leading-tight">
                      Mời cả nhà vào tiệm ♡
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenDoor}
                    aria-label="Mở cửa tiệm hoa"
                    style={{
                      transformOrigin: 'left center',
                      transform: doorOpen ? 'rotateY(-108deg)' : 'rotateY(0deg)',
                    }}
                    className="relative z-10 w-full h-full bg-[#96B669] hover:bg-[#8CAE5E] transition-transform duration-1000 ease-in-out flex flex-col items-center justify-between p-2.5 cursor-pointer group"
                  >
                    <div className="w-full h-20 bg-[#F6FAEE] rounded border-2 border-[#78964E] flex flex-col items-center justify-center relative">
                      <div className="w-3 h-2 border-t border-l border-r border-[#B89F7D] -mb-0.5" />
                      <div className="bg-[#FFF8EB] border border-[#D4B895] px-2 py-0.5 rounded text-[9px] font-extrabold tracking-widest text-[#E13D63] shadow-xs group-hover:scale-105 transition-transform">
                        OPEN
                      </div>
                    </div>

                    <div className="w-full flex justify-end pr-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC72C] shadow" />
                    </div>

                    <div className="w-full h-10 border-2 border-[#7E9C53] rounded-xs bg-[#89A85D]" />
                  </button>
                </div>

                <div className="absolute -left-6 sm:-left-8 -bottom-2 flex flex-col items-center pointer-events-none">
                  <div className="flex items-end -mb-3">
                    <FlowerSvg type="sunflower" className="w-10 h-14 -mr-3 rotate-[-12deg]" />
                    <FlowerSvg type="rose" className="w-10 h-16 z-10" />
                    <FlowerSvg type="tulip" className="w-9 h-14 -ml-3 rotate-[14deg]" />
                  </div>
                  <div className="w-12 h-9 bg-[#D97757] rounded-b-lg border-t-4 border-[#C26143] shadow-md z-20" />
                </div>

                <div className="absolute -right-5 sm:-right-7 -bottom-2 flex flex-col items-center pointer-events-none">
                  <div className="flex items-end -mb-3">
                    <FlowerSvg type="daisy" className="w-9 h-13 -mr-2.5 rotate-[-10deg]" />
                    <FlowerSvg type="tulip" className="w-9 h-14 z-10" />
                  </div>
                  <div className="w-10 h-8 bg-[#9CA3AF] rounded-b-lg border-t-4 border-[#6B7280] shadow-md z-20" />
                </div>
              </div>

              <div className="w-[92%] h-3.5 bg-[#D5C9B8] rounded-full shadow-inner" />
            </div>

            <div className="mt-5 min-h-[44px] flex items-center justify-center">
              {doorOpen ? (
                <div className="px-5 py-2 rounded-full bg-white border border-[#F2C8D4] shadow-md text-xs sm:text-sm font-serif-display italic font-semibold text-[#3A2429] animate-stage-enter">
                  Chào 3 chị em, bó hoa của cả nhà đang chờ ♡
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenDoor}
                  className="px-5 py-2 rounded-full bg-white hover:bg-[#FFF9FA] border border-[#E2D4C3] shadow-sm text-xs sm:text-sm text-[#5E4D44] font-medium flex items-center gap-2 active:scale-95 transition-all animate-pulse-soft cursor-pointer"
                >
                  <span>👆 Chạm vào cánh cửa</span>
                  <strong className="text-[#E13D63]">OPEN</strong>
                  <span>để bước vào tiệm hoa nhé</span>
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          MÀN HÌNH 2: CHỌN 5 BÔNG HOA TRÊN KỆ GỖ (Tối ưu Mobile hiển thị đủ hoa)
      ===================================================================== */}
      {stage === 2 && (
        <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-between items-center animate-stage-enter">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B211E] leading-tight">
              Mọi người chọn hoa,
              <br />
              Mình gửi{' '}
              <span className="relative inline-block italic font-bold text-[#E13D63]">
                yêu thương.
                <span className="absolute left-0 -bottom-1 w-full h-2.5 bg-[#F9C6D3]/75 -z-10 rounded-full" />
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#635249] font-medium">
              Chạm từng bông hoa để đặt vào bó. Chọn đủ 5 bông để hoàn thành bó hoa của cả nhà.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-center my-auto py-2">
            <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center">
              <BouquetGraphic
                selectedFlowers={selectedFlowers}
                hasBow={false}
                showBowTarget={false}
                showGiftTag={false}
              />
              <div className="mt-1 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold text-[#7A675C]">
                {selectedFlowers.length} / {FLOWERS.length} BÔNG HOA
              </div>
            </div>

            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-md sm:max-w-xl px-1 sm:px-2">
                <div className="grid grid-cols-5 gap-1 sm:gap-3 items-end">
                  {FLOWERS.map((flower) => {
                    const isPicked = selectedFlowers.includes(flower.id);
                    return (
                      <button
                        key={flower.id}
                        type="button"
                        disabled={isPicked}
                        onClick={() => handleSelectFlower(flower.id)}
                        className={`group flex flex-col items-center focus:outline-none transition-all duration-300 ${
                          isPicked
                            ? 'opacity-25 scale-90 translate-y-2 cursor-default'
                            : 'hover:-translate-y-2 active:scale-90 cursor-pointer'
                        }`}
                      >
                        <div className="relative">
                          <FlowerSvg
                            type={flower.id}
                            className="w-12 h-20 sm:w-20 sm:h-32 drop-shadow-xs"
                          />
                          {!isPicked && (
                            <span className="absolute -top-1 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border border-[#F2C8D4] text-[#E13D63] text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-xs group-hover:scale-110">
                              +
                            </span>
                          )}
                        </div>
                        <span className="mt-1 text-[10px] sm:text-xs font-semibold text-[#4A3A32] text-center leading-tight">
                          {flower.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="w-full h-3.5 sm:h-4 bg-gradient-to-b from-[#DFBC94] to-[#C49A6C] rounded-full shadow-md mt-2 border-t border-[#EAD1B3]" />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          MÀN HÌNH 3: THẮT CHIẾC NƠ HỒNG
      ===================================================================== */}
      {stage === 3 && (
        <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center justify-center text-center animate-stage-enter">
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2B211E] leading-tight">
            Thắt một chiếc nơ,
            <br />
            gửi trọn{' '}
            <span className="relative inline-block italic font-bold text-[#E13D63]">
              yêu thương.
              <span className="absolute left-0 -bottom-1 w-full h-2.5 bg-[#F9C6D3]/75 -z-10 rounded-full" />
            </span>
          </h2>

          <div className="my-4 sm:my-6">
            <BouquetGraphic
              selectedFlowers={FLOWERS.map((f) => f.id)}
              hasBow={hasBow}
              showBowTarget={true}
              onTieBow={handleTieBow}
              showGiftTag={false}
            />
          </div>

          <p className="text-xs sm:text-base text-[#635249] font-serif-display italic font-semibold">
            Chạm vào vòng tròn ở dải ruy băng để hoàn thành bó hoa.
          </p>
        </main>
      )}

      {/* =====================================================================
          MÀN HÌNH 4: BÓ HOA HOÀN CHỈNH KÈM THIỆP
      ===================================================================== */}
      {stage === 4 && (
        <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center justify-center text-center animate-stage-enter">
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2B211E] leading-tight">
            Một bó hoa,
            <br />
            cho những người Mình{' '}
            <span className="relative inline-block italic font-bold text-[#E13D63]">
              thương quý.
              <span className="absolute left-0 -bottom-1 w-full h-2.5 bg-[#F9C6D3]/75 -z-10 rounded-full" />
            </span>
          </h2>

          <div className="my-4 sm:my-6">
            <BouquetGraphic
              selectedFlowers={FLOWERS.map((f) => f.id)}
              hasBow={true}
              showBowTarget={false}
              showGiftTag={true}
              tagGreeting={CARD_DATA.tagGreeting}
              onOpenCard={() => setStage(5)}
            />
          </div>

          <p className="text-xs sm:text-base text-[#635249] font-serif-display italic font-semibold">
            Mình có để giấu một tấm thiệp trong bó hoa... Chạm vào nút{' '}
            <button
              type="button"
              onClick={() => setStage(5)}
              className="text-[#E13D63] font-bold underline underline-offset-4 cursor-pointer"
            >
              MỞ THIỆP NHÉ
            </button>
          </p>
        </main>
      )}

      {/* =====================================================================
          MÀN HÌNH 5: BỨC THƯ & BỘ 3 ẢNH POLAROID
      ===================================================================== */}
      {stage === 5 && (
        <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-6 flex items-center justify-center animate-stage-enter">
          <div className="relative w-full bg-[#FFFDF9] border border-[#E5D8C5] rounded-2xl shadow-xl p-5 sm:p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-[#FCE2E8] flex items-center justify-center text-[#E13D63] text-base shadow-2xs select-none">
              ✿
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 text-left space-y-4">
                <div>
                  <h2 className="font-serif-display italic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E13D63]">
                    {CARD_DATA.letterTitle}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#785E54]">
                    {CARD_DATA.letterSubTitle}
                  </p>
                </div>

                <div className="space-y-3.5 text-[14px] sm:text-[15.5px] leading-[1.75] text-[#2F2421] font-normal">
                  {CARD_DATA.paragraphs.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                  <p className="pt-1 font-semibold text-[#2B211E]">{CARD_DATA.closingLine}</p>
                </div>

                <div className="pt-2 text-right">
                  <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#E13D63]">
                    {CARD_DATA.signature}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  {members.map((member, idx) => {
                    const isActive = idx === activeMemberIdx;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setActiveMemberIdx(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                          isActive
                            ? 'bg-[#E13D63] text-white shadow-sm'
                            : 'bg-[#F3EAE0] text-[#5C4B42] hover:bg-[#E8DDD0]'
                        }`}
                      >
                        {member.shortName}
                      </button>
                    );
                  })}
                </div>

                <div className="relative bg-white p-3.5 sm:p-4 pb-5 rounded-xl shadow-lg border border-[#E6DCD0] w-full max-w-[275px] sm:max-w-[295px] transition-all duration-300 hover:rotate-0 rotate-[1.2deg]">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8FB868] rotate-[-1.5deg] rounded-md shadow-xs flex items-center justify-center text-[11px] text-white font-semibold tracking-wide whitespace-nowrap">
                    {activeMember.roleTag}
                  </div>

                  <div className="absolute -top-3.5 -left-3.5 w-8 h-8 pointer-events-none select-none drop-shadow-2xs">
                    <FlowerSvg type="rose" className="w-8 h-8" showStem={false} />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 pointer-events-none select-none drop-shadow-2xs">
                    <FlowerSvg type="daisy" className="w-8 h-8" showStem={false} />
                  </div>

                  <div
                    onClick={() => setLightboxOpen(true)}
                    className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#F3EFEA] cursor-pointer group mt-1"
                  >
                    <img
                      src={activeMember.photo}
                      alt={activeMember.fullName}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = activeMember.fallbackPhoto;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-end justify-end p-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                        <Maximize2 className="w-3 h-3" />
                        Chạm phóng to
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 text-center px-1">
                    <p className="font-serif-display font-bold text-base sm:text-lg text-[#2B211E]">
                      {activeMember.fullName}
                    </p>
                    <p className="mt-1 text-xs text-[#5A4940] italic leading-relaxed">
                      {activeMember.caption}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-center">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2EA] hover:bg-[#F3E5D7] border border-[#E2D0BC] text-[11px] font-medium text-[#5A4940] cursor-pointer active:scale-95 transition-all">
                      <Camera className="w-3.5 h-3.5 text-[#E13D63]" />
                      <span>Đổi ảnh {activeMember.shortName}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadPhoto(activeMemberIdx, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  {members.map((member, idx) => {
                    const isActive = idx === activeMemberIdx;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setActiveMemberIdx(idx)}
                        className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#E13D63] scale-105 shadow-md'
                            : 'border-white opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={member.photo}
                          alt={member.shortName}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = member.fallbackPhoto;
                          }}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-black/65 text-white text-[9px] font-medium py-0.5 truncate px-1">
                          {member.shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          MODAL PHÓNG TO ẢNH POLAROID (LIGHTBOX)
      ===================================================================== */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-stage-enter"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl p-4 sm:p-6 pb-6 max-w-md w-full shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-[#2B211E] shadow-md flex items-center justify-center hover:bg-[#FAF0F2] active:scale-90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#F5F2EB]">
              <img
                src={activeMember.photo}
                alt={activeMember.fullName}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = activeMember.fallbackPhoto;
                }}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setActiveMemberIdx((prev) => (prev - 1 + members.length) % members.length)
                }
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2B211E] shadow flex items-center justify-center active:scale-90 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveMemberIdx((prev) => (prev + 1) % members.length)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2B211E] shadow flex items-center justify-center active:scale-90 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-serif-display font-bold text-xl text-[#2B211E]">
                {activeMember.fullName}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#5A4940] italic">
                {activeMember.caption}
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                {members.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMemberIdx(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeMemberIdx ? 'w-6 bg-[#E13D63]' : 'w-2 bg-[#DFD2C4]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chân trang */}
      <footer className="relative z-10 w-full py-2.5 px-4 text-center text-[11px] font-medium text-[#8C7A6B]">
        <span>{CARD_DATA.shopName} • Dành tặng Bích Ngọc, Thu Hường & Ngọc Trân</span>
      </footer>
    </div>
  );
}