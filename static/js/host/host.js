// 封装动态域名

exports.install = function (Vue, options) {
    Vue.prototype.changeData = function () {
      var curWwwPath = window.document.location.href;    //  http://localhost:8080/abc-cloud/
      var pathName = window.document.location.pathname;   //  /abc-cloud/
      var hostname = window.document.location.hostname;  //localhost
      var protocol = window.document.location.protocol;   //http:
      var pos = curWwwPath.indexOf(pathName);
      var localhostPatht = curWwwPath.substring(0, pos);   //  http://localhost:8080
      var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1) //   /abc-cloud
      // alert(curWwwPath+'------'+pathName+'------'+localhostPatht+'--------'+projectName+'----------'+hostname+'-------'+protocol);

      // return "http://192.168.1.139:8080"; // 本地测式地址
      // return "http://test-api.zpb.youpuchina.com"; // 租铺宝重构测试地址
      return "http://api.zpb.youpuchina.com"; // 租铺宝重构正式地址

    }
};