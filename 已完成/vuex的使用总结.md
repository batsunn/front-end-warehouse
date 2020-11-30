## vuex的使用总结

**1.0 state**

用来存数据，一般在文档中，叫做状态管理

```javascript
state: {
    num: 0
}
// 1.0 直接获取
this.$store.state.num

// 2.0 通过 mapState 获取
import { mapState } from 'vuex'
//在computed里面解构
computed: {
    ...mapState(['num'])
}
//使用用this.num即可
```

**2.0mutations**

谁都没有操作state的权限，只有俺有

```javascript
mutations: {
    //将state传入，即可获取state里面的数据
    SET_NUM(state) {
        state.num = 'abc'
    }
}
// 1.0 直接调用
this.$store.commit('SET_NUM')

// 2.0 通过 mapState 获取
import { mapMutations } from 'vuex'
//在methods里面解构
methods: {
    ...mapMutations(['SET_NUM'])
}
//调用直接this.setNum()即可
```

**3.0getters**

​		一般为了数据在相同的情景下使用，并且需要再次修改的时候，不必要每次拿到当前的值再去修改，就可以直接在这里修改就好了，类似于组件里面的 computed

```javascript
//相当于计算属性，计算state里面的值，并返回出去，改变时才调用，平时用缓存
getters: {
    getNum(state) {
        // 这里的数据一定是 state里面的数据，并且只能装饰，或者排列等，不能直接修改
        // 只能获取的意思
        return num += 2
    }
}
// 1.0 直接获取
this.$store.getters.getNum

// 2.0 通过 mapState 获取
import { mapGetters } from 'vuex'
//在computed里面解构
computed: {
    ...mapGetters(['getNum'])
}
```

**4.0actions**

如果只是单方面的去理解 actions和 mutations的话，没有什么区别

但是如果需要做一个异步的处理，并且需要在后续再根据结果处理数据，就应该再 actions里面

```javascript
actions: {
    async getData({ commit }) {
        const data = await getUsers()
        if(data.code === 0) {
            commit('setUsers', data)
        }
    }
}

// 1.0 直接调用
this.$store.dispatch('getData')

// 2.0 通过 mapState 获取
import { mapActions } from 'vuex'

methods: {
    ...mapActions(['getData'])
}
```

**5.0modules**

其实modules就是集成了state、getters、mutations、actions的状态片段，目的是便于分类管理，便于维护

```javascript
const ModulesUser = {
    // 如果使用第二种，那么一定要加上命名空间
    namespaced: true,
    state: () => ({
        title: '分类的数据'
    }),
    getters: {},
    mutations: {},
    actions: {}
}

moudules: {
    user: ModulesUser
}


// 1.0 将来如果要用的话
this.$store.state.user.title


// 2.0 通过 mapState 获取
import { mapState } from 'vuex'

computed: {
    ...mapState('user', ['title'])
}
```

### 注意

```javascript
 computed: {
    ...mapGetters(["gettotal", "gettotalprice"]),
    ...mapState(["cartarr"]),
  },
  methods: {
    ...mapMutations(["CLAEN", "SET_GOODS_COUNT", "SET_GOODS_DESCOUNT"]),
  }
  //mutations在methods里面解构，state和getters在computed里面解构
  //mutations里面的方法要大写
```

