let testBtn = [
  { key: 'donwload', label: '下载', iconClass: 'iconfont icon-download' },
  // { key: 'edit', label: '编辑', iconClass: 'iconfont icon-xiugai1' },
  { key: 'delete', label: '删除', iconClass: 'iconfont icon-shanchu' }
]
let rowSet = [
  { key: 'photo', label: '', type: 'img', align: 'center', imgW: '40px', imgH: '80px', isBlock: true, width: '40%', verticleAlign: 'middle' },
  { key: 'id', label: 'ID：', type: 'text', align: 'left', color: '', isBold: true, textIndent: 0, fontSize: 14 },
  { key: 'name', label: '名称：', type: 'text', align: 'left', color: '', isBold: true, textIndent: 0, fontSize: 12 },
  // { key: 'link', label: '链接：', type: 'link', src: '', align: 'left', color: '', isBold: true, textIndent: 0, fontSize: 12 },
  { key: '', label: '', type: 'html', align: 'left', htmlCode: '<span>自定义HTML片断</span>' },
  { key: '', label: '', type: 'button', align: 'right', btns: testBtn }
]
let cardData = [
  { id: '021917205', name: '城西抢劫案城西抢劫案城西抢劫案', link: 'https://element.eleme.cn/', photo: 'https://pic.xiami.net/images/artistlogo/60/13751627012360.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917206', name: '城东盗窃案', link: 'http://doc.vue-js.com/v2/guide/', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039605_405E.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917207', name: '声明式渲染', link: 'https://www.xiami.com/', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039645_Qy82.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917208', name: '条件与循环', link: 'https://www.ifeng.com/', photo: 'https://pic.xiami.net/images/artistlogo/60/13751627012360.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917209', name: '处理用户输入', link: 'https://github.com/', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039605_405E.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917200', name: '用组件构建（应用）', link: 'https://www.baidu.com/', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039645_Qy82.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917201', name: '与自定义元素的关系', link: 'https://www.hao123.com/', photo: 'https://pic.xiami.net/images/artistlogo/60/13751627012360.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917202', name: '表单控件绑定', link: 'http://www.sohu.com/', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039605_405E.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' },
  { id: '021917203', name: 'Render 函数', link: 'https://www.163.com/', photo: 'https://pic.xiami.net/images/artistpic/24/23424/1247039645_Qy82.jpg?x-oss-process=image/resize,s_370,m_fill/quality,q_80' }
]
let opt = {
  id: 'app',
  colNum: 3, // 一行显示几张卡片
  colPadding: 15, // 卡片间距
  linePadding: 15, // 卡片行间距
  layout: 'LR', // 图片和内容的分页结构，左右LR，上下TB
  noDataText: '暂无数据',
  customCardClass: '',
  scrollBarWidth: 0,
  style: {
    bgColor: '',
    borderWidth: '',
    borderColor: '',
    shadowColor: '',
    shadowWidth: '',
    padding: ''
  },
  callback: {
    btnClick: function (data) {
      console.log(data)
    },
    over: function (data) {
      console.log('卡片列表加载完毕')
    }
  }

}
