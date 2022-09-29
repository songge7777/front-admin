<template>
    <div class="statis-wrap">
        <div class="extra-wrap mb20" slot="tabBarExtraContent">
            <div class="extra-item">
                <a>今日</a>
                <a>本周</a>
                <a>本月</a>
                <a>今年</a>
            </div>
        </div>
        <div class="search-wrap mb20">
            <a-range-picker :style="{ width: '256px' }"></a-range-picker>
            <a-button type="primary">搜索</a-button>
        </div>
        <div class="qr-wrap mb20">
            <div class="qr-title">二维码复制次数</div>
            <a-table :columns="columns" :data-source="data">
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex === 'wechatNo'">
                        <a>{{ text }}</a>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>
<script>
import {
	wechatQrAnalysis
} from '@/services/user';
export default {
    name: 'statistics',
    i18n: require('/src/pages/dashboard/analysis/i18n.js'),
    data() {
        return {
            value1: 'lucy',
						// 分页
						pageSize:10,
						pageNumber:1,
						total:0,
            columns: [
                {
                    title: '微信号码',
                    dataIndex: 'wechatNo',
                    key: 'wechatNo',
                },
                {
                    title: '复制次数',
                    dataIndex: 'copyCount',
                    key: 'copyCount',
                },
                {
                    title: '访问次数',
                    dataIndex: 'browseCount',
                    key: 'browseCount',
                    ellipsis: true,
                },
            ],
            data: [],
        }
    },
    mounted() {
			this.getData();
    },
    methods: {
			focus() { },
			handleChange() { },
			async getData(){
				const {data} = await wechatQrAnalysis()
				if(data.code === 0){
					const rs = data.result;
					this.pageSize=rs.pageSize,
					this.pageNumber=rs.pageNumber,
					this.total=rs.total,
					this.data = rs.data.map(item => ({...item,key:item.id}))
					console.log('==>1',rs)
				}else{
					this.$message.warning(data.message);
				}
			}
    },

}
</script>

<style scoped lang="less">
.statis-wrap {
    padding: 20px 0 0 0;

    .mb20 {
        margin-bottom: 20px;
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
    .search-wrap {
        .ant-calendar-picker {
            margin: 0 10px 0 10px;
        }
    }
    .qr-wrap {
        min-height: 150px;
        background: #fff;

        .qr-title {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #f0f0f0;
            padding: 0 24px;
            color: rgba(0, 0, 0, 0.85);
            font-size: 16px;
        }

        .qr-table-1,
        .qr-table-2 {
            display: flex;

            .one-table {
                width: 39%;
            }

            .two-table {
                width: 59%;
            }

            .one-table {
                margin-right: 30px;
            }

        }

    }

}

@media screen and (max-width: 992px) {
    .extra-wrap .extra-item {
        display: none;
    }
}
</style>