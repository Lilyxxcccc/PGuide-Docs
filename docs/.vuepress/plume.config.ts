import {defineThemeConfig} from 'vuepress-theme-plume'
import {navbar} from './navbar'
import notes from './notes'

// 首页异步检查各服务在线状态
async function checkStatus() {
    try {
        const response = await fetch('https://status.cqmu.online/api/badge/14/status');
        if (response.ok) {
            const svgText = await response.text();
            if (svgText.includes('Status: Up')) {
                return '所有服务均在线';
            }
        }
        return '部分服务离线';
    } catch (error) {
        console.error('Error fetching status:', error);
        return '服务离线';
    }
}

// 返回信息

async function getFooterMessage() {
    const statusMessage = await checkStatus();
    return `${statusMessage} <a href="https://status.cqmu.online/" target="_blank"><img src="https://status.cqmu.online/api/badge/14/status" alt="Status Badge" style="vertical-align: middle; display: inline-block;"></a>`;
}



/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
    logo: '/logo.svg',

    appearance: true,  // 配置 深色模式

    social: [
        {icon: 'github', link: 'https://github.com/PGuideStudio'},
        {icon: 'gitlab', link: 'https://zds.cqmu.edu.cn/pguide-studio'},
        // { icon: 'qq', link: 'https://qm.qq.com/q/UIXh30Arqc'}
    ],
    navbarSocialInclude: ['github', 'gitlab', 'qq'], // 允许显示在导航栏的 social 社交链接
    aside: true, // 页内侧边栏， 默认显示在右侧
    outline: [2, 3], // 页内大纲， 默认显示 h2, h3

    /**
     * 文章版权信息
     * @see https://theme-plume.vuejs.press/guide/features/copyright/
     */
    // copyright: true,

    // prevPage: true,   // 是否启用上一页链接
    // nextPage: true,   // 是否启用下一页链接
    // createTime: true, // 是否显示文章创建时间

    /* 站点页脚，message显示在线情况 */
    footer: {
        message: await getFooterMessage(),
        copyright: 'PGuide Studio © 2023-2025',
    },
    notFound : {
        code : '啊偶，好像没有这个页面',
        title : '🌌 迷路的[0️⃣1️⃣]在数字森林里🌀徘徊',
        quote : [
            '"💻 我点故我在，但🔗已不在" —— 赛博笛卡尔',
            '"🕳️ 宇宙最伟大的谜团不是黑洞，而是404的奇点" —— 星际访客日志',
            '"👁️ 当你在凝视404时，404也在凝视你的🔄" —— 尼采的键盘',
            '"🔄 所有的网页终将消逝，正如我们终将成为别人的缓存" —— 二进制佛陀'
        ][Math.floor(Math.random()*4)],
        linkLabel : '🚀让量子隧穿带你重返现实🌐',
        linkText : '🌠回到已知宇宙 →'
    },
    /**
     * @see https://theme-plume.vuejs.press/config/basic/#profile
     */
    profile: {
        avatar: '/logo.svg',
        name: 'PGuide Docs',
        // description: '项导文档',
        circle: true,
        // location: '',
        // organization: '',
    },

    navbar,
    notes,

    /**
     * 公告板
     * @see https://theme-plume.vuejs.press/guide/features/bulletin/
     */
    // bulletin: {
    //   layout: 'top-right',
    //   contentType: 'markdown',
    //   title: '公告板标题',
    //   content: '公告板内容',
    // },

    /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
    // transition: {
    //   page: true,        // 启用 页面间跳转过渡动画
    //   postList: true,    // 启用 博客文章列表过渡动画
    //   appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
    // },

})
