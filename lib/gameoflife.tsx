import { useEffect } from 'react'

export function GameOfLife() {
  useEffect(() => {
    const root: any = document.getElementById('Canvas')
    if (!root) return

    const canvas: any = document.createElement('canvas')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.border = 'none'
    canvas.style.zIndex = '0'
    canvas.style.backgroundColor = 'black'

    const ctx = canvas.getContext('2d')

    const cellSize = 10

    const widthCells = Math.ceil(canvas.width / cellSize)
    const heightCells = Math.ceil(canvas.height / cellSize)

    let firstGeneration: any = []
    for (let i = 0; i < widthCells; i++) {
      firstGeneration[i] = []
      for (let j = 0; j < heightCells; j++) {
        firstGeneration[i][j] = Math.random() * 100 > 80 ? 1 : 0
      }
    }

    function createNewGeneration() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const newGeneration: any = []

      for (let x = 0; x < widthCells; x++) {
        newGeneration[x] = []
        for (let y = 0; y < heightCells; y++) {
          let lifePower =
            getCellValue(x - 1, y - 1) +
            getCellValue(x - 1, y) +
            getCellValue(x - 1, y + 1) +
            getCellValue(x, y - 1) +
            getCellValue(x, y + 1) +
            getCellValue(x + 1, y - 1) +
            getCellValue(x + 1, y) +
            getCellValue(x + 1, y + 1)

          if (firstGeneration[x][y] === 0 && lifePower === 3) {
            newGeneration[x][y] = 1
          } else if (
            firstGeneration[x][y] === 1 &&
            (lifePower > 3 || lifePower < 2)
          ) {
            newGeneration[x][y] = 0
          } else {
            newGeneration[x][y] = firstGeneration[x][y]
          }

          if (newGeneration[x][y]) {
            ctx.fillStyle = '#99999937'
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          }
        }
      }
      firstGeneration = newGeneration
    }

    function getCellValue(x: any, y: any) {
      if (x < 0) x = widthCells - 1
      if (x >= widthCells) x = 0
      if (y < 0) y = heightCells - 1
      if (y >= heightCells) y = 0
      return firstGeneration[x][y]
    }

    function refreshPlatform() {
      for (let i = 0; i < widthCells; i++) {
        for (let j = 0; j < heightCells; j++) {
          firstGeneration[i][j] = Math.random() * 100 > 80 ? 1 : 0
        }
      }
    }

    root.appendChild(canvas)

    const intervalId = setInterval(createNewGeneration, 100)
    const refreshId = setInterval(() => {
      refreshPlatform()
    }, 60000 * 30)

    return () => {
      clearInterval(intervalId)
      clearInterval(refreshId)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }, [])

  return null
}
