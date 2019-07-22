# AJ-Card-List

基于js，jquery的卡片列表插件，类似购物网站搜索结果的效果。
卡片内容：独立模块+多行内容模块，独立模块为大图或图标。
卡片结构（独立模块与多行内容模块分布方式）：“上下分布”或“左右分布”。

## 引用
```html
<link rel="stylesheet" type="text/css" href="css/AJ-Card-List.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/AJ-Card-List.js"></script>
```

## 调用

```JavaScript
var myList = new AjCardList(opt) //定义列表对象
```
```JavaScript
myList.init(rowSet, cardData) //生成列表
```

## 参数

#### opt的默认设置

```JavaScript
{
  id: '',
  colNum: 4, // 一行显示几张卡片
  colPadding: 15, // 卡片间距
  linePadding: 15, // 卡片行间距
  layout: 'TB', // 图片和内容的分页结构，左右LR，上下TB
  noDataText: '暂无数据', // 无数据时表身区域的显示内容，支持自定义html片断
  customCardClass: '', // 卡片div的自定义类名
  // 卡片样式
  style: { 
    bgColor: '', // 背景颜色
    borderWidth: '', // 边框宽度
    borderColor: '', // 边框颜色
    shadowColor: '', // 阴影颜色
    shadowWidth: '', // 阴影宽度
    padding: '' // 内部边距
  },
  // 回调函数
  callback: {
    btnClick: null, // 按钮点击事件
    over: null // 列表加载完成
  }
}
```

#### 卡片行设置rowSet

结构为对象数组，示例：
```JavaScript
let rowSet = [
  { key: 'photo', label: '', type: 'img', align: 'center', imgW: '40px', imgH: '80px', isBlock: true, width: '40%', verticleAlign: 'middle' },
  { key: 'logo', label: '', type: 'icon', align: 'left', fontSize: 40, isBlock: true, width: '50px', verticleAlign: 'top', color: 'red' },
  //以上两种独立模块只可二选一，如设置两个独立模块只会有一个生效
  { key: 'id', label: 'ID：', type: 'text', align: 'left', color: '', isBold: true, textIndent: '', fontSize: 14 },
  { key: 'name', label: '名称：', type: 'text', align: 'left', color: '', isBold: true, textIndent: '1em', fontSize: 12 },
  { key: '', label: '', type: 'html', align: 'left', htmlCode: '<span>自定义HTML片断</span>' },
  { key: '', label: '', type: 'button', align: 'right', btns: testBtn }
]
let testBtn = [
  { key: 'donwload', label: '下载', iconClass: 'iconfont icon-download' },
  { key: 'delete', label: '删除', iconClass: 'iconfont icon-shanchu' }
]
```
- key：{String}，行唯一标识，信息数据分发的依据，并会加入该行内容的class中；自定义HTML和按钮行可不设置，插件会生成默认格式key
- label：{String}，行信息的前置文字
- type：{String}，内容数据格式，'img'图片，'icon'字体图标，'text'文字，'button'按钮，'html'自定义HTML片断
- align：{String}，行内容对齐方式
- color：{String}，文字或图标内容颜色
- fontSize：{Number/String}，文字或图标内容字号
- isBold：{Boolean}，文字或图标内容是否加粗，true为加粗
- textIndent：{String}，文字内容首行缩进，如“15px”，“2em”
- imgW，imgH：{String}，图片宽、高，格式为"数值+单位"，如"20px"（仅当type为'img'时有效）
- btns：{Array}，按钮设置（仅当type为'button'时有效），示例"[{key: '按钮唯一标识（不可为空）', label: '按钮文字', iconClass: '按钮文字前的icon的类名（可为空）'}]"
- htmlCode：{String}，HTML片断（仅当type为'html'时有效）
- isBlock：{Boolean}，值为true设置图片或图标为卡片独立模块（仅当type为'img'或'icon'时有效）
- width：{String}，独立模块宽度，如“40%”，“60px”（仅当opt.layout为'LR'时有效）
- verticleAlign：{String}，独立模块内容垂直对齐方式，'top'、'middle'、'bottom'可选（仅当opt.layout为'LR'时有效）

#### 卡片数据cardData

结构为对象数组，示例：
```JavaScript
var cardData = [
  { id: '021917205', logo: 'iconfont icon-download', name: '城西抢劫案', photo: 'https://pic.xiami.net/images/artistlogo/60/13751627012360.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917206', logo: 'iconfont icon-shanchu', name: '城东盗窃案', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039605_405E.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' }
]
```
