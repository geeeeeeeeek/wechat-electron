/**
 * Created by chenwl on 9/29/16.
 */

var emojione = require('emojione');

// <span class="emoji emoji1f471"></span>
const emojiSpanRegex = /<span class="emoji emoji([\da-f]+)"><\/span>/g;

function unicodeToString(point) {
    const offset = point - 0x10000;
    const lead = 0xd800 + (offset >> 10);
    const trail = 0xdc00 + (offset & 0x3ff);
    return String.fromCharCode(lead, trail);
}

class EmojiParser {
    static emojiSpanToString(str) {
        return str.replace(emojiSpanRegex, function(span, emojiHex) {
            const point = parseInt(emojiHex, 16);
            return unicodeToString(point);
        });
    }

    static emojiToImage(str) {
        return emojione.unicodeToImage(EmojiParser.emojiSpanToString(str));
    }
}

module.exports = EmojiParser;
