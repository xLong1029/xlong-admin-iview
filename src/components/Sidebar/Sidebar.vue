<template>
    <ul class="m-xl-menu-list">
        <li v-for="(menu, i) in MenuList" :key="i" :class="['xl-menu-item', menu.submenu.length > 0 ? 'xl-menu-submenu' : '', activeName == menu.name ? 'xl-menu-active' : '']">
            <!-- 一级菜单列表-无二级菜单 -->
            <div v-if="menu.submenu.length <= 0" class="xl-menu-title" @click="selectMenu(i)">
                <router-link :to="{ name: menu.name }" >
                    <Icon :type="menu.icon"></Icon>
                    {{ menu.text }}
                </router-link>
            </div>
            <!-- 一级菜单列表-含二级菜单 -->
            <div v-else class="xl-menu-submenu-title" @click="selectMenu(i)">
                <Icon :type="menu.icon"></Icon>
                {{ menu.text }}
                <Icon class="xl-menu-submenu-title-icon" v-if="menu.submenu.length > 0" type="ios-arrow-down"></Icon>
            </div>
            <!-- 二级子菜单列表 -->
            <ul v-if="menu.submenu.length > 0" class="m-xl-submenu-list">
                <li v-for="(item, index) in menu.submenu" :key="index" class="xl-submenu-item">
                    <div class="xl-submenu-title" @click="selectSubmenu(i, index)">
                        <router-link :to="{ name: item.name }" >{{ item.text }}</router-link>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
  import $ from 'jquery'
  export default {
    // 获取父级传值
    // activeName: 第一次加载激活的一级菜单对应路由name，Menu：菜单列表
    props: {
        // 设置默认值
        activeName:{
            type: String,
            default: ''
        },
        MenuList:{
            type: Array,
            // 警告提示数组/对象默认值应当以一个函数返回 Object/Array must use a factory function to return the default value.
            default: function(){
                return [
                    {
                        // menu-item对应的路由name
                        name: 'Home',
                        // iView的Icon图标的type属性
                        icon: 'navicon-round',
                        // menu-title显示文本
                        text: '一级菜单',
                        // submenu列表
                        submenu: [
                            {
                                // submenu-item对应的路由name
                                name: 'Home',
                                // submenu-title显示文本
                                text: '二级菜单',
                            },
                        ]
                    }
                ];
            }
        }
    },
    data () {
        return {
            nowActive: '',
        }
    },
    mounted(){        
        this.setSideBar();
        //if(this.activeName != '' && this.nowActive == '') this.nowActive = this.activeName;
    },
    methods:{
        // 设置侧边栏
        setSideBar(){
            let stop = false;
            const menu = this.MenuList;
            // 遍历menu
            for(let i = 0 ; i < menu.length ; i ++){
                if(!stop){
                    // 遍历menu下的menu-item
                    for(let j = 0 ; j < menu[i].submenu.length; j ++){	        			
                        // 获取Menu的下Menu-item的name
                        let activeName = menu[i].submenu[j].name;
                        if(window.location.href.indexOf(activeName) != -1){                            
                            this.nowActive = activeName;                            
                            // 激活当前菜单
                            this.setActive(i, j);
                            stop = true;
                            break;
                        }
                        else this.nowActive = 'Home';
                    }
                }
                else break;
            }
        },
        // 激活当前菜单
        setActive(mIndex, subIndex){
            let item = $('.xl-menu-item').eq(mIndex);
            let child = item.find('.m-xl-submenu-list');
            if(child.length > 0){
                let activeItem = child.find('.xl-submenu-title').eq(subIndex);
                if(activeItem.hasClass('xl-submenu-active')) return;
                child.show(100);
                activeItem.addClass('xl-submenu-active');     
                item.siblings().find('.m-xl-submenu-list').hide();
            }
            this.activeMenu(item);
        },
        // 选中一级菜单
        selectMenu(index){    
            let item = $('.xl-menu-item').eq(index);
            let child = item.find('.m-xl-submenu-list');
            // 判断是否有子菜单
            if(child.length > 0){
                if(item.hasClass('xl-menu-active')){
                    item.removeClass('xl-menu-active');
                    child.slideUp(250);
                }
                else{
                    this.activeMenu(item);
                    child.slideDown(250);
                    item.siblings().find('.m-xl-submenu-list').slideUp(250);
                }
            }
            else{
                this.activeMenu(item);
                item.siblings().find('.m-xl-submenu-list').slideUp(250);
            }            
        },
        // 激活当前一级菜单
        activeMenu(item){
            item.siblings().removeClass('xl-menu-active');
            item.addClass('xl-menu-active');
        },
        // 激活二级菜单
        selectSubmenu(mIndex, subIndex){
            console.log(1);
            let parent = $('.xl-menu-item').eq(mIndex);
            let item = parent.find('.xl-submenu-title');
            item.removeClass('xl-submenu-active').eq(subIndex).addClass('xl-submenu-active');
            parent.siblings().find('.xl-submenu-title').removeClass('xl-submenu-active');
        }
    },
    watch:{
        '$route' (to, from) {
            // 对路由变化作出响应...
            this.setSideBar();
        }
    }
  }
</script>
<style lang="less" scoped>
    .m-xl-menu-list{
        width: 100%;
        font-size: 14px;
        position: relative;
        z-index: 900;
        margin: 0;
        padding: 0;
        outline: none;
        list-style: none;
        background: #4d5256;
        color:rgba(255, 255, 255, 0.7);
        a{
            color:rgba(255, 255, 255, 0.7);
        }
    }
    .xl-menu-item, .xl-menu-submenu{
        cursor: pointer;
        border-bottom: 1px solid #596065;
        &:last-child{
            border-bottom: none;
        }

        &:hover{
            background: #45484e;
            color: #fff;
        }
        i{
            margin-right: 8px;
        }
    }

    .xl-menu-item:hover a{
        color: #fff;
    }

    .xl-menu-title a{
        display: block;
        padding: 14px 24px;
    }
    .xl-menu-active{        
        &.xl-menu-item{
            border-right: 2px solid #00c5a3;
            .xl-menu-title a{
                color: #00c5a3;
            }
        }
        &.xl-menu-submenu{
            color: #fff;
            border-right: none;
            &.xl-submenu-active{
                color: #fff;
            }
            .xl-menu-submenu-title-icon{
                transform: rotate(180deg);
            }
        }
    }
    .xl-menu-submenu-title{
        display: block;
        padding: 14px 24px;
    }
    .xl-menu-submenu-title-icon{
        float: right;
        margin-top: 4px;
        transition: transform 0.2s ease-in-out;
        -o-transition: transform 0.2s ease-in-out;
        -webkit-transition: transform 0.2s ease-in-out;
        -ms-transition: transform 0.2s ease-in-out;
        -moz-transition: transform 0.2s ease-in-out;
    }

    .m-xl-submenu-list{
        background: #3a3d44;
        display: none;
    }
    .xl-submenu-item{
        a:hover{
            color:#fff;
        }
    }
    .xl-submenu-title{
        a{
            padding: 14px 0 14px 45px;
            display: block;
            &:hover{
                color: #fff;
            }
        }
        &.xl-submenu-active{
            a{
                color: #fff;
                background: #00c5a3 !important;
            }            
        }
    }
</style>
