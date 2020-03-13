import { defineConfig } from 'umi';
import slash from 'slash2';

import proxy from './proxy';

// const { PORT } = process.env;

let title:string = '地下安全监测系统'

export default defineConfig({
    hash: true,
    title: title,
    history:{
        type:"hash"
    },
    targets: {
        ie: 11,
    },
    routes: [
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: 'login',
                    path: '/user/login',
                    component: './user/login',
                },
            ],
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [
                        {
                            path: '/',
                            name: '首页',
                            redirect: '/list',
                        },
                        {
                            path: '/list',
                            name: '工程管理',
                            title: `工程管理-${title}`,
                            component: './TableList/index',
                        },
                        {
                            path: '/data',
                            name: '数据管理',
                            icon: 'BarChartOutlined',
                            routes: [
                                {
                                    path: '/data',
                                    redirect: 'excelImport',
                                },
                                {
                                    path: 'excelImport',
                                    title: `EXCEL导入-${title}`,
                                    name: `EXCEL导入`,
                                    icon: 'OrderedListOutlined',
                                    component: './data/ExcelImport/index'
                                },
                                {
                                    path: 'autoImport',
                                    title: `自动化导入-${title}`,
                                    name: `自动化导入`,
                                    icon: 'CloudSyncOutlined',
                                    component: './data/AutoImport/index'
                                },
                                {
                                    path: 'search',
                                    title: `数据搜索-${title}`,
                                    name: `数据搜索`,
                                    icon: 'FileSearchOutlined',
                                    component: './data/Search/index'
                                },
                                {
                                    path: 'edit',
                                    name: `数据修正`,
                                    title: `数据修正-${title}`,
                                    icon: 'RotateRightOutlined',
                                    component: './data/Edit/index'
                                },
                            ]
                        },
                        {
                            path: '/admin',
                            name: '管理员',
                            title: `管理员-${title}`,
                            icon: 'crown',
                            component: './Admin',
                            authority: ['admin']
                        },
                        {
                            component: './404',
                        },
                    ],
                },
                {
                    component: './404',
                },
            ],
        },
        {
            component: './404',
        },
    ],
    ignoreMomentLocale: true,
    manifest: {
        basePath: '/',
    },
    proxy: proxy['dev'],
    // chainWebpack: require('./plugin.config')
});
