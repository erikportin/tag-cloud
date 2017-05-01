function count(allSections, {sectionName, sectionId}){

    if (sectionId in allSections) {
        allSections[sectionId].count++;
    }
    else {
        allSections[sectionId] = {
            count: 1,
            name: sectionName,
            url: 'https://www.theguardian.com/' + sectionId
        };
    }
    return allSections;
}

function sort(counted){
    let sortable = [];

    for (let sectionId in counted) {
        if (counted.hasOwnProperty(sectionId)){
            sortable.push(counted[sectionId]);
        }
    }

    sortable.sort(function(a, b) {
        return b.count - a.count;
    });

    return sortable;
}


function toWeightedTagList(items){
    return sort(items.reduce(count, {}))
}

function mapper(json){
    return json.response ? toWeightedTagList(json.response.results) : [];
}

module.exports = mapper;
