const en = {
  __COMMAND_ANALYZE_ANALYZE_LABEL: 'Analyze',
  __COMMAND_ANALYZE_ANALYZE_TEXT: 'Analyze',
  __COMMAND_ANALYZE_ANALYZE_PROMPT: 'Please analyze the following statements.',
  __COMMAND_ANALYZE_LITERARILY_LABEL: 'Literarily',
  __COMMAND_ANALYZE_LITERARILY_TEXT: 'Analyze literarily',
  __COMMAND_ANALYZE_LITERARILY_PROMPT:
    'Please analyze the following statements literarily.',
  __COMMAND_ANALYZE_MATHEMATICALLY_LABEL: 'Mathematically',
  __COMMAND_ANALYZE_MATHEMATICALLY_TEXT: 'Analyze mathematically',
  __COMMAND_ANALYZE_MATHEMATICALLY_PROMPT:
    'Please analyze the following statements mathematically.',
  __COMMAND_ANALYZE_NUMEROLOGICALLY_LABEL: 'Numerologically',
  __COMMAND_ANALYZE_NUMEROLOGICALLY_TEXT: 'Analyze numerologically',
  __COMMAND_ANALYZE_NUMEROLOGICALLY_PROMPT:
    'Please analyze the following statements numerologically.',
  __COMMAND_ANALYZE_PHILOSOPHICALLY_LABEL: 'Philosophically',
  __COMMAND_ANALYZE_PHILOSOPHICALLY_TEXT: 'Analyze philosophically',
  __COMMAND_ANALYZE_PHILOSOPHICALLY_PROMPT:
    'Please analyze the following statements philosophically.',
  __COMMAND_ANALYZE_PSYCHOLOGICALLY_LABEL: 'Psychologically',
  __COMMAND_ANALYZE_PSYCHOLOGICALLY_TEXT: 'Analyze psychologically',
  __COMMAND_ANALYZE_PSYCHOLOGICALLY_PROMPT:
    'Please analyze the following statements psychologically.',
  __COMMAND_BOT_ACTIVATE_LABEL: 'Activate',
  __COMMAND_BOT_ACTIVATE_TEXT: 'Activate',
  __COMMAND_BOT_ACTIVATE_ALIASES: [],
  __COMMAND_BOT_ACTIVATE_REPLY: 'Activated',
  __COMMAND_BOT_CONTINUE_LABEL: 'Continue',
  __COMMAND_BOT_CONTINUE_TEXT: 'Continue',
  __COMMAND_BOT_CONTINUE_ALIASES: [],
  __COMMAND_BOT_DEACTIVATE_LABEL: 'Deactivate',
  __COMMAND_BOT_DEACTIVATE_TEXT: 'Deactivate',
  __COMMAND_BOT_DEACTIVATE_ALIASES: [],
  __COMMAND_BOT_DEACTIVATE_REPLY: 'Deactivated',
  __COMMAND_BOT_DRAW_LABEL: 'Draw',
  __COMMAND_BOT_DRAW_TEXT: 'Draw',
  __COMMAND_BOT_DRAW_ALIASES: [],
  __COMMAND_BOT_DRAW_DEMO_LABEL: 'Draw',
  __COMMAND_BOT_DRAW_DEMO_TEXT: 'Draw a cat',
  __COMMAND_BOT_FORGET_LABEL: 'Forget',
  __COMMAND_BOT_FORGET_TEXT: 'Forget',
  __COMMAND_BOT_FORGET_ALIASES: [],
  __COMMAND_BOT_FORGET_REPLY: 'Forgot',
  __COMMAND_BOT_RETRY_LABEL: 'Retry',
  __COMMAND_BOT_RETRY_TEXT: 'Retry',
  __COMMAND_BOT_RETRY_ALIASES: [],
  __COMMAND_BOT_SEARCH_LABEL: 'Search',
  __COMMAND_BOT_SEARCH_TEXT: 'Search',
  __COMMAND_BOT_SEARCH_ALIASES: [],
  __COMMAND_BOT_SEARCH_DEMO_LABEL: 'Search',
  __COMMAND_BOT_SEARCH_DEMO_TEXT: 'Search date',
  __COMMAND_BOT_SUMMON_DEMO_LABEL: 'Summon',
  __COMMAND_BOT_SUMMON_DEMO_TEXT: "What's up?",
  __COMMAND_BOT_TALK_LABEL: 'Talk',
  __COMMAND_BOT_TALK_TEXT: 'Talk',
  __COMMAND_BOT_TALK_ALIASES: [],
  __COMMAND_BOT_TALK_DEMO_LABEL: 'Talk',
  __COMMAND_BOT_TALK_DEMO_TEXT: 'Talk me about yourself',
  __COMMAND_SUM_ADVISE_LABEL: 'Advise',
  __COMMAND_SUM_ADVISE_TEXT: 'Advise',
  __COMMAND_SUM_ADVISE_PROMPT:
    'Please summarize the following content briefly and advise appropriately.',
  __COMMAND_SUM_APOLOGIZE_LABEL: 'Apologize',
  __COMMAND_SUM_APOLOGIZE_TEXT: 'Apologize',
  __COMMAND_SUM_APOLOGIZE_PROMPT:
    'Please summarize the following content briefly and apologize sincerely.',
  __COMMAND_SUM_BLAME_LABEL: 'Blame',
  __COMMAND_SUM_BLAME_TEXT: 'Blame',
  __COMMAND_SUM_BLAME_PROMPT:
    'Please summarize the following content briefly and blame strongly.',
  __COMMAND_SUM_COMFORT_LABEL: 'Comfort',
  __COMMAND_SUM_COMFORT_TEXT: 'Comfort',
  __COMMAND_SUM_COMFORT_PROMPT:
    'Please summarize the following content briefly and comfort warmly.',
  __COMMAND_SUM_COMPLAIN_LABEL: 'Complain',
  __COMMAND_SUM_COMPLAIN_TEXT: 'Complain',
  __COMMAND_SUM_COMPLAIN_PROMPT:
    'Please summarize the following content briefly and complain gently.',
  __COMMAND_SUM_ENCOURAGE_LABEL: 'Encourage',
  __COMMAND_SUM_ENCOURAGE_TEXT: 'Encourage',
  __COMMAND_SUM_ENCOURAGE_PROMPT:
    'Please summarize the following content briefly and encourage enthusiastically.',
  __COMMAND_SUM_LAUGH_LABEL: 'Laugh',
  __COMMAND_SUM_LAUGH_TEXT: 'Laugh',
  __COMMAND_SUM_LAUGH_PROMPT:
    'Please summarize the following content briefly and laugh rudely.',
  __COMMAND_SUM_SUM_LABEL: 'Sum',
  __COMMAND_SUM_SUM_TEXT: 'Sum',
  __COMMAND_SUM_SUM_PROMPT:
    'Please summarize the following content and provide some details.',
  __COMMAND_SYS_COMMAND_LABEL: 'Command',
  __COMMAND_SYS_COMMAND_TEXT: 'Command',
  __COMMAND_SYS_DOC_LABEL: 'Documentation',
  __COMMAND_SYS_DOC_TEXT: 'Documentation',
  __COMMAND_SYS_DEPLOY_LABEL: 'Restart',
  __COMMAND_SYS_DEPLOY_TEXT: 'Restart',
  __COMMAND_SYS_DEPLOY_REPLY: 'Restarting',
  __COMMAND_SYS_REPORT_LABEL: 'Report',
  __COMMAND_SYS_REPORT_TEXT: 'Report',
  __COMMAND_SYS_REPORT_REPLY: 'Please leave your issue. Thank you.',
  __COMMAND_SYS_REPORT_FINISH_LABEL: 'ReportFinish',
  __COMMAND_SYS_REPORT_FINISH_TEXT: 'Report Finish',
  __COMMAND_SYS_REPORT_FINISH_REPLY: 'Your report has been sent. Thank you.',
  __COMMAND_SYS_VERSION_LABEL: 'Version',
  __COMMAND_SYS_VERSION_TEXT: 'Version',
  __COMMAND_SYS_VERSION_REPLY: (version: string, isLatest: string) =>
    `Your version is ${isLatest ? 'up-to-date' : version}.`,
  __COMMAND_TRANSLATE_TO_EN_LABEL: '翻成英文', // TODO
  __COMMAND_TRANSLATE_TO_EN_TEXT: '翻成英文', // TODO
  __COMMAND_TRANSLATE_TO_EN_PROMPT: '請將以下內容翻譯成英文。', // TODO
  __COMMAND_TRANSLATE_TO_JA_LABEL: '翻成日文', // TODO
  __COMMAND_TRANSLATE_TO_JA_TEXT: '翻成日文', // TODO
  __COMMAND_TRANSLATE_TO_JA_PROMPT: '請將以下內容翻譯成日文。', // TODO
  __COMPLETION_DEFAULT_SYSTEM_PROMPT: '', // TODO
  __COMPLETION_DEFAULT_HUMAN_PROMPT: (name: string) =>
    name ? `I am ${name}` : 'Hello',
  __COMPLETION_DEFAULT_AI_PROMPT: (name: string) =>
    name ? `I am ${name}` : 'Hello',
  __COMPLETION_DEFAULT_AI_TONE: (tone: string) =>
    tone ? `以${tone}的語氣回應我：` : '', // TODO
  __COMPLETION_SEARCH: (a: string, q: string) =>
    `根據「${a}」查詢結果，回答「${q}」問題`, // TODO
  __COMPLETION_SEARCH_NOT_FOUND: '查無資料', // TODO
  __COMPLETION_QUOTATION_MARK_OPENING: '"',
  __COMPLETION_QUOTATION_MARK_CLOSING: '"',
  __ERROR_ECONNABORTED: 'Timed out',
  __ERROR_SYSTEM_UNSTABLE:
    'System unstable, please try again later, or reply "Report" to report any issues',
  __ERROR_MAX_GROUPS_REACHED: 'Maximum groups reached',
  __ERROR_MAX_USERS_REACHED: 'Maximum users reached',
  __ERROR_MISSING_ENV: (v: string) => `Missing environment variable: ${v}`,
  __MESSAGE_NEW_VERSION_AVAILABLE: (version: string) =>
    `A new version ${version} is now available!`,
  __MESSAGE_GREETING_WORDS:
    'Greetings! From now on you can use this bot for 10 questions every day!',
  __MESSAGE_QUOTA_EXCEEDED:
    'You have exceeded the quota for today, please try again tomorrow.',
  __SOURCE_NAME_SOME_GROUP: 'Someone Group',
  __SOURCE_NAME_SOMEONE: 'Someone',
};

export default en;
