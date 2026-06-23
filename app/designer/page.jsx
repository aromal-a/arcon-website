"use client";

import { useMemo, useState } from "react";

const GRID_COLUMNS = 8;
const GRID_ROWS = 6;

const createDefaultModule = (x, y) => ({
  id: `${x}-${y}`,
  x,
  y,
  label: `Module ${x + 1}-${y + 1}`,
  widthInches: 24,
  heightInches: 84,
  groundLevelInches: 0,
  doors: 2,
  subPanels: 0,
  hasEntryDoor: false,
  entryDoorType: "single",
});

const createCellId = (x, y) => `${x}-${y}`;

export default function DesignerPage() {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("wardrobe");
  const [projectNotes, setProjectNotes] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const selectedModule = useMemo(
    () => modules.find((module) => module.id === selectedModuleId) || null,
    [modules, selectedModuleId]
  );

  const toggleCell = (x, y) => {
    const id = createCellId(x, y);
    const moduleExists = modules.some((module) => module.id === id);

    if (moduleExists) {
      setModules((previousModules) =>
        previousModules.filter((module) => module.id !== id)
      );
      setSelectedModuleId((previousId) => (previousId === id ? null : previousId));
      return;
    }

    setModules((previousModules) => [...previousModules, createDefaultModule(x, y)]);
    setSelectedModuleId(id);
  };

  const updateSelectedModule = (field, value) => {
    if (!selectedModuleId) {
      return;
    }

    setModules((previousModules) =>
      previousModules.map((module) =>
        module.id === selectedModuleId ? { ...module, [field]: value } : module
      )
    );
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-wide">Design Studio</h1>
        <p className="max-w-3xl text-gray-600">
          Build your wardrobe and interior layout by placing modules on the plane, then
          customize dimensions, ground levels, doors, sub-panels and entry doors.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="p-5 border rounded-xl bg-zinc-50">
          <h2 className="text-xl font-semibold">1. Create on Plane</h2>
          <p className="pt-1 pb-4 text-sm text-gray-600">
            Click on a cell to add a module. Click again to remove it.
          </p>

          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: GRID_ROWS * GRID_COLUMNS }, (_, index) => {
              const x = index % GRID_COLUMNS;
              const y = Math.floor(index / GRID_COLUMNS);
              const id = createCellId(x, y);
              const isPlaced = modules.some((module) => module.id === id);
              const isSelected = selectedModuleId === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleCell(x, y)}
                  className={`aspect-square rounded border text-xs font-medium transition ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : isPlaced
                        ? "border-gray-700 bg-gray-200 text-gray-900"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {x + 1},{y + 1}
                </button>
              );
            })}
          </div>
        </section>

        <section className="p-5 border rounded-xl bg-zinc-50">
          <h2 className="text-xl font-semibold">2. Project Details</h2>
          <div className="grid gap-4 pt-4">
            <label className="grid gap-1 text-sm">
              Project name
              <input
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="My wardrobe design"
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Design type
              <select
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="wardrobe">Wardrobe</option>
                <option value="living-space">Living space</option>
                <option value="kitchen">Kitchen</option>
                <option value="full-house">Full house</option>
              </select>
            </label>

            <label className="grid gap-1 text-sm">
              Notes
              <textarea
                value={projectNotes}
                onChange={(event) => setProjectNotes(event.target.value)}
                rows={4}
                placeholder="Color palette and material options can be added later."
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <div className="p-3 text-sm border rounded-md bg-white">
              <p>
                <span className="font-semibold">Active modules:</span> {modules.length}
              </p>
              <p>
                <span className="font-semibold">Selected:</span>{" "}
                {selectedModule ? selectedModule.label : "None"}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="p-5 border rounded-xl bg-zinc-50">
        <h2 className="text-xl font-semibold">3. Module Configuration</h2>
        {!selectedModule ? (
          <p className="pt-3 text-gray-600">Select a placed module to edit its settings.</p>
        ) : (
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm">
              Module label
              <input
                type="text"
                value={selectedModule.label}
                onChange={(event) => updateSelectedModule("label", event.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Width (inches)
              <input
                type="number"
                min="1"
                value={selectedModule.widthInches}
                onChange={(event) =>
                  updateSelectedModule("widthInches", Number(event.target.value) || 0)
                }
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Height (inches)
              <input
                type="number"
                min="1"
                value={selectedModule.heightInches}
                onChange={(event) =>
                  updateSelectedModule("heightInches", Number(event.target.value) || 0)
                }
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Ground level (inches)
              <input
                type="number"
                min="0"
                value={selectedModule.groundLevelInches}
                onChange={(event) =>
                  updateSelectedModule("groundLevelInches", Number(event.target.value) || 0)
                }
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Door count
              <input
                type="number"
                min="0"
                value={selectedModule.doors}
                onChange={(event) =>
                  updateSelectedModule("doors", Number(event.target.value) || 0)
                }
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Sub-panels
              <input
                type="number"
                min="0"
                value={selectedModule.subPanels}
                onChange={(event) =>
                  updateSelectedModule("subPanels", Number(event.target.value) || 0)
                }
                className="px-3 py-2 border rounded-md"
              />
            </label>

            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input
                type="checkbox"
                checked={selectedModule.hasEntryDoor}
                onChange={(event) =>
                  updateSelectedModule("hasEntryDoor", event.target.checked)
                }
              />
              Has entry door
            </label>

            <label className="grid gap-1 text-sm md:col-span-2">
              Entry door type
              <select
                value={selectedModule.entryDoorType}
                onChange={(event) => updateSelectedModule("entryDoorType", event.target.value)}
                disabled={!selectedModule.hasEntryDoor}
                className="px-3 py-2 border rounded-md disabled:bg-gray-200"
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="sliding">Sliding</option>
                <option value="folding">Folding</option>
              </select>
            </label>
          </div>
        )}
      </section>

      {modules.length > 0 && (
        <section className="p-5 border rounded-xl bg-zinc-50">
          <h2 className="text-xl font-semibold">Current Layout Summary</h2>
          <div className="pt-4 overflow-auto">
            <table className="w-full text-sm border">
              <thead className="bg-white">
                <tr>
                  <th className="px-3 py-2 text-left border">Module</th>
                  <th className="px-3 py-2 text-left border">Position</th>
                  <th className="px-3 py-2 text-left border">W × H (in)</th>
                  <th className="px-3 py-2 text-left border">Ground (in)</th>
                  <th className="px-3 py-2 text-left border">Doors</th>
                  <th className="px-3 py-2 text-left border">Sub-panels</th>
                  <th className="px-3 py-2 text-left border">Entry door</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id} className="bg-zinc-50">
                    <td className="px-3 py-2 border">{module.label}</td>
                    <td className="px-3 py-2 border">
                      {module.x + 1},{module.y + 1}
                    </td>
                    <td className="px-3 py-2 border">
                      {module.widthInches} × {module.heightInches}
                    </td>
                    <td className="px-3 py-2 border">{module.groundLevelInches}</td>
                    <td className="px-3 py-2 border">{module.doors}</td>
                    <td className="px-3 py-2 border">{module.subPanels}</td>
                    <td className="px-3 py-2 border">
                      {module.hasEntryDoor ? module.entryDoorType : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pt-4 text-xs text-gray-500">
            Color palette controls can be connected later when your palette options are ready.
          </p>
        </section>
      )}
    </div>
  );
}
