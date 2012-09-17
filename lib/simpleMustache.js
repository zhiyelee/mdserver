module.exports = function(template, data) {
    return template.replace(/\{\{([^}]+)\}\}/g, function(match) { 
        match = match.substring(2, match.length - 2);
        return data[match]; 
    });
}