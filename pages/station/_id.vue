<template>
    <div class="content-container border rounded col-lg-6 my-4 mx-auto shadow-sm h-md-250 px-4 py-4">
        <h2 class="text-center font-weight-bold">Информация о станции</h2>
        <info
            class="my-1"
            :station-data="station"
        />
        <template v-if="station.Products.length && station.Columns.length">
            <h2 class="text-center font-weight-bold">Цены на топливо</h2>
            <products
                class="my-1"
                :fuel-data="station.Products"
            />
            <h2 class="text-center font-weight-bold">ТРК</h2>
            <columns
                class="my-1"
                :columns="station.Columns"
                :products="station.Products"
            />
        </template>
        <template v-else>
            <b-alert
                class="my-1 text-center"
                show
            >
                Данные по ТРК отсутствуют
            </b-alert>
        </template>
    </div>
</template>

<script>
import Info from '@/components/Station/Info';
import Products from '@/components/Station/Products';
import Columns from '@/components/Station/Columns';

export default {
    components: {
        Info,
        Products,
        Columns,
    },
    async asyncData ({ $axios, params, error }) {
        const stationData = await $axios.get(`/api/stations/${params.id}`, {
            validateStatus: status => status === 200 || status === 404,
        });

        if (stationData.status === 404) {
            error({
                statusCode: 404,
                message: `Заправка ${params.id} не существует`,
            });

            return { };
        } else {
            return {
                station: stationData?.data,
            };
        }
    },
};
</script>
