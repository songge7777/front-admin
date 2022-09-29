<template>
    <div>
    <a-form
        :layout="formLayout"
        :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
      >
      <a-form-item label="微信号码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input v-model="wechatNo" placeholder="请输入微信号" />
      </a-form-item>
      <a-form-item label="产品名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-input v-model="name" placeholder="请输入产品名称" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 4, offset: 4 }">
        <a-button type="primary" @click="search">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <a-row>
        <a-col :offset="20" :span="4">
            <a-button type="primary" @click="()=>handleAdd({},'add')">
                新增
            </a-button>
        </a-col>
    </a-row>

    <a-table
      :columns="columns"
      :data-source="tableResource"
      :scroll="{ x: 1500}"
      @change="pageChange"
      :pagination="{
        total:Number(this.total),
        pageSize:Number(this.pageSize),
        current:Number(this.pageNumber),
      }"
      >
      <span slot="time" slot-scope="text">{{ fn(text) }}</span>
      <span slot="action" slot-scope="action">
        <a-button class="editable-add-btn" @click="()=>handleAdd(action,'edit')">
            编辑
        </a-button>
        <a-popconfirm
          title="确定删除吗?"
          @confirm="()=>delFn(action)"
        >
            <a-button class="editable-add-btn">
                删除
            </a-button>
        </a-popconfirm>
        <a-button class="editable-add-btn" @click="()=>handleAdd(action,'look')">
            查看
        </a-button>
      </span>
    </a-table>

    <a-modal v-model="visible" :title="getTitle" :width="400" @ok="modalOk">
        <a-form
            id="coordinated"
            :form="form"
        >
          <a-form-item label="请输入产品名称">
                <a-input :disabled="btnType === 'look'" v-decorator="['name', { initialValue: '', rules: [{ required: true, message: '请输入产品!' }] }]" placeholder="请输入产品名称" />
            </a-form-item>
            <a-form-item label="请输入微信号">
                <a-input :disabled="btnType === 'look'"  v-decorator="['wechatNo', { initialValue: '' , rules: [{ required: true, message: '请输入微信号码!' }] }]" placeholder="请输入微信号码" />
            </a-form-item>

            <a-form-item label="请输入url">
                <a-input :disabled="btnType === 'look'"  v-decorator="['url', { initialValue: '' , rules: [{ required: true, message: '请输入微信号码!' }] }]" placeholder="请输入微信号码" />
            </a-form-item>

            <a-form-item label="二维码上传" extra="请上传图片">
            <a-upload
                v-decorator="[
                'wechatUrl',
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                  rules: [{ required: true, message: '请上传图片!' }]
                }
                ]"
                name="file"
                action="https://loa.duofanugou.com/api/v1/admin/upload"
                list-type="picture-card"
            >
              <a-button v-if="form.getFieldValue('wechatUrl') && form.getFieldValue('wechatUrl').length === 0"> <a-icon type="upload" /> 上传 </a-button>
            </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
  </div>
  </template>
  
  <script>
