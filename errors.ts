
export class ValidationError extends Error {
    errorMessages: {
        [ruleName: string]: string |any 
    }={};
    constructor(messages: {
        [ruleName: string]: string | any;
    }={}) {
        // 'Error' breaks prototype chain here
        super("validation user error"); 
        this.errorMessages=messages;
      }

      getErrorMessages(){
          return this.errorMessages;
      }

}