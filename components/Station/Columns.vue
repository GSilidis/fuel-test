<template>
    <b-table-simple small>
        <b-tbody>
            <b-tr
                v-for="(key, id) in Object.keys(columnsProducts)"
                :key="id"
            >
                <b-td>{{ key }}</b-td>
                <b-td>{{ columnsProducts[key] }}</b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
    },
    computed: {
        columnsProducts () {
            const productMap = this.products.reduce((acc, product) => {
                acc[product.exid] = product.brand ? `${product.name} (${product.brand})` : product.name;

                return acc;
            }, {});


            return this.columns.reduce((acc, column) => {
                if (acc[column.num]) {
                    acc[column.num] += `, ${productMap[column.Product.exid]}`;
                } else {
                    acc[column.num] = productMap[column.Product.exid];
                }

                return acc;
            }, {});
        },
    },
};
</script>
