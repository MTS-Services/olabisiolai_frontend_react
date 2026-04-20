import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

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
  const [isAdding, setIsAdding] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSubcategories, setEditSubcategories] = useState("");

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (category: Category) => {
    setIsAdding(false);
    setEditingCategory(category);
    setEditName(category.name);
    setEditSubcategories(category.subcategories.join(", "));
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (isAdding) {
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      setCategories((prev) => [
        ...prev,
        { id: newId, name: editName, subcategories: editSubcategories.split(",").map((s) => s.trim()).filter(Boolean) }
      ]);
    } else if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: editName, subcategories: editSubcategories.split(",").map((s) => s.trim()).filter(Boolean) }
            : c
        )
      );
    }
    setShowEditModal(false);
    setEditingCategory(null);
    setIsAdding(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingCategory(null);
    setIsAdding(false);
  };

  const EditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const SubcategoryBadges = ({ subcategories }: { subcategories: string[] }) => (
    <div className="flex flex-wrap gap-1.5">
      {subcategories.map((sub) => (
        <span
          key={sub}
          className="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs text-gray-600 font-medium"
        >
          {sub}
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
      <div className="mb-5 flex items-center justify-end">
        <button
          onClick={() => {
            setIsAdding(true);
            setEditName("");
            setEditSubcategories("");
            setShowEditModal(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 sm:px-5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 active:scale-95 transition-all"
        >
          <Plus className="size-4" />
          Add Category
        </button>
      </div>

      {/* ── Desktop table (md and up) ── */}
      <div className="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
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
                  <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap align-top pt-5">
                    {cat.name}
                  </td>
                  <td className="px-6 py-4 align-top pt-5">
                    <SubcategoryBadges subcategories={cat.subcategories} />
                  </td>
                  <td className="px-6 py-4 align-top pt-5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-gray-900 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                        aria-label={`Edit ${cat.name}`}
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                        aria-label={`Delete ${cat.name}`}
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

      {/* ── Mobile cards (below md) ── */}
      <div className="md:hidden space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4"
          >
            {/* Card header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="font-semibold text-gray-800 text-sm leading-tight">{cat.name}</p>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-gray-600 hover:text-blue-600 transition-colors p-1.5 rounded-md hover:bg-blue-50"
                  aria-label={`Edit ${cat.name}`}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50"
                  aria-label={`Delete ${cat.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-3" />

            {/* Subcategory badges */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Subcategories
            </p>
            <SubcategoryBadges subcategories={cat.subcategories} />
          </div>
        ))}
      </div>

      {/* ── Edit Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">{isAdding ? 'Add Category' : 'Edit Category'}</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subcategories
                  <span className="ml-1 font-normal text-gray-400">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={editSubcategories}
                  onChange={(e) => setEditSubcategories(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 px-5 pb-5 pt-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isAdding ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}