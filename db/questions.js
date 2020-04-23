class Questions {

    constructor() {

    }
//created constructor for prompt choices
    getTableChoice(type, name, message, choiceArray) {
        return {
          type: type,
          name: name,
          message: message,
          choices: choiceArray
        };
    }



}
module.exports = new Questions();