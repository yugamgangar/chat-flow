export function validateFlow(nodes, edges) {
    if (!nodes.length && !edges.length) {
        return false;
    }

    let count = {}
    let nodeIds = nodes.map(node => node.id)

    for (let i = 0; i < edges.length; i++) {
        if (count[edges[i].source]) {
            return false;
        }
        nodeIds.splice(nodeIds.indexOf(edges[i].source), 1)
        count[edges[i].source] = 1;
    }

    if (nodeIds.length) {
        return false;
    }

    return true;
}

export function getUid() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}