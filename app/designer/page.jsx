"use client";

import { useMemo, useState } from "react";

const createLane = (id) => ({
  id,
  label: `Lane ${id}`,
  widthInches: 30,
  heightInches: 84,
  depthInches: 24,
  groundGapInches: 0,
  shelves: 4,
  drawers: 2,
  doorStyle: "double",
});

const styleOptions = [
  { value: "open", label: "Open" },
  { value: "single", label: "Single door" },
  { value: "double", label: "Double door" },
  { value: "sliding", label: "Sliding" },
];

const MIN_WIDTH = 12;
const MIN_HEIGHT = 60;
const MIN_DEPTH = 12;
const PIXELS_PER_INCH = 3;

export default function DesignerPage() {
  const [projectName, setProjectName] = useState("My Wardrobe");
  const [roomWallWidth, setRoomWallWidth] = useState(144);
  const [notes, setNotes] = useState("");
  const [selectedLaneId, setSelectedLaneId] = useState(1);
  const [lanes, setLanes] = useState([createLane(1), createLane(2), createLane(3)]);

  const selectedLane = useMemo(
    () => lanes.find((lane) => lane.id === selectedLaneId) || null,
    [lanes, selectedLaneId]
  );

  const totals = useMemo(() => {
    const totalWidth = lanes.reduce((sum, lane) => sum + lane.widthInches, 0);
    const maxHeight = lanes.reduce((max, lane) => Math.max(max, lane.heightInches), 0);
    const frontAreaSqFt = lanes.reduce(
      (sum, lane) => sum + (lane.widthInches * lane.heightInches) / 144,
      0
    );
    const volumeCuFt = lanes.reduce(
      (sum, lane) => sum + (lane.widthInches * lane.heightInches * lane.depthInches) / 1728,
      0
    );
    const materialIndex = Math.round(frontAreaSqFt * 1.4 + volumeCuFt * 0.6);

    return {
      totalWidth,
      maxHeight,
      frontAreaSqFt,
      volumeCuFt,
      materialIndex,
      fitPercent: roomWallWidth > 0 ? Math.min((totalWidth / roomWallWidth) * 100, 999) : 0,
    };
  }, [lanes, roomWallWidth]);

  const addLane = () => {
    const nextId = lanes.length > 0 ? Math.max(...lanes.map((lane) => lane.id)) + 1 : 1;
    const lane = createLane(nextId);
    setLanes((prev) => [...prev, lane]);
    setSelectedLaneId(lane.id);
  };

  const removeLane = (id) => {
    if (lanes.length === 1) {
      return;
    }

    setLanes((prev) => prev.filter((lane) => lane.id !== id));
    setSelectedLaneId((currentId) => {
      if (currentId !== id) {
        return currentId;
      }
      const remaining = lanes.filter((lane) => lane.id !== id);
      return remaining.length > 0 ? remaining[0].id : null;
    });
  };

  const updateLane = (id, key, value) => {
    setLanes((prev) => prev.map((lane) => (lane.id === id ? { ...lane, [key]: value } : lane)));
  };

  return (
    <main className="container py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Wardrobe Maker</h1>
        <p className="max-w-3xl text-gray-600">
          Build a quick rough estimate with a lane-based structure: enter measurements,
          tweak shelf/drawer setup, and instantly preview a minimal visual wardrobe front.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-5 border rounded-xl bg-zinc-50 space-y-4">
          <h2 className="text-xl font-semibold">Project Setup</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm">
              Project name
              <input
                className="px-3 py-2 border rounded-md"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="Master bedroom wardrobe"
              />
            </label>
            <label className="grid gap-1 text-sm">
              Available wall width (inches)
              <input
                type="number"
                min="1"
                className="px-3 py-2 border rounded-md"
                value={roomWallWidth}
                onChange={(event) => setRoomWallWidth(Math.max(1, Number(event.target.value) || 1))}
              />
            </label>
          </div>
          <label className="grid gap-1 text-sm">
            Notes
            <textarea
              rows={3}
              className="px-3 py-2 border rounded-md"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Color palette options can be attached later."
            />
          </label>

          <div className="grid gap-2 sm:grid-cols-2">
            <StatCard label="Total lane width" value={`${totals.totalWidth.toFixed(0)} in`} />
            <StatCard
              label="Wall usage"
              value={`${totals.fitPercent.toFixed(0)}%`}
              tone={totals.totalWidth > roomWallWidth ? "warning" : "normal"}
            />
            <StatCard label="Front area" value={`${totals.frontAreaSqFt.toFixed(1)} sq ft`} />
            <StatCard label="Volume" value={`${totals.volumeCuFt.toFixed(1)} cu ft`} />
          </div>

          <div className="p-3 text-sm border rounded-md bg-white">
            <span className="font-semibold">Material index:</span> {totals.materialIndex}
            <p className="mt-1 text-gray-500">
              Rough only: higher index means larger build and likely higher cost.
            </p>
          </div>
        </div>

        <div className="p-5 border rounded-xl bg-zinc-50 space-y-3">
          <h2 className="text-xl font-semibold">Lane Controls</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addLane}
              className="px-3 py-2 text-sm font-medium text-white bg-black rounded-md"
            >
              Add lane
            </button>
            {lanes.map((lane) => (
              <button
                key={lane.id}
                type="button"
                onClick={() => setSelectedLaneId(lane.id)}
                className={`px-3 py-2 text-sm border rounded-md ${
                  selectedLaneId === lane.id ? "bg-black text-white border-black" : "bg-white"
                }`}
              >
                {lane.label}
              </button>
            ))}
          </div>

          {selectedLane && (
            <div className="grid gap-3 pt-2">
              <label className="grid gap-1 text-sm">
                Lane label
                <input
                  value={selectedLane.label}
                  onChange={(event) => updateLane(selectedLane.id, "label", event.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1 text-sm">
                  Width (in)
                  <input
                    type="number"
                    min={MIN_WIDTH}
                    value={selectedLane.widthInches}
                    onChange={(event) =>
                      updateLane(
                        selectedLane.id,
                        "widthInches",
                        Math.max(MIN_WIDTH, Number(event.target.value) || MIN_WIDTH)
                      )
                    }
                    className="px-3 py-2 border rounded-md"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Height (in)
                  <input
                    type="number"
                    min={MIN_HEIGHT}
                    value={selectedLane.heightInches}
                    onChange={(event) =>
                      updateLane(
                        selectedLane.id,
                        "heightInches",
                        Math.max(MIN_HEIGHT, Number(event.target.value) || MIN_HEIGHT)
                      )
                    }
                    className="px-3 py-2 border rounded-md"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Depth (in)
                  <input
                    type="number"
                    min={MIN_DEPTH}
                    value={selectedLane.depthInches}
                    onChange={(event) =>
                      updateLane(
                        selectedLane.id,
                        "depthInches",
                        Math.max(MIN_DEPTH, Number(event.target.value) || MIN_DEPTH)
                      )
                    }
                    className="px-3 py-2 border rounded-md"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Ground gap (in)
                  <input
                    type="number"
                    min="0"
                    value={selectedLane.groundGapInches}
                    onChange={(event) =>
                      updateLane(
                        selectedLane.id,
                        "groundGapInches",
                        Math.max(0, Number(event.target.value) || 0)
                      )
                    }
                    className="px-3 py-2 border rounded-md"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Shelves
                  <input
                    type="number"
                    min="0"
                    value={selectedLane.shelves}
                    onChange={(event) =>
                      updateLane(
                        selectedLane.id,
                        "shelves",
                        Math.max(0, Number(event.target.value) || 0)
                      )
                    }
                    className="px-3 py-2 border rounded-md"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  Drawers
                  <input
                    type="number"
                    min="0"
                    value={selectedLane.drawers}
                    onChange={(event) =>
                      updateLane(
                        selectedLane.id,
                        "drawers",
                        Math.max(0, Number(event.target.value) || 0)
                      )
                    }
                    className="px-3 py-2 border rounded-md"
                  />
                </label>
              </div>

              <label className="grid gap-1 text-sm">
                Door style
                <select
                  value={selectedLane.doorStyle}
                  onChange={(event) => updateLane(selectedLane.id, "doorStyle", event.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  {styleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => removeLane(selectedLane.id)}
                className="self-start px-3 py-2 text-sm border rounded-md hover:bg-red-50"
              >
                Remove selected lane
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="p-5 border rounded-xl bg-zinc-50 space-y-4">
        <h2 className="text-xl font-semibold">Visual Lane Preview</h2>
        <p className="text-sm text-gray-600">
          This front elevation uses lane widths and heights for a simple realistic visual feel.
        </p>

        <div className="p-4 overflow-x-auto bg-white border rounded-lg">
          <div className="min-w-[700px]">
            <div className="flex items-end gap-1 h-[360px] bg-gradient-to-b from-zinc-50 to-zinc-100 p-2 border rounded-md">
              {lanes.map((lane) => {
                const widthRatio = totals.totalWidth > 0 ? lane.widthInches / totals.totalWidth : 0;
                const heightRatio = totals.maxHeight > 0 ? lane.heightInches / totals.maxHeight : 0;
                const laneHeight = Math.max(120, Math.round(heightRatio * 320));
                const shelfLines = Array.from({ length: Math.min(lane.shelves, 10) });

                return (
                  <button
                    key={lane.id}
                    type="button"
                    onClick={() => setSelectedLaneId(lane.id)}
                    style={{ width: `${Math.max(widthRatio * 100, 8)}%`, height: `${laneHeight}px` }}
                    className={`relative border-2 rounded-sm transition ${
                      selectedLaneId === lane.id
                        ? "border-black bg-zinc-200"
                        : "border-zinc-500 bg-zinc-100 hover:bg-zinc-200"
                    }`}
                  >
                    <div
                      className="absolute inset-x-0 border-t border-zinc-500"
                      style={{ bottom: `${Math.min(lane.groundGapInches, 24) * PIXELS_PER_INCH}px` }}
                    />

                    {shelfLines.map((_, shelfIndex) => (
                      <div
                        key={`shelf-${lane.id}-${shelfIndex}`}
                        className="absolute inset-x-1 border-t border-zinc-400"
                        style={{ top: `${((shelfIndex + 1) / (shelfLines.length + 1)) * 100}%` }}
                      />
                    ))}

                    {lane.doorStyle === "single" && (
                      <div className="absolute inset-y-2 left-1/2 border-l border-zinc-600" />
                    )}
                    {lane.doorStyle === "double" && (
                      <>
                        <div className="absolute inset-y-2 left-1/2 border-l border-zinc-600" />
                        <div className="absolute top-1/2 left-1 right-1 border-t border-zinc-600" />
                      </>
                    )}
                    {lane.doorStyle === "sliding" && (
                      <>
                        <div className="absolute inset-y-3 left-[42%] border-l border-zinc-600" />
                        <div className="absolute inset-y-3 left-[58%] border-l border-zinc-600" />
                      </>
                    )}

                    {lane.drawers > 0 && (
                      <div className="absolute bottom-1 left-1 right-1 text-[10px] text-zinc-700">
                        {lane.drawers} drawers
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-1 gap-1 mt-2 text-xs text-gray-600 md:grid-cols-3">
              {lanes.map((lane) => (
                <div key={`meta-${lane.id}`} className="px-2 py-1 border rounded bg-zinc-50">
                  <span className="font-semibold">{lane.label}:</span> {lane.widthInches}W × {lane.heightInches}H
                  × {lane.depthInches}D
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, tone = "normal" }) {
  return (
    <div
      className={`p-3 border rounded-md ${
        tone === "warning" ? "bg-amber-50 border-amber-200" : "bg-white"
      }`}
    >
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
