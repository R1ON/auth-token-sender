const createLogger = (prefix) => {
    return (message, type = 'log') => {
        console[type](`[${prefix}]: ${message}`);
    };
};

const authTokenLogger = createLogger('AUTH');
const proxyLogger = createLogger('PROXY');

module.exports = {
    authTokenLogger,
    proxyLogger,
};
