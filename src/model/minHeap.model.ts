class MinHeap {
  content: { id: any; distance: any }[];
  scoreFunction: Function;
  idFunction: Function;
  valueProp: string;
  map: Object;

  constructor(scoreFunction: any, idFunction: any, valueProp: any) {
    this.content = [];
    this.scoreFunction = scoreFunction;
    this.idFunction = idFunction;
    this.valueProp = valueProp;
    this.map = {};
  }

  size() {
    return this.content.length;
  }
  exists(elt) {
    return this.map[this.idFunction(elt)] !== undefined;
  }

  push(elt) {
    if (this.map[this.idFunction(elt)] !== undefined) {
      throw new Error(
        'id "' + this.idFunction(elt) + '" already present in heap'
      );
    }
    const obj = {
      id: elt.id,
      distance: elt.distance
    };
    this.content.push(obj);
    this.bubbleUp(this.content.length - 1);
    //var index = this.bubbleUp(this.content.length - 1);
    //this.map[this.idFunction(elt)] = index;
  }

  pop() {
    var result = this.content[0];
    var end = this.content.pop();

    delete this.map[this.idFunction(result)];

    if (this.content.length > 0) {
      this.content[0] = end;
      this.map[this.idFunction(end)] = 0;
      this.sinkDown(0);
      //var index = this.sinkDown(0);
      //this.map[this.idFunction(end)] = index;
    }

    return result;
  }

  bubbleUp(n) {
    var element = this.content[n];
    var score = this.scoreFunction(element);

    while (n > 0) {
      var parentN = Math.floor((n - 1) / 2);
      var parent = this.content[parentN];

      if (this.scoreFunction(parent) < score) {
        break;
      }

      this.map[this.idFunction(element)] = parentN;
      this.map[this.idFunction(parent)] = n;

      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }

    this.map[this.idFunction(element)] = n;

    return n;
  }

  sinkDown(n) {
    var element = this.content[n];
    var score = this.scoreFunction(element);

    while (true) {
      var child2N = (n + 1) * 2;
      var child1N = child2N - 1;
      var swap = null;
      var child1score;

      if (child1N < this.content.length) {
        var child1 = this.content[child1N];
        child1score = this.scoreFunction(child1);
        if (score > child1score) {
          swap = child1N;
        }
      }

      if (child2N < this.content.length) {
        var child2 = this.content[child2N];
        var child2score = this.scoreFunction(child2);
        if ((swap === null ? score : child1score) > child2score) {
          swap = child2N;
        }
      }

      if (swap === null) {
        break;
      }

      this.map[this.idFunction(this.content[swap])] = n;
      this.map[this.idFunction(element)] = swap;

      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }

    this.map[this.idFunction(element)] = n;

    return n;
  }

  decreaseKey(id, value) {
    const n = this.map[id];
    this.content[n][this.valueProp] = value;
    this.bubbleUp(n);
  }
}

export default MinHeap;
export { MinHeap };
