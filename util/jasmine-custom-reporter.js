const logger = require("./logger.js").logger;

class myReporter {

    jasmineStarted (suiteInfo) {
        logger.start('Running suite with ' + suiteInfo.totalSpecsDefined + ' specs');
    }

    suiteStarted (result) {
        logger.start('Suite started: ' + result.description);
    }

    specStarted (result) {
        logger.start('Spec started: ' + result.description);
    }

    specDone(result) {
        logger.finish('Spec: ' + result.description + ' was ' + result.status);
        for (let i = 0; i < result.failedExpectations.length; i++) {
            logger.fail('Failure: ' + result.failedExpectations[i].message);
        }
    }

    suiteDone (result) {
        logger.finish('Suite: ' + result.description + ' was ' + result.status);
        for (let i = 0; i < result.failedExpectations.length; i++) {
            logger.fail('AfterAll ' + result.failedExpectations[i].message);
        }
    }

    jasmineDone() {
        logger.finish('Finished suite');
    }
}

module.exports = myReporter;
