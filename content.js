
// 时间格式转换
var formDate=function (dateForm){
  if (dateForm === ""){
    return "";
  }else{
    var dateee = new Date(dateForm).toJSON();
    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    return date
  }
}
// 计算时间差
var countTime = function(time){
  var nowtime = new Date();
  var oldtime = time;
  var gaptime = nowtime.getTime()-new Date(oldtime).getTime();
  // 计算天、小时、分钟、秒
  var days = Math.floor(gaptime/(24*3600*1000))
  var leave1 = gaptime%(24*3600*1000)
  var hours = Math.floor(leave1/(3600*1000))
  var leave2 = leave1%(3600*1000)
  var minutes = Math.floor(leave2/(60*1000))
  var leave3 = leave2%(60*1000)
  var seconds = Math.round(leave3/1000)

  // 计算年、月
  var years = Math.floor(days/365)
  var months = Math.floor(days/30)
  if(years==0){
    if(months == 0){
      if (days == 0 ){
        if(hours==0){
          if(minutes==0){
            if(seconds==0){
              return "现在"
            }else{
              return seconds+"秒前"
            }
          }else{
            return minutes+"分钟前"
          }
        }else{
          return hours+"小时前"
        }
      }else{
        return days+"天前"
      }
    }else{
      return months+"月前"
    }
  }else{
    return years+"年前"
  }

}
// 获取主页的主题
var getinfo = function(page,sort){
  var info =[];
  var that= this;
  if(sort==0){
    $.ajax({
      url: " https://cnodejs.org/api/v1/topics",
      type: "get",
      data:{
        page:page
      },
      async : false,
      success: function(data){
        var info = data.data
        that.info = info
      }
      
    }
    ); 
  }else{
    if(sort==1){var tab = "good"}
    if(sort==2){var tab = "share"}
    if(sort==3){var tab = "ask"}
    if(sort==4){var tab = "job"}
    $.ajax({
      url: " https://cnodejs.org/api/v1/topics",
      type: "get",
      data:{
        page:page,
        tab:tab
      },
      async : false,
      success: function(data){
        var info = data.data
        that.info = info
      }
      
    }
    );
  }
  
  return this.info
}
// 获取主题最后一个回复的用户头像
var getReplyAva = function(id){
  var ava = 0
  var that = this
  $.ajax({
    url: " https://cnodejs.org/api/v1/topic/"+id,
    type: "get",
    async : false,
    success: function(data){
      var replies = data.data.replies
      if(replies.length == 0){
        that.ava=''
      }else{
        that.ava = replies[replies.length-1].author.avatar_url
      }
      
    }  
  } 
  ); return this.ava
}

