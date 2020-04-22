class Questions {

    constructor() {

    }

    getTableChoice(name, message, choiceArray) {
        return {
          type: "list",
          name: name,
          message: message,
          choices: choiceArray
        };
    }



}
module.exports = new Questions();