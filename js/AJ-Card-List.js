let AjCardList = function (options) {
  let newObj = {
  }
  // 默认设置
  newObj.Opt = {
    id: '',
    fixTableWidth: true, // 表格总宽度，自适应或者等于显示区域
    noTh: false, // 不使用表头
    fixTh: true, // 表头固定
    fixFirstCol: false, // 固定首列
    fixLastCol: false, // 固定尾列
    multiSelect: false, // 可多选
    multiSelColWidth: 40, // 多选列宽
    sortKey: '',
    sortType: '',
    noDataText: '暂无数据',
    callback: {
      sort: null,
      multiSelect: null,
      editOver: null,
      btnClick: null,
      switchOver: null,
      over: null
    }
  }
  return newObj
}
