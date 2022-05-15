class NotFoundError extends Error {
    /**
     * @constructor
     * @param message Message for user
     */
    constructor (message) {
        super();

        this.code = 404;
        this.message = message || 'Not found';
    }
}

class InternalServerError extends Error {
    /**
     * @constructor
     * @param message Message for user
     */
    constructor (message) {
        super();

        this.code = 500;
        this.message = message || 'Something weird happened';
    }
}

module.exports = { NotFoundError, InternalServerError };
