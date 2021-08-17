import { onMounted } from "vue";

export function useWhislist() {

    const addProductToWhislist = async (payload) => {
        return await fetch("http://localhost:3000/whislist",{
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }

    onMounted(() => {
        console.log('Whislist hook Injected')
    })

    return {
        addProductToWhislist
    }
}