// 配置别名，Vue3中默认的别名 @ 表示 src 目录
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': "@/assets",
                'common': "@/common",
                'components': "@/components",
                'network': "@/network",
                'views': "@/views",
            },
        }
    },
};
