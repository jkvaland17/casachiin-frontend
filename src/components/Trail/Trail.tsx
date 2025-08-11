import React, { useState, useEffect, useRef, useCallback } from "react";

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  status: "approved" | "rejected" | "pending" | "active";
}

const Trail: React.FC = () => {
  const nodeSize = 120;
  const rowHeight = 100;
  const padding = 20;
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(800);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const getStatusColor = (status: Node["status"], darker = false) => {
    const colors = {
      approved: darker ? "#80c89b" : "#d1f4e0",
      rejected: darker ? "#d46a84" : "#f5c8d7",
      pending: darker ? "#e0a660" : "#fdedd3",
      active: darker ? "#3b82f6" : "#bfdbfe",
    };
    return colors[status] || "gray";
  };

  const getStatusIcon = (status: Node["status"]) => {
    switch (status) {
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      case "pending":
        return "⏳";
      case "active":
        return "⭐";
      default:
        return "❓";
    }
  };

  const calculateNodes = useCallback(
    (count: number) => {
      const nodesPerRow = Math.floor(maxWidth / nodeSize) || 1;
      const adjustedWidth = nodesPerRow * nodeSize;
      return Array.from({ length: count }, (_, i) => {
        const row = Math.floor(i / nodesPerRow);
        const col = i % nodesPerRow;
        const reversed = row % 2 === 1;

        const statuses: Node["status"][] = [
          "approved",
          "rejected",
          "pending",
          "active",
        ];
        const status =
          i < 5
            ? statuses[0]
            : i === 5
              ? statuses[3]
              : i < 8
                ? statuses[1]
                : statuses[2];

        return {
          id: i + 1,
          label: `Committee ${i + 1}`,
          status,
          x: reversed
            ? adjustedWidth - (col + 1) * nodeSize + padding
            : col * nodeSize + padding,
          y: row * rowHeight + padding,
        };
      });
    },
    [maxWidth],
  );

  const [nodes, setNodes] = useState<Node[]>(calculateNodes(10));

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setMaxWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setNodes(calculateNodes(nodes.length));
  }, [maxWidth, calculateNodes]);

  const addNode = () => setNodes(calculateNodes(nodes.length + 1));
  const removeNode = () =>
    nodes.length > 1 && setNodes(calculateNodes(nodes.length - 1));

  const updateNodeStatus = (id: number) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              status:
                node.status === "approved"
                  ? "rejected"
                  : node.status === "rejected"
                    ? "pending"
                    : node.status === "pending"
                      ? "active"
                      : "approved",
            }
          : node,
      ),
    );
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg
        width="100%"
        height={Math.max(...nodes.map((n) => n.y), 0) + rowHeight}
        style={{ backgroundColor: "transparent" }}
      >
        {nodes.map((node, index) => {
          if (index >= nodes.length - 1) return null;
          const nextNode = nodes[index + 1];
          const isVertical = node.x === nextNode.x;
          return (
            <line
              key={`line-${node.id}-${nextNode.id}`}
              x1={node.x + 25}
              y1={
                isVertical && node.status === "active"
                  ? node.y + 73
                  : node.y + 25
              }
              x2={nextNode.x + 25}
              y2={nextNode.y + 25}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}

        {nodes.map((node) => (
          <g
            key={node.id}
            onClick={() => updateNodeStatus(node.id)}
            onMouseEnter={(e) => {
              if (node.status !== "active") {
                setHoveredLabel(node.label);
                setTooltipPos({ x: e.clientX, y: e.clientY });
              }
            }}
            onMouseMove={(e) => {
              if (node.status !== "active") {
                setTooltipPos({ x: e.clientX, y: e.clientY });
              }
            }}
            onMouseLeave={() => setHoveredLabel(null)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={node.x + 25}
              cy={node.y + 25}
              r={25}
              stroke={getStatusColor(node.status, true)}
              fill={getStatusColor(node.status)}
            />
            <text
              x={node.x + 25}
              y={node.y + 30}
              fontSize="18"
              textAnchor="middle"
              fill="black"
            >
              {getStatusIcon(node.status)}
            </text>

            {node.status === "active" && (
              <text
                x={node.x + 25}
                y={node.y + 65}
                fontSize="15"
                fontWeight="500"
                textAnchor="middle"
                fill="black"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredLabel && (
        <div
          style={{
            position: "fixed",
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            background: "#333",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            pointerEvents: "none",
            zIndex: 9999,
            whiteSpace: "nowrap",
          }}
        >
          {hoveredLabel}
        </div>
      )}

      {/* <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={addNode} style={{ marginRight: 10 }}>
          Add Node
        </button>
        <button onClick={removeNode}>Remove Node</button>
      </div> */}
    </div>
  );
};

export default Trail;
