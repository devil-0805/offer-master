type Page = 'home' | 'resume-analysis' | 'resume-optimize' | 'mock-interview' | 'question-bank' | 'offer-compare'

interface HomeProps {
  onNavigate: (page: Page) => void
}

const features = [
  {
    icon: '📄',
    title: '简历分析',
    desc: 'AI 智能诊断简历问题，提升竞争力',
    page: 'resume-analysis' as Page,
    color: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    icon: '✍️',
    title: '简历优化',
    desc: 'AI 润色简历内容，突出个人亮点',
    page: 'resume-optimize' as Page,
    color: 'bg-purple-50 hover:bg-purple-100',
  },
  {
    icon: '🎯',
    title: '模拟面试',
    desc: 'AI 面试官模拟真实面试场景',
    page: 'mock-interview' as Page,
    color: 'bg-green-50 hover:bg-green-100',
  },
  {
    icon: '📚',
    title: '题库中心',
    desc: '海量面试题库，随时随地练习',
    page: 'question-bank' as Page,
    color: 'bg-orange-50 hover:bg-orange-100',
  },
  {
    icon: '📊',
    title: 'Offer对比',
    desc: '多维度对比分析，做出最优选择',
    page: 'offer-compare' as Page,
    color: 'bg-pink-50 hover:bg-pink-100',
  },
]

const stats = [
  { value: '50,000+', label: '服务用户' },
  { value: '95%', label: '面试通过率' },
  { value: '10,000+', label: '真实题库' },
  { value: '24/7', label: 'AI 随时待命' },
]

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              让你的<span className="text-yellow-300">求职之路</span>更简单
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-3xl mx-auto">
              AI 驱动的全链路求职助手，从简历诊断到模拟面试，全方位助力你的求职之旅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('resume-analysis')}
                className="px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                立即开始 🚀
              </button>
              <button
                onClick={() => onNavigate('question-bank')}
                className="px-8 py-4 bg-primary-500/30 text-white rounded-xl font-semibold text-lg hover:bg-primary-500/40 transition-all duration-200 border border-primary-400"
              >
                浏览题库 📚
              </button>
            </div>
          </div>
        </div>

        {/* 波浪分隔符 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              全链路求职服务
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              从简历到 Offer，我们陪伴你的每一步
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <button
                key={i}
                onClick={() => onNavigate(feature.page)}
                className={`${feature.color} p-8 rounded-2xl text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-700">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            准备好迎接你的理想 Offer 了吗？
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            数千名用户已通过 OfferMaster 获得心仪的工作，现在就加入他们吧！
          </p>
          <button
            onClick={() => onNavigate('resume-analysis')}
            className="px-10 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            免费开始使用 ✨
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-white font-bold">OfferMaster</span>
            </div>
            <div className="text-sm">
              © 2026 OfferMaster. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
