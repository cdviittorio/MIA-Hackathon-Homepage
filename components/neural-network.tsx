"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  layer: number
}

interface Connection {
  from: number
  to: number
}

export function NeuralNetwork() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    const layers = [4, 6, 8, 6, 4]
    const generatedNodes: Node[] = []
    const generatedConnections: Connection[] = []
    let nodeId = 0

    layers.forEach((nodeCount, layerIndex) => {
      for (let i = 0; i < nodeCount; i++) {
        generatedNodes.push({
          id: nodeId++,
          x: 15 + layerIndex * 17.5,
          y: 50 - ((nodeCount - 1) * 8) / 2 + i * 8,
          layer: layerIndex,
        })
      }
    })

    // Create connections between adjacent layers
    generatedNodes.forEach((node) => {
      if (node.layer < layers.length - 1) {
        const nextLayerNodes = generatedNodes.filter((n) => n.layer === node.layer + 1)
        nextLayerNodes.forEach((nextNode) => {
          if (Math.random() > 0.3) {
            generatedConnections.push({ from: node.id, to: nextNode.id })
          }
        })
      }
    })

    setNodes(generatedNodes)
    setConnections(generatedConnections)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find((n) => n.id === conn.from)
          const toNode = nodes.find((n) => n.id === conn.to)
          if (!fromNode || !toNode) return null

          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="oklch(0.75 0.18 195)"
              strokeWidth="0.1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                pathLength: { duration: 2, delay: i * 0.01 },
                opacity: { duration: 3, repeat: Infinity, delay: i * 0.1 },
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.8"
            fill="oklch(0.75 0.18 195)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, delay: i * 0.1 },
              opacity: { duration: 2, repeat: Infinity, delay: i * 0.1 },
            }}
          />
        ))}

        {/* Data pulses traveling through network */}
        {connections.slice(0, 20).map((conn, i) => {
          const fromNode = nodes.find((n) => n.id === conn.from)
          const toNode = nodes.find((n) => n.id === conn.to)
          if (!fromNode || !toNode) return null

          return (
            <motion.circle
              key={`pulse-${i}`}
              r="0.4"
              fill="oklch(0.65 0.2 145)"
              initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 0 }}
              animate={{
                cx: [fromNode.x, toNode.x],
                cy: [fromNode.y, toNode.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
