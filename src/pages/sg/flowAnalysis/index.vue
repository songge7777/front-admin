<template>
  <div class="analysis">
    <div class="active-data">
      <div class="title">
        实时数据
      </div>
      <div class="item">
        <a-tooltip v-for="item in popoverList" :key="item.name">
          <template #title>
          {{item.title}}
          </template>
          {{item.name}}：{{item.num||0}}{{item.type}}
        </a-tooltip>
      </div>
    </div>
    <div id="myChart" ref="canvasDom"></div>
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('totalSales')" total="￥ 189,345">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
          </div>
          <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('visits')" total="￥ 189,345">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <div slot="footer">{{$ta('daily|visits', 'p')}}<span> 123,4</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('payments')" total="￥ 189,345">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <div slot="footer">{{$t('conversion')}} <span>60%</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('operating')" total="73%">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress target="90" percent="78" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
          </div>
        </chart-card>
      </a-col>
    </a-row>
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
import ChartCard from "../../../components/card/ChartCard";
import MiniArea from "../../../components/chart/MiniArea";
import MiniBar from "../../../components/chart/MiniBar";
import MiniProgress from "../../../components/chart/MiniProgress";
// import Bar from "../../../components/chart/Bar";
// import RankingList from "../../../components/chart/RankingList";
// import HotSearch from './HotSearch'
// import SalesData from './SalesData'
import Trend from "../../../components/chart/Trend";

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
      option: [],
      popoverList: [
        {
          name: "当前在线",
          type: "人",
          num: null,
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
      ],
    };
  },
  created() {
    setTimeout(() => (this.loading = !this.loading), 1000);
  },
  components: {
    Trend,
    //   SalesData,
    //   HotSearch,
    // RankingList,
    // Bar,
    MiniProgress,
    MiniBar,
    MiniArea,
    ChartCard,
  },
  mounted() {
    // 初始化折线图
    this.initLine();
  },
  methods: {
    initLine() {
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        yAxis: {
          // type: "category",
          data: [0, 0.5, 1, 1.5, 2],
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: { color: "#000" },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: true,
          },
          min: 0,
          max: 23,
          splitNumber: 21,
        },
        series: [
          {
            data: [2, 12, 13, 15, 17, 21, 23],
            type: "line",
            // smooth: true, //曲线/折线
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#myChart {
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
