export default {
  set(k, v) {
    window.localStorage.setItem(k, v);
  },
  get(k) {
    return window.localStorage.getItem(k);
  },
  remove(k) {
    window.localStorage.removeItem(k);
  },
  clear() {
    window.localStorage.clear();
  },
};
