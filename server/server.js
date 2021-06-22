var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = 30002
http.listen(port, function () {
  console.log('listening on *:', port);
});

const agents = {
  pro: undefined,
  neutral: undefined,
  anti: undefined
};

const message = {
  pro: undefined,
  neutral: undefined,
  anti: undefined
};

const config = {
  pro: undefined,
  neutral: undefined,
  anti: undefined
};

var manager = undefined;

var connectcount=0;
var count=0;

function combine(dict){
  
  var c=JSON.parse(JSON.stringify(dict.pro))  
  for(var i in dict.anti.agents){
    c.agents[i]=JSON.parse(JSON.stringify(dict.anti.agents[i]))
  }
  for(var i in dict.neutral.agents){
    c.agents[i]=JSON.parse(JSON.stringify(dict.neutral.agents[i]))
  }
  return c;
}


io.on('connection', async (socket) => {
  // console.log(socket.handshake)
  socket.on('receive', async (message) => {
    
    if (message == 'agent') {
      connectcount++;
      console.log(connectcount );
      var agent_ip=socket.handshake.address.split(":")[3]
      for (var i in agents) {
        if (agents[i] == undefined) {
          agents[i] = socket.id;          
          break;
        }
      }
      console.log(agents)
    } else {
      manager = socket.id;
    }
    socket.on('create', async (room) => {
      socket.join(room);
      console.log('connected with', message,room, socket.id);
      // var clients_in_the_room = io.sockets.adapter.rooms[room];
      // console.log(clients_in_the_room.sockets)
      // for (var clientId in clients_in_the_room) {
      //   console.log('client: %s', clientId); //Seeing is believing 
      //   var client_socket = io.sockets.connected[clientId]; //Do whatever you want with this
      // }
    });
  })

  socket.on('disconnect', async () => {

    if (manager == socket.id) {
      console.log('disconnected with manager', socket.id);
    } else {
      console.log('disconnected with agent', socket.id);
      connectcount--;
      console.log(connectcount );
      for (var i in agents) {
        if (agents[i] == socket.id) {
          agents[i] = undefined;
          break;
        }
      }
      console.log(agents)
    }
  });
  // sent data to specific socket
  // io.sockets.to(socket.id).emit('message','surprise');

  socket.on('init', async (data) => {
    // console.log(data)
    console.log('init', data.session_id);
    for(var agent in config){
      // var dict=data;
      // console.log(agent)
      // console.log()
      config[agent] = JSON.parse(JSON.stringify(data))
      for(var i in config[agent].agents){
        // console.log(i.split('_')[0])
        
        // console.log(i.split('_')[0]!=agent)
        if(i.split('_')[0]!=agent){
          delete config[agent].agents[i]
        }
      }
      if(agents[agent]){
        // console.log(agents[agent] )
        io.sockets.to(agents[agent]).emit('init',config[agent]);
      }      
    }
    console.log('finish init' )
    // socket.to('room2').emit('init', data);
  });

  socket.on('ack_init', (data) => {
    count++;
    console.log('ack_init')
    console.log(connectcount);
    console.log(count )
    if(count==connectcount){
      console.log('init finished' )
      data=combine(config)
      // console.log('234',config)
      // console.log('123',data )
      socket.to('room1').emit('ack_init', data);
      count=0;
    }    
  });


  socket.on('ack_init_agent', (data) => {
    console.log('ack_init_agent',data);
    socket.to('room1').emit('ack_init_agent', data);
  });

  socket.on('screenshot', (data) => {
    // console.log(data.id);
    socket.to('room1').emit('screenshot', data);
  });

  socket.on('login', (data) => {
    console.log('login',data);
    socket.to('room2').emit('login', data);
  });

  socket.on('login_agent', (data) => {
    console.log('login_agent',data);
    socket.to('room2').emit('login_agent', data);
  });

  socket.on('ack_login', (data) => {
    console.log('ack_login',data);
    socket.to('room1').emit('ack_login', data);
  });

  socket.on('run_follow', (data) => {
    console.log('run_follow',data);
    socket.to('room2').emit('run_follow', data);
  });

  socket.on('end_follow', (data) => {
    console.log()
    console.log('end_follow',data);
    socket.to('room1').emit('end_follow', data);
  });

  socket.on('run_query', (data) => {
    console.log('run_query',data);
    socket.to('room2').emit('run_query', data);
  });

  socket.on('end_query', (data) => {
    console.log('end_query',data);
    socket.to('room1').emit('end_query', data);
  });
});



    // update_queries(event) {
    //   if (event.relatedResult != null) {
    //     let data = require("./session_configs/r_001_p.json");
    //     event.relatedResult.forEach(e => {
    //       data.queries.push(e);
    //     });
    //   }
    // },