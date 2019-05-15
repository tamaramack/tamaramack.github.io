/**
 * autocomplete js file created by Tamara G. Mack on 14-May-19 for
 * tamaramack.github.io
 */
import { debounce } from './utilities/utilities';

export default ((root) => {
  /**
   * @constructor
   */
  class Autocomplete {
    constructor(domInput, datalist) {
      let _selection = createSelection();
      let _callbacks = [];
      let selectedItem = null;
      let filterText = '';

      Object.defineProperties(this, {
        rawdata: {
          value: datalist
        },
        el: {
          get() {
            return domInput;
          }
        },
        selection: {
          get() {
            return _selection;
          }
        },
        callbacks: {
          get() {
            return _callbacks;
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
        selected: {
          get() {
            return selectedItem;
          },
          set(value) {
            selectedItem = value;
            this.triggerCallbacks();
            this.clear();
          },
          enumerable: true
        },
        inputText: {
          get() {
            return filterText;
          },
          set(inputStr) {
            filterText = '';
            if (!(inputStr && inputStr.length)) {
              this.clear();
            } else if (inputStr.length && inputStr !== filterText) {
              root.console.info('New Input Logged', inputStr);
              filterText = inputStr;
              this.filteredList = (this.rawdata).filter(
                obj => (obj.label.toLowerCase()).includes(filterText.toLowerCase())
              );
            }
          },
          enumerable: true
        }
      });

      // TODO: create wrapper element to contain 'el' & 'selection'
      (this.el.parentElement).appendChild(_selection);
      this.startEvent();
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
        this.selected = Number.isNaN(Number(selectedIndex)) ? null : (this.list[selectedIndex]);
      });
    }

    createListItem(obj) {
      // let stringHTML = `<option value="${obj.value}">${obj.label}</option>`;
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

  return Autocomplete;

  function createSelection() {
    const select = document.createElement('select');
    select.style.display = 'none';
    select.style.maxHeight = '15em';
    select.style.width = '100%';
    return select;
  }
})(window);
