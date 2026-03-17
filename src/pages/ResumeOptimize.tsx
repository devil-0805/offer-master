import { useState } from 'react'

export default function ResumeOptimize() {
  const [resumeText, setResumeText] = useState('')
  const [optimizing, setOptimizing] = useState(false)
  const [optimizedText, setOptimizedText] = useState('')
  const [targetPosition, setTargetPosition] = useState('')

  const handleOptimize = async () => {
    if (!resumeText.trim()) return

    setOptimizing(true)
    
    // 模拟 AI 优化过程
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 模拟优化结果
    const mockOptimized = `【优化后简历】

## 个人简介
富有竞争力的后端开发工程师，5年+Java开发经验，熟悉微服务架构。在电商、金融领域有丰富经验，擅长高并发系统设计与优化。

## 专业技能
- 精通 Java，熟悉 Spring Boot、Spring Cloud 生态
- 熟练使用 MySQL、Redis、Kafka 等中间件
- 具备高并发、低延迟系统设计能力
- 熟悉 Docker、K8s 容器化部署

## 项目经验

### 电商平台交易系统 (2022.06 - 至今)
- 负责交易核心模块重构，将订单处理能力提升至 10w+/s
- 设计并实现分布式事务方案，保证数据一致性
- 优化数据库查询，性能提升 60%
- 技术栈：Java、Spring Boot、Redis、Kafka、MySQL

### 金融支付网关 (2020.03 - 2022.05)
- 主导支付通道接入，支持 10+ 支付渠道
- 设计防重复支付机制，零安全事故
- 团队技术分享，推动代码规范落地
- 技术栈：Java、Spring、Dubbo、MySQL、Oracle`

    setOptimizedText(mockOptimized)
    setOptimizing(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            ✍️ 简历 AI 优化
          </h1>
          <p className="text-lg text-slate-600">
            输入简历内容，AI 将帮你润色优化，突出个人亮点
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">原始简历</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                目标岗位 (可选)
              </label>
              <input
                type="text"
                value={targetPosition}
                onChange={(e) => setTargetPosition(e.target.value)}
                placeholder="例如：后端开发工程师"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                简历内容
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="粘贴你的简历内容..."
                rows={15}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={!resumeText.trim() || optimizing}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                resumeText.trim() && !optimizing
                  ? 'bg-gradient-to-r from-purple-600 to-accent-500 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {optimizing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  AI 优化中...
                </span>
              ) : (
                '开始优化 ✨'
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">优化结果</h3>
            
            {optimizedText ? (
              <div className="relative">
                <pre className="bg-slate-50 p-4 rounded-lg overflow-auto max-h-[500px] text-sm whitespace-pre-wrap font-sans">
                  {optimizedText}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(optimizedText)}
                  className="absolute top-2 right-2 px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
                >
                  📋 复制
                </button>
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <p>优化后的简历将显示在这里</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
