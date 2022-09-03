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
            <a-select ref="select" v-model="value1" style="width: 120px" @focus="focus" @change="handleChange">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
            <a-range-picker :style="{ width: '256px' }"></a-range-picker>
            <a-button type="primary">统计此产品</a-button>
        </div>
        <div class="qr-wrap mb20">
            <div class="qr-title">渠道分析</div>
            <a-table :columns="columns" :data-source="data">
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex === 'name'">
                        <a>{{ text }}</a>
                    </template>
                </template>
            </a-table>
        </div>
        <div class="qr-wrap mb20">
            <div class="qr-title">按字段统计</div>
            <div class="qr-table-1">
                <a-table class="one-table" :columns="columns" :data-source="data">
                    <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'name'">
                            <a>{{ text }}</a>
                        </template>
                    </template>
                </a-table>
                <a-table class="two-table" :columns="columns" :data-source="data">
                    <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'name'">
                            <a>{{ text }}</a>
                        </template>
                    </template>
                </a-table>
            </div>
            <div class="qr-table-2">
                <a-table class="one-table" :columns="columns" :data-source="data">
                    <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'name'">
                            <a>{{ text }}</a>
                        </template>
                    </template>
                </a-table>
                <a-table class="two-table" :columns="columns" :data-source="data">
                    <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'name'">
                            <a>{{ text }}</a>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'statistics',
    i18n: require('/src/pages/dashboard/analysis/i18n.js'),
    data() {
        return {
            value1: 'lucy',
            columns: [
                {
                    title: '渠道码',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '复制次数',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '访问次数',
                    dataIndex: 'address',
                    key: 'address 1',
                    ellipsis: true,
                },
            ],
            data: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ],
        }
    },
    mounted() {

    },
    methods: {
        focus() { },
        handleChange() { }
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