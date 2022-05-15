import Chart from '@/components/Station/Columns';
import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('components/Station/Columns', () => {
    test('Should mount correctly', () => {
        const wrapper = mount(Chart, {
            propsData: {
                columns: [{
                    num: 1,
                    Product: {
                        exid: '1',
                    }
                }, {
                    num: 1,
                    Product: {
                        exid: '2',
                    }
                }],
                products: [{
                    exid: '1',
                    name: 'АИ95'
                }, {
                    exid: '2',
                    name: 'ДТ',
                }]
            },
            localVue
        });

        expect(wrapper.vm).toBeTruthy();
        const row1 = wrapper.findAll('table > tbody > tr > td')
        expect(row1.at(0).text()).toEqual('1');
        expect(row1.at(1).text()).toEqual('АИ95, ДТ');
    });
});
