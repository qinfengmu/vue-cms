/**
 * Created by Administrator on 2017/4/12.
 */
export default {

    email: function(text){
      return /^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(text);
    },
    mobile: function(text){
      return	/^0?(13|15|18|14|17)[0-9]{9}$/.test(text);
    },
    // 座机：仅中国座机支持；区号可有 3、4位数并且以 0 开头；电话号不以 0 开头，最 8 位数，最少 7 位数
    //  但 400/800 除头开外，适应电话，电话本身是 7 位数
    // 0755-29819991 | 0755 29819991 | 400-6927972 | 4006927927 | 800...
    tel: function(text){
      return /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/.test(text);
    },
    url: function (text) {
      return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(text);
    },
    pwdFormat : function( text ){
      return /^.*([\W_a-zA-z0-9-])+.*$/i.test(text);
    },
    letters : function (text) {
        return /[a-zA-z]+/i.test(text);
    },
    number : function (text) {
      return /\d+/.test(text);
    },
    spechars : function (text) {
      return /\W+/.test(text);
    }
}
