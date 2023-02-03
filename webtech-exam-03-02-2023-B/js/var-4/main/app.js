function removeOrderItem(orderInfo, position){
    
    if(!Array.isArray(orderInfo.items)){
        throw new Error(`Items should be an array`)
        return
    }

    if (!orderInfo.items.every(el=>el.price&&el.quantity)){
        throw new Error("Malformed item")
        return
    }
   
    if( position >= 0 && position < orderInfo.items.length ){
        let newItems=[];
        let item=orderInfo.items[position]
        newItems=orderInfo.items.splice(position)
        orderInfo.items=newItems
        orderInfo.total=orderInfo.total-item.price*item.quantity
        return orderInfo
    }else{
        throw new Error("Invalid position")
        return
    }
    
}

const app = {
    removeOrderItem
};

module.exports = app;