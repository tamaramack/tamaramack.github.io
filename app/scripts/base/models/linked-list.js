/**
 * linked-list file for ndp-video-spa on 07-Jun-16.
 */

(function (base) {

    function LinkedListAbstract() {
        Object.defineProperties(this, {
            timestamp: {value: Date.now()}
            , _length: {
                value: 0,
                writable: true
            }
            , first: {
                value: null,
                writable: true,
                enumerable: true
            }
            , last: {
                value: null,
                writable: true,
                enumerable: true
            }
        });
    }

    LinkedListAbstract.prototype = Object.create({
        constructor: LinkedListAbstract
    }, {
         searchByPosition: {
            value: searchByPosition,
            enumerable: true
        }
        , add: {
            value: add,
            enumerable: true
        }
        , remove: {
            value: remove,
            enumerable: true
        }
        , length: {
            get: function () {
                return this._length;
            },
            enumerable: true
        }
    });


    Object.defineProperty(base.models, 'LinkedListAbstract', {
        value: LinkedListAbstract,
        enumerable: true
    });

    function add(data) {
        const node = new Node(data);
        if (this._length) {
            this.last.next = node;
            node.previous = this.last;
            this.last = node;
        } else {
            this.first = node;
            this.last = node;
        }

        this._length++;
        return node;
    }

    function remove(position) {
        var currentNode = this.first,
            count = 1,
            message = {
                failure: 'Failure: non-existent node in this list.',
                success: true
            },
            beforeNodeToDelete = null,
            afterNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;

        if (!this.length || position < 1 || position > this.length) {
            throw new Error(message.failure);
        }

        if (position === 1) {
            this.first = currentNode.next;
            if (!this.first) {
                this.first.previous = null;
            }
            else {
                this.last = null;
            }
        } else if (position === this.length) {
            this.last = this.last.previous;
            this.last.next = null;
        } else {
            while (count < position) {
                currentNode = currentNode.next;
                count++;
            }

            beforeNodeToDelete = currentNode.previous;
            afterNodeToDelete = currentNode.next;
            nodeToDelete = currentNode;

            beforeNodeToDelete.next = afterNodeToDelete;
            afterNodeToDelete.previous = beforeNodeToDelete;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
        }

        this._length--;
        return message.success;

    }

    function searchByPosition(position) {
        var currentNode = this.first,
            count = 1,
            message = {
                failure: 'Failure: non-existent node in this list.'
            };

        // 1st use-case: an invalid position
        if (!this.length || position < 1 || position > this.length) {
            throw new Error(message.failure);
        }

        // 2nd use-case: a valid position
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    }

    function Node(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
})(window.$base);