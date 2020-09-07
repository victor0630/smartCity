/**
 * 工具类
 * 
 * @auth : houjianhong
 */
var util = {};
//格式化时间为yyyy-mm-dd格式
util.formatDate = function(date){
    var currentDate = new Date(date);
    var month = currentDate.getMonth()+1 > 9 ? currentDate.getMonth()+1 : "0"+(currentDate.getMonth()+1);
    var day =  currentDate.getDate() > 9 ?  currentDate.getDate() : "0" +  currentDate.getDate();
    return currentDate.getFullYear()+"-" + month + "-" + day;
};

util.formatTime = function(time){
    var currentTime = new Date(time);
    var hour = currentTime.getHours() < 10 ? "0" + currentTime.getHours() : currentTime.getHours();
    var minutes = currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes() : currentTime.getMinutes();
    var seconds = currentTime.getSeconds() < 10 ? "0" + currentTime.getSeconds() : currentTime.getSeconds();
    return currentTime.getFullYear()+"-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate()
    + " " + hour + ":" + minutes + ":" + seconds ;
};

//格式化时间为yyyy-mm格式
util.formatMonth = function(date){
    var currentDate = new Date(date);
    var month = currentDate.getMonth()+1 > 9 ? currentDate.getMonth()+1 : "0"+(currentDate.getMonth()+1);
    return currentDate.getFullYear()+"-" + month;
};
//获取上个月月份（不考虑日期）
util.getLastMonth = function(){
    var currentDate = new Date();
    var thisYear = currentDate.getFullYear();
    var thisMonth = currentDate.getMonth();
    var year = '';
    var month = '';
    if(thisMonth == 0){
        year = thisYear - 1;
        month = 11;
    }else{
        year = thisYear;
        month = thisMonth - 1;
    }
    month = month > 8 ? month+1 : "0"+(month+1);
    return year + "-" + month;
};

//获取今年的开始的日期
util.getCurrentYearDate = function(){
    var currentDate = new Date();
    return currentDate.getFullYear()+"-01-01" ;
};

//获取本月开始日期
util.getCurrentMonthDate = function(){
    var currentDate = new Date();
    var month = null;
    if(currentDate.getMonth()+1 < 10){
        month = "0"+(currentDate.getMonth()+1);
    }else{
        month = currentDate.getMonth()+1;
    }
    return currentDate.getFullYear()+"-"+month+"-01";
};

//获取日期格式根据传入的yyyy-MM-dd hh:mm:ss获取对应的时间
util.formatDateByArg = function(date,str){
    let formateDate = '';
    if(date){
        formateDate = new Date(date);
    }else{
        formateDate = new Date();
    }
    var month = formateDate.getMonth()+1 > 9 ? formateDate.getMonth()+1 : "0"+(formateDate.getMonth()+1);
    var day =  formateDate.getDate() > 9 ?  formateDate.getDate() : "0" +  formateDate.getDate();
    var hour = formateDate.getHours() < 10 ? "0" + formateDate.getHours() : formateDate.getHours();
    var minutes = formateDate.getMinutes() < 10 ? "0" + formateDate.getMinutes() : formateDate.getMinutes();
    var seconds = formateDate.getSeconds() < 10 ? "0" + formateDate.getSeconds() : formateDate.getSeconds();
    str = str.replace("yyyy",formateDate.getFullYear());
    str = str.replace("MM",month);
    str = str.replace("dd",day);
    str = str.replace("hh",hour);
    str = str.replace("mm",minutes);
    str = str.replace("ss",seconds);
    return str;
}



util.formatFyCascaderData = function(fyData){
    if(fyData.childFyxx){
        if(fyData.childFyxx.length == 0){
            fyData.childFyxx = null
        }else{
            for(var i = 0 ; i < fyData.childFyxx.length ; i++){
                util.formatFyCascaderData(fyData.childFyxx[i]);
            }
        }
    }
};
//树的children长度为0转换为null
util.formatTreeChildren = function(fyData){
    if(fyData.children){
        if(fyData.children.length == 0){
            fyData.children = null
        }else{
            for(var i = 0 ; i < fyData.children.length ; i++){
                util.formatTreeChildren(fyData.children[i]);
            }
        }
    }
};

