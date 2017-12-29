/**
 * Asserts a given condition.
 * @param {boolean} condition the condition to be validated.
 * @param {string} message the message to be displayed.
 * @returns {void | never} throws when condition is not met.
 */
export default (condition: boolean, message: string): void | never => {
  if (!condition) {
    throw new Error(message);
  }
};
