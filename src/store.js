import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/',
    imgBasePath: import.meta.env.VITE_IMG_BASE_PATH || 'http://127.0.0.1:8000/storage/',
    defaultImg: "/images/placeholder.png",
  },
  data: {
    travels: [],
    loading: false,
  },
  user:{
    id: '',
    name: ''  
  }
});

window.onload = () => {
    store.user.id = localStorage.getItem('user_id');
    store.user.name = localStorage.getItem('user_name');
    console.log(store.user);
}