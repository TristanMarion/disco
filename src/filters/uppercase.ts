import Vue from "vue";

Vue.filter("uppercase", function(value: string) {
  if (!value) return "";
  value = value.toString();
  return value.toUpperCase();
});
