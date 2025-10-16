const messageLog = new Map();

function isSpam(message, config) {
    if (message.author.bot) return false;

    const now = Date.now();
    const userId = message.author.id;

    if (!messageLog.has(userId)) {
        messageLog.set(userId, []);
    }

    // Keep timestamps of messages
    const timestamps = messageLog.get(userId);
    timestamps.push(now);

    // Keep only recent messages within interval
    while (timestamps.length > 0 && now - timestamps[0] > config.interval) {
        timestamps.shift();
    }

    // Check for spam
    if (timestamps.length >= config.maxMessages) {
        return true;
    }

    // Check for GIF spam (Discord GIF links are usually from Tenor/Giphy)
    if (message.content.match(/(tenor.com|giphy.com|.gif)/i)) {
        if (timestamps.length >= config.maxMessages - 1) {
            return true;
        }
    }

    return false;
}

module.exports = { isSpam };