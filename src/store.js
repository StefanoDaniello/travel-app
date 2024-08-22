import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://travel-app-laravel-c3c4bb9e79e3.herokuapp.com/api/',
    imgBasePath: import.meta.env.VITE_IMG_BASE_PATH || 'https://travel-app-laravel-c3c4bb9e79e3.herokuapp.com/storage/',
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