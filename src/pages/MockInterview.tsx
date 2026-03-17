import { useState } from 'react'

interface Message {
  id: number
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

const jobPositions = [
  { id: 'backend', name: '后端开发工程师', icon: '💻' },
  { id: 'frontend', name: '前端开发工程师', icon: '🎨' },
  { id: 'product', name: '产品经理', icon: '📱' },
  { id: 'operation', name: '运营专员', icon: '📈' },
  { id: 'data', name: '数据分析师', icon: '📊' },
]

const sampleQuestions: Record<string, string[]> = {
  backend: [
    '请介绍一下你最有代表性的项目？',
    '如何保证数据库与缓存的数据一致性？',
    '讲讲你对微服务架构的理解？',
    '如何处理高并发请求？',
    '介绍一下你熟悉的设计模式？',
  ],
  frontend: [
    'React 的虚拟 DOM 是什么？',
    '如何优化页面加载性能？',
    'CSS 盒模型是什么？',
    '讲讲你对 TypeScript 的理解？',
    '如何处理浏览器兼容性问题？',
  ],
  product: [
    '你如何进行需求分析？',
    '介绍一下你的产品设计流程？',
    '如何衡量一个功能的成功？',
    '怎样处理用户反馈？',
    '竞品分析怎么做？',
  ],
  operation: [
    '如何提升用户活跃度？',
    '介绍一下你的活动策划经验？',
    '数据运营的核心指标有哪些？',
    '如何进行用户增长？',
    '内容运营的核心策略是什么？',
  ],
  data: [
    '如何进行数据清洗？',
    '介绍一下你常用的数据分析工具？',
    '如何验证 A/B 测试的结果？',
    '讲讲你对 SQL 的掌握程度？',
    '如何从数据中发现业务问题？',
  ],
}

export default function MockInterview() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const startInterview = (jobId: string) => {
    setSelectedJob(jobId)
    setInterviewStarted(true)
    setMessages([
      {
        id: 1,
        role: 'ai',
        content: `你好！我是你的 AI 面试官 😊\n\n很高兴和你进行模拟面试。你选择的是「${jobPositions.find(j => j.id === jobId)?.name}」岗位。\n\n让我们开始吧！请先简单介绍一下自己。`,
        timestamp: new Date(),
      }
    ])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // 模拟 AI 回复
    await new Promise(resolve => setTimeout(resolve, 1500))

    const questions = selectedJob ? sampleQuestions[selectedJob] : []
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]

    const aiResponse: Message = {
      id: Date.now() + 1,
      role: 'ai',
      content: `感谢你的回答！\n\n${randomQuestion}\n\n（提示：这是模拟面试，请认真思考后作答）`,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const resetInterview = () => {
    setSelectedJob(null)
    setInterviewStarted(false)
    setMessages([])
  }

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              🎯 模拟面试
            </h1>
            <p className="text-lg text-slate-600">
              选择目标岗位，AI 面试官陪你练习面试
            </p>
          </div>

          {/* Job Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPositions.map((job) => (
              <button
                key={job.id}
                onClick={() => startInterview(job.id)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-green-400 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{job.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-green-700">
                  {job.name}
                </h3>
                <p className="text-slate-500 mt-2 text-sm">
                  开始模拟面试 →
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              🎯 {jobPositions.find(j => j.id === selectedJob)?.name} - 模拟面试
            </h1>
            <p className="text-slate-500">AI 面试官正在等你</p>
          </div>
          <button
            onClick={resetInterview}
            className="px-4 py-2 text-slate-600 hover:text-slate-900"
          >
            结束面试 ↺
          </button>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-900 rounded-bl-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-2 ${
                    msg.role === 'user' ? 'text-primary-200' : 'text-slate-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入你的回答..."
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
