"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapjaw_iterator_1 = require("../contracts/tapjaw-iterator");
/**
 * An abstract Iterator responsibile for iterating over an adapter's
 * yielded TapjawMessages, then provides the message to an abstract
 * outputMessage() method for outputting to an implemented mechanism.
 *
 * The class also employs the limit argument to limit the number of
 * TapjawMessages being passed to the outputMessage() method.
 */
class RateLimitedStdoutIterator {
    constructor(writeCallback, messagesPerMinute) {
        this.writeCallback = writeCallback;
        this.messagesPerMinute = messagesPerMinute;
    }
    async run(adapterCallback, limit) {
        const messages = adapterCallback();
        let done = false;
        let adapterMessage;
        let messageCount = 0;
        adapterMessage = await messages.next();
        while (!adapterMessage.done && !done) {
            /**
             * Output the message to an implemented writer mechanism.
             */
            const message = adapterMessage.value;
            await this.outputMessage(message);
            messageCount++;
            /**
             * Limit the number of messages to output.
             */
            if (limit) {
                if (messageCount >= limit) {
                    done = true;
                }
            }
            /**
             * Grab the next TapjawMessage and inform the Adapter if the iteration
             * is complete.
             */
            adapterMessage = await messages.next(done);
            await this.sleep(Math.ceil(60000 / this.messagesPerMinute));
        }
    }
    sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    /**
     * Write message to STDOUT.
     *
     * @param message TapjawMessage
     */
    async outputMessage(message) {
        const json = JSON.stringify(message);
        if (!json) {
            throw new tapjaw_iterator_1.TapjawIteratorError('message could not be parsed into JSON.');
        }
        /**
         * Write JSON to stdout buffer.
         */
        this.writeCallback.write(`${json}\n`);
        return Promise.resolve();
    }
}
exports.default = RateLimitedStdoutIterator;
