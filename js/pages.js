// 页面组件
export function Home() {
    const div = document.createElement('div');
    div.innerHTML = `
        <h2>首页</h2>
        <p>这是首页内容</p>
    `;
    return div;
}

export function About() {
    const div = document.createElement('div');
    div.innerHTML = `
        <h2>关于我们</h2>
        <p>这是关于页面的内容</p>
    `;
    return div;
}