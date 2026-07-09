"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./CupboardDesigner.module.css";

export default function CupboardDesigner() {
  const [rotation, setRotation] = useState({ x: 20, y: -25 });
  const [depth, setDepth] = useState(40);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(150);
  const [shelves, setShelves] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const scale = 1.2; // Scale multiplier for display

  // Depth calculation for realistic 3D effect
  const depthFactor = depth / 100; // Normalized depth (0-1)
  
  // Calculate shelf height based on total height
  const shelfHeight = height / (shelves + 0.5);

  // Handle mouse drag for rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation((prev) => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Generate depth gradient stops for 3D effect
  const generateDepthGradient = (index, totalShelves) => {
    const lightness = 50 + index * (20 / totalShelves); // Lighter towards back
    return `hsl(0, 0%, ${lightness}%)`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* 3D Viewer */}
        <div
          className={styles.viewerContainer}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          style={{
            perspective: "1000px",
          }}
        >
          <div
            className={styles.cupboardWrapper}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            {/* Cupboard exterior - front face */}
            <div
              className={styles.cupboardFace}
              style={{
                width: `${width * scale}px`,
                height: `${height * scale}px`,
                transform: `translateZ(${(depth / 2) * scale}px)`,
              }}
            >
              <div className={styles.frameOuter} />

              {/* Shelves */}
              {Array.from({ length: shelves }).map((_, index) => (
                <div
                  key={`shelf-${index}`}
                  className={styles.shelf}
                  style={{
                    top: `${((index + 1) * shelfHeight * scale) / height * 100}%`,
                    backgroundColor: "#2a2a2a",
                    boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.8), 
                               inset 0 2px 4px rgba(255,255,255,0.1)`,
                    height: "8px",
                  }}
                />
              ))}

              {/* Door */}
              <div className={styles.door} />
            </div>

            {/* Cupboard depth - side faces with gradient */}
            {/* Right side */}
            <div
              className={styles.cupboardSide}
              style={{
                width: `${depth * scale}px`,
                height: `${height * scale}px`,
                transform: `rotateY(90deg) translateZ(${(width / 2) * scale}px)`,
                background: `linear-gradient(to bottom, 
                  ${generateDepthGradient(0, shelves)},
                  ${generateDepthGradient(shelves / 2, shelves)},
                  ${generateDepthGradient(shelves, shelves)})`,
                boxShadow: "inset 2px 0 20px rgba(0,0,0,0.6)",
              }}
            >
              {/* Depth shelves visualization */}
              {Array.from({ length: shelves }).map((_, index) => (
                <div
                  key={`depth-shelf-${index}`}
                  className={styles.depthShelf}
                  style={{
                    top: `${((index + 1) * shelfHeight * scale) / height * 100}%`,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                />
              ))}
            </div>

            {/* Left side */}
            <div
              className={styles.cupboardSide}
              style={{
                width: `${depth * scale}px`,
                height: `${height * scale}px`,
                transform: `rotateY(-90deg) translateZ(${(width / 2) * scale}px)`,
                background: `linear-gradient(to bottom, 
                  ${generateDepthGradient(0, shelves)},
                  ${generateDepthGradient(shelves / 2, shelves)},
                  ${generateDepthGradient(shelves, shelves)})`,
                boxShadow: "inset -2px 0 20px rgba(0,0,0,0.6)",
              }}
            />

            {/* Top */}
            <div
              className={styles.cupboardTop}
              style={{
                width: `${width * scale}px`,
                height: `${depth * scale}px`,
                transform: `rotateX(90deg) translateZ(${(height / 2) * scale}px)`,
                background: `linear-gradient(90deg, 
                  rgba(0,0,0,0.4), 
                  rgba(0,0,0,0.2))`,
                boxShadow: "inset 0 -3px 15px rgba(0,0,0,0.7)",
              }}
            />

            {/* Bottom */}
            <div
              className={styles.cupboardBottom}
              style={{
                width: `${width * scale}px`,
                height: `${depth * scale}px`,
                transform: `rotateX(-90deg) translateZ(${(height / 2) * scale}px)`,
                background: `linear-gradient(90deg, 
                  rgba(0,0,0,0.5), 
                  rgba(0,0,0,0.3))`,
                boxShadow: "inset 0 3px 15px rgba(0,0,0,0.8)",
              }}
            />
          </div>
        </div>

        {/* Info Text */}
        <p className={styles.infoText}>
          💡 Drag to rotate • Mouse wheel to zoom (coming soon)
        </p>
      </div>

      {/* Control Panel */}
      <div className={styles.controlPanel}>
        <h3 className={styles.panelTitle}>Cupboard Configuration</h3>

        {/* Dimensions */}
        <div className={styles.controlGroup}>
          <label>Width (cm): {width}</label>
          <input
            type="range"
            min="50"
            max="200"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.unit}>cm</span>
        </div>

        <div className={styles.controlGroup}>
          <label>Height (cm): {height}</label>
          <input
            type="range"
            min="80"
            max="250"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.unit}>cm</span>
        </div>

        <div className={styles.controlGroup}>
          <label>Depth (cm): {depth}</label>
          <input
            type="range"
            min="20"
            max="80"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.unit}>cm</span>
        </div>

        {/* Shelves */}
        <div className={styles.controlGroup}>
          <label>Number of Shelves: {shelves}</label>
          <input
            type="range"
            min="1"
            max="6"
            value={shelves}
            onChange={(e) => setShelves(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Display Metrics */}
        <div className={styles.metrics}>
          <h4>Specifications</h4>
          <ul>
            <li>Internal Volume: {(width * height * depth) / 1000}L</li>
            <li>Shelf Capacity: {shelves} shelves</li>
            <li>Avg Shelf Space: {((width * depth) / 100).toFixed(2)} cm²</li>
            <li>Depth Factor: {depthFactor.toFixed(2)}</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            onClick={() => {
              setRotation({ x: 20, y: -25 });
            }}
          >
            Reset View
          </button>
          <button className={styles.button + " " + styles.buttonPrimary}>
            Save Design
          </button>
        </div>
      </div>
    </div>
  );
}
