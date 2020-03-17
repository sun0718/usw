import { defineConfig } from 'umi';
import slash from 'slash2';

import proxy from './proxy';

// const { PORT } = process.env;

let title: string = '地下安全监测系统'

export default defineConfig({
    hash: true,
    title: title,
    history: {
        type: "hash"
    },
    targets: {
        ie: 11,
    },
    publicPath: '/public/',
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
                            redirect: '/Engineering',
                        },
                        {
                            path: '/Engineering',
                            name: '工程管理',
                            title: `工程管理-${title}`,
                            component: './Engineering/index',
                            routes: [
                                {
                                    path: 'info',
                                    name: '工程信息',
                                    title: `工程信息-${title}`,
                                    isMenu: true,
                                    component: './Engineering/index',
                                },
                                {
                                    path: 'pointManagement',
                                    name: '测点管理',
                                    title: `测点管理-${title}`,
                                    isMenu: true,
                                    component: './Engineering/index',
                                },
                                {
                                    path: 'instrument',
                                    name: '仪器信息管理',
                                    isMenu: true,
                                    title: `仪器信息管理-${title}`,
                                    routes: [
                                        {
                                            path: '/',
                                            redirect: '/instrument/1',
                                        },
                                        {
                                            path: '1',
                                            name: '仪器',
                                            title: `仪器-${title}`,
                                            isMenu: true,
                                            component: './Engineering/index',
                                        },
                                        {
                                            path: '2',
                                            name: '仪器分类',
                                            title: `仪器分类-${title}`,
                                            isMenu: true,
                                            component: './Engineering/index',
                                        },
                                        {
                                            path: '3',
                                            name: '仪器厂家',
                                            title: `仪器厂家-${title}`,
                                            isMenu: true,
                                            component: './Engineering/index',
                                        },
                                    ]
                                },
                                {
                                    path: 'point',
                                    name: '公式管理',
                                    title: `公式管理-${title}`,
                                    isMenu: true,
                                    component: './Engineering/index',
                                    routes: [
                                        {
                                            path: 'point',
                                            name: '公式',
                                            title: `公式-${title}`,
                                            isMenu: true,
                                            component: './Engineering/index',
                                        },
                                        {
                                            path: 'point',
                                            name: '单位',
                                            title: `单位-${title}`,
                                            isMenu: true,
                                            component: './Engineering/index',
                                        }
                                    ]
                                }
                            ]
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
                                    isMenu: true,
                                    icon: 'OrderedListOutlined',
                                    component: './data/ExcelImport/index'
                                },
                                {
                                    path: 'autoImport',
                                    title: `自动化导入-${title}`,
                                    name: `自动化导入`,
                                    isMenu: true,
                                    icon: 'CloudSyncOutlined',
                                    component: './data/AutoImport/index'
                                },
                                {
                                    path: 'search',
                                    title: `数据搜索-${title}`,
                                    name: `数据搜索`,
                                    isMenu: true,
                                    icon: 'FileSearchOutlined',
                                    component: './data/Search/index'
                                },
                                {
                                    path: 'edit',
                                    name: `数据修正`,
                                    isMenu: true,
                                    title: `数据修正-${title}`,
                                    icon: 'RotateRightOutlined',
                                    component: './data/Edit/index'
                                },
                            ]
                        },
                        {
                            path: 'Report ',
                            name: '报表管理',
                            redirect: '/Report',
                        },
                        {
                            path: 'Report ',
                            name: '三维可视化',
                            redirect: '/Visualization',
                        },
                        {
                            path: 'Report ',
                            name: '三维可视化',
                            redirect: '/Visualization',
                        },
                        {
                            path: '/admin',
                            name: '系统管理',
                            title: `系统管理-${title}`,
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
