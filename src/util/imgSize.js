/**
 * Created by Qin fengmu on 2017/4/7.
 * 图片选中时尺寸判断
 *
 */
export default function (_this,file,component) {
  if(typeof FileReader != 'undefined'){
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = function(theFile) {
        let image = new Image();
        image.src = theFile.target.result;
        image.onload = function() {
          if(this.width != 900 || this.height != 500){
            _this.$message.error({message:'图片尺寸错误：建议上传900px*500px'});
          }else{
            component.active = true;
          }
        };
      };
   }
    // else {
  //     //ie9 选中图片时获取图片尺寸
  //     var ipt = document.getElementById(''+file.el.id+'');
  //     ipt.select();
  //     ipt.blur();
  //     var src = document.selection.createRange().text;
  //     var img = document.getElementById('preview_size_fake');
  //     img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
  //     // if(img.offsetWidth != 900 || img.offsetHeight != 500){
  //     //   //_this.$message.error({message:'图片尺寸错误：建议上传900px*500px'});
  //     // }else{
  //     //   component.active = true;
  //     // }
  // }


}
