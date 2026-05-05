import { cn } from "@/lib/utils";
export function BoostPlanBenefits() {
  return (
    <div className={cn('flex', 'items-center', 'justify-center')}>
      <div className={cn('bg-white', 'rounded-2xl', 'shadow-sm', 'border', 'border-gray-100', 'w-full', 'max-w-9xl', 'p-6')}>
        {/* Header */}
        <div className={cn('flex', 'items-center', 'justify-between', 'mb-6')}>
          <h2 className={cn('text-xl', 'font-semibold', 'text-gray-900')}>Current Active Boosts</h2>
          <span className={cn('text-sm', 'text-gray-400', 'font-medium')}>3 Campaigns Running</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className={cn('w-full', 'text-sm')}>
            <thead>
              <tr className={cn('border-b', 'border-gray-100')}>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'pr-4')}>Business / LGA</th>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'px-4')}>Tier</th>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'px-4')}>Duration Left</th>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'px-4')}>Views</th>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'px-4')}>Enquiries</th>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'px-4')}>Status</th>
                <th className={cn('text-left', 'text-xs', 'font-semibold', 'text-gray-400', 'tracking-widest', 'uppercase', 'pb-3', 'pl-4')}>Actions</th>
              </tr>
            </thead>
            <tbody className={cn('divide-y', 'divide-gray-100')}>
              {/* Row 1 - Gold / Active */}
              <tr className={cn('group', 'hover:bg-gray-50', 'transition-colors')}>
                <td className={cn('py-5', 'pr-4')}>
                  <div className={cn('font-medium', 'text-gray-800')}>Artisan Studio</div>
                  <div className={cn('text-xs', 'text-gray-400', 'mt-0.5')}>Ikeja, Lagos</div>
                </td>
                <td className={cn('py-5', 'px-4')}>
                  <span className={cn('inline-flex', 'items-center', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-bold', 'bg-yellow-400', 'text-yellow-900', 'tracking-wide')}>
                    GOLD
                  </span>
                </td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>4d 13h</td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>12.4K</td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>142</td>
                <td className={cn('py-5', 'px-4')}>
                  <span className={cn('inline-flex', 'items-center', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-semibold', 'bg-emerald-100', 'text-emerald-600')}>
                    ACTIVE
                  </span>
                </td>
                <td className={cn('py-5', 'pl-4')}>
                  <button className={cn('inline-flex', 'items-center', 'px-4', 'py-2', 'rounded-full', 'text-xs', 'font-semibold', 'bg-emerald-400', 'text-white', 'hover:bg-emerald-500', 'transition-colors', 'cursor-pointer')}>
                    Extend Boost
                  </button>
                </td>
              </tr>

              {/* Row 2 - Silver / Expired */}
              <tr className={cn('group', 'hover:bg-gray-50', 'transition-colors')}>
                <td className={cn('py-5', 'pr-4')}>
                  <div className={cn('font-semibold', 'text-gray-800')}>Artisan Studio</div>
                  <div className={cn('text-xs', 'text-gray-400', 'mt-0.5')}>Ikeja, Lagos</div>
                </td>
                <td className={cn('py-5', 'px-4')}>
                  <span className={cn('inline-flex', 'items-center', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-bold', 'bg-gray-400', 'text-white', 'tracking-wide')}>
                    SILVER
                  </span>
                </td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>12h 06m</td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>4.2k</td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>38</td>
                <td className={cn('py-5', 'px-4')}>
                  <span className={cn('inline-flex', 'items-center', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-semibold', 'bg-pink-100', 'text-pink-500')}>
                    Expired
                  </span>
                </td>
                <td className={cn('py-5', 'pl-4')}>
                  <button className={cn('inline-flex', 'items-center', 'px-4', 'py-2', 'rounded-full', 'text-xs', 'font-semibold', 'bg-pink-100', 'text-pink-500', 'hover:bg-pink-200', 'transition-colors', 'cursor-pointer')}>
                    Boost Again
                  </button>
                </td>
              </tr>

              {/* Row 3 - Bronze / Active */}
              <tr className={cn('group', 'hover:bg-gray-50', 'transition-colors')}>
                <td className={cn('py-5', 'pr-4')}>
                  <div className={cn('font-semibold', 'text-gray-800')}>Artisan Studio</div>
                  <div className={cn('text-xs', 'text-gray-400', 'mt-0.5')}>Ikeja, Lagos</div>
                </td>
                <td className={cn('py-5', 'px-4')}>
                  <span className={cn('inline-flex', 'items-center', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-bold', 'bg-orange-200', 'text-orange-700', 'tracking-wide')}>
                    BRONZE
                  </span>
                </td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>14d 22h</td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>8.1k</td>
                <td className={cn('py-5', 'px-4', 'text-gray-600', 'font-medium')}>67</td>
                <td className={cn('py-5', 'px-4')}>
                  <span className={cn('inline-flex', 'items-center', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-semibold', 'bg-emerald-100', 'text-emerald-600')}>
                    ACTIVE
                  </span>
                </td>
                <td className={cn('py-5', 'pl-4')}>
                  <button className={cn('inline-flex', 'items-center', 'px-4', 'py-2', 'rounded-full', 'text-xs', 'font-semibold', 'bg-emerald-400', 'text-white', 'hover:bg-emerald-500', 'transition-colors', 'cursor-pointer')}>
                    Extend Boost
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
