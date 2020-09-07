const ws = ({
    state : {
       wsData : '',//websocket推送的数据
    },
    mutations:{
        pushWsData(state,data){
            state.wsData = data;
        }
    },
    modules:{

    },
    actions:{

    }
});

export default ws;