/**
 * 树数据组装
 */
util.createAreaTree = function(treeData){
    var splitData = {root:[]};
    var isDealData = false;
    for(var i = 0 ; i < treeData.length ; i++){
        if(!treeData[i].parentId || treeData[i].parentId == -1){
            splitData.root.push(treeData[i]);
            isDealData = true;
        }else{
            if(splitData[treeData[i].parentId]){
                splitData[treeData[i].parentId].push(treeData[i]);
            }else{
                splitData[treeData[i].parentId] = [];
                splitData[treeData[i].parentId].push(treeData[i]);
            }
        }
    }
    for(var i = 0 ; i <treeData.length ; i++){
        if(splitData[treeData[i].id]){
            treeData[i].children = splitData[treeData[i].id];
        }else{
            treeData[i].children = [];
        }
    }
    if(isDealData){
        return splitData.root;
    }else{
        return treeData;
    }
}

util.setValueFrom = function(obj,dataObj ){ // 从右边的对象取属性到左边 不复制方法
  if('object' !== typeof obj || 'object' !== typeof dataObj){
    return this;
  }
  var isOwnProp = function(obj,key){
    return obj.hasOwnProperty(key) && 'function' !== typeof obj[key];
  };
  for(var key in obj){
    if(isOwnProp(obj,key) && isOwnProp(dataObj,key)){
      obj[key] = dataObj[key];
    }
  }
}


//①判断浏览器类型
util.myBrowser = function() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(isOpera) {
		return "Opera"
	}; //判断是否Opera浏览器
	if(userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} //判断是否Firefox浏览器
	if(userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if(userAgent.indexOf("Safari") > -1) {
		return "Safari";
	} //判断是否Safari浏览器
	if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		return "IE";
	}; //判断是否IE浏览器
	if(userAgent.indexOf("Trident") > -1) {
		return "Edge";
	} //判断是否Edge浏览器
}

//②IE浏览器图片保存（IE其实用的就是window.open)
util.SaveAs5 = function (imgURL) {
	var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
	for(; oPop.document.readyState != "complete";) {
		if(oPop.document.readyState == "complete") break;
	}
	oPop.document.execCommand("SaveAs");
	oPop.close();
}

//③下载函数（区分IE和非IE部分）

util.oDownLoad = function(url,dom) {
    //debugger;
	if(util.myBrowser() === "IE" || util.myBrowser() === "Edge") {
		//IE （浏览器）
		util.SaveAs5(url);
		//console.log(1)
	} else {
		//!IE (非IE)
		dom.href = url;
		dom.download = "";
	}

}

//保存时清空无用字段
util.clearField = function(object){
    if(object.opTime != null){
        object.opTime = null;
    }
    if(object.opUser != null){
        object.opUser = null;
    }
    return object;

}
//级联树通过当前代码获取代码线索otherList：线索代码，code：当前法院代码，fyxxList：级联树
util.getCodeParent = function(otherList,code,tree){
    var vm =this;
    var fyList = tree;
    for(var i = 0 ; i < fyList.length ; i++){
      if(fyList[i].code == code){
        if(fyList[i].parentCode != "-1"){
          otherList.push(fyList[i].parentCode);
          vm.getCodeParent(otherList,fyList[i].parentCode);
        }else{
          otherList.reverse();
        }
        break;
      }
    }
  }


/**
 * 对对象数据数组进行排序 会改变原数据
 */
 util.doObjListSort = function(list, sortField) {
  if (!(list instanceof Array)) {
    return list;
  }
  if ('string' !== typeof sortField || '' === sortField.trim()) {
    sortField = 'sortNo';
  }
  var tempList = [];
  var len = list.length;
  // 将下标扩展出来，解决谷歌排序下，值相等时无法保证原来顺序，对于数据是对象时，这是不稳定的排序
  for (var i = 0; i < len; i++) {
    tempList.push({index: i, data: list[i]});
  }
  tempList.sort(function(a, b){
    var aSort = a.data[sortField];
    var bSort = b.data[sortField];
    if (aSort === bSort || aSort == null || bSort === null) {
      return a.index - b.index;
    }
    return aSort < bSort ? -1 : 1;
  });
  for (var i = 0; i < len; i++) {
    list[i] = tempList[i].data;
  }
  return list;
}

