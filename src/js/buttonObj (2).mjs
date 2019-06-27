export default {
    1: {
        title: 'filter',
        svg: 'filter',
        type: 'nav-switch',
        state: '',
        value: '0',
        events: {
            shortPress: {
                value: {
                    0: {
                        123: {
                            
                        }
                    },
                    1: []
                }
            }  
        }
    },
    2: {
        title: 'apply',
        svg: 'apply',
        type: 'nav-push',
        state: 'disable',
        value: '0',

    },
    3: {
        title: 'clear',
        svg: 'clear',
        type: 'nav-push',
        state: 'disable',
        value: '0'
    },
    4: {
        title: 'more',
        svg: 'more',
        type: 'nav-push',
        state: '',
        value: '0'
    },
    5: {
        title: 'less',
        svg: 'less',
        type: 'nav-push',
        state: '',
        value: '0',
        subButton: ['1', '2']
    },
    10: {
        title: 'light',
        svg: 'apply',
        type: 'control-switch',
        state: 'disable focus hover',
        value: '100',
        subButton: ['1', '2']
    },
    11: {
        title: 'light',
        svg: 'apply',
        type: 'control-slide',
        state: 'disable focus hover',
        value: '0 1 100',
        subButton: ['1', '2']
    },
    12: {
        title: 'light',
        svg: 'apply',
        type: 'control-push',
        state: 'disable focus hover',
        value: '0 1 100',
        subButton: ['1', '2']
    }
}