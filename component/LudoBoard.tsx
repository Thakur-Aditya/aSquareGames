"use client"

import { useEffect, useRef } from "react"

interface LudoBoardProps {
  width?: number
  height?: number
}

export default function LudoBoard({ width = 600, height = 600 }: LudoBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set actual canvas size
    canvas.width = width
    canvas.height = height

    // Define colors
    const colors = {
      green: "#68B984",
      yellow: "#FFD93D",
      red: "#FF6B6B",
      blue: "#4D96FF",
      white: "#FFFFFF",
      grid: "#E5E5E5",
      star: "#FFD700",
    }

    const cellSize = width / 15 // Board is 15x15 grid

    // Clear canvas
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, width, height)

    // Helper function to draw home bases
    const drawHomeBase = (x: number, y: number, color: string) => {
      const baseSize = cellSize * 6
      // Main colored square
      ctx.fillStyle = color
      ctx.fillRect(x * cellSize, y * cellSize, baseSize, baseSize)

      // White inner square
      const padding = cellSize
      ctx.fillStyle = colors.white
      ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, baseSize - 2 * padding, baseSize - 2 * padding)

      // Four colored squares inside
      const innerPadding = 1.5 * cellSize
      ctx.fillStyle = color
      // Top left
      ctx.fillRect((x + innerPadding) * cellSize, (y + innerPadding) * cellSize, cellSize, cellSize)
      // Top right
      ctx.fillRect((x + baseSize - innerPadding - 1) * cellSize, (y + innerPadding) * cellSize, cellSize, cellSize)
      // Bottom left
      ctx.fillRect((x + innerPadding) * cellSize, (y + baseSize - innerPadding - 1) * cellSize, cellSize, cellSize)
      // Bottom right
      ctx.fillRect(
        (x + baseSize - innerPadding - 1) * cellSize,
        (y + baseSize - innerPadding - 1) * cellSize,
        cellSize,
        cellSize,
      )
    }

    // Helper function to draw a star
    const drawStar = (x: number, y: number) => {
      ctx.fillStyle = colors.star
      ctx.beginPath()
      const points = 5
      const outerRadius = cellSize * 0.4
      const innerRadius = cellSize * 0.2

      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI) / points
        const xPos = x * cellSize + cellSize / 2 + radius * Math.sin(angle)
        const yPos = y * cellSize + cellSize / 2 + radius * Math.cos(angle)
        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
      ctx.fill()
    }

    // Helper function to draw a path square
    const drawPathSquare = (x: number, y: number, color: string = colors.white) => {
      ctx.fillStyle = color
      ctx.strokeStyle = colors.grid
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }

    // Draw home bases
    drawHomeBase(0, 0, colors.green) // Top left
    drawHomeBase(9, 0, colors.yellow) // Top right
    drawHomeBase(0, 9, colors.red) // Bottom left
    drawHomeBase(9, 9, colors.blue) // Bottom right

    // Draw the paths
    // Top row
    for (let i = 6; i <= 8; i++) {
      for (let j = 0; j < 6; j++) {
        drawPathSquare(i, j, j === 1 ? colors.green : colors.white)
      }
    }

    // Right column
    for (let i = 9; i < 15; i++) {
      for (let j = 6; j <= 8; j++) {
        drawPathSquare(i, j, j === 7 ? colors.yellow : colors.white)
      }
    }

    // Bottom row
    for (let i = 6; i <= 8; i++) {
      for (let j = 9; j < 15; j++) {
        drawPathSquare(i, j, j === 13 ? colors.blue : colors.white)
      }
    }

    // Left column
    for (let i = 0; i < 6; i++) {
      for (let j = 6; j <= 8; j++) {
        drawPathSquare(i, j, j === 7 ? colors.red : colors.white)
      }
    }

    // Draw colored home paths
    // Green (top)
    for (let i = 1; i < 6; i++) {
      drawPathSquare(7, i, colors.green)
    }
    // Yellow (right)
    for (let i = 9; i < 14; i++) {
      drawPathSquare(i, 7, colors.yellow)
    }
    // Blue (bottom)
    for (let i = 9; i < 14; i++) {
      drawPathSquare(7, i, colors.blue)
    }
    // Red (left)
    for (let i = 1; i < 6; i++) {
      drawPathSquare(i, 7, colors.red)
    }

    // Draw safe spots (stars)
    const starPositions = [
      [6, 2], // Green side
      [12, 6], // Yellow side
      [8, 12], // Blue side
      [2, 8], // Red side
      [6, 1], // Before green entry
      [13, 6], // Before yellow entry
      [8, 13], // Before blue entry
      [1, 8], // Before red entry
    ]

    starPositions.forEach(([x, y]) => {
      drawPathSquare(x, y)
      drawStar(x, y)
    })

    // Draw center square
    const centerColors = [colors.green, colors.yellow, colors.red, colors.blue]
    centerColors.forEach((color, index) => {
      ctx.beginPath()
      ctx.moveTo(width / 2, height / 2)
      ctx.arc(width / 2, height / 2, cellSize * 2, (index * Math.PI) / 2, ((index + 1) * Math.PI) / 2)
      ctx.lineTo(width / 2, height / 2)
      ctx.fillStyle = color
      ctx.fill()
    })
  }, [width, height])

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  )
}