/**
 * 数组转化为树
 * @param list
 * @returns {Array}
 */
util.listToTree = function(list, props) {
  // 校验
  if (!(list instanceof Array)) {
    return [];
  }
  var defaultProps = {
    code: 'code',
    parent: 'parent',
    children: 'children'
  }
  if ('object' !== typeof props) {
    props = defaultProps;
  }
  if ('string' !== typeof props.code || '' === props.code.trim()) {
    props.code = defaultProps.code;
  }
  if ('string' !== typeof props.parent || '' === props.parent.trim()) {
    props.parent = defaultProps.parent;
  }
  if ('string' !== typeof props.children || '' === props.children.trim()) {
    props.children = defaultProps.children;
  }

  // 复制到副本并清除空数据
  var list2 = list;
  var len = list2.length;
  list = [];
  for (var i = 0; i < len; i++) {
    if ('object' === typeof list2[i]) {
      list.push(list2[i]);
    }
  }
  list2 = null;

  // 把同一个父节点的排到一起
  util.doObjListSort(list, props.parent);

  // 保留原始顺序数据
  var richList = [];
  var len = list.length;
  for (var i = 0; i < len; i++) {
    richList.push({index: i, data: list[i]});
  }

  // 将同个父节点的放一个数据
  var root = [];
  var holder = {} // 容器
  var parentCode = null;
  var tempList = null;
  for (var i = 0; i < len; i++) {
    var item = richList[i];
    var data = item.data;

    // 父节点code为空 或者 自己的父节点是自身，则是一个根节点
    if (data[props.parent] == null || data[props.code] === data[props.parent]) {
      root.push(item);
      continue;
    }
    if (parentCode !== data[props.parent]) {
      parentCode = data[props.parent];
      if(holder[parentCode]){//排序算法有bug，需要额外加入此判断规避
        tempList = holder[parentCode];
      }else{
        tempList = [];
      }
      holder[parentCode] = tempList;
    }
    tempList.push(item);
  }
  // 挂到对应的父节点 形成树
  for (var i = 0; i < len; i++) {
    var item = list[i];
    var code = item[props.code];
    if (holder.hasOwnProperty(code)) {
      var children = holder[code];
      item[props.children] = holder[code];
      var cLen = children.length;
      for (var j = 0; j < cLen; j++) {
        children[j] = children[j].data;
      }
      delete holder[code];
    } else {
      item[props.children] = [];
    }
  }

  // 没有被摘走的组成森林
  for (let key in holder) {
    if(holder.hasOwnProperty(key)) {
      root = root.concat(holder[key]);
    }
  }

  // 根节点按原来顺序排序
  util.doObjListSort(root, 'index');

  // 还原数据
  var len = root.length
  for (var i = 0; i < len; i++) {
    root[i] = root[i].data;
  }

  return root;
}

/**
 * 判断数据是否为空
 * @param data
 * @returns {boolean}
 */
util.isEmpty = function (data) {
  return data === undefined || data === null || data === 'null' || data === 'undefined' || data === '';
}

// util.getDic = function(type){
//     axios.post("/apis/cfg/dic",{
//         dimTypeCode : type
//     }).then(function(response){
//         return response.data.object ? response.data.object : [];
//     })
// }

