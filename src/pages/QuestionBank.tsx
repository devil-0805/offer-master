import { useState, useEffect } from 'react';
import type { Question, QuestionCategory, Difficulty } from '../types/question';
import { 
  categories, 
  getQuestionsByCategory, 
  getQuestionById,
  searchQuestions,
  getCategoryQuestionCount 
} from '../data/questions';
import { 
  getFavorites, 
  toggleFavorite, 
  isFavorite as checkFavorite 
} from '../utils/favoritesStorage';

// 难度标签颜色
const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

// 分类颜色
const categoryColors: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
};

type ViewMode = 'categories' | 'list' | 'detail' | 'favorites';

export default function QuestionBank() {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // 加载收藏状态
  useEffect(() => {
    const favs = getFavorites();
    setFavorites(favs.questionIds);
  }, [selectedQuestion]);

  // 进入分类
  const handleCategoryClick = (categoryId: QuestionCategory) => {
    setSelectedCategory(categoryId);
    const categoryQuestions = getQuestionsByCategory(categoryId);
    setQuestions(categoryQuestions);
    setViewMode('list');
  };

  // 查看题目详情
  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setShowAnswer(false);
    setViewMode('detail');
  };

  // 返回列表
  const handleBack = () => {
    if (viewMode === 'detail') {
      setViewMode('list');
      setSelectedQuestion(null);
    } else if (viewMode === 'list') {
      setViewMode('categories');
      setSelectedCategory(null);
    } else if (viewMode === 'favorites') {
      setViewMode('categories');
    }
  };

  // 搜索
  const handleSearch = () => {
    if (searchKeyword.trim()) {
      const results = searchQuestions(searchKeyword.trim());
      setQuestions(results);
      setViewMode('list');
      setSelectedCategory(null);
    }
  };

  // 切换收藏
  const handleToggleFavorite = (questionId: string) => {
    toggleFavorite(questionId);
    setFavorites(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  // 查看收藏
  const handleShowFavorites = () => {
    const favs = getFavorites();
    const favQuestions = favs.questionIds
      .map(id => getQuestionById(id))
      .filter((q): q is Question => q !== undefined);
    setQuestions(favQuestions);
    setViewMode('favorites');
  };

  // 筛选后的题目
  const filteredQuestions = difficultyFilter === 'all' 
    ? questions 
    : questions.filter(q => q.difficulty === difficultyFilter);

  // 渲染分类视图
  if (viewMode === 'categories') {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              📚 题库中心
            </h1>
            <p className="text-lg text-slate-600">
              精选面试题库，助力你的求职之路
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="搜索题目、标签..."
                className="flex-1 px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700"
              >
                搜索
              </button>
            </div>
          </div>

          {/* Favorites Button */}
          <div className="max-w-6xl mx-auto mb-6">
            <button
              onClick={handleShowFavorites}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 border border-amber-200"
            >
              <span>⭐</span>
              <span>我的收藏</span>
              <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                {getFavorites().questionIds.length}
              </span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColors[category.color]} flex items-center justify-center text-2xl mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    {getCategoryQuestionCount(category.id)} 道题目
                  </span>
                  <span className="text-primary-600 text-sm font-medium">
                    进入 →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 渲染题目列表视图
  if (viewMode === 'list' || viewMode === 'favorites') {
    const title = viewMode === 'favorites' 
      ? '⭐ 我的收藏' 
      : `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}`;

    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-slate-200 rounded-lg transition"
              >
                ←
              </button>
              <h1 className="text-2xl font-bold text-slate-900">
                {title}
              </h1>
              <span className="text-slate-500">
                ({filteredQuestions.length} 道题目)
              </span>
            </div>

            {/* Filters */}
            {viewMode !== 'favorites' && (
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'all')}
                className="px-4 py-2 border border-slate-300 rounded-lg"
              >
                <option value="all">全部难度</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            )}
          </div>

          {/* Search in list */}
          {viewMode === 'list' && selectedCategory && (
            <div className="mb-6">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="在当前分类中搜索..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                暂无题目
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary-300 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {question.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {question.content}
                      </p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[question.difficulty]}`}>
                          {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
                        </span>
                        {question.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(question.id);
                      }}
                      className="text-2xl hover:scale-110 transition"
                    >
                      {favorites.includes(question.id) ? '⭐' : '☆'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // 渲染题目详情视图
  if (viewMode === 'detail' && selectedQuestion) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-200 rounded-lg transition"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-slate-900 flex-1">
              题目详情
            </h1>
            <button
              onClick={() => handleToggleFavorite(selectedQuestion.id)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 border border-amber-200"
            >
              <span className="text-xl">{favorites.includes(selectedQuestion.id) ? '⭐' : '☆'}</span>
              <span>{favorites.includes(selectedQuestion.id) ? '已收藏' : '收藏'}</span>
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Question Section */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[selectedQuestion.difficulty]}`}>
                  {selectedQuestion.difficulty === 'easy' ? '简单' : selectedQuestion.difficulty === 'medium' ? '中等' : '困难'}
                </span>
                <span className="text-slate-400 text-sm">
                  {selectedQuestion.views} 次浏览
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {selectedQuestion.title}
              </h2>
              <p className="text-slate-600 whitespace-pre-wrap">
                {selectedQuestion.content}
              </p>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {selectedQuestion.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Answer Section */}
            <div className="p-6 border-b border-slate-200">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  💡 查看答案
                </h3>
                <span className={`transform transition-transform ${showAnswer ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {showAnswer && (
                <div className="mt-4 animate-fadeIn">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-medium text-blue-900 mb-2">参考答案</h4>
                    <pre className="whitespace-pre-wrap text-blue-800 text-sm font-medium">
                      {selectedQuestion.answer}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                📖 答题提示
              </h3>
              <div className="bg-amber-50 p-4 rounded-xl">
                <pre className="whitespace-pre-wrap text-amber-800 text-sm">
                  {selectedQuestion.analysis}
                </pre>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                const idx = filteredQuestions.findIndex(q => q.id === selectedQuestion.id);
                if (idx > 0) {
                  setSelectedQuestion(filteredQuestions[idx - 1]);
                  setShowAnswer(false);
                }
              }}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              disabled={filteredQuestions.findIndex(q => q.id === selectedQuestion.id) <= 0}
            >
              上一题
            </button>
            <button
              onClick={() => {
                const idx = filteredQuestions.findIndex(q => q.id === selectedQuestion.id);
                if (idx < filteredQuestions.length - 1) {
                  setSelectedQuestion(filteredQuestions[idx + 1]);
                  setShowAnswer(false);
                }
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              disabled={filteredQuestions.findIndex(q => q.id === selectedQuestion.id) >= filteredQuestions.length - 1}
            >
              下一题
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}