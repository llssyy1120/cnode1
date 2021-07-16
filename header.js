var Hleft = BI.inherit(BI.Widget, {
  render: function () {
    return {
      type: "bi.vertical_adapt",
      items: [{
        type: "bi.a",
        width: 125,
        height: 28,
        css: { display: "block" },
        el: {
          type: "bi.default",
          items: [{
            type: "bi.img",
            src: "https://static2.cnodejs.org/public/images/cnodejs_light.svg"
          }]
        },


      }, {
        type: "bi.search_editor",
        width: 233,
        height: 26,
        watermark: "",
        css: { borderColor: "#888888", borderRadius: "25px", color: "#666" },
        cls: "search",
      }],
      rgap: 20

    }
  }
})
BI.shortcut("header.left", Hleft);
var Hright = BI.inherit(BI.Widget, {
  render: function () {
    return {
      type: "bi.horizontal",
      verticalAlign: "middle",
      css: { fontSize: "14px" },
      items: [{
        type: "bi.a",
        el: {
          type: "bi.label",
          text: "首页",
          cls: "hright-text"
        },
        href: "http://www.fanruan.com"

      }, {
        type: "bi.a",
        el: {
          type: "bi.label",
          text: "新手入门",
          cls: "hright-text"
        },
        href: "http://www.fanruan.com"
      }, {
        type: "bi.a",
        el: {
          type: "bi.label",
          text: "API",
          cls: "hright-text"
        },
        href: "http://www.fanruan.com"
      },
      {
        type: "bi.a",
        el: {
          type: "bi.label",
          text: "关于",
          cls: "hright-text"
        },
        href: "http://www.fanruan.com"
      },
      {
        type: "bi.a",
        el: {
          type: "bi.label",
          text: "注册",
          cls: "hright-text"
        },
        href: "http://www.fanruan.com"
      },
      {
        type: "bi.a",
        el: {
          type: "bi.label",
          text: "登录",
          cls: "hright-text"
        },
        href: "http://www.fanruan.com"
      }

      ],
      height: 40,
      lgap: 15,
      rgap: 15,


    };
  }
});
BI.shortcut("header.right", Hright);
var Header = BI.inherit(BI.Widget, {
  render: function () {
    return {
      type: "bi.left_right_vertical_adapt",
      items: {
        left: [{
          type: "header.left",
          width: 500,

        }],
        right: [{
          type: "header.right",
        }]
      },


      llgap: 50,
      rrgap: 40,
      height: 50
    }
  }

})
BI.shortcut("header", Header);