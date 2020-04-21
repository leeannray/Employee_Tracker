const inquirer = require("inquirer");

class fxnInquirer {
    constructor(type, name, message, choices) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.choices = choices;
    }

    prompt() {
        const askQ = {
            type: this.type,
            name: this.name,
            message: this.message,
        }
        if (this.choices === "undefined") {
            return askQ
        } else {
            askQ.choices = this.choices;
            return askQ;
        }
    }
}

module.exports = fxnInquirer