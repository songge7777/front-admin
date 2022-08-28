<template>
  <div class="analysis">
    <div class="active-data">
      <div class="title">
        实时数据
      </div>
      <div class="item">
        <a-tooltip v-for="item in popoverList" :key="item.name">
          <template #title>
            {{ item.title }}
          </template>
          {{ item.name }}：{{ item.num || 0 }}{{ item.type }}
        </a-tooltip>
      </div>
    </div>
    <div class="active-data">
      <div class="title">
        24小时访问流量分析
      </div>
      <div id="myChart" ref="canvasDom"></div>
    </div>

    <div class="active-data">
      <div class="title">
        24二维码识别分析
      </div>
      <div id="myChart2" ref="canvasDom2"></div>
    </div>

    <div class="active-data">
      <div class="title">
        流量整体分析
      </div>
      <a-table class="one-table" :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
const rankList = [];

for (let i = 0; i < 8; i++) {
  rankList.push({
    name: "桃源村" + i + "号店",
    total: 1234.56 - i * 100,
  });
}

export default {
  name: "Analysis",
  i18n: require("/src/pages/dashboard/analysis/i18n"),
  data() {
    return {
      rankList,
      loading: true,
      myChart: "",
      myChart2: "",
      option: [],
      popoverList: [
        {
          name: "当前在线",
          type: "人",
          num: 0,
          btnType: "danger",
          title: "最近一分钟访问人数",
        },
        {
          name: "最近一小时",
          type: "人",
          num: null,
          btnType: "danger",
          title: "最近一分钟访问人数",
        },
        {
          name: "今日UV",
          type: "人",
          num: null,
          btnType: "danger",
          title: "最近一分钟访问人数",
        },
        {
          name: "今日PV",
          type: "人",
          num: null,
          btnType: "danger",
          title: "最近一分钟访问人数",
        },
        {
          name: "总数UV",
          type: "人",
          num: null,
          btnType: "danger",
          title: "最近一分钟访问人数",
        },
        {
          name: "总数PV",
          type: "人",
          num: null,
          btnType: "danger",
          title: "最近一分钟访问人数",
        },
      ],
      columns: [
        {
          title: "停留时间",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "展示次数",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "比例",
          dataIndex: "address",
          key: "address 1",
          ellipsis: true,
        },
      ],
      data: [
        {
          key: "1",
          name: "小于10秒",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "10-20秒",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "20-50秒",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "4",
          name: "50-100秒",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "5",
          name: "100-200秒",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "6",
          name: "200秒以上",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        }
      ],
    };
  },
  created() {
    setTimeout(() => (this.loading = !this.loading), 1000);
  },
  mounted() {
    // 初始化折线图
    this.initLine();
    this.initLine2();
  },
  methods: {
    initLine() {
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '近三天访人员问数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['前天', '昨天', '今天']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '前天',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 11, 33, 44]
          },
          {
            name: '昨天',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 11, 33, 44]
          },
          {
            name: '今天',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 22, 44, 55]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    initLine2() {
      var chartDom = document.getElementById("myChart2");
      var myChart2 = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '近三天二维码复制数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['前天', '昨天', '今天']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '前天',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 11, 33, 44]
          },
          {
            name: '昨天',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 11, 33, 44]
          },
          {
            name: '今天',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 22, 44, 55]
          }
        ]
      };
      option && myChart2.setOption(option);
    },
  }
};
</script>

<style lang="less" scoped>
#myChart {
  width: 800px;
  height: 600px;
}

#myChart2 {
  width: 800px;
  height: 600px;
}

.analysis {
  .active-data {
    padding: 10px 0;

    .title {
      margin: 10px 0;
      padding: 15px;
      line-height: 22px;
      border-left: 5px solid #009688;
      border-radius: 0 2px 2px 0;
      background-color: #f2f2f2;
      color: red;
    }

    .item {
      span {
        display: inline-block;
        height: 38px;
        line-height: 38px;
        padding: 0 18px;
        background-color: #009688;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        margin: 10px 0 10px 10px;
      }
    }

    .one-table {
      background-color: #fff;
    }
  }
}

.extra-wrap {
  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a:not(:first-child) {
      margin-left: 24px;
    }
  }
}

@media screen and (max-width: 992px) {
  .extra-wrap .extra-item {
    display: none;
  }
}

@media screen and (max-width: 576px) {
  .extra-wrap {
    display: none;
  }
}
</style>
