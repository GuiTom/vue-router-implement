// 用于存储依赖关系的全局变量
let activeEffect = null;
const targetMap = new WeakMap();

// effect函数用于注册副作用函数
export function effect(fn) {
    activeEffect = fn;
    fn(); // 首次执行以收集依赖
    activeEffect = null;
}

// 依赖收集
function track(target, key) {
    if (!activeEffect) return;
    
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    
    dep.add(activeEffect);
}

// 触发更新
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    
    const dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => effect());
    }
}

// reactive函数
export function reactive(target) {
    return new Proxy(target, {
        get(target, key) {
            const result = target[key];
            track(target, key);
            return result;
        },
        set(target, key, value) {
            target[key] = value;
            trigger(target, key);
            return true;
        }
    });
}

// ref函数
export function ref(value) {
    const refObject = {
        get value() {
            track(refObject, 'value');
            return value;
        },
        set value(newValue) {
            value = newValue;
            trigger(refObject, 'value');
        }
    };
    return refObject;
}