((root) => {
  const debounce = (fn, delay) => {
    let timer = null;

    function processTimer(...args) {
      root.clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, ...args);
      }, delay);
    }

    return processTimer;
  };

  function createSelection() {
    const select = document.createElement('select');
    select.style.display = 'none';
    select.style.maxHeight = '15em';
    select.style.width = '100%';
    return select;
  }

  /**
   *
   */
  class Autocomplete {
    constructor(domInput, datalist) {
      this.selection = createSelection();
      this.selectedItem = null;
      this.callbacks = [];
      Object.defineProperties(this, {
        rawdata: {
          value: datalist
        },
        el: {
          get() {
            return domInput;
          }
        },
        list: {
          value: [],
          writable: true
        },
        htmlList: {
          value: '',
          writable: true
        },
        filterText: {
          value: '',
          writable: true
        }
      });
      (this.el.parentElement).appendChild(this.selection);
      this.startEvent();
    }

    get selected() {
      return this.selectedItem;
    }

    set selected(value) {
      this.selectedItem = value;
      this.triggerCallbacks();
      this.clear();
    }

    get filteredList() {
      return this.htmlList;
    }

    set filteredList(value) {
      if (value !== this.list) {
        this.list = value;
        root.console.log('New List', this.list);
        this.htmlList = (this.list).map(
          obj => this.createListItem(obj)
        );
        root.console.log('New HTML List', this.htmlList);
        this.createHTML();
      }
    }

    get inputText() {
      return this.filterText;
    }

    set inputText(inputStr) {
      this.filterText = '';
      if (inputStr.length && inputStr !== this.filterText) {
        root.console.info('New Input Logged', inputStr);
        this.filterText = inputStr;
        this.filteredList = (this.rawdata).filter(
          obj => (obj.label.toLowerCase()).includes(this.filterText.toLowerCase())
        );
      } else if (!(inputStr.length)) {
        this.clear();
      }
    }

    options(datalist) {
      if (!!datalist) this.rawdata = datalist;


      return this.rawdata;
    }

    startEvent() {
      this.el.addEventListener('input', debounce((e) => {
        const { target } = e,
          { value } = target;
        root.console.debug('Event detected!', target.value);
        root.console.dir(target);

        this.inputText = value;
      }, 300));

      this.selection.addEventListener('click', (e) => {
        const selectedIndex = (e.target).index;
        root.console.warn('Selection has been made:', selectedIndex);
        root.console.dir(e.target);
        this.selected = isNaN(selectedIndex) ? null : (this.list[selectedIndex]);
      });
    }

    createListItem(obj) {
      let stringHTML = `<option value="${obj.value}">${obj.label}</option>`;
      return `<option value="${obj.value}">${obj.label}</option>`;
    }

    createHTML() {
      const len = this.htmlList.length;
      if (len) {
        const inner = (this.htmlList).join('');
        this.selection.innerHTML = inner;
        this.selection.style.display = 'block';
      } else {
        this.selection.style.display = 'none';
      }
      this.selection.size = len;
    }

    triggerCallbacks() {
      let i = this.callbacks.length;
      while (i--) (this.callbacks[i])(this.selected);
    }

    clear() {
      this.filteredList = [];
    }

    AddEventCallback(fn) {
      if (typeof fn === 'function') this.callbacks.push(fn);
    }
  }

  root.AutoComplete = Autocomplete;
})(window);
