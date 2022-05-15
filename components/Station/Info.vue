<template>
    <b-table-simple small>
        <b-tbody>
            <b-tr>
                <b-td class="text-right col-md-2">Название</b-td>
                <b-td class="col-md-2">{{ stationData.name }}</b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-right">Адрес</b-td>
                <b-td>{{ stationData.address }}</b-td>
            </b-tr>
            <b-tr v-if="stationData.brand">
                <b-td class="text-right">Бренд</b-td>
                <b-td>{{ stationData.brand }}</b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-right">На карте</b-td>
                <b-td><a :href="`https://2gis.ru/?m=${stationData.lon},${stationData.lat}/16`">{{ stationData.address }}</a></b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-right">Момент снятия пистолета</b-td>
                <b-td v-if="stationData.takeOffBefore">До оплаты</b-td>
                <b-td v-else>После оплаты</b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-right">Тип оплаты</b-td>
                <b-td v-if="stationData.postPay">Постоплата</b-td>
                <b-td v-else>Предоплата</b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-right">Доступна</b-td>
                <b-td v-if="stationData.enable">Да</b-td>
                <b-td v-else>Нет</b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>
export default {
    props: {
        stationData: {
            type: Object,
            required: true,
        },
    },
};
</script>
