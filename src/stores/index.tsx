import {observable, action, computed} from 'mobx'
 
class CountStore {
 
    @observable collapsed = false  //menu展示
    @observable startNum = 110   //test
    @observable curBasePath = '/'   //当前基础路由
 
    @action
    inc() { this.startNum += 1 }
 
    @action
    dec() { this.startNum -= 1}
 
    @action
    reset() { this.startNum = 0 }

    @action.bound
    increment() {
        this.collapsed = !this.collapsed // 'this' 永远都是正确的
    }

    @action
    menuRender(e:object) {
        this.curBasePath = e.url
    }

    @computed
    get total(){
        return this.startNum * 10
    }
}
 
const countStore = new CountStore();
export default countStore