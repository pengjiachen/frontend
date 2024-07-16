<template>
<div class="dd">
    <div class="top">
        <div class="time">{{timeMsg}}</div>
    </div>
    <div class="mid1">
        <div class="top-left">
            <div class="tl-top">
                单位行业分布
            </div>
            <div class="tl-bottom"></div>
        </div>
        <div class="top-mid">
            <div class="tm-top">
                <span class="tm-top-text">用人单位行业分布</span>
            </div>
            <div class="tm-bottom" id="tongjitu">
            </div>
        </div>
        <div class="top-right">
            <div class="tl-top"></div>
            <div class="tl-bottom"></div>
        </div>
    </div>
    <div class="mid2"></div>
    <div class="bottom"></div>
</div>
</template>

<script>
// echarts使用步骤
// 1.准备装统计图的容器（div） 要求最好有id 必须有宽高
// 2.引入echarts
// 3.获取容器，然后使用echatrs加载容器 （必须使用生命周期，让容器加载出来完再获取容器并加载）
// 4.定义配置项
// 5.给容器设置配置项
import * as echatrs from 'echarts'
import moment from 'moment'
export default {
  data: function () {
    return {
      timeMsg: '',
      moment: moment
    }
  },
  methods: {
    showTime () {
      let that = this
      setInterval(function () {
        that.timeMsg = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
      }, 1000)
    },
    initDiv () {
      let obj = echatrs.init(document.getElementById('tongjitu'))
      let option = {
        color: [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#00E6FD' // 0% 处的颜色
          }, {
            offset: 1, color: '#040812' // 100% 处的颜色
          }],
          global: false
        }],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: '#6087D0'
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: 20
          }
        ]
      }
      obj.setOption(option)
    }
  },
  props: {},
  components: {},
  // 生命周期方法  页面加载的时候
  created () {
    // 启动定时器  2种定时器
    // 延迟性运行  只执行一次  延迟某个时间段执行
    // setTimeout(function () {
    //   console.info(1111111111)
    // }, 1000)
    //  周期性运行   一直执行 只是有间隔时间
    this.showTime()
  },
  // 也是表示页面刚加载，在created之后，这个方法调用时，页面元素已经加载完了
  mounted () {
    this.initDiv()
  }
}
</script>

<style scoped>
@import "../../assets/styles/screen/screen.css";
</style>
