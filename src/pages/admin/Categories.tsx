import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type Category = {
  id: number;
  name: string;
  subcategories: string[];
};

const DATA: Category[] = [
  { id: 1, name: "Restaurants & Food", subcategories: ["Fast Food", "Fine Dining", "Cafes", "Street Food", "Catering"] },
  { id: 2, name: "Technology", subcategories: ["Software", "Hardware", "IT Services", "Web Development"] },
  { id: 3, name: "Beauty & Wellness", subcategories: ["Salons", "Spas", "Barbershops", "Fitness Centers"] },
  { id: 4, name: "Retail & Shopping", subcategories: ["Clothing", "Groceries", "Electronics", "Home Goods"] },
  { id: 5, name: "Professional Services", subcategories: ["Legal", "Accounting", "Consulting", "Marketing"] },
];

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>(DATA);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, name: editName } : c
        )
      );
    }
    setShowEditModal(false);
    setEditingCategory(null);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-5 flex items-center justify-end">
        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 active:scale-95 transition-all">
          <Plus className="size-4" />
          Add Category
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide w-64">
                  Category Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  Subcategories
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wide w-32">
                  Actions
                </th>
              </tr>
            </thead>

            
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="group hover:bg-gray-50/70 transition-colors">
                  {/* Category Name */}
                  <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap align-top pt-5">
                    {cat.name}
                  </td>

                  {/* Subcategory Badges */}
                  <td className="px-6 py-4 align-top pt-5">
                    <div className="flex flex-wrap gap-2">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs text-gray-600 font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>

                   {/* Actions */}
                   <td className="px-6 py-4 align-top pt-5">
                     <div className="flex items-center justify-end gap-3">
                       <button onClick={() => handleEdit(cat)} className="text-gray-900 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50">
                         <svg xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                             </svg>
                       </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Category</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  value={editSubcategories}
                  onChange={(e) => setEditSubcategories(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}