var Tab = BI.inherit(BI.Widget, {
  render: function () {
    return {
      type: "bi.button_group",
      ref: function (_ref) {
        group = _ref;
      },
      value: 0,
      cls: "tab",
      height: 50,
      items: [ {
        el:{
        type: "bi.text_button",
        text: "全部",
        value: 0,
        cls: "bi-list-item-active",
        lgap:2,
        rgap:2,
        },
        
        lgap:10
      },{
        el:{
        type: "bi.text_button",
        text: "精华",
        value: 1,
        cls: "bi-list-item-active",
        lgap:2,
        rgap:2,
        },
        
        lgap:10
      },{
        el:{
        type: "bi.text_button",
        text: "分享",
        value: 2,
        cls: "bi-list-item-active",
        lgap:2,
        rgap:2,
        },
        
        lgap:10
      },
      {
        el:{
        type: "bi.text_button",
        text: "问答",
        value: 3,
        cls: "bi-list-item-active",
        lgap:2,
        rgap:2,
        },
        
        lgap:10
      },
      {
        el:{
        type: "bi.text_button",
        text: "招聘",
        value: 4,
        cls: "bi-list-item-active",
        lgap:2,
        rgap:2,
        },
        
        lgap:10
      },
      {
        el:{
        type: "bi.text_button",
        text: "客户端测试",
        value: 5,
        cls: "bi-list-item-active",
        lgap:2,
        rgap:2,
        },
        
        lgap:10
      }
      ],
      listeners: [{
        eventName: "EVENT_CHANGE",
        action: function () {
          console.log(group.getValue()[0]);
          sort = group.getValue()[0];
            list.reset()
        }
      }],
      layouts: [{
        type: "bi.vertical_adapt"
      }]


    }
  }
})
BI.shortcut("content-tab", Tab)
// 单个主题展示
var CReplyAva = BI.inherit(BI.Widget,{
  render:function(){
    return{
      type:"bi.image",
      src:replyava,
      cls:"content-reply-ava"
    }
    
  }
  
})
BI.shortcut("content-replyava",CReplyAva)
var CItem = BI.inherit(BI.Widget,{
  props:{
     info:""
  },
    render:function(){  
      var test = this.options.info
      var tag
      var time = countTime(test.last_reply_at)
      var replyava = getReplyAva(test.id) 
     
     if(replyava==""){
       var testel={
         type:"bi.label",
         width:18,
         height:18
       }
     }else{
        var testel={
        type:"bi.img",
        src:replyava,
        width:18,
        cls:"content-reply-ava"
      }
     }
      if(test.top==true){
        tag="置顶",
        cls="content-tag-green"
      }else if(test.good==true){
        tag="精华",
        cls="content-tag-green"
      }else if(test.tab=="share"&&sort!=2){
        tag="分享",
        cls="content-tag-grey"
      }else if(test.tab=="job"&&sort!=4){
        tag="招聘",
        cls="content-tag-grey"
      }else if(test.tab=="ask"&&sort!=3){
        tag="问答",
        cls="content-tag-grey"
      }else{
        cls="content-tag-none"
      }
      
      return{
         type: "bi.left_right_vertical_adapt",
         cls:"content-item",
         height:50,
        items:{
          left:[{
            type:"bi.horizontal",
            items:[{
              el:{
                type:"bi.img",
                src:test.author.avatar_url,
                width:30,
                cls:"content-avatar",
                height:30
              },
              lgap:10,
              rgap:5
            },{
              type:"bi.horizontal_float",
              width:70,
              
              items:[
                {
                  type:"bi.horizontal",
                  items:[ {
                    
                      type:"bi.text",
                      text:test.reply_count,
                      cls:"content-reply-count",  
                      height:30           
                   
                   
                  }, {
                      type:"bi.text",
                      text:"/",
                      height:30
                    },
                   
                      
                  {
                    
                       type:"bi.text",
                       text:test.visit_count,
                       cls:"content-visit-count",
                       height:30
                    
                     
                   }]
                }
            ]
            },{
              el:{
                type:"bi.text",
                text:tag,
                cls:cls,
                hgap:3,
                vgap:2
              },
              tgap:2,
              lgap:5
            },
            ,{
              el:{
                type:"bi.text",
                text:test.title,
                cls:"content-title",
                title:test.title,
                height:30,
                maxWidth:570,
                whiteSpace:"nowrap"
              },
              lgap:5
            }]
          }],
          right:[{
             type:"bi.right",
             width:93,
             items:[{
               el:{
                 type:"bi.text",
                 text:time,
                 cls:"content-time",
                 width:50,
                 textAlign:"right"
               },
               rgap:10,
               lgap:5
             },
             {
              el:testel
              
            },
            ]
          }]
        }
      }
    }
})
BI.shortcut("content-item",CItem)
// 主题列表

var CItems = BI.inherit(BI.Widget,{
  props:{
     page:1,
     sort:0
  },
  render:function(){
    
    var info = getinfo(page,sort);
    var items=[];
    for(var i = 0;i<info.length;i++){
       items[i]={
       type:"content-item",
       info:info[i]
  }
}
    return{
      type:"bi.vertical",
      cls:"content-items",
      items:items
    }
  }
 
})
var page = 1;
var sort = 0;
var list;
BI.shortcut("content-items",CItems)
var Content = BI.inherit(BI.Widget, {
  render: function () {
    return {
      type: "bi.horizontal",
      css: { backgroundColor: "#eee" },
      items: [{
        el:{
          type: "bi.vertical",
          css: { width: "832px" ,backgroundColor:"#ffffff"},
          items: [{
            type:"content-tab",
            css: { width: "832px" },
          },
        {
          type:"content-items",
          ref: function(_ref) {
            list = _ref;
        },
          page:page,
          sort:sort
        },{
          type:"bi.pager",
          cls:"content-pager",
          dynamicShow: false,    
          dynamicShowPrevNext:false,
          border:true,
          height: 50,
          pages:15,
          groups: 5,
          curr: 1,
          first: "<<",
          last: ">>",
          prev:"",
          next:"",
          tgap:10,
          listeners: [{
            eventName: "EVENT_CHANGE",
            action: function () {
               page = this.getCurrentPage();
               list.reset()
            }
          }],
        }]
        },
        lgap: 40,
      },],
      tgap: 40,
      bgap: 20
    }
  }
})
BI.shortcut("content", Content);

// 获取数据

