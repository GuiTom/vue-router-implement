import { reactive, effect } from './reactive.js';

export class Router {
    constructor(options) {
        this.routes = options.routes || [];
        this.current = reactive({
            path: window.location.hash.slice(1) || '/',
            component: null
        });

        // 初始化时匹配当前路由
        this.matchRoute(this.current.path);

        // 监听hash变化
        window.addEventListener('hashchange', () => {
            this.current.path = window.location.hash.slice(1) || '/';
            this.matchRoute(this.current.path);
        });
    }

    // 匹配路由
    matchRoute(path) {
        const route = this.routes.find(route => route.path === path);
        if (route) {
            this.current.component = route.component;
        } else {
            console.warn(`未找到匹配的路由: ${path}`);
            this.current.component = null;
        }
    }

    // 路由跳转
    push(path) {
        window.location.hash = path;//浏览器会自动在所赋的值前面加上#
    }
}

// 创建路由容器组件
export function createRouterView(router) {
    const container = document.createElement('div');
    container.id = 'router-view';

    // 使用effect监听路由变化并更新视图
    effect(() => {
        const component = router.current.component;
        if (component) {
            container.innerHTML = '';
            container.appendChild(component());
        } else {
            container.innerHTML = '<div>404 Not Found</div>';
        }
    });

    return container;
}