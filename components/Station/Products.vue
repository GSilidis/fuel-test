<template>
    <b-table-simple small>
        <b-thead>
            <b-tr>
                <b-th
                    v-for="item in fuelData"
                    :key="item.exid"
                >
                    {{ item.brand ? `${item.name} (${item.brand})` : item.name }}
                </b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr>
                <b-td
                    v-for="item in fuelData"
                    :key="item.exid"
                >
                    {{ item.price }}
                </b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>
export default {
    props: {
        fuelData: {
            type: Array,
            required: true,
        },
    },
};
</script>
