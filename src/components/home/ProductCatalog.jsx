import { ArrowRight, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';
import { playSound } from '../../utils/audio';
import { translations } from '../../utils/translations';

const PRODUCT_NAMES_TA = {
  'INTAS-700': {
    name: 'இன்டாஸ் ஆர்டர் தயாரிப்பு (Intas Order Product 700L)',
    category: 'கால்நடை & சுகாதார மேற்பூச்சு மருந்து',
  },
  'MIDIP-700': {
    name: 'இன்டாஸ் ஆர்டர் தயாரிப்பு (Intas Order Product 700L)',
    category: 'கால்நடை & சுகாதார மேற்பூச்சு மருந்து',
  },
};

export default function ProductCatalog({
  products,
  onSelectProduct,
  onStartPreCheck,
  isMuted,
  language = 'en',
}) {
  const t = translations[language] || translations.en;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Clean Simple Home Header */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-100 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>{t.portalBadge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.catalogTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
          {t.catalogSubtitle}
        </p>
      </div>

      {/* Product Display - Centered and elegant for single MiDip product */}
      <div className={products.length === 1 ? 'max-w-md mx-auto' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
        {products.map((prod) => {
          const taData = PRODUCT_NAMES_TA[prod.id];
          const displayName = language === 'ta' && taData ? taData.name : prod.name;
          const displayCategory = language === 'ta' && taData ? taData.category : prod.category;

          return (
            <div
              key={prod.id}
              onClick={() => {
                playSound('click', isMuted);
                onSelectProduct(prod);
                onStartPreCheck(prod);
              }}
              className="group bg-white rounded-3xl border border-slate-200 hover:border-indigo-500 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col shadow-sm hover:-translate-y-1"
            >
              {/* Product Image with ID Badge */}
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-100">
                <img
                  src={prod.image || '/images/products/midip_antiseptic.jpg'}
                  alt={displayName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1 rounded-xl text-xs font-mono font-extrabold shadow-md">
                  ID: {prod.id}
                </div>
              </div>

              {/* Product Name & Category */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <Badge variant={prod.badgeVariant || 'primary'} size="sm" className="mb-2.5">
                    {displayCategory}
                  </Badge>
                  <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {displayName}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-bold text-xs">
                  <span>{t.selectBatch}</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
