import MinHeapModel from './minHeap.model';

function scoreFunction(e) {
    return e.distance
}
function idFunction(e) {
    return e.id
}

class Dijkstra {
  unvisited = new MinHeapModel( scoreFunction, idFunction , 'distance');
  infinity = 99999999;
  run(graph, pathType, source, target) {
    if (!graph.exists(source) || !graph.exists(target)) {
      return null;
    }
    const ret = {
      source: source,
      target: target,
      dist: source,
      prev: target
    };
    const dist = {}; // distance of the node from source
    const prev = {}; // previous node of the form 'node_id': 'prev_node_id'

    dist[source] = 0; // source is distance 0 from source
    prev[source] = source;

    Object.keys(graph).forEach(node => {
      if (graph[node].id !== parseInt(source, 10)) {
        prev[graph[node].id] = null; // set previous to null
        dist[graph[node].id] = this.infinity; // set distance to Infinity
      }
      const obj = {
         id: graph[node].id,
        distance: dist[graph[node].id]
      }
      this.unvisited.push(obj);
    });

    // return if source is the same as target (i.e., already there)
    if (source === target) {
      // console.info('Same source and target');
      ret.dist = dist;
      ret.prev = prev;
    }

    while (this.unvisited.size() > 0) {
      var min = this.unvisited.pop(); // get minimum node dist and ID
      var minNode = graph.find(min.id); // get the minimum node

      // stop when we've found the target
      if (minNode.id === target) {
        break;
      }

      // for each neighbor of minNode that is in the unvisited queue
      for (var i = 0; i < minNode.neighbors.length; i++) {
        var n = graph.find(minNode.neighbors[i]); // node for the neighbor

        // ensure node exists, is in unvisited, and it is a valid path (unless it is the target)
        if (
          !n ||
          !this.unvisited.exists(n) ||
          (n.nType !== pathType && n.id !== parseInt(target, 10))
        ) {
        //   continue;
            return;
        }

        // calculate alternative distance
        var alt = min.distance + minNode.weight;

        // use this path instead, if alternative distance is shorter
        if (alt < dist[n.id]) {
          dist[n.id] = alt;
          prev[n.id] = min.id;
          this.unvisited.decreaseKey(n.id, alt); // update key
        }
      }
    }
  }
}

export default Dijkstra;
export { Dijkstra };
