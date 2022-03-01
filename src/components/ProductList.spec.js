import { render, screen } from "@testing-library/vue"
import { flushPromises } from '@vue/test-utils'

import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect'

import ProductList from '../../src/components/ProductList.vue'

const products = {
    data: [
        { id: 1, name: 'product 1'}
    ]
}

jest.mock('axios', () => {
    return {
        get: jest.fn(() => products)
    }
})

describe('Can consume a list of', () =>{
    test('available products', async () => {

        render(ProductList)

        // Esperamos a las actualizaciones del DOM
        await flushPromises()

        screen.getByText('product 1')
    })
})

