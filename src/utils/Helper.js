export class Helper {
  static isEmpty = (input) => {
    if (input === null) {
      return true;
    }

    switch (typeof input) {
      case 'string':
        if (input === '' || input.length === 0) {
          return true;
        }
        break;
      case 'undefined':
        return true;
      default:
        //nothing
    }

    return false;
  }
}