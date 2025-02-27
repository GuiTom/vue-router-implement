import { reactive, ref, effect } from './reactive.js';

// Reactive示例
const state = reactive({
    count: 0,
    message: '这是一个reactive对象'
});



// 获取reactive演示的UI元素
const countDisplay = document.getElementById('countDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const incrementButton = document.getElementById('incrementButton');
const updateMessageButton = document.getElementById('updateMessageButton');

// 使用effect跟踪reactive对象的变化
effect(() => {
    countDisplay.textContent = `计数: ${state.count}`;
});

effect(() => {
    messageDisplay.textContent = `消息: ${state.message}`;
});

// 添加事件监听器
incrementButton.addEventListener('click', () => {
    state.count++;
});

updateMessageButton.addEventListener('click', () => {
    state.message = '消息已更新 - ' + new Date().toLocaleTimeString();
});

// Ref示例
const refValue = ref(0);
const refMessage = ref('这是一个ref值');

const refDemo = document.getElementById('refDemo');

// 获取ref演示的UI元素
const refCountDisplay = document.getElementById('refCountDisplay');
const refMessageDisplay = document.getElementById('refMessageDisplay');
const refIncrementButton = document.getElementById('refIncrementButton');
const refUpdateButton = document.getElementById('refUpdateButton');

// 使用effect跟踪ref的变化
effect(() => {
    refCountDisplay.textContent = `ref计数: ${refValue.value}`;
});

effect(() => {
    refMessageDisplay.textContent = `ref消息: ${refMessage.value}`;
});

// 添加事件监听器
refIncrementButton.addEventListener('click', () => {
    refValue.value++;
});

refUpdateButton.addEventListener('click', () => {
    refMessage.value = 'ref消息已更新 - ' + new Date().toLocaleTimeString();
});