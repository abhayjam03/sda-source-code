'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GameProps {
  onGameOver?: (score: number) => void
}

export default function SpaceShooter({ onGameOver }: GameProps) {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 80 })
  const [bullets, setBullets] = useState<{ id: number; x: number; y: number }[]>([])
  const [enemies, setEnemies] = useState<{ id: number; x: number; y: number; type: 'small' | 'medium' | 'large' }[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [highScore, setHighScore] = useState(0)

  const movePlayer = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameStarted || gameOver) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPlayerPosition({ x, y: 80 })
  }, [gameStarted, gameOver])

  const shoot = useCallback(() => {
    if (!gameStarted || gameOver) return
    setBullets(prev => [...prev, { id: Date.now(), x: playerPosition.x, y: 80 }])
  }, [gameStarted, gameOver, playerPosition.x])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = setInterval(() => {
      // Move bullets
      setBullets(prev => 
        prev
          .map(bullet => ({ ...bullet, y: bullet.y - 5 }))
          .filter(bullet => bullet.y > 0)
      )

      // Move enemies
      setEnemies(prev => 
        prev
          .map(enemy => ({ ...enemy, y: enemy.y + (2 + level * 0.5) }))
          .filter(enemy => enemy.y < 100)
      )

      // Spawn new enemies
      if (Math.random() < 0.1 + (level * 0.02)) {
        const enemyTypes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large']
        const type = enemyTypes[Math.floor(Math.random() * Math.min(level, 3))]
        setEnemies(prev => [...prev, { 
          id: Date.now(), 
          x: Math.random() * 90, 
          y: 0,
          type
        }])
      }

      // Check collisions
      setEnemies(prev => {
        const newEnemies = [...prev]
        setBullets(prevBullets => {
          const newBullets = [...prevBullets]
          for (let i = newEnemies.length - 1; i >= 0; i--) {
            for (let j = newBullets.length - 1; j >= 0; j--) {
              if (
                Math.abs(newEnemies[i].x - newBullets[j].x) < 5 &&
                Math.abs(newEnemies[i].y - newBullets[j].y) < 5
              ) {
                const points = {
                  small: 10,
                  medium: 20,
                  large: 30
                }[newEnemies[i].type]
                
                newEnemies.splice(i, 1)
                newBullets.splice(j, 1)
                setScore(s => {
                  const newScore = s + points
                  if (newScore > highScore) {
                    setHighScore(newScore)
                  }
                  return newScore
                })
                break
              }
            }
          }
          return newBullets
        })
        return newEnemies
      })

      // Check player collisions
      setEnemies(prev => {
        const newEnemies = [...prev]
        for (let i = newEnemies.length - 1; i >= 0; i--) {
          if (
            Math.abs(newEnemies[i].x - playerPosition.x) < 5 &&
            Math.abs(newEnemies[i].y - playerPosition.y) < 5
          ) {
            newEnemies.splice(i, 1)
            setLives(l => {
              if (l <= 1) {
                setGameOver(true)
                onGameOver?.(score)
              }
              return l - 1
            })
            break
          }
        }
        return newEnemies
      })

      // Level up
      if (score > 0 && score % 100 === 0) {
        setLevel(l => l + 1)
      }
    }, 50)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, level, score, highScore, playerPosition, onGameOver])

  useEffect(() => {
    if (timeLeft > 0 && gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
      onGameOver?.(score)
    }
  }, [timeLeft, gameStarted, gameOver, score, onGameOver])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
    setGameStarted(true)
    setEnemies([])
    setBullets([])
    setLives(3)
    setLevel(1)
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-secondary-900 to-secondary-800 rounded-lg overflow-hidden">
      {!gameStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Space Shooter</h3>
            <p className="text-primary-200 mb-2">Click to shoot, move mouse to control ship</p>
            <p className="text-primary-200">Destroy enemies to score points!</p>
          </motion.div>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="btn btn-primary text-lg px-8 py-4"
          >
            Start Game
          </motion.button>
        </div>
      ) : !gameOver ? (
        <>
          <div
            className="absolute inset-0 cursor-crosshair"
            onMouseMove={movePlayer}
            onClick={shoot}
          >
            {/* Player */}
            <motion.div
              className="absolute w-8 h-8 bg-primary-500 rounded-full"
              style={{
                left: `${playerPosition.x}%`,
                top: `${playerPosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="absolute inset-0 bg-primary-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Bullets */}
            <AnimatePresence>
              {bullets.map(bullet => (
                <motion.div
                  key={bullet.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute w-2 h-4 bg-primary-400 rounded-full"
                  style={{
                    left: `${bullet.x}%`,
                    top: `${bullet.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </AnimatePresence>

            {/* Enemies */}
            <AnimatePresence>
              {enemies.map(enemy => (
                <motion.div
                  key={enemy.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={`absolute rounded-full ${
                    enemy.type === 'small' ? 'w-4 h-4 bg-red-400' :
                    enemy.type === 'medium' ? 'w-6 h-6 bg-red-500' :
                    'w-8 h-8 bg-red-600'
                  }`}
                  style={{
                    left: `${enemy.x}%`,
                    top: `${enemy.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </AnimatePresence>

            {/* HUD */}
            <div className="absolute top-4 left-4 text-white font-bold space-y-1">
              <div>Score: {score}</div>
              <div>Time: {timeLeft}s</div>
              <div>Level: {level}</div>
              <div>Lives: {'❤️'.repeat(lives)}</div>
              <div>High Score: {highScore}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
            <p className="text-primary-300 mb-1">Final Score: {score}</p>
            <p className="text-primary-300 mb-4">High Score: {highScore}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="btn btn-primary"
            >
              Play Again
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  )
} 