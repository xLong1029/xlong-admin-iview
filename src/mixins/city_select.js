/*
 * 模块 : 城市联动选择相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import JsonCity from 'mock/city.json'

export default {
	data() {
		return {
			// 省份列表
            provinceList: [],
            // 城市列表
            cityList: [],
            // 区域列表
            areaList: [],
		}
    },
    created(){
        // 获取本地“省份”列表
        this.provinceList = JsonCity;
    },
	methods: {
		// 省份选改变联动城市列表
        changeProvince(res) {
            // 清空选项列表
            this.cityList = [];
            // 清空选项列表
            this.areaList = [];
            // 获取城市列表
            this.getCity(res);
        },
        // 获取城市列表
        getCity(province){
            // 循环读取 json 数据到列表中
            for (let i = 0; i < this.provinceList.length; i++) {
                if (province === this.provinceList[i].name) {
                    this.cityList = this.provinceList[i].childs;
                    break;
                }
            }
        },
        // 城市改变联动区域列表
        changeCity(res) {
            // 清空选项列表
            this.areaList = [];
            // 获取区域列表
            this.getArea(res);
        },
        // 获取区域列表
        getArea(city){
            let stop = false;
            // 循环读取 json 数据到列表中
            for (let i = 0; i < this.provinceList.length; i++) {
                if (!stop) {
                    if(this.infoForm.province == this.provinceList[i].name){
                        for (let j = 0; j < this.provinceList[i].childs.length; j++) {
                            if (city === this.provinceList[i].childs[j].name) {
                                this.areaList = this.provinceList[i].childs[j].childs;
                                stop = true;
                            }
                        }
                    }
                    else continue;                        
                }
                else break;
            }
        },
        // 区域改变
        changeArea(res) {
            console.log('区域name:' + res);
        },
	}
}