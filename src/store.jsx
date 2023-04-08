import {configureStore} from '@reduxjs/toolkit';
import ThemeReducer from './ReduxSlicer/ThemePickerSlicer';
import DsReducer from './ReduxSlicer/DsSlicer';

const Store = configureStore({
    reducer:{
        theme: ThemeReducer,
        dsName: DsReducer,
    }
})

export default Store;