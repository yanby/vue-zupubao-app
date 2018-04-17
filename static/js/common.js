function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.href.substr(1).match(reg);
  console.log(r);
  if (r != null) return unescape(r[2]);
  return null;
}
