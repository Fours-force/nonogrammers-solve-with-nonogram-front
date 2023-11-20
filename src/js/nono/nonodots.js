import {reactive, toRefs} from 'vue';
    const setNonoData = () => {
        let nonoData = reactive({
            progress : 0,
            nonoId : 0,
            urlAry : [],
            totalRowList : [],
        })
        return toRefs(nonoData);
    }

export {setNonoData};






