type Page = 'home' | 'resume-analysis' | 'resume-optimize' | 'mock-interview' | 'question-bank' | 'offer-compare'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { key: Page; label: string; icon: string }[] = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'resume-analysis', label: '简历分析', icon: '📄' },
  { key: 'resume-optimize', label: '简历优化', icon: '✍️' },
  { key: 'mock-interview', label: '模拟面试', icon: '🎯' },
  { key: 'question-bank', label: '题库中心', icon: '📚' },
  { key: 'offer-compare', label: 'Offer对比', icon: '📊' },
]

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <span className="text-2xl">🎯</span>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                OfferMaster
              </span>
            </button>
          </div>

          {/* 导航链接 */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.key
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="flex items-center md:hidden">
            <select 
              value={currentPage}
              onChange={(e) => onNavigate(e.target.value as Page)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              {navItems.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.icon} {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}
