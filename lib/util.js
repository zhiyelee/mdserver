/**
    util functions
**/
function merge(a, b){
    for(var i in b){
        a[i] = b[i];
    }
    return a;
}
exports.merge = merge;
