import { Card, CardContent } from "@/components/ui/card";
import { benefitItems } from "./boostPlanData";

export function BoostPlanBenefits() {
  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-9xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Current Active Boosts</h2>
          <span className="text-sm text-gray-400 font-medium">3 Campaigns Running</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 pr-4">Business / LGA</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 px-4">Tier</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 px-4">Duration Left</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 px-4">Views</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 px-4">Enquiries</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 px-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-widest uppercase pb-3 pl-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row 1 - Gold / Active */}
              <tr className="group hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-4">
                  <div className="font-medium text-gray-800">Artisan Studio</div>
                  <div className="text-xs text-gray-400 mt-0.5">Ikeja, Lagos</div>
                </td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900 tracking-wide">
                    GOLD
                  </span>
                </td>
                <td className="py-5 px-4 text-gray-600 font-medium">4d 13h</td>
                <td className="py-5 px-4 text-gray-600 font-medium">12.4K</td>
                <td className="py-5 px-4 text-gray-600 font-medium">142</td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                    ACTIVE
                  </span>
                </td>
                <td className="py-5 pl-4">
                  <button className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-emerald-400 text-white hover:bg-emerald-500 transition-colors cursor-pointer">
                    Extend Boost
                  </button>
                </td>
              </tr>

              {/* Row 2 - Silver / Expired */}
              <tr className="group hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-4">
                  <div className="font-semibold text-gray-800">Artisan Studio</div>
                  <div className="text-xs text-gray-400 mt-0.5">Ikeja, Lagos</div>
                </td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-400 text-white tracking-wide">
                    SILVER
                  </span>
                </td>
                <td className="py-5 px-4 text-gray-600 font-medium">12h 06m</td>
                <td className="py-5 px-4 text-gray-600 font-medium">4.2k</td>
                <td className="py-5 px-4 text-gray-600 font-medium">38</td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-500">
                    Expired
                  </span>
                </td>
                <td className="py-5 pl-4">
                  <button className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-pink-100 text-pink-500 hover:bg-pink-200 transition-colors cursor-pointer">
                    Boost Again
                  </button>
                </td>
              </tr>

              {/* Row 3 - Bronze / Active */}
              <tr className="group hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-4">
                  <div className="font-semibold text-gray-800">Artisan Studio</div>
                  <div className="text-xs text-gray-400 mt-0.5">Ikeja, Lagos</div>
                </td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-200 text-orange-700 tracking-wide">
                    BRONZE
                  </span>
                </td>
                <td className="py-5 px-4 text-gray-600 font-medium">14d 22h</td>
                <td className="py-5 px-4 text-gray-600 font-medium">8.1k</td>
                <td className="py-5 px-4 text-gray-600 font-medium">67</td>
                <td className="py-5 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                    ACTIVE
                  </span>
                </td>
                <td className="py-5 pl-4">
                  <button className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-emerald-400 text-white hover:bg-emerald-500 transition-colors cursor-pointer">
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