import moment from 'moment'
import {
  wechatProduct,
  getwechatProduct,
  getSingleWechatProduct,
  delSingleWechatProduct,
  modifyWechatProduct
} from '@/services/user'
    const columns = [
    {
        title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '产品名称',
      width:100,
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '时间',
      width: 200,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      slots: { title: 'updatedAt' },
      scopedSlots: { customRender: 'time' },
    },
    {
      title: '微信号码',
      width: 200,
      dataIndex: 'wechatNo',
      key: 'wechatNo',
    },
    {
      title: 'url',
      width: 200,
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '二维码地址',
      width: 400,
      dataIndex: 'wechatUrl',
      key: 'wechatUrl',
    },
    {
      title: '操作',
      key: 'action',
      slots: { title: 'action' },
      scopedSlots: { customRender: 'action' },
    },
  ];
  
  export default {
    data() {
      return {
        formLayout: 'inline',
        columns,
        visible:false,
        actionType: '',
        form: this.$form.createForm(this, { name: 'coordinated' }),
        okText:'',
        // 分页
        pageSize:10,
        pageNumber:1,
        total:0,
        name:'',
        wechatNo:'',
        // 表格
        tableResource:[],
        // 类型
        btnType:'',
        // id
        id:'',
      };
    },
    computed: {
        getTitle(){
            switch(this.actionType){
                case 'edit':
                    return "编辑"
                case 'add':
                    return "新增"
                case 'look':
                    return "查看"
                default:
                    return "错误"
            }
        },
    },
    async mounted(){
      this.getData()
    },
    methods: {
      search(){
        this.getData()
      },
      pageChange(e){
        const { current } = e;
        this.pageNumber = current;
        this.getData()
      },
      async getData(){
        const { pageSize, pageNumber, name,wechatNo } = this
        const {data} = await getwechatProduct({pageSize,
          pageNumber,
          name,
          wechatNo})
        if(data.code === 0){
          const {result} = data;
          this.tableResource = result.data.map(item => ({...item,key:item.id}))
          this.pageSize = result.pageSize
          this.total = result.total
        }else{
          this.$message.warning(data.message);
        }
      },
      async addData(name,wechatNo,wechatUrl,url){
        const {data} = await wechatProduct({
            name,
            wechatNo,
            wechatUrl,
            url,
          })
        if(data.code === 0){
          this.visible = false;
          this.getData()
        }else{
          this.$message.warning(data.message);
        }
      },
      async modifyData(name,wechatNo,wechatUrl,url){
        const id = this.id
        const {data} = await modifyWechatProduct({
            id,
            name,
            wechatNo,
            wechatUrl,
            url,
          })
        if(data.code === 0){
          this.visible = false;
          this.getData()
        }else{
          this.$message.warning(data.message);
        }
      },
      modalOk(){
        this.form.validateFields((err, values) => {
          if (!err) {
            let {wechatUrl,name,wechatNo,url} = values
            if(wechatUrl){
              wechatUrl = wechatUrl.map(item => {
                if(!item.url){
                  return {
                    url: item.response.result.url
                  }
                }else{
                  return item
                }
              })
            const qrurl = wechatUrl[0].url
            if(this.btnType === 'add'){
              this.addData(name,wechatNo,qrurl,url)
            } else {
              this.modifyData(name,wechatNo,qrurl,url)
            }
          }}
        });
      },
      async delFn({id}){
        const {data} = await delSingleWechatProduct({id})
        if(data.code === 0){
          this.getData()
        }else{
          this.$message.warning(data.message);
        }
      },
      handleChange(value) {
          console.log(`selected ${value}`);
      },
      handleFormLayoutChange(e) {
          this.formLayout = e.target.value;
      },
      fn(text){
          return  moment(text).format('YYYY MM DD--h:mm:ss')
      },
      async handleAdd(r,type){
        this.visible = !this.visible
        this.btnType = type;
        this.actionType = type;
        if(type === 'add'){
          this.form.setFieldsValue({
            name:undefined,
            wechatNo: undefined,
            url: undefined,
            wechatUrl:[]
          })
          return
        }
        //保存id
        this.id = r.id;
        const {data} = await getSingleWechatProduct({
          id: r.id
        })
        if(data.code === 0){
          const rsData = data.result.data[0]
          this.$nextTick(()=>{
            this.form.setFieldsValue({
                name:rsData.name,
                wechatNo: rsData.wechatNo,
                url: rsData.url,
                wechatUrl:[{
                  "uid": rsData.id,
                  "name": 'xx.png',
                  "url": rsData.wechatUrl,
                }]
              })
          })
        }else{
          this.$message.warning(data.message);
        }
      },
      normFile(e) {
          if (Array.isArray(e)) {
              return e;
          }
          return e && e.fileList;
      },
    },
  };
  </script>