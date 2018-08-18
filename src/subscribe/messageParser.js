/**
 * 消息内容
 * Created by kit on 2018/4/17.
 */
class MessageParser {

  constructor(text){
    this.json = JSON.parse(text);
  }

  getEvent(){
    return this.json['event'];
  }

  getUserid(){
    return this.json['userid'];
  }

  getSource(){
    return this.json['source'];
  }

  getTarget(){
    return this.json['target'];
  }

  getType(){
    return this.json['type'];
  }

  getContent(){
    return this.json['content'];
  }
}

module.exports = MessageParser;