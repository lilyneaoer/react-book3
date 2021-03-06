function createStore (state,stateChanger) {
    //监听变化
    const listeners=[];
    const subscribe=(listener)=>listeners.push(listener);
    const getState=()=>state; //state
    //const dispatch = (action) => stateChanger(state, action)
    const dispatch=(action)=>{
        stateChanger(state,action);
        listeners.forEach((listener)=>listener());
    };
    return {getState,dispatch,subscribe}
}
function renderApp (appState){
    renderTitle(appState.title);
    renderContent(appState.content);
}
function renderTitle (title) {
    const titleDOM=document.getElementById('title');
    titleDOM.innerHTML=title.text;
    titleDOM.style.color=title.color;
}
function renderContent (content) {
    const contentDOM=document.getElementById('content');
    contentDOM.innerText=content.text;
    contentDOM.style.color=content.color;
}
let appState={
    title:{
        text:'React.js 小书',
        color:'red',
    },
    content:{
        text:'React.js 小书内容',
        color:'blue',
    }
}
function stateChanger (state,action) {
    switch (action.type){
        case 'UPDATE_TITLE_TEXT':
            state.title.text=action.text;
            break;
        case 'UPDATE_TITLE_COLOR':
            state.title.color=action.color;
            break;
        default:
            break;
    }
}
//初始化储存
const store=createStore(appState,stateChanger);
// 监听数据变化
store.subscribe(()=>renderApp(store.getState()));
// 第一次渲染
renderApp(store.getState());
store.dispatch({type:'UPDATE_TITLE_TEXT',text:'《Reac.js小黄书》'});
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'purple'});
// 监听到变化后再次渲染
renderApp(store.getState());