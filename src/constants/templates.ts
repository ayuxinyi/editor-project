export const templates = [
  {
    id: 'blank',
    label: 'Blank Document',
    imageUrl: '/blank-document.svg',
    initialContent: ''
  },
  {
    id: 'software-proposal',
    label: 'Software Proposal',
    imageUrl: '/software-proposal.svg',
    initialContent: `
      <h1>软件开发提案</h1>
      <p><strong>提案日期：</strong> [日期]</p>
      <p><strong>开发团队：</strong> [团队/公司名称]</p>
      <p><strong>项目名称：</strong> [软件项目名称]</p>
      <p><strong>客户：</strong> [客户名称]</p>
      
      <h2>项目概述</h2>
      <p>简要描述拟开发软件的功能、目标用户和预期解决的问题。</p>
      
      <h2>技术需求</h2>
      <h3>功能需求</h3>
      <ul>
        <li>核心功能1：[详细描述]</li>
        <li>核心功能2：[详细描述]</li>
        <li>核心功能3：[详细描述]</li>
      </ul>
      
      <h3>技术规格</h3>
      <ul>
        <li><strong>开发平台：</strong> [Web/移动端/桌面应用]</li>
        <li><strong>编程语言：</strong> [使用的编程语言]</li>
        <li><strong>数据库：</strong> [数据库类型]</li>
        <li><strong>框架：</strong> [使用的开发框架]</li>
      </ul>
      
      <h2>开发阶段</h2>
      <p><strong>第一阶段：需求分析与设计</strong> ([X周])</p>
      <ul>
        <li>需求收集和分析</li>
        <li>系统架构设计</li>
        <li>UI/UX设计</li>
      </ul>
      
      <p><strong>第二阶段：核心开发</strong> ([X周])</p>
      <ul>
        <li>后端API开发</li>
        <li>前端界面开发</li>
        <li>数据库设计与实现</li>
      </ul>
      
      <p><strong>第三阶段：测试与部署</strong> ([X周])</p>
      <ul>
        <li>功能测试</li>
        <li>性能优化</li>
        <li>部署上线</li>
      </ul>
      
      <h2>交付物</h2>
      <ul>
        <li>完整的软件应用程序</li>
        <li>源代码和技术文档</li>
        <li>用户操作手册</li>
        <li>部署和维护指南</li>
      </ul>
      
      <h2>项目时间表</h2>
      <p><strong>项目开始时间：</strong> [开始日期]</p>
      <p><strong>预计完成时间：</strong> [完成日期]</p>
      <p><strong>总开发周期：</strong> [X周/X个月]</p>
      
      <h2>费用估算</h2>
      <p><strong>开发费用：</strong> [金额]</p>
      <p><strong>付款方式：</strong></p>
      <ul>
        <li>首付款：[百分比]% - 项目启动时</li>
        <li>中期付款：[百分比]% - 核心功能完成时</li>
        <li>尾款：[百分比]% - 项目交付时</li>
      </ul>
      
      <h2>后期维护</h2>
      <p>提供 [X个月] 免费技术支持和bug修复服务。</p>
      <p>后续维护和功能升级费用另议。</p>
      
      <h2>团队介绍</h2>
      <p>简要介绍开发团队的技术背景和相关项目经验。</p>
    `
  },
  {
    id: 'project-proposal',
    label: 'Project Proposal',
    imageUrl: '/project-proposal.svg',
    initialContent: `
      <h1>项目提案</h1>
      <p><strong>提案日期：</strong> [日期]</p>
      <p><strong>提案人：</strong> [姓名]</p>
      <p><strong>项目名称：</strong> [项目名称]</p>
      
      <h2>项目概述</h2>
      <p>简要描述项目的背景、目标和预期成果。</p>
      
      <h2>项目目标</h2>
      <ul>
        <li>主要目标1</li>
        <li>主要目标2</li>
        <li>主要目标3</li>
      </ul>
      
      <h2>工作范围</h2>
      <p>详细说明项目的具体工作内容和交付物。</p>
      
      <h2>时间安排</h2>
      <p><strong>项目开始时间：</strong> [开始日期]</p>
      <p><strong>项目结束时间：</strong> [结束日期]</p>
      
      <h2>预算估算</h2>
      <p>项目总预算：[金额]</p>
      <p>预算明细和付款条款。</p>
      
      <h2>风险评估</h2>
      <p>识别潜在风险和应对措施。</p>
    `
  },
  {
    id: 'business-letter',
    label: 'Business Letter',
    imageUrl: '/business-letter.svg',
    initialContent: `
      <p>[您的姓名]<br>
      [您的职位]<br>
      [公司名称]<br>
      [公司地址]<br>
      [电话号码]<br>
      [邮箱地址]</p>
      
      <p>[日期]</p>
      
      <p>[收件人姓名]<br>
      [收件人职位]<br>
      [收件人公司]<br>
      [收件人地址]</p>
      
      <p><strong>主题：</strong> [信件主题]</p>
      
      <p>尊敬的 [收件人姓名]：</p>
      
      <p>我写信是为了 [说明写信目的]。</p>
      
      <p>[正文内容 - 详细说明您要传达的信息]</p>
      
      <p>如果您需要更多信息或有任何疑问，请随时与我联系。</p>
      
      <p>谢谢您的时间和考虑。</p>
      
      <p>此致<br>
      敬礼</p>
      
      <p>[您的签名]<br>
      [您的姓名]</p>
    `
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/resume.svg',
    initialContent: `
      <h1 style="text-align: center;">[您的姓名]</h1>
      <p style="text-align: center;">[电话号码] | [邮箱地址] | [LinkedIn] | [地址]</p>
      
      <h2>个人简介</h2>
      <p>[简要描述您的专业背景、核心技能和职业目标]</p>
      
      <h2>工作经验</h2>
      <p><strong>[职位名称]</strong> - [公司名称] | [工作时间]</p>
      <ul>
        <li>主要职责和成就1</li>
        <li>主要职责和成就2</li>
        <li>主要职责和成就3</li>
      </ul>
      
      <p><strong>[职位名称]</strong> - [公司名称] | [工作时间]</p>
      <ul>
        <li>主要职责和成就1</li>
        <li>主要职责和成就2</li>
      </ul>
      
      <h2>教育背景</h2>
      <p><strong>[学位]</strong> - [学校名称] | [毕业时间]</p>
      <p>专业：[专业名称]</p>
      
      <h2>技能</h2>
      <ul>
        <li>技术技能：[列出相关技术技能]</li>
        <li>语言能力：[列出语言水平]</li>
        <li>其他技能：[列出其他相关技能]</li>
      </ul>
      
      <h2>项目经验</h2>
      <p><strong>[项目名称]</strong> | [项目时间]</p>
      <p>项目描述和您的贡献</p>
    `
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    imageUrl: '/cover-letter.svg',
    initialContent: `
      <p>[您的姓名]<br>
      [您的地址]<br>
      [电话号码]<br>
      [邮箱地址]</p>
      
      <p>[日期]</p>
      
      <p>[招聘经理姓名]<br>
      [公司名称]<br>
      [公司地址]</p>
      
      <p>尊敬的招聘经理：</p>
      
      <p>我写信申请贵公司的 [职位名称] 职位。我对这个机会非常感兴趣，相信我的技能和经验能够为贵公司带来价值。</p>
      
      <p>在我 [X年] 的 [相关领域] 工作经验中，我积累了丰富的 [具体技能/经验]。我特别擅长 [核心技能1]、[核心技能2] 和 [核心技能3]。</p>
      
      <p>我对贵公司的 [公司特点/项目/价值观] 印象深刻，这与我的职业目标和价值观高度契合。我相信我能够为团队带来 [具体贡献]。</p>
      
      <p>感谢您考虑我的申请。我期待有机会进一步讨论我如何为贵公司做出贡献。</p>
      
      <p>此致<br>
      敬礼</p>
      
      <p>[您的签名]<br>
      [您的姓名]</p>
    `
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/letter.svg',
    initialContent: `
      <p>[您的姓名]<br>
      [您的地址]<br>
      [电话号码]<br>
      [邮箱地址]</p>
      
      <p>[日期]</p>
      
      <p>[收件人姓名]<br>
      [收件人地址]</p>
      
      <p>亲爱的 [收件人姓名]：</p>
      
      <p>我希望这封信能够找到您身体健康，一切顺利。</p>
      
      <p>[信件正文 - 表达您想要传达的内容]</p>
      
      <p>期待您的回复。</p>
      
      <p>祝好，</p>
      
      <p>[您的签名]<br>
      [您的姓名]</p>
    `
  }
];
