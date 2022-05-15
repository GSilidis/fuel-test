<template>
    <div>
        <div v-if="$fetchState.error">
            <b-alert
                class="my-1 text-center"
                variant="danger"
                show
            >
                Ошибка при загрузке списка АЗС
            </b-alert>
        </div>
        <div v-else>
            <b-table
                hover
                :tbody-tr-class="rowClass"
                :fields="fields"
                :items="items"
                :busy="$fetchState.pending"
                select-mode="single"
                selectable
                @row-selected="onRowSelected"
            >
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle" />
                        <strong>Загрузка...</strong>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StationsTable',
    data () {
        return {
            items: [],
            fields: [{
                key: 'name',
                label: 'Название',
            },
            {
                key: 'brand',
                label: 'Бренд',
            },
            {
                key: 'address',
                label: 'Адрес',
            }],
        };
    },

    async fetch () {
        this.items = await this.$nuxt.context.$axios.$get('/api/stations/');
    },

    fetchDelay: 600,
    fetchOnServer: false,

    methods: {
        rowClass (item, type) {
            if (!item || type !== 'row') return;
            if (item.enable === false) return 'table-secondary';
        },

        onRowSelected (row) {
            if (row[0]) {
                this.$emit('stationSelected', row[0].uid);
            }
        },
    },
};

</script>
