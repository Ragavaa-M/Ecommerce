import { useState } from 'react'
import { Package, SignIn, UserPlus } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { DEMO_CREDENTIALS } from '@/lib/data'

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSignup: (email: string, password: string, name: string) => Promise<void>
  loading?: boolean
}

export function Login({ onLogin, onSignup, loading: externalLoading }: LoginProps) {
  const [isSignupMode, setIsSignupMode] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignupMode) {
        await onSignup(email, password, name)
      } else {
        await onLogin(email, password)
      }
    } catch (err: any) {
      setError(err.message || (isSignupMode ? 'Signup failed. Please try again.' : 'Invalid credentials. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode)
    setError('')
    setEmail('')
    setPassword('')
    setName('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Package size={32} weight="duotone" className="text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">
            {isSignupMode ? 'Create Account' : 'Welcome to ShopHub'}
          </CardTitle>
          <CardDescription className="text-base">
            {isSignupMode 
              ? 'Sign up to start your shopping journey' 
              : 'Sign in to start shopping amazing products'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignupMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isSignupMode ? (
                <>
                  <UserPlus size={20} className="mr-2" />
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </>
              ) : (
                <>
                  <SignIn size={20} className="mr-2" />
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="text-sm"
              >
                {isSignupMode 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>

        {!isSignupMode && (
          <CardFooter className="flex-col gap-3 border-t bg-muted/30 pt-6">
            <p className="text-sm font-medium text-center">Demo Credentials</p>
            <div className="w-full space-y-1 rounded-md bg-background p-3 font-mono text-sm border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{DEMO_CREDENTIALS.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Password:</span>
                <span className="font-medium">{DEMO_CREDENTIALS.password}</span>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