util.getChromeVersion = function() {
    var arr = navigator.userAgent.split(' '); 
    var chromeVersion = '';
    for(var i=0;i < arr.length;i++){
        if(/chrome/i.test(arr[i]))
        chromeVersion = arr[i]
    }
    if(chromeVersion){
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}

/**
 * 深拷贝对象
 */
util.copyObject = function(object){
  let copy = JSON.parse(JSON.stringify(object));
  return copy;
}
/**
 * @module isEmpty
 * @namespace  isEmpty 判断某个值是否为空
 * @author huangpx 判断空值
 * @param  {} keys 某个值 单个
 */
util.isEmpty = (keys) => {
  if (typeof keys === "string") {
      keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, "");
      if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
          return true;
      } else {
          return false;
      }
  } else if (typeof keys === "undefined") {  // 未定义
      return true;
  } else if (typeof keys === "number") {
      return false;
  } else if (typeof keys === "boolean") {
      return false;
  } else if (typeof keys == "object") {
      if (JSON.stringify(keys) == "{}") {
          return true;
      } else if (keys == null) { // null
          return true;
      } else {
          return false;
      }
  }

  if (keys instanceof Array && keys.length == 0) {// 数组
      return true;
  }

}
/** 
 * @module deleteEmptyProperty
 * @description 去掉对象中得空值
 * @param  {} data
*/
util.deleteEmptyProperty = (data) => {
  for (let key in data) {
      let value = data[key];
      if (value instanceof Object) {
          if(JSON.stringify(value) == "{}"){
            delete data[key];
            continue;
          }
          if (value instanceof Array) {
              if (value.length == 0) {
                  delete data[key];
                  continue;
              } else {
                  util.deleteEmptyProperty(data[key]);
              }
          } else {
              if (util.isEmpty(value)) {
                  delete data[key]
              } else {
                  util.deleteEmptyProperty(data[key]);
              }
          }
      } else {
          if (value === "" || value === null || value === undefined) {
              delete data[key];
          }
      }
  }
  return data;
}

/**
 *
 * @description 清空对象的value值
 * 
 * @author houjianhong
 *  
 */
util.clearObjectValue = function(obj){
  let getType=Object.prototype.toString
  for(let item in obj){
    let value = obj[item];
    switch(getType.call(value)){
      case "[object Object]" : util.clearObjectValue(value);break;
      case "[object Array]" : obj[item] = []; break;
      case "[object Null]" : break;
      case "[object Function]" : break;
      default : obj[item] = "";break;
    }
  }

}

/**
 * 
 * @description 设置对象的值
 * 
 * @auth  houjianhong
 * 
 */
util.setObjectValue = function(obj,valueObject){
  let getType=Object.prototype.toString
  let copyValueObject = util.copyObject(valueObject);
  for(let item in obj){
    let value = obj[item];
    if(!copyValueObject[item]){
      continue;
    }
    switch(getType.call(value)){
      case "[object Object]" : util.setObjectValue(value,copyValueObject[item]);break;
      case "[object Array]" : obj[item] = copyValueObject[item]; break;
      case "[object Function]" : break;
      default : obj[item] = copyValueObject[item];break;
    }
  }
}


/**
 * 
 * @description 替换对象值
 * 
 * @author houjianhong
 * 
 */
util.changeObjectVale = function(obj,key="enum"){
  let getType=Object.prototype.toString;
  if(!obj){
    return null;
  }
  if(obj[key]){
    obj = obj.value;
    return obj;
  }
  for(let item in obj){
    let value = obj[item];
    switch(getType.call(value)){
      case "[object Object]" : 
        obj[item] = util.changeObjectVale(obj[item],key);
        break;
      case "[object Array]" : obj[item] = util.changeObjectVale(obj[item],key); break;
      case "[object Function]" : break;
      default : break;
    }
  }
  return obj;
}



/**
 * 文件类型判断
 * fileName : "xxx.xx" //文件名
 * type : [] //文件类型数组 
 * 
 */

util.fileInType = function(fileName , type){
    var fileLastName = fileName.split(".").pop();
    for(var i = 0 ; i < type.length ; i++){
      if(fileLastName == type[i]){
        return true;
      }
    }
    return false;
 }


 /**
  * base64字符拼接
  */
util.getBase64 = function(prefix,base64){
  if(base64){
    if(base64.indexOf("data:") == -1){
      base64 = prefix + base64;
    }
    return base64;
  }else{
    return "";
  }
}


