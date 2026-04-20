import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";

type LGA = { id: string; name: string; areas: string[] };
type StateEntry = { id: string; name: string; lgas: LGA[] };

const initialData: StateEntry[] = [
  {
    id: "lagos",
    name: "Lagos State",
    lgas: [
      { id: "ikeja", name: "Ikeja", areas: ["Allen Avenue", "Computer Village", "Opebi", "Alausa"] },
      { id: "vi", name: "Victoria Island", areas: ["Lekki Phase 1", "Oniru", "VI Extension"] },
      { id: "surulere", name: "Surulere", areas: ["Adeniran Ogunsanya", "Aguda", "Itire"] },
    ],
  },
  {
    id: "abuja",
    name: "Abuja FCT",
    lgas: [
      { id: "garki", name: "Garki", areas: ["Garki 1", "Garki 2"] },
      { id: "wuse", name: "Wuse", areas: ["Wuse 1", "Wuse 2", "Wuse Zone 3"] },
    ],
  },
  {
    id: "rivers",
    name: "Rivers State",
    lgas: [
      { id: "ph", name: "Port Harcourt", areas: ["GRA Phase 1", "GRA Phase 2", "Trans Amadi"] },
    ],
  },
];

export default function LocationHierarchy() {
  const [locations, setLocations] = useState<StateEntry[]>(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStateName, setNewStateName] = useState("");
  const [newLgaName, setNewLgaName] = useState("");
  const [newAreaName, setNewAreaName] = useState("");
  const [openStates, setOpenStates] = useState<Set<string>>(new Set(initialData.map((s) => s.id)));
  const [openLgas, setOpenLgas] = useState<Set<string>>(
    new Set(initialData.flatMap((s) => s.lgas.map((l) => l.id)))
  );

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setter(next);
  };

  const addLocation = () => {
    if (newStateName.trim()) {
      const lgas = newLgaName.trim() ? [{
        id: newLgaName.toLowerCase().replace(/\s+/g, "-"),
        name: newLgaName.trim(),
        areas: newAreaName.trim() ? newAreaName.split(',').map(a => a.trim()).filter(a => a) : [],
      }] : [];
      const newState: StateEntry = {
        id: newStateName.toLowerCase().replace(/\s+/g, "-"),
        name: newStateName.trim(),
        lgas,
      };
      setLocations([...locations, newState]);
      setOpenStates(new Set([...openStates, newState.id]));
      if (lgas.length > 0) {
        setOpenLgas(new Set([...openLgas, lgas[0].id]));
      }
      setNewStateName("");
      setNewLgaName("");
      setNewAreaName("");
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Locations</h1>
      {/* Top bar */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 active:scale-95 transition-all"
        >
          <Plus className="size-3.5" />
          Add Location
        </button>
      </div>

      {/* Main card */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {locations.map((state, si) => {
          const stateOpen = openStates.has(state.id);
          return (
            <div key={state.id} className={si > 0 ? "border-t border-gray-100" : ""}>
              {/* State row */}
              <button
                type="button"
                onClick={() => toggle(openStates, state.id, setOpenStates)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ChevronDown
                    className={`size-3.5 text-gray-400 transition-transform duration-150 ${stateOpen ? "" : "-rotate-90"}`}
                  />
                  <span className="font-semibold text-gray-900">{state.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {state.lgas.length} LGA{state.lgas.length !== 1 ? "s" : ""}
                </span>
              </button>

              {/* LGAs */}
              {stateOpen &&
                state.lgas.map((lga) => {
                  const lgaOpen = openLgas.has(lga.id);
                  return (
                    <div key={lga.id} className="bg-green-50">
                      {/* LGA row */}
                      <button
                        type="button"
                        onClick={() => toggle(openLgas, lga.id, setOpenLgas)}
                        className="flex w-full items-center justify-between border-t border-gray-200 bg-green-50 py-2.5 pl-8 pr-4 text-left hover:bg-green-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ChevronDown
                            className={`size-3.5 text-gray-400 transition-transform duration-150 ${lgaOpen ? "" : "-rotate-90"}`}
                          />
                          <span className="font-medium text-gray-800">{lga.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {lga.areas.length} area{lga.areas.length !== 1 ? "s" : ""}
                        </span>
                      </button>

                      {/* Areas */}
                      {lgaOpen &&
                        lga.areas.map((area) => (
                          <div
                            key={area}
                            className="border-t border-gray-100 bg-white py-2.5 pl-14 pr-4 text-gray-700"
                          >
                            {area}
                          </div>
                        ))}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Location</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="stateName" className="block text-sm font-medium text-gray-700 mb-1">
                State Name
              </label>
              <input
                id="stateName"
                type="text"
                value={newStateName}
                onChange={(e) => setNewStateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-1">
                City Name
              </label>
              <input
                id="cityName"
                type="text"
                value={newLgaName}
                onChange={(e) => setNewLgaName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="areaName" className="block text-sm font-medium text-gray-700 mb-1">
                Area Name
              </label>
              <input
                id="areaName"
                type="text"
                value={newAreaName}
                onChange={(e) => setNewAreaName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter area name"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addLocation}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
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