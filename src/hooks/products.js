import { onMounted } from "vue";
import axios from 'axios'

export function useProducts(){
    const getProducts = async () => {
        return await axios.get("http://localhost:3000/products");
    }
    onMounted(() => {
        console.log('Product hook Injected')
    })
    return {
        getProducts
    }
    
}
