/**
 * Created by tongyunong on 2015/11/16.对jquery.ui的Tabs标签页进行了封装
 */

TabsUtils = function(){}

TabsUtils.openTabs = function(responseData,requestData) {
    var title = requestData.showName;
    var id = requestData.menuId;
    var zone=requestData.showZone;
    var tabs = $('#' + zone).tabs();

    var existing = tabs.find("div#" + id);
    //如果没有标签页，创建并激活
    if (existing.length == 0) {
        __createNewSubTbas(tabs,zone,id,title,responseData);
    }
    //否则定位到对应ID的tab页
    else {
        __activeSubTbasById(tabs,id);
    }

    //关闭图标：当点击时移除标签页
    __bindTabsCloseEvent(tabs);
}

//获取当前激活的标签页的index
TabsUtils.getActiveTabindex = function(tabs){
    return tabs.tabs('option', 'active');
}

//获取当前激活标签页对象
TabsUtils.getActiveTabobj = function() {
    var tabs = $('#rightcontent2').tabs();
    var activeSubTabIndex = TabsUtils.getActiveTabindex(tabs);
    var activeSubTabObj = tabs.find('.subTabs').eq(activeSubTabIndex);
    tabs.tabs("refresh");
    return activeSubTabObj;
}
//create new sub tab 创建标签页并激活
var num=0;
function __createNewSubTbas(tabs,zone,id,title,content){
    num++;
    //如果没有标签页，创建并激活
    var li = "<li class='.'"+id+"><a href=#" + id + ">" + title + "</a> <span class='ui-icon ui-icon-close' role='presentation'>移除标签页</span></li>";
    if(num>=2){
        $(window.document).find('#' + zone).append("<div class='subTabs' style='margin-top:42' id='" + id + "'>" + content + "</div>");

    }else{
        $(window.document).find('#' + zone).append("<div class='subTabs'  id='" + id + "'>" + content + "</div>");
    }

    $(window.document).find("#mainTab").append(li);
    tabs.tabs("refresh");
    tabs.tabs('option', 'active', $('#' + zone).find('.subTabs').length - 1); // 激活第三个标签
    tabs.tabs("refresh");
}

// 如果存在，标签页并激活
function __activeSubTbasById(tabs,id){
    var currentDiv = tabs.find('div#' + id);
    var index = tabs.find('.subTabs').index(currentDiv);
    tabs.tabs('option', 'active', index); // 激活id对应的标签页
    tabs.tabs("refresh");
}


//绑定关闭标签页事件
function __bindTabsCloseEvent(tabs){
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });
}