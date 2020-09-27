import Vue from "vue";
import moment from "moment";

const formatDate = Vue.filter("formatDate", function(v) {
  if (v) {
    return moment(v).format('YYYY-MM-DD');
  }
});

const parseSex = Vue.filter("parseSex", function(v) {
  if (v) {
    const sex = ['女', '男'];
    return sex[v]
  }
});

export default {
  formatDate,
  parseSex
};
