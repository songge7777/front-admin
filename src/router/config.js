import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";

// 路由配置
const options = {
    routes: [{
            path: "/login",
            name: "登录页",
            component: () =>
                import ("@/pages/login"),
        },
        {
            path: "/",
            name: "首页",
            component: TabsView,
            redirect: "/login",
            children: [{
                    path: "dashboard",
                    name: "Dashboard",
                    meta: {
                        icon: "dashboard",
                    },
                    component: BlankView,
                    children: [{
                            path: "workplace",
                            name: "工作台",
                            meta: {
                                page: {
                                    closable: false,
                                },
                            },
                            component: () =>
                                import ("@/pages/dashboard/workplace"),
                        },
                        {
                            path: "analysis",
                            name: "分析页",
                            component: () =>
                                import ("@/pages/dashboard/analysis"),
                        },
                    ],
                },
                {
                    path: "analysis",
                    name: "分析",
                    meta: {
                        icon: "warning",
                    },
                    component: BlankView,
                    children: [{
                            path: "data",
                            name: "抓包数据分析",
                            component: () =>
                                import ("@/pages/sg/index"),
                        },
                        {
                            path: "Statistics",
                            name: "统计分析",
                            component: () =>
                                import ("@/pages/sg/statistics"),
                        },
                        {
                            path: "FlowAnalysis",
                            name: "流量分析",
                            component: () =>
                                import ("@/pages/sg/flowAnalysis"),
                        },
                    ],
                },
            ],
        },
    ],
};

export default options;