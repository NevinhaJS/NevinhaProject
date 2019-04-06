import mongoose from 'mongoose';
import {createHook} from 'utils/Hook';
import hookData from './screenHook';

const ScreenModule = app => {
    const ScreenSchema = mongoose.Schema(
        {
            label: {type: String},
            name: {type: String, required: true},
            layout: {type: String, required: true },
            navigation: {type: Boolean },
            rightScreen: {type: Boolean },
            settings: {type: Object, required: true }
        }
    );

    const Screen = mongoose.model('Screen', ScreenSchema);

    Screen.find({}, (err, result) => {
        if(!result.length) createHook(Screen, hookData);
    });
    
    return Screen;
}

module.exports = ScreenModule;