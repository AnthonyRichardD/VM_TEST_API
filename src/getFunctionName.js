async function getFunctionName(userFunction) {
    
    const regex = /function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/;
    const match = userFunction.match(regex);

    if (match && match.length >= 2) {
        return match[1]
    } else {
        return null;
    }
}

module.exports = getFunctionName;