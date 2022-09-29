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
            children: [
                {
                    path: "analysis",
                    name: "分析",
                    meta: {
                        icon: "warning",
                    },
                    component: BlankView,
                    children: [
                        {
                            path: "product",
                            name: "微信产品",
                            component: () =>
                                import ("@/pages/sg/product"),
                        },
                        {
                            path: "data",
                            name: "微信统计",
                            component: () =>
                                import ("@/pages/sg/wx"),
                        },
                        {
                            path: "Statistics",
                            name: "二维码复制分析",
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
                // {
                //     path: "study",
                //     name: "学习",
                //     meta: {
                //         icon: "warning",
                //     },
                //     component: BlankView,
                //     children: [{
                //             path: "test",
                //             name: "抓包数据分析",
                //             component: () =>
                //                 import ("@/pages/study/index"),
                //         },
                       
                //     ],
                // },
            ],
        },
    ],
};

export default options;