let AjCardList = function (options) {
  let newObj = {
    box: null,
    con: null,
    cards: null,
    rowSet: [],
    cardData: [],
    option: {},
    noDataFlag: false,
    blockItem: {},
    scrollBarWidth: 0,
    shadowWidth: 0,
    myInterval: {},
    init (rowSet, cardData) {
      if (!this.utils.checkNull(cardData)) {
        this.addNoDataText()
        return
      }
      this.option = this.utils.mergeObjectDeep(this.Opt, options)
      this.scrollBarWidth = this.utils.getScrollWidth()
      this.rowSet = rowSet
      this.cardData = cardData
      this.addRowKey()
      this.separateBlockItem()
      this.box = $('#' + this.option.id)
      this.box.find('.aj-card-box').remove()
      this.createHtml()
      this.displayListener()
    },
    // 为没有key的列设置key，并检测独立模块
    addRowKey () {
      let num = 0
      this.rowSet.forEach(row => {
        if (!this.utils.checkNull(row.key)) {
          row.key = 'row-class-' + num
          num++
        }
      })
    },
    // 分离独立模块的行设置，并补全独立模块必设属性
    separateBlockItem () {
      let index = -1
      this.rowSet.forEach((row, i) => {
        if (row.isBlock && index === -1) {
          this.blockItem = this.utils.deepCopy(row)
          index = i
        }
      })
      if (index !== -1) {
        this.rowSet.splice(index, 1)
      }
      this.blockItem.width = this.utils.checkNull(this.blockItem.width) ? this.blockItem.width : '40%'
      this.blockItem.verticleAlign = this.utils.checkNull(this.blockItem.verticleAlign) ? this.blockItem.verticleAlign : 'middle'
    },
    // 生成html
    createHtml () {
      let htmlCard = ''
      this.cardData.forEach((item, index) => {
        let td = '<td ' + this.getTdStyle(index) + '>' + this.createCard(item, index) + '</td>'
        switch (index % this.option.colNum) {
        case 0:
          htmlCard += '<tr>' + td
          break
        case (this.option.colNum - 1):
          htmlCard += td + '</tr>'
          break
        default:
          htmlCard += td
        }
      })
      // 预留显示卡片shadow的宽度
      let str = ''
      if (this.option.style.shadowColor.length && this.option.style.shadowWidth.length) {
        str = 'style="padding:' + this.option.style.shadowWidth + 'px;"'
        this.shadowWidth = this.option.style.shadowWidth
      }
      let html = '<div class="aj-card-box" ' + str + '><table class="aj-card-table" cellpadding="0" cellspacing="0" border="0"><tbody>' + htmlCard + '</tbody></table></div>'
      this.box.append(html)
      this.con = this.box.find('.aj-card-box')
      this.cards = this.box.find('.aj-card-cell')
      this.bindEvent()
    },
    // 获取td样式
    getTdStyle (index) {
      let style = 'style="padding-bottom:' + this.option.linePadding + 'px;'
      if (index % this.option.colNum !== this.option.colNum - 1) {
        style += 'padding-right:' + this.option.colPadding + 'px;'
      }
      style += '"'
      return style
    },
    // 生成卡片
    createCard (item, index) {
      let flag = this.utils.checkNull(this.blockItem)
      let blockStyle = flag ? ('style="text-align:' + (this.blockItem.align || 'center') + ';width:' + this.blockItem.width + ';"') : ''
      let html = '<div class="aj-card-cell ' + this.option.customCardClass + (this.option.isCardClick ? ' aj-card-click' : '') + '" ' + this.getCardStyle(index) + ' data-index="' + index + '">'
      if (this.option.layout === 'TB') {
        html += flag ? ('<div class="aj-card-block block top ' + this.blockItem.key + '" ' + blockStyle + '>' + this.addBlockItem(item) + '</div>') : ''
        html += '<div class="aj-card-block bottom">' + this.addContent(item, index) + '</div>'
      } else {
        html += flag ? ('<div class="aj-card-block block left ' + this.blockItem.key + '" ' + blockStyle + '>' + this.addBlockItem(item) + '</div>') : ''
        html += '<div class="aj-card-block' + (flag ? ' right' : '') + '">' + this.addContent(item, index) + '</div>'
      }
      html += '</div>'
      return html
    },
    // 获取卡片样式
    getCardStyle (index) {
      let style = this.option.style
      let html = 'background-color:' + style.bgColor + ';' +
                 'border-width:' + style.borderWidth + 'px;' +
                 'border-color:' + style.borderColor + ';'
      if (style.shadowColor.length && style.shadowWidth.length) {
        html += 'box-shadow: 0 0 ' + style.shadowWidth + 'px ' + style.shadowColor + ';'
      }
      if (this.option.isCardClick) {
        html += 'cursor:pointer;'
      }
      return 'style="' + html + '"'
    },
    // 添加独立模块
    addBlockItem (data) {
      let type = this.blockItem.type
      if (type === 'img') {
        let src = data[this.blockItem.key]
        let css = 'width:' + (this.blockItem.imgW || '') + ';' +
                  'height:' + (this.blockItem.imgH || '') + ';'
        let attr = 'class="aj-card-block-img ' + this.blockItem.key + '"' +
                  'src="' + src + '"' +
                  'alt="' + this.blockItem.label + '"' +
                  'style="' + css + '"'
        return '<img ' + attr + ' />'
      }
      if (type === 'icon') {
        let src = data[this.blockItem.key]
        let css = 'font-size:' + this.blockItem.fontSize + 'px;color:' + this.blockItem.color + ';'
        let attr = 'class="aj-card-block-icon ' + src + ' ' + this.blockItem.key + '"' +
                  'style="' + css + '"'
        return '<i ' + attr + '></i>'
      }
    },
    // 添加其他内容
    addContent (item, index) {
      let html = '<ul class="aj-card-ul">'
      this.rowSet.forEach(row => {
        html += '<li class="' + row.type + '-line ' + (row.isClick ? 'aj-text-click ' : '') + row.key + '" row-key="' + row.key + '" data-index="' + index + '" style="' + this.getLineStyle(row) + '">'
        switch (row.type) {
        case 'html':
          html += row.htmlCode
          break
        case 'button':
          row.btns.forEach(btn => {
            let attr = 'btn-key="' + btn.key + '" data-index="' + index + '"'
            html += '<button ' + attr + ' class="aj-card-btn ' + row.key + ' ' + btn.key + '">' +
                        '<i class="aj-card-btn-icon ' + btn.iconClass + '"></i>' +
                        btn.label +
                      '</button>'
          })
          break
        default:
          html += '<label>' + row.label + '</label>' + item[row.key]
        }
        html += '</li>'
      })
      html += '</ul>'
      return html
    },
    // 获取行样式
    getLineStyle (rowSet) {
      let style = 'color:' + rowSet.color + ';' +
                 'text-align:' + rowSet.align + ';' +
                 'font-size:' + rowSet.fontSize + 'px;' +
                 'font-weight:' + (rowSet.isBold ? 'bold' : 'nomal') + ';' +
                 'text-indent:' + rowSet.textIndent + ';' +
                 (rowSet.isUnderline ? 'text-decoration:underline;' : '') +
                 (rowSet.isClick ? 'cursor:pointer;' : '')
      return style
    },
    // ===================================================================
    // 绑定事件
    bindEvent () {
      this.cardClickEvent()
      this.textClickEvent()
      this.btnClickEvent()
    },
    // 卡片点击事件
    cardClickEvent () {
      let vm = this
      let target = this.box.find('.aj-card-click')
      target.unbind('click').click(function () {
        let index = $(this).attr('data-index')
        vm.option.callback.cardClick(vm.cardData[index])
      })
    },
    // 文字点击事件
    textClickEvent () {
      let vm = this
      let target = this.box.find('.aj-text-click')
      target.unbind('click').click(function () {
        let btn = $(this)
        let index = btn.attr('data-index')
        let obj = {
          key: btn.attr('row-key'),
          data: vm.cardData[index]
        }
        vm.option.callback.textClick(obj)
      })
    },
    // 按钮点击事件
    btnClickEvent () {
      let vm = this
      let target = this.box.find('.aj-card-btn')
      target.unbind('click').click(function () {
        let btn = $(this)
        let index = btn.attr('data-index')
        let obj = {
          key: btn.attr('btn-key'),
          data: vm.cardData[index]
        }
        vm.option.callback.btnClick(obj)
      })
    },
    // 列表或者父级模块由隐藏变为显示时调整显示效果
    displayListener () {
      let vm = this
      let panel = {}
      let boxs = this.box.parents()
      boxs.each(function () {
        if ($(this).css('display') === 'none' && !vm.utils.checkNull(panel)) {
          panel = $(this)
        } else {
          return false
        }
      })
      if (this.box.css('display') === 'none') {
        this.myInterval[this.option.id + '2'] = setInterval(() => {
          if (this.box.css('display') !== 'none') {
            this.adjust()
            clearInterval(this.myInterval[this.option.id + '2'])
          }
        }, 10)
      } else if (this.utils.checkNull(panel)) {
        this.myInterval[this.option.id + '1'] = setInterval(() => {
          if (panel.css('display') !== 'none') {
            this.adjust()
            clearInterval(this.myInterval[this.option.id + '1'])
          }
        }, 10)
      } else {
        setTimeout(() => {
          this.adjust()
        }, 10)
      }
    },
    // 调整位置宽度等
    adjust () {
      let boxW = this.box.width()
      let boxH = this.box.height()
      let conH = this.con.outerHeight()
      if (conH >= boxH) {
        boxW -= this.scrollBarWidth
      }
      let cardsW = boxW - 2 * parseInt(this.shadowWidth) - (this.option.colNum - 1) * parseInt(this.option.colPadding)
      let cardW = Math.floor(cardsW / this.option.colNum)
      this.cards.css('width', cardW + 'px')
      setTimeout(() => {
        this.adjustLR()
        if (this.option.callback.over) {
          this.option.callback.over()
        }
      }, 10)
    },
    // 调整左右结构时的布局
    adjustLR () {
      if (this.option.layout === 'LR' && this.utils.checkNull(this.blockItem)) {
        let innerW = this.cards.eq(0).width()
        let leftW = this.blockItem.width.includes('%') ? (innerW * parseInt(this.blockItem.width) / 100) : parseInt(this.blockItem.width)
        let rightW = innerW - leftW - 8
        this.cards.find('.aj-card-block.left').css({ 'width': leftW + 'px', 'vertical-align': this.blockItem.verticleAlign })
        this.cards.find('.aj-card-block.right').css({ 'width': rightW + 'px', 'vertical-align': this.blockItem.verticleAlign })
      }
    }
  }
  // 工具方法
  newObj.utils = {
    // 获取滚动条宽度
    getScrollWidth () {
      let oDiv = document.createElement('DIV')
      oDiv.style.cssText = 'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;'
      let noScroll = document.body.appendChild(oDiv).clientWidth
      oDiv.style.overflowY = 'scroll'
      let scroll = oDiv.clientWidth
      document.body.removeChild(oDiv)
      return noScroll - scroll
    },
    // 合并
    mergeObjectDeep: function (defaultObj, originalObj) {
      let newObj = this.deepCopy(defaultObj)
      for (let i in defaultObj) {
        let dv = defaultObj[i]
        let ov = originalObj[i]
        if (this.isObjectObject(dv) && this.checkNull(ov)) {
          newObj[i] = this.mergeObjectDeep(dv, ov)
        } else {
          if (this.checkNull(ov)) {
            newObj[i] = this.deepCopy(ov)
          }
        }
      }
      return newObj
    },
    // 深拷贝
    deepCopy: function (source) {
      let sourceCopy = null
      if (this.isObjectObject(source)) {
        sourceCopy = {}
        for (let item in source) {
          sourceCopy[item] = this.deepCopy(source[item])
        }
      } else if (this.isArray(source)) {
        sourceCopy = []
        source.forEach(item => {
          sourceCopy.push(this.deepCopy(item))
        })
      } else {
        return source
      }
      return sourceCopy
    },
    // 类型判断
    isArray: function (obj) {
      return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
    },
    isObject: function (obj) {
      let type = typeof obj
      return (type === 'function' || type === 'object') && !!obj
    },
    isObjectObject: function (val) {
      return Object.prototype.toString.call(val) === '[object Object]'
    },
    isDate: function (val) {
      return Object.prototype.toString.call(val) === '[object Date]'
    },
    isFunction: function (val) {
      return Object.prototype.toString.call(val) === '[object Function]'
    },
    isString: function (val) {
      return Object.prototype.toString.call(val) === '[object String]'
    },
    isNumber: function (val) {
      return Object.prototype.toString.call(val) === '[object Number]'
    },
    // 空值校验
    checkNull: function (obj) {
      if (obj === null || obj === '' || obj === undefined) {
        return false
      } else if (JSON.stringify(obj) === '{}') {
        let a = false
        for (let i in obj) {
          a = true
        }
        return a
      } else if ((this.isString(obj) || this.isArray(obj)) && obj.length === 0) {
        return false
      } else {
        return true
      }
    }
  }
  // 默认设置
  newObj.Opt = {
    id: '',
    colNum: 4, //
    colPadding: 15, // 卡片间距
    linePadding: 15, // 卡片行间距
    layout: 'TB', // 图片和内容的分页结构，左右LR，上下TB
    noDataText: '暂无数据',
    customCardClass: '',
    isCardClick: false,
    style: {
      bgColor: '',
      borderWidth: '',
      borderColor: '',
      shadowColor: '',
      shadowWidth: '',
      padding: ''
    },
    callback: {
      cardClick: null,
      textClick: null,
      btnClick: null,
      over: null
    }
  }
  return newObj
}
