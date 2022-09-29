# 接口整理

## 登录
- url: '/login'
```ts
name:string
password:string
```

## 注册
- url: '/register'
```ts
name:string
password:stringNN
confirmPassword:string
mobie: string
```

## 退出
- url: '/logout'
```ts

```
## 实时数据- 流量分析
- 默认都是当日,近三天的(以及总数)
```js
// 获取当前人数情况
// 查询条件
// 浏览多少s才算有效 默认0s
spaceTime
// 浏览时候 停留时间
stop
// 滑动 停留切换 次数 记录 type:scroll_time 的次数
scrollToSwith 
--------------------------------------------------------
// 返回数据
getPeople:
    {
        // 在线人数  type:start_time 大于  type:end_time时间(可以没有) 并且 ( type stop_time 小于20分钟)
        onlinePeople   
        // 最近一个小时
        latelyHour
        // 今日uv: 今日的 同一个 id 访问 (type:start_time 有这个数据上报)
        toDayUv  
        // 总数uv: 所有的 同一个 id 访问 (type:start_time 有这个数据上报)
        totalUv
    }
    // 流量整体分析
getTimeAnalysis:
    [
        {
            // 小于10秒
            tyep:'lessOne',
            num,
            ratio,
        },
        {
            // 10秒-20秒
            tyep:'lessTwo',
            num,
            ratio,
        },
        {
            // 20-50秒
            tyep:'lessThree',
            num,
            ratio,
        },
        {
            // 50-100秒
            tyep:'lessFrour',
            num,
            ratio,
        },
        {
            // 100-200秒
            tyep:'lessFive',
            num,
            ratio,
        },
        {
            // 200秒以上
            tyep:'lessSix',
            num,
            ratio,
        },
    ]
    // 最近三天的复制数据  (0-23h)
 threeCopydata:{
    oneDay:[],// 24个数据(每小时)
    twoDay:[],// 24个数据(每小时)
    threeDay:[],// 24个数据(每小时)
 },   
    // 最近三天的访问数据  (0-23h)
 threePvdata:[
    oneDay:[],// 24个数据(每小时)
    twoDay:[],// 24个数据(每小时)
    threeDay:[],// 24个数据(每小时)
 ],   
```

## 分页查询识别微信号码统计
```js
// 查询条件 
// 开始时间 结束时间
startTime
endTime
// 选择微信号
wxNumber
// 访问时间
visitorTime
// 停留滑动比
ratio      (type stop_time 等待的所有时间/当前所有的浏览时间)  浏览时间分2种 第一是如果有end_time（type end_time - type start_time） 第二种 否则就是用当但id上报的最有一个时间 减去（type start_time）
----------------------------------------
// 分页返回数据
id 
ip
time
wxNumber
// 停留时间 所有的 type stop_time 时间
stopTime 
// 停留滑动比  同上
ratio
url

// 返回总数
// 操作  可删除当前数据
```

## 产品分页
- 添加/编辑
- 删除
```js
// 产品名字
name
// 图片地址  图片上传
url
// 微信号码
name
```
列表
```js
// 随机给
id
// 产品名字
name
// 图片地址
url
// 微信号码
nunber
// 添加时间
time
```

## 上报逻辑---更新
```js
1、首次进入页面上报信息 
currentTime 当前时间
isWxBrowser 是否是微信浏览器
navigatorUserAgent 浏览器信息
wxNumber 微信号码
url 产品

2、一旦开始滑动 就开始上报数据 页面停止的时候
currentPageSite 当前滑动的比例位子(比如"3%")
currentTime 当前时间
isWxBrowser 是否是微信浏览器
navigatorUserAgent 浏览器信息
stopTime 当前停留的时间
wxNumber 微信号码
url 产品

3、页面滑动的时候 
currentPageSite 当前滑动的比例位子(比如"3%")
currentTime 当前时间
isWxBrowser 是否是微信浏览器
navigatorUserAgent 浏览器信息
wxNumber 微信号码
url 产品

4、二维码 长按识别
time 长按识别时间 700ms
wxNumber 微信号码
isWxBrowser 否是微信浏览器
navigatorUserAgent 浏览器信息
url 产品


5、页面离开的时候  浏览器关闭
currentPageSite 当前滑动的比例位子(比如"3%")
currentTime 当前时间
isWxBrowser 是否是微信浏览器
navigatorUserAgent 浏览器信息
wxNumber 微信号码
url 产品

6、微信号码动态获取
```