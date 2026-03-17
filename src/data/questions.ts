import type { Question, CategoryInfo, QuestionCategory } from '../types/question';

// 分类信息
export const categories: CategoryInfo[] = [
  {
    id: 'technical',
    name: '技术题',
    icon: '💻',
    description: '编程语言、算法、数据结构等技术问题',
    color: 'blue',
    questionCount: 0,
  },
  {
    id: 'non-technical',
    name: '非技术题',
    icon: '🎯',
    description: '岗位相关、专业知识问答',
    color: 'green',
    questionCount: 0,
  },
  {
    id: 'behavioral',
    name: '行为面',
    icon: '👥',
    description: '经历类、性格类、职业规划问题',
    color: 'purple',
    questionCount: 0,
  },
  {
    id: 'brain-teaser',
    name: '脑经急转弯',
    icon: '🧩',
    description: '逻辑推理、思维发散问题',
    color: 'orange',
    questionCount: 0,
  },
  {
    id: 'system-design',
    name: '系统设计',
    icon: '🏗️',
    description: '架构设计、分布式系统问题',
    color: 'red',
    questionCount: 0,
  },
];

// 题库数据
export const questions: Question[] = [
  // 技术题
  {
    id: 'tech-001',
    category: 'technical',
    difficulty: 'medium',
    title: '请解释什么是 TCP 三次握手？',
    content: '请详细解释 TCP 三次握手的过程，以及为什么需要三次握手而不是两次？',
    answer: '三次握手过程：\n\n1. 第一次握手（SYN）：客户端发送 SYN 包（SYN=1, seq=x）到服务器，进入 SYN_SENT 状态\n2. 第二次握手（SYN-ACK）：服务器收到 SYN 包后，发送 SYN+ACK 包（SYN=1, ACK=1, seq=y, ack=x+1），进入 SYN_RCVD 状态\n3. 第三次握手（ACK）：客户端收到服务器的 SYN+ACK 包后，发送 ACK 包（ACK=1, seq=x+1, ack=y+1），进入 ESTABLISHED 状态\n\n为什么需要三次：\n- 两次握手无法确认双方的接收和发送能力都正常\n- 第三次握手可以防止已失效的连接请求报文段突然又传送到服务器',
    analysis: 'TCP 三次握手是网络基础中的重点问题，考察对 TCP 协议原理的理解。三次握手的主要目的是同步双方的序列号，建立可靠的连接。',
    tags: ['TCP', '网络协议', '计算机网络'],
    views: 1250,
    createdAt: '2024-01-15',
  },
  {
    id: 'tech-002',
    category: 'technical',
    difficulty: 'medium',
    title: '什么是 Hash 冲突？如何解决？',
    content: '请解释 Hash 冲突是什么，以及常见的解决 Hash 冲突的方法有哪些？',
    answer: 'Hash 冲突是指不同的键经过 Hash 函数计算后得到相同的哈希值。\n\n常见解决方法：\n\n1. 开放地址法（Open Addressing）\n   - 线性探测：从冲突位置向后查找下一个空位\n   - 二次探测：使用二次函数确定探测序列\n   - 双重哈希：使用第二个哈希函数计算步长\n\n2. 链地址法（Separate Chaining）\n   - 在冲突位置使用链表存储所有冲突的元素\n   - JDK 1.8 后，当链表长度 > 8 时转为红黑树\n\n3. 再哈希法（Rehashing）\n   - 准备多个哈希函数，当冲突时使用下一个哈希函数\n\n4. 建立公共溢出区\n   - 将冲突的元素放入专门的溢出区域',
    analysis: 'Hash 冲突是哈希表实现中的核心问题。理解不同解决方法的优缺点对于设计高性能系统很重要。链地址法是最常用的方法，因为它对负载因子的容忍度更高。',
    tags: ['数据结构', 'Hash', '算法'],
    views: 980,
    createdAt: '2024-01-16',
  },
  {
    id: 'tech-003',
    category: 'technical',
    difficulty: 'hard',
    title: '什么是乐观锁和悲观锁？',
    content: '请解释乐观锁和悲观锁的概念，以及它们各自的适用场景？',
    answer: '悲观锁（Pessimistic Lock）：\n- 假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作\n- 实现：数据库的 SELECT FOR UPDATE、Mutex、Synchronized\n- 适用场景：并发写入多、冲突频繁的场景\n\n乐观锁（Optimistic Lock）：\n- 假设并发冲突很少发生，在提交时才检测冲突\n- 实现：版本号（Version）、时间戳、CAS 操作\n- 适用场景：读多写少、冲突较少的场景\n\nCAS（Compare And Swap）：\n- 三个参数：内存位置（V）、预期原值（A）、新值（B）\n- 只有当 V 的值等于 A 时，才将 V 的值更新为 B\n- ABA 问题可通过版本号解决',
    analysis: '这是面试中高频的并发编程问题，需要理解两种锁的原理、优缺点和适用场景。乐观锁适合读多写少的高并发场景，悲观锁适合数据一致性要求高的场景。',
    tags: ['并发编程', '锁', '数据库'],
    views: 1560,
    createdAt: '2024-01-17',
  },
  {
    id: 'tech-004',
    category: 'technical',
    difficulty: 'easy',
    title: 'ArrayList 和 LinkedList 的区别？',
    content: '请比较 ArrayList 和 LinkedList 的实现原理和性能特点？',
    answer: 'ArrayList：\n- 底层使用动态数组实现\n- 优点：随机访问快（O(1)）、内存连续、缓存友好\n- 缺点：插入删除需要移动元素（O(n)）、扩容需要复制数组\n\nLinkedList：\n- 底层使用双向链表实现\n- 优点：插入删除快（O(1)）、不需要扩容\n- 缺点：随机访问慢（O(n)）、占用更多内存（需要存储前后指针）\n\n选择建议：\n- 频繁随机访问 → ArrayList\n- 频繁插入删除 → LinkedList\n- 现代 JDK 中 ArrayList 性能通常更好（因为缓存和 JIT 优化）',
    analysis: '这是 Java 基础问题，考察对集合类的理解。需要不仅知道区别，还要理解底层实现原理。',
    tags: ['Java', '数据结构', '集合'],
    views: 2100,
    createdAt: '2024-01-18',
  },
  {
    id: 'tech-005',
    category: 'technical',
    difficulty: 'medium',
    title: 'Explain the differences between HTTP and HTTPS',
    content: 'Please explain the key differences between HTTP and HTTPS protocols, and why HTTPS is more secure?',
    answer: 'HTTP vs HTTPS 主要区别：\n\n1. 端口：HTTP 使用 80 端口，HTTPS 使用 443 端口\n2. 协议：HTTP 是明文传输，HTTPS 使用 TLS/SSL 加密\n3. 证书：HTTPS 需要 CA 证书\n4. 性能：HTTPS 因为加密解密有额外开销\n\nHTTPS 安全性：\n1. 身份验证：通过证书验证服务器身份，防止中间人攻击\n2. 数据加密：使用对称加密传输数据，防止窃听\n3. 数据完整性：使用 MAC（Message Authentication Code）验证数据完整性\n\nTLS 握手过程：\n1. 客户端发送支持的加密算法列表\n2. 服务器选择算法并发送证书\n3. 客户端验证证书，生成会话密钥\n4. 双方使用会话密钥加密通信',
    analysis: '这是考察网络协议和安全知识的常见问题，需要理解 HTTPS 的工作原理和安全性保障机制。',
    tags: ['HTTP', 'HTTPS', '网络安全', '英语'],
    views: 1890,
    createdAt: '2024-01-19',
  },

  // 非技术题
  {
    id: 'non-001',
    category: 'non-technical',
    difficulty: 'medium',
    title: '请介绍你最有代表性的项目？',
    content: '请详细介绍一个你最有代表性的项目，包括项目背景、技术架构、你在项目中的角色和贡献？',
    answer: 'STAR 法则回答：\n\nSituation（背景）：\n- 项目背景是什么？解决什么问题？\n- 业务规模：日活多少？数据量多大？\n\nTask（任务）：\n- 你的职责是什么？\n- 负责模块或功能？\n\nAction（行动）：\n- 具体做了哪些工作？\n- 遇到的最大挑战及解决方案？\n- 使用的技术栈？\n\nResult（结果）：\n- 项目最终效果如何？\n- 性能提升多少？\n- 业务指标改善？\n\n技巧：\n- 用具体数字量化结果\n- 突出个人贡献和成长\n- 体现解决问题的能力',
    analysis: '这是面试中最常见的问题之一，考察候选人的项目经验和表达能力。使用 STAR 法则可以让回答更有条理。注意用数据说话，突出个人贡献。',
    tags: ['项目经验', '自我介绍', 'STAR法则'],
    views: 3200,
    createdAt: '2024-01-20',
  },
  {
    id: 'non-002',
    category: 'non-technical',
    difficulty: 'easy',
    title: '你为什么选择我们公司？',
    content: '面试官问「你为什么选择我们公司」时，应该如何回答？',
    answer: '回答框架：\n\n1. 表达认可（价值观、产品）\n- 对公司文化的认可\n- 对公司产品/业务的欣赏\n- 公司的行业地位和发展前景\n\n2. 能力匹配（你能带来什么）\n- 你的技能与岗位要求匹配\n- 你能为公司创造什么价值\n- 过去的经验如何迁移\n\n3. 职业发展（双向匹配）\n- 公司的成长空间符合你的规划\n- 你希望在这里长期发展\n\n禁忌：\n- ❌ 只说「钱多」或「平台大」\n- ❌ 说「方便」或「离家近」\n- ❌ 说「海投」或「随便投投」',
    analysis: '这个问题考察候选人对公司的了解程度和求职动机。好的回答应该体现你对公司的兴趣是经过深思熟虑的，而不是盲目海投。',
    tags: ['求职动机', '面试技巧'],
    views: 2800,
    createdAt: '2024-01-21',
  },
  {
    id: 'non-003',
    category: 'non-technical',
    difficulty: 'medium',
    title: '你的职业规划是什么？',
    content: '当面试官问职业规划时，应该如何回答？需要注意什么？',
    answer: '职业规划回答建议：\n\n短期（1-2年）：\n- 扎实的专业基础\n- 独立完成项目能力\n- 深入了解业务\n\n中期（3-5年）：\n- 成为技术专家或技术管理\n- 带领团队完成项目\n- 扩大技术影响力\n\n长期（5年+）：\n- 行业专家或架构师\n- 对公司业务有深远影响\n\n注意事项：\n✅ 结合公司的发展方向\n✅ 体现你的上进心\n✅ 保持开放性和灵活性\n❌ 不要过于具体或功利\n❌ 不要说「赚大钱」「当领导」',
    analysis: '职业规划问题考察候选人的自我认知和长期稳定性。回答应该体现你的上进心和对行业的理解，同时要与公司的发展方向契合。',
    tags: ['职业规划', '面试技巧'],
    views: 2450,
    createdAt: '2024-01-22',
  },
  {
    id: 'non-004',
    category: 'non-technical',
    difficulty: 'medium',
    title: '你还有什么问题想问我？',
    content: '面试结尾的经典问题「你还有什么问题想问我？」，应该问什么？不应该问什么？',
    answer: '✅ 应该问的问题：\n\n1. 团队相关：\n- 团队规模和架构？\n- 技术栈和开发流程？\n- 团队的最大挑战是什么？\n\n2. 岗位相关：\n- 这个岗位的核心挑战是什么？\n- 成功胜任这个岗位需要具备哪些能力？\n- 团队对新人的培养机制？\n\n3. 发展相关：\n- 公司和团队的成长机会？\n- 绩效评估标准？\n\n❌ 不应该问的问题：\n- 薪资福利（HR 环节再问）\n- 能否远程办公\n- 几点下班、加班多不多\n- 什么时候能涨薪\n- 能不能快速晋升',
    analysis: '这是展示候选人对岗位兴趣和专业度的好机会。好的问题可以体现你对岗位的深入思考，也能帮助你了解更多信息做出选择。',
    tags: ['面试技巧', '提问'],
    views: 1980,
    createdAt: '2024-01-23',
  },

  // 行为面
  {
    id: 'behave-001',
    category: 'behavioral',
    difficulty: 'medium',
    title: '请介绍你最有成就感的经历？',
    content: '请分享一个你最有成就感的经历，并说明为什么让你有成就感？',
    answer: '回答结构（STAR + 感悟）：\n\n1. 背景（Situation）：\n- 当时是什么情况？\n- 面临什么挑战？\n\n2. 任务（Task）：\n- 你的目标是什么？\n- 你的角色是什么？\n\n3. 行动（Action）：\n- 你具体做了什么？\n- 克服了哪些困难？\n- 体现你什么能力？\n\n4. 结果（Result）：\n- 最终成果如何？\n- 数据化结果？\n\n5. 感悟（Learning）：\n- 学到了什么？\n- 对后续工作有什么帮助？\n\n技巧：\n- 选择有挑战性但成功了的经历\n- 体现你的能力和成长\n- 注意细节和逻辑表达',
    analysis: '行为面问题使用 STAR 法则回答可以确保结构清晰。重点不仅是做了什么，更要体现你的思考过程和个人成长。',
    tags: ['行为面', 'STAR法则', '软技能'],
    views: 1650,
    createdAt: '2024-01-24',
  },
  {
    id: 'behave-002',
    category: 'behavioral',
    difficulty: 'medium',
    title: '请分享一次失败/挫折的经历？',
    content: '面试官要求分享一次失败或挫折的经历，应该如何回答？有什么禁忌？',
    answer: '回答框架：\n\n1. 简述背景（不要过度铺垫）\n2. 说明失败原因（体现自我反思）\n3. 你做了什么（体现行动力）\n4. 学到了什么（体现成长）\n\n✅ 好的失败经历：\n- 项目延期\n- 技术方案选择失误\n- 沟通不充分导致的问题\n- 经验不足导致的错误\n\n❌ 不要选的：\n- 违法乱纪\n- 道德问题\n- 无法体现成长的\n\n❌ 回答禁忌：\n- 把失败归因于他人\n- 说自己没有失败过\n- 把失败说成成功（硬凹）\n- 祥林嫂式抱怨',
    analysis: '这个问题考察候选人的自我反思能力和成长型思维。好的回答应该体现你能从失败中学习，而不是回避或推卸责任。',
    tags: ['行为面', '失败', '自我反思'],
    views: 1420,
    createdAt: '2024-01-25',
  },
  {
    id: 'behave-003',
    category: 'behavioral',
    difficulty: 'medium',
    title: '请介绍你和同事产生冲突的经历？',
    content: '当被问到与同事冲突的经历时，应该如何回答？需要注意什么？',
    answer: '回答原则：\n\n1. 冲突类型选择：\n- 建议选择工作意见不合\n- 不要选与上级或客户冲突\n- 避免选择严重的人品冲突\n\n2. 回答结构：\n- 简述冲突背景\n- 说明你的立场和对方的立场\n- 描述你是如何处理的\n- 结果如何，学到了什么\n\n3. 关键技巧：\n- 体现同理心和沟通能力\n- 展示问题解决能力\n- 体现职业素养\n- 反思自己的不足\n\n✅ 好的冲突场景：\n- 技术方案分歧\n- 工作优先级理解不同\n- 进度协调问题\n\n❌ 避免：\n- 情绪化的冲突\n- 背后说人坏话\n- 推卸责任',
    analysis: '这个问题考察候选人的沟通能力和情商。回答时要注意体现你能够理性处理分歧，并且有同理心。',
    tags: ['行为面', '团队协作', '沟通'],
    views: 1280,
    createdAt: '2024-01-26',
  },
  {
    id: 'behave-004',
    category: 'behavioral',
    difficulty: 'easy',
    title: '你的优点和缺点是什么？',
    content: '面试问优点和缺点，应该如何回答？',
    answer: '回答技巧：\n\n优点：\n✅ 结合岗位要求说\n✅ 有具体例子支撑\n✅ 避免太泛（如「我努力」）\n\n示例：\n- 「我的学习能力比较强，曾在 2 周内自学并掌握了 Vue3」\n- 「我擅长把复杂问题简单化，做技术方案时能抓住核心」\n\n缺点：\n✅ 说不影响工作的缺点\n✅ 已经正在改进\n✅ 转化为优点的缺点\n\n示例：\n- 「有时候追求完美导致前期投入过多，后来学会了 MVP 方式先快速验证」\n- 「刚转岗时公共演讲紧张，现在主动参加技术分享」\n\n❌ 缺点禁忌：\n- 严重影响工作的\n- 无法改进的\n- 抖机灵的',
    analysis: '回答优点时要结合岗位需求，回答缺点时要体现自我认知和改进行动。避免过于坦诚或耍小聪明。',
    tags: ['行为面', '自我认知'],
    views: 2150,
    createdAt: '2024-01-27',
  },

  // 脑经急转弯
  {
    id: 'brain-001',
    category: 'brain-teaser',
    difficulty: 'medium',
    title: '井盖为什么是圆的？',
    content: '这是一道经典的面试问题，井盖为什么是圆的？',
    answer: '常见答案方向：\n\n1. 安全性（最主要）\n- 圆形的井盖不会掉下去\n- 井口是圆的，所以盖子也是圆的\n- 方形对角线大于边长，有掉下去的风险\n\n2. 成本考量\n- 圆形井盖容易搬运\n- 只需要滚动就可以移动\n- 制造工艺相对简单\n\n3. 力学性能\n- 圆形受力均匀\n- 不易损坏\n\n4. 其他角度：\n- 美观（视觉上更和谐）\n- 历史原因（最初设计就是圆的）\n\n加分回答思路：\n- 反问面试官考察的目的是什么\n- 展现你的思维过程\n- 结合自己岗位谈理解',
    analysis: '这类问题没有标准答案，考察的是候选人的思维方式和表达能力。重点是展示你思考问题的角度，而不仅仅是记住一个「标准答案」。',
    tags: ['脑经急转弯', '思维', '逻辑'],
    views: 980,
    createdAt: '2024-01-28',
  },
  {
    id: 'brain-002',
    category: 'brain-teaser',
    difficulty: 'hard',
    title: '100 层楼扔鸡蛋问题',
    content: '有一栋 100 层的楼房，给你 2 个鸡蛋，求确定鸡蛋不会被摔碎的最低楼层的最优策略是什么？',
    answer: '经典解法（贪心最优）：\n\n核心思路：\n- 第一个鸡蛋用来缩小范围\n- 第二个鸡蛋用来线性搜索\n\n最优间隔策略：\n设第一次从 x 层扔，如果碎了在 1~x-1 用第二个鸡蛋线性搜索\n设第二次从 x + (x-1) 层扔\n以此类推：x + (x-1) + (x-2) + ... + 1 ≥ 100\n\n解方程：x(x+1)/2 ≥ 100\n得 x = 14\n\n最优策略：\n- 第 1 次：14 层\n- 第 2 次：27 层（14+13）\n- 第 3 次：39 层（27+12）\n- ...\n- 第 14 次：105 层（超过 100）\n\n最多需要 14 次可以确定临界楼层。\n\n进阶问题：\n- 鸡蛋数量变化？\n- 楼层数量变化？',
    analysis: '这是经典的动态规划/贪心算法面试题，考察候选人的算法思维和优化能力。',
    tags: ['算法', '动态规划', '思维题'],
    views: 850,
    createdAt: '2024-01-29',
  },
  {
    id: 'brain-003',
    category: 'brain-teaser',
    difficulty: 'easy',
    title: '8 升和 5 升水桶如何量出 6 升水？',
    content: '有两个水桶：8 升和 5 升（没有刻度），如何量出 6 升水？',
    answer: '解题步骤：\n\n1. 装满 8 升桶 → 8L:8, 5L:0\n2. 从 8 升桶倒入 5 升桶 → 8L:3, 5L:5\n3. 倒掉 5 升桶 → 8L:3, 5L:0\n4. 从 8 升桶倒入 5 升桶 → 8L:0, 5L:3\n5. 装满 8 升桶 → 8L:8, 5L:3\n6. 从 8 升桶倒入 5 升桶（只能倒 2 升）→ 8L:6, 5L:5\n\n得到 6 升水！\n\n这类问题的通用解法：\n- BFS/DFS 搜索状态空间\n- 找到从初始状态到目标状态的路径\n- 关键点：理解每种操作的约束',
    analysis: '这是经典的倒水问题，考察候选人的逻辑推理能力。',
    tags: ['逻辑', '算法', '思维题'],
    views: 720,
    createdAt: '2024-01-30',
  },

  // 系统设计
  {
    id: 'system-001',
    category: 'system-design',
    difficulty: 'hard',
    title: '如何设计一个短链接系统？',
    content: '如果让你设计一个短链接服务（如 bit.ly），你会如何设计？需要考虑哪些方面？',
    answer: '系统设计要点：\n\n1. 功能需求\n- 长链接 → 短链接 转换\n- 短链接 → 长链接 重定向\n- 访问统计（点击量、时间等）\n\n2. URL 生成算法\n- 方案 1：自增 ID + Base62 编码\n- 方案 2：哈希（MD5）+ 碰撞处理\n- 方案 3：随机字符串 + 查重\n\n3. 存储设计\n- 数据库：使用 MySQL/PostgreSQL\n- 缓存：Redis 缓存热点数据\n- 表设计：id, original_url, short_code, clicks, created_at\n\n4. 高并发优化\n- 预生成短码\n- 布隆过滤器防重复\n- CDN 加速\n- 请求限流\n\n5. 注意事项\n- 长链接有效性验证\n- 过期机制\n- 安全性（防 XSS）',
    analysis: '系统设计题考察候选人的架构能力和综合思考。这个问题可以从浅入深，逐步展开讨论。',
    tags: ['系统设计', '架构', '高并发'],
    views: 1100,
    createdAt: '2024-01-31',
  },
  {
    id: 'system-002',
    category: 'system-design',
    difficulty: 'hard',
    title: '如何设计一个秒杀系统？',
    content: '如果让你设计一个秒杀系统，需要考虑哪些关键点？',
    answer: '秒杀系统设计要点：\n\n1. 架构设计原则\n- 流量分层：CDN → 限流 → 业务 → 底层\n- 读写分离：库存预扣减\n- 异步处理：消息队列\n\n2. 核心问题解决方案\n\nQ1: 高并发\n- 限流（令牌桶、漏桶）\n- 熔断降级\n- 异步队列\n\nQ2: 缓存击穿\n- 库存预加载到 Redis\n- 分布式锁\n- 互斥锁\n\nQ3: 超卖问题\n- 数据库乐观锁\n- Redis 原子操作\n- 预扣减库存\n\nQ3: 订单一致性\n- 消息队列保证最终一致性\n- 定时任务对账\n\n3. 技术选型\n- CDN：静态资源\n- Redis：库存缓存、限流\n- Kafka/RocketMQ：消息队列\n- MySQL：最终库存\n\n4. 关键流程\n- 抢购 → 验券 → 预减库存 → 写入队列 → 创建订单',
    analysis: '秒杀系统是高频面试题，涉及高并发、分布式锁、缓存等核心知识点。',
    tags: ['系统设计', '高并发', '秒杀'],
    views: 1350,
    createdAt: '2024-02-01',
  },
  {
    id: 'system-003',
    category: 'system-design',
    difficulty: 'medium',
    title: '如何设计一个消息推送系统？',
    content: '如果要设计一个消息推送系统（类似极光推送），需要考虑哪些方面？',
    answer: '消息推送系统设计：\n\n1. 核心功能\n- 设备注册/注销\n- 消息推送（单播/广播/组播）\n- 消息保存与离线推送\n- 推送统计\n\n2. 架构设计\n- 长连接管理（WebSocket/TCP）\n- 消息路由\n- 离线消息存储\n- 推送策略\n\n3. 关键技术点\n- 心跳保活\n- 消息可靠性（ACK 确认）\n- 离线消息存储\n- 消息去重\n- 推送到达率优化\n\n4. 设备管理\n- Device Token 管理\n- 用户与设备绑定\n- 多设备登录处理\n\n5. 推送策略\n- 立即推送/定时推送\n- 推送频率控制\n- 静默推送\n- 条件推送（标签、地区等）',
    analysis: '消息推送系统涉及长连接管理、消息可靠性等知识点，是后端开发的常见问题。',
    tags: ['系统设计', '消息推送', '长连接'],
    views: 920,
    createdAt: '2024-02-02',
  },
];

// 计算每个分类的题目数量
export const getCategoryQuestionCount = (categoryId: QuestionCategory): number => {
  return questions.filter(q => q.category === categoryId).length;
};

// 根据ID获取题目
export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};

// 根据分类获取题目
export const getQuestionsByCategory = (categoryId: QuestionCategory): Question[] => {
  return questions.filter(q => q.category === categoryId);
};

// 搜索题目
export const searchQuestions = (keyword: string): Question[] => {
  const lower = keyword.toLowerCase();
  return questions.filter(
    q => 
      q.title.toLowerCase().includes(lower) ||
      q.content.toLowerCase().includes(lower) ||
      q.tags.some(tag => tag.toLowerCase().includes(lower))
  );
};