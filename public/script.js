let topo = 0;
function scroll(){
  topo += 1000;
  $(".messages").scrollTop(topo);
}

function getTime(){
  let time = new Date();
  let hours= time.getHours();
  let minutes= time.getMinutes();
  return `${hours}:${minutes}`
}
function commands(command){
  let message = command.split(' ')
  let cmd = message.shift().substr(1)
  let args = message;

  if (cmd === "teste") {
    notify('I\'M FUCKING ALIVE!')
    return;
  }
  if (cmd === "join") {
    for (party of args){
      socket.emit('joinParty',party)
    }
    return;
  }
  if (cmd === 'notify'){
    let notification = {
      party:args.shift(),
      message:args
    };
    socket.emit('partyNotify',notification)
    return;
  }
  if (cmd === 'alert'){
    socket.emit('alert',args)
    return;
  }
  if (cmd === 'help'){
    let cmdList = "Hey, here are the list of available commands:\n- /teste : returns a notification;\n- /notify: gives an alert an especific party;\n- /alert: gives an alert to all users;\n- /join: joins a party. To join multiple parties pass it separated by space."
    renderMessage({
      authorId:00000,
      author:"System",
      message:cmdList,
      time:getTime()
    })
    return;
  }
  console.log({
    cmd: cmd,
    args: args
  })
  renderMessage({
    authorId:00000,
    author:"System",
    message:"Command not found.\nExecute /help to see available commands and how to use them.",
    time:getTime()
  })
  return;
}
