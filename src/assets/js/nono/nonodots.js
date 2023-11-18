

import { api } from '../common';
import {reactive, ref, toRefs} from 'vue';

    const data = {
        userId : 1,
        nonoId : 8,
        baekjoonId : 'tjdtndlwkd'
    }
    const setNonoData = () => {
        let nonoData = reactive({
            progress : 0,
            nonoId : 0,
            urlAry : [],
            totalRowList : [],
            nonoClass : "notsolved"
        })
        return toRefs(nonoData);
    }

export {setNonoData, data};






