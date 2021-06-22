const io = require('socket.io-client');
const socket = io('http://localhost:30002');



const initAgent = require('./core/init_agent');
let config = {};


socket.on('connect', async () => {
    console.log('connected');
    socket.emit('receive', 'agent');
    socket.emit('create', 'room2');
});


socket.on('disconnect', async () => {
    console.log('disconnected from manager');
    for (const id in config.agents){
        if ('browser' in config.agents[id]){
            config.agents[id]['browser'].close();
        }else{
            delete config.agents[id];
        }
    }
});


socket.on('init', async (data) => {
    console.log('init', data.session_id);
    config = data;
    for (let id in config.agents) {
        initAgent(socket, config.agents[id]);
    }
    // console.log('finish init' )
    socket.emit('ack_init', config);
});
