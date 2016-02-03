/**
 * Created by tongyunong on 2015/11/16.��jquery.ui��Tabs��ǩҳ�����˷�װ
 */

TabsUtils = function(){}

TabsUtils.openTabs = function(responseData,requestData) {
    var title = requestData.showName;
    var id = requestData.menuId;
    var zone=requestData.showZone;
    var tabs = $('#' + zone).tabs();

    var existing = tabs.find("div#" + id);
    //���û�б�ǩҳ������������
    if (existing.length == 0) {
        __createNewSubTbas(tabs,zone,id,title,responseData);
    }
    //����λ����ӦID��tabҳ
    else {
        __activeSubTbasById(tabs,id);
    }

    //�ر�ͼ�꣺�����ʱ�Ƴ���ǩҳ
    __bindTabsCloseEvent(tabs);
}

//��ȡ��ǰ����ı�ǩҳ��index
TabsUtils.getActiveTabindex = function(tabs){
    return tabs.tabs('option', 'active');
}

//��ȡ��ǰ�����ǩҳ����
TabsUtils.getActiveTabobj = function() {
    var tabs = $('#rightcontent2').tabs();
    var activeSubTabIndex = TabsUtils.getActiveTabindex(tabs);
    var activeSubTabObj = tabs.find('.subTabs').eq(activeSubTabIndex);
    tabs.tabs("refresh");
    return activeSubTabObj;
}
//create new sub tab ������ǩҳ������
var num=0;
function __createNewSubTbas(tabs,zone,id,title,content){
    num++;
    //���û�б�ǩҳ������������
    var li = "<li class='.'"+id+"><a href=#" + id + ">" + title + "</a> <span class='ui-icon ui-icon-close' role='presentation'>�Ƴ���ǩҳ</span></li>";
    if(num>=2){
        $(window.document).find('#' + zone).append("<div class='subTabs' style='margin-top:42' id='" + id + "'>" + content + "</div>");

    }else{
        $(window.document).find('#' + zone).append("<div class='subTabs'  id='" + id + "'>" + content + "</div>");
    }

    $(window.document).find("#mainTab").append(li);
    tabs.tabs("refresh");
    tabs.tabs('option', 'active', $('#' + zone).find('.subTabs').length - 1); // �����������ǩ
    tabs.tabs("refresh");
}

// ������ڣ���ǩҳ������
function __activeSubTbasById(tabs,id){
    var currentDiv = tabs.find('div#' + id);
    var index = tabs.find('.subTabs').index(currentDiv);
    tabs.tabs('option', 'active', index); // ����id��Ӧ�ı�ǩҳ
    tabs.tabs("refresh");
}


//�󶨹رձ�ǩҳ�¼�
function __bindTabsCloseEvent(tabs){
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });
}