/**
 * @description : .号多层字段解析
 * @author ： houjianhong
 * @argument : obj : 要读取对象
 *             key : 要读取的属性
 * @returns : 返回对应属性的值
 */

 util.readObjectKey = function(obj , key){
   let keys = key.split(".");
   let result = "";
   let newObj = util.copyObject(obj);//深拷贝一份数据
   
   for(let i = 0 ; i < keys.length ; i++){
     if(i == 0){
        if(!newObj){
          result = "";
          return result;
        }else{
          result = newObj[keys[i]];
        }
     }else{
        if(!result){
          result = "";
          return result;
        }else{
          result = result[keys[i]];
        }
     }
   }
   return result;
 }

 /**
  * @description  数组去重
  * 
  * @author houjianhong
  * 
  * @argument arr<array> 要去重的数组
  * 
  */
util.uniqued = function(arr){
  //let newArr = util.copyObject(arr);
  let newArr = arr;
  newArr = newArr.reduce(function(item, next) {
    newArr[next.prop] ? '' : newArr[next.prop] = true && item.push(next);
    return item;
  }, []);
  return newArr;
}

/**
 * @description  根据id获取所有父节点id及本身id
 * 
 * @argument arr<Object> 树的list数组
 * 
 * @author:houjianhong
 * 
 * @return result  : [] 
 * 
 * 
 */

util.getParents = function (arr, param) {
  let defaultparam = {
    prop: {
      id: "id",
      parentId: "parentId"
    },
    searchId : ""
  }

  Object.assign(defaultparam, param);
  let id = defaultparam.prop.id;
  let searchId = defaultparam.searchId;
  let parentId = defaultparam.prop.parentId;

  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    if (!temp) {
      continue;
    }
    if (temp[id] == searchId) {
      let parents = util.getParents(arr, Object.assign(defaultparam, { searchId: temp[parentId] }));
      parents.push(JSON.parse(JSON.stringify(temp)));
      return parents;
    }
  }
  return [];
}


/**
 * 跨域url 转base64
 * 
 * @param src : 图片路径（http://xxx.jpg）
 * 
 * @return  Promise(dataUrl) : 返回一个Promise对象,携带已经转换完成的base64数据
 * 
 */
util.getBase64ByUrl = function(src) {
  var xhr = new XMLHttpRequest();
  let ext = src.substring(src.lastIndexOf(".")+1).toLowerCase()
  xhr.open('GET', src, true)

  xhr.responseType = 'arraybuffer'
  return new Promise((resolve,reject)=>{
    xhr.onload = function(e) {
      if (xhr.status == 200) {
        var uInt8Array = new Uint8Array(xhr.response)
        var i = uInt8Array.length
        var binaryString = new Array(i)
        while (i--) {
          binaryString[i] = String.fromCharCode(uInt8Array[i])
        }
        var data = binaryString.join('')
        var base64 = window.btoa(data)
        var dataUrl = 'data:' + (ext || 'image/png') + ';base64,' + base64;
        resolve(dataUrl);
      }
    }
    xhr.send()
  })
  
}


util.getBase64Image = function(img){
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;

}

/**
 * @description 图片路径转base64
 */

 util.imagePathToBase64 = function(path){
    return new Promise((resolve, reject)=>{
      var tempImage = new Image();
      tempImage.src = path;
      tempImage.setAttribute('crossOrigin', 'Anonymous');
      tempImage.onload = function(){
          var baseSrc = util.getBase64Image(tempImage);
          resolve(baseSrc);
      }
    })
 }

 /**
  * @description File对象转Base64
  */
util.fileToBase64 = function(file){
  var reader = new FileReader();
  reader.readAsDataURL(file.raw);
  return new Promise((resolve, reject)=>{
    reader.onload = function(){
      var base64 = reader.result;
      resolve(base64);
    }
  })
  
}

/**
 * @description  value: 翻译值 
 *               list : key value 数组
 * 
 * @return name：key的值
 */
util.translate = function(value,list,prop){
  if(!prop){
    prop = {
      value : 'value',
      key : 'name'
    }
  }
  for(let i = 0; i < list.length; i++){
    if(value == list[i][prop.value]){
      return list[i][prop.key];
    }
  }
  return "";
}

/**
 * 
 * @description  获取浏览器Url参数
 *        name: url参数 
 *               
 * 
 * @return result：参数值
 */
util.getQueryStrByName = function(name) { 
  const result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1){
      return "";
  }
  return result[1];
}

export default util;
