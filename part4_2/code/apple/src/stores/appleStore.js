import {observable, configure, computed, action, runInAction, autorun} from 'mobx';

import axios from 'axios'

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({enforceActions: 'observed'});

class appleStore {

    @observable apples = [
        {
            id: 0,
            weight: 233,
            isEaten: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ];
    @observable newAppleId = 3;
    @observable isPicking = false;
    @observable buttonText = '摘苹果';




    /**  计算当前已吃和未吃苹果的状态 */
    @computed get status(){
        let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        this.apples.forEach(apple => {
            let selector = apple.isEaten ? 'appleEaten':'appleNow';
            status[selector].quantity ++;
            status[selector].weight += apple.weight;
        });
        return status;
    }


    /*摘苹果的异步操作*/
    @action.bound async pickApple () {

        /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
        if (this.isPicking) {
            return;
        }

        this.isPicking = true;
        this.buttonText = '正在采摘...';
        
        await axios.get('http://49.232.17.32:3005/goods')


        let weight = Math.floor(200 + Math.random() * 50);

        runInAction(() => {
            this.isPicking = false;
            this.buttonText = '摘苹果';
            this.apples.push({
                id: this.newAppleId++,
                weight: weight,
                isEaten: false
            });
        });
        
        // runInAction(() => this.users = data);
    }

    /* 这里需要写成箭头函数的形式，这样此函数从父组件传递到子组件的时候才能调用成功*/
    @action eatApple = (appleId)=>{

        let targetIndex = '';
        this.apples.forEach((apple,index)=>{
            if(apple.id == appleId){
                targetIndex = index
            }
        });
        this.apples[targetIndex].isEaten = true;
    }




}

const store = new appleStore()

export default store;