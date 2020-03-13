import {observable, action, computed} from 'mobx'
 
class CountStore {
 
    @observable startNum = 110
 
    @action
    inc() { this.startNum += 1 }
 
    @action
    dec() { this.startNum -= 1}
 
    @action
    reset() { this.startNum = 0 }

    @computed
    get total(){
        return this.startNum * 10
    }
}
 
const countStore = new CountStore();
export default countStore