/**
 * Created by jiajt on 2018/8/21.
 */
export function filterChangeData (prodData,sourceProdData,optionType) {
    var backData = {}
    var copyFlag = optionType
    backData = copy(sourceProdData,backData)
    // 处理prodType对象数据
    prodTypeDeal(prodData,sourceProdData,backData,copyFlag)
    //处理prodDefines对象数据
    var prodDefines = {}
    for (let j in prodData.prodDefines) {
        let newMap = {newData: {},oldData: {},optionType: ""}
        if(copyFlag === "Y" && prodData.prodDefines[j].group !== "BASE"){
            prodData.prodDefines[j].group = null
            newMap.newData = prodData.prodDefines[j];
            newMap.optionType = "I"
            prodDefines[j] = newMap
        }else if (sourceProdData.prodDefines[j] === undefined) {
            //prodDefine 增加参数
            newMap.newData = prodData.prodDefines[j]
            newMap.optionType = "I"
            prodDefines[j] = newMap
        }else if(prodData.prodDefines[j].attrValue !== sourceProdData.prodDefines[j].attrValue){
            //prodDefine 修改参数
            prodData.prodDefines[j].group = null
            newMap.newData = prodData.prodDefines[j]
            newMap.oldData = sourceProdData.prodDefines[j]
            newMap.optionType = "U"
            prodDefines[j] = newMap
        }
    }
    backData.prodDefines = prodDefines

    //处理mbEventInfos对象数据
    for (let m in prodData.mbEventInfos){
        let mbEventAttrs = {}
        let mbEventParts = {}
        let mbEventType = {newData: {}, oldData: {}}
        let temp= {mbEventAttrs: {},mbEventParts: {},mbEventType: {}}
        let flag = "false"
        let newDataType = {}
        let oldataType = {}
        let flagPart = "false"
        let flagType = "false"

        //mbEventAttrs
        for (let k in prodData.mbEventInfos[m].mbEventAttrs){
            let newDataMap= {newData: {}, oldData: {},optionType: ""}
            if(copyFlag === "Y" || sourceProdData.mbEventInfos[m].mbEventAttrs[k] === undefined){
                newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
                newDataMap.optionType = "I"
                flag = "true"
                mbEventAttrs[k] = newDataMap
            }else if(prodData.mbEventInfos[m].mbEventAttrs[k].attrValue !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].attrValue) {
                newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
                newDataMap.oldData = sourceProdData.mbEventInfos[m].mbEventAttrs[k]
                newDataMap.optionType = "U"
                flag = "true"
                mbEventAttrs[k] = newDataMap
            }
        }
        temp.mbEventAttrs = Object.assign(temp.mbEventAttrs,mbEventAttrs)
        backData.mbEventInfos[m].mbEventAttrs = temp.mbEventAttrs

        //mbEventParts
        for (let x in prodData.mbEventInfos[m].mbEventParts){
            mbEventPartDeal(prodData,x,m,copyFlag,flagPart,mbEventParts,sourceProdData);
        }
        temp.mbEventParts = Object.assign(temp.mbEventParts,mbEventParts)
        backData.mbEventInfos[m].mbEventParts = temp.mbEventParts

        //mbEventType
        for (let y in prodData.mbEventInfos[m].mbEventType){
            if(copyFlag === "Y") {
                newDataType[y] = prodData.mbEventInfos[m].mbEventType[y]
                flagType = "true"
            }else if (prodData.mbEventInfos[m].mbEventType[y].attrValue !== sourceProdData.mbEventInfos[m].mbEventType[y].attrValue){
                newDataType[y] = prodData.mbEventInfos[m].mbEventType[y]
                oldataType[y] = sourceProdData.mbEventInfos[m].mbEventType[y]
                flagType = "true"
            }
        }
        mbEventType.newData = Object.assign(mbEventType.newData,newDataType)
        mbEventType.oldData = Object.assign(mbEventType.oldData,oldataType)
        temp.mbEventType = Object.assign(temp.mbEventType,mbEventType)
        backData.mbEventInfos[m].mbEventType = temp.mbEventType

        if(flag === "false" && flagType === "false" && flagPart === "false"){
            //该事件下所有参数均未改变时 返回给后台报文中删除该事件
            delete backData.mbEventInfos[m]
        }
    }
    //处理单表数据
    var backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"mbProdCharge")
    //将加工后数据回填到待返回数据集合
    backData.mbProdCharge = backVal
    backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"glProdAccounting")
    backData.glProdAccounting = backVal
    backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"irlProdInt")
    backData.irlProdInt = backVal
    backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"mbAcctStats")
    backData.mbAcctStats = backVal
    return backData
}
//单表处理主流程
export function tablesMainDeal(prodData,sourceProdData,backVal,tables){
    let index = 0
    for (let s =0; s<prodData[tables].length; s++){
        let flags = 0
        for(let j = 0; j<sourceProdData[tables].length; j++){
            flags = 0
            let returnIndex = tablesModDeal(prodData,sourceProdData,s,j,backVal,index,tables)
            if(index !== returnIndex){
                //检索到并匹配成功,并且该条数据已被处理
                index = returnIndex
                flags = 1
                break
            }
        }
        if(flags === 0){
            //原数据中不存在该条数据（新增）
            let temp = {newData: {},oldData: {},optType: ''}
            temp.newData = prodData[tables][s]
            temp.optType = 'I'
            backVal.push(temp)
            index++
        }
    }
}
//单表处理，获取修改的数据
export function tablesModDeal(prodData,sourceProdData,s,j,backVal,index,tables) {
    //新增数据，产品类型默认
    let modFlag = "false"
    if(tables === "mbProdCharge"){
        if(prodData[tables][s].prodType === sourceProdData[tables][j].prodType && prodData[tables][s].feeType === sourceProdData[tables][j].feeType){
            modFlag = "true"
        }
    }
    else if(tables === "glProdAccounting"){
        if(prodData[tables][s].prodType === sourceProdData[tables][j].prodType && prodData[tables][s].accountingStatus === sourceProdData[tables][j].accountingStatus){
            modFlag = "true"
        }
    }
    else if(tables === "irlProdInt"){
        if(prodData[tables][s].prodType === sourceProdData[tables][j].prodType && prodData[tables][s].eventType === sourceProdData[tables][j].eventType && prodData[tables][s].intClass === sourceProdData[tables][j].intClass){
            modFlag = "true"
        }
    }
    else if(tables === "mbAcctStats"){
        if(prodData[tables][s].internalKey === sourceProdData[tables][j].internalKey){
            modFlag = "true"
        }
    }
    if(modFlag === "true"){
        //匹配到同一条数据
        let flag = 0
        for(let k in prodData[tables][s]){
            //判断数据字段是否相同（修改）
            if(prodData[tables][s][k] !== sourceProdData[tables][j][k]){
                //修改数据
                let temp = {newData: {},oldData: {},optType: ''}
                temp.newData = prodData[tables][s]
                temp.oldData = sourceProdData[tables][j]
                temp.optType = 'U'
                backVal.push(temp)
                index++
                flag = 1
                break
            }
        }
        //一条数据遍历完成是  不存在相同数据时处理
        if(flag === 0){
            index--
        }
    }
    return index
}
//降低mbEventPart对象处理方法复杂度，分离主方法
export function mbEventPartDeal(prodData,x,m,copyFlag,flagPart,mbEventParts,sourceProdData) {
    for(let z in prodData.mbEventInfos[m].mbEventParts[x]) {
        if (copyFlag === "Y") {
            let newDataPart = {newData: {}, oldData: {}}
            newDataPart.newData = prodData.mbEventInfos[m].mbEventParts[x][z]
            flagPart = "true"
            let map = {}
            map[z] = newDataPart
            mbEventParts[x] = map
        } else if (prodData.mbEventInfos[m].mbEventParts[x][z].attrValue !== sourceProdData.mbEventInfos[m].mbEventParts[x][z].attrValue) {
            let newDataPart = {newData: {}, oldData: {}}
            newDataPart.newData = prodData.mbEventInfos[m].mbEventParts[x][z]
            newDataPart.oldData = sourceProdData.mbEventInfos[m].mbEventParts[x][z]
            flagPart = "true"
            let map = {}
            map[z] = newDataPart
            mbEventParts[x] = map
        }
    }
}
//处理prodType对象数据
export function prodTypeDeal(prodData,sourceProdData,backData,copyFlag) {
    var prodType = {newData: {},oldData: {}}
    var newProdMap = {}
    var oldProdMap = {}
    if(copyFlag === "Y"){
        newProdMap = prodData.prodType
    }else {
        for (let i in prodData.prodType) {
            if (prodData.prodType[i] === sourceProdData.prodType[i]) {
                oldProdMap[i] = sourceProdData.prodType[i]
            } else {
                newProdMap[i] = prodData.prodType[i]
                oldProdMap[i] = sourceProdData.prodType[i]
            }
        }
    }
    prodType.newData = Object.assign(prodType.newData,newProdMap)
    prodType.oldData = Object.assign(prodType.oldData,oldProdMap)
    backData.prodType = prodType
}
//对象浅拷贝
export function copy(obj1,obj2) {
    var obj = obj2||{};
    for(let name in obj1){
        if(typeof obj1[name] === "object" && obj1[name]!== null){
            obj[name]= (obj1[name].constructor===Array)?[]:{};
            copy(obj1[name],obj[name]);
        }else{
            obj[name]=obj1[name];
        }
    }
    return obj;
}