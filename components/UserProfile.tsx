import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function UserProfile({ user }) {
  const [favorites, setFavorites] = useState([])
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    // Here you would typically fetch the user's favorites and watchlist from your backend
    // For this example, we'll just use some dummy data
    setFavorites([
      { id: 1, title: "Inception" },
      { id: 2, title: "The Dark Knight" },
    ])
    setWatchlist([
      { id: 3, title: "Interstellar" },
      { id: 4, title: "The Prestige" },
    ])
  }, [user])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Favorites</h3>
          <ul>
            {favorites.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Watchlist</h3>
          <ul>
            {watchlist.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

