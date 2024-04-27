import { safeParse, coerce, number, parse } from 'valibot'
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from '../types'
import { productApi } from '../api'
import { toBoolean } from '../utils'


type ProductData = {
    [k: string]: FormDataEntryValue
}


export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            await productApi.post('/products/', {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no Válidos')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getProducts() {
    try {
        const { data } = await productApi.get('/products/')
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const { data } = await productApi.get(`/products/${id}`)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {

        const NumberSchema = coerce(number(), Number)

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())

        })

        if (result.success) {
            await productApi.put(`/products/${id}`,
                result.output
            )
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        await productApi.delete(`/products/${id}`)
    } catch (error) {
        console.log(error)
    }
}


export async function updateProductAvaulability(id: Product['id']){
    try {
        await productApi.patch(`/products/${id}`)
    } catch (error) {
        console.log(error)
    }
    
}