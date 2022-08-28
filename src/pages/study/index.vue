<template>
    <div>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 5 }" @submit="handleSubmit">
            <a-form-item label="Note1">
                <a-input v-decorator="['note', { rules: [{ required: true, message: '请输入账号' }] }]" />
            </a-form-item>
            <a-form-item label="Note">
                <a-input v-decorator="['password']" />
            </a-form-item>
            <a-form-item label="Note">
                <a-input v-decorator="['comfirmPassword', { rules: [{ required: true, message: '请确认密码' }] }]" />
            </a-form-item>
            <a-form-item label="Gender">
                <a-select v-decorator="[
                    'gender',
                    { rules: [{ required: true, message: 'Please select your gender!' }] },
                ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                    <a-select-option value="male">
                        male
                    </a-select-option>
                    <a-select-option value="female">
                        female
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Dragger">
                <a-upload name="file" v-decorator="[
                    'file',
                    { rules: [{ required: true, message: '请上传文件' }] },
                    {
                        valuePropName: 'fileList',
                    },
                ]" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                    <a-button>
                        <a-icon type="upload" /> Click to Upload
                    </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    Submit
                </a-button>
            </a-form-item>
        </a-form>
        <button @click="btn">获取</button>
        <input type="text" v-model="input">
        {{ input }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        };
    },
    mounted() {
        this.form.setFieldsValue({
            note: `Hi,`
        });
    },
    methods: {
        btn() {
            // 这里是form 取值
            console.log(this.form.getFieldValue('note'))
        },
        handleSubmit(e) {
            e.preventDefault();
            // 单个校验
            // this.form.validateFields(['note'], (err, values) => {
            // 默认校验所有
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        handleSelectChange(value) {
            console.log(value);
            // 这里是设置form 值
            // 
            this.form.setFieldsValue({
                note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
            });
        },
    },
};
</script>