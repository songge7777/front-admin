<template>
  <div>
  <a-form
      :layout="formLayout"
      :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
    >
    <a-form-item
      label="查询时间"
      style="margin-bottom:0;"
    >
      <a-form-item
        :style="{ display: 'inline-block', width: 'calc(45% - 12px)', marginRight: '0' }"
      >
        <a-date-picker style="width: 100%" />
      </a-form-item>
      <span :style="{ display: 'inline-block', width: '20px', textAlign: 'center' }">
        -
      </span>
      <a-form-item :style="{ display: 'inline-block', width: 'calc(45% - 12px)' }">
        <a-date-picker style="width: 100%" />
      </a-form-item>
    </a-form-item>
    <a-form-item label="微信号码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-input placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :data-source="data"
  >
    <span slot="time" slot-scope="text">{{ fn(text) }}</span>
  </a-table>
</div>
</template>

<script>
  import moment from 'moment'
  const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'ip',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    slots: { title: 'time' },
    scopedSlots: { customRender: 'time' },
  },
  {
    title: '微信号码',
    dataIndex: 'wxNumber',
    key: 'wxNumber',
  },
  {
    title: '停留预览时间',
    key: 'stopTime',
    dataIndex: 'stopTime',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '滑动占总时间比例',
    dataIndex: 'ratio',
    key: 'ratio',
  },
  {
    title: '浏览总时长',
    dataIndex: 'ratio1',
    key: 'ratio1',
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    id:'1',
    ip:'123.442.1.2',
    time:Date.now(),
    wxNumber:'XXSSA',
    // 停留时间 所有的 type stop_time 时间
    stopTime:Date.now(),
    // 停留滑动比  同上
    ratio:'50%',
    ratio1:'1S',
    url:'www.baidu.com'
  },
  {
    id:'1',
    ip:'123.442.1.2',
    time:Date.now(),
    wxNumber:'XXSSA',
    // 停留时间 所有的 type stop_time 时间
    stopTime:Date.now(),
    // 停留滑动比  同上
    ratio1:'1S',
    ratio:'50%',
    url:'www.baidu.com'
  },
  {
    id:'1',
    ip:'123.442.1.2',
    time:Date.now(),
    wxNumber:'XXSSA',
    // 停留时间 所有的 type stop_time 时间
    stopTime:Date.now(),
    // 停留滑动比  同上
    ratio:'50%',
    ratio1:'1S',
    url:'www.baidu.com'
  },
  {
    id:'1',
    ip:'123.442.1.2',
    time:Date.now(),
    wxNumber:'XXSSA',
    // 停留时间 所有的 type stop_time 时间
    stopTime:Date.now(),
    // 停留滑动比  同上
    ratio1:'1S',
    ratio:'50%',
    url:'www.baidu.com'
  }
];
export default {
  data() {
    return {
      formLayout: 'inline',
      data,
      columns,
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 4 },
        }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    fn(text){
      return  moment(text).format('YYYY MM DD, h:mm:ss')
    }
  },
};
</script>