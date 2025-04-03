import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/moving-border"

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: { email: string; name: string }) => void;
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Here you would typically send a request to your backend for authentication
    // For this example, we'll just simulate a successful login
    onLogin({ email, name: email.split("@")[0] })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    </div>
  )
}

