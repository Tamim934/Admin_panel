import { configureStore } from '@reduxjs/toolkit'
import {market} from '../reducers/market'

export const store = configureStore({
    reducer: {
        market,

    }
})