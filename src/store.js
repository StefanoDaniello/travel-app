import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: "http://127.0.0.1:8000/api/",
    imgBasePath: "http://127.0.0.1:8000/storage/",
    defaultImg: "/images/placeholder.png",
  },
  data: {
    travels: [],
  },
});
