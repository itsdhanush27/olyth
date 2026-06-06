import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Lock, Eye, EyeOff } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { supabase } from '@/lib/supabase'

export default function SignIn() {
  useScrollToTop()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single()

      if (profileError || !profile || (profile.role !== 'Admin' && profile.role !== 'Super Admin')) {
        // Regular user, route to a user dashboard or home
        navigate('/')
      } else {
        // Admin user - redirect to admin dashboard
        navigate('/admin')
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-[420px] mx-auto px-5">
        <ScrollFadeIn className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-orange" />
          </div>
          <h1 className="font-archivo text-[36px] font-light text-charcoal tracking-[-1.44px] leading-tight">
            Sign In
          </h1>
          <p className="font-inter text-base text-clay mt-3">
            Access your dashboard
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <form onSubmit={handleSubmit} className="bg-white rounded-card p-8 shadow-card">
            <div className="flex flex-col gap-5">
              <div>
                <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal placeholder:text-graytext focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal placeholder:text-graytext focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange" disabled={isLoading} />
                  <span className="font-inter text-sm text-clay">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset is for demonstration only.')}
                  className="font-inter text-sm text-orange hover:underline"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full py-3.5 rounded-pill bg-gradient-to-br from-orange to-orange-dark text-white font-inter text-sm font-medium hover:from-orange-dark hover:to-orange-darker transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="text-center font-inter text-sm text-clay mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/waitlist')}
              className="text-orange font-medium hover:underline"
            >
              Get started
            </button>
          </p>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
