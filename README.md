# AJ-Card-List

基于js，jquery的卡片列表插件，卡片结构，类似购物网站搜索结果的图片列表。

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
{}
```

#### 卡片行设置rowSet

结构为对象数组，示例：
```JavaScript
var rowSet = []
```
#### 卡片数据cardData

结构为对象数组，示例：
```JavaScript
var cardData = []
```
