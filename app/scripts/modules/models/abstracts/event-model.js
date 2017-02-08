/**
 * File name: event-model, created on 15-Jun-16 in project, ndp-video-spa.
 */

window.$GLOBAL_MODELS.StorageEventModel = (function () {

    function StorageEventModel(){
        Object.defineProperties(this,{
            e:_define(false)
            , type:_define(false)
            , instance:_define('default')
            , playerType:_define(window.$page.data.playerType)
            , index:_define(-1)
        });
    }

    StorageEventModel.prototype = Object.create({
        constructor:StorageEventModel
    },{
        timestamp:{value:Date.now()}
        , log:{
            value:new MessageModel(),
            enumerable:true
        }
        , handler:{
            value:false,
            writable:true
        }
    });

    return StorageEventModel;


    function SeqEventObj() {
        this.evt = {};
        this.type = '';
        this.instance = '';
        this.playerType = '';
        this.index = 0;
        this.log = new MessageModel();
        this.timestamp = Date.now();
    }

    function MessageModel() {
        this.type = '';
        this.css = '';
        this.message = [];
    }


    function _define(obj){
        return {
            value:obj,
            writable:true,
            enumerable:true
        }
    }
})();